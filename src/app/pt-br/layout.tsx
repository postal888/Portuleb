import { PageViewBeacon } from "@/components/analytics/PageViewBeacon";
import { PageDecor } from "@/components/decor/PageDecor";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, SITE } from "@/lib/site";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: absoluteUrl("/images/celpe-de-pe-icon.png"),
  description: SITE.description,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  inLanguage: "pt-BR",
  description: SITE.description,
};

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema]} />
      <PageViewBeacon />
      <PageDecor />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="site-main-inner flex-1">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
}
