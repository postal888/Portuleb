import { describe, expect, it } from "vitest";
import { createTimingTracker } from "@/lib/writer/timing";
import { IDLE_THRESHOLD_MS } from "@/lib/writer/time";

function clock(start = 1_000_000) {
  let now = start;
  return {
    now: () => now,
    advance: (ms: number) => {
      now += ms;
      return now;
    },
  };
}

describe("active time", () => {
  it("до первого символа время не идёт", () => {
    const t = clock();
    const tracker = createTimingTracker({ now: t.now });
    t.advance(60_000);
    expect(tracker.snapshot()).toEqual({ activeMs: 0, elapsedMs: 0, idleMs: 0 });
  });

  it("не считает всё между первым символом и submit активным", () => {
    const t = clock();
    const tracker = createTimingTracker({ now: t.now });

    tracker.start();
    // печатает 60 секунд
    for (let i = 0; i < 6; i += 1) {
      t.advance(10_000);
      tracker.touch();
    }
    // ушёл на 20 минут, вернулся и отправил
    t.advance(20 * 60_000);
    tracker.flush();

    const snapshot = tracker.snapshot();
    expect(snapshot.elapsedMs).toBe(60_000 + 20 * 60_000);
    expect(snapshot.activeMs).toBeLessThanOrEqual(90_000);
    expect(snapshot.activeMs).toBeGreaterThanOrEqual(60_000);
    expect(snapshot.idleMs).toBe(snapshot.elapsedMs - snapshot.activeMs);
    expect(snapshot.idleMs).toBeGreaterThan(18 * 60_000);
  });

  it("невидимая вкладка не добавляет активного времени", () => {
    const t = clock();
    const tracker = createTimingTracker({ now: t.now });

    tracker.start();
    t.advance(5_000);
    tracker.touch();
    tracker.setVisible(false);
    t.advance(120_000);
    tracker.flush();

    const snapshot = tracker.snapshot();
    expect(snapshot.activeMs).toBe(5_000);
    expect(snapshot.elapsedMs).toBe(125_000);
  });

  it("возврат к редактору возобновляет отсчёт", () => {
    const t = clock();
    const tracker = createTimingTracker({ now: t.now });

    tracker.start();
    tracker.setVisible(false);
    t.advance(30_000);
    tracker.setVisible(true);
    tracker.touch();
    t.advance(10_000);
    tracker.touch();

    const snapshot = tracker.snapshot();
    expect(snapshot.activeMs).toBe(10_000);
    expect(snapshot.elapsedMs).toBe(40_000);
  });

  it("пауза ниже idle-порога остаётся активным временем", () => {
    const t = clock();
    const tracker = createTimingTracker({ now: t.now });

    tracker.start();
    t.advance(IDLE_THRESHOLD_MS / 2);
    tracker.touch();
    t.advance(IDLE_THRESHOLD_MS / 2);
    tracker.touch();

    expect(tracker.snapshot().activeMs).toBe(IDLE_THRESHOLD_MS);
  });

  it("flush не создаёт событий и не ломает идемпотентность снимка", () => {
    const t = clock();
    const tracker = createTimingTracker({ now: t.now });
    tracker.start();
    t.advance(15_000);
    tracker.flush();
    const first = tracker.snapshot();
    const second = tracker.snapshot();
    expect(second).toEqual(first);
  });
});
