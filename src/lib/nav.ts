import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";

/** @deprecated Use getUi(locale).nav + localizedPath — kept for gradual migration. */
export function getMainNav(locale: Locale = "pt-br") {
  return getUi(locale).nav.map((item) => ({
    href: localizedPath(locale, item.section),
    label: item.label,
  }));
}

/** PT-only legacy export */
export const mainNav = getMainNav("pt-br");
