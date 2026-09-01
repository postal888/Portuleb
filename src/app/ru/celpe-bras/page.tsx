import type { Metadata } from "next";
import { CelpeBrasGuideView } from "@/components/celpe-bras/CelpeBrasGuideView";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/celpe-bras/celpe-bras.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "ru",
  section: "celpeBras",
  title: "Celpe-Bras — полный гид по экзамену",
  description:
    "Обзор экзамена Celpe-Bras: письменная и устная части, критерии оценки, уровни, регистрация и календарь.",
});

export default function RuCelpeBrasPage() {
  return <CelpeBrasGuideView locale="ru" />;
}
