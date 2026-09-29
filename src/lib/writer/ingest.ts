import {
  applySessionProgress,
  getSession,
  insertWriterEvent,
  upsertWriterSession,
  type SessionProgress,
} from "./store";
import { normalizeOccurredAt, type WriterContext, type WriterEventInput } from "./events";
import type { WriterEventName, WriterSessionStatus } from "./types";

export type IngestResult = {
  accepted: number;
  duplicates: number;
  sessions: number;
};

/** Progress may only move forward; 'abandoned' is the exception because a tab can come back. */
const STATUS_RANK: Record<WriterSessionStatus, number> = {
  abandoned: 0,
  opened: 10,
  writing: 20,
  ready_for_email: 30,
  ready_for_submission: 40,
  submitted: 50,
  failed: 55,
  completed: 60,
};

type EventEffect = {
  status?: WriterSessionStatus;
  stamps?: Array<keyof Pick<SessionProgress, "firstInputAt" | "submittedAt" | "completedAt">>;
};

const EVENT_EFFECTS: Record<WriterEventName, EventEffect> = {
  writer_opened: { status: "opened" },
  writer_task_selected: {},
  writer_started: { status: "writing", stamps: ["firstInputAt"] },
  writer_reached_email_threshold: { status: "ready_for_email" },
  writer_reached_exam_minimum: { status: "ready_for_submission" },
  writer_submit_started: { status: "submitted", stamps: ["submittedAt"] },
  writer_validation_failed: {},
  writer_analysis_succeeded: { status: "completed", stamps: ["completedAt"] },
  writer_analysis_failed: { status: "failed" },
  writer_result_shown: { status: "completed", stamps: ["completedAt"] },
  writer_email_sent: { status: "completed" },
  writer_email_failed: {},
  writer_report_opened: {},
  writer_resubmitted: { status: "submitted", stamps: ["submittedAt"] },
};

function nextStatus(current: WriterSessionStatus, wanted: WriterSessionStatus | undefined): WriterSessionStatus | undefined {
  if (!wanted) return undefined;
  // A replayed beacon must not demote a finished session, but any signal resumes an abandoned one.
  if (current !== "abandoned" && STATUS_RANK[wanted] < STATUS_RANK[current]) return undefined;
  return wanted;
}

function progressFor(event: WriterEventInput, occurredAt: string, currentStatus: WriterSessionStatus): SessionProgress {
  const effect = EVENT_EFFECTS[event.event] ?? {};
  const patch: SessionProgress = {};

  const status = nextStatus(currentStatus, effect.status);
  if (status) patch.status = status;

  for (const stamp of effect.stamps ?? []) patch[stamp] = occurredAt;
  if (event.taskId) patch.currentTaskId = event.taskId;
  if (typeof event.wordCount === "number") {
    patch.currentWordCount = event.wordCount;
    patch.maxWordCount = event.wordCount;
  }
  if (typeof event.activeMs === "number") patch.activeMs = event.activeMs;
  if (typeof event.elapsedMs === "number") patch.elapsedMs = event.elapsedMs;
  return patch;
}

/**
 * Stores a validated beacon batch. One transaction per batch, sessions created on demand,
 * and nothing here can throw on duplicate event ids thanks to INSERT OR IGNORE.
 */
export function ingestWriterEvents(
  payload: { context: WriterContext; events: WriterEventInput[] },
  serverNowMs = Date.now(),
): IngestResult {
  const result: IngestResult = { accepted: 0, duplicates: 0, sessions: 0 };
  const touched = new Set<string>();

  for (const event of payload.events) {
    if (!touched.has(event.sessionId)) {
      upsertWriterSession({
        sessionId: event.sessionId,
        visitorId: event.visitorId,
        context: payload.context,
      });
      touched.add(event.sessionId);
      result.sessions += 1;
    }

    const occurredAt = normalizeOccurredAt(event.occurredAt, serverNowMs);
    const current = getSession(event.sessionId);
    if (!current) continue;

    const inserted = insertWriterEvent(event, payload.context, serverNowMs);
    if (!inserted.inserted) {
      result.duplicates += 1;
      continue;
    }
    result.accepted += 1;

    // last_activity_at belongs to the server: it is the receipt clock abandonment reads from.
    applySessionProgress(event.sessionId, progressFor(event, occurredAt, current.status));
  }

  return result;
}
