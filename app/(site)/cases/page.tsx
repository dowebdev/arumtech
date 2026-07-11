import type { Metadata } from "next";
import CasesBrowser from "@/components/site/CasesBrowser";
import PageHero from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "설치사례",
  description:
    "강당·공연장·교회·관공서·컨벤션 등 다양한 공간의 SE AUDIOTECHNIK 음향 시스템 설치 프로젝트 레퍼런스.",
};

export default function CasesPage() {
  return (
    <div className="bg-white text-ink">
      <PageHero
        eyebrow="INSTALLATION REFERENCES"
        title="설치사례"
        subtitle="Proven Projects Across Every Space"
        image="/images/hero/cases.jpg"
      />

      <section className="container-site py-8 pb-24">
        <CasesBrowser />
      </section>
    </div>
  );
}
