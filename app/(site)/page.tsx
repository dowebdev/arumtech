import Link from "next/link";
import HeroMedia from "@/components/site/HeroMedia";
import ProductCarousel from "@/components/site/ProductCarousel";
import CaseCard from "@/components/site/CaseCard";
import { CTABand } from "@/components/site/InquiryCTA";
import SolutionsShowcase from "@/components/site/SolutionsShowcase";
import ProductLensCarousel from "@/components/site/ProductLensCarousel";
import MobileProductSlider from "@/components/site/MobileProductSlider";
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
      {/* 모바일은 헤더가 54px 이라 뷰포트 계산이 다르다 (sm 이상은 68px). */}
      <section
        data-nav-theme="dark"
        className="relative flex min-h-[calc(100vh-54px)] items-center overflow-hidden bg-ink sm:min-h-[calc(100vh-68px)]"
      >
        <HeroMedia />
        <div className="container-site relative z-10 w-full">
          {/* 모바일에서는 가운데 정렬 + 작은 글자, sm 이상은 기존 왼쪽 정렬 그대로. */}
          <div className="mx-auto max-w-[620px] animate-fade text-center sm:mx-0 sm:text-left">
            <div className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-accent sm:mb-7 sm:text-xs">
              <span className="h-px w-6 bg-accent" />
              PRECISION SOUND INFRASTRUCTURE
            </div>
            <h1 className="m-0 text-[18px] font-semibold leading-[1.6] tracking-[-0.02em] text-cream sm:text-[24px] sm:leading-[1.55]">
              독일 기술로 완성하는
              <br />
              최고의 사운드
            </h1>
            <p className="m-0 mt-4 text-[18px] font-semibold leading-[1.6] tracking-[-0.02em] text-cream sm:mt-5 sm:text-[24px] sm:leading-[1.55]">
              공연장부터 다양한 상업 공간까지, SE-Audiotechnik은{" "}
              <br className="hidden sm:block" />
              공간에 최적화된 프로페셔널 음향 솔루션을 제공합니다
            </p>
            {/* 모바일 버튼은 높이를 낮춘다 (py-4 → py-2.5). */}
            <div className="mt-7 flex flex-wrap justify-center gap-2.5 sm:mt-10 sm:justify-start sm:gap-3">
              <Link
                href="/products"
                className="btn-primary px-5 py-2.5 text-[14px] sm:px-7 sm:py-4 sm:text-[15px]"
              >
                제품소개 보기 <i className="ph ph-arrow-right" style={{ fontSize: 16 }} />
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
      {/* 모바일은 섹션 여백·제목을 크게 줄인다 (제목 42 → 24px, 여백 128 → 56px). */}
      <section data-nav-theme="light" className="bg-white py-14 sm:py-32">
        <div className="container-site relative z-10">
          <div className="flex flex-col items-center text-center">
            <h2 className="m-0 text-[28px] font-bold tracking-[-0.01em] text-[#000000] sm:text-[52px]">
              PRODUCT LINEUP
            </h2>
            <Link
              href="/products"
              className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-[#6e7178] transition-colors hover:text-[#000000] sm:mt-4 sm:text-sm"
            >
              전체 제품 보기 <i className="ph ph-arrow-right" />
            </Link>
          </div>
        </div>
        {/* PC(lg+) — 렌즈 캐러셀 그대로. 제목이 위 빈 영역과 겹치도록 위로 당긴다. */}
        <div className="relative z-0 -mt-4 hidden sm:-mt-12 lg:block">
          <ProductLensCarousel items={LINEUP_SLIDES} fadeColor="#ffffff" />
        </div>
        {/* 모바일(lg 미만) — 평평한 자동 슬라이드 (스와이프 가능) */}
        <div className="mt-7 lg:hidden">
          <MobileProductSlider items={LINEUP_SLIDES} />
        </div>
      </section>

      {/* ===== SOLUTIONS ===== */}
      <section data-nav-theme="dark" className="container-site py-14 sm:pb-[168px] sm:pt-[168px]">
        <div className="mb-7 text-center sm:mb-10">
          <div className="eyebrow !mb-2.5 !text-[11px] sm:!mb-3 sm:!text-xs">SOLUTIONS BY SPACE</div>
          <h2 className="m-0 text-[24px] font-bold tracking-[-0.02em] text-cream sm:text-[42px]">
            용도별 음향 솔루션
          </h2>
        </div>
        <SolutionsShowcase />
        <div className="mt-8 flex justify-center sm:mt-12">
          <Link
            href="/products"
            className="btn-primary px-5 py-2.5 text-[14px] sm:px-7 sm:py-4 sm:text-[15px]"
          >
            전체 제품 보기 <i className="ph ph-arrow-right" style={{ fontSize: 16 }} />
          </Link>
        </div>
      </section>

      {/* ===== PRODUCT FILM — M-F3A PRO MAX ===== */}
      <section
        data-nav-theme="dark"
        className="relative h-[240px] overflow-hidden bg-ink sm:h-[635px]"
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
        <div className="container-site py-14 sm:py-[168px]">
          <div className="mb-7 flex flex-col items-center text-center sm:mb-10">
            <div className="mb-2.5 font-mono text-[11px] tracking-[0.16em] text-accent sm:mb-3 sm:text-xs">
              INSTALLATION REFERENCES
            </div>
            <h2 className="m-0 text-[24px] font-bold tracking-[-0.02em] text-ink sm:text-[42px]">
              대표 설치사례
            </h2>
            <Link
              href="/cases"
              className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-dim transition-colors hover:text-ink sm:mt-4 sm:text-sm"
            >
              전체 사례 보기 <i className="ph ph-arrow-right" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
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
      <section data-nav-theme="dark" className="relative overflow-hidden py-12 sm:py-24">
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
                className="flex items-center gap-3.5 rounded-[14px] border border-cream/15 bg-ink/50 px-5 py-4 backdrop-blur-md transition-colors hover:border-cream/40 hover:bg-ink/65 sm:gap-[18px] sm:px-7 sm:py-[26px]"
              >
                <i className={`${d.icon} text-[24px] text-accent sm:text-[30px]`} />
                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-cream sm:text-[18px]">
                    {d.title}
                  </div>
                  <div className="mt-[3px] text-[12px] text-muted sm:text-[12.5px]">{d.desc}</div>
                </div>
                <i className="ph ph-arrow-up-right text-[17px] text-muted sm:text-[20px]" />
              </Link>
            ))}
          </div>

          {/* CTA band — same background band (glass so the image shows through) */}
          <div className="mt-8 sm:mt-12">
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
