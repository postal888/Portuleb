import type { Locale } from "@/i18n/locales";
import { pathFor, type SectionKey } from "@/i18n/route-map";

/** Build internal link for a locale + section (never string-replace paths). */
export function localizedPath(
  locale: Locale,
  section: SectionKey,
  params: Record<string, string> = {},
): string {
  return pathFor(locale, section, params);
}
