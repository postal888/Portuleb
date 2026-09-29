import type { Metadata } from "next";
import { HomeLandingView } from "@/components/home/HomeLandingView";
import { buildPageMetadata } from "@/i18n/metadata";
import { getUi } from "@/i18n/ui";
import { SITE } from "@/lib/site";

const ui = getUi("pt-br").home;

export const metadata: Metadata = {
  ...buildPageMetadata({
    locale: "pt-br",
    section: "home",
    title: SITE.titleDefault,
    description: ui.heroLead,
  }),
  title: { absolute: SITE.titleDefault },
};

export default function HomePage() {
  return <HomeLandingView locale="pt-br" />;
}
