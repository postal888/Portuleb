import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/SectionPlaceholder";

export const metadata: Metadata = {
  title: "Contato",
  alternates: { canonical: "/pt-br/contato" },
};

export default function ContatoPage() {
  return <SectionPlaceholder title="Contato" />;
}
