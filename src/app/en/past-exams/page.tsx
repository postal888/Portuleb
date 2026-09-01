import type { Metadata } from "next";
import { PastExamsIndexView } from "@/components/archive/PastExamsIndexView";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/provas-anteriores/archive.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  section: "pastExams",
  title: "Celpe-Bras past exams archive with videos",
  description:
    "Free archive of past Celpe-Bras exams by edition: question booklets, task videos, oral interaction scripts and the official prompts used in each session.",
});

export default function EnPastExamsPage() {
  return <PastExamsIndexView locale="en" />;
}
