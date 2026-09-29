import type { Metadata } from "next";
import { ContactView } from "@/components/contact/ContactView";
import { buildPageMetadata } from "@/i18n/metadata";
import { getUi } from "@/i18n/ui";

const ui = getUi("ru").contact;

export const metadata: Metadata = buildPageMetadata({
  locale: "ru",
  section: "contact",
  title: ui.title,
  description: ui.lead,
});

export default function RuContactPage() {
  return <ContactView locale="ru" />;
}
