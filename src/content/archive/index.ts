import type { Locale } from "@/i18n/locales";
import { session2023_1 } from "./2023-1";
import { session2023_2 } from "./2023-2";
import { session2024_1 } from "./2024-1";
import { session2024_2 } from "./2024-2";
import { session2025_1 } from "./2025-1";
import { session2025_2 } from "./2025-2";
import { session2026_1 } from "./2026-1";
import { session2025_1_en } from "./en/2025-1";
import { session2026_1_en } from "./en/2026-1";
import { session2025_1_ru } from "./ru/2025-1";
import { session2026_1_ru } from "./ru/2026-1";
import { localizeArchiveSessionForEn } from "./localize-en";
import { localizeArchiveSessionForRu } from "./localize-ru";
import type { ArchiveSession } from "./types";

export type { ArchiveSession } from "./types";

const PT: Record<string, ArchiveSession> = {
  "2023-1": session2023_1,
  "2023-2": session2023_2,
  "2024-1": session2024_1,
  "2024-2": session2024_2,
  "2025-1": session2025_1,
  "2025-2": session2025_2,
  "2026-1": session2026_1,
};

const EN: Record<string, ArchiveSession> = {
  "2025-1": session2025_1_en,
  "2026-1": session2026_1_en,
};

const RU: Record<string, ArchiveSession> = {
  "2025-1": session2025_1_ru,
  "2026-1": session2026_1_ru,
};

export const archiveSlugs = [
  "2026-1",
  "2025-2",
  "2025-1",
  "2024-2",
  "2024-1",
  "2023-2",
  "2023-1",
] as const;

export function getArchiveSession(slug: string, locale: Locale): ArchiveSession | undefined {
  if (locale === "en") {
    const session = EN[slug] ?? PT[slug];
    return session ? localizeArchiveSessionForEn(session) : undefined;
  }
  if (locale === "ru") {
    const session = RU[slug] ?? PT[slug];
    return session ? localizeArchiveSessionForRu(session) : undefined;
  }
  return PT[slug];
}

export function listArchiveSessions(locale: Locale): ArchiveSession[] {
  return archiveSlugs.map((slug) => getArchiveSession(slug, locale)!).filter(Boolean);
}
