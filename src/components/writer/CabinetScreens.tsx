import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { mockDisplay, mockDisplayCyrillic } from "@/components/home/home-mock-font";
import "@/components/home/home-landing.css";
import { EssayWorkbench } from "@/components/essay/EssayWorkbench";
import { CabinetActions } from "@/components/writer/CabinetActions";
import { CabinetAuth, CabinetResetForm } from "@/components/writer/CabinetRequest";
import { isWritingTaskId, getWritingTask } from "@/content/writing/tasks";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";
import { cabinetEssayPath, cabinetPath } from "@/lib/writer/cabinet-path";
import { currentCabinetEmail } from "@/lib/writer/cabinet-session";
import { listCabinetEssays, loadCabinetEssay } from "@/lib/writer/cabinet";
import { wordLabel } from "@/lib/writer/word-label";
import type { CheckEssayMeta } from "@/lib/essay/types";
import "./cabinet.css";

function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ""));
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

function taskTitle(taskId: string | null, freeLabel: string): string {
  if (taskId && isWritingTaskId(taskId)) return getWritingTask(taskId).title;
  return freeLabel;
}

function levelLabel(locale: Locale, level: string | null): string | null {
  if (!level) return null;
  const levels = getUi(locale).writing.levels as Record<string, string>;
  return levels[level] ?? null;
}

function Shell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const writing = getUi(locale).writing;
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
        <span>{writing.cabinetCrumb}</span>
      </nav>
      {children}
    </div>
  );
}

export async function CabinetHome({
  locale,
  status,
  intent,
}: {
  locale: Locale;
  status?: string;
  intent?: string;
}) {
  const t = getUi(locale).writing;
  const email = await currentCabinetEmail();
  const mode = intent === "register" ? "register" : intent === "forgot" ? "forgot" : "login";
  const title =
    mode === "register" ? t.cabinetRegisterTitle : mode === "forgot" ? t.cabinetForgotTitle : t.cabinetLoginTitle;
  const lead =
    mode === "register" ? t.cabinetRegisterLead : mode === "forgot" ? t.cabinetForgotLead : t.cabinetLead;

  if (!email) {
    return (
      <Shell locale={locale}>
        <header className="home-writer-head home-rise">
          <p className="home-mock-eyebrow">{t.cabinetKicker}</p>
          <h1 className="home-writer-title">{title}</h1>
          <p className="home-writer-lead">{lead}</p>
        </header>
        {status === "invalid" ? <p className="cabinet-note">{t.cabinetInvalidBody}</p> : null}
        {status === "erased" ? (
          <p className="cabinet-note" role="status">
            {t.cabinetErased}
          </p>
        ) : null}
        <CabinetAuth locale={locale} mode={mode} />
      </Shell>
    );
  }

  const essays = listCabinetEssays(email);
  return (
    <Shell locale={locale}>
      <header className="home-writer-head home-rise">
        <p className="home-mock-eyebrow">{t.cabinetKicker}</p>
        <h1 className="home-writer-title">{t.cabinetTitle}</h1>
        <p className="home-writer-lead">{fill(t.cabinetListLead, { email })}</p>
      </header>
      {essays.length === 0 ? <p className="cabinet-note">{t.cabinetEmpty}</p> : null}
      <ul className="cabinet-list">
        {essays.map((essay) => {
          const level = levelLabel(locale, essay.level);
          const words = wordLabel(locale, essay.wordCount, t.wordOne, t.wordFew, t.wordMany);
          return (
            <li key={essay.id}>
              <Link className="cabinet-card" href={cabinetEssayPath(locale, essay.id)}>
                <strong>{taskTitle(essay.taskId, t.cabinetFreeTask)}</strong>
                <span>
                  {formatDate(essay.createdAt, locale)}
                  {" · "}
                  {essay.wordCount} {words}
                  {level ? ` · ${level}` : ""}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <CabinetActions locale={locale} />
    </Shell>
  );
}

export async function CabinetReset({ locale, token }: { locale: Locale; token: string }) {
  const t = getUi(locale).writing;
  return (
    <Shell locale={locale}>
      <header className="home-writer-head home-rise">
        <p className="home-mock-eyebrow">{t.cabinetKicker}</p>
        <h1 className="home-writer-title">{t.cabinetResetTitle}</h1>
        <p className="home-writer-lead">{t.cabinetResetLead}</p>
      </header>
      <CabinetResetForm locale={locale} token={token} />
    </Shell>
  );
}

function metaOf(submission: { provider: string | null; model: string | null; mock: number }): CheckEssayMeta {
  return {
    provider: submission.mock === 1 || submission.provider === "mock" ? "mock" : "openai",
    model: submission.model ?? undefined,
    mock: submission.mock === 1 || submission.provider === "mock",
  };
}

export async function CabinetEssay({ locale, id }: { locale: Locale; id: string }) {
  const t = getUi(locale).writing;
  const email = await currentCabinetEmail();
  if (!email) redirect(cabinetPath(locale));

  const loaded = loadCabinetEssay(email, id);
  if (!loaded) {
    return (
      <Shell locale={locale}>
        <header className="home-writer-head home-rise">
          <p className="home-mock-eyebrow">{t.cabinetKicker}</p>
          <h1 className="home-writer-title">{t.cabinetMissingTitle}</h1>
          <p className="home-writer-lead">{t.cabinetMissingBody}</p>
          <Link className="home-mock-cta home-writer-submit" href={cabinetPath(locale)}>
            {t.cabinetBack}
          </Link>
        </header>
      </Shell>
    );
  }

  const words = wordLabel(locale, loaded.submission.word_count, t.wordOne, t.wordFew, t.wordMany);
  return (
    <Shell locale={locale}>
      <header className="home-writer-head home-rise">
        <p className="home-mock-eyebrow">{t.cabinetKicker}</p>
        <h1 className="home-writer-title">{taskTitle(loaded.submission.task_id, t.cabinetFreeTask)}</h1>
        <p className="home-writer-lead">
          {formatDate(loaded.submission.created_at, locale)}
          {" · "}
          {loaded.submission.word_count} {words}
        </p>
        <Link href={cabinetPath(locale)}>{t.cabinetBack}</Link>
      </header>
      <EssayWorkbench
        originalText={loaded.submission.essay_text}
        analysis={loaded.analysis}
        meta={metaOf(loaded.submission)}
        locale={locale}
        resetHref={localizedPath(locale, "writing")}
      />
    </Shell>
  );
}
