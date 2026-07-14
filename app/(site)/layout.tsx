import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import QuickMenu from "@/components/site/QuickMenu";
import AdminAuthProvider from "@/components/site/AdminAuthProvider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 관리자 로그인 상태를 사이트 전역에 제공한다 — 게시판 관리 UI 도 이 안에서 useAdminAuth() 로 판단한다.
    <AdminAuthProvider>
      <div className="min-h-screen overflow-x-clip bg-ink text-cream">
        <Header />
        <main>{children}</main>
        <QuickMenu />
        <Footer />
      </div>
    </AdminAuthProvider>
  );
}
