import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://arumtech.co.kr"),
  title: {
    default: "ARUMTECH · 아름텍 — 공간을 완성하는 정밀 음향 시스템",
    template: "%s · 아름텍 ARUMTECH",
  },
  description:
    "SE AUDIOTECHNIK 국내 공식총판 아름텍. 강당·공연장·교회·관공서 등 공간에 맞는 음향 인프라를 설계·공급·설치하는 B2B 전문 파트너.",
  keywords: [
    "아름텍",
    "ARUMTECH",
    "SE AUDIOTECHNIK",
    "음향 시스템",
    "라인어레이",
    "강당 음향",
    "교회 음향",
    "공연장 음향",
  ],
  openGraph: {
    title: "ARUMTECH · 아름텍 — 공간을 완성하는 정밀 음향 시스템",
    description:
      "강당·공연장·교회·관공서 등 공간에 맞는 음향 인프라를 설계·공급·설치하는 B2B 전문 파트너.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Script
          src="https://unpkg.com/@phosphor-icons/web@2.1.1"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
