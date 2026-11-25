import type { Locale } from "@/i18n/locales";
import { celpeGuideEn } from "./guide-en";
import { celpeGuideEs } from "./guide-es";
import { celpeGuidePt } from "./guide-pt";
import { celpeGuideRu } from "./guide-ru";
import type { CelpeBrasGuideContent } from "./guide-types";

export type { CelpeBrasGuideContent, GuideAnchorKey } from "./guide-types";

export function getCelpeBrasGuide(locale: Locale): CelpeBrasGuideContent {
  if (locale === "en") return celpeGuideEn;
  if (locale === "es") return celpeGuideEs;
  if (locale === "ru") return celpeGuideRu;
  return celpeGuidePt;
}
