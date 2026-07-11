/**
 * Line-art icons for the "용도별 음향 솔루션" section.
 *
 * Genesis-style hover behaviour (driven purely by CSS in globals.css):
 *   - `.draw`   strokes re-draw themselves (stroke-dashoffset) on parent hover
 *   - `.wave` / `.tassel` / `.confetti` / `.win` accent parts add motion
 *
 * The animation is triggered by an ancestor with the `group` class, so this
 * stays a plain server component — no client JS required.
 */
import type { ReactElement } from "react";

export type SolutionArt =
  | "domestic"
  | "international"
  | "mic"
  | "cap"
  | "church"
  | "buildings";

export default function SolutionIcon({
  art,
  className,
}: {
  art: SolutionArt;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={`sol-icon ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
    >
      {ART[art]}
    </svg>
  );
}

const ART: Record<SolutionArt, ReactElement> = {
  // Domestic — location pin with a pulsing ground ping
  domestic: (
    <>
      <path
        className="draw"
        pathLength={1}
        d="M24 41c7-8 11-14 11-20a11 11 0 1 0-22 0c0 6 4 12 11 20z"
      />
      <circle className="draw" pathLength={1} cx="24" cy="21" r="4.5" />
      <ellipse className="ping" cx="24" cy="43" rx="7" ry="2" />
    </>
  ),

  // International — globe with an orbiting satellite dot
  international: (
    <>
      <circle className="draw" pathLength={1} cx="24" cy="24" r="15" />
      <path className="draw" pathLength={1} d="M9 24h30" />
      <path className="draw" pathLength={1} d="M24 9v30" />
      <path className="draw" pathLength={1} d="M24 9c-6 4-6 26 0 30" />
      <path className="draw" pathLength={1} d="M24 9c6 4 6 26 0 30" />
      <g className="orbit">
        <circle cx="24" cy="6" r="1.8" />
      </g>
    </>
  ),

  // 강당 / 공연장 — stage mic with sound waves
  mic: (
    <>
      <rect className="draw" pathLength={1} x="19" y="6" width="10" height="20" rx="5" />
      <path className="draw" pathLength={1} d="M13 23a11 11 0 0 0 22 0" />
      <path className="draw" pathLength={1} d="M24 34v7" />
      <path className="draw" pathLength={1} d="M17 41h14" />
      <path className="wave" d="M9 17a9 9 0 0 0 0 14" />
      <path className="wave" d="M39 17a9 9 0 0 1 0 14" />
    </>
  ),

  // 학교 / 관공서 — graduation cap with a swinging tassel
  cap: (
    <>
      <path className="draw" pathLength={1} d="M5 19 24 11l19 8-19 8z" />
      <path className="draw" pathLength={1} d="M14 23v7c0 2.3 4.5 4 10 4s10-1.7 10-4v-7" />
      <g className="tassel">
        <path d="M43 19v8" />
        <circle cx="43" cy="29" r="1.7" />
      </g>
    </>
  ),

  // 교회 / 종교시설 — chapel with cross + arched door
  church: (
    <>
      <path className="draw" pathLength={1} d="M24 3v5M21.5 5.5h5" />
      <path className="draw" pathLength={1} d="M13 18 24 8l11 10" />
      <path className="draw" pathLength={1} d="M16 18v23h16V18" />
      <path className="draw" pathLength={1} d="M21 41v-7a3 3 0 0 1 6 0v7" />
      <path className="win" d="M24 22v5M21.5 24.5h5" />
    </>
  ),

  // 기업 / 상업시설 — two towers with lit windows
  buildings: (
    <>
      <path className="draw" pathLength={1} d="M9 42V16l12-5v31" />
      <path className="draw" pathLength={1} d="M21 42V21l16 5v16" />
      <path className="draw" pathLength={1} d="M6 42h36" />
      <path className="win" d="M13 21h3M13 27h3M13 33h3M27 31h3M27 36h3" />
    </>
  ),
};
