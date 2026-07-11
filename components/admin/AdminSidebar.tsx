"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * 제품소개는 게시판이 아니라 정적 콘텐츠 페이지다 — 관리 대상이 아니다.
 * href 가 없는 항목은 아직 구현되지 않아 링크로 만들지 않는다.
 */
const NAV = [
  { label: "공지사항 관리", icon: "ph ph-megaphone", href: null },
  { label: "설치사례 관리", icon: "ph ph-buildings", href: null },
  { label: "자료실 관리", icon: "ph ph-folder", href: null },
  { label: "문의 관리", icon: "ph ph-chat-circle-dots", href: "/admin/inquiries" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-[248px] flex-shrink-0 flex-col border-r border-cream/[0.08] bg-panel">
      <Link
        href="/"
        className="flex h-16 items-center gap-2.5 border-b border-cream/[0.08] px-5"
      >
        <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full border-[1.5px] border-accent">
          <div className="h-[9px] w-[9px] rounded-full border-[1.5px] border-accent" />
        </div>
        <div>
          <div className="font-mono text-[13px] font-bold tracking-[0.12em] text-cream">
            ARUMTECH
          </div>
          <div className="text-[9px] tracking-[0.18em] text-dim">ADMIN CONSOLE</div>
        </div>
      </Link>

      <nav className="flex flex-1 flex-col gap-[3px] px-3 py-4">
        {NAV.map((n) => {
          const className =
            "flex items-center gap-3 rounded-lg px-3.5 py-[11px] text-[13.5px] transition-colors";

          if (!n.href) {
            return (
              <span
                key={n.label}
                className={`${className} cursor-not-allowed text-dim`}
                title="준비중"
              >
                <i className={n.icon} style={{ fontSize: 18 }} />
                {n.label}
                <span className="ml-auto text-[11px] tracking-[0.04em]">준비중</span>
              </span>
            );
          }

          const active = pathname === n.href;
          return (
            <Link
              key={n.label}
              href={n.href}
              className={className}
              style={{
                fontWeight: active ? 600 : 500,
                color: active ? "#F4F1EA" : "#A7A9AC",
                background: active ? "rgba(255,255,255,0.12)" : "transparent",
                borderLeft: `2px solid ${active ? "#6EA921" : "transparent"}`,
              }}
            >
              <i className={n.icon} style={{ fontSize: 18 }} />
              {n.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-cream/[0.08] p-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 p-2 text-[13px] text-muted transition-colors hover:text-cream"
        >
          <i className="ph ph-arrow-square-out" />
          사이트로 돌아가기
        </Link>
      </div>
    </aside>
  );
}
