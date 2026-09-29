type Bucket = { count: number; resetAt: number };

const WINDOW_MS = 10 * 60 * 1_000;
const MAX_BATCHES = 120;

const buckets = new Map<string, Bucket>();

/** Beacons are frequent by design, so the budget is far larger than the essay check's. */
export function writerRateLimit(key: string, now = Date.now()): { ok: true } | { ok: false; retryAfterSec: number } {
  if (buckets.size > 5_000) {
    for (const [bucketKey, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(bucketKey);
    }
  }

  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }
  if (current.count >= MAX_BATCHES) {
    return { ok: false, retryAfterSec: Math.ceil((current.resetAt - now) / 1000) };
  }
  current.count += 1;
  return { ok: true };
}

export function resetWriterRateLimit(): void {
  buckets.clear();
}

type ResendBucket = { count: number; resetAt: number; lastAt: number };

const RESEND_WINDOW_MS = 10 * 60_000;

const resendBuckets = new Map<string, ResendBucket>();

export type ResendLimitOptions = { cooldownMs?: number; max?: number };

/**
 * Resending mails a link, so it is the one writer endpoint worth throttling hard:
 * a cooldown plus a small budget, otherwise a leaked submission id becomes a mail
 * bomb against the candidate's inbox. IP budgets stay roomy — classrooms share one address.
 */
export function writerResendLimit(
  key: string,
  options: ResendLimitOptions = {},
  now = Date.now(),
): { ok: true } | { ok: false; retryAfterSec: number } {
  const cooldownMs = options.cooldownMs ?? 60_000;
  const max = options.max ?? 3;

  if (resendBuckets.size > 5_000) {
    for (const [bucketKey, bucket] of resendBuckets) {
      if (bucket.resetAt <= now) resendBuckets.delete(bucketKey);
    }
  }

  const current = resendBuckets.get(key);
  if (!current || current.resetAt <= now) {
    resendBuckets.set(key, { count: 1, resetAt: now + RESEND_WINDOW_MS, lastAt: now });
    return { ok: true };
  }
  const sinceLast = now - current.lastAt;
  if (sinceLast < cooldownMs) {
    return { ok: false, retryAfterSec: Math.ceil((cooldownMs - sinceLast) / 1000) };
  }
  if (current.count >= max) {
    return { ok: false, retryAfterSec: Math.ceil((current.resetAt - now) / 1000) };
  }
  current.count += 1;
  current.lastAt = now;
  return { ok: true };
}

export function resetWriterResendLimit(): void {
  resendBuckets.clear();
}
