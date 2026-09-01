import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/SectionPlaceholder";
import { buildPageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "ru",
  section: "terms",
  title: "Условия",
  description: "Условия использования Celpe-Dê Pé.",
});

export default function RuTermsPage() {
  return (
    <SectionPlaceholder
      locale="ru"
      title="Условия"
      description="Этот раздел будет добавлен на следующем этапе."
    />
  );
}
