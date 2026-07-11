import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductImage } from "@/components/site/Visuals";
import ProductCard from "@/components/site/ProductCard";
import ProductSlider from "@/components/site/ProductSlider";
import {
  SITE,
  getProduct,
  products,
  relatedProducts,
  downloadFmtColor,
} from "@/lib/data";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "제품을 찾을 수 없습니다" };
  return {
    title: `${product.model} — ${product.kicker}`,
    description: `${product.model} (${product.en}). ${product.kicker}. ${product.line} 시리즈.`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(product, 3);

  return (
    <div className="bg-white text-ink">
      {/* Breadcrumb */}
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 pt-6">
        <div className="flex items-center gap-2 text-[12.5px] text-[#6e7178]">
          <Link href="/" className="hover:text-[#52555b]">홈</Link>
          <i className="ph ph-caret-right" style={{ fontSize: 11 }} />
          <Link href="/products" className="hover:text-[#52555b]">제품소개</Link>
          <i className="ph ph-caret-right" style={{ fontSize: 11 }} />
          <Link
            href={`/products?line=${encodeURIComponent(product.line)}`}
            className="hover:text-[#52555b]"
          >
            {product.line}
          </Link>
          <i className="ph ph-caret-right" style={{ fontSize: 11 }} />
          <span className="text-accent" aria-current="page">
            {product.model}
          </span>
        </div>
      </div>

      {/* HERO */}
      <section className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 py-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <ProductImage
            src={product.image}
            alt={product.model}
            className="aspect-square rounded-[20px] border border-black/10"
            iconSize={150}
            grid
            pad="p-10"
          />
          <div>
            <div className="mb-[18px] flex items-center gap-2">
              <span className="rounded-full border border-black/25 px-3 py-1 font-mono text-[11px] font-semibold tracking-[0.1em] text-accent">
                {product.line}
              </span>
            </div>
            <h1 className="m-0 font-mono text-[40px] font-bold tracking-[0.01em] text-ink sm:text-5xl">
              {product.model}
            </h1>
            <p className="m-0 mt-3.5 text-[19px] font-medium text-ink">{product.kicker}</p>
            <p className="m-0 mt-1.5 font-mono text-[15px] text-[#52555b]">{product.en}</p>
            {product.tagline && (
              <div className="mt-4">
                <p className="m-0 text-[20px] font-semibold leading-[1.35] text-accent">
                  {product.tagline.headline}
                </p>
                {product.tagline.sub && (
                  <p className="m-0 mt-1 text-[14px] text-[#52555b]">{product.tagline.sub}</p>
                )}
              </div>
            )}
            {product.keySpecs.length > 0 && (
              <div className="my-8 flex gap-6 border-y border-black/10 py-6">
                {product.keySpecs.map((ks) => (
                  <div key={ks.l}>
                    <div className="font-mono text-[26px] font-semibold text-accent">{ks.v}</div>
                    <div className="mt-1 text-[11.5px] tracking-[0.04em] text-[#52555b]">{ks.l}</div>
                  </div>
                ))}
              </div>
            )}
            <div className={`flex gap-3 ${product.keySpecs.length === 0 ? "mt-8" : ""}`}>
              <Link href="/contact" className="btn-primary flex-1 !text-white">
                견적 문의
              </Link>
              <Link
                href={`/products?line=${encodeURIComponent(product.line)}`}
                className="btn-outline-light"
              >
                <i className="ph ph-list" style={{ color: "#6EA921" }} />
                목록으로
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* KEY SPECS — 원본 사양표에서 확인된 값만 표시한다 */}
      {product.keySpecs.length > 0 && (
        <section className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 py-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {product.keySpecs.map((ks) => (
              <div key={ks.l} className="rounded-[14px] border border-black/10 bg-[#f4f5f7] p-6">
                <i className="ph ph-check-circle" style={{ fontSize: 24, color: "#6EA921" }} />
                <div className="mt-3.5 font-mono text-xl font-semibold text-ink">{ks.v}</div>
                <div className="mt-1 text-[12.5px] text-[#52555b]">{ks.l}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* INTRO COPY (before the detail gallery) */}
      {product.intro && (
        <section className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 py-10">
          <div className="mx-auto max-w-[680px] text-center [word-break:keep-all]">
            <h2 className="m-0 text-[20px] font-semibold tracking-[-0.01em] text-accent">
              {product.intro.title}
            </h2>
            <div className="mt-6 flex flex-col gap-6">
              {product.intro.sections.map((s, i) => (
                <div key={i}>
                  {s.heading && (
                    <h3 className="m-0 mb-2 text-[20px] font-semibold text-accent">{s.heading}</h3>
                  )}
                  <p className="m-0 text-[18px] leading-[1.85] text-[#52555b]">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HERO BANNER (above the downloads) */}
      {product.slug === "m-f3a-pro" && (
        <section className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 py-10">
          <figure className="mx-auto m-0 max-w-[1200px] overflow-hidden rounded-xl border border-black/10 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/products/m-f3a-pro/hero-banner.jpg"
              alt="Born to perform everywhere — The one compact Line-Array System"
              className="mx-auto block h-auto max-w-full object-contain"
            />
          </figure>
        </section>
      )}

      {/* DOWNLOADS */}
      {product.docs && product.docs.length > 0 && (
        <section className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 py-10">
          <h2 className="m-0 mb-7 text-center text-[28px] font-semibold tracking-[-0.01em] text-ink">
            자료 다운로드
          </h2>
          <div className="mx-auto flex max-w-[1200px] flex-col gap-3">
            {product.docs.map((d) => (
              <div
                key={d.file}
                className="flex flex-wrap items-center gap-4 rounded-xl border border-black/10 bg-white px-6 py-5 transition-colors hover:border-black/25"
              >
                <span className="inline-flex min-w-[64px] justify-center rounded-md bg-[#f4f5f7] px-3 py-1.5 text-[12.5px] font-semibold text-[#52555b]">
                  {d.cat}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[16px] font-semibold text-ink">{d.title}</div>
                  <div className="mt-0.5 flex items-center gap-2 text-[12.5px] text-[#6e7178]">
                    <span
                      className="font-mono font-semibold"
                      style={{ color: downloadFmtColor(d.fmt) }}
                    >
                      {d.fmt}
                    </span>
                    <span className="text-black/20">·</span>
                    <span>{d.size}</span>
                  </div>
                </div>
                <a
                  href={`/files/m-f3a-pro/${d.file}`}
                  download={`${d.title}.${d.fmt.toLowerCase()}`}
                  className="inline-flex flex-shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-accent px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  <i className="ph ph-download-simple" />
                  다운로드
                </a>
              </div>
            ))}
            {/* feature highlights row, moved below the downloads */}
            <figure className="m-0 mt-3 overflow-hidden rounded-xl border border-black/10 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/products/m-f3a-pro/features-row.png"
                alt="8 KG light · DIN A4 Front · 600 Watt · Scalable · Worry-free — Four year warranty"
                loading="lazy"
                className="mx-auto block h-auto max-w-full object-contain"
              />
            </figure>
          </div>
        </section>
      )}

      {/* IMAGE ROW (5-up, just above the detail gallery) */}
      {product.slug === "m-f3a-pro" && (
        <section className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 py-10">
          <div className="mx-auto grid max-w-[1200px] grid-cols-5 gap-3">
            {["06", "07", "08", "09", "10"].map((n) => (
              <div
                key={n}
                className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-xl border border-black/10 bg-white p-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/products/m-f3a-pro/archive/${n}.png`}
                  alt={`M-F3A PRO ${n}`}
                  loading="lazy"
                  className="block h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CONTENT GALLERY (faithful reproduction of the legacy product page) */}
      {product.gallery && product.gallery.length > 0 && (
        <section className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 py-10">
          <h2 className="m-0 mb-7 text-center text-[28px] font-semibold tracking-[-0.01em] text-ink">
            제품 상세
          </h2>
          {/* Centered content column */}
          <div className="mx-auto flex max-w-[1200px] flex-wrap justify-center gap-3">
            {product.gallery.map((g, i) => {
              const basis = g.half ? "w-[calc(50%-6px)]" : "w-full";
              if (g.video) {
                return (
                  <figure key={`v-${i}`} className={`m-0 ${basis}`}>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-black/10 bg-black">
                      <iframe
                        src={`https://www.youtube.com/embed/${g.video}`}
                        title={g.caption ?? `${product.model} video`}
                        className="absolute inset-0 h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    {g.caption && (
                      <figcaption className="mt-2 text-center text-[12.5px] leading-[1.5] text-[#6e7178]">
                        {g.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              return (
                <figure key={g.src} className={`m-0 ${basis}`}>
                  {(g.title || g.body) && (
                    <div className="mx-auto mb-6 max-w-[900px]">
                      {g.title && (
                        <h3 className="m-0 mb-3 text-[26px] font-semibold tracking-[-0.01em] text-ink">
                          {g.title}
                        </h3>
                      )}
                      {g.body && (
                        <p className="m-0 break-keep text-[16px] leading-[1.8] text-[#52555b]">
                          {g.body}
                        </p>
                      )}
                      {g.notes?.map((n) => (
                        <p key={n} className="m-0 mt-4 text-[13px] leading-[1.6] text-[#6e7178]">
                          {n}
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={g.src}
                      alt={g.caption ?? `${product.model} 상세 이미지 ${i + 1}`}
                      loading="lazy"
                      className="mx-auto block h-auto max-w-full object-contain"
                    />
                  </div>
                  {g.caption && (
                    <figcaption className="mt-2 text-center text-[12.5px] leading-[1.5] text-[#6e7178]">
                      {g.caption}
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        </section>
      )}

      {/* SPEC TABLE */}
      <section className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 py-10">
        {product.specIntro && product.specIntro.length > 0 && (
          <div className="mx-auto mb-14 flex max-w-[900px] flex-col gap-5">
            {product.specIntro.map((p) => (
              <p key={p} className="m-0 break-keep text-[16px] leading-[1.8] text-[#52555b]">
                {p}
              </p>
            ))}
          </div>
        )}

        {/* FEATURES — 원본 순서: 소개 문단 뒤, Specifications 제목 앞 */}
        {product.features && product.features.length > 0 && (
          <div className="mx-auto mb-16 flex max-w-[900px] flex-col gap-10">
            {product.features.map((f) => (
              <div key={f.title}>
                <h3 className="m-0 mb-3 text-[26px] font-semibold tracking-[-0.01em] text-ink">
                  {f.title}
                </h3>
                <p className="m-0 break-keep text-[16px] leading-[1.8] text-[#52555b]">{f.body}</p>
              </div>
            ))}

            {product.featureImage && (
              <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.featureImage}
                  alt={`${product.model} 상세 이미지`}
                  loading="lazy"
                  className="mx-auto block h-auto max-w-full object-contain"
                />
              </div>
            )}

            {product.featureNotes?.map((n) => (
              <p key={n} className="m-0 text-center text-[13px] leading-[1.6] text-[#6e7178]">
                {n}
              </p>
            ))}
          </div>
        )}

        {product.specGroups && (
          <h2 className="m-0 mb-7 text-[28px] font-semibold tracking-[-0.01em] text-ink">
            Specifications
          </h2>
        )}

        {product.specImage && (
          <div className="mb-7 overflow-hidden rounded-xl border border-black/10 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.specImage}
              alt={`${product.model} 치수 도면`}
              loading="lazy"
              className="mx-auto block h-auto max-w-full object-contain"
            />
          </div>
        )}

        {product.specModelLabel && (
          <div className="mb-4 font-mono text-[15px] font-bold text-ink">
            {product.specModelLabel}
          </div>
        )}

        {product.specGroups && (
          /* 원본이 모델을 열로 나열하므로 표 폭이 넓다. 좁은 화면에서는 표만 가로 스크롤한다. */
          <div className="overflow-x-auto rounded-2xl border border-black/10">
            <table className="w-full min-w-[640px] border-collapse text-left">
              {product.specColumns && product.specColumns.length > 1 && (
                <thead>
                  <tr>
                    <th className="w-[300px] border-b border-black/10 bg-[#f4f5f7] px-6 py-4 font-mono text-[13px] font-semibold tracking-[0.02em] text-[#52555b]">
                      Model
                    </th>
                    {product.specColumns.map((col) => (
                      <th
                        key={col}
                        className="border-b border-l border-black/10 bg-[#f4f5f7] px-6 py-4 font-mono text-[13.5px] font-bold text-ink"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {product.specGroups.map((g) => (
                  <Fragment key={g.title ?? "default"}>
                    {g.title && (
                      <tr>
                        <th
                          colSpan={(product.specColumns?.length || 1) + 1}
                          className="border-b border-black/10 bg-white px-6 pb-3 pt-7 text-left"
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="h-3.5 w-[3px] rounded-sm bg-accent" />
                            <span className="font-mono text-[14px] font-bold tracking-[0.12em] text-ink">
                              {g.title}
                            </span>
                          </span>
                        </th>
                      </tr>
                    )}
                    {g.rows.map((r) => (
                      <tr key={`${g.title}-${r.k}`}>
                        <th className="border-b border-black/10 bg-[#f4f5f7] px-6 py-4 align-top font-mono text-[13px] font-normal tracking-[0.02em] text-[#52555b]">
                          {r.k}
                        </th>
                        {r.v.map((val, i) => (
                          <td
                            key={i}
                            className="border-b border-l border-black/10 px-6 py-4 align-top font-mono text-[14.5px] text-ink"
                          >
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {product.specNote && (
          <p className="m-0 mt-5 text-[13px] leading-[1.6] text-[#6e7178]">{product.specNote}</p>
        )}
      </section>

      {/* ACCESSORIES */}
      {product.accessories && product.accessories.length > 0 && (
        <section className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 py-10">
          <h2 className="m-0 mb-7 text-[28px] font-semibold tracking-[-0.01em] text-ink">
            ACCESSORIES
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {product.accessories.map((a, i) => (
              <div key={`${a.title}-${i}`} className="flex flex-col">
                {a.image && (
                  <div className="mb-4 overflow-hidden rounded-xl border border-black/10 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="mx-auto block h-auto max-w-full object-contain"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <span className="h-3.5 w-[3px] rounded-sm bg-accent" />
                  <h3 className="m-0 font-mono text-[15px] font-bold text-ink">{a.title}</h3>
                </div>
                <p className="m-0 mt-2.5 break-keep text-[14.5px] leading-[1.65] text-[#52555b]">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* REFERENCES */}
      {product.references && product.references.length > 0 && (
        <section className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 py-10">
          <h2 className="m-0 mb-7 text-[28px] font-semibold tracking-[-0.01em] text-ink">
            References
          </h2>
          <div className="flex flex-col gap-12">
            {product.references.map((r) => (
              <div key={r.title}>
                {r.image && (
                  <div className="mb-5 overflow-hidden rounded-xl border border-black/10 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.image}
                      alt={r.title}
                      loading="lazy"
                      className="mx-auto block h-auto max-w-full object-contain"
                    />
                  </div>
                )}
                <h3 className="m-0 mb-3 break-keep text-[19px] font-semibold text-ink">{r.title}</h3>
                <p className="m-0 break-keep text-[15.5px] leading-[1.75] text-[#52555b]">{r.body}</p>
              </div>
            ))}

            {product.referenceImage && (
              <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.referenceImage}
                  alt={`${product.model} 매체 리뷰`}
                  loading="lazy"
                  className="mx-auto block h-auto max-w-full object-contain"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA BANNER — 페이지 최하단 */}
      {product.ctaImage && (
        <section className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 py-10">
          <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.ctaImage}
              alt={product.ctaCaption ?? `${product.model} 상담 문의`}
              loading="lazy"
              className="mx-auto block h-auto max-w-full object-contain"
            />
          </div>
          {product.ctaCaption && (
            <p className="m-0 mt-2 text-center text-[12.5px] leading-[1.5] text-[#6e7178]">
              {product.ctaCaption}
            </p>
          )}
        </section>
      )}

      {/* DIAGRAM → PICTURE → 동영상 → DOWNLOAD (원본 하단 구성) */}
      {(product.diagram || product.slider || product.videoId || product.downloadLinks) && (
        <section className="mx-auto w-full max-w-[1200px] px-5 py-10 sm:px-8">
          {product.diagram && product.diagram.length > 0 && (
            <div className="mb-14">
              <h2 className="m-0 mb-7 text-center font-mono text-[22px] font-bold tracking-[0.14em] text-ink">
                DIAGRAM
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {product.diagram.map((src, i) => (
                  <div
                    key={src}
                    className="overflow-hidden rounded-xl border border-black/10 bg-white"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${product.model} 도해 ${i + 1}`}
                      loading="lazy"
                      className="mx-auto block h-auto max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.slider && product.slider.length > 0 && (
            <>
              {product.sliderTitle && (
                <h2 className="m-0 mb-7 text-center font-mono text-[22px] font-bold tracking-[0.14em] text-ink">
                  {product.sliderTitle}
                </h2>
              )}
              <ProductSlider images={product.slider} alt={`${product.model} 이미지`} />
            </>
          )}

          {product.videoId && (
            <div className="mt-14">
              <h2 className="m-0 mb-7 text-center text-[22px] font-semibold tracking-[-0.01em] text-ink">
                동영상
              </h2>
              <div className="relative mx-auto aspect-video max-w-[900px] overflow-hidden rounded-xl border border-black/10 bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${product.videoId}`}
                  title={`${product.model} 제품 영상`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {product.downloadLinks && product.downloadLinks.length > 0 && (
            <div className="mt-14">
              <h2 className="m-0 mb-7 text-center font-mono text-[22px] font-bold tracking-[0.14em] text-ink">
                DOWNLOAD
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {product.downloadLinks.map((d) =>
                  d.file ? (
                    <a
                      key={d.label}
                      /* "/" 로 시작하면 절대경로 — 다른 제품과 파일을 공유할 때 쓴다 */
                      href={d.file.startsWith("/") ? d.file : `/files/${product.slug}/${d.file}`}
                      download
                      className="group flex items-center gap-3 rounded-xl border border-black/10 bg-white px-5 py-4 transition-colors hover:border-accent"
                    >
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-accent/[0.08] transition-colors group-hover:bg-accent">
                        <i
                          className="ph ph-download-simple text-accent transition-colors group-hover:text-white"
                          style={{ fontSize: 18 }}
                        />
                      </span>
                      <span className="break-keep text-[15px] font-medium text-ink">{d.label}</span>
                    </a>
                  ) : (
                    <span
                      key={d.label}
                      title="파일이 아직 등록되지 않았습니다"
                      className="flex cursor-not-allowed items-center gap-3 rounded-xl border border-black/10 bg-[#f4f5f7] px-5 py-4"
                    >
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-black/[0.05]">
                        <i className="ph ph-clock" style={{ fontSize: 18, color: "#9aa0a6" }} />
                      </span>
                      <span className="break-keep text-[15px] font-medium text-[#9aa0a6]">
                        {d.label}
                      </span>
                      <span className="ml-auto flex-shrink-0 text-[12px] text-[#9aa0a6]">준비중</span>
                    </span>
                  )
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 py-10">
          <h2 className="m-0 mb-6 text-[28px] font-semibold text-ink">관련 제품</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} light />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 pb-24 pt-10">
        <div className="relative overflow-hidden rounded-[20px] border border-black/10 bg-[#f4f5f7]">
          <div className="relative flex flex-wrap items-center justify-between gap-8 p-14">
            <div>
              <h2 className="m-0 text-[28px] font-semibold text-ink">
                {product.model} 도입을 검토 중이신가요?
              </h2>
              <p className="m-0 mt-3.5 text-[15px] text-[#52555b]">
                설치 환경에 맞는 시스템 구성과 견적을 안내해드립니다.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/contact"
                className="cursor-pointer rounded-lg bg-accent px-7 py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                제품 상담 문의
              </Link>
              <a href={`tel:${SITE.phone}`} className="btn-outline-light !px-7 !py-[15px]">
                <i className="ph ph-phone" style={{ color: "#6EA921" }} />
                전화 상담
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BACK TO LIST — 상세 페이지 최하단 */}
      <section className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 pb-24">
        <div className="flex justify-center">
          <Link
            href={`/products?line=${encodeURIComponent(product.line)}`}
            className="btn-outline-light !px-8 !py-4"
          >
            <i className="ph ph-list" style={{ color: "#6EA921" }} />
            목록으로
          </Link>
        </div>
      </section>
    </div>
  );
}
