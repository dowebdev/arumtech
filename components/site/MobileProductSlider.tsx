"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * 모바일 전용 제품 라인업 슬라이드.
 *
 * PC 의 ProductLensCarousel(볼록렌즈 3D·글래스 커서·양끝 페이드)과 달리, 여기서는
 * 그냥 평평한 카드가 옆으로 자동으로 흐른다. 네이티브 가로 스크롤을 쓰므로 손가락
 * 스와이프가 그대로 되고, 자동 스크롤은 requestAnimationFrame 으로 scrollLeft 를 밀어준다.
 * 카드 집합을 3배로 복제해 끊김 없이 무한 반복한다.
 */
type SlideItem = { image?: string; label: string; href?: string; sub?: string[] };

const CARD_W = 240; // px (카드 너비, className 과 일치)
const GAP = 16; // px (gap-4)
const STEP = CARD_W + GAP;
const SPEED = 40; // 자동 스크롤 px/s
const RESUME_MS = 900; // 손가락을 뗀 뒤 자동 스크롤 재개까지 대기

export default function MobileProductSlider({ items }: { items: SlideItem[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 끊김 없는 루프를 위해 3배로 복제한다.
  const loop = [...items, ...items, ...items];

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const n = items.length;
    const setWidth = STEP * n; // 한 집합의 너비
    // 가운데 집합에서 시작 — 양옆으로 한 집합씩 여유가 있어 스와이프해도 카드가 비지 않는다.
    el.scrollLeft = setWidth;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 가운데 집합 범위를 벗어나면 한 집합만큼 이동해 되돌린다 (내용이 반복되므로 티가 안 난다).
    const wrap = () => {
      if (el.scrollLeft < setWidth * 0.5) el.scrollLeft += setWidth;
      else if (el.scrollLeft > setWidth * 2.5) el.scrollLeft -= setWidth;
    };
    el.addEventListener("scroll", wrap, { passive: true });

    // 손가락으로 만지는 동안은 자동 스크롤을 멈춘다.
    const pause = () => {
      pausedRef.current = true;
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
    const scheduleResume = () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(() => {
        pausedRef.current = false;
      }, RESUME_MS);
    };
    el.addEventListener("pointerdown", pause);
    el.addEventListener("pointerup", scheduleResume);
    el.addEventListener("pointercancel", scheduleResume);
    el.addEventListener("touchend", scheduleResume);

    let raf = 0;
    let last: number | undefined;
    let acc = 0; // 픽셀 소수부 누적 (scrollLeft 는 정수라 남는 값을 이월한다)

    const tick = (now: number) => {
      if (last === undefined) last = now;
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current && !reduced) {
        acc += SPEED * dt;
        const whole = Math.trunc(acc);
        if (whole !== 0) {
          el.scrollLeft += whole;
          acc -= whole;
          wrap();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      el.removeEventListener("scroll", wrap);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("pointerup", scheduleResume);
      el.removeEventListener("pointercancel", scheduleResume);
      el.removeEventListener("touchend", scheduleResume);
    };
  }, [items]);

  return (
    <div
      ref={scrollerRef}
      className="flex gap-4 overflow-x-auto px-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ scrollBehavior: "auto" }}
    >
      {loop.map((it, i) => (
        <Link
          key={`${it.label}-${i}`}
          href={it.href ?? "#"}
          aria-label={it.label}
          className="block w-[240px] flex-shrink-0"
          draggable={false}
        >
          <div className="relative h-[320px] w-[240px] overflow-hidden rounded-2xl border border-black/10 shadow-[0_12px_34px_-18px_rgba(0,0,0,0.5)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={it.image ?? "/images/products/placeholder.png"}
              alt={it.label}
              className="h-full w-full object-cover"
              draggable={false}
            />
            {/* 상단 스크림 — 글자 가독성 */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-black/55 via-black/20 to-transparent" />
            <div
              className="pointer-events-none absolute inset-x-0 top-5 px-4 text-center text-white"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.85)" }}
            >
              <div className="text-[19px] font-bold tracking-[0.01em] text-accent">{it.label}</div>
              {it.sub && (
                <div className="mt-1.5 text-[12.5px] font-light leading-[1.5]">
                  {it.sub.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
