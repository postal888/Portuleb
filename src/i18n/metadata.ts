import type { Metadata } from "next";
import type { Locale } from "./locales";
import { hreflangCode, ogLocale } from "./locales";
import { alternatesForSection, pathFor, type SectionKey } from "./route-map";
import { absoluteUrl, SITE } from "@/lib/site";

/** Thin stubs and 404s. googleBot must be set or the root layout keeps index:true. */
export const noindexFollowRobots = {
  index: false,
  follow: true,
  googleBot: { index: false, follow: true },
} as const satisfies Metadata["robots"];

function robotsWithGoogleBot(robots: Metadata["robots"]): Metadata["robots"] {
  if (!robots || typeof robots !== "object" || robots.index !== false) return robots;
  const prev = typeof robots.googleBot === "object" && robots.googleBot ? robots.googleBot : {};
  return {
    ...robots,
    googleBot: {
      ...prev,
      index: false,
      follow: prev.follow ?? robots.follow ?? true,
    },
  };
}

type PageMetaInput = {
  locale: Locale;
  section: SectionKey;
  params?: Record<string, string>;
  title: string;
  description: string;
  /** Blog / article OG */
  ogType?: "website" | "article";
  publishedTime?: string;
  keywords?: string[];
  /** Blog: set false when EN/RU post does not exist */
  hasEnBlogPost?: boolean;
  enBlogSlug?: string;
  hasRuBlogPost?: boolean;
  ruBlogSlug?: string;
  robots?: Metadata["robots"];
  /** Overrides the site default Open Graph image. Path or absolute URL. */
  ogImage?: string;
  ogImageAlt?: string;
};

export function buildPageMetadata(input: PageMetaInput): Metadata {
  const {
    locale,
    section,
    params = {},
    title,
    description,
    ogType = "website",
    publishedTime,
    keywords,
    hasEnBlogPost,
    enBlogSlug,
    hasRuBlogPost,
    ruBlogSlug,
    robots,
    ogImage,
    ogImageAlt,
  } = input;

  const canonicalPath = pathFor(locale, section, params);
  // Spanish mirror: self-canonical only. Do not emit hreflang — reciprocal
  // tags would change <head> on frozen PT/EN/RU traffic pages.
  const languages =
    locale === "es"
      ? undefined
      : alternatesForSection(section, params, {
          hasEnBlogPost,
          enBlogSlug,
          hasRuBlogPost,
          ruBlogSlug,
        });

  const alternates: Metadata["alternates"] = {
    canonical: absoluteUrl(canonicalPath),
    ...(languages
      ? {
          languages: Object.fromEntries(
            Object.entries(languages).map(([code, path]) => [code, absoluteUrl(path)]),
          ),
        }
      : {}),
  };

  return {
    title,
    description,
    keywords,
    robots: robotsWithGoogleBot(robots),
    alternates,
    openGraph: {
      type: ogType,
      locale: ogLocale(locale),
      url: absoluteUrl(canonicalPath),
      siteName: SITE.name,
      title,
      description,
      ...(publishedTime ? { publishedTime } : {}),
      images: [
        ogImage
          ? {
              url: ogImage.startsWith("http") ? ogImage : absoluteUrl(ogImage),
              width: 1200,
              height: 630,
              alt: ogImageAlt ?? SITE.name,
            }
          : { url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage ? (ogImage.startsWith("http") ? ogImage : absoluteUrl(ogImage)) : SITE.ogImage],
    },
  };
}

export function breadcrumbJsonLd(
  locale: Locale,
  items: { name: string; path?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function articleJsonLd(
  locale: Locale,
  input: {
    path: string;
    headline: string;
    description: string;
    datePublished: string;
    dateModified?: string;
    keywords?: string[];
    section?: string;
    image?: string;
  },
) {
  const url = absoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: hreflangCode(locale),
    keywords: input.keywords?.join(", "),
    articleSection: input.section,
    ...(input.image
      ? { image: input.image.startsWith("http") ? input.image : absoluteUrl(input.image) }
      : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/images/celpe-de-pe-icon.png") },
    },
  };
}
