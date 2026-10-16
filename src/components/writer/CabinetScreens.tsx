import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { mockDisplay, mockDisplayCyrillic } from "@/components/home/home-mock-font";
import "@/components/home/home-landing.css";
import { EssayWorkbench } from "@/components/essay/EssayWorkbench";
import { CabinetActions } from "@/components/writer/CabinetActions";
import { CabinetAuth, CabinetPasswordForm, CabinetResetForm } from "@/components/writer/CabinetRequest";
import { isWritingTaskId, getWritingTask, type WritingTask } from "@/content/writing/tasks";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";
import { cabinetEssayPath, cabinetPath } from "@/lib/writer/cabinet-path";
import { currentCabinetEmail } from "@/lib/writer/cabinet-session";
import { cabinetErrorSummary, cabinetStats, listCabinetEssays, loadCabinetEssay } from "@/lib/writer/cabinet";
import { wordLabel } from "@/lib/writer/word-label";
import type { CheckEssayMeta } from "@/lib/essay/types";
import { EssayStamp } from "./EssayStamp";
import "./cabinet.css";

function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ""));
}

function knownTask(taskId: string | null): WritingTask | null {
  if (!taskId || !isWritingTaskId(taskId)) return null;
  return getWritingTask(taskId);
}

function TaskOriginal({ locale, task }: { locale: Locale; task: WritingTask }) {
  const t = getUi(locale).writing;
  const paragraphs = task.sourceText.split(/\n{2,}/).filter((paragraph) => paragraph.trim());
  const kicker =
    task.sourceMedia?.kind === "video"
      ? t.insumoWatch
      : task.sourceMedia?.kind === "audio"
        ? t.insumoListen
        : t.insumoKicker;
  return (
    <div className="cabinet-task">
      <article className="home-writer-insumo" lang="pt-BR">
        <p className="home-writer-insumo-kicker">{kicker}</p>
        <h2 className="home-writer-insumo-title">{task.sourceTitle}</h2>
        {task.sourceMedia?.kind === "video" ? (
          <video className="home-writer-media" controls preload="metadata" playsInline src={task.sourceMedia.src} />
        ) : null}
        {task.sourceMedia?.kind === "audio" ? (
          <audio className="home-writer-media" controls preload="metadata" src={task.sourceMedia.src} />
        ) : null}
        {task.sourceImage ? (
          <img src={task.sourceImage} alt={task.sourceTitle} />
        ) : task.sourceMedia ? (
          <details className="home-writer-transcript">
            <summary>{t.transcriptLabel}</summary>
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </details>
        ) : (
          paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
        )}
      </article>
      <article className="home-writer-prompt" lang="pt-BR">
        <p className="home-writer-prompt-kicker">{t.promptKicker}</p>
        <h2 className="home-writer-prompt-title">{task.title}</h2>
        <p className="home-writer-prompt-body">{task.prompt}</p>
        <p className="home-writer-prompt-meta">
          {task.shortLabel}
          {" · "}
          {t.promptGenre} {task.genre}
          {" · "}
          {task.audience}
          {" · "}
          {task.timeHint}
        </p>
      </article>
    </div>
  );
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

  if (intent === "password") {
    return (
      <Shell locale={locale}>
        <header className="home-writer-head home-rise">
          <p className="home-mock-eyebrow">{t.cabinetKicker}</p>
          <h1 className="home-writer-title">{t.cabinetPasswordPageTitle}</h1>
          <p className="home-writer-lead">{t.cabinetPasswordPageLead}</p>
        </header>
        <CabinetPasswordForm locale={locale} />
        <p className="cabinet-switch">
          <Link href={cabinetPath(locale)}>{t.cabinetBack}</Link>
        </p>
      </Shell>
    );
  }

  if (intent === "stats") {
    const stats = cabinetStats(email);
    const errors = cabinetErrorSummary(email);
    const level = levelLabel(locale, stats.latestLevel);
    return (
      <Shell locale={locale}>
        <header className="home-writer-head home-rise">
          <p className="home-mock-eyebrow">{t.cabinetKicker}</p>
          <h1 className="home-writer-title">{t.cabinetStatsTitle}</h1>
          <p className="home-writer-lead">{t.cabinetStatsLead}</p>
        </header>
        {stats.texts === 0 ? <p className="cabinet-note">{t.cabinetStatsEmpty}</p> : null}
        <ul className="cabinet-stats">
          <li>
            <strong>{stats.texts}</strong>
            <span>{t.cabinetStatsTexts}</span>
          </li>
          <li>
            <strong>{stats.words}</strong>
            <span>{t.cabinetStatsWords}</span>
          </li>
          <li>
            <strong>{level ?? "—"}</strong>
            <span>{t.cabinetStatsLevel}</span>
          </li>
        </ul>
        <section className="cabinet-errors" aria-labelledby="cabinet-errors-title">
          <h2 id="cabinet-errors-title">{t.cabinetErrorsTitle}</h2>
          <p className="cabinet-errors-lead">{t.cabinetErrorsLead}</p>
          {errors.total === 0 ? (
            <p className="cabinet-note">{t.cabinetErrorsEmpty}</p>
          ) : (
            <>
              <ul className="cabinet-error-cats">
                {errors.byCategory.map((row) => (
                  <li key={row.category}>
                    <span>{t.categories[row.category]}</span>
                    <strong>{row.count}</strong>
                  </li>
                ))}
              </ul>
              <ul className="cabinet-error-list">
                {errors.groups.map((group) => (
                  <li key={group.key}>
                    <p className="cabinet-error-change" lang="pt-BR">
                      {group.original ? <span className="cabinet-error-from">{group.original}</span> : null}
                      {group.original && group.corrected ? <span aria-hidden="true"> → </span> : null}
                      {group.corrected ? <span className="cabinet-error-to">{group.corrected}</span> : null}
                    </p>
                    {group.count > 1 ? (
                      <span className="cabinet-error-count" aria-label={fill(t.cabinetErrorsTimes, { count: group.count })}>
                        {group.count}
                      </span>
                    ) : null}
                    <p className="cabinet-error-meta">{t.categories[group.category]}</p>
                    {group.explanation ? <p className="cabinet-error-note">{group.explanation}</p> : null}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
        <p className="cabinet-switch">
          <Link href={cabinetPath(locale)}>{t.cabinetBack}</Link>
        </p>
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
          const task = knownTask(essay.taskId);
          return (
            <li key={essay.id}>
              <Link className="cabinet-card" href={cabinetEssayPath(locale, essay.id)}>
                <strong>{task?.title ?? t.cabinetFreeTask}</strong>
                {task ? <p className="cabinet-card-prompt">{task.prompt}</p> : null}
                <span>
                  <EssayStamp iso={essay.createdAt} locale={locale} />
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
  const task = knownTask(loaded.submission.task_id);
  return (
    <Shell locale={locale}>
      <header className="home-writer-head home-rise">
        <p className="home-mock-eyebrow">{t.cabinetKicker}</p>
        <h1 className="home-writer-title">{task?.title ?? t.cabinetFreeTask}</h1>
        <p className="home-writer-lead">
          <EssayStamp iso={loaded.submission.created_at} locale={locale} />
          {" · "}
          {loaded.submission.word_count} {words}
        </p>
        <Link href={cabinetPath(locale)}>{t.cabinetBack}</Link>
      </header>
      {task ? <TaskOriginal locale={locale} task={task} /> : null}
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
