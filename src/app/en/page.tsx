import type { Metadata } from "next";
import { HomeHubView } from "@/components/home/HomeHubView";
import { buildPageMetadata } from "@/i18n/metadata";
import { getUi } from "@/i18n/ui";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  section: "home",
  title: getUi("en").home.metaTitle,
  description:
    "Celpe-Bras preparation: theory, practice, past exams and strategy — one step at a time.",
});

export default function EnHomePage() {
  return <HomeHubView locale="en" />;
}
