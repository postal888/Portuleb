import { z } from "zod";
import { WRITING_TASK_IDS } from "@/content/writing/tasks";
import { WRITER_EVENT_NAMES } from "./types";

export const EVENT_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const MAX_INGEST_BYTES = 4_096;
export const CLIENT_CLOCK_SLACK_MS = 5 * 60 * 1_000;
export const CLIENT_CLOCK_MAX_AGE_MS = 24 * 60 * 60 * 1_000;

const shortText = (max = 48) => z.string().trim().max(max);
const nonNegativeInt = z.number().int().min(0).max(1_000_000_000);
const uuid = z.string().regex(EVENT_ID_RE);

export const writerContextSchema = z.object({
  locale: z.enum(["pt-br", "en", "ru"]),
  path: shortText(200),
  taskId: z.enum(WRITING_TASK_IDS).optional(),
  referrer: shortText(200).optional(),
  utmSource: shortText(60).optional(),
  utmMedium: shortText(60).optional(),
  utmCampaign: shortText(80).optional(),
});

export const writerEventSchema = z.object({
  eventId: uuid,
  sessionId: uuid,
  visitorId: uuid,
  event: z.enum(WRITER_EVENT_NAMES),
  occurredAt: z.string().datetime({ offset: true }),
  taskId: z.enum(WRITING_TASK_IDS).optional(),
  wordCount: nonNegativeInt.optional(),
  maxWordCount: nonNegativeInt.optional(),
  activeMs: nonNegativeInt.optional(),
  elapsedMs: nonNegativeInt.optional(),
  durationMs: nonNegativeInt.optional(),
  resultStatus: shortText(32).optional(),
  errorCategory: shortText(32).optional(),
  deliveryStatus: shortText(32).optional(),
  reason: shortText(48).optional(),
});

export const writerIngestSchema = z.object({
  context: writerContextSchema,
  events: z.array(writerEventSchema).min(1).max(40),
});

export type WriterIngestPayload = z.infer<typeof writerIngestSchema>;
export type WriterEventInput = z.infer<typeof writerEventSchema>;
export type WriterContext = z.infer<typeof writerContextSchema>;

const METADATA_KEYS = [
  "wordCount",
  "maxWordCount",
  "activeMs",
  "elapsedMs",
  "durationMs",
  "resultStatus",
  "errorCategory",
  "deliveryStatus",
  "reason",
] as const;

/** Only whitelisted scalars reach writer_events.metadata_json. */
export function eventMetadata(event: WriterEventInput): Record<string, string | number> {
  const out: Record<string, string | number> = {};
  for (const key of METADATA_KEYS) {
    const value = event[key];
    if (typeof value === "number" || typeof value === "string") out[key] = value;
  }
  return out;
}

export function safeParseIngest(
  body: unknown,
): { ok: true; data: WriterIngestPayload } | { ok: false; error: string } {
  const parsed = writerIngestSchema.safeParse(body);
  if (parsed.success) return { ok: true, data: parsed.data };
  return { ok: false, error: parsed.error.issues[0]?.message || "Pedido inválido." };
}

/** Client clocks are not trusted: outside a sane window we fall back to server time. */
export function normalizeOccurredAt(value: string, serverNowMs: number): string {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return new Date(serverNowMs).toISOString();
  if (parsed > serverNowMs + CLIENT_CLOCK_SLACK_MS) return new Date(serverNowMs).toISOString();
  if (parsed < serverNowMs - CLIENT_CLOCK_MAX_AGE_MS) return new Date(serverNowMs).toISOString();
  return new Date(parsed).toISOString();
}

const WORD_BUCKETS: Array<[number, string]> = [
  [1, "0"],
  [40, "1-39"],
  [120, "40-119"],
  [250, "120-249"],
  [450, "250-449"],
  [601, "450-600"],
];

export function wordCountBucket(words?: number | null): string {
  const value = words ?? 0;
  for (const [upper, label] of WORD_BUCKETS) {
    if (value < upper) return label;
  }
  return "600+";
}

const RESULT_STATUSES = ["succeeded", "failed"] as const;
const ERROR_CATEGORIES = ["validation", "rate_limit", "provider", "storage", "email", "network", "unknown"] as const;
const DELIVERY_STATUSES = ["sent", "failed", "skipped_unconfigured", "pending"] as const;

function oneOf<T extends string>(value: string | undefined, allowed: readonly T[]): T | undefined {
  return allowed.includes(value as T) ? (value as T) : undefined;
}

/**
 * GA4 payload: locale, task_id, word_count_bucket, result_status, error_category only.
 * Unknown free-form strings are dropped, so nothing personal can ride along.
 */
export function gaEventParams(
  event: WriterEventInput,
  context: WriterContext,
): Record<string, string | number> {
  const params: Record<string, string | number> = {
    event_name: event.event,
    locale: context.locale,
    word_count_bucket: wordCountBucket(event.wordCount),
  };
  const taskId = event.taskId ?? context.taskId;
  if (taskId) params.task_id = taskId;

  const resultStatus = oneOf(event.resultStatus, RESULT_STATUSES);
  if (resultStatus) params.result_status = resultStatus;

  const errorCategory = oneOf(event.errorCategory, ERROR_CATEGORIES);
  if (errorCategory) params.error_category = errorCategory;

  const deliveryStatus = oneOf(event.deliveryStatus, DELIVERY_STATUSES);
  if (deliveryStatus) params.delivery_status = deliveryStatus;

  return params;
}
