import type { Metadata } from "next";
import { HomeLandingView } from "@/components/home/HomeLandingView";
import { buildPageMetadata } from "@/i18n/metadata";
import { getUi } from "@/i18n/ui";

const ui = getUi("ru").home;

export const metadata: Metadata = {
  ...buildPageMetadata({
    locale: "ru",
    section: "home",
    title: ui.metaTitle,
    description: ui.heroLead,
  }),
  title: { absolute: ui.metaTitle },
};

export default function RuHomePage() {
  return <HomeLandingView locale="ru" />;
}
