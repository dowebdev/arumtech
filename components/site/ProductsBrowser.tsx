"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
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
  "cursor-pointer whitespace-nowrap rounded-md border px-[18px] py-[9px] text-[16px] transition-colors";

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

  /** 사이트맵에는 있으나 아직 제품 데이터가 없는 서브 라인 */
  const emptyGroup =
    showGroups &&
    group !== "전체" &&
    !query.trim() &&
    products.every((p) => p.group !== (group as ProductGroup));

  return (
    <>
      <div className="mb-2 flex flex-wrap items-center gap-4">
        <div className="flex flex-1 flex-wrap gap-2">
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

        <div className="flex min-w-[220px] items-center gap-2.5 rounded-lg border border-black/10 bg-white px-3.5 py-2.5">
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
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-black/10 bg-[#f4f5f7] p-3">
          <span className="mr-1 pl-1.5 font-mono text-[12px] font-semibold tracking-[0.08em] text-[#9aa0a6]">
            SUB LINE
          </span>
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
                className="cursor-pointer whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[14px] transition-colors"
                style={{
                  fontWeight: active ? 600 : 500,
                  borderColor: active ? "#6EA921" : "rgba(0,0,0,0.10)",
                  color: active ? "#1A1D23" : count === 0 ? "#9aa0a6" : "#52555b",
                  background: active ? "rgba(110,169,33,0.10)" : "#ffffff",
                }}
              >
                {g}
                <span className="ml-1.5 font-mono text-[12px] text-[#9aa0a6]">{count}</span>
              </button>
            );
          })}
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
