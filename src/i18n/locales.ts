export const LOCALES = ["pt-br", "en", "ru"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pt-br";

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

const HTML_LANG: Record<Locale, string> = {
  "pt-br": "pt-BR",
  en: "en",
  ru: "ru",
};

const OG_LOCALE: Record<Locale, string> = {
  "pt-br": "pt_BR",
  en: "en_US",
  ru: "ru_RU",
};

const HREFLANG: Record<Locale, string> = {
  "pt-br": "pt-BR",
  en: "en",
  ru: "ru",
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
  if (pathname.startsWith("/pt-br")) return "pt-br";
  return null;
}
