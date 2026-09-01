"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type {
  ReadingSubtitleCue,
  ReadingSubtitleWord,
} from "@/content/practice/reading/types";
import {
  lookupLocalGloss,
  normalizeGlossKey,
  wordTokenId,
  type MarkedWord,
  type WordGloss,
} from "@/content/practice/reading/500-anos-historia-brasil-glossary";
import type { GlossLang } from "@/lib/practice/reading-expression-lookup";

type Props = {
  youtubeVideoId: string;
  subtitles: ReadingSubtitleCue[];
  subtitlesLabel?: string;
  words?: ReadingSubtitleWord[];
};

type YtPlayer = {
  destroy: () => void;
  getCurrentTime: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement | string,
        opts: {
          videoId: string;
          width?: string | number;
          height?: string | number;
          playerVars?: Record<string, string | number>;
          events?: { onReady?: () => void };
        },
      ) => YtPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function formatCueTime(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function findCueIndex(cues: ReadingSubtitleCue[], timeMs: number): number {
  let lo = 0;
  let hi = cues.length - 1;
  let best = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (timeMs < cues[mid].startMs) hi = mid - 1;
    else {
      best = mid;
      lo = mid + 1;
    }
  }
  return best;
}

function findWordIndex(words: ReadingSubtitleWord[], timeMs: number): number {
  let lo = 0;
  let hi = words.length - 1;
  let best = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (timeMs < words[mid].startMs) hi = mid - 1;
    else {
      best = mid;
      lo = mid + 1;
    }
  }
  return best;
}

let ytApiPromise: Promise<void> | null = null;

function loadYoutubeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    if (!document.querySelector("script[data-yt-iframe-api]")) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.dataset.ytIframeApi = "1";
      document.body.appendChild(script);
    }
    const check = window.setInterval(() => {
      if (window.YT?.Player) {
        window.clearInterval(check);
        resolve();
      }
    }, 50);
  });
  return ytApiPromise;
}

function glossForLang(gloss: WordGloss | undefined, word: string, lang: GlossLang): string {
  if (!gloss) return word;
  if (lang === "ru") return gloss.ru || gloss.en || word;
  return gloss.en || word;
}

function formatMarkedTime(ms?: number): string {
  if (ms == null || !Number.isFinite(ms)) return "";
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}

function csvEscape(value: string): string {
  const normalized = value.replace(/\r?\n/g, " ").trim();
  if (/[",;]/.test(normalized)) {
    return `"${normalized.replace(/"/g, '""')}"`;
  }
  return normalized;
}

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function exportMarkedCsv(rows: MarkedWord[]) {
  const header = ["Português", "English", "Русский", "Tempo"];
  const lines = [
    header.join(";"),
    ...rows.map((row) =>
      [row.portuguese, row.english, row.russian, formatMarkedTime(row.startMs)]
        .map(csvEscape)
        .join(";"),
    ),
  ];
  // BOM so Excel opens UTF-8 correctly
  const content = `\uFEFF${lines.join("\r\n")}`;
  downloadBlob(
    "palavras-marcadas.csv",
    new Blob([content], { type: "text/csv;charset=utf-8" }),
  );
}

function exportMarkedWord(rows: MarkedWord[]) {
  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const bodyRows = rows
    .map(
      (row) => `<tr>
  <td>${escapeHtml(row.portuguese)}</td>
  <td>${escapeHtml(row.english)}</td>
  <td>${escapeHtml(row.russian)}</td>
  <td>${escapeHtml(formatMarkedTime(row.startMs))}</td>
</tr>`,
    )
    .join("\n");

  const html = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8" />
<title>Palavras marcadas</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View></w:WordDocument></xml><![endif]-->
<style>
  body { font-family: Calibri, Arial, sans-serif; font-size: 12pt; }
  h1 { font-size: 16pt; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #333; padding: 6px 8px; text-align: left; vertical-align: top; }
  th { background: #e8f0ea; }
</style>
</head>
<body>
  <h1>Palavras marcadas</h1>
  <table>
    <thead>
      <tr>
        <th>Português</th>
        <th>English</th>
        <th>Русский</th>
        <th>Tempo</th>
      </tr>
    </thead>
    <tbody>
      ${bodyRows}
    </tbody>
  </table>
</body>
</html>`;

  downloadBlob(
    "palavras-marcadas.doc",
    new Blob(["\uFEFF", html], { type: "application/msword;charset=utf-8" }),
  );
}

export function ReadingVideoWithSubtitles({
  youtubeVideoId,
  subtitles,
  subtitlesLabel = "Legendas",
  words = [],
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YtPlayer | null>(null);
  const activeRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [timeMs, setTimeMs] = useState(0);
  const [ready, setReady] = useState(false);
  const [listOpen, setListOpen] = useState(true);
  const [glossLang, setGlossLang] = useState<GlossLang>("en");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [hoverTip, setHoverTip] = useState<string>("…");
  const [marked, setMarked] = useState<MarkedWord[]>([]);
  const [activeMarkedId, setActiveMarkedId] = useState<string | null>(null);

  const cues = useMemo(() => subtitles, [subtitles]);
  const timedWords = useMemo(() => words, [words]);
  const hasWords = timedWords.length > 0;

  const wordsByCue = useMemo(() => {
    if (!hasWords || !cues.length) return [] as ReadingSubtitleWord[][];
    const buckets: ReadingSubtitleWord[][] = cues.map(() => []);
    let cueIdx = 0;
    for (const w of timedWords) {
      while (cueIdx + 1 < cues.length && w.startMs >= cues[cueIdx + 1].startMs) {
        cueIdx += 1;
      }
      if (w.startMs >= cues[cueIdx].startMs) buckets[cueIdx].push(w);
    }
    return buckets;
  }, [hasWords, timedWords, cues]);

  useEffect(() => {
    let cancelled = false;
    let poll: number | undefined;

    async function setup() {
      await loadYoutubeApi();
      if (cancelled || !hostRef.current || !window.YT) return;
      playerRef.current?.destroy();
      playerRef.current = new window.YT.Player(hostRef.current, {
        videoId: youtubeVideoId,
        width: "100%",
        height: "100%",
        playerVars: {
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            if (!cancelled) setReady(true);
          },
        },
      });

      poll = window.setInterval(() => {
        const player = playerRef.current;
        if (!player?.getCurrentTime) return;
        try {
          const tMs = player.getCurrentTime() * 1000;
          setTimeMs(tMs);
          const cIdx = findCueIndex(cues, tMs);
          if (cIdx >= 0) setActiveIndex((prev) => (prev === cIdx ? prev : cIdx));
          if (timedWords.length) {
            const wIdx = findWordIndex(timedWords, tMs);
            if (wIdx >= 0) setWordIndex((prev) => (prev === wIdx ? prev : wIdx));
          }
        } catch {
          // ignore
        }
      }, 80);
    }

    void setup();
    return () => {
      cancelled = true;
      if (poll) window.clearInterval(poll);
      try {
        playerRef.current?.destroy();
      } catch {
        // ignore
      }
      playerRef.current = null;
    };
  }, [youtubeVideoId, cues, timedWords]);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeIndex]);

  function onWordEnter(raw: string, id: string) {
    setHoverId(id);
    const gloss = lookupLocalGloss(raw);
    setHoverTip(glossForLang(gloss, raw, glossLang));
  }

  function toggleMark(word: ReadingSubtitleWord, globalIndex: number) {
    const id = wordTokenId(word, globalIndex);
    const key = normalizeGlossKey(word.text);
    setMarked((prev) => {
      if (prev.some((m) => m.id === id || normalizeGlossKey(m.portuguese) === key)) {
        return prev.filter((m) => m.id !== id && normalizeGlossKey(m.portuguese) !== key);
      }
      const gloss = lookupLocalGloss(word.text);
      const entry: MarkedWord = {
        id,
        portuguese: word.text,
        english: gloss?.en ?? word.text,
        russian: gloss?.ru ?? gloss?.en ?? word.text,
        startMs: word.startMs,
      };
      return [entry, ...prev];
    });
    setActiveMarkedId(id);
  }

  function seekToCue(index: number) {
    const cue = cues[index];
    if (!cue) return;
    setActiveIndex(index);
    playerRef.current?.seekTo(cue.startMs / 1000, true);
  }

  function seekToMarked(item: MarkedWord) {
    setActiveMarkedId(item.id);
    if (item.startMs != null) {
      playerRef.current?.seekTo(item.startMs / 1000, true);
    }
  }

  return (
    <div className="reading-lesson__media">
      <div className="reading-lesson__video reading-lesson__video--top">
        <div className="reading-lesson__yt-host" ref={hostRef} />
        {!ready ? <div className="reading-lesson__yt-loading">Carregando vídeo…</div> : null}
      </div>

      <div className="reading-lesson__layout reading-lesson__layout--video">
        <aside className="reading-lesson__sidebar reading-lesson__sidebar--marked" aria-label="Palavras marcadas">
          <div className="reading-expr-sidebar">
            <header className="reading-expr-sidebar__head">
              <span className="reading-expr-sidebar__icon" aria-hidden>
                📖
              </span>
              <div className="reading-expr-sidebar__head-text">
                <h2 className="reading-expr-sidebar__title">Palavras marcadas</h2>
                <div className="reading-expr-sidebar__lang" role="group" aria-label="Idioma da tradução">
                  <button
                    type="button"
                    className={`reading-expr-sidebar__lang-btn${glossLang === "en" ? " is-active" : ""}`}
                    onClick={() => setGlossLang("en")}
                    aria-pressed={glossLang === "en"}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    className={`reading-expr-sidebar__lang-btn${glossLang === "ru" ? " is-active" : ""}`}
                    onClick={() => setGlossLang("ru")}
                    aria-pressed={glossLang === "ru"}
                  >
                    RU
                  </button>
                </div>
              </div>
            </header>

            {marked.length === 0 ? (
              <p className="reading-subs-sidebar__empty">
                Clique em uma palavra nas legendas para marcá-la aqui.
              </p>
            ) : (
              <>
                <div className="reading-subs-export" role="group" aria-label="Baixar palavras marcadas">
                  <button
                    type="button"
                    className="reading-subs-export__btn"
                    onClick={() => exportMarkedCsv(marked)}
                  >
                    Excel
                  </button>
                  <button
                    type="button"
                    className="reading-subs-export__btn"
                    onClick={() => exportMarkedWord(marked)}
                  >
                    Word
                  </button>
                </div>
                <ul className="reading-expr-sidebar__list">
                  {marked.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={`reading-expr-sidebar__item${activeMarkedId === item.id ? " reading-expr-sidebar__item--active" : ""}`}
                        onClick={() => seekToMarked(item)}
                        onMouseEnter={() => setActiveMarkedId(item.id)}
                      >
                        <span className="reading-expr-sidebar__terms">
                          <strong>{item.portuguese}</strong>
                          <em>{glossLang === "ru" ? item.russian : item.english}</em>
                        </span>
                        <span
                          className="reading-expr-sidebar__play"
                          aria-label="Remover"
                          title="Remover"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMarked((prev) => prev.filter((m) => m.id !== item.id));
                          }}
                        >
                          ×
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </aside>

        <div className="reading-lesson__main">
          <div className={`reading-subs${listOpen ? "" : " is-collapsed"}`} aria-label={subtitlesLabel}>
            <header className="reading-subs__head">
              <button
                type="button"
                className="reading-subs__toggle"
                aria-expanded={listOpen}
                onClick={() => setListOpen((v) => !v)}
              >
                <h2 className="reading-subs__title">{subtitlesLabel}</h2>
                <span className="reading-subs__toggle-hint">
                  {listOpen ? "Recolher" : "Expandir"} {listOpen ? "▾" : "▸"}
                </span>
              </button>
              {listOpen ? (
                <p className="reading-subs__meta">
                  Clique para marcar · passe o mouse para traduzir palavra · tradução da linha EN/RU ·{" "}
                  {cues.length} trechos
                </p>
              ) : null}
            </header>

            {listOpen ? (
              <div className="reading-subs__list" role="list">
                {cues.map((cue, index) => {
                  const cueState =
                    index === activeIndex
                      ? "is-active"
                      : index < activeIndex
                        ? "is-past"
                        : "is-future";
                  const cueWords = wordsByCue[index] ?? [];

                  return (
                    <div
                      key={`${cue.startMs}-${index}`}
                      role="listitem"
                      ref={index === activeIndex ? activeRef : null}
                      className={`reading-subs__cue ${cueState}`}
                    >
                      <button
                        type="button"
                        className="reading-subs__time-btn"
                        onClick={() => seekToCue(index)}
                        title="Ir para este trecho"
                      >
                        {formatCueTime(cue.startMs)}
                      </button>
                      <p className="reading-subs__text">
                        {hasWords && cueWords.length > 0
                          ? cueWords.map((w, wi) => {
                              const gIdx =
                                wordsByCue
                                  .slice(0, index)
                                  .reduce((sum, arr) => sum + arr.length, 0) + wi;
                              const id = wordTokenId(w, gIdx);
                              const current = w.startMs <= timeMs && timeMs < w.endMs;
                              const spoken = w.startMs <= timeMs;
                              const isMarked = marked.some(
                                (m) =>
                                  m.id === id ||
                                  normalizeGlossKey(m.portuguese) === normalizeGlossKey(w.text),
                              );
                              return (
                                <span
                                  key={id}
                                  className={`reading-subs__word${current ? " is-current" : ""}${spoken ? " is-past" : ""}${isMarked ? " is-marked" : ""}`}
                                  tabIndex={0}
                                  onMouseEnter={() => onWordEnter(w.text, id)}
                                  onMouseLeave={() => setHoverId(null)}
                                  onFocus={() => onWordEnter(w.text, id)}
                                  onBlur={() => setHoverId(null)}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleMark(w, gIdx);
                                  }}
                                >
                                  {w.text}
                                  {hoverId === id ? (
                                    <span className="reading-term__tip" role="tooltip">
                                      {hoverTip}
                                    </span>
                                  ) : null}{" "}
                                </span>
                              );
                            })
                          : cue.text}
                      </p>
                      {(glossLang === "ru" ? cue.ru || cue.en : cue.en || cue.ru) ? (
                        <p
                          className="reading-subs__translation"
                          lang={glossLang === "ru" ? "ru" : "en"}
                        >
                          {glossLang === "ru" ? cue.ru || cue.en : cue.en || cue.ru}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
