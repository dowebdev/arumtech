import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "오시는 길",
  description: "아름텍 본사(경남 김해)·서울사무소 위치와 연락처 안내.",
};

const NAVER_MAP_URL = `https://map.naver.com/p/search/${encodeURIComponent(SITE.hqAddress)}`;
const KAKAO_MAP_URL = `https://map.kakao.com/?q=${encodeURIComponent(SITE.hqAddress)}`;

export default function AboutLocationPage() {
  return (
    <div className="bg-white text-ink">
      <section className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8">
        <div className="eyebrow">LOCATION</div>
        <h2 className="m-0 mb-10 text-[32px] font-semibold tracking-[-0.02em] text-ink sm:text-[36px]">
          오시는 길
        </h2>

        {/* MAP */}
        <div className="relative min-h-[420px] overflow-hidden rounded-[20px] border border-black/10 bg-gradient-to-b from-[#f7f8fa] to-[#eaebee] lg:min-h-[480px]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2.5">
            <span className="relative flex h-[68px] w-[68px] items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-accent/15" />
              <span className="absolute inset-[10px] rounded-full bg-accent/25" />
              <i
                className="ph ph-map-pin ph-fill relative"
                style={{ fontSize: 34, color: "#6EA921" }}
              />
            </span>
            <span className="text-[14px] text-[#52555b]">지도 영역 (Map)</span>
          </div>

          {/* 주소 오버레이 */}
          <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-[420px]">
            <div className="rounded-2xl border border-black/10 bg-white/90 p-5 shadow-[0_6px_24px_rgba(0,0,0,0.08)] backdrop-blur">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-[12.5px] font-semibold tracking-[0.04em] text-accent">
                  본사
                </span>
              </div>
              <p className="m-0 mt-2 text-[16px] leading-[1.6] text-ink">{SITE.hqAddress}</p>
            </div>
          </div>
        </div>

        {/* 지도 바로가기 */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <MapLink
            href={NAVER_MAP_URL}
            label="네이버지도 바로가기"
            sub="Naver Map"
            chipColor="#03C75A"
            iconColor="#FFFFFF"
          />
          <MapLink
            href={KAKAO_MAP_URL}
            label="카카오맵 바로가기"
            sub="Kakao Map"
            chipColor="#FEE500"
            iconColor="#191919"
          />
        </div>

        {/* 연락처 정보 */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <InfoCard icon="ph-buildings" label="본사">
            <p className="m-0 text-[16px] leading-[1.65] text-ink">{SITE.hqAddress}</p>
          </InfoCard>

          <InfoCard icon="ph-map-pin" label="서울사무소">
            <p className="m-0 text-[16px] leading-[1.65] text-ink">{SITE.seoulAddress}</p>
          </InfoCard>

          <InfoCard icon="ph-phone-call" label="대표번호">
            <a
              href={`tel:${SITE.phone}`}
              className="font-mono text-[24px] font-bold text-accent transition-colors hover:text-accent-hover"
            >
              {SITE.phone}
            </a>
            <p className="m-0 mt-2 text-[14px] text-[#6e7178]">팩스 {SITE.fax}</p>
          </InfoCard>

          <InfoCard icon="ph-envelope-simple" label="이메일 · 영업시간">
            <a
              href={`mailto:${SITE.email}`}
              className="text-[16px] text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {SITE.email}
            </a>
            <p className="m-0 mt-2 text-[14px] leading-[1.7] text-[#6e7178]">
              평일 09:00 – 18:00
              <br />
              주말·공휴일 휴무
            </p>
          </InfoCard>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 text-[16px] font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            상담 문의하기
            <i className="ph ph-arrow-right" style={{ fontSize: 18 }} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function MapLink({
  href,
  label,
  sub,
  chipColor,
  iconColor,
}: {
  href: string;
  label: string;
  sub: string;
  chipColor: string;
  iconColor: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-2xl border border-black/10 bg-white px-5 py-[18px] transition-colors hover:border-black/25"
    >
      <span
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: chipColor }}
      >
        <i className="ph ph-map-pin ph-fill" style={{ fontSize: 22, color: iconColor }} />
      </span>
      <span className="flex flex-col">
        <span className="text-[16px] font-semibold text-ink">{label}</span>
        <span className="font-mono text-[12.5px] tracking-[0.04em] text-[#6e7178]">{sub}</span>
      </span>
      <i
        className="ph ph-arrow-up-right ml-auto transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={{ fontSize: 18, color: "#6E7178" }}
      />
    </a>
  );
}

function InfoCard({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-black/10 bg-white p-7 transition-colors hover:border-black/25">
      <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/[0.08]">
        <i className={`ph ${icon}`} style={{ fontSize: 22, color: "#6EA921" }} />
      </span>
      <div className="mb-2 text-[12.5px] font-semibold tracking-[0.04em] text-[#6e7178]">
        {label}
      </div>
      {children}
    </div>
  );
}
