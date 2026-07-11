"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchContent, ContentsConfigError, type ContentDetail } from "@/lib/contents";

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; item: ContentDetail };

const fmtSize = (bytes: number) =>
  bytes >= 1048576 ? `${(bytes / 1048576).toFixed(1)}MB` : `${Math.max(1, Math.round(bytes / 1024))}KB`;

/** 게시판 상세 (공지·자료실 공용). fetchContent 는 게시판과 무관하게 idx 로 조회한다. */
export default function BoardDetail({
  idx,
  listPath,
  notFoundLabel = "게시글",
}: {
  idx: string;
  listPath: string;
  notFoundLabel?: string;
}) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let alive = true;
    fetchContent(idx)
      .then((item) => {
        if (alive) setState({ status: "ready", item });
      })
      .catch((err) => {
        if (!alive) return;
        setState({
          status: "error",
          message:
            err instanceof ContentsConfigError
              ? "게시판 설정이 완료되지 않았습니다."
              : `${notFoundLabel}을(를) 불러오지 못했습니다.`,
        });
      });
    return () => {
      alive = false;
    };
  }, [idx, notFoundLabel]);

  if (state.status === "loading") {
    return <div className="py-24 text-center text-[15px] text-[#6e7178]">불러오는 중…</div>;
  }

  if (state.status === "error") {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <i className="ph ph-warning-circle" style={{ fontSize: 36, color: "#6E7178" }} />
        <div className="text-[15px] text-[#52555b]">{state.message}</div>
        <Link href={listPath} className="btn-outline-light !px-6 !py-3">
          목록으로
        </Link>
      </div>
    );
  }

  const { item } = state;

  return (
    <article>
      <header className="border-b border-black/10 pb-7">
        <h1 className="m-0 break-keep text-[26px] font-semibold leading-[1.35] tracking-[-0.01em] text-ink sm:text-[30px]">
          {item.title}
        </h1>
        <div className="mt-4 flex items-center gap-4 font-mono text-[13px] text-[#9aa0a6]">
          <span>{item.date.slice(0, 10)}</span>
          <span className="inline-flex items-center gap-1">
            <i className="ph ph-eye" style={{ fontSize: 14 }} />
            {item.views}
          </span>
        </div>
      </header>

      {item.content &&
        (item.isHtml ? (
          <div
            className="board-content py-10 text-[16px] leading-[1.8] text-[#33363b]"
            // 관리자만 작성하는 신뢰된 콘텐츠
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        ) : (
          <div className="whitespace-pre-wrap break-keep py-10 text-[16px] leading-[1.8] text-[#33363b]">
            {item.content}
          </div>
        ))}

      {item.files.length > 0 && (
        <div className="mb-10 mt-4 rounded-2xl border border-black/10 bg-[#f4f5f7] p-6">
          <div className="mb-4 text-[14px] font-semibold text-ink">첨부파일</div>
          <div className="flex flex-col gap-2.5">
            {item.files.map((f) => (
              <a
                key={f.idx}
                href={f.url}
                download
                className="group flex items-center gap-3 rounded-lg border border-black/10 bg-white px-4 py-3 transition-colors hover:border-accent"
              >
                <i className="ph ph-download-simple text-accent" style={{ fontSize: 18 }} />
                <span className="flex-1 break-all text-[14.5px] text-ink">{f.name}</span>
                {f.ext && (
                  <span className="flex-shrink-0 rounded bg-black/[0.05] px-2 py-0.5 font-mono text-[11px] font-semibold uppercase text-[#6e7178]">
                    {f.ext}
                  </span>
                )}
                <span className="flex-shrink-0 font-mono text-[12.5px] text-[#9aa0a6]">
                  {fmtSize(f.size)}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center border-t border-black/10 pt-10">
        <Link href={listPath} className="btn-outline-light !px-8 !py-4">
          <i className="ph ph-list" style={{ color: "#6EA921" }} />
          목록으로
        </Link>
      </div>
    </article>
  );
}
