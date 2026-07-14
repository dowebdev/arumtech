/**
 * 게시판 쓰기 클라이언트 — woori `/contents`·`/files` API. **관리자 로그인 필요**.
 * 읽기는 lib/contents.ts 가 담당한다 (인증 불필요).
 *
 *   등록  POST   {API}/contents  { module_idx, title, content, is_html, extras, date_start, date_end, file_idx[] }
 *   수정  PUT    {API}/contents  { idx, ..., file_idx_add[], file_idx_delete[] }
 *   삭제  DELETE {API}/contents  { idx }                       ← 본문(JSON)으로 idx 를 보낸다
 *   첨부  POST   {FILE}/files/post.php (multipart) → POST {API}/files (메타 등록) → 파일 idx
 *
 * 모든 요청에 Authorization: Bearer {access_token} 을 싣는다.
 */

import { BOARDS, type BoardKey } from "./contents";

const API_URL = process.env.NEXT_PUBLIC_WOORI_API_URL;
const SITE_ID = process.env.NEXT_PUBLIC_WOORI_SITE_ID;
/** 첨부파일이 실제로 올라가는 파일서버 (iwinv). */
const FILE_URL = process.env.NEXT_PUBLIC_WOORI_FILE_URL ?? "";

/** woori FILE_TYPE — 1: 일반(다운로드용), 3: 이미지, 4: 오디오/영상. */
export const FILE_TYPE = { general: 1, image: 3, media: 4 } as const;
/** 공개 파일 (비로그인 조회 가능). */
const PERMIT_PUBLIC = 0;
/** 게시글 종료일. 상시 노출시키려고 먼 미래로 둔다 (한강미디어와 동일). */
const DATE_END_FAR = "2099-12-31";

/** 저장 실패 — message 는 사용자에게 그대로 보여줄 수 있다. */
export class BoardWriteError extends Error {}

export interface BoardDraft {
  title: string;
  content: string;
  /** 본문을 HTML 로 저장할지. 기존 이관 글은 HTML, 새 글은 평문이 기본. */
  isHtml: boolean;
  /** 상단 고정 (공지사항) */
  pinned?: boolean;
  /** 카테고리 (자료실·설치사례) */
  category?: string;
}

/** 업로드가 끝나 게시글에 붙일 수 있는 첨부. */
export interface UploadedFile {
  idx: string;
  name: string;
}

interface ApiResult {
  statusCode?: number;
  message?: string[] | string;
  data?: { idx?: string } | null;
}

function firstMessage(message: ApiResult["message"]): string | undefined {
  if (Array.isArray(message)) return message.find((m) => typeof m === "string" && m);
  return typeof message === "string" && message ? message : undefined;
}

function requireConfig() {
  if (!API_URL || !SITE_ID) {
    throw new BoardWriteError("게시판 API 설정이 완료되지 않았습니다.");
  }
}

/** /contents 요청 공통. 실패하면 서버 메시지를 담은 BoardWriteError 를 던진다. */
async function request(
  method: "POST" | "PUT" | "DELETE",
  body: Record<string, unknown>,
  token: string,
  failMessage: string
): Promise<ApiResult> {
  requireConfig();

  let json: ApiResult;
  try {
    const res = await fetch(`${API_URL}/contents`, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-site": SITE_ID as string,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    json = (await res.json()) as ApiResult;
  } catch {
    throw new BoardWriteError("서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
  }

  if (json.statusCode !== 200) {
    throw new BoardWriteError(firstMessage(json.message) ?? failMessage);
  }
  return json;
}

/** YYYY-MM-DD */
function today(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** 목록·상세가 읽는 extras(JSON 문자열)를 만든다. lib/contents.ts 의 parseExtras 와 짝을 이룬다. */
function buildExtras(draft: BoardDraft): string {
  return JSON.stringify({
    isPinned: draft.pinned ? 1 : 0,
    category: draft.category ?? "",
  });
}

/** 게시글 등록. 새 글의 idx 를 돌려준다. */
export async function createContent(
  board: BoardKey,
  draft: BoardDraft,
  fileIdxs: string[],
  token: string
): Promise<string> {
  const json = await request(
    "POST",
    {
      module_idx: BOARDS[board],
      title: draft.title,
      content: draft.content,
      is_html: draft.isHtml ? 1 : 0,
      extras: buildExtras(draft),
      date_start: today(),
      date_end: DATE_END_FAR,
      is_hidden_list: 0,
      ...(fileIdxs.length ? { file_idx: fileIdxs } : {}),
    },
    token,
    "등록에 실패했습니다."
  );

  const idx = json.data?.idx;
  if (!idx) throw new BoardWriteError("등록은 됐지만 글 번호를 받지 못했습니다.");
  return idx;
}

/** 게시글 수정. 첨부는 추가/삭제할 것만 넘긴다. */
export async function updateContent(
  idx: string,
  draft: BoardDraft,
  files: { add: string[]; remove: string[] },
  token: string
): Promise<void> {
  await request(
    "PUT",
    {
      idx,
      title: draft.title,
      content: draft.content,
      is_html: draft.isHtml ? 1 : 0,
      extras: buildExtras(draft),
      ...(files.add.length ? { file_idx_add: files.add } : {}),
      ...(files.remove.length ? { file_idx_delete: files.remove } : {}),
    },
    token,
    "저장에 실패했습니다."
  );
}

/** 게시글 삭제. */
export async function deleteContent(idx: string, token: string): Promise<void> {
  await request("DELETE", { idx }, token, "삭제에 실패했습니다.");
}

/**
 * 첨부 업로드 — 2단계.
 *   1) 파일서버(iwinv)에 실제 파일을 올리고 메타데이터를 받는다.
 *   2) 그 메타데이터를 API 에 등록해 파일 idx 를 받는다. 이 idx 를 게시글에 붙인다.
 */
export async function uploadFile(
  file: File,
  opts: { board: BoardKey; type: (typeof FILE_TYPE)[keyof typeof FILE_TYPE] },
  token: string
): Promise<UploadedFile> {
  requireConfig();
  if (!FILE_URL) {
    throw new BoardWriteError("파일서버 설정(NEXT_PUBLIC_WOORI_FILE_URL)이 없습니다.");
  }

  const form = new FormData();
  form.append("file", file);
  form.append("file_path", opts.board);
  form.append("file_type", String(opts.type));
  form.append("permit_level", String(PERMIT_PUBLIC));

  interface StorageMeta {
    file_ext?: string;
    file_name_origin?: string;
    file_name_real?: string;
    file_path?: string;
    file_size?: number;
    file_type?: number;
    permit_level?: number;
  }

  let meta: StorageMeta | undefined;
  try {
    // 헤더를 하나도 붙이지 않는다.
    //
    // 파일서버(iwinv)는 사이트와 다른 출처라 브라우저가 CORS 를 건다. 그런데 파일서버가
    // 허용하는 헤더는 `Content-Type, Authorization` 뿐이어서, x-site 를 실으면 프리플라이트가
    // 막히고 업로드가 통째로 실패한다. post.php 는 인증도 사이트 헤더도 보지 않으므로
    // (파일·file_path·file_type·permit_level 만 읽는다) 아무것도 보낼 필요가 없다.
    // Content-Type 도 비워둬야 브라우저가 multipart boundary 를 채운다.
    const res = await fetch(`${FILE_URL}/files/post.php`, {
      method: "POST",
      body: form,
    });
    const json = (await res.json()) as { data?: StorageMeta };
    meta = json.data;
  } catch {
    throw new BoardWriteError("파일 업로드에 실패했습니다.");
  }

  if (!meta?.file_name_real) {
    throw new BoardWriteError("파일 업로드에 실패했습니다.");
  }

  // 파일서버는 파일을 보관만 한다. 게시글에 붙이려면 그 메타데이터를 API 에 등록해 idx 를 받아야 한다.
  // 이쪽은 woori API 라 평소대로 x-site 와 토큰이 필요하다.
  let registered: ApiResult;
  try {
    const res = await fetch(`${API_URL}/files`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-site": SITE_ID as string,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        file_ext: meta.file_ext,
        file_name_origin: meta.file_name_origin,
        file_name_real: meta.file_name_real,
        file_path: meta.file_path,
        file_size: meta.file_size,
        file_type: meta.file_type,
        permit_level: meta.permit_level,
      }),
    });
    registered = (await res.json()) as ApiResult;
  } catch {
    throw new BoardWriteError("파일 등록에 실패했습니다.");
  }

  const idx = registered.data?.idx;
  if (!idx) {
    throw new BoardWriteError(firstMessage(registered.message) ?? "파일 등록에 실패했습니다.");
  }

  return { idx, name: meta.file_name_origin || file.name };
}

/** 업로드된 파일의 공개 URL. 파일서버는 실제 경로(/files/data/...)를 403 으로 막고 get.php 로만 서빙한다. */
function publicUrl(meta: {
  file_path?: string;
  file_name_origin?: string;
  file_name_real?: string;
}): string {
  const q = new URLSearchParams({
    permit_level: String(PERMIT_PUBLIC),
    file_path: meta.file_path ?? "",
    file_name_origin: meta.file_name_origin ?? "",
    file_name_real: meta.file_name_real ?? "",
  });
  return `${FILE_URL}/files/get.php?${q}`;
}

/**
 * 에디터 본문에 끼워 넣을 미디어 업로드 — 게시글 첨부로 등록하지 않고 **공개 URL 만** 돌려준다.
 * 본문 HTML 이 이 URL 을 참조하므로 파일 idx 는 필요 없고, 따라서 로그인 토큰도 필요 없다
 * (post.php 는 인증을 보지 않는다).
 *
 * onProgress 는 동영상처럼 큰 파일의 진행률 표시에 쓴다. fetch 로는 업로드 진행률을 알 수 없어 XHR 을 쓴다.
 */
export function uploadMedia(
  file: File,
  opts: { board: BoardKey; type: (typeof FILE_TYPE)[keyof typeof FILE_TYPE] },
  onProgress?: (percent: number) => void
): Promise<string> {
  if (!FILE_URL) {
    return Promise.reject(new BoardWriteError("파일서버 설정(NEXT_PUBLIC_WOORI_FILE_URL)이 없습니다."));
  }

  const form = new FormData();
  form.append("file", file);
  form.append("file_path", opts.board);
  form.append("file_type", String(opts.type));
  form.append("permit_level", String(PERMIT_PUBLIC));

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${FILE_URL}/files/post.php`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100));
    };

    xhr.onload = () => {
      // 성공 판정은 2xx + 실제 저장명 존재로 한다.
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(new BoardWriteError("파일 업로드에 실패했습니다."));
        return;
      }
      try {
        const json = JSON.parse(xhr.responseText) as {
          data?: { file_path?: string; file_name_origin?: string; file_name_real?: string };
        };
        if (!json.data?.file_name_real) {
          reject(new BoardWriteError("파일 업로드에 실패했습니다."));
          return;
        }
        resolve(publicUrl(json.data));
      } catch {
        reject(new BoardWriteError("파일 업로드 응답을 해석하지 못했습니다."));
      }
    };
    xhr.onerror = () => reject(new BoardWriteError("파일 업로드에 실패했습니다."));

    // 헤더를 붙이지 않는다 — x-site 를 실으면 파일서버 CORS 프리플라이트에 막힌다 (uploadFile 주석 참고).
    xhr.send(form);
  });
}
