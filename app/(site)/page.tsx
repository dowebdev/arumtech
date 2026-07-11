import Link from "next/link";
import HeroMedia from "@/components/site/HeroMedia";
import ProductCarousel from "@/components/site/ProductCarousel";
import CaseCard from "@/components/site/CaseCard";
import { CTABand } from "@/components/site/InquiryCTA";
import SolutionsShowcase from "@/components/site/SolutionsShowcase";
import ProductLensCarousel from "@/components/site/ProductLensCarousel";
import { cases, featuredProducts } from "@/lib/data";

const LINEUP_SLIDES = [
  {
    label: "M-Line",
    image: "/images/lineup/M-Line.jpg",
    href: "/products?line=M-Line",
    sub: ["초소형 사운드 시스템", "서브우퍼로 저역을 강화함"],
  },
  {
    label: "L-Line",
    image: "/images/lineup/L-Line.jpg",
    href: "/products?line=L-Line",
    sub: ["초소형 고효율 시스템", "독창적 구성으로 SE의 가치를 담음"],
  },
  {
    label: "I-Line",
    image: "/images/lineup/I-Line.jpg",
    href: "/products",
    sub: ["세련된 고정 설치형 시스템", "선명한 음성과 역동적 음악을 제공"],
  },
  {
    label: "COX-Line",
    image: "/images/lineup/COX-Line.jpg",
    href: "/products",
    sub: ["컴팩트한 동축 스피커", "선명한 음향과 균일한 확산을 제공"],
  },
  {
    label: "B-Line",
    image: "/images/lineup/B-Line.jpg",
    href: "/products?line=B-Line",
    sub: ["확장형 서브우퍼 시스템", "깊고 왜곡 없는 저역을 제공"],
  },
  {
    label: "Stage Monitoring",
    image: "/images/lineup/Stage-Monitoring.jpg",
    href: "/products?line=Monitor",
    sub: ["컴팩트한 모니터링 스피커", "강력한 성능으로 다양한 환경에 적합"],
  },
];

const DOWNLOAD_STRIP = [
  { title: "제품 카탈로그", desc: "라인별 카탈로그 게시판", icon: "ph ph-book-open", href: "/downloads?cat=카탈로그" },
  { title: "표준 시방서", desc: "설계 반영용 시방서 게시판", icon: "ph ph-file-text", href: "/downloads?cat=시방서" },
  { title: "리깅 도면자료", desc: "설치 도면 게시판", icon: "ph ph-blueprint", href: "/downloads?cat=도면자료" },
];

export default function HomePage() {
  const featured = featuredProducts(6);
  const homeCases = cases.slice(0, 6);

  return (
    <div className="[word-break:keep-all]">
      {/* ===== HERO ===== */}
      <section data-nav-theme="dark" className="relative flex min-h-[calc(100vh-68px)] items-center overflow-hidden bg-ink">
        <HeroMedia />
        <div className="container-site relative z-10 w-full">
          <div className="max-w-[620px] animate-fade">
            <div className="mb-7 inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-accent">
              <span className="h-px w-6 bg-accent" />
              PRECISION SOUND INFRASTRUCTURE
            </div>
            <h1 className="m-0 text-[40px] font-semibold leading-[1.16] tracking-[-0.02em] text-cream sm:text-[60px]">
              공간을 완성하는
              <br />
              정밀 음향 시스템
            </h1>
            <p className="m-0 mt-[22px] font-mono text-[17px] tracking-[0.01em] text-muted">
              Professional Sound System for Every Space
            </p>
            <p className="m-0 mt-5 max-w-[480px] text-base leading-[1.7] text-muted">
              강당·공연장·교회·관공서까지, 공간에 맞는 음향 인프라를 설계하고 공급하는 SE
              AUDIOTECHNIK 전문 파트너.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">
                제품소개 보기 <i className="ph ph-arrow-right" style={{ fontSize: 17 }} />
              </Link>
              <Link href="/contact" className="btn-outline btn-runline">
                설치 상담 문의
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          }}
        />
      </section>

      {/* ===== PRODUCT LINEUP ===== */}
      <section data-nav-theme="light" className="bg-white py-32">
        <div className="container-site relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 font-mono text-xs tracking-[0.16em] text-[#6e7178]">
              PRODUCT LINEUP
            </div>
            <h2 className="m-0 text-[42px] font-bold tracking-[-0.02em] text-[#000000]">
              제품 라인업
            </h2>
            <Link
              href="/products"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#6e7178] transition-colors hover:text-[#000000]"
            >
              전체 제품 보기 <i className="ph ph-arrow-right" />
            </Link>
          </div>
        </div>
        {/* pull the carousel up so the title overlaps its empty top-centre area */}
        <div className="relative z-0 -mt-12">
          <ProductLensCarousel items={LINEUP_SLIDES} fadeColor="#ffffff" />
        </div>
      </section>

      {/* ===== SOLUTIONS ===== */}
      <section data-nav-theme="dark" className="container-site pt-[168px] pb-[168px]">
        <div className="mb-10 text-center">
          <div className="eyebrow">SOLUTIONS BY SPACE</div>
          <h2 className="m-0 text-[42px] font-bold tracking-[-0.02em] text-cream">
            용도별 음향 솔루션
          </h2>
        </div>
        <SolutionsShowcase />
        <div className="mt-12 flex justify-center">
          <Link href="/products" className="btn-primary">
            전체 제품 보기 <i className="ph ph-arrow-right" style={{ fontSize: 17 }} />
          </Link>
        </div>
      </section>

      {/* ===== PRODUCT FILM — M-F3A PRO MAX ===== */}
      <section
        data-nav-theme="dark"
        className="relative h-[635px] overflow-hidden bg-ink"
      >
        <video
          className="block h-full w-full object-cover"
          src="/videos/Mf3apromax-Section-Video2.webm"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
        />
      </section>

      {/* ===== CASES ===== */}
      <section data-nav-theme="light" className="bg-white">
        <div className="container-site py-[168px]">
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="mb-3 font-mono text-xs tracking-[0.16em] text-accent">
              INSTALLATION REFERENCES
            </div>
            <h2 className="m-0 text-[42px] font-bold tracking-[-0.02em] text-ink">
              대표 설치사례
            </h2>
            <Link
              href="/cases"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-dim transition-colors hover:text-ink"
            >
              전체 사례 보기 <i className="ph ph-arrow-right" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {homeCases.map((c) => (
              <CaseCard key={c.slug} study={c} variant="compact" light />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS (Our Models carousel) — 임시 숨김 ===== */}
      {/* <section className="container-site py-14">
        <ProductCarousel
          eyebrow="OUR MODELS"
          title="추천 제품"
          moreLabel="전체 제품 보기"
          moreHref="/products"
          products={featured}
        />
      </section> */}

      {/* ===== DOWNLOADS + CTA (shared full-width background band) ===== */}
      <section data-nav-theme="dark" className="relative overflow-hidden py-24">
        {/* background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/downloads-bg.jpg')" }}
        />
        {/* dark overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink/85" />

        <div className="container-site relative">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {DOWNLOAD_STRIP.map((d) => (
              <Link
                key={d.title}
                href={d.href}
                className="flex items-center gap-[18px] rounded-[14px] border border-cream/15 bg-ink/50 px-7 py-[26px] backdrop-blur-md transition-colors hover:border-cream/40 hover:bg-ink/65"
              >
                <i className={d.icon} style={{ fontSize: 30, color: "#6EA921" }} />
                <div className="flex-1">
                  <div className="text-[18px] font-semibold text-cream">{d.title}</div>
                  <div className="mt-[3px] text-[12.5px] text-muted">{d.desc}</div>
                </div>
                <i className="ph ph-arrow-up-right" style={{ fontSize: 20, color: "#A7A9AC" }} />
              </Link>
            ))}
          </div>

          {/* CTA band — same background band (glass so the image shows through) */}
          <div className="mt-12">
            <CTABand
              glass
              title="어떤 제품이 적합한지 모르시나요?"
              desc="공간 규모와 용도를 알려주시면 적합한 시스템 구성을 안내해드립니다. 전문 엔지니어가 직접 상담합니다."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
