"use client";

import { useState } from "react";
import CaseCard from "./CaseCard";
import { cases, CASE_CATEGORIES } from "@/lib/data";

export default function CasesBrowser() {
  const [cat, setCat] = useState("전체");
  const filtered = cat === "전체" ? cases : cases.filter((c) => c.type === cat);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {CASE_CATEGORIES.map((c) => {
          const active = c === cat;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
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

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
        {filtered.map((c) => (
          <CaseCard key={c.slug} study={c} light />
        ))}
      </div>
    </>
  );
}
