import type { Metadata } from "next";
import { ContactView } from "@/components/contact/ContactView";
import { buildPageMetadata } from "@/i18n/metadata";
import { getUi } from "@/i18n/ui";

const ui = getUi("es").contact;

export const metadata: Metadata = buildPageMetadata({
  locale: "es",
  section: "contact",
  title: ui.title,
  description: ui.lead,
});

export default function EsContactPage() {
  return <ContactView locale="es" />;
}
