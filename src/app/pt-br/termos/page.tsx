import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/SectionPlaceholder";
import { buildPageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "pt-br",
  section: "terms",
  title: "Termos",
  description: "Termos de uso — Celpe-Dê Pé.",
});

export default function TermosPage() {
  return <SectionPlaceholder locale="pt-br" title="Termos" />;
}
