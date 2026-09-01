import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/SectionPlaceholder";
import { buildPageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  section: "contact",
  title: "Contact",
  description: "Contact Celpe-Dê Pé.",
});

export default function EnContactPage() {
  return (
    <SectionPlaceholder
      locale="en"
      title="Contact"
      description="This section will be built in a later step."
    />
  );
}
