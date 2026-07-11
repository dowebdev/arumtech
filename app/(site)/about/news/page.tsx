import type { Metadata } from "next";
import NoticeBoard from "@/components/site/NoticeBoard";

export const metadata: Metadata = {
  title: "NEWS",
  description: "아름텍과 SE AUDIOTECHNIK의 소식 · 공지사항.",
};

export default function AboutNewsPage() {
  return (
    <div className="bg-white text-ink">
      <section className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8">
        <div className="mb-10">
          <div className="eyebrow">NEWS</div>
          <h2 className="m-0 text-[32px] font-semibold tracking-[-0.02em] text-ink sm:text-[36px]">
            아름텍 소식
          </h2>
        </div>
        <NoticeBoard />
      </section>
    </div>
  );
}
