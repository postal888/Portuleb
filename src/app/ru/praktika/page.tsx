import type { Metadata } from "next";
import { PracticeHubView } from "@/components/practice/PracticeHubView";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/pratica/pratica.css";
import "@/app/pt-br/pratica/exercicios.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "ru",
  section: "practice",
  title: "Практика Celpe-Bras: аудирование, чтение, письмо",
  description:
    "Практика в реальном формате Celpe-Bras: аудирование по видео с субтитрами, чтение размеченных текстов, четыре письменные задачи и упражнения по грамматике.",
});

export default function RuPracticePage() {
  return <PracticeHubView locale="ru" />;
}
