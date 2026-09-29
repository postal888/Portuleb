import { z } from "zod";
import { EVENT_ID_RE } from "./events";

const uuid = z.string().regex(EVENT_ID_RE);
const durationMs = z.number().int().min(0).max(24 * 60 * 60 * 1_000);

/** Observability fields the writer form sends alongside the essay itself. */
export const writerCheckMetaSchema = z.object({
  locale: z.enum(["pt-br", "en", "ru"]).default("pt-br"),
  sessionId: uuid.nullish(),
  timing: z
    .object({
      activeMs: durationMs,
      elapsedMs: durationMs,
    })
    .nullish(),
});

export type WriterCheckMeta = {
  locale: "pt-br" | "en" | "ru";
  sessionId: string | null;
  timing: { activeMs: number; elapsedMs: number } | null;
};

export function parseWriterCheckMeta(body: unknown): WriterCheckMeta {
  const parsed = writerCheckMetaSchema.parse(body ?? {});
  return {
    locale: parsed.locale,
    sessionId: parsed.sessionId ?? null,
    timing: parsed.timing ?? null,
  };
}
