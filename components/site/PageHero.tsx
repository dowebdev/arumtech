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
      <div className="container-site relative flex min-h-[300px] flex-col justify-center py-16 sm:min-h-[420px]">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="m-0 text-[36px] font-semibold tracking-[-0.02em] text-white sm:text-[44px]">
          {title}
        </h1>
        {subtitle && (
          <p className="m-0 mt-4 font-mono text-base text-white/75">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
