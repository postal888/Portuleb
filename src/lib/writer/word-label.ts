import type { Locale } from "@/i18n/locales";

/**
 * Slavic plural agreement for word counts: Russian needs one/few/many forms,
 * Portuguese and English only distinguish singular.
 */
export function wordLabel(locale: Locale, words: number, one: string, few: string, many: string): string {
  if (locale === "ru") {
    const mod10 = words % 10;
    const mod100 = words % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
    return many;
  }
  return words === 1 ? one : many;
}
