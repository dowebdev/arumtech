"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchContent, BOARD_CATEGORIES, type BoardKey } from "@/lib/contents";
import {
  createContent,
  updateContent,
  uploadFile,
  uploadMedia,
  BoardWriteError,
  FILE_TYPE,
  type UploadedFile,
} from "@/lib/contents-write";
import { useAdminAuth } from "./AdminAuthProvider";

/**
 * 게시판 작성·수정 폼 (공지사항·자료실·설치사례 공용).
 *
 * idx 가 있으면 수정, 없으면 새 글. 관리자만 접근할 수 있고, 비로그인 상태면 목록으로 돌려보낸다.
 *
 * 본문은 리치 에디터로 쓴다 — 사진·동영상을 글 사이 원하는 위치에 넣을 수 있고, HTML 로 저장된다.
 * 본문 미디어는 게시글 "첨부"가 아니라 본문 HTML 안의 URL 이다 (uploadMedia).
 * 자료실의 다운로드용 첨부파일만 게시글 첨부(uploadFile)로 붙인다.
 */

// Quill 은 브라우저 전용이라 SSR 을 끈다. 번들도 크므로 필요한 화면에서만 내려받는다.
const RichEditor = dynamic(() => import("@/components/editor/RichEditor"), {
  ssr: false,
  loading: () => (
    <div className="rounded-lg border border-black/15 px-4 py-24 text-center text-[15px] text-[#6e7178]">
      에디터 불러오는 중…
    </div>
  ),
});

interface FileSlot {
  /** 파일 idx (업로드 완료된 것만 여기 들어온다) */
  idx: string;
  name: string;
}

const CONFIG = {
  notice: {
    noun: "소식",
    pinned: true,
    categories: null,
    // 목록이 카드형이라 썸네일을 직접 지정할 수 있다.
    listImage: true,
    // 사진·동영상은 본문 에디터로 넣는다. 별도 첨부 없음.
    files: null,
  },
  archive: {
    noun: "자료",
    pinned: false,
    categories: BOARD_CATEGORIES.archive,
    // 자료실 목록은 파일 아이콘만 쓴다 — 썸네일이 없다.
    listImage: false,
    files: { label: "다운로드 파일", multiple: false, accept: "", type: FILE_TYPE.general },
  },
  cases: {
    noun: "설치사례",
    pinned: false,
    categories: BOARD_CATEGORIES.cases,
    listImage: true,
    files: null,
  },
} as const;

const FIELD =
  "w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-[#9aa0a6] focus:border-accent";

const IMAGE_EXT = /^(jpe?g|png|gif|webp|bmp|svg)$/i;

/**
 * 에디터에 넣을 HTML 로 바꾼다.
 * 예전 평문 글(is_html=0)을 그대로 넣으면 줄바꿈이 사라지므로, 줄 단위로 <p> 를 씌운다.
 */
function toEditorHtml(content: string, isHtml: boolean): string {
  if (isHtml) return content;
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return content
    .split(/\r?\n/)
    .map((line) => `<p>${line.trim() ? escape(line) : "<br>"}</p>`)
    .join("");
}

export default function BoardForm({
  board,
  idx,
  listPath,
}: {
  board: BoardKey;
  idx?: string;
  listPath: string;
}) {
  const config = CONFIG[board];
  const isEdit = Boolean(idx);
  const router = useRouter();
  const { session, canManage, ready } = useAdminAuth();

  const [title, setTitle] = useState("");
  /** 에디터 본문 (HTML). */
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [pinned, setPinned] = useState(false);
  /** 목록 썸네일로 쓸 이미지 URL. 비우면 본문 첫 이미지가 쓰인다. */
  const [listImage, setListImage] = useState("");
  const [listImageUploading, setListImageUploading] = useState(false);
  const [files, setFiles] = useState<FileSlot[]>([]);
  /** 수정 진입 시점의 첨부 — 저장할 때 추가/삭제 차이를 계산한다. */
  const [originalFiles, setOriginalFiles] = useState<FileSlot[]>([]);

  const [loading, setLoading] = useState(isEdit);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // 비로그인 상태로 폼에 들어오면(직접 URL 입력 등) 목록으로 돌려보낸다.
  // 세션 복원이 끝나기 전에 판단하면 로그인한 관리자도 튕기므로 ready 를 기다린다.
  useEffect(() => {
    if (ready && !canManage) router.replace(listPath);
  }, [ready, canManage, router, listPath]);

  // 수정 모드 — 기존 내용을 채운다.
  useEffect(() => {
    if (!idx) return;
    let alive = true;
    fetchContent(idx)
      .then((item) => {
        if (!alive) return;
        setTitle(item.title);

        // 에디터 도입 전에 쓴 글은 이미지가 본문이 아니라 "첨부"로 붙어 있다. 그대로 두면
        // 에디터 안에 아무것도 안 보이고 위치도 못 옮긴다. 본문 끝에 <img> 로 넣어준다.
        //
        // 첨부 자체는 떼지 않는다 — 파일 등록을 지우면 파일서버의 실물까지 사라질 수 있어서다.
        // 대신 상세 페이지가 HTML 글(=에디터 글)의 이미지 첨부는 따로 그리지 않으므로 중복되지 않는다.
        const body = toEditorHtml(item.content, item.isHtml);
        // 본문 HTML 안의 URL 은 `&` 가 `&amp;` 로 들어 있다. 그대로 비교하면 이미 본문에 있는
        // 이미지를 "없다"고 보고 또 붙인다.
        const bodyUrls = body.replace(/&amp;/g, "&");
        const orphanImages = item.files
          .filter((f) => IMAGE_EXT.test(f.ext) && f.url && !bodyUrls.includes(f.url))
          .map((f) => `<p><img src="${f.url}"></p>`)
          .join("");
        setContent(body + orphanImages);

        setCategory(item.category ?? "");
        setPinned(item.pinned);
        setListImage(item.listImage ?? "");
        const slots = item.files.map((f) => ({ idx: f.idx, name: f.name }));
        setFiles(slots);
        setOriginalFiles(slots);
        setLoading(false);
      })
      .catch(() => {
        if (!alive) return;
        setError("글을 불러오지 못했습니다.");
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [idx]);

  const onPickFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!picked.length || !session || !config.files) return;

    setError("");
    setUploading(true);
    try {
      const uploaded: UploadedFile[] = [];
      for (const file of picked) {
        uploaded.push(await uploadFile(file, { board, type: config.files.type }, session.accessToken));
      }
      // 단일 첨부 게시판(자료실)은 마지막 하나만 남긴다.
      setFiles((prev) => (config.files?.multiple ? [...prev, ...uploaded] : uploaded.slice(-1)));
    } catch (err) {
      setError(err instanceof BoardWriteError ? err.message : "파일 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  };

  // ── 에디터 업로드 핸들러 — 실패하면 null 을 돌려줘야 에디터가 삽입을 건너뛴다. ──
  const insertMedia = async (
    file: File,
    type: (typeof FILE_TYPE)[keyof typeof FILE_TYPE],
    onProgress?: (percent: number) => void
  ): Promise<string | null> => {
    try {
      return await uploadMedia(file, { board, type }, onProgress);
    } catch (err) {
      setError(err instanceof BoardWriteError ? err.message : "업로드에 실패했습니다.");
      return null;
    }
  };

  /** 목록이미지 — 본문에 넣지 않고 URL 만 extras 에 저장한다. */
  const onPickListImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setError("");
    setListImageUploading(true);
    try {
      setListImage(await uploadMedia(file, { board, type: FILE_TYPE.image }));
    } catch (err) {
      setError(err instanceof BoardWriteError ? err.message : "목록이미지 업로드에 실패했습니다.");
    } finally {
      setListImageUploading(false);
    }
  };

  const onImageUpload = (file: File) => insertMedia(file, FILE_TYPE.image);
  const onFileUpload = (file: File) => insertMedia(file, FILE_TYPE.general);
  const onVideoUpload = (file: File, onProgress?: (percent: number) => void) =>
    insertMedia(file, FILE_TYPE.media, onProgress);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving || uploading || listImageUploading || !session) return;
    if (!title.trim()) {
      setError("제목을 입력하세요.");
      return;
    }

    setError("");
    setSaving(true);
    const draft = {
      title: title.trim(),
      content,
      // 에디터가 만드는 본문은 언제나 HTML 이다.
      isHtml: true,
      pinned: config.pinned ? pinned : false,
      category: config.categories ? category : "",
      listImage: config.listImage ? listImage : "",
    };

    try {
      if (idx) {
        const kept = files.map((f) => f.idx);
        await updateContent(
          idx,
          draft,
          {
            add: kept.filter((f) => !originalFiles.some((o) => o.idx === f)),
            remove: originalFiles.filter((o) => !kept.includes(o.idx)).map((o) => o.idx),
          },
          session.accessToken
        );
        router.push(`${listPath}/${idx}`);
      } else {
        const created = await createContent(
          board,
          draft,
          files.map((f) => f.idx),
          session.accessToken
        );
        router.push(`${listPath}/${created}`);
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof BoardWriteError ? err.message : "저장 중 오류가 발생했습니다.");
      setSaving(false);
    }
  };

  // 복원 전에는 아무것도 단정하지 않는다 (위 effect 가 ready 후에 판단한다).
  if (!ready) {
    return <div className="py-24 text-center text-[15px] text-[#6e7178]">불러오는 중…</div>;
  }
  if (!canManage) return null;

  if (loading) {
    return <div className="py-24 text-center text-[15px] text-[#6e7178]">불러오는 중…</div>;
  }

  const busy = saving || uploading || listImageUploading;

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="board-title" className="text-[14px] font-semibold text-ink">
          제목 <span className="text-accent">*</span>
        </label>
        <input
          id="board-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={`${config.noun} 제목`}
          className={FIELD}
        />
      </div>

      {config.categories && (
        <div className="flex flex-col gap-2">
          <label htmlFor="board-category" className="text-[14px] font-semibold text-ink">
            카테고리
          </label>
          <select
            id="board-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`${FIELD} cursor-pointer`}
          >
            <option value="">선택 안 함</option>
            {config.categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      )}

      {config.listImage && (
        <div className="flex flex-col gap-2">
          <span className="text-[14px] font-semibold text-ink">
            목록이미지
            <span className="ml-2 text-[12.5px] font-normal text-[#6e7178]">
              목록 카드에 쓸 대표 이미지입니다. 지정하지 않으면 본문의 첫 이미지가 쓰입니다.
            </span>
          </span>

          {listImage ? (
            <div className="flex items-start gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={listImage}
                alt="목록이미지 미리보기"
                className="h-[120px] w-[160px] rounded-lg border border-black/10 object-cover"
              />
              <button
                type="button"
                onClick={() => setListImage("")}
                className="rounded-lg border border-black/15 px-4 py-2.5 text-[13.5px] text-[#52555b] transition-colors hover:border-danger hover:text-danger"
              >
                이미지 삭제
              </button>
            </div>
          ) : (
            <label className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-dashed border-black/25 px-5 py-3 text-[14px] text-[#52555b] transition-colors hover:border-accent hover:text-accent">
              <input type="file" hidden accept="image/*" onChange={onPickListImage} />
              <i className="ph ph-image" />
              {listImageUploading ? "업로드 중…" : "목록이미지 선택"}
            </label>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <span className="text-[14px] font-semibold text-ink">내용</span>
        <RichEditor
          value={content}
          onChange={setContent}
          onImageUpload={onImageUpload}
          onFileUpload={onFileUpload}
          onVideoUpload={onVideoUpload}
        />
        <p className="text-[12.5px] text-[#6e7178]">
          사진·동영상·파일을 글 사이 원하는 위치에 넣을 수 있습니다. 동영상은 파일 업로드 또는 YouTube
          링크 삽입을 지원합니다.
        </p>
      </div>

      {config.pinned && (
        <label className="flex w-fit cursor-pointer items-center gap-2.5 text-[14.5px] text-ink">
          <input
            type="checkbox"
            checked={pinned}
            onChange={(e) => setPinned(e.target.checked)}
            className="h-[17px] w-[17px] cursor-pointer accent-accent"
          />
          목록 상단에 고정
        </label>
      )}

      {config.files && (
        <div className="flex flex-col gap-2">
          <span className="text-[14px] font-semibold text-ink">
            {config.files.label}
            {config.files.multiple && (
              <span className="ml-2 font-normal text-[12.5px] text-[#6e7178]">
                첫 번째 이미지가 목록 썸네일로 쓰입니다.
              </span>
            )}
          </span>

          {files.length > 0 && (
            <div className="flex flex-col gap-2">
              {files.map((f) => (
                <div
                  key={f.idx}
                  className="flex items-center gap-3 rounded-lg border border-black/10 bg-[#f4f5f7] px-4 py-3"
                >
                  <i className="ph ph-paperclip text-accent" style={{ fontSize: 17 }} />
                  <span className="flex-1 break-all text-[14px] text-ink">{f.name}</span>
                  <button
                    type="button"
                    onClick={() => setFiles((prev) => prev.filter((x) => x.idx !== f.idx))}
                    className="flex-shrink-0 text-[13px] text-[#6e7178] transition-colors hover:text-danger"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          )}

          <label className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-dashed border-black/25 px-5 py-3 text-[14px] text-[#52555b] transition-colors hover:border-accent hover:text-accent">
            <input
              type="file"
              hidden
              multiple={config.files.multiple}
              accept={config.files.accept || undefined}
              onChange={onPickFiles}
            />
            <i className="ph ph-plus" />
            {uploading ? "업로드 중…" : `${config.files.label} 선택`}
          </label>
        </div>
      )}

      {error && (
        <p className="flex items-start gap-1.5 text-[14px] text-danger">
          <i className="ph ph-warning-circle mt-[3px]" />
          {error}
        </p>
      )}

      <div className="flex gap-3 border-t border-black/10 pt-6">
        <button
          type="submit"
          disabled={busy}
          className="cursor-pointer rounded-lg bg-accent px-8 py-[14px] text-[15px] font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "저장 중…" : isEdit ? "수정 완료" : "등록"}
        </button>
        <Link
          href={idx ? `${listPath}/${idx}` : listPath}
          className="cursor-pointer rounded-lg border border-black/15 px-8 py-[14px] text-[15px] font-medium text-[#52555b] transition-colors hover:border-black/40"
        >
          취소
        </Link>
      </div>
    </form>
  );
}
