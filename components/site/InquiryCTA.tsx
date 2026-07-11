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
      <div className="relative flex flex-wrap items-center justify-between gap-10 px-8 py-12 sm:px-14 sm:py-16">
        <div>
          <h2 className="m-0 text-[28px] font-semibold tracking-[-0.02em] text-cream sm:text-[32px]">
            {title}
          </h2>
          {desc && (
            <p className="m-0 mt-4 max-w-[540px] text-base leading-[1.6] text-muted">{desc}</p>
          )}
        </div>
        <div className="flex flex-shrink-0 gap-3">
          <Link href={primaryHref} className="btn-primary">
            {primaryLabel}
          </Link>
          {showPhone && (
            <a href={`tel:${SITE.phone}`} className="btn-outline">
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
