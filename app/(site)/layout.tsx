import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import QuickMenu from "@/components/site/QuickMenu";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink text-cream">
      <Header />
      <main>{children}</main>
      <QuickMenu />
      <Footer />
    </div>
  );
}
