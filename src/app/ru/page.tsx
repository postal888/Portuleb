import type { Metadata } from "next";
import { HomeHubView } from "@/components/home/HomeHubView";
import { buildPageMetadata } from "@/i18n/metadata";
import { getUi } from "@/i18n/ui";

export const metadata: Metadata = buildPageMetadata({
  locale: "ru",
  section: "home",
  title: getUi("ru").home.metaTitle,
  description: getUi("ru").home.heroLead,
});

export default function RuHomePage() {
  return <HomeHubView locale="ru" />;
}
