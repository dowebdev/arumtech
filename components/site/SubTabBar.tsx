"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 공용 서브탭 바 (섹션 하위 내비게이션).
 *
 * - 헤더 바로 아래에 sticky 로 고정된다.
 * - 탭이 폭에 들어가면 가운데 정렬, 넘치면 가로 스크롤(스크롤바는 숨김) + 좌우 화살표로 넘긴다.
 *   화살표는 스크롤 여지가 있는 방향에만 나타난다. (about 처럼 탭이 몇 개뿐이면 화살표는 안 보인다.)
 *
 * rootHref: 섹션 루트 탭(예: /about). 이 탭만 정확히 일치할 때 활성, 나머지는 하위 경로까지 활성.
 */
type Tab = { label: string; href: string };

export default function SubTabBar({
  tabs,
  rootHref,
}: {
  tabs: Tab[];
  rootHref?: string;
}) {
  const pathname = usePathname();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 1);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    update();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update, tabs]);

  const scrollByDir = (dir: number) => {
    const el = scrollerRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  const isActive = (href: string) =>
    href === rootHref ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="sticky top-[54px] z-40 border-b border-black/10 bg-white sm:top-[68px]">
      <div className="container-site relative">
        {/* 왼쪽 화살표 — 왼쪽으로 더 스크롤할 수 있을 때만 */}
        {canLeft && (
          <button
            type="button"
            aria-label="이전 메뉴"
            onClick={() => scrollByDir(-1)}
            className="absolute left-0 top-0 z-10 flex h-full items-center bg-gradient-to-r from-white via-white to-transparent pl-1 pr-6 text-[#52555b] transition-colors hover:text-ink"
          >
            <i className="ph ph-caret-left" style={{ fontSize: 20 }} />
          </button>
        )}

        <div
          ref={scrollerRef}
          className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* 들어가면 가운데 정렬(w-fit + mx-auto), 넘치면 스크롤된다. */}
          <div className="mx-auto flex w-fit gap-1">
            {tabs.map((t) => {
              const active = isActive(t.href);
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className={`whitespace-nowrap px-5 py-4 text-[14px] transition-colors sm:text-[16px] ${
                    active ? "text-ink" : "text-[#52555b] hover:text-ink"
                  }`}
                  style={{
                    borderBottom: `2px solid ${active ? "#6EA921" : "transparent"}`,
                    fontWeight: active ? 600 : 500,
                  }}
                >
                  {t.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* 오른쪽 화살표 — 오른쪽으로 더 스크롤할 수 있을 때만 */}
        {canRight && (
          <button
            type="button"
            aria-label="다음 메뉴"
            onClick={() => scrollByDir(1)}
            className="absolute right-0 top-0 z-10 flex h-full items-center bg-gradient-to-l from-white via-white to-transparent pl-6 pr-1 text-[#52555b] transition-colors hover:text-ink"
          >
            <i className="ph ph-caret-right" style={{ fontSize: 20 }} />
          </button>
        )}
      </div>
    </div>
  );
}
