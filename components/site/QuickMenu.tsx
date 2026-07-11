"use client";

import Link from "next/link";
import { SITE } from "@/lib/data";

export default function QuickMenu() {
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
      {/* 문의하기 */}
      <Quick tip="문의하기" tipFont="sans">
        <Link
          href="/contact"
          aria-label="문의하기"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
        >
          <i className="ph ph-chat-circle-text" style={{ fontSize: 24 }} />
        </Link>
      </Quick>

      {/* 전화하기 */}
      <Quick
        tip={
          <>
            <span className="mr-2 font-sans text-[11px] font-semibold text-muted">전화상담</span>
            {SITE.phone}
          </>
        }
        tipFont="mono"
        href={`tel:${SITE.phone}`}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cream/[0.18] bg-[#16191D] text-cream shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
          <i className="ph ph-phone" style={{ fontSize: 24 }} />
        </span>
      </Quick>

      {/* 맨 위로 */}
      <Quick tip="맨 위로" tipFont="sans">
        <button
          type="button"
          aria-label="맨 위로"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-cream/[0.18] bg-[#16191D] text-cream shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
        >
          <i className="ph ph-arrow-up" style={{ fontSize: 24 }} />
        </button>
      </Quick>
    </div>
  );
}

function Quick({
  children,
  tip,
  tipFont,
  href,
}: {
  children: React.ReactNode;
  tip: React.ReactNode;
  tipFont: "sans" | "mono";
  href?: string;
}) {
  const inner = (
    <div className="group relative flex items-center justify-end">
      <span
        className={`pointer-events-none absolute right-[calc(100%+12px)] whitespace-nowrap rounded-lg border border-cream/15 bg-[#16191D] px-4 py-2 text-[13px] font-semibold text-cream opacity-0 shadow-[0_6px_18px_rgba(0,0,0,0.4)] transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 translate-x-2 ${
          tipFont === "mono" ? "font-mono text-[15px] tracking-[0.02em]" : "font-sans"
        }`}
      >
        {tip}
      </span>
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="contents">
        {inner}
      </a>
    );
  }
  return inner;
}
