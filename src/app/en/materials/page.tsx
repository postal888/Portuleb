import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/SectionPlaceholder";
import { buildPageMetadata, noindexFollowRobots } from "@/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  section: "materials",
  title: "Free Celpe-Bras study materials",
  description:
    "Free Celpe-Bras study materials: question booklets, task videos, vocabulary lists and preparation guides for the Brazilian Portuguese proficiency exam.",
  robots: noindexFollowRobots,
});

export default function EnMaterialsPage() {
  return (
    <SectionPlaceholder
      locale="en"
      title="Materials"
      description="This section will be built in a later step."
    />
  );
}
