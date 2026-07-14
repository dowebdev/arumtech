import Link from "next/link";
import type { Metadata } from "next";
import ArchiveBoard from "@/components/site/ArchiveBoard";
import BoardWriteButton from "@/components/site/BoardWriteButton";
import PageHero from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "자료실",
  description:
    "카탈로그·메뉴얼·시방서·도면자료·기술자료·물가정보 — SE AUDIOTECHNIK 제품 기술자료 다운로드 센터.",
};

export default function DownloadsPage() {
  return (
    <div className="bg-white text-ink">
      <PageHero
        eyebrow="DOWNLOAD CENTER"
        title="자료실"
        subtitle="Catalogs · Manuals · Drawings · Specifications"
        image="/images/hero/downloads.jpg"
      />

      <section className="container-site py-8">
        <BoardWriteButton href="/downloads/write" label="자료 등록" />
        <ArchiveBoard />

        <div className="mb-24 mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-black/10 bg-[#f4f5f7] px-10 py-8">
          <div className="flex items-center gap-4">
            <i className="ph ph-lock-key" style={{ fontSize: 28, color: "#6EA921" }} />
            <div>
              <div className="text-base font-semibold text-ink">
                시방서·도면 원본이 필요하신가요?
              </div>
              <div className="mt-[5px] text-[14px] text-[#52555b]">
                프로젝트 정보와 함께 요청하시면 담당자가 맞춤 자료를 보내드립니다.
              </div>
            </div>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 cursor-pointer rounded-lg bg-accent px-6 py-[13px] text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            기술자료 요청
          </Link>
        </div>
      </section>
    </div>
  );
}
