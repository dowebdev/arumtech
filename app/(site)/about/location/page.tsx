import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/data";
import KakaoRoughMap from "@/components/site/KakaoRoughMap";

export const metadata: Metadata = {
  title: "오시는 길",
  description: "아름텍 본사(경남 김해)·서울사무소 위치와 연락처 안내.",
};

const NAVER_MAP_URL = `https://map.naver.com/p/search/${encodeURIComponent(SITE.hqAddress)}`;
const KAKAO_MAP_URL = `https://map.kakao.com/?q=${encodeURIComponent(SITE.hqAddress)}`;

export default function AboutLocationPage() {
  return (
    <div className="bg-white text-ink">
      <section className="mx-auto w-full max-w-[1200px] px-5 pb-20 pt-10 sm:px-8 sm:pt-20">
        <div className="eyebrow text-center sm:text-left">LOCATION</div>
        <h2 className="m-0 mb-10 text-center text-[23px] font-semibold tracking-[-0.02em] text-ink sm:text-left sm:text-[36px]">
          오시는 길
        </h2>

        {/* MAP — 카카오(다음) 약도. 키 없이 소스만으로 렌더(정적). 하단 정보바는 CSS 로 잘라 가린다. */}
        <div className="overflow-hidden rounded-[20px] border border-black/10">
          <KakaoRoughMap />
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
