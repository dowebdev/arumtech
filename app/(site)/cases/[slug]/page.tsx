import type { Metadata } from "next";
import BoardDetail from "@/components/site/BoardDetail";

export const metadata: Metadata = {
  title: "설치사례",
  description: "아름텍 SE AUDIOTECHNIK 음향 시스템 설치 프로젝트 상세.",
};

// 라우트 세그먼트명은 [slug] 지만 실제 값은 게시글 idx 다.
export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="bg-white text-ink">
      <section className="mx-auto w-full max-w-[900px] px-5 py-20 sm:px-8">
        <BoardDetail idx={slug} listPath="/cases" notFoundLabel="설치사례" />
      </section>
    </div>
  );
}
