import type { Metadata } from "next";
import { ReaderView } from "@/components/reader/ReaderView";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/leitor/reader.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  section: "reader",
  title: "Portuguese text reader with auto-scroll",
  description:
    "Upload a PDF, Word or text file and read with auto-scroll — adjust the speed and font size to practise reading in Portuguese.",
});

export default function EnReaderPage() {
  return <ReaderView locale="en" />;
}
