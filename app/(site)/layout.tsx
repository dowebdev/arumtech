import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import QuickMenu from "@/components/site/QuickMenu";
import MobileBottomNav from "@/components/site/MobileBottomNav";
import AdminAuthProvider from "@/components/site/AdminAuthProvider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 관리자 로그인 상태를 사이트 전역에 제공한다 — 게시판 관리 UI 도 이 안에서 useAdminAuth() 로 판단한다.
    <AdminAuthProvider>
      {/* 모바일 하단 탭바 높이(56px+safe-area)만큼 아래 여백을 둬 콘텐츠가 가려지지 않게 한다. lg 이상은 탭바가 없다. */}
      <div className="min-h-screen overflow-x-clip bg-ink text-cream pb-[calc(56px+env(safe-area-inset-bottom))] lg:pb-0">
        <Header />
        <main>{children}</main>
        <QuickMenu />
        <Footer />
        <MobileBottomNav />
      </div>
    </AdminAuthProvider>
  );
}
