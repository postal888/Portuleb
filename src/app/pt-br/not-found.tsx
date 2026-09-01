import type { Metadata } from "next";
import { LocaleNotFound } from "@/components/layout/LocaleNotFound";
import { buildPageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "pt-br",
  section: "home",
  title: "Página não encontrada",
  description: "A página solicitada não foi encontrada no Celpe-Dê Pé.",
  robots: { index: false, follow: true },
});

export default function PtBrNotFound() {
  return <LocaleNotFound locale="pt-br" />;
}
