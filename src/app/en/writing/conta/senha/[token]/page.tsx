import type { Metadata } from "next";
import { CabinetReset } from "@/components/writer/CabinetScreens";
import { getUi } from "@/i18n/ui";

export const dynamic = "force-dynamic";

const LOCALE = "en" as const;

export function generateMetadata(): Metadata {
  const writing = getUi(LOCALE).writing;
  return {
    title: writing.cabinetResetTitle,
    robots: { index: false, follow: false },
  };
}

export default async function ResetPasswordPageEn({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <CabinetReset locale={LOCALE} token={token} />;
}
