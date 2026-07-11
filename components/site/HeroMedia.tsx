"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero intro that LOOPS forever:
 *
 *   image (IMAGE_MS, crisp) ─▶ fade ─▶ video (VIDEO_MS) ─▶ fade back to image ─▶ …
 *
 * The image only fades in place (no movement / no scaling). The first
 * image→video fade waits for the video to be playable, but never longer than
 * MAX_EXTRA_HOLD_MS so it can't stall.
 */
const IMAGE_MS = 2200; // image fully visible & crisp
const FADE_MS = 1200; // crossfade duration (both directions)
const VIDEO_MS = 6000; // video visible before the image returns
const MAX_EXTRA_HOLD_MS = 1500; // cap on waiting for the video on first run

const CYCLE_MS = IMAGE_MS + FADE_MS + VIDEO_MS + FADE_MS;

// fade: 0 = image only, 1 = video only — as a function of position in the cycle
function fadeAt(pos: number) {
  if (pos < IMAGE_MS) return 0; // image hold
  if (pos < IMAGE_MS + FADE_MS) return (pos - IMAGE_MS) / FADE_MS; // image → video
  if (pos < IMAGE_MS + FADE_MS + VIDEO_MS) return 1; // video hold
  return 1 - (pos - IMAGE_MS - FADE_MS - VIDEO_MS) / FADE_MS; // video → image
}

export default function HeroMedia() {
  const [fade, setFade] = useState(0); // 0 = image only, 1 = video only

  const readyRef = useRef(false); // video can play (read inside the rAF loop)
  const markReady = () => {
    readyRef.current = true;
  };

  useEffect(() => {
    let raf = 0;
    let last: number | undefined;
    let clock = 0; // ms into the (looping) timeline
    let heldOnce = false; // first image→video gate has been released
    let waitStart: number | null = null;
    const tick = (now: number) => {
      if (last === undefined) last = now;
      clock += now - last;
      last = now;

      // One-time gate: hold at the end of the first image phase until the
      // video is genuinely playable (capped), so the first crossfade never
      // reveals a blank video.
      if (!heldOnce && clock >= IMAGE_MS) {
        if (waitStart === null) waitStart = now;
        const waited = now - waitStart;
        if (readyRef.current || waited >= MAX_EXTRA_HOLD_MS) {
          heldOnce = true;
        } else {
          clock = IMAGE_MS; // freeze on the image until ready
        }
      }

      setFade(fadeAt(clock % CYCLE_MS));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const imageOpacity = 1 - fade;
  const blur = fade * 12; // soft blur while dissolving (sharp again on return)
  const videoOpacity = fade;

  return (
    <>
      {/* ---- Static dark base (covers the gap before media loads) ---- */}
      <div className="absolute inset-0 bg-ink" />

      {/* ---- Looping background video (fades in/out across the cycle) ---- */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={markReady}
        onCanPlay={markReady}
        onCanPlayThrough={markReady}
        className="absolute inset-0 z-[5] h-full w-full object-cover"
        style={{ opacity: videoOpacity }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* ---- Full-bleed intro image — crisp, fades out/in IN PLACE ---- */}
      {/* CSS background so a missing file silently falls back to the video */}
      <div
        className="absolute inset-0 z-[7] bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero-intro.jpg')",
          opacity: imageOpacity,
          filter: blur ? `blur(${blur}px)` : "none",
        }}
      />

      {/* ---- Scrim follows the video so the intro image stays clear ---- */}
      <div
        className="absolute inset-0 z-[8]"
        style={{
          opacity: videoOpacity,
          background:
            "linear-gradient(100deg, rgba(11,13,16,0.82) 0%, rgba(11,13,16,0.55) 45%, rgba(11,13,16,0.25) 100%)",
        }}
      />
    </>
  );
}
