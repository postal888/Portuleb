import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/SectionPlaceholder";

export const metadata: Metadata = {
  title: "Termos",
  alternates: { canonical: "/pt-br/termos" },
};

export default function TermosPage() {
  return <SectionPlaceholder title="Termos" />;
}
