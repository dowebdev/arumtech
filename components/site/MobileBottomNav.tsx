"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * 앱 스타일 하단 탭바 — 모바일(lg 미만)에서만 보인다. lg 이상은 헤더의 가로 내비가 있으므로 숨긴다.
 * PC 레이아웃에는 영향을 주지 않는다.
 */
const TABS = [
  { label: "홈", href: "/", icon: "ph-house" },
  { label: "회사소개", href: "/about", icon: "ph-buildings" },
  { label: "제품소개", href: "/products", icon: "ph-speaker-hifi" },
  { label: "설치사례", href: "/cases", icon: "ph-images" },
  { label: "자료실", href: "/downloads", icon: "ph-folder-open" },
] as const;

export default function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      aria-label="모바일 하단 메뉴"
      // 다크 콘텐츠 위에서도 구분되도록: 밝은 상단 경계선 + 위로 뜨는 그림자(밝은 콘텐츠 대응)
      className="fixed inset-x-0 bottom-0 z-[150] border-t border-white/20 bg-black/95 shadow-[0_-1px_0_0_rgba(255,255,255,0.14),0_-8px_26px_-6px_rgba(0,0,0,0.6)] backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex h-[56px] items-stretch">
        {TABS.map((t) => {
          const active = isActive(t.href);
          return (
            <li key={t.href} className="flex-1">
              <Link
                href={t.href}
                className="flex h-full flex-col items-center justify-center gap-1 transition-colors"
                style={{ color: active ? "#6EA921" : "#9aa0a6" }}
              >
                <i className={`ph ${t.icon}`} style={{ fontSize: 22 }} />
                <span className="text-[10px] font-medium tracking-[-0.01em]">{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
