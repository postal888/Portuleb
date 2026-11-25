/** Locales that appear in the header switcher on traffic pages (freeze-safe). */
export const SWITCHER_LOCALES = ["pt-br", "en", "ru"] as const;

/** All site locales, including Spanish mirror (new URLs only). */
export const LOCALES = ["pt-br", "en", "ru", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export type SwitcherLocale = (typeof SWITCHER_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pt-br";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function isSwitcherLocale(value: string): value is SwitcherLocale {
  return (SWITCHER_LOCALES as readonly string[]).includes(value);
}

const HTML_LANG: Record<Locale, string> = {
  "pt-br": "pt-BR",
  en: "en",
  ru: "ru",
  es: "es",
};

const OG_LOCALE: Record<Locale, string> = {
  "pt-br": "pt_BR",
  en: "en_US",
  ru: "ru_RU",
  es: "es_ES",
};

const HREFLANG: Record<Locale, string> = {
  "pt-br": "pt-BR",
  en: "en",
  ru: "ru",
  es: "es",
};

export function htmlLang(locale: Locale): string {
  return HTML_LANG[locale];
}

export function ogLocale(locale: Locale): string {
  return OG_LOCALE[locale];
}

export function hreflangCode(locale: Locale): string {
  return HREFLANG[locale];
}

export function localeFromPathname(pathname: string): Locale | null {
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/ru")) return "ru";
  if (pathname.startsWith("/es")) return "es";
  if (pathname.startsWith("/pt-br")) return "pt-br";
  return null;
}
