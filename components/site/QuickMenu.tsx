"use client";

import Link from "next/link";
import { SITE } from "@/lib/data";

/**
 * 우측 하단 퀵메뉴. 모바일에서는 화면을 많이 가려서 크게 줄인다 (56px → 38px).
 * sm 이상은 기존 크기 그대로.
 */
const BUTTON = "flex h-[38px] w-[38px] items-center justify-center rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.5)] sm:h-14 sm:w-14";
const ICON = "text-[17px] sm:text-[24px]";

export default function QuickMenu() {
  return (
    <div className="fixed bottom-[calc(72px+env(safe-area-inset-bottom))] right-4 z-[200] flex flex-col items-end gap-2 sm:right-6 sm:gap-3 lg:bottom-6">
      {/* 문의하기 */}
      <Quick tip="문의하기" tipFont="sans">
        <Link href="/contact" aria-label="문의하기" className={`${BUTTON} bg-accent text-white`}>
          <i className={`ph ph-chat-circle-text ${ICON}`} />
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
        <span className={`${BUTTON} border border-cream/[0.18] bg-[#16191D] text-cream`}>
          <i className={`ph ph-phone ${ICON}`} />
        </span>
      </Quick>

      {/* 맨 위로 */}
      <Quick tip="맨 위로" tipFont="sans">
        <button
          type="button"
          aria-label="맨 위로"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`${BUTTON} border border-cream/[0.18] bg-[#16191D] text-cream`}
        >
          <i className={`ph ph-arrow-up ${ICON}`} />
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
