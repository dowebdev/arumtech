import Link from "next/link";
import type { CaseStudy } from "@/lib/data";
import { CaseImage } from "./Visuals";

export default function CaseCard({
  study,
  variant = "default",
  light = false,
}: {
  study: CaseStudy;
  variant?: "default" | "compact";
  light?: boolean;
}) {
  const usedText = study.used.join("  ·  ");

  if (variant === "compact") {
    // Used on the home page (smaller, 16:10 image)
    return (
      <Link href="/cases" className="group block">
        <div
          className={`relative aspect-[16/10] overflow-hidden rounded-[14px] border transition-colors ${
            light
              ? "border-black/10 hover:border-black/30"
              : "border-cream/[0.08] hover:border-cream/40"
          }`}
        >
          <CaseImage
            src={study.image}
            alt={study.title}
            className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            grid={false}
          />
          {!study.image && (
            <i
              className="ph ph-buildings absolute left-5 top-5"
              style={{ fontSize: 26, color: "rgba(244,241,234,0.5)" }}
            />
          )}
          <div className="absolute bottom-[18px] left-5 font-mono text-[11px] tracking-[0.08em] text-accent">
            {study.en}
          </div>
        </div>
        <div
          className={`mt-3 text-[16px] font-semibold leading-[1.4] sm:mt-4 sm:text-[18px] ${
            light ? "text-ink" : "text-cream"
          }`}
        >
          {study.title}
        </div>
        <div className={`mt-1.5 text-[12.5px] sm:text-[13px] ${light ? "text-dim" : "text-muted"}`}>
          {usedText}
        </div>
      </Link>
    );
  }

  // Default — used on the cases list page (16:9 + summary)
  return (
    <Link href="/cases" className="block">
      <div
        className={`relative aspect-[16/9] overflow-hidden rounded-2xl border transition-colors ${
          light
            ? "border-black/10 hover:border-black/25"
            : "border-cream/[0.08] hover:border-cream/40"
        }`}
      >
        <CaseImage src={study.image} alt={study.title} className="h-full w-full" />
        {!study.image && (
          <i
            className="ph ph-buildings absolute left-6 top-6"
            style={{ fontSize: 30, color: "rgba(244,241,234,0.5)" }}
          />
        )}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-[0.08em] text-accent">{study.en}</span>
          <span
            className={`rounded-full border px-3 py-[5px] text-[11.5px] ${
              light
                ? "border-black/10 bg-white/90 text-[#52555b]"
                : "border-cream/10 bg-ink/60 text-muted"
            }`}
          >
            {study.region}
          </span>
        </div>
      </div>
      <div className="mt-[18px]">
        <div
          className={`text-[19px] font-semibold leading-[1.4] ${
            light ? "text-ink" : "text-cream"
          }`}
        >
          {study.title}
        </div>
        <div
          className={`mt-2 text-[13.5px] leading-[1.6] ${
            light ? "text-[#52555b]" : "text-muted"
          }`}
        >
          {study.summary}
        </div>
        <div
          className={`mt-3 font-mono text-xs tracking-[0.02em] ${
            light ? "text-[#6e7178]" : "text-dim"
          }`}
        >
          {usedText}
        </div>
      </div>
    </Link>
  );
}
