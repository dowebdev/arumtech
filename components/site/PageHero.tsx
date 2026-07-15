/**
 * Full-bleed subpage hero with a background image and dark readability overlay.
 *
 * Image spec: 1920×480px (≈4:1), JPG/WebP, key subject on the right 55–60%
 * (text sits on the left). Drop the file at `image` — if it is missing the
 * base dark gradient shows through, so nothing ever looks broken.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      {/* base dark fallback (also covers a missing image) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#14181E] to-ink" />
      {/* background image — CSS bg so a 404 silently falls back to the gradient */}
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${image}')` }}
        />
      )}
      {/* left-to-right darkening overlay so the white text stays legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,13,16,0.78) 0%, rgba(11,13,16,0.55) 45%, rgba(11,13,16,0.18) 100%)",
        }}
      />
      {/* 모바일은 높이·폰트를 줄이고(min-h 300→180, py-16→10, 제목 36→26) 가운데 정렬. sm 이상은 기존 좌측정렬. */}
      <div className="container-site relative flex min-h-[180px] flex-col items-center justify-center py-10 text-center sm:min-h-[420px] sm:items-start sm:py-16 sm:text-left">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="m-0 text-[26px] font-semibold tracking-[-0.02em] text-white sm:text-[44px]">
          {title}
        </h1>
        {subtitle && (
          <p className="m-0 mt-3 font-mono text-[13px] text-white/75 sm:mt-4 sm:text-base">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
