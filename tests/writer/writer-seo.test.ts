import { describe, expect, it } from "vitest";
import { writerMetadata, writerPageJsonLd } from "@/lib/seo/writer-page-schema";
import { LOCALES, type Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { absoluteUrl } from "@/lib/site";

const PATHS: Record<Locale, string> = {
  "pt-br": "/pt-br/escrever",
  en: "/en/writing",
  ru: "/ru/pismo",
};

describe("SEO страниц письма", () => {
  it("title, description, canonical и hreflang совпадают у трёх локалей", () => {
    for (const locale of LOCALES) {
      const t = getUi(locale).writing;
      const meta = writerMetadata(locale);
      const title = meta.title;
      expect(title).toEqual({ absolute: t.metaTitle });
      expect(meta.description).toBe(t.metaDescription);
      expect(t.title.length).toBeGreaterThan(10);
      expect(meta.alternates?.canonical).toBe(absoluteUrl(PATHS[locale]));

      const languages = meta.alternates?.languages as Record<string, string>;
      expect(languages["pt-BR"]).toBe(absoluteUrl(PATHS["pt-br"]));
      expect(languages.en).toBe(absoluteUrl(PATHS.en));
      expect(languages.ru).toBe(absoluteUrl(PATHS.ru));
      expect(languages["x-default"]).toBe(absoluteUrl(PATHS["pt-br"]));
    }
  });

  it("на странице один смысловой H1 и FAQ виден в тех же строках, что и FAQPage", () => {
    for (const locale of LOCALES) {
      const t = getUi(locale).writing;
      expect(t.title).not.toBe(t.howTitle);
      expect(t.faq).toHaveLength(5);
      expect(t.how).toHaveLength(3);
      expect(t.criteria).toHaveLength(5);

      const [webPage, crumbs, faq] = writerPageJsonLd(locale) as [
        { "@type": string; name: string; description: string; url: string },
        { "@type": string; itemListElement: { name: string }[] },
        { "@type": string; mainEntity: { name: string; acceptedAnswer: { text: string } }[] },
      ];

      expect(webPage["@type"]).toBe("WebPage");
      expect(webPage.name).toBe(t.title);
      expect(webPage.description).toBe(t.metaDescription);
      expect(webPage.url).toBe(absoluteUrl(PATHS[locale]));
      expect(crumbs["@type"]).toBe("BreadcrumbList");
      expect(crumbs.itemListElement.map((item) => item.name)).toEqual([
        t.breadcrumbHome,
        t.breadcrumbHere,
      ]);
      expect(faq["@type"]).toBe("FAQPage");
      expect(faq.mainEntity.map((item) => item.name)).toEqual(t.faq.map((item) => item.q));
      expect(faq.mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
        t.faq.map((item) => item.a),
      );
    }
  });
});
