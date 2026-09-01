import type { Metadata } from "next";
import { PastExamsIndexView } from "@/components/archive/PastExamsIndexView";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/provas-anteriores/archive.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "ru",
  section: "pastExams",
  title: "Архив Celpe-Bras: прошлые экзамены и видео",
  description:
    "Бесплатный архив прошлых экзаменов Celpe-Bras по изданиям: сборники заданий, видео к задачам, сценарии устной части и официальные материалы сессий.",
});

export default function RuPastExamsPage() {
  return <PastExamsIndexView locale="ru" />;
}
