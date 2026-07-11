"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  downloads,
  DOWNLOAD_CATEGORIES,
  downloadCatIcon,
  downloadFmtColor,
} from "@/lib/data";

export default function DownloadsBrowser() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("cat") ?? "전체";
  const [cat, setCat] = useState(
    DOWNLOAD_CATEGORIES.includes(initial) ? initial : "전체"
  );

  const filtered = cat === "전체" ? downloads : downloads.filter((d) => d.cat === cat);

  return (
    <>
      <div className="mb-7 flex flex-wrap gap-2">
        {DOWNLOAD_CATEGORIES.map((c) => {
          const active = c === cat;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className="cursor-pointer whitespace-nowrap rounded-md border px-[18px] py-[9px] text-[16px] transition-colors"
              style={{
                fontWeight: active ? 600 : 500,
                borderColor: active ? "#6EA921" : "rgba(0,0,0,0.10)",
                color: active ? "#ffffff" : "#6e7178",
                background: active ? "#6EA921" : "transparent",
              }}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="mb-5 text-[14px] text-[#6e7178]">
        총 <span className="font-mono font-semibold text-accent">{filtered.length}</span>개 자료
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filtered.map((d) => (
          <div
            key={d.id}
            className="flex items-center gap-5 rounded-[14px] border border-black/10 bg-[#f4f5f7] p-6 transition-colors hover:border-black/25"
          >
            <div className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-xl border border-black/15 bg-white">
              <i className={downloadCatIcon(d.cat)} style={{ fontSize: 26, color: "#6EA921" }} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="rounded-full border border-black/10 px-2 py-[2px] font-mono text-[11px] font-semibold tracking-[0.06em] text-[#52555b]">
                  {d.cat}
                </span>
                <span className="font-mono text-[12px] font-semibold" style={{ color: downloadFmtColor(d.fmt) }}>
                  {d.fmt}
                </span>
              </div>
              <div className="truncate text-[16px] font-semibold leading-[1.4] text-ink">
                {d.title}
              </div>
              <div className="mt-1 text-[13px] text-[#6e7178]">
                관련 제품 · {d.product} · {d.size}
              </div>
            </div>
            <button
              type="button"
              className="flex flex-shrink-0 cursor-pointer items-center gap-[7px] rounded-lg border border-black/10 bg-white px-4 py-[11px] text-[14px] font-semibold text-ink transition-colors hover:border-accent"
            >
              <i className="ph ph-download-simple" style={{ color: "#6EA921", fontSize: 15 }} />
              다운로드
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
