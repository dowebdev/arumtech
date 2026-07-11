"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchContentsList, ContentsConfigError, type ContentItem } from "@/lib/contents";
import Pagination from "./Pagination";

const PER_PAGE = 10;

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; items: ContentItem[] };

export default function NoticeBoard() {
  const [state, setState] = useState<State>({ status: "loading" });
  const [page, setPage] = useState(1);

  useEffect(() => {
    let alive = true;
    fetchContentsList("notice", { limit: 100 })
      .then((res) => {
        if (alive) setState({ status: "ready", items: res.items });
      })
      .catch((err) => {
        if (!alive) return;
        setState({
          status: "error",
          message:
            err instanceof ContentsConfigError
              ? "게시판 설정이 완료되지 않았습니다."
              : "공지사항을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
        });
      });
    return () => {
      alive = false;
    };
  }, []);

  if (state.status === "loading") {
    return (
      <div className="rounded-2xl border border-black/10 py-24 text-center text-[15px] text-[#6e7178]">
        불러오는 중…
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/10 bg-[#f4f5f7] py-20 text-center">
        <i className="ph ph-warning-circle" style={{ fontSize: 36, color: "#6E7178" }} />
        <div className="text-[15px] text-[#52555b]">{state.message}</div>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/10 bg-[#f4f5f7] py-20 text-center">
        <i className="ph ph-megaphone" style={{ fontSize: 36, color: "#6E7178" }} />
        <div className="text-[15px] text-[#52555b]">등록된 공지사항이 없습니다.</div>
      </div>
    );
  }

  const totalPage = Math.ceil(state.items.length / PER_PAGE);
  const paged = state.items.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-black/10">
        {paged.map((n) => (
          <Link
            key={n.idx}
            href={`/about/news/${n.idx}`}
            className="flex items-center gap-6 border-b border-black/10 px-7 py-6 transition-colors last:border-b-0 hover:bg-[#f7f8fa]"
          >
            <span className="w-24 flex-shrink-0 font-mono text-[14px] text-[#6e7178]">
              {n.date.slice(0, 10)}
            </span>
            {n.pinned && (
              <span className="flex-shrink-0 rounded-full bg-accent/[0.12] px-2.5 py-[3px] text-[12px] font-semibold tracking-[0.04em] text-accent">
                공지
              </span>
            )}
            <span className="flex-1 text-[18px] font-medium text-ink">{n.title}</span>
            <span className="hidden flex-shrink-0 items-center gap-1 font-mono text-[13px] text-[#9aa0a6] sm:flex">
              <i className="ph ph-eye" style={{ fontSize: 14 }} />
              {n.views}
            </span>
            <i className="ph ph-arrow-up-right" style={{ fontSize: 18, color: "#6E7178" }} />
          </Link>
        ))}
      </div>

      <Pagination page={page} totalPage={totalPage} onChange={setPage} />
    </>
  );
}
