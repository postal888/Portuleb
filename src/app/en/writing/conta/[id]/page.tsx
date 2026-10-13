import type { Metadata } from "next";
import { CabinetEssay } from "@/components/writer/CabinetScreens";
import { getUi } from "@/i18n/ui";

export const dynamic = "force-dynamic";

const LOCALE = "en";

export function generateMetadata(): Metadata {
  const writing = getUi(LOCALE).writing;
  return {
    title: writing.cabinetMetaTitle,
    robots: { index: false, follow: false },
  };
}

export default async function CabinetEssayPageEn({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CabinetEssay locale={LOCALE} id={id} />;
}
