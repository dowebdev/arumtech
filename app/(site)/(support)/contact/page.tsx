import { Suspense } from "react";
import type { Metadata } from "next";
import ContactForm from "@/components/site/ContactForm";

export const metadata: Metadata = {
  title: "문의하기",
  description:
    "견적문의·제품상담·설치상담·A/S·제휴 문의. 공간 규모와 용도를 알려주시면 전문 엔지니어가 직접 상담해드립니다.",
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
