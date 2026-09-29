import type { Metadata } from "next";
import { WriterReportView } from "@/components/writer/WriterReportView";
import { getUi } from "@/i18n/ui";
import { loadReport } from "@/lib/writer/report-view";

export const dynamic = "force-dynamic";

const LOCALE = "pt-br";

export function generateMetadata(): Metadata {
  const writing = getUi(LOCALE).writing;
  return {
    title: writing.reportMetaTitle,
    description: writing.reportLinkNote,
    robots: { index: false, follow: false },
  };
}

export default async function WritingReportPagePtBr({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <WriterReportView load={loadReport(token)} urlLocale={LOCALE} />;
}
