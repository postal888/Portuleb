import type { Metadata } from "next";
import { CabinetHome } from "@/components/writer/CabinetScreens";
import { getUi } from "@/i18n/ui";

export const dynamic = "force-dynamic";

const LOCALE = "pt-br";

export function generateMetadata(): Metadata {
  const writing = getUi(LOCALE).writing;
  return {
    title: writing.cabinetMetaTitle,
    description: writing.cabinetLead,
    robots: { index: false, follow: false },
  };
}

export default async function CabinetPagePtBr({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; intent?: string }>;
}) {
  const { status, intent } = await searchParams;
  return <CabinetHome locale={LOCALE} status={status} intent={intent} />;
}
