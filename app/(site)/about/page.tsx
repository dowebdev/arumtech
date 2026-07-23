import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SE AUDIOTECHNIK 소개",
  description:
    "SE AUDIOTECHNIK는 1980년 독일 졸링겐에서 설립된 프로페셔널 오디오 브랜드로, 40여 년간 고품질 라우드스피커·파워앰프를 설계·생산합니다. 아름텍은 2014년부터 국내 독점 공급하는 음향 전문 파트너입니다.",
};

const STATS = [
  { v: "1980", l: "독일 졸링겐 브랜드 설립" },
  { v: "40년+", l: "Loudspeaker · Power Amplifier 설계·생산" },
  { v: "2014~", l: "아름텍 국내 독점공급" },
];

const FEATURES = [
  {
    icon: "ph ph-speaker-high",
    title: "소형 고출력 설계",
    desc: "공간 효율을 극대화한 컴팩트 고출력 설계로 강력한 사운드를 구현합니다.",
  },
  {
    icon: "ph ph-arrows-out-line-horizontal",
    title: "유연한 확장성",
    desc: "다양한 환경에 맞춰 자유롭게 확장 가능한 시스템 구성을 제공합니다.",
  },
  {
    icon: "ph ph-sliders-horizontal",
    title: "DSP 기반 운용",
    desc: "DSP 기반 설계로 별도의 복잡한 세팅 없이도 최적의 사운드를 구현합니다.",
  },
  {
    icon: "ph ph-shield-check",
    title: "독일 기술 안정성",
    desc: "독일 엔지니어링 기반의 안정적인 설계로 일관된 사운드를 전달합니다.",
  },
];

const LINEUP = [
  { label: "라인어레이 시스템", models: "M-F3A PRO · M-F3A FS" },
  { label: "서브우퍼 시스템", models: "S15 PRO · B-18" },
];

const PILLARS = [
  { k: "Easy", d: "누구나 빠르고 간편하게 설치 및 운영 가능" },
  { k: "Compact", d: "공간 효율을 극대화한 소형 고출력 설계" },
  { k: "Modular", d: "다양한 환경에 맞춰 자유롭게 확장 가능한 시스템" },
];

const WHY = [
  "독일 기술 기반의 안정적인 설계",
  "직관적인 설치와 빠른 세팅",
  "뛰어난 음질과 높은 출력 성능",
  "합리적인 가격 대비 높은 효율성",
  "다양한 환경에 대응 가능한 유연한 시스템 구성",
];

export default function AboutIntroPage() {
  return (
    <div className="bg-white text-ink [word-break:keep-all]">
      {/* SE AUDIOTECHNIK BRAND STORY */}
      {/* 서브메뉴와 콘텐츠 사이 상단 여백을 모바일에서 50% 축소 (80 → 40px). PC는 그대로. */}
      <section className="container-site pb-20 pt-10 sm:pt-20">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="eyebrow text-center sm:text-left">SE AUDIOTECHNIK</div>
            <h2 className="m-0 text-center text-[23px] font-semibold leading-[1.3] tracking-[-0.02em] text-ink sm:text-left sm:text-[36px]">
              독일 졸링겐에서 시작된
              <br />
              프로페셔널 오디오 브랜드
            </h2>
            <p className="m-0 mt-6 text-[15px] leading-[1.8] text-[#52555b] sm:text-[18px] sm:leading-[1.85]">
              SE-Audiotechnik는 1980년 Michael von Keitz에 의해 독일 졸링겐(Solingen)에서
              설립되어 40여 년 이상 고품질의 Loudspeaker 및 Power Amplifier 제품을 글로벌 시장에
              공급해 왔습니다.
            </p>
            <p className="m-0 mt-4 text-[15px] leading-[1.8] text-[#52555b] sm:text-[18px] sm:leading-[1.85]">
              SE-Audiotechnik는 정통 독일 엔지니어링 기반의 프로페셔널 오디오 브랜드로 지속적으로
              성장해 왔으며, 컴팩트하면서도 강력한 사운드를 구현하는 혁신적 음향 시스템을 지속적으로
              출시하고 있습니다.
            </p>
            <p className="m-0 mt-4 text-[15px] leading-[1.8] text-[#52555b] sm:text-[18px] sm:leading-[1.85]">
              SE-Audiotechnik는 엄격한 품질 기준이 적용된 프로페셔널 음향장비의 디자인, 설계, 제조
              시스템을 자체적으로 구축하고 있으며, 고객이 요구하는 어떠한 환경에서도 안정적이고
              만족스러운 사운드를 전달하기 위해 오늘도 최선을 다하고 있습니다.
            </p>
            {/*
              모바일: 각 항목을 가로로 펼친다 — 왼쪽에 연두 큰 숫자, 오른쪽에 작은 설명.
              (한쪽으로 쏠려 보이던 문제 해결) sm 이상은 기존처럼 숫자 위·설명 아래로 쌓아 나열.
            */}
            <div className="mt-10 flex flex-col gap-4 border-t border-black/10 pt-8 sm:flex-row sm:flex-wrap sm:gap-10">
              {STATS.map((s) => (
                <div
                  key={s.l}
                  className="flex items-center justify-between gap-4 border-b border-black/[0.06] pb-4 last:border-b-0 last:pb-0 sm:block sm:border-b-0 sm:pb-0"
                >
                  <div className="font-mono text-[27px] font-semibold leading-none text-accent sm:text-[34px]">
                    {s.v}
                  </div>
                  <div className="max-w-[200px] text-right text-[13.5px] leading-[1.5] text-[#52555b] sm:mt-1 sm:max-w-[180px] sm:text-left">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-black/[0.08]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/arumtech/upload/S201911156f3fdc34ce4b1/a0228d5e871ad.jpg"
              alt="SE AUDIOTECHNIK 독일 졸링겐 사옥"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-6 py-5">
              <span className="font-mono text-[12px] tracking-[0.12em] text-cream/90">
                SE AUDIOTECHNIK · SOLINGEN, GERMANY
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* EASY · COMPACT · MODULAR */}
      <section className="bg-ink text-cream">
        <div className="container-site py-20">
          <div className="mb-12 text-center">
            <div className="eyebrow text-accent">PHILOSOPHY</div>
            <h2 className="m-0 text-[23px] font-semibold tracking-[-0.02em] sm:text-[36px]">
              Easy. <span className="text-accent">Compact.</span> Modular.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[16px] border border-white/10 bg-white/10 sm:grid-cols-3">
            {PILLARS.map((p, i) => (
              <div key={p.k} className="bg-ink p-9 text-center">
                <div className="font-mono text-[14px] tracking-[0.12em] text-accent">
                  0{i + 1}
                </div>
                <div className="mt-4 text-[20px] font-semibold tracking-[-0.01em] sm:text-[26px]">{p.k}</div>
                <p className="m-0 mt-3 text-[14px] leading-[1.7] text-cream/70 sm:text-[15px]">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS / FEATURES */}
      <section className="bg-[#f4f5f7]">
        <div className="container-site py-20">
          <div className="mb-10 max-w-[640px]">
            <div className="eyebrow text-center sm:text-left">SOLUTIONS</div>
            <h2 className="m-0 break-keep text-center text-[22px] font-semibold tracking-[-0.02em] text-ink sm:text-left sm:text-[36px]">
              다양한 환경에 최적화된 음향 솔루션
            </h2>
            <p className="m-0 mt-5 break-keep text-[14px] leading-[1.7] text-[#52555b] sm:text-base sm:leading-[1.8]">
              SE AUDIOTECHNIK는 라인어레이부터 서브우퍼까지, 현장의 요구를 이해하고 최적의 음향 경험을 제공하는 것을 목표로 합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-[14px] border border-black/[0.08] bg-white p-7 transition-colors hover:border-black/20"
              >
                <i className={f.icon} style={{ fontSize: 30, color: "#6EA921" }} />
                <div className="mt-5 text-[16px] font-semibold text-ink sm:text-[18px]">{f.title}</div>
                <div className="mt-2 text-[14.5px] leading-[1.6] text-[#52555b]">{f.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {LINEUP.map((l) => (
              <div
                key={l.label}
                // 모바일: 검정 라벨(윗줄) · 연두 모델명(아랫줄)로 쌓는다. sm 이상은 좌우 배치.
                className="flex flex-col items-start gap-1.5 rounded-[14px] border border-black/[0.08] bg-white px-7 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-0"
              >
                <span className="text-[14px] font-semibold text-ink sm:text-[16px]">{l.label}</span>
                <span className="font-mono text-[14.5px] tracking-[0.02em] text-accent">
                  {l.models}
                </span>
              </div>
            ))}
          </div>

          <p className="m-0 mt-10 max-w-[760px] text-[14px] leading-[1.7] text-[#52555b] sm:text-base sm:leading-[1.8]">
            각 제품은 DSP 기반 설계로 별도의 복잡한 세팅 없이도 최적의 사운드를 구현할 수 있도록
            설계되었습니다. 앞으로도 지속적인 기술 혁신과 고객 중심의 솔루션을 통해 글로벌 프로 오디오
            시장에서 신뢰받는 브랜드로 성장해 나가겠습니다.
          </p>
        </div>
      </section>

      {/* WHY SE-AUDIOTECHNIK */}
      <section className="container-site py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="eyebrow text-center sm:text-left">WHY SE-AUDIOTECHNIK</div>
            <h2 className="m-0 text-center text-[23px] font-semibold leading-[1.3] tracking-[-0.02em] text-ink sm:text-left sm:text-[36px]">
              선택받는
              <br />
              다섯 가지 이유
            </h2>
          </div>
          <ul className="m-0 grid list-none grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-black/[0.08] bg-black/[0.06] p-0">
            {WHY.map((w, i) => (
              <li key={w} className="flex items-center gap-5 bg-white px-7 py-5">
                <span className="font-mono text-[15px] font-semibold text-accent">
                  0{i + 1}
                </span>
                <i className="ph ph-check-circle" style={{ fontSize: 20, color: "#6EA921" }} />
                <span className="text-[15px] font-medium text-ink sm:text-[16.5px]">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OUR COMMITMENT */}
      <section className="bg-ink text-cream">
        <div className="container-site py-20 text-center">
          <div className="eyebrow text-accent">OUR COMMITMENT</div>
          <h2 className="m-0 mx-auto max-w-[820px] text-[21px] font-semibold leading-[1.5] tracking-[-0.01em] sm:text-[36px]">
            단순한 스피커 제조를 넘어, 현장의 요구를 이해하고
            <br className="hidden sm:block" />
            최적의 음향 경험을 제공합니다.
          </h2>
          <p className="m-0 mx-auto mt-6 max-w-[680px] text-[14px] leading-[1.7] text-cream/70 sm:text-[17px] sm:leading-[1.85]">
            앞으로도 지속적인 기술 혁신과 고객 중심의 솔루션을 통해 글로벌 프로 오디오 시장에서
            신뢰받는 브랜드로 성장해 나가겠습니다.
          </p>
        </div>
      </section>
    </div>
  );
}
