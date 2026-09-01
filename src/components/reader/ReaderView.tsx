import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";
import { getReaderMessages } from "@/content/reader/reader-messages";
import { DocumentReader } from "@/components/reader/DocumentReader";

export function ReaderView({ locale }: { locale: Locale }) {
  const t = getReaderMessages(locale);
  const common = getUi(locale);

  return (
    <div className="reader-page">
      <div className="reader-wrap">
        <nav className="reader-breadcrumbs" aria-label="Breadcrumb">
          <Link href={localizedPath(locale, "home")}>{common.breadcrumb.home}</Link>
          <span aria-hidden> / </span>
          <span>{t.breadcrumb}</span>
        </nav>

        <header className="reader-header">
          <div className="reader-kicker">{t.kicker}</div>
          <h1 className="reader-h1">{t.title}</h1>
          <p className="reader-lead">{t.lead}</p>
        </header>

        <section className="reader-card">
          <DocumentReader locale={locale} />
        </section>
      </div>
    </div>
  );
}
