"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import type { Product } from "@/lib/data";
import ProductCard from "./ProductCard";

/**
 * Genesis "Our Models" style horizontal carousel.
 * - Native scroll-snap track (touch/trackpad swipe works out of the box)
 * - Prev/Next arrows scroll one "page"
 * - Mouse drag-to-scroll
 * - Arrows disable at the track ends
 */
export default function ProductCarousel({
  eyebrow,
  title,
  moreLabel,
  moreHref,
  products,
}: {
  eyebrow: string;
  title: string;
  moreLabel?: string;
  moreHref?: string;
  products: Product[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  // --- mouse drag-to-scroll ---
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return; // touch handled natively
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = () => {
    drag.current.active = false;
  };
  // Prevent a click firing after a drag
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <>
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="m-0 text-[28px] font-semibold tracking-[-0.02em] text-cream sm:text-4xl">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {moreLabel && moreHref && (
            <Link
              href={moreHref}
              className="hidden items-center gap-1.5 text-sm text-muted transition-colors hover:text-white sm:flex"
            >
              {moreLabel} <i className="ph ph-arrow-right" />
            </Link>
          )}
          <div className="flex items-center gap-2">
            <CarouselButton dir="left" disabled={atStart} onClick={() => scrollByPage(-1)} />
            <CarouselButton dir="right" disabled={atEnd} onClick={() => scrollByPage(1)} />
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 sm:-mx-8 sm:px-8"
        style={{ cursor: "grab" }}
      >
        {products.map((p) => (
          <div
            key={p.slug}
            className="w-[78%] min-w-[78%] shrink-0 snap-start sm:w-[340px] sm:min-w-[340px]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </>
  );
}

function CarouselButton({
  dir,
  disabled,
  onClick,
}: {
  dir: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={dir === "left" ? "이전" : "다음"}
      onClick={onClick}
      disabled={disabled}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-white disabled:cursor-default disabled:border-cream/10 disabled:text-dim"
    >
      <i className={`ph ph-arrow-${dir}`} style={{ fontSize: 18 }} />
    </button>
  );
}
