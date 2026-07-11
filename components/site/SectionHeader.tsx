import Link from "next/link";

export default function SectionHeader({
  eyebrow,
  title,
  moreLabel,
  moreHref,
}: {
  eyebrow: string;
  title: string;
  moreLabel?: string;
  moreHref?: string;
}) {
  return (
    <div className="mb-10 flex items-end justify-between">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="m-0 text-[28px] font-semibold tracking-[-0.02em] text-cream sm:text-4xl">
          {title}
        </h2>
      </div>
      {moreLabel && moreHref && (
        <Link
          href={moreHref}
          className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-cream"
        >
          {moreLabel} <i className="ph ph-arrow-right" />
        </Link>
      )}
    </div>
  );
}
