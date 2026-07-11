import AboutTabs from "@/components/site/AboutTabs";
import PageHero from "@/components/site/PageHero";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHero
        eyebrow="ABOUT ARUMTECH"
        title="회사소개"
        subtitle="Professional Audio from Solingen, Germany"
        image="/images/hero/about.jpg"
      />
      <AboutTabs />
      {children}
    </>
  );
}
