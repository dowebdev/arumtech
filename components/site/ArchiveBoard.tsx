"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  fetchContentsList,
  ContentsConfigError,
  BOARD_CATEGORIES,
  type ContentItem,
} from "@/lib/contents";
import Pagination from "./Pagination";

const CATEGORIES = ["전체", ...BOARD_CATEGORIES.archive] as const;
const PER_PAGE = 12;

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; items: ContentItem[] };

export default function ArchiveBoard() {
  const [state, setState] = useState<State>({ status: "loading" });
  const [category, setCategory] = useState<string>("전체");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let alive = true;
    fetchContentsList("archive", { limit: 100 })
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
              : "자료실을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
        });
      });
    return () => {
      alive = false;
    };
  }, []);

  const items = state.status === "ready" ? state.items : [];
  const filtered = useMemo(
    () => (category === "전체" ? items : items.filter((i) => i.category === category)),
    [items, category]
  );

  const totalPage = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const selectCategory = (c: string) => {
    setCategory(c);
    setPage(1);
  };

  // 모바일 카테고리 한 줄 가로 스크롤 — 넘칠 때만 좌우 화살표 (제품소개·설치사례와 동일 패턴).
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 1);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows, state.status]);

  const scrollTabs = (dir: number) => {
    const el = scrollerRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <>
      {/* 카테고리 필터 — 모바일 한 줄 가로 스크롤(넘치면 좌우 화살표), sm 이상은 flex-wrap */}
      <div className="relative mb-6">
        {canLeft && (
          <button
            type="button"
            aria-label="이전 카테고리"
            onClick={() => scrollTabs(-1)}
            className="absolute left-0 top-0 z-10 flex h-full items-center bg-gradient-to-r from-white via-white to-transparent pl-0.5 pr-5 text-[#52555b] sm:hidden"
          >
            <i className="ph ph-caret-left" style={{ fontSize: 18 }} />
          </button>
        )}
        <div
          ref={scrollerRef}
          className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible"
        >
          {CATEGORIES.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                type="button"
                onClick={() => selectCategory(c)}
                className="shrink-0 cursor-pointer whitespace-nowrap rounded-md border px-3.5 py-2 text-[14px] transition-colors sm:px-[18px] sm:py-[9px] sm:text-[16px]"
                style={{
                  fontWeight: active ? 600 : 500,
                  borderColor: active ? "#6EA921" : "rgba(0,0,0,0.12)",
                  color: active ? "#ffffff" : "#52555b",
                  background: active ? "#6EA921" : "transparent",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
        {canRight && (
          <button
            type="button"
            aria-label="다음 카테고리"
            onClick={() => scrollTabs(1)}
            className="absolute right-0 top-0 z-10 flex h-full items-center bg-gradient-to-l from-white via-white to-transparent pl-5 pr-0.5 text-[#52555b] sm:hidden"
          >
            <i className="ph ph-caret-right" style={{ fontSize: 18 }} />
          </button>
        )}
      </div>

      {state.status === "loading" && (
        <div className="rounded-2xl border border-black/10 py-24 text-center text-[15px] text-[#6e7178]">
          불러오는 중…
        </div>
      )}

      {state.status === "error" && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/10 bg-[#f4f5f7] py-20 text-center">
          <i className="ph ph-warning-circle" style={{ fontSize: 36, color: "#6E7178" }} />
          <div className="text-[15px] text-[#52555b]">{state.message}</div>
        </div>
      )}

      {state.status === "ready" &&
        (filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/10 bg-[#f4f5f7] py-20 text-center">
            <i className="ph ph-folder-open" style={{ fontSize: 36, color: "#6E7178" }} />
            <div className="text-[15px] text-[#52555b]">
              {category === "전체" ? "등록된 자료가 없습니다." : `'${category}' 자료가 없습니다.`}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {paged.map((item) => (
                <Link
                  key={item.idx}
                  href={`/downloads/${item.idx}`}
                  className="group flex items-center gap-4 rounded-xl border border-black/10 bg-white px-6 py-5 transition-colors hover:border-accent"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-accent/[0.08] transition-colors group-hover:bg-accent">
                    <i
                      className="ph ph-file-text text-accent transition-colors group-hover:text-white"
                      style={{ fontSize: 20 }}
                    />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[16px] font-medium text-ink">{item.title}</span>
                    <span className="mt-0.5 flex items-center gap-2 font-mono text-[12.5px] text-[#9aa0a6]">
                      {item.category && (
                        <span className="rounded bg-black/[0.05] px-1.5 py-0.5 font-sans text-[11px] font-semibold text-[#6e7178]">
                          {item.category}
                        </span>
                      )}
                      {item.date.slice(0, 10)}
                    </span>
                  </span>
                  <i
                    className="ph ph-download-simple flex-shrink-0 text-[#9aa0a6] transition-colors group-hover:text-accent"
                    style={{ fontSize: 18 }}
                  />
                </Link>
              ))}
            </div>

            <Pagination page={page} totalPage={totalPage} onChange={setPage} />
          </>
        ))}
    </>
  );
}
