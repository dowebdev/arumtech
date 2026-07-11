"use client";

/** 페이지 번호 목록. 총 페이지가 많으면 현재 주변만 남기고 "…" 로 축약한다. */
function pageNumbers(page: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "…")[] = [];
  for (let p = 1; p <= total; p++) {
    if (p === 1 || p === total || Math.abs(p - page) <= 1) {
      out.push(p);
    } else if (out[out.length - 1] !== "…") {
      out.push("…");
    }
  }
  return out;
}

export default function Pagination({
  page,
  totalPage,
  onChange,
}: {
  page: number;
  totalPage: number;
  onChange: (page: number) => void;
}) {
  if (totalPage <= 1) return null;

  const nums = pageNumbers(page, totalPage);

  const arrowCls =
    "flex h-9 w-9 items-center justify-center rounded-md border border-black/10 text-[#52555b] transition-colors enabled:cursor-pointer enabled:hover:border-accent enabled:hover:text-accent disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav className="mt-12 flex items-center justify-center gap-1.5" aria-label="페이지">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="이전 페이지"
        className={arrowCls}
      >
        <i className="ph ph-caret-left" style={{ fontSize: 16 }} />
      </button>

      {nums.map((n, i) =>
        n === "…" ? (
          <span key={`gap-${i}`} className="px-1 text-[14px] text-[#9aa0a6]">
            …
          </span>
        ) : (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-current={n === page ? "page" : undefined}
            className="flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-md border px-2 font-mono text-[14px] transition-colors"
            style={{
              fontWeight: n === page ? 700 : 500,
              borderColor: n === page ? "#6EA921" : "rgba(0,0,0,0.10)",
              color: n === page ? "#ffffff" : "#52555b",
              background: n === page ? "#6EA921" : "transparent",
            }}
          >
            {n}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPage}
        aria-label="다음 페이지"
        className={arrowCls}
      >
        <i className="ph ph-caret-right" style={{ fontSize: 16 }} />
      </button>
    </nav>
  );
}
