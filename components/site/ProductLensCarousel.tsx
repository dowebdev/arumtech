"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * 3D concave-lens product carousel (matches iparking.co.kr).
 *
 * Cards auto-scroll horizontally and loop seamlessly. Each card is transformed
 * by its horizontal distance from the viewport centre:
 *   - centre → upright, original size (sharp, facing forward)
 *   - edges  → larger AND rotated in 3D (rotateY) so they read as trapezoids,
 *              and their tops/bottoms trace a curved (concave-lens) envelope.
 *
 * Spacing is non-uniform: tight in the centre, gradually wider toward the edges
 * so cards never overlap. Everything is pure math off the scroll offset.
 */
type LensItem = { image?: string; label: string; href?: string; sub?: string[] };

const CARD_W = 380; // px (matches className)
const CARD_H = 488; // px (matches className)
const U = 400; // linear spacing between cards (centre gap = U - CARD_W)
const EXPAND = 0.18; // how much wider the spacing gets toward the edges
const SCALE_GAIN = 0.45; // how much bigger the outermost cards get
const MAX_ROT = 32; // deg of 3D rotateY at the edges
const PERSPECTIVE = 1600; // px, smaller = stronger 3D
const SPEED = 60; // auto-scroll px per second
const FRICTION = 0.965; // per-frame inertia decay (closer to 1 = glides further)
const FLICK_BOOST = 1.9; // multiply release velocity so one flick travels far
const MIN_V = 16; // px/s below which inertia stops
const MAX_V = 11000; // px/s velocity cap on a flick
const MOVE_THRESH = 6; // px of drag that counts as a swipe (suppresses click)
const CURSOR_EASE = 0.16; // glass cursor lag (lower = trails further behind)

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export default function ProductLensCarousel({
  items,
  fadeColor = "#0B0D10",
}: {
  items: LensItem[];
  fadeColor?: string; // edge-fade colour, match the section background
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  // Render the set three times for a seamless infinite loop.
  const loop = [...items, ...items, ...items];

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const n = items.length;
    const setWidth = U * n; // width of one full set (linear)
    let offset = -setWidth; // current scroll (centred on the middle set)
    let vpWidth = viewport.clientWidth;
    let centerY = (viewport.clientHeight - CARD_H) / 2;

    // drag / inertia state
    let dragging = false;
    let captured = false; // only capture the pointer once a real drag starts
    let velocity = 0; // px/s, drives inertia after release
    let lastX = 0;
    let lastT = 0;
    let downX = 0;
    let moved = false;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onResize = () => {
      vpWidth = viewport.clientWidth;
      centerY = (viewport.clientHeight - CARD_H) / 2;
    };
    window.addEventListener("resize", onResize);

    // keep offset within (-2*setWidth, -setWidth] so cards always fill both sides
    const wrap = () => {
      while (offset > -setWidth) offset -= setWidth;
      while (offset <= -2 * setWidth) offset += setWidth;
    };

    // ----- pointer drag + flick -----
    const onDown = (e: PointerEvent) => {
      dragging = true;
      moved = false;
      captured = false;
      velocity = 0;
      lastX = downX = e.clientX;
      lastT = e.timeStamp;
      // NOTE: don't capture yet — a plain click must still reach the card link
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      offset += dx;
      const dt = (e.timeStamp - lastT) / 1000;
      if (dt > 0) {
        const v = clamp(dx / dt, -MAX_V, MAX_V);
        velocity = 0.7 * v + 0.3 * velocity; // light smoothing for the flick
      }
      lastX = e.clientX;
      lastT = e.timeStamp;
      if (Math.abs(e.clientX - downX) > MOVE_THRESH) {
        moved = true;
        if (!captured) {
          try {
            viewport.setPointerCapture(e.pointerId);
          } catch {}
          captured = true;
        }
      }
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      // boost the release velocity so a single flick carries far (slot-machine)
      velocity = clamp(velocity * FLICK_BOOST, -MAX_V, MAX_V);
      if (captured) {
        try {
          viewport.releasePointerCapture(e.pointerId);
        } catch {}
        captured = false;
      }
    };
    // a real swipe must not also trigger the card's link
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);
    viewport.addEventListener("click", onClickCapture, true);

    // ----- glass cursor that follows the pointer (mouse only) -----
    const cursor = cursorRef.current;
    let curTX = 0; // target (pointer) local position
    let curTY = 0;
    let curX = 0; // eased cursor position (trails the pointer)
    let curY = 0;
    let curReady = false;
    const onCursorMove = (e: PointerEvent) => {
      const r = viewport.getBoundingClientRect();
      curTX = e.clientX - r.left;
      curTY = e.clientY - r.top;
      if (!curReady) {
        curX = curTX;
        curY = curTY;
        curReady = true;
      }
    };
    const onCursorEnter = (e: PointerEvent) => {
      if (cursor && e.pointerType === "mouse") {
        const r = viewport.getBoundingClientRect();
        curTX = curX = e.clientX - r.left;
        curTY = curY = e.clientY - r.top;
        curReady = true;
        cursor.style.opacity = "1";
      }
    };
    const onCursorLeave = () => {
      if (cursor) cursor.style.opacity = "0";
    };
    viewport.addEventListener("pointermove", onCursorMove);
    viewport.addEventListener("pointerenter", onCursorEnter);
    viewport.addEventListener("pointerleave", onCursorLeave);

    let raf = 0;
    let last: number | undefined;

    const render = () => {
      const half = vpWidth / 2;
      for (let i = 0; i < cards.length; i++) {
        const p = offset + i * U + CARD_W / 2; // linear centre of the card
        const dx = p - half; // signed distance from viewport centre (linear)
        const nd = clamp(dx / half, -1.6, 1.6); // normalised
        const ad = Math.min(Math.abs(nd), 1);

        // Non-uniform spacing: push cards further out toward the edges.
        const screenX = half + dx * (1 + EXPAND * nd * nd);
        // Bigger + 3D-rotated toward the edges (flat/upright in the centre).
        const scale = 1 + SCALE_GAIN * ad * ad;
        const rot = -Math.sign(nd) * ad * ad * MAX_ROT;
        const tx = screenX - CARD_W / 2;

        const card = cards[i];
        card.style.transform = `translate(${tx.toFixed(1)}px,${centerY.toFixed(
          1
        )}px) scale(${scale.toFixed(3)}) rotateY(${rot.toFixed(1)}deg)`;
        card.style.zIndex = String(1000 - Math.round(ad * 1000));
        card.style.opacity =
          screenX < -CARD_W || screenX > vpWidth + CARD_W ? "0" : "1";
      }
    };

    const tick = (now: number) => {
      if (last === undefined) last = now;
      const dt = (now - last) / 1000;
      last = now;
      if (dragging) {
        // offset is driven directly by pointermove
      } else if (Math.abs(velocity) > MIN_V) {
        // inertia: flick harder → travels further, then decays
        offset += velocity * dt;
        velocity *= Math.pow(FRICTION, dt * 60);
        if (Math.abs(velocity) <= MIN_V) velocity = 0;
      } else if (!pausedRef.current && !reduced) {
        offset -= SPEED * dt; // gentle auto-scroll
      }
      wrap();
      render();
      if (cursor && curReady) {
        curX += (curTX - curX) * CURSOR_EASE;
        curY += (curTY - curY) * CURSOR_EASE;
        cursor.style.transform = `translate(${curX.toFixed(1)}px, ${curY.toFixed(
          1
        )}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
      viewport.removeEventListener("click", onClickCapture, true);
      viewport.removeEventListener("pointermove", onCursorMove);
      viewport.removeEventListener("pointerenter", onCursorEnter);
      viewport.removeEventListener("pointerleave", onCursorLeave);
    };
  }, [items]);

  return (
    <div
      ref={viewportRef}
      className="relative h-[740px] select-none overflow-hidden md:cursor-none"
      style={{ perspective: `${PERSPECTIVE}px`, touchAction: "pan-y" }}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      {/* soft fade on the far edges (matches section bg) */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[2000] w-40"
        style={{ background: `linear-gradient(to right, ${fadeColor}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[2000] w-40"
        style={{ background: `linear-gradient(to left, ${fadeColor}, transparent)` }}
      />

      {/* glass cursor (Apple-glass circle + white ↔), follows the pointer */}
      <div
        ref={cursorRef}
        className="pointer-events-none absolute left-0 top-0 z-[3000] flex h-[98px] w-[98px] items-center justify-center rounded-full opacity-0 transition-opacity duration-200"
        style={{
          backdropFilter: "blur(12px) saturate(180%) brightness(1.05)",
          WebkitBackdropFilter: "blur(12px) saturate(180%) brightness(1.05)",
          background: "rgba(255,255,255,0.02)",
          border: "none",
          // glass edge expressed purely with soft inner highlights (no hard border)
          boxShadow:
            "0 12px 38px rgba(0,0,0,0.20), inset 0 2px 4px rgba(255,255,255,0.38), inset 0 -7px 16px rgba(255,255,255,0.10), inset 0 0 14px rgba(255,255,255,0.10)",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))" }}
        >
          <path d="M4 12h16" />
          <path d="M7 8l-4 4 4 4" />
          <path d="M17 8l4 4-4 4" />
        </svg>
      </div>

      <div ref={trackRef} className="absolute inset-0">
        {loop.map((it, i) => (
          <Link
            key={`${it.label}-${i}`}
            href={it.href ?? "#"}
            aria-label={it.label}
            className="absolute left-0 top-0 block w-[380px]"
            style={{ transformOrigin: "center center", backfaceVisibility: "hidden" }}
          >
            <div className="relative h-[488px] w-[380px] overflow-hidden rounded-2xl border border-cream/10 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.6)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.image ?? "/images/products/placeholder.png"}
                alt={it.label}
                className="h-full w-full object-cover"
                draggable={false}
              />
              {/* top scrim for legible text */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-black/55 via-black/20 to-transparent" />
              {/* text rides WITH the image — scales + curves together */}
              <div
                className="pointer-events-none absolute left-1/2 top-6 w-full -translate-x-1/2 px-4 text-center text-white"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.85)" }}
              >
                <div className="text-[24px] font-bold tracking-[0.01em] text-accent">{it.label}</div>
                {it.sub && (
                  <div className="mt-2 text-[16px] font-thin leading-[1.5]">
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
    </div>
  );
}
