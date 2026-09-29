import type { Metadata } from "next";
import { LocaleNotFound } from "@/components/layout/LocaleNotFound";
import { noindexFollowRobots } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "A página solicitada não foi encontrada no Celpe-Dê Pé.",
  robots: noindexFollowRobots,
};

export default function RootNotFound() {
  return <LocaleNotFound locale="pt-br" />;
}
