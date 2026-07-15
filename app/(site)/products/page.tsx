import { Suspense } from "react";
import type { Metadata } from "next";
import ProductsBrowser from "@/components/site/ProductsBrowser";
import { CTABlock } from "@/components/site/InquiryCTA";
import PageHero from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "제품소개",
  description:
    "M-Line · L-Line · B-Line · Column · Full Range · Monitor · Amplifiers — 공간에 맞는 SE AUDIOTECHNIK 전문 음향 시스템 라인업.",
};

export default function ProductsPage() {
  return (
    <div className="bg-white text-ink">
      <PageHero
        eyebrow="PRODUCTS"
        title="제품소개"
        subtitle="Professional Audio Systems for Every Space"
        image="/images/hero/products.jpg"
      />

      <section className="container-site pb-8 pt-4 sm:pt-8">
        <Suspense fallback={<div className="py-20 text-center text-[#52555b]">불러오는 중…</div>}>
          <ProductsBrowser />
        </Suspense>
      </section>

      <section className="container-site pb-24 pt-10">
        <CTABlock
          title="적합한 제품을 찾기 어려우신가요?"
          desc="공간 정보를 알려주시면 전문가가 시스템 구성을 추천해드립니다."
          label="제품 추천 받기"
        />
      </section>
    </div>
  );
}
