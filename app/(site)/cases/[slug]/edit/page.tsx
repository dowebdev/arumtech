import type { Metadata } from "next";
import BoardForm from "@/components/site/BoardForm";

export const metadata: Metadata = {
  title: "설치사례 수정",
  robots: { index: false, follow: false },
};

// 라우트 세그먼트명은 [slug] 지만 실제 값은 게시글 idx 다 (상세 페이지와 동일).
export default async function CaseEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="bg-white text-ink">
      <section className="mx-auto w-full max-w-[900px] px-5 py-20 sm:px-8">
        <div className="mb-10">
          <div className="eyebrow">EDIT REFERENCE</div>
          <h1 className="m-0 text-[32px] font-semibold tracking-[-0.02em] text-ink">
            설치사례 수정
          </h1>
        </div>
        <BoardForm board="cases" idx={slug} listPath="/cases" />
      </section>
    </div>
  );
}
