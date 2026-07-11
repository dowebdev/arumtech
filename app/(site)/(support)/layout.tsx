import PageHero from "@/components/site/PageHero";
import SupportTabs from "@/components/site/SupportTabs";

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHero
        eyebrow="CUSTOMER SUPPORT"
        title="고객지원"
        subtitle="Service & Technical Support"
        image="/images/hero/contact.jpg"
      />
      <SupportTabs />
      {children}
    </>
  );
}
