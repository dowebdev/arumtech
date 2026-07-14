"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import {
  PRODUCT_LINES,
  LINE_DESCRIPTIONS,
  LINE_EXTERNAL_LINKS,
  DOWNLOAD_CATEGORIES,
  SITE,
  products,
  type ProductLine,
} from "@/lib/data";
import { ProductImage } from "./Visuals";

/**
 * 제품소개 메가메뉴의 우측 미리보기 — 라인을 호버하면 그 라인의 대표 제품으로 바뀐다.
 *
 * 대표 제품은 제품 목록에 그 라인으로 처음 나오는 제품이다. 다만 목록 첫 항목에 이미지가
 * 없는 라인이 있어(L-Line 의 "software") 미리보기가 빈 칸이 되므로, 이미지가 있는 첫 제품을 쓴다.
 */
const LINE_PREVIEW: Partial<
  Record<ProductLine, { model: string; slug: string; image?: string; desc: string }>
> = {};
for (const line of PRODUCT_LINES) {
  const inLine = products.filter((p) => p.line === line);
  const p = inLine.find((x) => x.image) ?? inLine[0];
  if (p) {
    LINE_PREVIEW[line] = {
      model: p.model,
      slug: p.slug,
      image: p.image,
      desc: p.kicker ?? LINE_DESCRIPTIONS[line],
    };
  }
}

/** 메뉴를 열었을 때 처음 보여줄 라인. */
const DEFAULT_PREVIEW_LINE: ProductLine =
  (PRODUCT_LINES.find((l) => LINE_PREVIEW[l]) as ProductLine) ?? "M-Line";

type MenuItem = { label: string; href: string; desc?: string; external?: boolean };
type MenuCategory = {
  key: string;
  label: string;
  en: string;
  href: string;
  items: MenuItem[];
  featured?: { label: string; href: string; img: string; desc: string };
};

// Full-screen overlay menu (Genesis-style: category list → sub-items panel)
const MENU: MenuCategory[] = [
  {
    key: "about",
    label: "회사소개",
    en: "ABOUT",
    href: "/about",
    items: [
      { label: "SE AUDIOTECHNIK 소개", href: "/about", desc: "브랜드 철학 · 기술력" },
      { label: "NEWS", href: "/about/news", desc: "소식 · 보도자료" },
      { label: "오시는 길", href: "/about/location", desc: "본사 위치 · 연락처" },
    ],
  },
  {
    key: "products",
    label: "제품소개",
    en: "PRODUCTS",
    href: "/products",
    items: [
      { label: "전체 제품", href: "/products" },
      ...PRODUCT_LINES.map((l) => ({
        label: l,
        href: LINE_EXTERNAL_LINKS[l] ?? `/products?line=${encodeURIComponent(l)}`,
        desc: LINE_DESCRIPTIONS[l],
        external: Boolean(LINE_EXTERNAL_LINKS[l]),
      })),
    ],
    featured: {
      label: "M-F3A PRO",
      href: "/products/m-f3a-pro",
      img: "/images/products/m-f3a-pro.png",
      desc: "컴팩트 액티브 라인어레이",
    },
  },
  {
    key: "cases",
    label: "설치사례",
    en: "INSTALLATION",
    href: "/cases",
    items: [
      { label: "전체 사례", href: "/cases" },
      { label: "강당 / 공연장", href: "/cases" },
      { label: "관공서 / 학교", href: "/cases" },
      { label: "종교시설", href: "/cases" },
      { label: "기업 / 상업시설", href: "/cases" },
    ],
  },
  {
    key: "downloads",
    label: "자료실",
    en: "DOWNLOADS",
    href: "/downloads",
    items: DOWNLOAD_CATEGORIES.map((c) => ({
      label: c,
      href: c === "전체" ? "/downloads" : `/downloads?cat=${encodeURIComponent(c)}`,
    })),
  },
  {
    key: "support",
    label: "고객지원",
    en: "SUPPORT",
    href: "/support",
    items: [
      { label: "A/S 안내", href: "/support", desc: "A/S 접수 · 처리 절차" },
      { label: "문의하기", href: "/contact", desc: "견적 · 제품 · 설치 상담" },
    ],
  },
];

const SOCIALS = [
  { href: "https://www.facebook.com/seaudiotechnik/", icon: "ph ph-facebook-logo", label: "Facebook" },
  { href: "https://www.instagram.com/se_audiotechnik", icon: "ph ph-instagram-logo", label: "Instagram" },
  { href: "https://www.youtube.com/channel/UCxcsYAQ_KjtsycSRi5If9DQ", icon: "ph ph-youtube-logo", label: "YouTube" },
];

const NAV = [
  { label: "회사소개", href: "/about", key: "about", menu: "about" },
  { label: "제품소개", href: "/products", key: "products", menu: "products" },
  { label: "설치사례", href: "/cases", key: "cases", menu: null },
  { label: "자료실", href: "/downloads", key: "downloads", menu: null },
  { label: "고객지원", href: "/support", key: "support", menu: "support" },
] as const;

const ACTIVE_MAP: Record<string, string[]> = {
  about: ["/about"],
  products: ["/products"],
  cases: ["/cases"],
  downloads: ["/downloads"],
  support: ["/support", "/contact"],
};

const ABOUT_MENU = [
  { label: "SE AUDIOTECHNIK 소개", desc: "브랜드 철학과 기술력", icon: "ph ph-info", href: "/about" },
  { label: "NEWS", desc: "아름텍 소식과 보도자료", icon: "ph ph-newspaper", href: "/about/news" },
  { label: "오시는 길", desc: "본사 위치 및 연락처", icon: "ph ph-map-pin", href: "/about/location" },
];

const SUPPORT_MENU = [
  { label: "A/S 안내", desc: "제품 A/S 접수 및 처리 절차", icon: "ph ph-wrench", href: "/support" },
  { label: "문의하기", desc: "견적·제품·설치 상담 요청", icon: "ph ph-chat-circle-text", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  /** 제품소개 메가메뉴에서 지금 호버 중인 라인 — 우측 미리보기가 이 라인을 따라간다. */
  const [previewLine, setPreviewLine] = useState<ProductLine>(DEFAULT_PREVIEW_LINE);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // true when the section currently behind the bar has a dark background
  const [darkBg, setDarkBg] = useState(false);

  useEffect(() => {
    // sample the section sitting behind the bar's vertical centre
    const SAMPLE_Y = 50;
    const update = () => {
      setScrolled(window.scrollY > 20);
      const els = document.querySelectorAll<HTMLElement>("[data-nav-theme]");
      let dark = false;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.top <= SAMPLE_Y && r.bottom > SAMPLE_Y) {
          dark = el.dataset.navTheme === "dark";
          break;
        }
      }
      setDarkBg(dark);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  const isActive = (key: string) =>
    (ACTIVE_MAP[key] || []).some((p) => pathname === p || pathname.startsWith(p + "/"));

  // invert the bar to white only once it has collapsed into the floating pill
  const invert = scrolled && darkBg;

  // dropdowns / sitemap sit just below the bar (which floats lower when scrolled)
  const dropTop = scrolled ? "top-[80px]" : "top-[68px]";

  return (
    <header
      className="sticky top-0 z-[100]"
      onMouseLeave={() => {
        setOpenMenu(null);
        // 다음에 열 때는 기본 라인부터 보여준다.
        setPreviewLine(DEFAULT_PREVIEW_LINE);
      }}
    >
      <div className={`transition-all duration-300 ${scrolled ? "px-3 pt-3 sm:px-4" : ""}`}>
        <div
          className={`mx-auto flex h-[68px] w-full items-center justify-between gap-6 transition-all duration-300 ${
            scrolled
              ? `max-w-[1240px] rounded-full border px-6 shadow-[0_14px_44px_-14px_rgba(0,0,0,0.45)] sm:px-8 ${
                  invert ? "border-black/10" : "border-cream/15"
                }`
              : "max-w-site border-b border-cream/10 px-5 sm:px-8"
          }`}
          style={{
            background: invert ? "#ffffff" : "#000000",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
        >
        {/* Logo */}
        <Link href="/" className="flex flex-shrink-0 items-center gap-3.5">
          <span className="block transition-[filter] duration-300" style={{ filter: invert ? "invert(1)" : "none" }}>
            <Logo height={46} />
          </span>
          <span
            className={`border-l pl-[15px] text-[14px] leading-[1.35] tracking-[0.16em] transition-colors ${
              invert ? "border-black/20 text-[#3a3d42]" : "border-cream/20 text-muted"
            }`}
          >
            KOREA
            <br />
            공식총판
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {NAV.map((n) => {
            const active = isActive(n.key);
            return (
              <Link
                key={n.key}
                href={n.href}
                onMouseEnter={() => setOpenMenu(n.menu)}
                className={`relative whitespace-nowrap px-4 py-2.5 text-[18px] tracking-[-0.01em] transition-colors hover:text-accent ${
                  invert ? "text-[#000000]" : "text-white"
                }`}
                style={{
                  fontWeight: active ? 600 : 500,
                  borderBottom: `2px solid ${active ? "#6EA921" : "transparent"}`,
                }}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: socials + mobile toggle */}
        <div className="flex flex-shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener"
                aria-label={s.label}
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                  invert
                    ? "border-black/15 text-[#6e7178] hover:border-black hover:bg-black hover:text-white"
                    : "border-cream/15 text-muted hover:border-white hover:bg-white hover:text-ink"
                }`}
              >
                <i className={s.icon} style={{ fontSize: 17 }} />
              </a>
            ))}
          </div>
          <button
            type="button"
            aria-label="전체 메뉴"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={`ml-4 flex h-10 w-10 items-center justify-center transition-colors hover:text-accent sm:ml-6 ${
              invert ? "text-[#000000]" : "text-cream"
            }`}
          >
            <MenuToggle open={menuOpen} />
          </button>
        </div>
        </div>
      </div>

      {/* Mega menu — products */}
      {openMenu === "products" && (
        <div className={`absolute left-0 right-0 ${dropTop} hidden border-b border-cream/10 bg-[#111419] shadow-2xl lg:block`}>
          <div className="container-site grid grid-cols-[1.4fr_1fr] gap-10 py-8">
            <div className="grid grid-cols-4 gap-x-6 gap-y-2">
              {PRODUCT_LINES.map((line) => {
                const external = LINE_EXTERNAL_LINKS[line];
                const cls =
                  "group rounded-md border border-transparent p-3 transition-colors hover:border-cream/25 hover:bg-white/[0.08]";
                const inner = (
                  <>
                    <div className="flex items-center gap-1.5 font-mono text-sm font-semibold tracking-[0.02em] text-cream">
                      {line}
                      {/* 호버할 때만 나타나는 이동 화살표 */}
                      <i
                        className="ph ph-arrow-up-right text-accent opacity-0 transition-opacity group-hover:opacity-100"
                        style={{ fontSize: 14 }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-1 text-[11.5px] leading-[1.4] text-muted">
                      {LINE_DESCRIPTIONS[line]}
                    </div>
                  </>
                );
                // 라인에 마우스를 올리면 우측 미리보기가 그 라인의 대표 제품으로 바뀐다.
                const onHover = () => {
                  if (LINE_PREVIEW[line]) setPreviewLine(line);
                };
                return external ? (
                  <a
                    key={line}
                    href={external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cls}
                    onMouseEnter={onHover}
                    onFocus={onHover}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link
                    key={line}
                    href={`/products?line=${encodeURIComponent(line)}`}
                    className={cls}
                    onMouseEnter={onHover}
                    onFocus={onHover}
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>
            <ProductPreview line={previewLine} />
          </div>
        </div>
      )}

      {/* Dropdown — about */}
      {openMenu === "about" && (
        <DropdownCards items={ABOUT_MENU} top={dropTop} />
      )}

      {/* Dropdown — support */}
      {openMenu === "support" && (
        <DropdownCards items={SUPPORT_MENU} top={dropTop} />
      )}

      {/* Full-screen overlay menu */}
      {menuOpen && <FullMenu onClose={() => setMenuOpen(false)} scrolled={scrolled} />}
    </header>
  );
}

/** Two bold bars that morph into an X when `open`. */
/** 제품소개 메가메뉴 우측 — 호버 중인 라인의 대표 제품을 보여준다. */
function ProductPreview({ line }: { line: ProductLine }) {
  const preview = LINE_PREVIEW[line];

  return (
    <div className="border-l border-cream/10 pl-10">
      <div className="mb-3.5 font-mono text-[11px] tracking-[0.2em] text-accent">
        {line.toUpperCase()}
      </div>

      {preview ? (
        <Link href={`/products/${preview.slug}`} className="block">
          <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-cream/10 bg-white">
            <ProductImage
              // 라인이 바뀌면 이미지를 새로 그린다 (이전 이미지가 남아 보이지 않게)
              key={preview.slug}
              src={preview.image}
              alt={preview.model}
              className="h-full w-full"
              pad="p-5"
              iconSize={48}
            />
          </div>
          <div className="mt-3 font-mono text-[15px] font-semibold text-cream">{preview.model}</div>
          <div className="mt-0.5 text-xs text-muted">{preview.desc} →</div>
        </Link>
      ) : (
        <div className="text-xs text-muted">{LINE_DESCRIPTIONS[line]}</div>
      )}
    </div>
  );
}

function MenuToggle({ open }: { open: boolean }) {
  const bar =
    "absolute left-0 block h-[2px] w-full bg-current transition-all duration-300 ease-out";
  return (
    <span className="relative block h-[17px] w-[20px]">
      <span
        className={bar}
        style={{ top: open ? "7.5px" : "2px", transform: open ? "rotate(45deg)" : "none" }}
      />
      <span
        className={bar}
        style={{ top: open ? "7.5px" : "13px", transform: open ? "rotate(-45deg)" : "none" }}
      />
    </span>
  );
}

function FullMenu({ onClose, scrolled }: { onClose: () => void; scrolled: boolean }) {
  const featured = MENU.find((m) => m.key === "products")?.featured;

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed inset-x-0 z-[90] flex flex-col overflow-hidden ${
        scrolled ? "top-[80px] h-[calc(100vh-80px)]" : "top-[68px] h-[calc(100vh-68px)]"
      }`}
      style={{
        background: "rgba(11,13,16,0.97)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        animation: "menuUnfold 0.42s cubic-bezier(0.22, 1, 0.36, 1) both",
      }}
    >
      {/* Body — full sitemap */}
      <div className="flex-1 overflow-y-auto">
        <div className="container-site py-10 md:py-16">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
            {MENU.map((cat) => (
              <div key={cat.key}>
                <Link href={cat.href} onClick={onClose} className="group block">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-accent">
                    {cat.en}
                  </span>
                  <span className="mt-1.5 block text-[22px] font-semibold tracking-[-0.01em] text-cream transition-colors group-hover:text-accent">
                    {cat.label}
                  </span>
                </Link>
                <div className="mt-5 flex flex-col gap-3 border-t border-cream/10 pt-5">
                  {cat.items.map((it) =>
                    it.external ? (
                      <a
                        key={it.label}
                        href={it.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="text-[15px] text-muted transition-colors hover:text-cream"
                      >
                        {it.label}
                      </a>
                    ) : (
                      <Link
                        key={it.label}
                        href={it.href}
                        onClick={onClose}
                        className="text-[15px] text-muted transition-colors hover:text-cream"
                      >
                        {it.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          {featured && (
            <Link
              href={featured.href}
              onClick={onClose}
              className="mt-14 flex items-center gap-5 rounded-2xl border border-cream/10 p-4 transition-colors hover:border-cream/30 sm:max-w-md"
            >
              <div className="flex h-24 w-32 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.img}
                  alt={featured.label}
                  className="h-full w-full object-contain p-3"
                />
              </div>
              <div>
                <div className="font-mono text-xs tracking-[0.16em] text-accent">FEATURED</div>
                <div className="mt-1.5 font-mono text-[17px] font-semibold text-cream">
                  {featured.label}
                </div>
                <div className="mt-0.5 text-[13px] text-muted">{featured.desc} →</div>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Footer — CTA + phone + socials */}
      <div className="border-t border-cream/10">
        <div className="container-site flex flex-wrap items-center justify-between gap-4 py-6">
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/contact"
              onClick={onClose}
              className="cursor-pointer rounded-lg bg-accent px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              견적 문의
            </Link>
            <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 text-cream">
              <i className="ph ph-phone" style={{ color: "#6EA921" }} />
              <span className="font-mono text-[18px] font-bold tracking-[0.02em]">{SITE.phone}</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-muted transition-colors hover:border-white hover:bg-white hover:text-ink"
              >
                <i className={s.icon} style={{ fontSize: 17 }} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownCards({
  items,
  top,
}: {
  items: { label: string; desc: string; icon: string; href: string }[];
  top: string;
}) {
  return (
    <div className={`absolute left-0 right-0 ${top} hidden border-b border-cream/10 bg-[#111419] shadow-2xl lg:block`}>
      <div className="container-site flex justify-center gap-4 py-7">
        {items.map((m) => (
          <Link
            key={m.label}
            href={m.href}
            className="flex w-[308px] items-center gap-4 rounded-[10px] border border-cream/10 p-[18px] transition-colors hover:border-cream/25 hover:bg-white/[0.08]"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[10px] border border-cream/25 bg-white/10">
              <i className={m.icon} style={{ fontSize: 22, color: "#6EA921" }} />
            </div>
            <div>
              <div className="text-[15px] font-semibold text-cream">{m.label}</div>
              <div className="mt-[3px] text-xs text-muted">{m.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
