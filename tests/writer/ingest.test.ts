import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createTempDb } from "../helpers/temp-db";
import type { WriterContext, WriterEventInput } from "@/lib/writer/events";
import type { WriterEventName } from "@/lib/writer/types";

const temp = createTempDb("ingest");

type StoreModule = typeof import("@/lib/writer/store");
type IngestModule = typeof import("@/lib/writer/ingest");

let store: StoreModule;
let ingest: IngestModule;

beforeAll(async () => {
  store = await import("@/lib/writer/store");
  ingest = await import("@/lib/writer/ingest");
});

afterAll(() => {
  try {
    temp.close();
  } catch {
    // ignore
  }
});

const uuid = () => crypto.randomUUID();
const SERVER_NOW = Date.parse("2026-09-26T12:00:00.000Z");

const context: WriterContext = { locale: "pt-br", path: "/pt-br/escrever", taskId: "mandacaru-2025-2" };

function makeEvent(sessionId: string, visitorId: string, event: WriterEventName, occurredAt: string, overrides: Partial<WriterEventInput> = {}): WriterEventInput {
  return { eventId: uuid(), sessionId, visitorId, event, occurredAt, ...overrides };
}

function batch(events: WriterEventInput[]) {
  return { context, events };
}

describe("инжест событий райтера", () => {
  it("создаёт сессию из первого beacon и заполняет контекст", () => {
    const sessionId = uuid();
    const visitorId = uuid();
    const result = ingest.ingestWriterEvents(
      batch([makeEvent(sessionId, visitorId, "writer_opened", "2026-09-26T11:59:00.000Z")]),
      SERVER_NOW,
    );

    expect(result).toEqual({ accepted: 1, duplicates: 0, sessions: 1 });
    const session = store.getSession(sessionId);
    expect(session?.visitor_id).toBe(visitorId);
    expect(session?.locale).toBe("pt-br");
    expect(session?.current_task_id).toBe("mandacaru-2025-2");
    expect(session?.status).toBe("opened");
  });

  it("прогресс двигает статус вперёд и проставляет отметки времени", () => {
    const sessionId = uuid();
    const visitorId = uuid();
    ingest.ingestWriterEvents(
      batch([
        makeEvent(sessionId, visitorId, "writer_opened", "2026-09-26T11:00:00.000Z"),
        makeEvent(sessionId, visitorId, "writer_started", "2026-09-26T11:01:00.000Z", { wordCount: 3 }),
        makeEvent(sessionId, visitorId, "writer_reached_email_threshold", "2026-09-26T11:05:00.000Z", { wordCount: 41 }),
        makeEvent(sessionId, visitorId, "writer_reached_exam_minimum", "2026-09-26T11:15:00.000Z", { wordCount: 121 }),
        makeEvent(sessionId, visitorId, "writer_submit_started", "2026-09-26T11:20:00.000Z", {
          wordCount: 150,
          activeMs: 900_000,
          elapsedMs: 1_200_000,
        }),
      ]),
      SERVER_NOW,
    );

    const session = store.getSession(sessionId);
    expect(session?.status).toBe("submitted");
    expect(session?.first_input_at).toBe("2026-09-26T11:01:00.000Z");
    expect(session?.submitted_at).toBe("2026-09-26T11:20:00.000Z");
    expect(session?.current_word_count).toBe(150);
    expect(session?.max_word_count).toBe(150);
    expect(session?.active_ms).toBe(900_000);
    expect(session?.elapsed_ms).toBe(1_200_000);
    // Часы активности серверные: это время приёма beacon, а не время на часах клиента.
    expect(Math.abs(Date.parse(session!.last_activity_at) - Date.now())).toBeLessThan(60_000);
  });

  it("повторный beacon с теми же eventId не меняет ни счётчики, ни сессию", () => {
    const sessionId = uuid();
    const visitorId = uuid();
    const events = [
      makeEvent(sessionId, visitorId, "writer_opened", "2026-09-26T11:00:00.000Z"),
      makeEvent(sessionId, visitorId, "writer_started", "2026-09-26T11:01:00.000Z", { wordCount: 12 }),
    ];

    const first = ingest.ingestWriterEvents(batch(events), SERVER_NOW);
    const replay = ingest.ingestWriterEvents(batch(events), SERVER_NOW);

    expect(first.accepted).toBe(2);
    expect(replay).toEqual({ accepted: 0, duplicates: 2, sessions: 1 });
    expect(store.getSession(sessionId)?.first_input_at).toBe("2026-09-26T11:01:00.000Z");
    expect(store.listSessionEvents(sessionId)).toHaveLength(2);
  });

  it("обгон событий не откатывает статус и не перезаписывает готовые отметки", () => {
    const sessionId = uuid();
    const visitorId = uuid();
    ingest.ingestWriterEvents(
      batch([
        makeEvent(sessionId, visitorId, "writer_opened", "2026-09-26T11:00:00.000Z"),
        makeEvent(sessionId, visitorId, "writer_result_shown", "2026-09-26T11:30:00.000Z", { wordCount: 180 }),
      ]),
      SERVER_NOW,
    );

    ingest.ingestWriterEvents(
      batch([
        makeEvent(sessionId, visitorId, "writer_started", "2026-09-26T11:02:00.000Z", { wordCount: 5 }),
      ]),
      SERVER_NOW,
    );

    const session = store.getSession(sessionId);
    expect(session?.status).toBe("completed");
    expect(session?.completed_at).toBe("2026-09-26T11:30:00.000Z");
    expect(session?.current_word_count).toBe(5);
    expect(session?.max_word_count).toBe(180);
    expect(session?.first_input_at).toBe("2026-09-26T11:02:00.000Z");
  });

  it("часы клиента не главнее серверных: будущее и дальнее прошлое заменяются серверным временем", () => {
    const sessionId = uuid();
    const visitorId = uuid();
    ingest.ingestWriterEvents(
      batch([
        makeEvent(sessionId, visitorId, "writer_opened", "2027-05-05T00:00:00.000Z"),
        makeEvent(sessionId, visitorId, "writer_started", "2001-01-01T00:00:00.000Z"),
      ]),
      SERVER_NOW,
    );

    const events = store.listSessionEvents(sessionId);
    expect(events.map((row) => row.occurred_at)).toEqual([new Date(SERVER_NOW).toISOString(), new Date(SERVER_NOW).toISOString()]);
  });

  it("abandoned сессия возобновляется, когда пользователь вернулся", () => {
    const sessionId = uuid();
    const visitorId = uuid();
    ingest.ingestWriterEvents(batch([makeEvent(sessionId, visitorId, "writer_started", "2026-09-26T11:00:00.000Z")]), SERVER_NOW);
    store.advanceSessionStatus(sessionId, "abandoned");
    expect(store.getSession(sessionId)?.status).toBe("abandoned");

    ingest.ingestWriterEvents(
      batch([makeEvent(sessionId, visitorId, "writer_reached_exam_minimum", "2026-09-26T13:00:00.000Z", { wordCount: 130 })]),
      Date.parse("2026-09-26T13:00:00.000Z"),
    );
    expect(store.getSession(sessionId)?.status).toBe("ready_for_submission");
  });

  it("выбор задания обновляет current_task_id, не трогая initial_task_id", () => {
    const sessionId = uuid();
    const visitorId = uuid();
    ingest.ingestWriterEvents(batch([makeEvent(sessionId, visitorId, "writer_opened", "2026-09-26T11:00:00.000Z")]), SERVER_NOW);
    ingest.ingestWriterEvents(
      batch([
        makeEvent(sessionId, visitorId, "writer_task_selected", "2026-09-26T11:01:00.000Z", { taskId: "zona-livre-2023-2" }),
      ]),
      SERVER_NOW,
    );

    const session = store.getSession(sessionId);
    expect(session?.initial_task_id).toBe("mandacaru-2025-2");
    expect(session?.current_task_id).toBe("zona-livre-2023-2");
    expect(session?.status).toBe("opened");
  });

  it("события двух сессий в одной пачке не смешиваются", () => {
    const first = uuid();
    const second = uuid();
    const visitor = uuid();
    const result = ingest.ingestWriterEvents(
      batch([
        makeEvent(first, visitor, "writer_opened", "2026-09-26T11:00:00.000Z"),
        makeEvent(second, visitor, "writer_opened", "2026-09-26T11:00:00.000Z"),
        makeEvent(second, visitor, "writer_started", "2026-09-26T11:03:00.000Z", { wordCount: 7 }),
      ]),
      SERVER_NOW,
    );

    expect(result.sessions).toBe(2);
    expect(result.accepted).toBe(3);
    expect(store.listSessionEvents(first)).toHaveLength(1);
    expect(store.listSessionEvents(second)).toHaveLength(2);
    expect(store.getSession(second)?.status).toBe("writing");
  });

  it("отказ анализа помечает failed, а последующий успех — completed", () => {
    const sessionId = uuid();
    const visitorId = uuid();
    ingest.ingestWriterEvents(
      batch([
        makeEvent(sessionId, visitorId, "writer_submit_started", "2026-09-26T11:00:00.000Z"),
        makeEvent(sessionId, visitorId, "writer_analysis_failed", "2026-09-26T11:00:40.000Z", { errorCategory: "provider" }),
      ]),
      SERVER_NOW,
    );
    expect(store.getSession(sessionId)?.status).toBe("failed");

    ingest.ingestWriterEvents(
      batch([makeEvent(sessionId, visitorId, "writer_result_shown", "2026-09-26T11:02:00.000Z")]),
      SERVER_NOW,
    );
    expect(store.getSession(sessionId)?.status).toBe("completed");
    expect(store.getSession(sessionId)?.completed_at).toBe("2026-09-26T11:02:00.000Z");
  });
});
