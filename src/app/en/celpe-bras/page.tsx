import type { Metadata } from "next";
import { CelpeBrasGuideView } from "@/components/celpe-bras/CelpeBrasGuideView";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/celpe-bras/celpe-bras.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  section: "celpeBras",
  title: "Celpe-Bras — complete exam guide",
  description:
    "Overview of the Celpe-Bras exam: written and oral parts, assessment criteria, levels, registration and calendar.",
});

export default function EnCelpeBrasPage() {
  return <CelpeBrasGuideView locale="en" />;
}
