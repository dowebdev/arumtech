import Link from "next/link";
import { SITE } from "@/lib/data";

/**
 * Large gradient CTA band (home / product detail style).
 */
export function CTABand({
  title,
  desc,
  primaryLabel = "견적 문의",
  primaryHref = "/contact",
  showPhone = true,
  glass = false,
}: {
  title: string;
  desc?: string;
  primaryLabel?: string;
  primaryHref?: string;
  showPhone?: boolean;
  glass?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[20px] border ${
        glass ? "border-cream/15 bg-ink/40 backdrop-blur-md" : "border-cream/25"
      }`}
    >
      {!glass && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#14181E] to-ink" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 100% at 85% 50%, rgba(255,255,255,0.20), transparent 60%)",
            }}
          />
        </>
      )}
      {/* 모바일은 제목·본문·버튼을 한 단계씩 줄인다 (한강미디어 기준). */}
      <div className="relative flex flex-wrap items-center justify-between gap-6 px-6 py-8 sm:gap-10 sm:px-14 sm:py-16">
        <div>
          <h2 className="m-0 text-[20px] font-semibold leading-[1.4] tracking-[-0.02em] text-cream sm:text-[32px] sm:leading-normal">
            {title}
          </h2>
          {desc && (
            <p className="m-0 mt-3 max-w-[540px] text-[14px] leading-[1.6] text-muted sm:mt-4 sm:text-base">
              {desc}
            </p>
          )}
        </div>
        <div className="flex flex-shrink-0 flex-wrap gap-2.5 sm:gap-3">
          <Link
            href={primaryHref}
            className="btn-primary px-5 py-2.5 text-[14px] sm:px-7 sm:py-4 sm:text-[15px]"
          >
            {primaryLabel}
          </Link>
          {showPhone && (
            <a
              href={`tel:${SITE.phone}`}
              className="btn-outline px-5 py-2.5 text-[14px] sm:px-7 sm:py-4 sm:text-[15px]"
            >
              <i className="ph ph-phone" style={{ color: "#6EA921" }} />
              전화상담 {SITE.phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Flat bordered CTA block (list-page / detail footers).
 */
export function CTABlock({
  title,
  desc,
  label,
  href = "/contact",
}: {
  title: string;
  desc: string;
  label: string;
  href?: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-black/10 bg-[#f4f5f7] p-10">
      <div>
        <div className="text-[22px] font-semibold text-ink">{title}</div>
        <div className="mt-2 text-sm text-[#52555b]">{desc}</div>
      </div>
      <Link
        href={href}
        className="flex-shrink-0 cursor-pointer rounded-lg border-none bg-accent px-7 py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        {label}
      </Link>
    </div>
  );
}
