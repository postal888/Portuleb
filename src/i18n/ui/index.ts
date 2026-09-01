import type { Locale } from "../locales";
import { enUi } from "./en";
import { ptBrUi } from "./pt-br";
import { ruUi } from "./ru";

export type SiteUi = typeof ptBrUi;

const UI: Record<Locale, SiteUi> = {
  "pt-br": ptBrUi,
  en: enUi as unknown as SiteUi,
  ru: ruUi as unknown as SiteUi,
};

export function getUi(locale: Locale): SiteUi {
  return UI[locale];
}
