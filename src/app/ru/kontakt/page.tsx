import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/SectionPlaceholder";
import { buildPageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "ru",
  section: "contact",
  title: "Контакты",
  description: "Связаться с Celpe-Dê Pé.",
});

export default function RuContactPage() {
  return (
    <SectionPlaceholder
      locale="ru"
      title="Контакты"
      description="Этот раздел будет добавлен на следующем этапе."
    />
  );
}
