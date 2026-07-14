"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchContent, BOARD_CATEGORIES, type BoardKey } from "@/lib/contents";
import {
  createContent,
  updateContent,
  uploadFile,
  BoardWriteError,
  FILE_TYPE,
  type UploadedFile,
} from "@/lib/contents-write";
import { useAdminAuth } from "./AdminAuthProvider";

/**
 * 게시판 작성·수정 폼 (공지사항·자료실·설치사례 공용).
 *
 * idx 가 있으면 수정, 없으면 새 글. 관리자만 접근할 수 있고, 비로그인 상태면 목록으로 돌려보낸다.
 * 첨부는 고르는 즉시 파일서버에 올려 idx 를 확보하고, 저장할 때 게시글에 붙인다 (한강미디어와 같은 방식).
 */

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
    files: { label: "이미지", multiple: true, accept: "image/*", type: FILE_TYPE.image },
  },
  archive: {
    noun: "자료",
    pinned: false,
    categories: BOARD_CATEGORIES.archive,
    files: { label: "첨부파일", multiple: false, accept: "", type: FILE_TYPE.general },
  },
  cases: {
    noun: "설치사례",
    pinned: false,
    categories: BOARD_CATEGORIES.cases,
    files: { label: "이미지", multiple: true, accept: "image/*", type: FILE_TYPE.image },
  },
} as const;

const FIELD =
  "w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-[#9aa0a6] focus:border-accent";

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
  const { session, canManage } = useAdminAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [pinned, setPinned] = useState(false);
  /** 기존 글이 HTML 이면 그대로 유지한다. 새 글은 평문. */
  const [isHtml, setIsHtml] = useState(false);
  const [files, setFiles] = useState<FileSlot[]>([]);
  /** 수정 진입 시점의 첨부 — 저장할 때 추가/삭제 차이를 계산한다. */
  const [originalFiles, setOriginalFiles] = useState<FileSlot[]>([]);

  const [loading, setLoading] = useState(isEdit);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // 로그인이 풀린 상태로 폼에 들어오면(직접 URL 입력 등) 목록으로 돌려보낸다.
  useEffect(() => {
    if (!canManage) router.replace(listPath);
  }, [canManage, router, listPath]);

  // 수정 모드 — 기존 내용을 채운다.
  useEffect(() => {
    if (!idx) return;
    let alive = true;
    fetchContent(idx)
      .then((item) => {
        if (!alive) return;
        setTitle(item.title);
        setContent(item.content);
        setCategory(item.category ?? "");
        setPinned(item.pinned);
        setIsHtml(item.isHtml);
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving || uploading || !session) return;
    if (!title.trim()) {
      setError("제목을 입력하세요.");
      return;
    }

    setError("");
    setSaving(true);
    const draft = {
      title: title.trim(),
      content,
      isHtml,
      pinned: config.pinned ? pinned : false,
      category: config.categories ? category : "",
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

  if (!canManage) return null;

  if (loading) {
    return <div className="py-24 text-center text-[15px] text-[#6e7178]">불러오는 중…</div>;
  }

  const busy = saving || uploading;

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

      <div className="flex flex-col gap-2">
        <label htmlFor="board-content" className="text-[14px] font-semibold text-ink">
          내용
        </label>
        <textarea
          id="board-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={14}
          placeholder="내용을 입력하세요."
          className={`${FIELD} resize-y leading-[1.7] ${isHtml ? "font-mono text-[13.5px]" : ""}`}
        />
        {isHtml && (
          <p className="text-[12.5px] text-[#6e7178]">
            이 글은 HTML 로 저장돼 있습니다. 태그가 그대로 화면에 반영되니 주의해서 수정하세요.
          </p>
        )}
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
