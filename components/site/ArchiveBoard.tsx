"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { fetchContentsList, ContentsConfigError, type ContentItem } from "@/lib/contents";

/** 아름텍 자료실 카테고리 (기존 사이트 기준). */
const CATEGORIES = ["전체", "메뉴얼", "물가정보", "카탈로그", "기술자료", "도면자료", "시방서"] as const;

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; items: ContentItem[] };

export default function ArchiveBoard() {
  const [state, setState] = useState<State>({ status: "loading" });
  const [category, setCategory] = useState<string>("전체");

  useEffect(() => {
    let alive = true;
    fetchContentsList("archive", { limit: 48 })
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

  return (
    <>
      {/* 카테고리 필터 */}
      <div className="mb-7 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const active = c === category;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className="cursor-pointer whitespace-nowrap rounded-md border px-[18px] py-[9px] text-[16px] transition-colors"
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {filtered.map((item) => (
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
        ))}
    </>
  );
}
