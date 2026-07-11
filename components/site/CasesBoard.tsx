"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { fetchContentsList, ContentsConfigError, type ContentItem } from "@/lib/contents";
import Pagination from "./Pagination";

/** 아름텍 설치사례 카테고리 (기존 사이트 기준). */
const CATEGORIES = [
  "전체",
  "Domestic",
  "International",
  "강당/공연장",
  "관공서/학교",
  "기업/상업시설",
  "종교시설",
] as const;
const PER_PAGE = 12;

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; items: ContentItem[] };

export default function CasesBoard() {
  const [state, setState] = useState<State>({ status: "loading" });
  const [category, setCategory] = useState<string>("전체");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let alive = true;
    fetchContentsList("cases", { limit: 100, withContent: true })
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
              : "설치사례를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
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

  return (
    <>
      {/* 카테고리 필터 */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const active = c === category;
          return (
            <button
              key={c}
              type="button"
              onClick={() => selectCategory(c)}
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
            <i className="ph ph-buildings" style={{ fontSize: 36, color: "#6E7178" }} />
            <div className="text-[15px] text-[#52555b]">
              {category === "전체"
                ? "등록된 설치사례가 없습니다."
                : `'${category}' 설치사례가 없습니다.`}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paged.map((item) => (
                <Link
                  key={item.idx}
                  href={`/cases/${item.idx}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white transition-colors hover:border-accent"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f5f7]">
                    {item.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <i className="ph ph-image" style={{ fontSize: 44, color: "#c2c5c9" }} />
                      </div>
                    )}
                    {item.category && (
                      <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[11.5px] font-medium text-white backdrop-blur">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <h3 className="m-0 break-keep text-[17px] font-semibold leading-[1.4] text-ink">
                      {item.title}
                    </h3>
                    <span className="mt-auto font-mono text-[12.5px] text-[#9aa0a6]">
                      {item.date.slice(0, 10)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <Pagination page={page} totalPage={totalPage} onChange={setPage} />
          </>
        ))}
    </>
  );
}
