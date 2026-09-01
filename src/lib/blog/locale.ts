import type { Locale } from "@/i18n/locales";
import { isLocale } from "@/i18n/locales";
import type { BlogPost } from "@/content/blog/types";

/** Slugs with a bundled English article (no thin placeholders). */
export const EN_BLOG_SLUGS = new Set([
  "analise-tarefa-1-festival-fartura-2026-1",
  "repeticao-espacada-aprendizado-vocabulario",
]);

/** Slugs with a bundled Russian article. */
export const RU_BLOG_SLUGS = new Set(["analise-tarefa-1-festival-fartura-2026-1"]);

export const BLOG_LOCALE_OPTIONS = [
  { id: "pt-br" as const, label: "Português", sitePath: "/pt-br/blog", hostHint: "celpe-depe.com/pt-br" },
  { id: "en" as const, label: "English", sitePath: "/en/blog", hostHint: "en.celpe-depe.com" },
  { id: "ru" as const, label: "Русский", sitePath: "/ru/blog", hostHint: "ru.celpe-depe.com" },
] as const;

export function resolveBlogLocale(value?: string | null): Locale {
  if (value && isLocale(value)) return value;
  if (value === "pt" || value?.startsWith("pt-")) return "pt-br";
  return "pt-br";
}

export function langToBlogLocale(lang?: string | null): Locale {
  const l = (lang ?? "").trim().toLowerCase();
  if (l === "en" || l.startsWith("en-")) return "en";
  if (l === "ru" || l.startsWith("ru-")) return "ru";
  if (l === "pt" || l.startsWith("pt")) return "pt-br";
  return "pt-br";
}

export function blogLocaleLabel(locale: Locale): string {
  return BLOG_LOCALE_OPTIONS.find((opt) => opt.id === locale)?.label ?? locale;
}

export function blogLocaleSiteHint(locale: Locale): string {
  return BLOG_LOCALE_OPTIONS.find((opt) => opt.id === locale)?.hostHint ?? locale;
}

export function localePathPrefix(locale: Locale): string {
  return locale === "pt-br" ? "/pt-br" : `/${locale}`;
}

export function applyBlogLocaleToPost(post: BlogPost, locale: Locale): BlogPost {
  const prefix = localePathPrefix(locale);
  return {
    ...post,
    locale,
    sidebar: {
      ...post.sidebar,
      links: post.sidebar.links.map((link) => ({
        ...link,
        href: link.href
          .replace(/^\/pt-br/, prefix)
          .replace(/^\/en/, prefix)
          .replace(/^\/ru/, prefix),
      })),
    },
  };
}

export function localeFromPostPayload(payloadJson: string | null | undefined): Locale {
  if (!payloadJson) return "pt-br";
  try {
    const post = JSON.parse(payloadJson) as BlogPost;
    return resolveBlogLocale(post.locale);
  } catch {
    return "pt-br";
  }
}

export function hasEnglishBlogPost(slug: string): boolean {
  return EN_BLOG_SLUGS.has(slug);
}

export function hasRussianBlogPost(slug: string): boolean {
  return RU_BLOG_SLUGS.has(slug);
}
