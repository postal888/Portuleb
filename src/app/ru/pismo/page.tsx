import type { Metadata } from "next";
import { HomeWriterMock } from "@/components/home/HomeWriterMock";
import { buildPageMetadata } from "@/i18n/metadata";
import { getUi } from "@/i18n/ui";

const ui = getUi("ru").writing;

export const metadata: Metadata = buildPageMetadata({
  locale: "ru",
  section: "writing",
  title: ui.metaTitle,
  description: ui.metaDescription,
});

export default function PismoPage() {
  return <HomeWriterMock locale="ru" />;
}
