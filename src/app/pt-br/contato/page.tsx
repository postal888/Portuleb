import type { Metadata } from "next";
import { ContactView } from "@/components/contact/ContactView";
import { buildPageMetadata } from "@/i18n/metadata";
import { getUi } from "@/i18n/ui";

const ui = getUi("pt-br").contact;

export const metadata: Metadata = buildPageMetadata({
  locale: "pt-br",
  section: "contact",
  title: ui.title,
  description: ui.lead,
});

export default function ContatoPage() {
  return <ContactView locale="pt-br" />;
}
