import type { CSSProperties } from "react";

const GRID_BG: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(244,241,234,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(244,241,234,0.035) 1px, transparent 1px)",
  backgroundSize: "44px 44px",
};

/** Gradient product placeholder with a centered speaker glyph. */
export function ProductVisual({
  iconSize = 64,
  grid = false,
  className = "",
}: {
  iconSize?: number;
  grid?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#181C22] to-ink ${className}`}
    >
      <div className="spotlight absolute inset-0" />
      {grid && <div className="absolute inset-0" style={GRID_BG} />}
      <i
        className="ph ph-speaker-hifi"
        style={{ fontSize: iconSize, color: "rgba(244,241,234,0.32)" }}
      />
    </div>
  );
}

/**
 * Product photo on a light catalog panel (premium look on the dark theme).
 * Falls back to the gradient placeholder when no image is provided.
 */
export function ProductImage({
  src,
  alt,
  iconSize = 64,
  grid = false,
  className = "",
  pad = "p-6",
}: {
  src?: string;
  alt: string;
  iconSize?: number;
  grid?: boolean;
  className?: string;
  pad?: string;
}) {
  if (!src) {
    return <ProductVisual iconSize={iconSize} grid={grid} className={className} />;
  }
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-white ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={`h-full w-full object-contain ${pad}`} />
    </div>
  );
}

/** Gradient case-study placeholder with a buildings glyph. */
export function CaseVisual({
  className = "",
  grid = true,
}: {
  className?: string;
  grid?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-b from-[#20262E] to-ink ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.12), transparent 65%)",
        }}
      />
      {grid && <div className="absolute inset-0" style={GRID_BG} />}
    </div>
  );
}

/**
 * Real installation photo (full-bleed cover) with a dark scrim so overlaid
 * labels stay legible. Falls back to the gradient placeholder.
 */
export function CaseImage({
  src,
  alt,
  className = "",
  grid = true,
}: {
  src?: string;
  alt?: string;
  className?: string;
  grid?: boolean;
}) {
  if (!src) {
    return <CaseVisual className={className} grid={grid} />;
  }
  return (
    <div className={`relative overflow-hidden bg-ink ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt ?? ""} className="absolute inset-0 h-full w-full object-cover" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,13,16,0.10) 0%, rgba(11,13,16,0.05) 45%, rgba(11,13,16,0.78) 100%)",
        }}
      />
    </div>
  );
}
