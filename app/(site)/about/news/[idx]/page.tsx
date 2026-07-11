import type { Metadata } from "next";
import BoardDetail from "@/components/site/BoardDetail";

export const metadata: Metadata = {
  title: "공지사항",
  description: "아름텍 공지사항 상세.",
};

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ idx: string }>;
}) {
  const { idx } = await params;
  return (
    <div className="bg-white text-ink">
      <section className="mx-auto w-full max-w-[900px] px-5 py-20 sm:px-8">
        <BoardDetail idx={idx} listPath="/about/news" notFoundLabel="공지사항" />
      </section>
    </div>
  );
}
