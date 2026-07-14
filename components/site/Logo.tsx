"use client";

import { useState } from "react";

/**
 * SE AUDIOTECHNIK 로고.
 *
 * height 로 고정 크기를 주거나, className 으로 반응형 크기를 줄 수 있다
 * (예: 헤더는 모바일에서 더 작게 — `h-[36px] sm:h-[46px]`).
 * className 을 주면 인라인 height 는 쓰지 않는다.
 */
export default function Logo({
  height = 38,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`font-mono font-bold tracking-[0.12em] text-cream ${
          className ? "text-[18px] sm:text-[24px]" : ""
        }`}
        style={className ? undefined : { fontSize: height * 0.55 }}
      >
        SE AUDIOTECHNIK
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="https://se-audiotechnik.de/wp-content/uploads/2023/06/SE_Audio_Logo.svg"
      alt="SE AUDIOTECHNIK"
      onError={() => setFailed(true)}
      className={`block w-auto ${className}`}
      style={className ? undefined : { height, width: "auto", display: "block" }}
    />
  );
}
