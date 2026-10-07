import type { Metadata } from "next";
import { HomeWriterMock } from "@/components/home/HomeWriterMock";
import { JsonLd } from "@/components/seo/JsonLd";
import { writerMetadata, writerPageJsonLd } from "@/lib/seo/writer-page-schema";

export const metadata: Metadata = writerMetadata("pt-br");

export default function EscreverPage() {
  return (
    <>
      <JsonLd data={writerPageJsonLd("pt-br")} />
      <HomeWriterMock locale="pt-br" />
    </>
  );
}
