import { isWritingTaskId, type WritingTaskId } from "@/content/writing/tasks";
import { gaEventParams, type WriterContext, type WriterEventInput } from "./events";
import { createTimingTracker, type TimingSnapshot } from "./timing";
import type { WriterEventName } from "./types";

const VISITOR_KEY = "cdp.writer.visitorId.v1";
const SESSION_KEY = "cdp.writer.sessionId.v1";
const FLUSH_MS = 5_000;
const MAX_QUEUE = 24;
const MAX_BATCH_BYTES = 3_600;
const ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type WriterTrackerOptions = {
  locale: WriterContext["locale"];
  path: string;
  taskId?: string;
  endpoint?: string;
};

type TrackFields = Partial<
  Pick<
    WriterEventInput,
    | "wordCount"
    | "maxWordCount"
    | "durationMs"
    | "resultStatus"
    | "errorCategory"
    | "deliveryStatus"
    | "reason"
    | "taskId"
  >
>;

function newId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

/** localStorage can throw in private mode; losing identity only costs repeat counts. */
function readStoredId(storage: Storage | null, key: string): string {
  if (!storage) return newId();
  try {
    const stored = storage.getItem(key);
    if (stored && ID_RE.test(stored)) return stored;
    const created = newId();
    storage.setItem(key, created);
    return created;
  } catch {
    return newId();
  }
}

function storageOrNull(get: () => Storage | null): Storage | null {
  try {
    return get();
  } catch {
    return null;
  }
}

function utmFromSearch(search: string): Pick<WriterContext, "utmSource" | "utmMedium" | "utmCampaign"> {
  const params = new URLSearchParams(search);
  const clean = (value: string | null, max: number) => {
    const trimmed = value?.trim().slice(0, max);
    return trimmed && /^[\w .:-]{1,80}$/.test(trimmed) ? trimmed : undefined;
  };
  const utmSource = clean(params.get("utm_source") ?? null, 60);
  const utmMedium = clean(params.get("utm_medium") ?? null, 60);
  const utmCampaign = clean(params.get("utm_campaign") ?? null, 80);
  return { utmSource, utmMedium, utmCampaign };
}

function taskLabel(taskId: string | undefined): WritingTaskId | undefined {
  return taskId && isWritingTaskId(taskId) ? taskId : undefined;
}

/**
 * Browser side of writer observability: identity, milestones and honest timing.
 * Nothing typed goes into the payload — only counters, ids and status enums.
 */
export function createWriterTracker(options: WriterTrackerOptions) {
  const endpoint = options.endpoint ?? "/api/analytics/writer";
  const local = storageOrNull(() => window.localStorage);
  const session = storageOrNull(() => window.sessionStorage);

  const visitorId = readStoredId(local, VISITOR_KEY);
  const sessionId = readStoredId(session, SESSION_KEY);
  const timing = createTimingTracker();

  let taskId = taskLabel(options.taskId);
  let referrer = document.referrer ? document.referrer.slice(0, 200) : undefined;
  if (referrer && !/^https?:\/\//i.test(referrer)) referrer = undefined;
  const utm = utmFromSearch(window.location.search);

  const context: WriterContext = {
    locale: options.locale,
    path: options.path.slice(0, 200),
    taskId,
    referrer,
    ...utm,
  };

  let queue: WriterEventInput[] = [];
  let destroyed = false;
  let submitStartedAt: number | null = null;

  function contextSnapshot(): WriterContext {
    return { ...context, taskId };
  }

  function encode(payload: { context: WriterContext; events: WriterEventInput[] }): string | null {
    try {
      const encoded = JSON.stringify(payload);
      return new TextEncoder().encode(encoded).length > MAX_BATCH_BYTES ? null : encoded;
    } catch {
      return null;
    }
  }

  function send(body: string): void {
    try {
      if (navigator.sendBeacon) {
        const sent = navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
        if (sent) return;
      }
      void fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
        credentials: "omit",
      }).catch(() => {
        // Analytics must never surface as a user-visible error.
      });
    } catch {
      // Ditto: a blocked beacon is dropped, not retried forever.
    }
  }

  function flush(): void {
    if (destroyed || queue.length === 0) return;

    while (queue.length) {
      let slice = queue;
      let body = encode({ context: contextSnapshot(), events: slice });
      if (body === null) {
        slice = queue.slice(0, 1);
        body = encode({ context: contextSnapshot(), events: slice });
        if (body === null) {
          queue = queue.slice(1);
          continue;
        }
      }
      queue = queue.slice(slice.length);
      send(body);
    }
  }

  function push(event: WriterEventInput): void {
    queue.push(event);
    if (queue.length >= MAX_QUEUE) flush();
  }

  function track(name: WriterEventName, fields: TrackFields = {}): void {
    if (destroyed) return;
    const snapshot = timing.snapshot();
    const event: WriterEventInput = {
      eventId: newId(),
      sessionId,
      visitorId,
      event: name,
      occurredAt: new Date().toISOString(),
      activeMs: snapshot.activeMs,
      elapsedMs: snapshot.elapsedMs,
      ...(fields.taskId ? { taskId: taskLabel(fields.taskId) } : {}),
      ...(typeof fields.wordCount === "number" ? { wordCount: Math.min(1_000_000, Math.max(0, Math.round(fields.wordCount))) } : {}),
      ...(typeof fields.maxWordCount === "number" ? { maxWordCount: Math.max(0, Math.round(fields.maxWordCount)) } : {}),
      ...(typeof fields.durationMs === "number" ? { durationMs: Math.min(600_000, Math.max(0, Math.round(fields.durationMs))) } : {}),
      ...(fields.resultStatus ? { resultStatus: fields.resultStatus } : {}),
      ...(fields.errorCategory ? { errorCategory: fields.errorCategory } : {}),
      ...(fields.deliveryStatus ? { deliveryStatus: fields.deliveryStatus } : {}),
      ...(fields.reason ? { reason: fields.reason.slice(0, 48) } : {}),
    };

    try {
      window.gtag?.("event", name, gaEventParams(event, contextSnapshot()));
    } catch {
      // gtag is optional and can be blocked by extensions.
    }

    push(event);
  }

  const onVisibility = () => {
    timing.setVisible(document.visibilityState === "visible");
    if (document.visibilityState === "hidden") flush();
  };
  const onPageHide = () => flush();
  const onBeforeUnload = () => flush();

  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", onPageHide);
  window.addEventListener("beforeunload", onBeforeUnload);
  const timer = window.setInterval(() => {
    timing.flush();
    flush();
  }, FLUSH_MS);

  return {
    track,
    flush,
    /** First keystroke: reading the prompt is not writing, so the clock starts here. */
    start(): void {
      timing.start();
    },
    touch(): void {
      timing.touch();
    },
    /** Has the clock started? Reading the insumo is not writing. */
    started(): boolean {
      return timing.started();
    },
    /**
     * Wall-clock for one check request. Components may not read the clock themselves:
     * `Date.now()` called from a function declared during render fails react-hooks/purity.
     */
    beginSubmit(): void {
      submitStartedAt = Date.now();
    },
    submitElapsedMs(): number {
      return submitStartedAt === null ? 0 : Date.now() - submitStartedAt;
    },
    setTaskId(next: string | undefined): void {
      taskId = taskLabel(next);
      context.taskId = taskId;
    },
    snapshot(): TimingSnapshot {
      return timing.snapshot();
    },
    ids(): { visitorId: string; sessionId: string } {
      return { visitorId, sessionId };
    },
    destroy(): void {
      if (destroyed) return;
      destroyed = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("beforeunload", onBeforeUnload);
      flush();
    },
  };
}

export type WriterTracker = ReturnType<typeof createWriterTracker>;
