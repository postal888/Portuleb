import type { Metadata } from "next";
import { LocaleNotFound } from "@/components/layout/LocaleNotFound";
import { buildPageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "ru",
  section: "home",
  title: "Страница не найдена",
  description: "Запрошенная страница не найдена на Celpe-Dê Pé.",
  robots: { index: false, follow: true },
});

export default function RuNotFound() {
  return <LocaleNotFound locale="ru" />;
}
