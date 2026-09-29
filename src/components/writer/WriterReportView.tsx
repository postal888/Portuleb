import Link from "next/link";
import { EssayWorkbench } from "@/components/essay/EssayWorkbench";
import { mockDisplay, mockDisplayCyrillic } from "@/components/home/home-mock-font";
import "@/components/home/home-landing.css";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";
import type { ReportLoad } from "@/lib/writer/report-view";
import { wordLabel } from "@/lib/writer/word-label";
import type { CheckEssayMeta } from "@/lib/essay/types";

function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ""));
}

function metaOf(submission: { provider: string | null; model: string | null; mock: number }): CheckEssayMeta {
  return {
    provider: submission.mock === 1 || submission.provider === "mock" ? "mock" : "openai",
    model: submission.model ?? undefined,
    mock: submission.mock === 1 || submission.provider === "mock",
  };
}

function formatDate(value: string, locale: Locale): string {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value;
  return new Intl.DateTimeFormat(locale === "pt-br" ? "pt-BR" : locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(parsed));
}

function Shell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = getUi(locale);
  const writing = t.writing;
  return (
    <div
      className={`home-mock home-writer ${mockDisplay.variable} ${mockDisplayCyrillic.variable}${
        locale === "ru" ? " home-mock--cyrillic" : ""
      }`}
    >
      <nav className="home-writer-nav" aria-label="Breadcrumb">
        <Link href={localizedPath(locale, "home")}>{writing.breadcrumbHome}</Link>
        <span aria-hidden> / </span>
        <Link href={localizedPath(locale, "writing")}>{writing.breadcrumbHere}</Link>
        <span aria-hidden> / </span>
        <span>{writing.reportCrumb}</span>
      </nav>
      {children}
    </div>
  );
}

function Status({ locale, title, body }: { locale: Locale; title: string; body: string }) {
  const t = getUi(locale).writing;
  return (
    <Shell locale={locale}>
      <header className="home-writer-head home-rise">
        <p className="home-mock-eyebrow">{t.reportKicker}</p>
        <h1 className="home-writer-title">{title}</h1>
        <p className="home-writer-lead">{body}</p>
        <Link className="home-mock-cta" href={localizedPath(locale, "writing")}>
          {t.reportStartAnother}
        </Link>
      </header>
    </Shell>
  );
}

/**
 * Public report screen. Everything here is rendered from a token that only ever
 * reached the candidate by e-mail, so the page itself carries no e-mail address.
 */
export function WriterReportView({ load, urlLocale }: { load: ReportLoad; urlLocale: Locale }) {
  if (load.kind === "invalid") {
    return (
      <Status
        locale={urlLocale}
        title={getUi(urlLocale).writing.reportInvalidTitle}
        body={getUi(urlLocale).writing.reportInvalidBody}
      />
    );
  }
  if (load.kind === "expired") {
    const t = getUi(urlLocale).writing;
    return (
      <Status
        locale={urlLocale}
        title={t.reportExpiredTitle}
        body={fill(t.reportExpiredBody, { date: formatDate(load.expiresAt, urlLocale) })}
      />
    );
  }
  if (load.kind === "no_analysis") {
    return (
      <Status
        locale={urlLocale}
        title={getUi(urlLocale).writing.reportMissingTitle}
        body={getUi(urlLocale).writing.reportMissingBody}
      />
    );
  }

  const { locale, submission, analysis, report } = load;
  const t = getUi(locale).writing;

  return (
    <Shell locale={locale}>
      <header className="home-writer-head home-rise">
        <p className="home-mock-eyebrow">{t.reportKicker}</p>
        <h1 className="home-writer-title">{t.reportTitle}</h1>
        <p className="home-writer-lead">
          {fill(t.reportLead, {
            words: submission.word_count,
            label: wordLabel(locale, submission.word_count, t.wordOne, t.wordFew, t.wordMany),
          })}
        </p>
        <p className="home-writer-prompt-meta">
          {fill(t.reportExpires, { date: formatDate(report.expires_at, locale) })}
          {" · "}
          {t.reportLinkNote}
        </p>
      </header>
      <EssayWorkbench
        originalText={submission.essay_text}
        analysis={analysis}
        meta={metaOf(submission)}
        locale={locale}
        resetHref={localizedPath(locale, "writing")}
      />
    </Shell>
  );
}
