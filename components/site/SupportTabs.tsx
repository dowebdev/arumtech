"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "A/S 안내", href: "/support" },
  { label: "문의하기", href: "/contact" },
];

export default function SupportTabs() {
  const pathname = usePathname();
  return (
    <div className="border-b border-black/10 bg-white">
      <div className="container-site overflow-x-auto">
        <div className="mx-auto flex w-fit gap-1">
          {TABS.map((t) => {
            const active = pathname === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`whitespace-nowrap px-5 py-4 text-[16px] transition-colors ${
                  active ? "text-ink" : "text-[#52555b] hover:text-ink"
                }`}
                style={{
                  borderBottom: `2px solid ${active ? "#6EA921" : "transparent"}`,
                  fontWeight: active ? 600 : 500,
                }}
              >
                {t.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
