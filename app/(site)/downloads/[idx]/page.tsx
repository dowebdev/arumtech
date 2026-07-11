import type { Metadata } from "next";
import BoardDetail from "@/components/site/BoardDetail";

export const metadata: Metadata = {
  title: "자료실",
  description: "아름텍 기술자료 다운로드.",
};

export default async function ArchiveDetailPage({
  params,
}: {
  params: Promise<{ idx: string }>;
}) {
  const { idx } = await params;
  return (
    <div className="bg-white text-ink">
      <section className="mx-auto w-full max-w-[900px] px-5 py-20 sm:px-8">
        <BoardDetail idx={idx} listPath="/downloads" notFoundLabel="자료" />
      </section>
    </div>
  );
}
