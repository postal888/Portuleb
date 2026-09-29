"use client";

import Link from "next/link";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { renderPlainCorrected } from "@/lib/essay/renderer";
import { explanationOf } from "@/lib/essay/types";
import type {
  CheckEssayMeta,
  CorrectionCategory,
  CorrectionSeverity,
  EssayAnalysis,
} from "@/lib/essay/types";
import { getUi } from "@/i18n/ui";
import type { Locale } from "@/i18n/locales";
import "./essay-workbench.css";

type Tab = "task" | "corrected" | "notes" | "stats" | "json";

export function EssayWorkbench({
  originalText,
  analysis,
  meta,
  locale,
  debug = false,
  onReset,
  resetHref,
}: {
  originalText: string;
  analysis: EssayAnalysis;
  meta: CheckEssayMeta;
  locale: Locale;
  debug?: boolean;
  onReset?: () => void;
  resetHref?: string;
}) {
  const t = getUi(locale).writing;
  const [tab, setTab] = useState<Tab>(analysis.celpe ? "task" : "corrected");
  const [copied, setCopied] = useState(false);
  const [showJson, setShowJson] = useState(debug);

  const clean = useMemo(
    () => renderPlainCorrected(originalText, analysis.corrections),
    [originalText, analysis.corrections],
  );

  async function copyClean() {
    await navigator.clipboard.writeText(clean);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  const tabs: Array<{ id: Tab; label: string; hidden?: boolean }> = [
    { id: "task", label: t.tabTask, hidden: !analysis.celpe },
    { id: "corrected", label: t.tabCorrected },
    { id: "notes", label: t.tabNotes },
    { id: "stats", label: t.tabStats },
    { id: "json", label: t.tabJson, hidden: !showJson },
  ];

  return (
    <div className="essay-work home-rise">
      <div className="essay-work-head">
        <div>
          <p className="essay-work-kicker">{t.eyebrow}</p>
          <h2 className="essay-work-title">{analysis.celpe ? t.scoreCardTitle : t.tabCorrected}</h2>
        </div>
        <div className="essay-work-actions">
          <button type="button" className="essay-work-btn" onClick={copyClean}>
            {copied ? t.copied : t.copyClean}
          </button>
          {resetHref ? (
            <Link className="essay-work-btn" href={resetHref}>
              {t.writeAgain}
            </Link>
          ) : (
            <button type="button" className="essay-work-btn" onClick={onReset}>
              {t.writeAgain}
            </button>
          )}
          {debug ? (
            <button type="button" className="essay-work-btn" onClick={() => setShowJson((value) => !value)}>
              {t.debugToggle}
            </button>
          ) : null}
        </div>
      </div>

      <div className="essay-report">
        {analysis.celpe ? <EssayScoreCard celpe={analysis.celpe} t={t} /> : null}

        <div className="essay-report-body">
          <EssayTabs tabs={tabs} current={tab} onChange={setTab} />

          {tab === "task" && analysis.celpe ? <CelpePanel analysis={analysis} t={t} /> : null}

          {tab === "corrected" ? (
            <CorrectedSheet
              html={analysis.correctedAnnotatedHtml}
              empty={t.noIssues}
              count={analysis.corrections.length}
            />
          ) : null}

          {tab === "notes" ? (
            <div className="essay-sheet">
              {analysis.corrections.length === 0 ? (
                <p className="essay-empty">{t.noIssues}</p>
              ) : (
                analysis.corrections.map((item, index) => (
                  <article key={item.id} className="essay-note" id={`essay-note-${index + 1}`}>
                    <div className="essay-note-top">
                      <span className="essay-note-n">{index + 1}</span>
                      <span className="essay-note-pair">
                        <del>{item.originalFragment || "∅"}</del>
                        {" → "}
                        <ins>{item.correctedFragment || "∅"}</ins>
                      </span>
                      <span className="essay-badge">{t.categories[item.category as CorrectionCategory]}</span>
                      <span className={`essay-badge is-${item.severity}`}>
                        {severityLabel(item.severity, t)}
                      </span>
                    </div>
                    <p className="essay-note-body">{explanationOf(item)}</p>
                    {item.ruleHint ? <p className="essay-note-rule">{item.ruleHint}</p> : null}
                  </article>
                ))
              )}
            </div>
          ) : null}

          {tab === "stats" ? <StatsPanel analysis={analysis} t={t} /> : null}

          {tab === "json" && showJson ? (
            <div className="essay-sheet">
              <pre className="essay-json">{JSON.stringify({ analysis, meta }, null, 2)}</pre>
            </div>
          ) : null}

          {meta.mock ? <p className="essay-mock-note">{t.mockNote}</p> : null}
        </div>
      </div>
    </div>
  );
}

function EssayTabs({
  tabs,
  current,
  onChange,
}: {
  tabs: Array<{ id: Tab; label: string; hidden?: boolean }>;
  current: Tab;
  onChange: (id: Tab) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [clip, setClip] = useState("inset(0 100% 0 0 round 999px)");
  const [ready, setReady] = useState(false);
  const visible = tabs.filter((item) => !item.hidden);

  const updateClip = useCallback(() => {
    const overlay = overlayRef.current;
    const active = rootRef.current?.querySelector<HTMLElement>(".essay-tab.is-on");
    if (!overlay || !active) return;
    const box = overlay.getBoundingClientRect();
    const pill = active.getBoundingClientRect();
    setClip(
      `inset(${pill.top - box.top}px ${box.right - pill.right}px ${box.bottom - pill.bottom}px ${pill.left - box.left}px round 999px)`,
    );
  }, []);

  useLayoutEffect(() => {
    updateClip();
    const frame = window.requestAnimationFrame(() => setReady(true));
    const root = rootRef.current;
    if (!root || typeof ResizeObserver === "undefined") {
      return () => window.cancelAnimationFrame(frame);
    }
    const observer = new ResizeObserver(updateClip);
    observer.observe(root);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [current, updateClip, visible.length]);

  return (
    <div className="essay-tabs" ref={rootRef}>
      <div className="essay-tabs-row" role="tablist">
        {visible.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={current === item.id}
            className={`essay-tab${current === item.id ? " is-on" : ""}`}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        ref={overlayRef}
        className={`essay-tabs-on${ready ? " is-ready" : ""}`}
        style={{ clipPath: clip }}
        aria-hidden
      >
        {visible.map((item) => (
          <span key={item.id} className="essay-tab">
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function CorrectedSheet({
  html,
  empty,
  count,
}: {
  html: string;
  empty: string;
  count: number;
}) {
  const [tipFast, setTipFast] = useState(false);

  return (
    <div
      className={`essay-sheet${tipFast ? " is-tip-fast" : ""}`}
      onPointerOver={(event) => {
        if (tipFast) return;
        if (!(event.target as HTMLElement).closest("[data-tip]")) return;
        window.setTimeout(() => setTipFast(true), 180);
      }}
    >
      {count === 0 ? <p className="essay-empty">{empty}</p> : <div dangerouslySetInnerHTML={{ __html: html }} />}
    </div>
  );
}

function formatScore(value: number) {
  return value.toFixed(1).replace(".", ",");
}

function meanScore(celpe: NonNullable<EssayAnalysis["celpe"]>) {
  return (
    (celpe.taskFulfillment.score +
      celpe.sourceComprehension.score +
      celpe.organization.score +
      celpe.language.score) /
    4
  );
}

function EssayScoreCard({
  celpe,
  t,
}: {
  celpe: NonNullable<EssayAnalysis["celpe"]>;
  t: ReturnType<typeof getUi>["writing"];
}) {
  const rows = [
    { label: t.scoreAdequacao, short: t.scoreAdequacaoShort, score: celpe.taskFulfillment.score },
    { label: t.scoreCompreensao, short: t.scoreCompreensaoShort, score: celpe.sourceComprehension.score },
    { label: t.scoreOrganizacao, short: t.scoreOrganizacaoShort, score: celpe.organization.score },
    { label: t.scoreLingua, short: t.scoreLinguaShort, score: celpe.language.score },
  ];
  const mean = meanScore(celpe);

  return (
    <section className="essay-score" aria-label={t.scoreCardTitle}>
      <div className="essay-score-top">
        <div>
          <p className="essay-score-kicker">{t.level}</p>
          <p className="essay-score-level">{t.levels[celpe.estimatedLevel]}</p>
        </div>
        <p className="essay-score-mean">
          <span className="essay-score-mean-n">{formatScore(mean)}</span>
          <span className="essay-score-mean-l">{t.scoreMean}</span>
        </p>
      </div>
      <ul className="essay-score-quad">
        {rows.map((row) => (
          <li key={row.label}>
            <span className="essay-score-quad-n">{formatScore(row.score)}</span>
            <span className="essay-score-quad-l">{row.short}</span>
            <div className="essay-bar" aria-hidden>
              <span
                className="essay-bar-fill"
                style={{ ["--p" as string]: String(Math.max(0, Math.min(1, row.score / 5))) }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="essay-score-note">{t.celpeNote}</p>
    </section>
  );
}

function CelpePanel({
  analysis,
  t,
}: {
  analysis: EssayAnalysis;
  t: ReturnType<typeof getUi>["writing"];
}) {
  const celpe = analysis.celpe;
  if (!celpe) return null;

  const blocks = [
    { title: t.scoreAdequacao, score: celpe.taskFulfillment.score, body: celpe.taskFulfillment.comment },
    { title: t.scoreCompreensao, score: celpe.sourceComprehension.score, body: celpe.sourceComprehension.comment },
    { title: t.scoreOrganizacao, score: celpe.organization.score, body: celpe.organization.comment },
    { title: t.scoreLingua, score: celpe.language.score, body: celpe.language.comment },
  ];
  const min = Math.min(...blocks.map((block) => block.score));
  const markWeak = blocks.filter((block) => block.score === min).length === 1;

  return (
    <div className="essay-sheet">
      <p className="essay-note-lead">{celpe.overallComment}</p>
      {blocks.map((block) => (
        <article
          key={block.title}
          className={`essay-crit-block${markWeak && block.score === min ? " is-weak" : ""}`}
        >
          <header className="essay-crit-head">
            <h3>{block.title}</h3>
            <span className="essay-crit-n">{formatScore(block.score)}</span>
          </header>
          {markWeak && block.score === min ? <p className="essay-crit-flag">{t.scoreWeakest}</p> : null}
          <p className="essay-note-body">{block.body}</p>
        </article>
      ))}
      {celpe.usedFacts.length || celpe.missedFacts.length || celpe.inventedFacts.length ? (
        <div className="essay-facts">
          <p className="essay-facts-kicker">{t.factsKicker}</p>
          <div className="essay-facts-grid">
            <FactList title={t.usedFacts} items={celpe.usedFacts} tone="used" />
            <FactList title={t.missedFacts} items={celpe.missedFacts} tone="missed" />
            <FactList title={t.inventedFacts} items={celpe.inventedFacts} tone="invented" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FactList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "used" | "missed" | "invented";
}) {
  if (!items.length) return null;
  return (
    <section className={`essay-fact-col is-${tone}`}>
      <header className="essay-fact-head">
        <span className="essay-fact-n">{items.length}</span>
        <h3>{title}</h3>
      </header>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function severityLabel(
  severity: CorrectionSeverity,
  t: ReturnType<typeof getUi>["writing"],
) {
  if (severity === "error") return t.severityError;
  if (severity === "minor") return t.severityMinor;
  return t.severitySuggestion;
}

function StatsPanel({
  analysis,
  t,
}: {
  analysis: EssayAnalysis;
  t: ReturnType<typeof getUi>["writing"];
}) {
  const cats = (
    [
      ["grammar", t.categories.grammar, analysis.stats.grammar],
      ["spelling", t.categories.spelling, analysis.stats.spelling],
      ["agreement", t.categories.agreement, analysis.stats.agreement],
      ["preposition", t.categories.preposition, analysis.stats.preposition],
      ["article", t.categories.article, analysis.stats.article],
      ["verb", t.categories.verb, analysis.stats.verb],
      ["vocabulary", t.categories.vocabulary, analysis.stats.vocabulary],
      ["collocation", t.categories.collocation, analysis.stats.collocation],
      ["punctuation", t.categories.punctuation, analysis.stats.punctuation],
      ["style", t.categories.style, analysis.stats.style],
    ] as const
  )
    .filter((row) => row[2] > 0)
    .sort((a, b) => b[2] - a[2] || a[1].localeCompare(b[1], "pt"));

  const peak = cats[0]?.[2] ?? 1;
  const total = analysis.stats.total;

  if (total === 0) {
    return (
      <div className="essay-sheet">
        <p className="essay-empty">{t.noIssues}</p>
      </div>
    );
  }

  return (
    <div className="essay-sheet">
      <p className="essay-stats-hero">
        <span className="essay-stats-hero-n">{total}</span>
        <span className="essay-stats-hero-l">{t.total}</span>
      </p>
      <ol className="essay-stats-rows">
        {cats.map(([key, label, count]) => (
          <li key={key} className={`essay-stats-row${count === peak ? " is-peak" : ""}`}>
            <div className="essay-stats-row-head">
              <span>{label}</span>
              <span className="essay-stats-row-n">{count}</span>
            </div>
            <div className="essay-bar" aria-hidden>
              <span
                className="essay-bar-fill is-static"
                style={{ ["--p" as string]: String(count / peak) }}
              />
            </div>
          </li>
        ))}
      </ol>
      {analysis.stats.repeatedPatterns.length ? (
        <div className="essay-stats-patterns">
          <p className="essay-facts-kicker">{t.patterns}</p>
          <ul>
            {analysis.stats.repeatedPatterns.map((pattern) => (
              <li key={pattern.key}>
                <span>{pattern.label}</span>
                <span className="essay-stats-row-n">×{pattern.count}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
