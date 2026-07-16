"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import {
  products,
  PRODUCT_LINES,
  LINE_EXTERNAL_LINKS,
  FULL_RANGE_GROUPS,
  type ProductLine,
  type ProductGroup,
} from "@/lib/data";

const TABS = ["전체", ...PRODUCT_LINES] as const;
const GROUP_TABS = ["전체", ...FULL_RANGE_GROUPS] as const;

const TAB_CLS =
  "shrink-0 cursor-pointer whitespace-nowrap rounded-md border px-3.5 py-2 text-[14px] transition-colors sm:px-[18px] sm:py-[9px] sm:text-[16px]";

export default function ProductsBrowser() {
  const searchParams = useSearchParams();
  const initialLine = searchParams.get("line") ?? "전체";
  const initialGroup = searchParams.get("group") ?? "전체";

  const [tab, setTab] = useState<string>(
    (TABS as readonly string[]).includes(initialLine) ? initialLine : "전체"
  );
  const [group, setGroup] = useState<string>(
    (GROUP_TABS as readonly string[]).includes(initialGroup) ? initialGroup : "전체"
  );
  const [query, setQuery] = useState("");

  // useState 초기값은 마운트 때 한 번만 계산된다. Next.js 는 /products 안에서 이동할 때
  // ProductsBrowser 를 마운트된 채로 재사용하고 searchParams 만 바꾸므로(푸터의 라인 링크가
  // 그렇다), URL 이 바뀌어도 탭이 옛 값에 머문다. searchParams 를 따라 동기화한다.
  useEffect(() => {
    setTab((TABS as readonly string[]).includes(initialLine) ? initialLine : "전체");
    setGroup((GROUP_TABS as readonly string[]).includes(initialGroup) ? initialGroup : "전체");
  }, [initialLine, initialGroup]);

  const showGroups = tab === "Full Range";

  const filtered = useMemo(() => {
    let list = tab === "전체" ? products : products.filter((p) => p.line === (tab as ProductLine));

    if (showGroups && group !== "전체") {
      list = list.filter((p) => p.group === (group as ProductGroup));
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.model.toLowerCase().includes(q) ||
          (p.kicker ?? "").toLowerCase().includes(q) ||
          (p.en ?? "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [tab, group, showGroups, query]);

  // 모바일 카테고리 한 줄 가로 스크롤 — 넘칠 때만 좌우 화살표를 띄운다.
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
  }, [updateArrows]);

  const scrollTabs = (dir: number) => {
    const el = scrollerRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  /** 사이트맵에는 있으나 아직 제품 데이터가 없는 서브 라인 */
  const emptyGroup =
    showGroups &&
    group !== "전체" &&
    !query.trim() &&
    products.every((p) => p.group !== (group as ProductGroup));

  return (
    <>
      <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        {/* 카테고리 — 모바일은 한 줄 가로 스크롤(넘치면 좌우 화살표), sm 이상은 기존 flex-wrap */}
        <div className="relative min-w-0 sm:flex-1">
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
            {TABS.map((t) => {
            const active = t === tab;
            const external = LINE_EXTERNAL_LINKS[t as ProductLine];
            const style = {
              fontWeight: active ? 600 : 500,
              borderColor: active ? "#6EA921" : "rgba(0,0,0,0.12)",
              color: active ? "#ffffff" : "#52555b",
              background: active ? "#6EA921" : "transparent",
            } as const;

            if (external) {
              return (
                <a
                  key={t}
                  href={external}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${t} — 외부 사이트에서 열림`}
                  className={`${TAB_CLS} group inline-flex items-center gap-2 hover:border-accent`}
                  style={style}
                >
                  {t}
                  {/* 외부 링크 표시 — 회색 화살표는 탭 배경에 묻혀서 accent 칩으로 감쌌다 */}
                  <span
                    aria-hidden="true"
                    className="inline-flex h-[20px] w-[20px] flex-shrink-0 items-center justify-center rounded-full bg-accent/[0.14] transition-colors group-hover:bg-accent"
                  >
                    <i
                      className="ph ph-arrow-up-right text-accent transition-colors group-hover:text-white"
                      style={{ fontSize: 13 }}
                    />
                  </span>
                  <span className="sr-only">(외부 사이트, 새 창에서 열림)</span>
                </a>
              );
            }

            return (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTab(t);
                  setGroup("전체");
                }}
                className={TAB_CLS}
                style={style}
              >
                {t}
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

        <div className="flex w-full items-center gap-2.5 rounded-lg border border-black/10 bg-white px-3.5 py-2.5 sm:w-auto sm:min-w-[220px]">
          <i className="ph ph-magnifying-glass" style={{ fontSize: 16, color: "#6E7178" }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="모델명 검색"
            className="w-full border-none bg-transparent text-sm text-ink outline-none placeholder:text-[#6e7178]"
          />
        </div>
      </div>

      {/* Full Range 서브 라인 */}
      {showGroups && (
        <div className="mt-4 rounded-xl border border-black/10 bg-[#f4f5f7] p-3">
          {/* 모바일: SUB LINE 라벨 아래 4열 그리드(8개 → 2줄), 갯수 숨김, 사각 버튼. sm 이상: 기존 알약 한 줄. */}
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <span className="pl-0.5 font-mono text-[12px] font-semibold tracking-[0.08em] text-[#9aa0a6] sm:mr-1 sm:pl-1.5">
              SUB LINE
            </span>
            <div className="grid grid-cols-4 gap-2 sm:contents">
              {GROUP_TABS.map((g) => {
                const active = g === group;
                const count =
                  g === "전체"
                    ? products.filter((p) => p.line === "Full Range").length
                    : products.filter((p) => p.group === (g as ProductGroup)).length;

                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGroup(g)}
                    className="flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border px-1 py-2 text-center text-[11.5px] transition-colors sm:inline-flex sm:rounded-full sm:px-3.5 sm:py-1.5 sm:text-[14px]"
                    style={{
                      fontWeight: active ? 600 : 500,
                      borderColor: active ? "#6EA921" : "rgba(0,0,0,0.10)",
                      color: active ? "#1A1D23" : count === 0 ? "#9aa0a6" : "#52555b",
                      background: active ? "rgba(110,169,33,0.10)" : "#ffffff",
                    }}
                  >
                    {g}
                    <span className="ml-1.5 hidden font-mono text-[12px] text-[#9aa0a6] sm:inline">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="my-5 text-[13px] text-[#6e7178]">
        총 <span className="font-mono font-semibold text-accent">{filtered.length}</span>개 제품
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} showTags light />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/10 bg-[#f4f5f7] py-20 text-center">
          <i
            className={`ph ${emptyGroup ? "ph-clock" : "ph-magnifying-glass"}`}
            style={{ fontSize: 40, color: "#6E7178" }}
          />
          <div className="text-[15px] text-[#52555b]">
            {emptyGroup ? `${group} 제품 정보는 준비 중입니다.` : "검색 결과가 없습니다."}
          </div>
        </div>
      )}
    </>
  );
}
