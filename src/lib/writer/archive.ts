import fs from "node:fs";
import path from "node:path";
import { EVENT_ID_RE } from "./events";

const DEFAULT_ROOT = path.join("data", "writing");

export type WriterArchivePayload = {
  id: string;
  savedAt: string;
  locale: string;
  taskId: string | null;
  wordCount: number;
  text: string;
  analysis: unknown;
  meta: unknown;
  timing: { activeMs: number; elapsedMs: number } | null;
};

/**
 * SQLite is the source of truth; these files are the readable backup copy.
 * Importers load this module lazily so the fs calls stay out of the build's file trace.
 */
export function writerArchiveRoot(): string {
  // Read per call, not at import: tests point the archive at a temp directory.
  const configured = process.env.WRITER_ARCHIVE_DIR?.trim();
  return path.resolve(process.cwd(), configured || DEFAULT_ROOT);
}

function assertSafeId(id: string): void {
  if (!EVENT_ID_RE.test(id)) throw new Error("archive: id de submissão inválido");
}

/** Never derive a filename from user input: only the submission UUID reaches the path. */
function resolveInsideRoot(relative: string): string {
  const root = writerArchiveRoot();
  const target = path.resolve(root, relative);
  if (target !== root && !target.startsWith(root + path.sep)) {
    throw new Error("archive: caminho fora do diretório de arquivo");
  }
  return target;
}

export function archiveRelativePath(id: string, savedAt: string): string {
  assertSafeId(id);
  const day = /^\d{4}-\d{2}-\d{2}/.test(savedAt) ? savedAt.slice(0, 10) : "unknown";
  return path.posix.join(day, `${id}.json`);
}

/** Atomic: a half-written file is worse than no file, so write to .tmp then rename. */
export function saveWriterArchive(payload: WriterArchivePayload): string {
  const relative = archiveRelativePath(payload.id, payload.savedAt);
  const target = resolveInsideRoot(relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });

  const temp = `${target}.${process.pid}.tmp`;
  fs.writeFileSync(temp, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  try {
    fs.renameSync(temp, target);
  } catch (error) {
    fs.rmSync(temp, { force: true });
    throw error;
  }
  return relative;
}

/** An erasure request has to reach the file copy as well, or the essay text survives the database. */
export function deleteWriterArchive(relative: string | null | undefined): boolean {
  if (!relative) return false;
  // A path outside the archive root throws instead of returning false: that is an attack, not a miss.
  const target = resolveInsideRoot(relative);
  try {
    fs.rmSync(target, { force: true });
    return true;
  } catch {
    return false;
  }
}
