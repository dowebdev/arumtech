import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductImage, CaseImage } from "@/components/site/Visuals";
import { cases, getCase, getProductByModel } from "@/lib/data";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) return { title: "사례를 찾을 수 없습니다" };
  return {
    title: study.title,
    description: study.summary,
  };
}

const STORY = [
  { key: "problem", tag: "CHALLENGE", title: "기존 문제", color: "#C1121F" },
  { key: "solution", tag: "SOLUTION", title: "적용 솔루션", color: "#6EA921" },
  { key: "result", tag: "RESULT", title: "개선 결과", color: "#2E7D5B" },
] as const;

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) notFound();

  const usedProducts = study.used
    .map((m) => getProductByModel(m))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="bg-white text-ink">
      {/* Breadcrumb */}
      <div className="container-site pt-6">
        <div className="flex items-center gap-2 text-[12.5px] text-[#6e7178]">
          <Link href="/" className="hover:text-[#52555b]">홈</Link>
          <i className="ph ph-caret-right" style={{ fontSize: 11 }} />
          <Link href="/cases" className="hover:text-[#52555b]">설치사례</Link>
          <i className="ph ph-caret-right" style={{ fontSize: 11 }} />
          <span className="text-accent">{study.region}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="container-site py-6">
        <div className="relative aspect-[21/9] overflow-hidden rounded-[20px] border border-black/10">
          <CaseImage src={study.image} alt={study.title} className="h-full w-full" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, rgba(11,13,16,0.85), transparent)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
            <div className="mb-3.5 font-mono text-xs tracking-[0.1em] text-accent">
              {study.en} · {study.region}
            </div>
            <h1 className="m-0 max-w-[760px] text-[28px] font-semibold leading-[1.25] tracking-[-0.02em] text-cream sm:text-[40px]">
              {study.title}
            </h1>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="container-site py-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="m-0 mb-4 text-2xl font-semibold text-ink">프로젝트 개요</h2>
            <p className="m-0 text-base leading-[1.8] text-[#52555b]">{study.summary}</p>
          </div>
          <div className="card-light self-start p-7">
            <div className="flex flex-col gap-[18px]">
              <div>
                <div className="text-[11.5px] tracking-[0.04em] text-[#6e7178]">시설 유형</div>
                <div className="mt-[5px] text-[15px] font-medium text-ink">{study.type}</div>
              </div>
              <div className="border-t border-black/10 pt-[18px]">
                <div className="text-[11.5px] tracking-[0.04em] text-[#6e7178]">설치 지역</div>
                <div className="mt-[5px] text-[15px] font-medium text-ink">{study.region}</div>
              </div>
              <div className="border-t border-black/10 pt-[18px]">
                <div className="text-[11.5px] tracking-[0.04em] text-[#6e7178]">적용 제품</div>
                <div className="mt-[5px] font-mono text-sm font-semibold text-accent">
                  {study.used.join("  ·  ")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="container-site py-6">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/[0.08] md:grid-cols-3">
          {STORY.map((s) => (
            <div key={s.key} className="bg-[#f4f5f7] p-8">
              <div className="mb-4 flex items-center gap-2.5">
                <span
                  className="rounded-full border px-2.5 py-[3px] font-mono text-xs font-semibold"
                  style={{ color: s.color, borderColor: `${s.color}66` }}
                >
                  {s.tag}
                </span>
              </div>
              <div className="mb-3 text-lg font-semibold text-ink">{s.title}</div>
              <p className="m-0 text-sm leading-[1.75] text-[#52555b]">{study[s.key]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INSTALLED PRODUCTS */}
      {usedProducts.length > 0 && (
        <section className="container-site py-10">
          <h2 className="m-0 mb-6 text-2xl font-semibold text-ink">적용 제품</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {usedProducts.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="card-light card-hover-light block overflow-hidden">
                <ProductImage src={p.image} alt={p.model} className="aspect-[16/10]" iconSize={48} />
                <div className="p-5">
                  <div className="font-mono text-[17px] font-semibold text-ink">{p.model}</div>
                  <div className="mt-1 text-[13px] text-[#52555b]">{p.kicker}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container-site pb-24 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-black/10 bg-[#f4f5f7] p-10">
          <div>
            <div className="text-[22px] font-semibold text-ink">
              우리 공간에도 비슷한 구성이 가능할까요?
            </div>
            <div className="mt-2 text-sm text-[#52555b]">
              유사 공간 설치 경험을 바탕으로 최적 구성을 제안해드립니다.
            </div>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 cursor-pointer rounded-lg bg-accent px-7 py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            설치 상담 요청
          </Link>
        </div>
      </section>
    </div>
  );
}
