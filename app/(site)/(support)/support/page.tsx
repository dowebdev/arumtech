import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "A/S 안내",
  description:
    "아름텍 A/S 보증기간·접수 방법 안내. 구입일로부터 1년 무상 서비스를 제공합니다.",
};

/** A/S 접수처 (택배·방문) — 서비스센터 대표번호(1800-9810)와 별개. */
const AS_ADDRESS = "경남 김해시 장유로 194 투투스빌딩 2관 301호";
const AS_TEL = "055-314-8582";

/** 보증기간 중이라도 실비 부품비를 받는 경우. */
const PAID_CASES = [
  "고객의 부주의로 인한 고장 및 손실",
  "화재, 수재 등의 천재지변으로 인한 고장",
  "당사 서비스 직원 이외의 사람의 수리로 인한 고장",
  "사용 전원의 이상으로 인한 고장",
  "변경 또는 손상시킨 경우",
];

const NOTICES = [
  "보증기간이 경과한 후에 발생한 고장에 대해서는 실비로 수리해 드립니다.",
  "제품 모델명과 시리얼번호를 반드시 확인해 주십시오.",
  `기타 A/S나 보증수리 내용에 문의사항이 있으시면 당사 서비스센터(${SITE.phone})에 문의해 주십시오.`,
];

const SHIPPING = [
  "제품 박스 또는 외부 충격으로부터 제품을 보호할 수 있는 완충재를 사용하여 견고하게 포장하신 후 보내 주십시오.",
  "부실한 포장으로 인해 운송 도중에 제품 및 내용물이 손상되어 접수될 경우, 당사에서는 이를 책임지지 않습니다.",
  "연락처, 성명 / 상호명, 모델명, 시리얼번호, 구입일 / 구입처, 고장 내용, 부속품 내용 및 당부사항 등을 상세히 기재하여 보내 주십시오.",
  "유상 수리의 경우, 접수 및 반송 시 발생하는 운임은 고객 부담입니다.",
];

/** 왼쪽 accent 바 + 제목의 소제목 헤더. */
function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="m-0 mb-6 text-[26px] font-semibold tracking-[-0.02em] text-ink sm:text-[30px]">
        {title}
      </h2>
    </>
  );
}

export default function SupportPage() {
  return (
    <div className="bg-white text-ink">
      <section className="mx-auto w-full max-w-[1000px] px-5 py-16 sm:px-8">
        {/* 보증기간 */}
        <div className="eyebrow">WARRANTY</div>
        <h2 className="m-0 mb-6 text-[26px] font-semibold tracking-[-0.02em] text-ink sm:text-[30px]">
          보증기간
        </h2>
        <div className="flex items-center gap-5 rounded-2xl border border-accent/30 bg-accent/[0.05] p-8">
          <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-accent">
            <i className="ph ph-shield-check" style={{ fontSize: 28, color: "#FFFFFF" }} />
          </span>
          <div>
            <div className="text-[15px] text-[#52555b]">구입일로부터</div>
            <div className="mt-1 break-keep text-[22px] font-bold leading-[1.3] text-ink sm:text-[26px]">
              1년간 무상 서비스<span className="text-accent">를 제공합니다.</span>
            </div>
          </div>
        </div>

        {/* 보증기간 적용 및 세부사항 */}
        <div className="mt-16">
          <SectionTitle eyebrow="DETAILS" title="보증기간 적용 및 세부사항" />
          <p className="m-0 break-keep text-[16px] leading-[1.8] text-[#52555b]">
            정상적인 사용 상태에서 발생한 성능, 기능상 하자 발생 시, 보증기간 이내에는 무상으로
            수리해 드립니다.
          </p>

          <div className="mt-6 rounded-2xl border border-warn/30 bg-warn/[0.05] p-7">
            <div className="mb-4 flex items-center gap-2.5">
              <i className="ph ph-warning" style={{ fontSize: 20, color: "#D89B2B" }} />
              <span className="break-keep text-[15px] font-semibold text-ink">
                다음의 경우에는 보증기간 중일지라도 실비의 부품비를 받습니다
              </span>
            </div>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {PAID_CASES.map((c) => (
                <li key={c} className="flex items-start gap-2.5 break-keep text-[15px] leading-[1.6] text-[#52555b]">
                  <i className="ph ph-minus mt-1 flex-shrink-0" style={{ fontSize: 13, color: "#D89B2B" }} />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 주의사항 */}
        <div className="mt-16">
          <SectionTitle eyebrow="NOTICE" title="주의사항" />
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {NOTICES.map((n) => (
              <li
                key={n}
                className="flex items-start gap-3 rounded-xl border border-black/10 bg-[#f4f5f7] px-5 py-4"
              >
                <i className="ph ph-info mt-0.5 flex-shrink-0" style={{ fontSize: 18, color: "#6EA921" }} />
                <span className="break-keep text-[15px] leading-[1.7] text-[#52555b]">{n}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 접수방법 안내 */}
        <div className="mt-16">
          <SectionTitle eyebrow="HOW TO REQUEST" title="접수 방법 안내" />
          <p className="m-0 break-keep text-[16px] leading-[1.8] text-[#52555b]">
            직접 방문 또는 택배를 통하여 접수하시면 됩니다.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* 접수처 */}
            <div className="rounded-2xl border border-black/10 bg-white p-7">
              <div className="flex items-center gap-2.5">
                <i className="ph ph-map-pin" style={{ fontSize: 20, color: "#6EA921" }} />
                <span className="text-[15px] font-semibold text-ink">접수처 ({SITE.brandName})</span>
              </div>
              <p className="m-0 mt-4 break-keep text-[15px] leading-[1.7] text-ink">{AS_ADDRESS}</p>
              <a
                href={`tel:${AS_TEL}`}
                className="mt-3 inline-flex items-center gap-1.5 font-mono text-[18px] font-bold text-accent transition-colors hover:text-accent-hover"
              >
                <i className="ph ph-phone" style={{ fontSize: 17 }} />
                {AS_TEL}
              </a>
              <p className="m-0 mt-4 break-keep text-[13.5px] leading-[1.6] text-[#6e7178]">
                공휴일 외 휴무일이 있을 수 있으니, 방문 시 미리 연락 주시기 바랍니다.
              </p>
            </div>

            {/* 업무시간 */}
            <div className="rounded-2xl border border-black/10 bg-white p-7">
              <div className="flex items-center gap-2.5">
                <i className="ph ph-clock" style={{ fontSize: 20, color: "#6EA921" }} />
                <span className="text-[15px] font-semibold text-ink">업무시간</span>
              </div>
              <p className="m-0 mt-4 text-[16px] font-semibold text-ink">
                평일 09:00 – 18:00
              </p>
              <p className="m-0 mt-1 text-[14px] text-[#6e7178]">점심시간 12:00 – 13:00</p>
              <p className="m-0 mt-4 break-keep text-[13.5px] leading-[1.6] text-[#6e7178]">
                ※ 토요일, 일요일, 공휴일 휴무
              </p>
            </div>
          </div>

          {/* 운임 안내 */}
          <div className="mt-4 rounded-2xl border border-black/10 bg-[#f4f5f7] p-6">
            <p className="m-0 break-keep text-[14.5px] leading-[1.7] text-[#52555b]">
              품질보증기간 내에 정상적으로 사용 도중 발생한 고장에 대해서는 수리비와 수리 접수 시
              발생되는 운임비용(택배비용에 한함)을 부담합니다.
            </p>
            <p className="m-0 mt-2 break-keep text-[14.5px] leading-[1.7] text-[#6e7178]">
              제외 품목 : 고객 부주의로 인한 고장 및 손상의 경우는 제외됩니다.
            </p>
          </div>
        </div>

        {/* 택배 발송 시 유의사항 */}
        <div className="mt-16">
          <SectionTitle eyebrow="SHIPPING" title="택배 발송 시 유의사항" />
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {SHIPPING.map((s, i) => (
              <li
                key={s}
                className="flex items-start gap-3 rounded-xl border border-black/10 bg-white px-5 py-4"
              >
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/[0.1] font-mono text-[12px] font-bold text-accent">
                  {i + 1}
                </span>
                <span className="break-keep text-[15px] leading-[1.7] text-[#52555b]">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 온라인 A/S 접수 */}
        <div className="mt-16 flex flex-col items-center gap-5 rounded-2xl border border-accent/30 bg-accent/[0.05] p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <div className="text-[17px] font-semibold text-ink">온라인으로도 접수하실 수 있습니다</div>
            <p className="m-0 mt-1.5 break-keep text-[14.5px] text-[#52555b]">
              문의 양식에서 &apos;A/S문의&apos; 유형으로 접수하시면 담당자에게 즉시 알림이 전달됩니다.
            </p>
          </div>
          <Link
            href="/contact?type=A/S문의"
            className="inline-flex flex-shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            A/S 문의하기
            <i className="ph ph-arrow-right" style={{ fontSize: 17 }} />
          </Link>
        </div>
      </section>
    </div>
  );
}
