import type { Metadata } from "next";
import { LocaleNotFound } from "@/components/layout/LocaleNotFound";
import { buildPageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  section: "home",
  title: "Page not found",
  description: "The page you requested was not found on Celpe-Dê Pé.",
  robots: { index: false, follow: true },
});

export default function EnNotFound() {
  return <LocaleNotFound locale="en" />;
}
