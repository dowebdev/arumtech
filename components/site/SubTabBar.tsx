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
      {/* container-site(px-5=20px) 대신 모바일 좌우 여백을 10px 로 줄인다. PC(sm:px-8=32px)는 유지. */}
      <div className="relative mx-auto w-full max-w-site px-2.5 sm:px-8">
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
          {/*
            모바일: 전체 폭에 균등 배치(min-w-full + justify-between)해 좌우 빈 공간을 없앤다.
            sm 이상: 가운데 정렬(w-fit + mx-auto). 넘치면(항목 많을 때) 스크롤된다.
          */}
          <div className="flex min-w-full justify-between gap-1 sm:mx-auto sm:min-w-0 sm:w-fit sm:justify-normal">
            {tabs.map((t) => {
              const active = isActive(t.href);
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className="relative whitespace-nowrap px-2 py-4 sm:px-5"
                >
                  <span
                    className={`relative inline-block text-[14px] transition-colors sm:text-[16px] ${
                      active ? "text-ink" : "text-[#52555b] hover:text-ink"
                    }`}
                    style={{ fontWeight: active ? 600 : 500 }}
                  >
                    {t.label}
                    {/*
                      연두 라인: 폭은 텍스트(span)와 동일하게(left-0 right-0), 위치는 바 맨 아래
                      회색 라인과 같은 선상에 오도록 py-4(16px) 만큼 내린다(-bottom-4).
                    */}
                    {active && (
                      <span className="absolute -bottom-4 left-0 right-0 h-[2px] bg-accent" />
                    )}
                  </span>
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
