import type { Metadata } from "next";
import { TheoryHubView } from "@/components/teoria/TheoryHubView";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/pratica/pratica.css";
import "@/app/pt-br/teoria/verbos.css";
import "@/app/pt-br/teoria/teoria-hub.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "ru",
  section: "theory",
  title: "Грамматика португальского для Celpe-Bras",
  description:
    "Грамматика и лексика бразильского португальского по темам: crase, согласование, союзы-связки, subjuntivo и пассивный залог — с таблицами, примерами и тестами.",
});

export default function RuTheoryPage() {
  return <TheoryHubView locale="ru" />;
}
