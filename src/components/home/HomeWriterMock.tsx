"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { EssayWorkbench } from "@/components/essay/EssayWorkbench";
import { mockDisplay, mockDisplayCyrillic } from "@/components/home/home-mock-font";
import {
  DEFAULT_WRITING_TASK_ID,
  WRITING_CATALOG_HREF,
  writingTasksByCycle,
  getWritingTask,
  isWritingTaskId,
  type WritingTaskId,
} from "@/content/writing/tasks";
import type { CheckEssayMeta, EssayAnalysis } from "@/lib/essay/types";
import { SAMPLE_ESSAY_PT } from "@/lib/essay/sample";
import { wordCount } from "@/lib/essay/schema";
import { createWriterTracker, type WriterTracker } from "@/lib/writer/client";
import { writerErrorCopy } from "@/lib/writer/error-copy";
import { deliveryTemplateOf, emailEventOf } from "@/lib/writer/email-status";
import { EMAIL_GATE_WORDS, EXAM_MAX_WORDS, EXAM_MIN_WORDS } from "@/lib/writer/time";
import { wordLabel } from "@/lib/writer/word-label";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";
import "./home-landing.css";

type DeliveryState = {
  submissionId: string;
  status: string;
  error: string | null;
  reportUrl: string | null;
  expiresDays: number;
};

type ResendState = { status: "idle" | "busy" | "sent" | "failed" };

type CheckPayload = {
  ok?: boolean;
  errorCode?: string | null;
  stage?: string;
  analysis?: EssayAnalysis;
  meta?: CheckEssayMeta;
  submissionId?: string;
  emailDelivery?: string;
  emailError?: string | null;
  reportUrl?: string | null;
  reportExpiresDays?: number;
};

type ResendPayload = {
  ok?: boolean;
  delivery?: string;
  errorCode?: string | null;
  reportUrl?: string | null;
  expiresDays?: number;
};

/** The candidate reads their own corrections in the language they browse the site in. */
function explanationLanguageOf(locale: Locale): "pt" | "en" | "ru" {
  if (locale === "ru") return "ru";
  if (locale === "en") return "en";
  return "pt";
}

function errorCategoryOf(
  errorCode: string | null | undefined,
  stage: string | undefined,
  status: number,
): string {
  if (status === 429 || errorCode === "rate_limited" || errorCode === "rate_limit") return "rate_limit";
  if (stage === "validation" || status === 400 || errorCode === "validation") return "validation";
  if (stage === "storage") return "storage";
  if (stage === "analysis") return "provider";
  return "unknown";
}

function limitWords(value: string, max: number) {
  const tokens = value.match(/\s+|\S+/g);
  if (!tokens) return value;
  let words = 0;
  let out = "";
  for (const token of tokens) {
    if (/^\s+$/.test(token)) {
      if (words < max) out += token;
      continue;
    }
    if (words >= max) break;
    words += 1;
    out += token;
  }
  return out;
}

function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ""));
}

export function HomeWriterMock({
  locale,
  placement = "writing",
  fixedTaskId,
}: {
  locale: Locale;
  placement?: "writing" | "practice";
  fixedTaskId?: WritingTaskId;
}) {
  const t = getUi(locale).writing;
  const homeHref = localizedPath(locale, "home");
  const practiceHref = localizedPath(locale, "practice");
  const practiceLabel = getUi(locale).nav.find((item) => item.section === "practice")?.label ?? "Prática";
  const escritaLabel = locale === "en" ? "Writing" : locale === "ru" ? "Письмо" : "Escrita";
  const taskGroups = writingTasksByCycle();
  const [taskId, setTaskId] = useState<WritingTaskId>(fixedTaskId ?? DEFAULT_WRITING_TASK_ID);
  const task = getWritingTask(taskId);
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [errorSource, setErrorSource] = useState<"essay" | "email" | "form" | null>(null);
  const [focusTick, setFocusTick] = useState(0);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{
    analysis: EssayAnalysis;
    meta: CheckEssayMeta;
    debug?: boolean;
  } | null>(null);
  const [delivery, setDelivery] = useState<DeliveryState | null>(null);
  const [resend, setResend] = useState<ResendState>({ status: "idle" });
  const essayRef = useRef<HTMLTextAreaElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const trackerRef = useRef<WriterTracker | null>(null);
  const taskIdRef = useRef<WritingTaskId>(taskId);
  const milestonesRef = useRef(new Set<string>());
  const appliedFocusTickRef = useRef(0);

  const words = useMemo(() => wordCount(text), [text]);
  const canAskEmail = words >= EMAIL_GATE_WORDS;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSubmit = words >= EXAM_MIN_WORDS && emailOk && !checking;
  const label = wordLabel(locale, words, t.wordOne, t.wordFew, t.wordMany);
  const sourceParagraphs = task.sourceText.split(/\n{2,}/);
  const essayDescribedBy = ["essay-count", errorSource === "essay" ? "writer-error" : null]
    .filter(Boolean)
    .join(" ");
  const emailDescribedBy = [
    "writer-email-hint",
    errorSource === "email" ? "writer-error" : null,
  ]
    .filter(Boolean)
    .join(" ");

  function showError(message: string, source: "essay" | "email" | "form", shouldFocus = true) {
    setError(message);
    setErrorSource(source);
    // A counter instead of a boolean: re-showing the same message must focus again.
    if (shouldFocus) setFocusTick((tick) => tick + 1);
  }

  function clearError() {
    if (!error) return;
    setError("");
    setErrorSource(null);
  }

  function track(
    name: Parameters<WriterTracker["track"]>[0],
    fields: Parameters<WriterTracker["track"]>[1] = {},
  ) {
    trackerRef.current?.track(name, fields);
  }

  /** Gates open once per visit: the beacon fires on the crossing, not on every keystroke. */
  function reportMilestones(nextWords: number) {
    const fired = milestonesRef.current;
    if (nextWords >= EMAIL_GATE_WORDS && !fired.has("email")) {
      fired.add("email");
      track("writer_reached_email_threshold", { wordCount: nextWords });
    }
    if (nextWords >= EXAM_MIN_WORDS && !fired.has("minimum")) {
      fired.add("minimum");
      track("writer_reached_exam_minimum", { wordCount: nextWords });
    }
  }

  useEffect(() => {
    if (!fixedTaskId || fixedTaskId === taskIdRef.current) return;
    setTaskId(fixedTaskId);
    taskIdRef.current = fixedTaskId;
    trackerRef.current?.setTaskId(fixedTaskId);
    setText("");
    setResult(null);
    setError("");
    setErrorSource(null);
  }, [fixedTaskId]);

  function selectTask(nextId: string) {
    if (!isWritingTaskId(nextId)) return;
    setTaskId(nextId);
    taskIdRef.current = nextId;
    trackerRef.current?.setTaskId(nextId);
    track("writer_task_selected", { taskId: nextId, wordCount: words });
  }

  /** Words count as writing wherever they come from — typed or loaded from the example. */
  function applyText(next: string) {
    const nextWords = wordCount(next);
    const tracker = trackerRef.current;
    if (nextWords > 0) {
      if (tracker?.started()) {
        tracker.touch();
      } else {
        tracker?.start();
        track("writer_started", { wordCount: nextWords });
      }
    }
    setText(next);
    reportMilestones(nextWords);
  }

  useEffect(() => {
    const tracker = createWriterTracker({
      locale,
      path: window.location.pathname,
      taskId: taskIdRef.current,
    });
    trackerRef.current = tracker;
    tracker.track("writer_opened", { wordCount: 0 });
    return () => {
      trackerRef.current = null;
      tracker.destroy();
    };
  }, [locale]);

  useEffect(() => {
    if (appliedFocusTickRef.current === focusTick) return;
    appliedFocusTickRef.current = focusTick;
    if (!error || !errorSource) return;
    if (errorSource === "essay") essayRef.current?.focus();
    else if (errorSource === "email") emailRef.current?.focus();
    else errorRef.current?.focus();
  }, [focusTick, error, errorSource]);

  useEffect(() => {
    if (result || !text.trim()) return;
    const onLeave = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [text, result]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (words < EXAM_MIN_WORDS) {
      track("writer_validation_failed", { reason: "too_short", wordCount: words });
      showError(fill(t.errorShort, { min: EXAM_MIN_WORDS }), "essay");
      return;
    }
    if (words > EXAM_MAX_WORDS) {
      track("writer_validation_failed", { reason: "too_long", wordCount: words });
      showError(fill(t.errorLong, { max: EXAM_MAX_WORDS }), "essay");
      return;
    }
    if (!emailOk) {
      track("writer_validation_failed", { reason: "bad_email", wordCount: words });
      showError(t.errorEmail, "email");
      return;
    }

    setError("");
    setErrorSource(null);
    setChecking(true);
    const tracker = trackerRef.current;
    tracker?.beginSubmit();
    track(delivery ? "writer_resubmitted" : "writer_submit_started", { wordCount: words });

    try {
      const timing = tracker?.snapshot();
      const debug = new URLSearchParams(window.location.search).has("debug");
      const response = await fetch("/api/check-essay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          email: email.trim(),
          sourceLanguage: "pt",
          explanationLanguage: explanationLanguageOf(locale),
          mode: "exam",
          taskId,
          debug,
          locale,
          sessionId: tracker?.ids().sessionId ?? null,
          ...(timing
            ? { timing: { activeMs: timing.activeMs, elapsedMs: timing.elapsedMs } }
            : {}),
        }),
      });
      const payload = (await response.json().catch(() => null)) as CheckPayload | null;

      if (!response.ok || !payload?.ok || !payload.analysis || !payload.meta) {
        track("writer_analysis_failed", {
          resultStatus: "failed",
          errorCategory: errorCategoryOf(payload?.errorCode, payload?.stage, response.status),
          reason: payload?.errorCode ?? `http_${response.status}`,
          durationMs: tracker?.submitElapsedMs() ?? 0,
        });
        // Only the mapped copy reaches the screen: the API carries codes, and an unknown one still
        // resolves to this locale's fallback instead of raw server text.
        showError(writerErrorCopy(t.errors, payload?.errorCode), "form");
        return;
      }

      track("writer_analysis_succeeded", {
        resultStatus: "succeeded",
        wordCount: words,
        durationMs: tracker?.submitElapsedMs() ?? 0,
      });
      track("writer_result_shown", { wordCount: words });
      setResult({ analysis: payload.analysis, meta: payload.meta, debug });
      setResend({ status: "idle" });

      const status = payload.emailDelivery ?? "pending";
      if (payload.submissionId) {
        setDelivery({
          submissionId: payload.submissionId,
          status,
          error: payload.emailError ?? null,
          reportUrl: payload.reportUrl ?? null,
          expiresDays: payload.reportExpiresDays ?? 0,
        });
      }
      const event = emailEventOf(status);
      if (event === "writer_email_sent") {
        track(event, { deliveryStatus: status });
      } else if (event) {
        track(event, { deliveryStatus: status, reason: payload.emailError ?? status });
      }
    } catch {
      track("writer_analysis_failed", {
        resultStatus: "failed",
        errorCategory: "network",
        reason: "request_failed",
        durationMs: tracker?.submitElapsedMs() ?? 0,
      });
      showError(writerErrorCopy(t.errors, "request_failed"), "form");
    } finally {
      setChecking(false);
    }
  }

  async function handleResend() {
    if (!delivery) return;
    setResend({ status: "busy" });
    try {
      const response = await fetch("/api/writer/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId: delivery.submissionId, email: email.trim() }),
      });
      const payload = (await response.json().catch(() => null)) as ResendPayload | null;
      if (response.ok && payload?.ok) {
        setResend({ status: "sent" });
        // A delivered resend rotates the token, so the on-screen link has to become the mailed one.
        setDelivery((current) =>
          current
            ? {
                ...current,
                status: "sent",
                error: null,
                reportUrl: payload.reportUrl ?? current.reportUrl,
                expiresDays: payload.expiresDays ?? current.expiresDays,
              }
            : current,
        );
        track("writer_email_sent", { deliveryStatus: "sent" });
        return;
      }
      setResend({ status: "failed" });
      // The same rule as after the first send: an unconfigured retry is not a delivery failure.
      const event = emailEventOf(payload?.delivery ?? "failed");
      if (event) {
        track(event, {
          deliveryStatus: payload?.delivery ?? "failed",
          reason: payload?.errorCode ?? `http_${response.status}`,
        });
      }
    } catch {
      setResend({ status: "failed" });
      const event = emailEventOf("failed");
      if (event) track(event, { deliveryStatus: "failed", reason: "request_failed" });
    }
  }

  if (result) {
    const template = deliveryTemplateOf(t, delivery?.status);
    const deliveryCopy =
      delivery?.status === "sent"
        ? fill(template, { email: email.trim(), days: delivery.expiresDays })
        : template;

    return (
      <div
        className={`home-mock home-writer ${mockDisplay.variable} ${mockDisplayCyrillic.variable}${
          locale === "ru" ? " home-mock--cyrillic" : ""
        }`}
      >
        <nav className="home-writer-nav" aria-label="Breadcrumb">
          <Link href={homeHref}>{t.breadcrumbHome}</Link>
          <span aria-hidden> / </span>
          <span>{t.breadcrumbHere}</span>
        </nav>

        {delivery ? (
          <section className="home-writer-prompt home-rise" aria-live="polite">
            <p className="home-writer-prompt-kicker">{t.deliveryKicker}</p>
            <p className="home-writer-prompt-body">{deliveryCopy}</p>
            {delivery.reportUrl ? (
              <p className="home-writer-prompt-body">
                {t.deliveryLink}{" "}
                <a href={delivery.reportUrl} rel="nofollow noreferrer">
                  {delivery.reportUrl.replace(/^https?:\/\//, "")}
                </a>
              </p>
            ) : null}
            <button
              type="button"
              className="home-writer-example"
              onClick={handleResend}
              disabled={resend.status === "busy"}
            >
              {resend.status === "busy" ? t.resendBusy : t.resend}
            </button>
            {resend.status === "sent" ? (
              <p className="home-writer-gate-hint" role="status">
                {fill(t.resendDone, { email: email.trim() })}
              </p>
            ) : null}
            {resend.status === "failed" ? (
              <p className="home-writer-gate-hint" role="status">
                {t.resendFailed}
              </p>
            ) : null}
          </section>
        ) : null}

        <div aria-live="polite">
          <EssayWorkbench
            originalText={text}
            analysis={result.analysis}
            meta={result.meta}
            locale={locale}
            debug={result.debug}
            onReset={() => setResult(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`home-mock home-writer ${mockDisplay.variable} ${mockDisplayCyrillic.variable}${
        locale === "ru" ? " home-mock--cyrillic" : ""
      }`}
    >
      <nav className="home-writer-nav" aria-label="Breadcrumb">
        <Link href={homeHref}>{t.breadcrumbHome}</Link>
        <span aria-hidden> / </span>
        {placement === "practice" ? (
          <>
            <Link href={practiceHref}>{practiceLabel}</Link>
            <span aria-hidden> / </span>
            {fixedTaskId ? (
              <>
                <Link href={WRITING_CATALOG_HREF}>{escritaLabel}</Link>
                <span aria-hidden> / </span>
                <span>{task.shortLabel}</span>
              </>
            ) : (
              <span>{escritaLabel}</span>
            )}
          </>
        ) : (
          <span>{t.breadcrumbHere}</span>
        )}
      </nav>

      <header className="home-writer-head home-rise">
        <p className="home-mock-eyebrow">{fixedTaskId ? task.shortLabel : t.eyebrow}</p>
        <h1 className="home-writer-title">{fixedTaskId ? task.title : t.title}</h1>
        <p className="home-writer-lead">{fixedTaskId ? task.genre : t.lead}</p>
        <p className="home-writer-disclaimer">{t.disclaimer}</p>
        <a className="home-writer-jump" href="#writing-editor">
          {t.startWriting}
        </a>
        {fixedTaskId ? (
          <p className="home-writer-task-picker">
            <Link className="home-writer-rotate" href={WRITING_CATALOG_HREF}>
              Todas as tarefas
            </Link>
          </p>
        ) : (
          <div className="home-writer-task-picker">
            <label className="home-writer-label" htmlFor="writer-task">
              {t.taskPickerLabel}
            </label>
            <select
              id="writer-task"
              className="home-writer-task"
              value={taskId}
              onChange={(event) => selectTask(event.target.value)}
            >
              {taskGroups.map((group) => (
                <optgroup key={group.cycle} label={group.cycle}>
                  {group.tasks.map((item) => (
                    <option key={item.id} value={item.id} lang="pt-BR">
                      {item.number} — {item.title}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <button
              type="button"
              className="home-writer-rotate"
              onClick={() => {
                const ordered = taskGroups.flatMap((group) => group.tasks);
                const index = ordered.findIndex((item) => item.id === taskId);
                const next = ordered[(index + 1) % ordered.length];
                if (next) selectTask(next.id);
              }}
            >
              {t.nextTask}
            </button>
          </div>
        )}
      </header>

      <article className="home-writer-insumo home-rise" lang="pt-BR">
        <p className="home-writer-insumo-kicker">
          {task.sourceMedia?.kind === "video"
            ? t.insumoWatch
            : task.sourceMedia?.kind === "audio"
              ? t.insumoListen
              : t.insumoKicker}
        </p>
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
            {sourceParagraphs.map((paragraph, index) => (
              <p key={`${task.id}-${index}`}>{paragraph}</p>
            ))}
          </details>
        ) : (
          sourceParagraphs.map((paragraph, index) => (
            <p key={`${task.id}-${index}`}>{paragraph}</p>
          ))
        )}
      </article>

      <article className="home-writer-prompt home-rise home-rise-delay-1" lang="pt-BR">
        <p className="home-writer-prompt-kicker">{t.promptKicker}</p>
        <h2 className="home-writer-prompt-title">{task.title}</h2>
        <p className="home-writer-prompt-body">{task.prompt}</p>
        {t.promptLangNote ? <p className="home-writer-prompt-body">{t.promptLangNote}</p> : null}
        <p className="home-writer-prompt-meta">
          {t.promptGenre} {task.genre} · {task.audience} · {task.timeHint}
        </p>
      </article>

      <form
        id="writing-editor"
        className="home-writer-form home-rise home-rise-delay-2"
        onSubmit={handleSubmit}
        aria-busy={checking}
      >
        <label className="home-writer-label" htmlFor="essay">
          {t.labelText}
        </label>
        <textarea
          ref={essayRef}
          id="essay"
          name="essay"
          className={`home-writer-area${errorSource === "essay" ? " is-invalid" : ""}`}
          value={text}
          onChange={(event) => {
            applyText(limitWords(event.target.value, EXAM_MAX_WORDS));
            clearError();
          }}
          onFocus={() => trackerRef.current?.touch()}
          onBlur={() => {
            if (words > 0 && words < EXAM_MIN_WORDS) {
              showError(fill(t.errorShort, { min: EXAM_MIN_WORDS }), "essay", false);
            }
          }}
          rows={14}
          placeholder={t.placeholder}
          disabled={checking}
          autoComplete="off"
          aria-invalid={errorSource === "essay"}
          aria-describedby={essayDescribedBy}
        />
        <button
          type="button"
          className="home-writer-example"
          onClick={() => {
            applyText(limitWords(SAMPLE_ESSAY_PT, EXAM_MAX_WORDS));
            clearError();
          }}
        >
          {t.loadExample}
        </button>
        <div className="home-writer-meter" aria-hidden>
          <span
            className="home-writer-meter-fill"
            style={{ transform: `scaleX(${Math.min(1, words / EXAM_MAX_WORDS)})` }}
          />
        </div>
        <p
          id="essay-count"
          className={`home-writer-count${
            words >= EXAM_MAX_WORDS ? " is-full" : words > 0 && words < EXAM_MIN_WORDS ? " is-short" : ""
          }`}
        >
          {words} / {EXAM_MAX_WORDS} {label}
          <span>{fill(t.wordHint, { max: EXAM_MAX_WORDS })}</span>
        </p>

        <div className={`home-writer-gate${canAskEmail ? " is-open" : ""}`}>
          <label className="home-writer-label" htmlFor="email">
            {t.labelEmail}
          </label>
          <input
            ref={emailRef}
            id="email"
            name="email"
            className={`home-writer-email${errorSource === "email" ? " is-invalid" : ""}`}
            type="email"
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              clearError();
            }}
            onBlur={() => {
              if (canAskEmail && email.trim() && !emailOk) {
                showError(t.errorEmail, "email", false);
              }
            }}
            placeholder={t.emailPlaceholder}
            disabled={!canAskEmail || checking}
            aria-invalid={errorSource === "email"}
            aria-describedby={emailDescribedBy}
          />
          <p id="writer-email-hint" className="home-writer-gate-hint">
            {canAskEmail ? t.emailNotice : t.gateClosed}
          </p>
        </div>

        {error ? (
          <p
            ref={errorRef}
            id="writer-error"
            className="home-writer-error"
            role="alert"
            tabIndex={-1}
          >
            {error}
          </p>
        ) : null}

        {!canSubmit && !checking ? (
          <p id="writer-submit-hint" className="sr-only">
            {fill(t.submitHint, { min: EXAM_MIN_WORDS })}
          </p>
        ) : null}

        <p className="sr-only" role="status" aria-live="polite">
          {checking ? t.checking : ""}
        </p>

        <button
          type="submit"
          className={`home-mock-cta home-writer-submit${checking ? " is-busy" : ""}`}
          disabled={!canSubmit}
          aria-describedby={!canSubmit && !checking ? "writer-submit-hint" : undefined}
        >
          {checking ? t.checking : t.submit}
        </button>
      </form>

      <WriterGuide t={t} />
    </div>
  );
}

function WriterGuide({ t }: { t: ReturnType<typeof getUi>["writing"] }) {
  return (
    <div className="home-writer-guide">
      <section className="home-writer-block" aria-labelledby="writer-how-title">
        <h2 id="writer-how-title">{t.howTitle}</h2>
        <ol className="home-writer-steps">
          {t.how.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-writer-block" aria-labelledby="writer-criteria-title">
        <h2 id="writer-criteria-title">{t.criteriaTitle}</h2>
        <ul className="home-writer-criteria">
          {t.criteria.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-writer-block" aria-labelledby="writer-faq-title">
        <h2 id="writer-faq-title">{t.faqTitle}</h2>
        <div className="home-writer-faq">
          {t.faq.map((item) => (
            <div key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
