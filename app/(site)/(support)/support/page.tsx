import Link from "next/link";
import type { Metadata } from "next";
import { SITE, asSteps } from "@/lib/data";

export const metadata: Metadata = {
  title: "A/S 안내",
  description:
    "아름텍은 납품·설치한 전 제품에 대해 책임 A/S를 제공합니다. 전화 또는 온라인으로 A/S를 접수하세요.",
};

const SERVICES = [
  { icon: "ph-warning-circle", label: "제품 이상" },
  { icon: "ph-gauge", label: "시스템 점검" },
  { icon: "ph-package", label: "부품 교체" },
  { icon: "ph-truck", label: "현장 출장 점검" },
];

const STEP_ICONS: Record<string, string> = {
  "01": "ph-clipboard-text",
  "02": "ph-magnifying-glass",
  "03": "ph-wrench",
  "04": "ph-check-circle",
};

const CHECKLIST = [
  { icon: "ph-barcode", title: "제품 모델명 및 설치 시기", desc: "제품 라벨 또는 납품 명세서에서 확인하실 수 있습니다." },
  { icon: "ph-warning-circle", title: "증상 및 발생 상황", desc: "언제부터, 어떤 상황에서 발생했는지 알려주세요." },
  { icon: "ph-user-circle", title: "설치 장소 및 담당자 연락처", desc: "현장 출장이 필요한 경우 확인에 사용됩니다." },
];

export default function SupportPage() {
  return (
    <div className="bg-white text-ink">
      <section className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8">
        {/* INTRO */}
        <div className="max-w-[760px]">
          <div className="eyebrow">A/S SERVICE</div>
          <h2 className="m-0 break-keep text-[28px] font-semibold tracking-[-0.02em] text-ink sm:text-[36px]">
            납품·설치한 전 제품을 책임집니다
          </h2>
          <p className="m-0 mt-5 break-keep text-[17px] leading-[1.8] text-[#52555b]">
            제품 이상, 시스템 점검, 부품 교체, 현장 출장 점검이 필요하신 경우 아래 절차로 접수해
            주시면 담당 엔지니어가 신속히 응대합니다.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2.5">
          {SERVICES.map((s) => (
            <span
              key={s.label}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#f4f5f7] py-2.5 pl-3.5 pr-4 text-[14px] font-medium text-[#52555b]"
            >
              <i className={`ph ${s.icon}`} style={{ fontSize: 17, color: "#6EA921" }} />
              {s.label}
            </span>
          ))}
        </div>

        {/* 처리 절차 */}
        <div className="mt-20">
          <div className="eyebrow">PROCESS</div>
          <h2 className="m-0 mb-8 text-[26px] font-semibold tracking-[-0.02em] text-ink sm:text-[30px]">
            처리 절차
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {asSteps.map((st, i) => (
              <div
                key={st.no}
                className="group relative rounded-2xl border border-black/10 bg-white p-7 transition-colors hover:border-accent/60"
              >
                {i > 0 && (
                  <i
                    className="ph ph-caret-right absolute -left-[19px] top-1/2 hidden -translate-y-1/2 lg:block"
                    style={{ fontSize: 18, color: "#C9CBCF" }}
                    aria-hidden="true"
                  />
                )}

                <div className="flex items-center justify-between">
                  <span className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-accent/[0.08] transition-colors group-hover:bg-accent/[0.14]">
                    <i className={`ph ${STEP_ICONS[st.no]}`} style={{ fontSize: 26, color: "#6EA921" }} />
                  </span>
                  <span className="font-mono text-[13px] font-bold tracking-[0.1em] text-[#c2c5c9]">
                    STEP {st.no}
                  </span>
                </div>

                <div className="mt-6 text-[21px] font-semibold tracking-[-0.01em] text-ink">
                  {st.title}
                </div>
                <div className="mt-2.5 break-keep text-[15.5px] leading-[1.65] text-[#52555b]">
                  {st.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 접수 시 안내사항 */}
        <div className="mt-20">
          <div className="eyebrow">CHECKLIST</div>
          <h2 className="m-0 mb-8 text-[26px] font-semibold tracking-[-0.02em] text-ink sm:text-[30px]">
            접수 시 안내해 주세요
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {CHECKLIST.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-black/10 bg-[#f4f5f7] p-7 transition-colors hover:border-black/25"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white">
                  <i className={`ph ${c.icon}`} style={{ fontSize: 21, color: "#6EA921" }} />
                </span>
                <div className="mt-5 break-keep text-[17px] font-semibold text-ink">{c.title}</div>
                <div className="mt-2 break-keep text-[14.5px] leading-[1.6] text-[#6e7178]">
                  {c.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 접수 방법 */}
        <div className="mt-20">
          <div className="eyebrow">HOW TO REQUEST</div>
          <h2 className="m-0 mb-8 text-[26px] font-semibold tracking-[-0.02em] text-ink sm:text-[30px]">
            접수 방법
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* 전화 접수 */}
            <a
              href={`tel:${SITE.phone}`}
              className="group flex flex-col rounded-2xl border border-accent/30 bg-accent/[0.05] p-8 transition-colors hover:border-accent"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                  <i className="ph ph-phone-call" style={{ fontSize: 21, color: "#FFFFFF" }} />
                </span>
                <span className="text-[17px] font-semibold text-ink">A/S 전화 접수</span>
                <i
                  className="ph ph-arrow-up-right ml-auto transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ fontSize: 18, color: "#6E7178" }}
                />
              </div>
              <div className="mt-7 font-mono text-[34px] font-bold leading-none tracking-[-0.01em] text-accent">
                {SITE.phone}
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[14px] text-[#6e7178]">
                <i className="ph ph-clock" style={{ fontSize: 15 }} />
                {SITE.brandName} · 평일 09:00 – 18:00
              </div>
            </a>

            {/* 온라인 접수 */}
            <div className="flex flex-col rounded-2xl border border-black/10 bg-white p-8 transition-colors hover:border-black/25">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/[0.08]">
                  <i className="ph ph-chat-circle-text" style={{ fontSize: 21, color: "#6EA921" }} />
                </span>
                <span className="text-[17px] font-semibold text-ink">온라인 A/S 접수</span>
              </div>
              <p className="m-0 mt-5 break-keep text-[15px] leading-[1.7] text-[#52555b]">
                문의 양식에서 &apos;A/S 문의&apos; 유형으로 접수하시면 담당자에게 즉시 알림이
                전달됩니다.
              </p>
              <Link
                href="/contact?type=A/S 문의"
                className="mt-auto inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent py-4 text-[15px] font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                A/S 문의하기
                <i className="ph ph-arrow-right" style={{ fontSize: 17 }} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
