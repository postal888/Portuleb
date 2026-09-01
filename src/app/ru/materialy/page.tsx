import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/SectionPlaceholder";
import { buildPageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "ru",
  section: "materials",
  title: "Бесплатные материалы для подготовки к Celpe-Bras",
  description:
    "Бесплатные материалы для подготовки к Celpe-Bras: сборники заданий, видео к задачам, списки лексики и учебные руководства по экзамену.",
});

export default function RuMaterialsPage() {
  return (
    <SectionPlaceholder
      locale="ru"
      title="Материалы"
      description="Этот раздел будет добавлен на следующем этапе."
    />
  );
}
