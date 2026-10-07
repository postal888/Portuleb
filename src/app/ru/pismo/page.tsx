import type { Metadata } from "next";
import { HomeWriterMock } from "@/components/home/HomeWriterMock";
import { JsonLd } from "@/components/seo/JsonLd";
import { writerMetadata, writerPageJsonLd } from "@/lib/seo/writer-page-schema";

export const metadata: Metadata = writerMetadata("ru");

export default function PismoPage() {
  return (
    <>
      <JsonLd data={writerPageJsonLd("ru")} />
      <HomeWriterMock locale="ru" />
    </>
  );
}
