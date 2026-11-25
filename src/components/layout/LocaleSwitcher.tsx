"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  SWITCHER_LOCALES,
  hreflangCode,
  type Locale,
} from "@/i18n/locales";
import { hasEnglishBlogPost, hasRussianBlogPost } from "@/lib/blog/locale";
import { getAlternatePath, parsePathname } from "@/i18n/route-map";
import { getUi } from "@/i18n/ui";

function switchHref(pathname: string, target: Locale): string {
  // The cabinet is noindex and stays out of the route map, so the switcher
  // keeps the reader on the same screen instead of falling back to the home page.
  const cabinet = pathname.match(/^\/(?:pt-br|en|ru|es)(\/writing\/conta(?:\/.*)?)$/);
  if (cabinet) {
    // No ES cabinet yet — keep the reader on an existing locale cabinet.
    const dest = target === "es" ? "en" : target;
    return `/${dest}${cabinet[1]}`;
  }

  const parsed = parsePathname(pathname);
  const slug = parsed?.params.slug;
  const hasEnBlog = parsed?.section === "blogPost" && slug ? hasEnglishBlogPost(slug) : undefined;
  const hasRuBlog = parsed?.section === "blogPost" && slug ? hasRussianBlogPost(slug) : undefined;

  return getAlternatePath(pathname, target, {
    hasEnBlogPost: hasEnBlog,
    enBlogSlug: slug,
    hasRuBlogPost: hasRuBlog,
    ruBlogSlug: slug,
  });
}

function switcherLabel(loc: Locale, ui: ReturnType<typeof getUi>["localeSwitcher"]) {
  if (loc === "pt-br") return ui.pt;
  if (loc === "ru") return ui.ru;
  if (loc === "es") return ui.es;
  return ui.en;
}

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/pt-br";
  const search = useSearchParams();
  const ui = getUi(locale).localeSwitcher;
  const query = search.toString();
  const suffix = query ? `?${query}` : "";

  // Freeze rule: never show ES on PT/EN/RU traffic pages (chrome unchanged).
  // On /es pages only, offer ES + the three existing locales.
  const localesToShow: readonly Locale[] =
    locale === "es" ? ([...SWITCHER_LOCALES, "es"] as const) : SWITCHER_LOCALES;

  return (
    <div className="locale-switcher" role="navigation" aria-label={ui.label}>
      {localesToShow.map((loc) => (
        <Link
          key={loc}
          href={switchHref(pathname, loc) + suffix}
          className={`locale-switcher__btn ${locale === loc ? "locale-switcher__btn--active" : ""}`}
          hrefLang={hreflangCode(loc)}
        >
          {switcherLabel(loc, ui)}
        </Link>
      ))}
    </div>
  );
}
