import type { Metadata } from "next";
import { HomeWriterMock } from "@/components/home/HomeWriterMock";
import { buildPageMetadata } from "@/i18n/metadata";
import { getUi } from "@/i18n/ui";

const ui = getUi("pt-br").writing;

export const metadata: Metadata = buildPageMetadata({
  locale: "pt-br",
  section: "writing",
  title: ui.metaTitle,
  description: ui.metaDescription,
});

export default function EscreverPage() {
  return <HomeWriterMock locale="pt-br" />;
}
