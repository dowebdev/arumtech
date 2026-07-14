import Link from "next/link";
import Logo from "./Logo";
import AdminAccess from "./AdminAccess";
import { SITE } from "@/lib/data";

const SOCIALS = [
  { href: "https://www.facebook.com/seaudiotechnik/", icon: "ph ph-facebook-logo" },
  { href: "https://www.instagram.com/se_audiotechnik", icon: "ph ph-instagram-logo" },
  { href: "https://www.youtube.com/channel/UCxcsYAQ_KjtsycSRi5If9DQ", icon: "ph ph-youtube-logo" },
];

const COLS = [
  {
    title: "제품",
    items: [
      { label: "M-Line", href: "/products?line=M-Line" },
      { label: "L-Line", href: "/products?line=L-Line" },
      { label: "B-Line", href: "/products?line=B-Line" },
      { label: "Column", href: "/products?line=Column" },
    ],
  },
  {
    title: "바로가기",
    items: [
      { label: "설치사례", href: "/cases" },
      { label: "자료실", href: "/downloads" },
      { label: "견적문의", href: "/contact" },
      { label: "제품 추천 가이드", href: "/products" },
    ],
  },
  {
    title: "고객지원",
    items: [
      { label: "A/S 안내", href: "/support" },
      { label: "문의하기", href: "/contact" },
      { label: "공지사항", href: "/about/news" },
      { label: "오시는 길", href: "/about/location" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-panel">
      <div className="container-site pb-10 pt-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-[18px] flex items-center gap-3">
              <Logo height={30} />
              <span className="border-l border-cream/20 pl-3.5 text-[13px] tracking-[0.14em] text-muted">
                KOREA 공식총판
              </span>
            </div>
            <p className="m-0 max-w-[280px] text-[13px] leading-[1.7] text-muted">
              공간을 완성하는 정밀 음향 시스템. SE AUDIOTECHNIK 기반 전문 음향장비의 설계·공급·설치·기술지원.
            </p>
            <div className="mt-5 text-xs leading-[1.8] text-dim">
              {SITE.brandName} · 대표전화{" "}
              <span className="font-mono text-[18px] font-semibold text-accent">{SITE.phone}</span>
            </div>
            <div className="mt-[22px] flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-cream/15 text-muted transition-colors hover:border-white hover:bg-white hover:text-ink"
                >
                  <i className={s.icon} style={{ fontSize: 18 }} />
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <div className="mb-4 text-[16px] font-semibold tracking-[0.04em] text-cream">
                {col.title}
              </div>
              <div className="flex flex-col gap-[13px]">
                {col.items.map((it) => (
                  <Link
                    key={it.label}
                    href={it.href}
                    className="text-[15px] text-muted transition-colors hover:text-cream"
                  >
                    {it.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Company / legal info */}
        <div className="mt-12 border-t border-cream/[0.08] pt-8 text-[12px] leading-[1.9] text-dim">
          <span className="text-[13px] font-semibold text-muted">{SITE.brandName}</span>
          <div className="mt-2 flex flex-col gap-x-5 gap-y-0.5 sm:flex-row sm:flex-wrap">
            <span>본사 : {SITE.hqAddress}</span>
            <span>서울사무소 : {SITE.seoulAddress}</span>
          </div>
          <div className="mt-1.5 flex flex-wrap gap-x-5 gap-y-0.5">
            <span>대표 : {SITE.ceo}</span>
            <span>사업자등록번호 : {SITE.bizNo}</span>
            <span>
              대표전화 : <span className="font-mono text-accent">{SITE.phone}</span>
            </span>
            <span>팩스 : {SITE.fax}</span>
            <span>이메일 : {SITE.email}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11.5px] text-dim">{SITE.copyright}</span>
          <div className="flex items-center gap-4">
            <span className="text-[11.5px] text-dim">
              개인정보처리방침 · 이용약관 · 오시는 길
            </span>
            <AdminAccess />
          </div>
        </div>
      </div>
    </footer>
  );
}
