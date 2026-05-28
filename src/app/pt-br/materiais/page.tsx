import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/SectionPlaceholder";

export const metadata: Metadata = {
  title: "Materiais",
  alternates: { canonical: "/pt-br/materiais" },
};

export default function MateriaisPage() {
  return <SectionPlaceholder title="Materiais" />;
}
