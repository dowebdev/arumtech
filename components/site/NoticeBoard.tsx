"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchContentsList, ContentsConfigError, type ContentItem } from "@/lib/contents";
import Pagination from "./Pagination";

const PER_PAGE = 12;

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; items: ContentItem[] };

/** NEWS — 이미지 게시판. 썸네일은 첨부 이미지 또는 본문 첫 이미지에서 온다 (withContent 필요). */
export default function NoticeBoard() {
  const [state, setState] = useState<State>({ status: "loading" });
  const [page, setPage] = useState(1);

  useEffect(() => {
    let alive = true;
    fetchContentsList("notice", { limit: 100, withContent: true })
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
              : "소식을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
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
        <div className="text-[15px] text-[#52555b]">등록된 소식이 없습니다.</div>
      </div>
    );
  }

  const totalPage = Math.ceil(state.items.length / PER_PAGE);
  const paged = state.items.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paged.map((n) => (
          <Link
            key={n.idx}
            href={`/about/news/${n.idx}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white transition-colors hover:border-accent"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f5f7]">
              {n.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={n.thumbnail}
                  alt={n.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <i className="ph ph-image" style={{ fontSize: 44, color: "#c2c5c9" }} />
                </div>
              )}
              {n.pinned && (
                <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[11.5px] font-semibold tracking-[0.04em] text-white">
                  공지
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2 p-6">
              <h3 className="m-0 break-keep text-[17px] font-semibold leading-[1.4] text-ink">
                {n.title}
              </h3>
              <div className="mt-auto flex items-center justify-between font-mono text-[12.5px] text-[#9aa0a6]">
                <span>{n.date.slice(0, 10)}</span>
                <span className="inline-flex items-center gap-1">
                  <i className="ph ph-eye" style={{ fontSize: 14 }} />
                  {n.views}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Pagination page={page} totalPage={totalPage} onChange={setPage} />
    </>
  );
}
