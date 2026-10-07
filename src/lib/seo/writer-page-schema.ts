import type { Metadata } from "next";
import type { Locale } from "@/i18n/locales";
import { hreflangCode } from "@/i18n/locales";
import { breadcrumbJsonLd, buildPageMetadata, faqJsonLd } from "@/i18n/metadata";
import { pathFor } from "@/i18n/route-map";
import { getUi } from "@/i18n/ui";
import { absoluteUrl, SITE } from "@/lib/site";

/** Writer pages only. Absolute title skips the sitewide "%s — Celpe-Dê Pé" template. */
export function writerMetadata(locale: Locale): Metadata {
  const t = getUi(locale).writing;
  return {
    ...buildPageMetadata({
      locale,
      section: "writing",
      title: t.metaTitle,
      description: t.metaDescription,
    }),
    title: { absolute: t.metaTitle },
  };
}

/** JSON-LD used only by the three writer pages. Does not alter global Organization or WebSite. */
export function writerPageJsonLd(locale: Locale) {
  const t = getUi(locale).writing;
  const path = pathFor(locale, "writing");
  const url = absoluteUrl(path);

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.title,
    description: t.metaDescription,
    url,
    inLanguage: hreflangCode(locale),
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    about: { "@id": `${SITE.url}/#organization` },
  };

  const crumbs = breadcrumbJsonLd(locale, [
    { name: t.breadcrumbHome, path: pathFor(locale, "home") },
    { name: t.breadcrumbHere, path },
  ]);

  const faq = faqJsonLd(t.faq.map((item) => ({ question: item.q, answer: item.a })));

  return [webPage, crumbs, faq];
}
