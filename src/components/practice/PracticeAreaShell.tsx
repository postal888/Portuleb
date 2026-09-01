import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";

type Props = {
  locale: Locale;
  title: string;
  kicker?: string;
  lead?: string;
  children: React.ReactNode;
};

export function PracticeAreaShell({ locale, title, kicker, lead, children }: Props) {
  const ui = getUi(locale);
  const practiceLabel =
    locale === "en" ? "Practice" : locale === "ru" ? "Практика" : "Prática";

  return (
    <div className="practice-hub">
      <div className="practice-wrap">
        <nav className="practice-breadcrumbs" aria-label="Breadcrumb">
          <Link href={localizedPath(locale, "home")}>{ui.breadcrumb.home}</Link>
          <span aria-hidden> / </span>
          <Link href={localizedPath(locale, "practice")}>{practiceLabel}</Link>
          <span aria-hidden> / </span>
          <span>{title}</span>
        </nav>

        <header className="practice-hero" style={{ paddingBottom: "0.5rem" }}>
          {kicker ? <div className="practice-kicker">{kicker}</div> : null}
          <h1 className="practice-section-title">{title}</h1>
          {lead ? <p className="practice-section-copy" style={{ marginTop: "0.75rem" }}>{lead}</p> : null}
        </header>

        {children}

        <p className="practice-muted" style={{ marginTop: "1.5rem", fontSize: "0.875rem" }}>
          <Link href={localizedPath(locale, "practice")} className="practice-linkline">
            ← {practiceLabel}
          </Link>
        </p>
      </div>
    </div>
  );
}
