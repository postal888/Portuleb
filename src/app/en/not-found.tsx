import type { Metadata } from "next";
import { LocaleNotFound } from "@/components/layout/LocaleNotFound";
import { noindexFollowRobots } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested was not found on Celpe-Dê Pé.",
  robots: noindexFollowRobots,
};

export default function EnNotFound() {
  return <LocaleNotFound locale="en" />;
}
