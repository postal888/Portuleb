"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/i18n/locales";
import { getVerbosMessages } from "@/content/teoria/verbos-messages";
import type {
  VerbDeck,
  VerbPersonKey,
  VerbTenseCard,
  VerbosData,
} from "@/content/teoria/verbos-types";

const DATA_URL = "/data/verbos-data.json";
const LS_PERSONS = "celpe-verbos-persons-v1";
const LS_VERBS = "celpe-verbos-verbs-v1";
const LS_TENSES = "celpe-verbos-tenses-v1";

const PERSON_COL_LABEL: Record<VerbPersonKey, string> = {
  eu: "eu",
  tu: "tu",
  voce_ele_ela: "você",
  nos: "nós",
  eles_voces: "vocês",
};

type BoolMap = Record<string, boolean>;

type QuizItem = {
  verbTitle: string;
  tenseLabel: string;
  personLabel: string;
  infinitive: string;
  options: string[];
  correctIndex: number;
};

type QuizState = {
  phase: "setup" | "quiz" | "done";
  target: number;
  setupError: string;
  items: QuizItem[];
  idx: number;
  picked: number | null;
  score: number;
};

function tenseSuffix(verbId: string, cardId: string): string {
  const prefix = `${verbId}-`;
  return cardId.startsWith(prefix) ? cardId.slice(prefix.length) : cardId;
}

function stripParenQuePrefix(text: string): string {
  return text
    .replace(/\(([^)]+)\)\s*/g, (_, inner) => `${String(inner).trim()} `)
    .trim();
}

function formatFormaLine(card: VerbTenseCard, key: VerbPersonKey): string | null {
  if (!card.forms) return null;
  const raw = card.forms[key];
  if (raw == null || raw === "") return null;
  const tense = card.tenseLabel.toLowerCase();
  if (tense.includes("infinitivo pessoal")) {
    if (key === "eu") return null;
    if (key === "tu") return raw;
    return `para ${raw}`;
  }
  if (tense.includes("imperativo")) {
    if (key === "voce_ele_ela") return `${raw} você`;
    if (key === "tu") return `tu ${raw}`;
    return raw;
  }
  if (raw.includes("(") && raw.includes("que")) return stripParenQuePrefix(raw);
  return `${PERSON_COL_LABEL[key]} ${raw}`;
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function VerbConjugator({ locale }: { locale: Locale }) {
  const t = getVerbosMessages(locale);
  const [data, setData] = useState<VerbosData | null>(null);
  const [error, setError] = useState(false);
  const [subTab, setSubTab] = useState<"tables" | "quiz">("tables");

  const [personOn, setPersonOn] = useState<BoolMap>({});
  const [verbOn, setVerbOn] = useState<BoolMap>({});
  const [tenseOn, setTenseOn] = useState<BoolMap>({});

  const [quiz, setQuiz] = useState<QuizState | null>(null);
  const [qtyInput, setQtyInput] = useState("20");
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(DATA_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json: VerbosData) => {
        if (!alive) return;
        const persons: BoolMap = {};
        json.personOptions.forEach((p) => {
          persons[p.key] = p.key !== "tu";
        });
        const verbs: BoolMap = {};
        json.decks.forEach((d) => {
          verbs[d.id] = true;
        });
        const tenses: BoolMap = {};
        json.tenseOptions.forEach((x) => {
          tenses[x.key] = true;
        });
        try {
          const p = localStorage.getItem(LS_PERSONS);
          if (p) Object.assign(persons, JSON.parse(p));
          const v = localStorage.getItem(LS_VERBS);
          if (v) Object.assign(verbs, JSON.parse(v));
          const tn = localStorage.getItem(LS_TENSES);
          if (tn) Object.assign(tenses, JSON.parse(tn));
        } catch {
          /* ignore */
        }
        setPersonOn(persons);
        setVerbOn(verbs);
        setTenseOn(tenses);
        setData(json);
      })
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  function persist(key: string, value: BoolMap) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }

  function togglePerson(key: string) {
    setPersonOn((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      persist(LS_PERSONS, next);
      return next;
    });
  }
  function toggleVerb(key: string) {
    setVerbOn((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      persist(LS_VERBS, next);
      return next;
    });
  }
  function toggleTense(key: string) {
    setTenseOn((prev) => {
      const next = { ...prev, [key]: prev[key] === false ? true : !prev[key] };
      persist(LS_TENSES, next);
      return next;
    });
  }
  function setAllVerbs(value: boolean) {
    if (!data) return;
    const next: BoolMap = {};
    data.decks.forEach((d) => (next[d.id] = value));
    setVerbOn(next);
    persist(LS_VERBS, next);
  }
  function setAllTenses(value: boolean) {
    if (!data) return;
    const next: BoolMap = {};
    data.tenseOptions.forEach((x) => (next[x.key] = value));
    setTenseOn(next);
    persist(LS_TENSES, next);
  }

  const visibleDecks = useMemo(
    () => (data ? data.decks.filter((d) => verbOn[d.id]) : []),
    [data, verbOn],
  );

  function formaCell(card: VerbTenseCard): string {
    if (!data) return "—";
    if (card.forms === null) return "—";
    const lines: string[] = [];
    for (const p of data.personOptions) {
      if (!personOn[p.key]) continue;
      const line = formatFormaLine(card, p.key);
      if (line) lines.push(line);
    }
    return lines.length ? lines.join("\n") : t.warnNoPerson;
  }

  function rowMatchesTense(verb: VerbDeck, card: VerbTenseCard): boolean {
    return tenseOn[tenseSuffix(verb.id, card.id)] !== false;
  }

  function collectQuizSlots() {
    if (!data) return [];
    const slots: { verb: VerbDeck; card: VerbTenseCard; personKey: VerbPersonKey; correct: string }[] = [];
    data.decks.forEach((verb) => {
      if (!verbOn[verb.id]) return;
      verb.cards.forEach((card) => {
        if (!card.forms) return;
        data.personOptions.forEach((p) => {
          if (!personOn[p.key]) return;
          const raw = card.forms?.[p.key];
          if (raw == null || String(raw).trim() === "") return;
          slots.push({ verb, card, personKey: p.key, correct: String(raw).trim() });
        });
      });
    });
    return slots;
  }

  function buildQuizItem(
    slot: { verb: VerbDeck; card: VerbTenseCard; personKey: VerbPersonKey; correct: string },
    pool: VerbDeck[],
  ): QuizItem {
    if (!data) {
      return {
        verbTitle: slot.verb.title,
        tenseLabel: slot.card.tenseLabel,
        personLabel: slot.personKey,
        infinitive: slot.verb.infinitive,
        options: [slot.correct],
        correctIndex: 0,
      };
    }
    const correct = slot.correct;
    const dist: string[] = [];
    const sameCard: string[] = [];
    if (slot.card.forms) {
      data.personOptions.forEach((p) => {
        if (p.key === slot.personKey) return;
        const tx = slot.card.forms?.[p.key];
        if (tx) {
          const tr = String(tx).trim();
          if (tr !== correct) sameCard.push(tr);
        }
      });
    }
    shuffle(sameCard).forEach((x) => {
      if (dist.length >= 3) return;
      if (!dist.includes(x)) dist.push(x);
    });
    const allForms: string[] = [];
    const seen: Record<string, boolean> = {};
    pool.forEach((v) => {
      v.cards.forEach((c) => {
        if (!c.forms) return;
        data.personOptions.forEach((p) => {
          const tx = c.forms?.[p.key];
          if (!tx) return;
          const tr = String(tx).trim();
          if (!seen[tr]) {
            seen[tr] = true;
            allForms.push(tr);
          }
        });
      });
    });
    shuffle(allForms).forEach((x) => {
      if (dist.length >= 3) return;
      if (x !== correct && !dist.includes(x)) dist.push(x);
    });
    const indexed = [{ text: correct, ok: true }].concat(
      dist.slice(0, 3).map((x) => ({ text: x, ok: false })),
    );
    const shuffled = shuffle(indexed);
    const correctIndex = shuffled.findIndex((x) => x.ok);
    const personLabel =
      data.personOptions.find((p) => p.key === slot.personKey)?.label ?? slot.personKey;
    return {
      verbTitle: slot.verb.title,
      tenseLabel: slot.card.tenseLabel,
      personLabel,
      infinitive: slot.verb.infinitive,
      options: shuffled.map((x) => x.text),
      correctIndex,
    };
  }

  function startQuiz() {
    if (!data) return;
    const slots = collectQuizSlots();
    if (!slots.length) {
      setQuiz((q) => ({
        phase: "setup",
        target: q?.target ?? 20,
        setupError: t.quizSetupError,
        items: [],
        idx: 0,
        picked: null,
        score: 0,
      }));
      return;
    }
    let want = parseInt(qtyInput, 10);
    if (!Number.isFinite(want)) want = 20;
    const n = Math.min(Math.max(1, want), slots.length);
    const pool = data.decks.filter((d) => verbOn[d.id]);
    setQuiz({
      phase: "quiz",
      target: n,
      setupError: "",
      items: shuffle(slots)
        .slice(0, n)
        .map((s) => buildQuizItem(s, pool)),
      idx: 0,
      picked: null,
      score: 0,
    });
  }

  function pick(i: number) {
    setQuiz((q) => {
      if (!q || q.phase !== "quiz" || q.picked !== null) return q;
      const cur = q.items[q.idx];
      const score = i === cur.correctIndex ? q.score + 1 : q.score;
      advanceTimer.current = setTimeout(() => {
        setQuiz((q2) => {
          if (!q2) return q2;
          if (q2.idx + 1 >= q2.items.length) return { ...q2, picked: null, phase: "done" };
          return { ...q2, picked: null, idx: q2.idx + 1 };
        });
      }, 1000);
      return { ...q, picked: i, score };
    });
  }

  function backToSetup() {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setQuiz({
      phase: "setup",
      target: 20,
      setupError: "",
      items: [],
      idx: 0,
      picked: null,
      score: 0,
    });
  }

  function switchTab(tab: "tables" | "quiz") {
    setSubTab(tab);
    if (tab === "quiz" && !quiz) {
      setQuiz({
        phase: "setup",
        target: 20,
        setupError: "",
        items: [],
        idx: 0,
        picked: null,
        score: 0,
      });
    }
  }

  if (error) {
    return (
      <div className="verbos-root">
        <p className="verbos-warn">{t.loadError}</p>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="verbos-root">
        <p className="verbos-intro">{t.loading}</p>
      </div>
    );
  }

  const filters = (
    <div className="verbos-filters">
      <fieldset className="verbos-fieldset">
        <legend>{t.legendPersons}</legend>
        <div className="verbos-check-row">
          {data.personOptions.map((p) => (
            <label key={p.key} className="verbos-check">
              <input
                type="checkbox"
                checked={!!personOn[p.key]}
                onChange={() => togglePerson(p.key)}
              />
              <span>{p.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="verbos-fieldset">
        <legend>{t.legendVerbs}</legend>
        <div className="verbos-chip-actions">
          <button type="button" className="verbos-mini-btn" onClick={() => setAllVerbs(true)}>
            {t.all}
          </button>
          <button type="button" className="verbos-mini-btn" onClick={() => setAllVerbs(false)}>
            {t.clear}
          </button>
        </div>
        <div className="verbos-verb-grid">
          {data.decks.map((d) => (
            <label key={d.id} className="verbos-check verbos-check-verb">
              <input type="checkbox" checked={!!verbOn[d.id]} onChange={() => toggleVerb(d.id)} />
              <span>{d.title}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="verbos-fieldset">
        <legend>{t.legendTenses}</legend>
        <div className="verbos-chip-actions">
          <button type="button" className="verbos-mini-btn" onClick={() => setAllTenses(true)}>
            {t.all}
          </button>
          <button type="button" className="verbos-mini-btn" onClick={() => setAllTenses(false)}>
            {t.clear}
          </button>
        </div>
        <div className="verbos-verb-grid">
          {data.tenseOptions.map((x) => (
            <label key={x.key} className="verbos-check verbos-check-verb">
              <input
                type="checkbox"
                checked={tenseOn[x.key] !== false}
                onChange={() => toggleTense(x.key)}
              />
              <span>{x.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );

  const hasTense = data.tenseOptions.some((x) => tenseOn[x.key] !== false);

  const tablesPane = (
    <div className="verbos-view">
      <p className="verbos-intro">{t.intro}</p>
      {filters}
      {visibleDecks.length === 0 ? (
        <p className="verbos-warn">{t.warnNoVerb}</p>
      ) : !hasTense ? (
        <p className="verbos-warn">{t.warnNoTense}</p>
      ) : (
        <div className="verb-tables-stack">
          {visibleDecks.map((verb) => {
            const rows = verb.cards.filter((card) => rowMatchesTense(verb, card));
            return (
              <div key={verb.id} className="verb-table-block">
                <h4 className="verb-table-verb-title">{verb.title}</h4>
                <p className="verb-table-infinitive">{verb.infinitive}</p>
                <div className="verb-table-scroll">
                  <table className="verb-table">
                    <thead>
                      <tr>
                        <th>{t.colTense}</th>
                        <th>{t.colForm}</th>
                        <th>{t.colExample}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((card) => {
                        const tip = data.tooltips[card.id];
                        const example =
                          card.forms === null
                            ? card.infoNote || "—"
                            : card.exampleEu || "—";
                        return (
                          <tr key={card.id}>
                            <td className="verb-table-tempo">{card.tenseLabel}</td>
                            <td className="verb-table-forma">
                              <span className="verb-table-forma-inner">{formaCell(card)}</span>
                            </td>
                            <td className="verb-table-exemplo">
                              {tip ? (
                                <span className="verb-exemplo-tip-host" tabIndex={0}>
                                  <span className="verb-exemplo-tip-text">{example}</span>
                                  <span className="verb-exemplo-tip-pop" role="tooltip">
                                    <span className="verb-exemplo-tip-head">{t.enHead}</span>
                                    <span className="verb-exemplo-tip-en">{tip.en}</span>
                                    {tip.note ? (
                                      <span className="verb-exemplo-tip-note">{tip.note}</span>
                                    ) : null}
                                  </span>
                                </span>
                              ) : (
                                example
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const maxPossible = collectQuizSlots().length;

  let quizPane: React.ReactNode = null;
  if (subTab === "quiz") {
    if (quiz && quiz.phase === "done") {
      quizPane = (
        <section className="verbos-test-done">
          <h3>{t.quizDone}</h3>
          <p>
            {t.quizResult}{" "}
            <strong>
              {quiz.score} / {quiz.items.length}
            </strong>
          </p>
          <div className="verbos-done-actions">
            <button type="button" className="verbos-mini-btn" onClick={backToSetup}>
              {t.quizSetup}
            </button>
            <button type="button" className="btn-primary" onClick={startQuiz}>
              {t.quizRetry}
            </button>
          </div>
        </section>
      );
    } else if (quiz && quiz.phase === "quiz" && quiz.items.length) {
      const cur = quiz.items[quiz.idx];
      quizPane = (
        <section className="verbos-test-quiz-wrap">
          <span className="verbos-test-chip">
            {cur.verbTitle} · {cur.infinitive}
          </span>
          <p className="verbos-test-progress">
            {t.quizQuestion.replace("{i}", String(quiz.idx + 1)).replace("{n}", String(quiz.items.length))}
          </p>
          <p className="verbos-test-lead">{t.quizPrompt}</p>
          <div className="verbos-test-prompt">
            <span className="verbos-test-tense">{cur.tenseLabel}</span>
            <span className="verbos-test-person">
              {t.quizPerson} {cur.personLabel}
            </span>
          </div>
          <div className="verbos-quiz-options">
            {cur.options.map((opt, i) => {
              let cls = "verbos-quiz-opt";
              if (quiz.picked !== null) {
                if (i === cur.correctIndex) cls += " correct";
                else if (i === quiz.picked) cls += " wrong";
              }
              return (
                <button
                  key={i}
                  type="button"
                  className={cls}
                  disabled={quiz.picked !== null}
                  onClick={() => pick(i)}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          <button type="button" className="verbos-mini-btn" onClick={backToSetup}>
            {t.quizExit}
          </button>
        </section>
      );
    } else {
      quizPane = (
        <section className="verbos-test-view">
          <p className="verbos-intro">{t.quizIntro}</p>
          {quiz?.setupError ? <p className="verbos-warn">{quiz.setupError}</p> : null}
          {filters}
          <div className="verbos-test-row-num">
            <label htmlFor="verb-test-qty">
              {t.quizCount}{" "}
              <span className="verbos-muted">{t.quizCountMax.replace("{n}", String(maxPossible))}</span>
            </label>
            <input
              id="verb-test-qty"
              type="number"
              min={1}
              max={Math.max(1, maxPossible)}
              value={qtyInput}
              onChange={(e) => setQtyInput(e.target.value)}
            />
          </div>
          <p className="verbos-test-slots">
            {t.quizCombos} <strong>{maxPossible}</strong>
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={startQuiz}
            disabled={maxPossible === 0}
          >
            {t.quizStart}
          </button>
        </section>
      );
    }
  }

  return (
    <div className="verbos-root">
      <div className="verbos-subtabs">
        <button
          type="button"
          className={`verbos-tab${subTab === "tables" ? " is-active" : ""}`}
          onClick={() => switchTab("tables")}
        >
          {t.tabTables}
        </button>
        <button
          type="button"
          className={`verbos-tab${subTab === "quiz" ? " is-active" : ""}`}
          onClick={() => switchTab("quiz")}
        >
          {t.tabQuiz}
        </button>
      </div>
      {subTab === "tables" ? tablesPane : quizPane}
    </div>
  );
}
