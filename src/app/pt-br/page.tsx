import type { Metadata } from "next";
import { HomeHubView } from "@/components/home/HomeHubView";
import { buildPageMetadata } from "@/i18n/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  ...buildPageMetadata({
    locale: "pt-br",
    section: "home",
    title: SITE.titleDefault,
    description: SITE.description,
  }),
  title: { absolute: SITE.titleDefault },
};

export default function HomePage() {
  return <HomeHubView locale="pt-br" />;
}
