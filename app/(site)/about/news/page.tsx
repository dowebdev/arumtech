import type { Metadata } from "next";
import { news } from "@/lib/data";

export const metadata: Metadata = {
  title: "NEWS",
  description: "아름텍과 SE AUDIOTECHNIK의 소식 · 전시회 · 보도자료.",
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
        <div className="overflow-hidden rounded-2xl border border-black/10">
          {news.map((n) => (
            <div
              key={n.title}
              className="flex cursor-pointer items-center gap-6 border-b border-black/10 px-7 py-6 transition-colors last:border-b-0 hover:bg-white"
            >
              <span className="w-24 flex-shrink-0 font-mono text-[14px] text-[#6e7178]">{n.date}</span>
              <span className="flex-shrink-0 rounded-full border border-black/25 px-2.5 py-[3px] text-[12px] font-semibold tracking-[0.04em] text-accent">
                {n.cat}
              </span>
              <span className="flex-1 text-[18px] font-medium text-ink">{n.title}</span>
              <i className="ph ph-arrow-up-right" style={{ fontSize: 18, color: "#6E7178" }} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
