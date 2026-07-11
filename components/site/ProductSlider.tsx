"use client";

import { useState } from "react";

/**
 * 제품 상세 하단 이미지 슬라이더 (원본 owl carousel 대응).
 * 한 번에 한 장을 보여주고 양쪽 화살표로 넘긴다. 끝에서는 순환한다.
 */
export default function ProductSlider({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  const total = images.length;

  if (total === 0) return null;

  const go = (delta: number) => setI((prev) => (prev + delta + total) % total);

  return (
    /**
     * 이미지는 660×660 정사각 박스 안에서만 움직이고, 화살표는 그 박스 바깥에 둔다.
     * 화살표 자리(11rem)를 좌우에 확보한 flex 로 잡아 겹치지 않게 한다.
     */
    <div className="flex flex-col items-center">
      <div className="flex w-full items-center justify-center gap-4 sm:gap-6">
        {total > 1 && <Arrow dir="left" onClick={() => go(-1)} />}

        <div className="aspect-square w-full max-w-[660px] flex-shrink overflow-hidden rounded-xl border border-black/10 bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={images[i]}
            src={images[i]}
            alt={`${alt} ${i + 1} / ${total}`}
            loading="lazy"
            className="block h-full w-full object-contain"
          />
        </div>

        {total > 1 && <Arrow dir="right" onClick={() => go(1)} />}
      </div>

      {total > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {images.map((src, n) => (
            <button
              key={src}
              type="button"
              aria-label={`${n + 1}번 이미지 보기`}
              aria-current={n === i}
              onClick={() => setI(n)}
              className="h-2 w-2 cursor-pointer rounded-full border-none transition-colors"
              style={{ background: n === i ? "#6EA921" : "rgba(0,0,0,0.18)" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Arrow({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  const left = dir === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={left ? "이전 이미지" : "다음 이미지"}
      className="flex h-11 w-11 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-colors hover:border-accent hover:bg-[#f4f5f7]"
    >
      <i
        className={`ph ${left ? "ph-caret-left" : "ph-caret-right"} text-ink`}
        style={{ fontSize: 20 }}
      />
    </button>
  );
}
