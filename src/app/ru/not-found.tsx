import type { Metadata } from "next";
import { LocaleNotFound } from "@/components/layout/LocaleNotFound";
import { noindexFollowRobots } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "Страница не найдена",
  description: "Запрошенная страница не найдена на Celpe-Dê Pé.",
  robots: noindexFollowRobots,
};

export default function RuNotFound() {
  return <LocaleNotFound locale="ru" />;
}
