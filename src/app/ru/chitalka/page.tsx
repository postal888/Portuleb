import type { Metadata } from "next";
import { ReaderView } from "@/components/reader/ReaderView";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/leitor/reader.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "ru",
  section: "reader",
  title: "Читалка португальских текстов с автопрокруткой",
  description:
    "Загрузите PDF, Word или текстовый файл и читайте с автопрокруткой — настройте скорость и размер шрифта для тренировки чтения на португальском.",
});

export default function RuReaderPage() {
  return <ReaderView locale="ru" />;
}
