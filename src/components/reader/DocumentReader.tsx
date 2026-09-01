"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/locales";
import { getReaderMessages } from "@/content/reader/reader-messages";

type Status = "idle" | "parsing" | "ready" | "error";

const ACCEPT = ".pdf,.docx,.txt,.md,application/pdf,text/plain";
const MIN_FONT = 14;
const MAX_FONT = 30;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function countWords(text: string): number {
  const m = text.trim().match(/\S+/g);
  return m ? m.length : 0;
}

function paragraphsToHtml(paragraphs: string[]): string {
  return paragraphs
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

async function parsePdf(file: File): Promise<{ html: string; words: number }> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  const data = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data });
  const doc = await loadingTask.promise;
  const paragraphs: string[] = [];
  let plain = "";

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const content = await page.getTextContent();
    const lines: string[] = [];
    let line = "";
    for (const item of content.items) {
      if (typeof (item as { str?: string }).str === "string") {
        const it = item as { str: string; hasEOL?: boolean };
        line += it.str;
        if (it.hasEOL) {
          lines.push(line);
          line = "";
        }
      }
    }
    if (line) lines.push(line);

    let buffer = "";
    for (const raw of lines) {
      const l = raw.trim();
      if (!l) {
        if (buffer) {
          paragraphs.push(buffer);
          buffer = "";
        }
      } else {
        buffer = buffer ? `${buffer} ${l}` : l;
      }
    }
    if (buffer) paragraphs.push(buffer);
    plain += lines.join(" ") + " ";
  }

  await loadingTask.destroy();
  return { html: paragraphsToHtml(paragraphs), words: countWords(plain) };
}

async function parseDocx(file: File): Promise<{ html: string; words: number }> {
  const mod = (await import("mammoth")) as unknown as {
    default?: { convertToHtml: (o: { arrayBuffer: ArrayBuffer }) => Promise<{ value: string }> };
    convertToHtml?: (o: { arrayBuffer: ArrayBuffer }) => Promise<{ value: string }>;
  };
  const mammoth = mod.default ?? mod;
  if (!mammoth.convertToHtml) throw new Error("mammoth unavailable");
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.convertToHtml({ arrayBuffer });
  const plain = result.value.replace(/<[^>]+>/g, " ");
  return { html: result.value, words: countWords(plain) };
}

async function parseText(file: File): Promise<{ html: string; words: number }> {
  const text = await file.text();
  const paragraphs = text.split(/\n\s*\n/);
  return { html: paragraphsToHtml(paragraphs), words: countWords(text) };
}

export function DocumentReader({ locale }: { locale: Locale }) {
  const t = getReaderMessages(locale);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fileName, setFileName] = useState("");
  const [html, setHtml] = useState("");
  const [words, setWords] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(4);
  const [fontSize, setFontSize] = useState(19);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTs = useRef<number | null>(null);
  const remainder = useRef(0);

  const handleFile = useCallback(
    async (file: File) => {
      setPlaying(false);
      setStatus("parsing");
      setErrorMsg("");
      setFileName(file.name);
      const name = file.name.toLowerCase();
      try {
        let res: { html: string; words: number };
        if (name.endsWith(".pdf") || file.type === "application/pdf") {
          res = await parsePdf(file);
        } else if (name.endsWith(".docx")) {
          res = await parseDocx(file);
        } else if (name.endsWith(".txt") || name.endsWith(".md") || file.type.startsWith("text/")) {
          res = await parseText(file);
        } else {
          setStatus("error");
          setErrorMsg(t.errorType);
          return;
        }
        if (!res.html.trim()) {
          setStatus("error");
          setErrorMsg(t.empty);
          return;
        }
        setHtml(res.html);
        setWords(res.words);
        setStatus("ready");
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
      } catch {
        setStatus("error");
        setErrorMsg(t.errorGeneric);
      }
    },
    [t.errorGeneric, t.errorType, t.empty],
  );

  useEffect(() => {
    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTs.current = null;
      return;
    }
    const step = (ts: number) => {
      if (lastTs.current == null) lastTs.current = ts;
      const dt = (ts - lastTs.current) / 1000;
      lastTs.current = ts;
      const el = scrollRef.current;
      if (el) {
        const pxPerSec = speed * speed * 6 + 12;
        const advance = pxPerSec * dt + remainder.current;
        const whole = Math.floor(advance);
        remainder.current = advance - whole;
        el.scrollTop += whole;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 1) {
          setPlaying(false);
          return;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTs.current = null;
    };
  }, [playing, speed]);

  function reset() {
    setPlaying(false);
    setStatus("idle");
    setHtml("");
    setWords(0);
    setFileName("");
    setErrorMsg("");
    if (inputRef.current) inputRef.current.value = "";
  }

  function toTop() {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }

  // ---- Upload view ----
  if (status === "idle" || status === "parsing" || status === "error") {
    return (
      <div className="reader-root">
        <div
          className={`reader-drop${dragOver ? " is-drag" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const f = e.dataTransfer.files?.[0];
            if (f) handleFile(f);
          }}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            className="reader-file-input"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          <div className="reader-drop-icon" aria-hidden>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
              <path d="M12 11v6" />
              <path d="m9.5 13.5 2.5-2.5 2.5 2.5" />
            </svg>
          </div>
          {status === "parsing" ? (
            <p className="reader-drop-title">{t.parsing}</p>
          ) : (
            <>
              <p className="reader-drop-title">{t.dropTitle}</p>
              <p className="reader-drop-hint">{t.dropHint}</p>
              <span className="reader-choose-btn">{t.chooseFile}</span>
            </>
          )}
          {status === "error" ? <p className="reader-error">{errorMsg}</p> : null}
        </div>
        <p className="reader-privacy">{t.privacy}</p>
      </div>
    );
  }

  // ---- Reader view ----
  return (
    <div className="reader-root">
      <div className="reader-toolbar">
        <button
          type="button"
          className={`reader-play${playing ? " is-playing" : ""}`}
          onClick={() => setPlaying((p) => !p)}
          aria-pressed={playing}
        >
          {playing ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
              {t.pause}
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
              {t.play}
            </>
          )}
        </button>

        <label className="reader-control">
          <span className="reader-control-label">{t.speed}</span>
          <input
            type="range"
            min={1}
            max={10}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="reader-range"
            aria-label={t.speed}
          />
          <span className="reader-control-value">{speed}</span>
        </label>

        <div className="reader-control reader-font">
          <span className="reader-control-label">{t.fontSize}</span>
          <button
            type="button"
            className="reader-step-btn"
            onClick={() => setFontSize((f) => Math.max(MIN_FONT, f - 1))}
            aria-label={t.decrease}
          >
            A−
          </button>
          <button
            type="button"
            className="reader-step-btn"
            onClick={() => setFontSize((f) => Math.min(MAX_FONT, f + 1))}
            aria-label={t.increase}
          >
            A+
          </button>
        </div>

        <div className="reader-toolbar-right">
          <button type="button" className="reader-mini-btn" onClick={toTop}>
            ↑ {t.toTop}
          </button>
          <button type="button" className="reader-mini-btn" onClick={reset}>
            {t.newFile}
          </button>
        </div>
      </div>

      <div className="reader-meta">
        <span className="reader-filename" title={fileName}>
          {fileName}
        </span>
        <span className="reader-wordcount">
          {words.toLocaleString(
            locale === "en" ? "en-US" : locale === "ru" ? "ru-RU" : "pt-BR",
          )}{" "}
          {t.words}
        </span>
      </div>

      <div className="reader-scroll" ref={scrollRef} onMouseDown={() => setPlaying(false)}>
        <article
          className="reader-doc"
          style={{ fontSize: `${fontSize}px` }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
