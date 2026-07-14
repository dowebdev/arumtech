/**
 * 게시판 읽기 클라이언트 — woori `/contents` API (한강미디어와 동일 구조).
 *
 *   목록  GET {API}/contents/list?module_idx={M}&page={p}&limit={n}
 *   상세  GET {API}/contents?idx={I}&content_load=1
 *
 * 게시판은 module_idx 로, 사이트는 x-site 헤더로 구분한다.
 * 쓰기(작성·수정·삭제)는 관리자 인증이 필요하므로 별도 모듈에서 다룬다.
 */

const API_URL = process.env.NEXT_PUBLIC_WOORI_API_URL;
const SITE_ID = process.env.NEXT_PUBLIC_WOORI_SITE_ID;
/** 첨부파일 다운로드용 파일서버 (iwinv). file_url 이 여기에 붙는다. */
const FILE_URL = process.env.NEXT_PUBLIC_WOORI_FILE_URL ?? "";

/** 게시판 종류 → module_idx. 비밀값이 아니라 x-site 와 함께 쓰는 공개 식별자다. */
export const BOARDS = {
  notice: "01928e0d-6389-7fa1-99bd-222726e49b7b", // 공지사항 (기본 모듈)
  archive: "019cb2f7-0d89-75b4-a16b-6019e8ee9782", // 자료실 (기본 모듈)
  cases: "019f4a04-2c98-775b-bea6-dbd6f3ef7125", // 설치사례 (아름텍 전용)
} as const;

export type BoardKey = keyof typeof BOARDS;

/**
 * 게시판별 카테고리 (기존 사이트 기준). 목록 필터와 작성 폼이 같은 값을 써야 하므로 여기서 관리한다.
 * 공지사항은 카테고리 대신 상단 고정(pinned)만 쓴다.
 */
export const BOARD_CATEGORIES = {
  archive: ["메뉴얼", "물가정보", "카탈로그", "기술자료", "도면자료", "시방서"],
  cases: ["Domestic", "International", "강당/공연장", "관공서/학교", "기업/상업시설", "종교시설"],
} as const;

/** 게시판 목록의 한 항목. */
export interface ContentItem {
  idx: string;
  title: string;
  /** 게시일 (date_active) */
  date: string;
  /** 상단 고정 여부 (extras.isPinned) */
  pinned: boolean;
  /** 조회수 */
  views: number;
  /** 첨부파일 개수 */
  fileCount: number;
  /** 카테고리 (extras.category) — 설치사례 필터용 */
  category?: string;
  /** 대표 이미지 — 본문 첫 이미지 또는 첨부 이미지 (withContent 로 목록 조회 시) */
  thumbnail?: string;
}

/** 상세 — 목록 항목 + 본문. */
export interface ContentDetail extends ContentItem {
  /** 본문 (HTML 또는 평문) */
  content: string;
  isHtml: boolean;
  files: ContentFile[];
}

export interface ContentFile {
  idx: string;
  /** 표시용 원본 파일명 (file_name_origin) */
  name: string;
  ext: string;
  /** 바이트 (file_size) */
  size: number;
  /** 다운로드 URL = 파일서버 + file_url */
  url: string;
}

export interface ContentPage {
  items: ContentItem[];
  total: number;
  totalPage: number;
  page: number;
  hasNext: boolean;
}

export class ContentsConfigError extends Error {}

function requireConfig() {
  if (!API_URL || !SITE_ID) {
    throw new ContentsConfigError(
      "NEXT_PUBLIC_WOORI_API_URL 과 NEXT_PUBLIC_WOORI_SITE_ID 가 설정되지 않았습니다."
    );
  }
}

async function get(path: string, params: Record<string, string | number>): Promise<unknown> {
  requireConfig();
  const qs = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  ).toString();
  const res = await fetch(`${API_URL}${path}?${qs}`, {
    headers: { "x-site": SITE_ID as string },
  });
  if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`);
  return res.json();
}

/** extras JSON 문자열을 안전하게 파싱한다. */
function parseExtras(extras: unknown): { pinned: boolean; category?: string } {
  if (typeof extras !== "string") return { pinned: false };
  try {
    const e = JSON.parse(extras);
    const category = typeof e?.category === "string" && e.category ? e.category : undefined;
    return { pinned: e?.isPinned === 1, category };
  } catch {
    return { pinned: false };
  }
}

interface RawItem {
  idx: string;
  title: string;
  date_active?: string;
  date_start?: string;
  extras?: string;
  count_read?: number;
  content?: string;
  is_html?: number;
  files?: {
    idx: string;
    file_name_origin?: string;
    file_ext?: string;
    file_size?: number;
    file_url?: string;
  }[];
}

const IMAGE_EXT = /^(jpe?g|png|gif|webp|bmp|svg)$/i;

/**
 * HTML 속성값을 실제 문자열로 되돌린다.
 *
 * 본문에서 정규식으로 뽑은 src 는 HTML 소스 그대로라 엔티티가 섞여 있다. 파일서버 URL 은
 * 쿼리스트링(get.php?permit_level=0&file_path=...)이라 `&` 가 `&amp;` 로 들어오는데, 이걸
 * 그대로 <img src> 에 쓰면 파라미터 이름이 `amp;file_path` 가 되어 서버가 파일을 못 찾는다.
 * (에러 JSON 이 200 으로 돌아오므로 이미지 자리가 조용히 비어 보인다.)
 */
function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/**
 * 대표 이미지(목록 썸네일) — 본문 HTML 의 **가장 위 이미지**, 없으면 첨부 이미지 첫 장.
 * content_load·file_load 로 조회할 때만 구해진다.
 */
function firstImage(raw: RawItem): string | undefined {
  const m = raw.content?.match(/<img[^>]+src="([^"]+)"/i);
  if (m) return decodeEntities(m[1]);
  const img = raw.files?.find((f) => IMAGE_EXT.test(f.file_ext ?? ""));
  if (img?.file_url) return `${FILE_URL}${img.file_url}`;
  return undefined;
}

function toItem(raw: RawItem): ContentItem {
  const { pinned, category } = parseExtras(raw.extras);
  return {
    idx: raw.idx,
    title: raw.title ?? "",
    date: raw.date_active ?? raw.date_start ?? "",
    pinned,
    views: raw.count_read ?? 0,
    fileCount: raw.files?.length ?? 0,
    category,
    thumbnail: firstImage(raw),
  };
}

/** 게시판 목록. 상단 고정 글이 먼저 오도록 정렬한다. */
export async function fetchContentsList(
  board: BoardKey,
  opts: { page?: number; limit?: number; search?: string; withContent?: boolean } = {}
): Promise<ContentPage> {
  const { page = 1, limit = 12, search, withContent } = opts;
  const params: Record<string, string | number> = {
    module_idx: BOARDS[board],
    page,
    limit,
  };
  // 설치사례처럼 목록 카드에 대표 이미지가 필요하면 본문·첨부를 함께 로드한다.
  if (withContent) {
    params.content_load = 1;
    params.file_load = 1;
  }
  if (search?.trim()) params.search = search.trim();

  const json = (await get("/contents/list", params)) as {
    page?: { total?: number; total_page?: number; page_index?: number; has_next_page?: boolean };
    list?: RawItem[];
  };

  const items = (json.list ?? []).map(toItem);
  items.sort((a, b) => Number(b.pinned) - Number(a.pinned));

  return {
    items,
    total: json.page?.total ?? items.length,
    totalPage: json.page?.total_page ?? 1,
    page: json.page?.page_index ?? page,
    hasNext: json.page?.has_next_page ?? false,
  };
}

/** 게시글 상세 (본문 포함). */
export async function fetchContent(idx: string): Promise<ContentDetail> {
  const json = (await get("/contents", { idx, content_load: 1, file_load: 1 })) as {
    data?: RawItem;
  } & RawItem;
  const raw = json.data ?? json;

  return {
    ...toItem(raw),
    content: raw.content ?? "",
    isHtml: raw.is_html === 1,
    files: (raw.files ?? []).map((f) => ({
      idx: f.idx,
      name: f.file_name_origin ?? "첨부파일",
      ext: f.file_ext ?? "",
      size: f.file_size ?? 0,
      url: f.file_url ? `${FILE_URL}${f.file_url}` : "",
    })),
  };
}
