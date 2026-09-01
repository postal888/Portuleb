import type { Locale } from "@/i18n/locales";
import * as pt from "./hub";
import * as en from "./hub-en";
import * as ru from "./hub-ru";

export function getTheoryHub(locale: Locale) {
  if (locale === "en") return { ...en, ui: en.theoryUiEn };
  if (locale === "ru") return { ...ru, ui: ru.theoryUiRu };
  return { ...pt, ui: null as null };
}
