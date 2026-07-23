import { Suspense } from "react";
import type { Metadata } from "next";
import ContactForm from "@/components/site/ContactForm";

export const metadata: Metadata = {
  title: "문의하기",
  description:
    "A/S·제품 문의. 제품 도입과 A/S를 전문 담당자가 직접 응대해드립니다.",
};

export default function ContactPage() {
  return (
    <div className="bg-white text-ink">
      <Suspense fallback={<div className="container-site py-24 text-center text-[#52555b]">불러오는 중…</div>}>
        <ContactForm />
      </Suspense>
    </div>
  );
}
