import fs from "fs";
import path from "path";
import type { CheckEssayMeta, EssayAnalysis } from "./types";

const ROOT = path.join(process.cwd(), "data", "writing");

function safePart(value: string, max = 48) {
  return (
    value
      .normalize("NFKD")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, max) || "anon"
  );
}

export function saveWritingSubmission(input: {
  email: string;
  taskId?: string;
  text: string;
  analysis: EssayAnalysis;
  meta: CheckEssayMeta;
}): string {
  const email = input.email.trim().toLowerCase();
  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  const stamp = now.toISOString().replace(/[:.]/g, "-");
  const dir = path.join(ROOT, day);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${stamp}-${safePart(email)}.json`);
  const payload = {
    savedAt: now.toISOString(),
    email,
    taskId: input.taskId ?? input.analysis.taskId ?? null,
    text: input.text,
    analysis: input.analysis,
    meta: input.meta,
  };
  fs.writeFileSync(file, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return path.relative(ROOT, file).replace(/\\/g, "/");
}

export type WritingArchiveSummary = {
  file: string;
  savedAt: string;
  email: string;
  taskId: string | null;
  level: string | null;
  words: number;
};

export function listWritingArchives(limit = 100): WritingArchiveSummary[] {
  if (!fs.existsSync(ROOT)) return [];
  const days = fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .reverse();

  const out: WritingArchiveSummary[] = [];
  for (const day of days) {
    const dir = path.join(ROOT, day);
    const files = fs
      .readdirSync(dir)
      .filter((name) => name.endsWith(".json"))
      .sort()
      .reverse();
    for (const name of files) {
      if (out.length >= limit) return out;
      try {
        const raw = JSON.parse(fs.readFileSync(path.join(dir, name), "utf8")) as {
          savedAt?: string;
          email?: string;
          taskId?: string | null;
          text?: string;
          analysis?: { celpe?: { estimatedLevel?: string } };
        };
        out.push({
          file: `${day}/${name}`,
          savedAt: raw.savedAt ?? "",
          email: raw.email ?? "",
          taskId: raw.taskId ?? null,
          level: raw.analysis?.celpe?.estimatedLevel ?? null,
          words: raw.text?.trim() ? raw.text.trim().split(/\s+/).length : 0,
        });
      } catch {
        // skip a broken file and keep listing
      }
    }
  }
  return out;
}
