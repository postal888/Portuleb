import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/SectionPlaceholder";
import { buildPageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  section: "terms",
  title: "Terms",
  description: "Terms of use for Celpe-Dê Pé.",
});

export default function EnTermsPage() {
  return (
    <SectionPlaceholder
      locale="en"
      title="Terms"
      description="This section will be built in a later step."
    />
  );
}
