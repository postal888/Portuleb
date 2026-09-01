import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/SectionPlaceholder";
import { buildPageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "pt-br",
  section: "contact",
  title: "Contato",
  description: "Contato — Celpe-Dê Pé.",
});

export default function ContatoPage() {
  return <SectionPlaceholder locale="pt-br" title="Contato" />;
}
