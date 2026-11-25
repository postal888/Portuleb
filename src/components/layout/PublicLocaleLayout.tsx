import { Suspense } from "react";
import { PageDecor } from "@/components/decor/PageDecor";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocaleHtmlLang } from "@/components/layout/LocaleHtmlLang";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/locales";
import { hreflangCode } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { absoluteUrl, SITE } from "@/lib/site";

export function PublicLocaleLayout({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const ui = getUi(locale);
  const schemaDescription = locale === "pt-br" ? SITE.description : ui.home.heroLead;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl("/images/celpe-de-pe-icon.png"),
    description: schemaDescription,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: hreflangCode(locale),
    description: schemaDescription,
  };

  return (
    <>
      <LocaleHtmlLang />
      <JsonLd data={[organizationSchema, websiteSchema]} />
      <PageDecor />
      <div className="relative z-10 flex min-h-screen flex-col">
        <a href="#main-content" className="skip-to-content">
          {ui.skipToContent}
        </a>
        <Suspense fallback={null}>
          <Header locale={locale} />
        </Suspense>
        <main id="main-content" className="site-main-inner flex-1" tabIndex={-1}>
          <div className="site-page mx-auto px-4 py-8 sm:px-6 lg:px-8">{children}</div>
        </main>
        <Footer locale={locale} />
      </div>
    </>
  );
}
