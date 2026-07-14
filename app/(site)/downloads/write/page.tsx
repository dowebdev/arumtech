import type { Metadata } from "next";
import BoardForm from "@/components/site/BoardForm";

export const metadata: Metadata = {
  title: "자료 등록",
  robots: { index: false, follow: false },
};

export default function ArchiveWritePage() {
  return (
    <div className="bg-white text-ink">
      <section className="mx-auto w-full max-w-[900px] px-5 py-20 sm:px-8">
        <div className="mb-10">
          <div className="eyebrow">NEW ARCHIVE</div>
          <h1 className="m-0 text-[32px] font-semibold tracking-[-0.02em] text-ink">자료 등록</h1>
        </div>
        <BoardForm board="archive" listPath="/downloads" />
      </section>
    </div>
  );
}
