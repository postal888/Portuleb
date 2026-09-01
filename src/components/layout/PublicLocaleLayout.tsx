import { Suspense } from "react";
import { PageDecor } from "@/components/decor/PageDecor";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocaleHtmlLang } from "@/components/layout/LocaleHtmlLang";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/locales";
import { hreflangCode } from "@/i18n/locales";
import { absoluteUrl, SITE } from "@/lib/site";

export function PublicLocaleLayout({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
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
    inLanguage: hreflangCode(locale),
    description: SITE.description,
  };

  return (
    <>
      <LocaleHtmlLang />
      <JsonLd data={[organizationSchema, websiteSchema]} />
      <PageDecor />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Suspense fallback={null}>
          <Header locale={locale} />
        </Suspense>
        <main className="site-main-inner flex-1">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
        </main>
        <Footer locale={locale} />
      </div>
    </>
  );
}
