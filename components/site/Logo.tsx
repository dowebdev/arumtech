"use client";

import { useState } from "react";

export default function Logo({ height = 38 }: { height?: number }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className="font-mono font-bold tracking-[0.12em] text-cream"
        style={{ fontSize: height * 0.55 }}
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
      style={{ height, width: "auto", display: "block" }}
    />
  );
}
