import type { Metadata } from "next";
import { HomeWriterMock } from "@/components/home/HomeWriterMock";
import { JsonLd } from "@/components/seo/JsonLd";
import { writerMetadata, writerPageJsonLd } from "@/lib/seo/writer-page-schema";

export const metadata: Metadata = writerMetadata("en");

export default function WritingPage() {
  return (
    <>
      <JsonLd data={writerPageJsonLd("en")} />
      <HomeWriterMock locale="en" />
    </>
  );
}
