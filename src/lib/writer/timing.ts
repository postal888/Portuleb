import { IDLE_THRESHOLD_MS } from "./time";

export type TimingSnapshot = {
  activeMs: number;
  elapsedMs: number;
  idleMs: number;
};

/**
 * Active time is interaction time, not wall clock: it only accrues while the page is
 * visible and within IDLE_THRESHOLD_MS of the last keystroke or editor interaction.
 */
export function createTimingTracker(options: { idleMs?: number; now?: () => number } = {}) {
  const idleMs = options.idleMs ?? IDLE_THRESHOLD_MS;
  const now = options.now ?? (() => Date.now());

  let startedAt: number | null = null;
  let lastTick = 0;
  let lastActivity = 0;
  let activeMs = 0;
  let visible = true;

  function tick(at: number) {
    if (startedAt === null) return;
    const delta = at - lastTick;
    if (delta <= 0) return;
    lastTick = at;
    if (!visible) return;
    if (at - lastActivity <= idleMs) activeMs += delta;
  }

  return {
    /** Called on the first character typed; everything before it is just reading the insumo. */
    start() {
      if (startedAt !== null) return;
      const at = now();
      startedAt = at;
      lastTick = at;
      lastActivity = at;
    },

    /** Keystroke, task switch, focus back into the editor — anything that proves attention. */
    touch() {
      const at = now();
      if (startedAt === null) {
        this.start();
        return;
      }
      tick(at);
      lastActivity = at;
    },

    setVisible(value: boolean) {
      const at = now();
      tick(at);
      visible = value;
      if (!value) lastTick = at;
    },

    /** Periodic accumulation so a long typing burst is not lost if the tab dies. */
    flush() {
      tick(now());
    },

    snapshot(): TimingSnapshot {
      tick(now());
      const elapsedMs = startedAt === null ? 0 : Math.max(0, now() - startedAt);
      return {
        activeMs: Math.round(activeMs),
        elapsedMs: Math.round(elapsedMs),
        idleMs: Math.round(Math.max(0, elapsedMs - activeMs)),
      };
    },

    started(): boolean {
      return startedAt !== null;
    },
  };
}

export type TimingTracker = ReturnType<typeof createTimingTracker>;
