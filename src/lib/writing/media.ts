import fs from "fs";
import path from "path";
import { mimeForPath } from "@/lib/materials/registry";

const EDITION = /^\d{4}-\d+(?:\.\d+)?$/;
const FILE_NAME = /^tarefa[12]-(?:video|audio)\.(?:mp4|m4v|m4a|mp3)$/;

function mediaRoots(): string[] {
  const roots = [
    process.env.WRITING_MEDIA_ROOT,
    path.join(process.cwd(), "Materials", "escrita"),
    "E:\\EDU\\CELPE\\Analise\\materiais\\provas\\media",
  ];
  return roots.filter((root): root is string => Boolean(root));
}

export function resolveWritingMedia(edition: string, fileName: string): string | null {
  if (!EDITION.test(edition) || !FILE_NAME.test(fileName)) return null;
  for (const root of mediaRoots()) {
    const base = path.resolve(root);
    const absolute = path.resolve(base, edition, fileName);
    if (!absolute.startsWith(base + path.sep)) return null;
    if (fs.existsSync(absolute)) return absolute;
  }
  return null;
}

export function writingMediaMime(filePath: string): string {
  return mimeForPath(filePath);
}
