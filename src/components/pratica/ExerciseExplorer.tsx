"use client";

import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/i18n/locales";
import { getExerciciosMessages } from "@/content/pratica/exercicios-messages";
import type {
  ExerciciosData,
  ExerciseGroup,
  ExerciseItem,
  ExerciseSet,
  FillItem,
  QaItem,
  VerbIrItem,
} from "@/content/pratica/exercicios-types";

const DATA_URL = "/data/exercicios-data.json";

function norm(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

/** Correct answers for each gradable blank of an item. */
function blankAnswers(item: ExerciseItem, type: string): string[] {
  if (type === "fill") {
    const it = item as FillItem;
    const count = it.s.split("___").length - 1;
    const arr = Array.isArray(it.a) ? it.a : [it.a];
    return Array.from({ length: count }, (_, i) => arr[i] ?? arr[0]);
  }
  if (type === "verbIr") return [(item as VerbIrItem).verb];
  return [(item as QaItem).a];
}

function qaCorrect(item: QaItem, value: string): boolean {
  const core = norm(item.a.split(" ").slice(2).join(" "));
  const v = norm(value);
  return (!!core && v.includes(core)) || v === norm(item.a);
}

export function ExerciseExplorer({ locale }: { locale: Locale }) {
  const t = getExerciciosMessages(locale);
  const [data, setData] = useState<ExerciciosData | null>(null);
  const [error, setError] = useState(false);
  const [group, setGroup] = useState<ExerciseGroup>("basico");
  const [activeByGroup, setActiveByGroup] = useState<Record<ExerciseGroup, string>>({
    basico: "",
    avancado: "",
  });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [checkedAll, setCheckedAll] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let alive = true;
    fetch(DATA_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json: ExerciciosData) => {
        if (!alive) return;
        const first = (g: ExerciseGroup) => json.sets.find((s) => s.group === g)?.id ?? "";
        setActiveByGroup({ basico: first("basico"), avancado: first("avancado") });
        setData(json);
      })
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, []);

  const groupSets = useMemo(
    () => (data ? data.sets.filter((s) => s.group === group) : []),
    [data, group],
  );

  const activeSet: ExerciseSet | undefined = useMemo(() => {
    if (!data) return undefined;
    const id = activeByGroup[group];
    return data.sets.find((s) => s.id === id) ?? groupSets[0];
  }, [data, activeByGroup, group, groupSets]);

  if (error) {
    return (
      <div className="exr-root">
        <p className="exr-warn">{t.loadError}</p>
      </div>
    );
  }
  if (!data || !activeSet) {
    return (
      <div className="exr-root">
        <p className="exr-intro">{t.loading}</p>
      </div>
    );
  }

  const set = activeSet;

  function aKey(itemIdx: number, blankIdx: number) {
    return `${set.id}|${itemIdx}|${blankIdx}`;
  }
  function hKey(itemIdx: number) {
    return `${set.id}|${itemIdx}`;
  }

  const showGraded = (itemIdx: number) =>
    checkedAll[set.id] || checkedItems[hKey(itemIdx)];

  function setAnswer(key: string, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  // live score
  let totalBlanks = 0;
  let correctBlanks = 0;
  set.items.forEach((item, idx) => {
    const ans = blankAnswers(item, set.type);
    if (set.type === "qa") {
      totalBlanks += 1;
      if (qaCorrect(item as QaItem, answers[aKey(idx, 0)] ?? "")) correctBlanks += 1;
    } else {
      ans.forEach((correct, bi) => {
        totalBlanks += 1;
        if (norm(answers[aKey(idx, bi)] ?? "") === norm(correct)) correctBlanks += 1;
      });
    }
  });

  function checkItem(idx: number) {
    setCheckedItems((prev) => ({ ...prev, [hKey(idx)]: true }));
  }
  function checkAll() {
    setCheckedAll((prev) => ({ ...prev, [set.id]: true }));
  }
  function restart() {
    const prefix = `${set.id}|`;
    const strip = (o: Record<string, string | boolean>) =>
      Object.fromEntries(Object.entries(o).filter(([k]) => !k.startsWith(prefix)));
    setAnswers((p) => strip(p) as Record<string, string>);
    setRevealed((p) => strip(p) as Record<string, boolean>);
    setCheckedItems((p) => strip(p) as Record<string, boolean>);
    setCheckedAll((p) => {
      const n = { ...p };
      delete n[set.id];
      return n;
    });
  }

  function blankInput(itemIdx: number, blankIdx: number, correct: string, width?: number) {
    const key = aKey(itemIdx, blankIdx);
    const val = answers[key] ?? "";
    let cls = "exr-blank";
    if (showGraded(itemIdx) && val) {
      cls += norm(val) === norm(correct) ? " ok" : " err";
    }
    return (
      <input
        key={blankIdx}
        type="text"
        className={cls}
        style={width ? { minWidth: width } : undefined}
        placeholder="___"
        autoComplete="off"
        spellCheck={false}
        value={val}
        onChange={(e) => setAnswer(key, e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            checkItem(itemIdx);
          }
        }}
      />
    );
  }

  function renderFill(item: FillItem, idx: number) {
    const parts = item.s.split("___");
    const ans = blankAnswers(item, "fill");
    return (
      <div className="exr-sentence">
        {parts.map((part, pi) => (
          <span key={pi}>
            {part}
            {pi < parts.length - 1 ? blankInput(idx, pi, ans[pi]) : null}
          </span>
        ))}
      </div>
    );
  }

  function renderQa(item: QaItem, idx: number) {
    const key = aKey(idx, 0);
    const val = answers[key] ?? "";
    let cls = "exr-answer-input";
    if (showGraded(idx) && val) cls += qaCorrect(item, val) ? " ok" : " err";
    return (
      <>
        <div className="exr-question">{item.q}</div>
        <input
          type="text"
          className={cls}
          placeholder={t.qaPlaceholder}
          autoComplete="off"
          spellCheck={false}
          value={val}
          onChange={(e) => setAnswer(key, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              checkItem(idx);
            }
          }}
        />
      </>
    );
  }

  function renderVerbIr(item: VerbIrItem, idx: number) {
    const parts = item.q.split("___");
    return (
      <>
        <div className="exr-question">
          {parts.map((part, pi) => (
            <span key={pi}>
              {part}
              {pi < parts.length - 1 ? blankInput(idx, pi, item.verb, 70) : null}
            </span>
          ))}
        </div>
        <div className="exr-free-label">{t.yourAnswer}</div>
        <input
          type="text"
          className="exr-answer-input"
          placeholder={t.freeRespPlaceholder}
          autoComplete="off"
          value={answers[aKey(idx, 99)] ?? ""}
          onChange={(e) => setAnswer(aKey(idx, 99), e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              checkItem(idx);
            }
          }}
        />
      </>
    );
  }

  function hintContent(item: ExerciseItem): string {
    if (set.type === "fill") {
      const ans = blankAnswers(item, "fill");
      return `<strong>${t.answerLabel}</strong> ${ans.join(" / ")}`;
    }
    if (set.type === "verbIr") {
      const it = item as VerbIrItem;
      return `<strong>${t.verb}</strong> ${it.verb} &nbsp;|&nbsp; <strong>${t.modelAnswer}</strong> ${it.resp}`;
    }
    const it = item as QaItem;
    return `<strong>${t.answerLabel}</strong> ${it.a}${it.hint ? ` &nbsp;|&nbsp; <em>${it.hint}</em>` : ""}`;
  }

  function itemCorrect(item: ExerciseItem, idx: number): boolean {
    if (set.type === "qa") return qaCorrect(item as QaItem, answers[aKey(idx, 0)] ?? "");
    return blankAnswers(item, set.type).every(
      (c, bi) => norm(answers[aKey(idx, bi)] ?? "") === norm(c),
    );
  }

  const allChecked = !!checkedAll[set.id];
  const pct = totalBlanks ? Math.round((correctBlanks / totalBlanks) * 100) : 0;
  const resultClass = pct >= 85 ? "excellent" : pct >= 60 ? "good" : "needs-work";
  const resultMsg =
    pct >= 85 ? t.resultExcellent : pct >= 60 ? t.resultGood : t.resultNeedsWork;
  const resultEmoji = pct >= 85 ? "🎉" : pct >= 60 ? "👍" : "📚";

  return (
    <div className="exr-root">
      <div className="exr-controls">
        <div className="exr-group-toggle" role="tablist">
          <button
            type="button"
            className={`exr-group-btn${group === "basico" ? " is-active" : ""}`}
            onClick={() => setGroup("basico")}
          >
            {t.groupBasic}
          </button>
          <button
            type="button"
            className={`exr-group-btn${group === "avancado" ? " is-active" : ""}`}
            onClick={() => setGroup("avancado")}
          >
            {t.groupAdvanced}
          </button>
        </div>
        <label className="exr-select-label">
          <span className="exr-select-caption">{t.chooseExercise}</span>
          <select
            className="exr-select"
            value={set.id}
            onChange={(e) =>
              setActiveByGroup((prev) => ({ ...prev, [group]: e.target.value }))
            }
          >
            {groupSets.map((s, i) => (
              <option key={s.id} value={s.id}>
                {i + 1}. {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="exr-header">
        <h3 className="exr-header-title" dangerouslySetInnerHTML={{ __html: set.header }} />
        <p
          className="exr-header-ins"
          dangerouslySetInnerHTML={{ __html: set.instructions }}
        />
        {set.conjugation ? (
          <div className="exr-box exr-box-conj">
            <span className="exr-box-label">{t.conjugationLabel}</span>
            <span dangerouslySetInnerHTML={{ __html: set.conjugation }} />
          </div>
        ) : null}
        {set.example ? (
          <div className="exr-box exr-box-ex">
            <span className="exr-box-label">{t.exampleLabel}</span>
            <span>
              {"q" in set.example
                ? `${set.example.q} → ${set.example.a}`
                : `${(set.example as { s: string }).s}`}
            </span>
          </div>
        ) : null}
      </div>

      <div className="exr-items">
        {set.items.map((item, idx) => {
          const graded = showGraded(idx);
          const ok = graded ? itemCorrect(item, idx) : null;
          return (
            <article
              key={idx}
              className={`exr-card${ok === true ? " correct" : ok === false ? " incorrect" : ""}`}
            >
              <div className="exr-num">#{idx + 1}</div>
              {set.type === "fill"
                ? renderFill(item as FillItem, idx)
                : set.type === "qa"
                  ? renderQa(item as QaItem, idx)
                  : renderVerbIr(item as VerbIrItem, idx)}
              <div className="exr-actions">
                <button
                  type="button"
                  className="exr-btn-hint"
                  onClick={() =>
                    setRevealed((p) => ({ ...p, [hKey(idx)]: !p[hKey(idx)] }))
                  }
                >
                  {revealed[hKey(idx)] ? t.hideHint : t.hint}
                </button>
                <button type="button" className="exr-btn-check" onClick={() => checkItem(idx)}>
                  {t.checkItem}
                </button>
                {graded ? (
                  <span className={`exr-fb ${ok ? "ok" : "err"}`}>
                    {ok ? `✓ ${t.correct}` : `✗ ${t.review}`}
                  </span>
                ) : null}
              </div>
              {revealed[hKey(idx)] ? (
                <div
                  className="exr-hint-reveal"
                  dangerouslySetInnerHTML={{ __html: hintContent(item) }}
                />
              ) : null}
            </article>
          );
        })}
      </div>

      {allChecked ? (
        <div className={`exr-results ${resultClass}`}>
          <div className="exr-results-emoji">{resultEmoji}</div>
          <div className="exr-results-score">
            {correctBlanks} / {totalBlanks} ({pct}%)
          </div>
          <div className="exr-results-msg">{resultMsg}</div>
        </div>
      ) : null}

      <div className="exr-panel-actions">
        <div className="exr-score">
          {t.score}: <span>{correctBlanks}</span> / {totalBlanks}
        </div>
        <div className="exr-panel-buttons">
          <button type="button" className="exr-btn-secondary" onClick={restart}>
            ↺ {t.restart}
          </button>
          <button type="button" className="exr-btn-primary" onClick={checkAll}>
            {t.checkAll} →
          </button>
        </div>
      </div>
    </div>
  );
}
