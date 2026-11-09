const store = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX = 5;

export function checkRateLimit(key: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || now > entry.reset) {
    store.set(key, { count: 1, reset: now + WINDOW_MS });
    return { ok: true };
  }
  if (entry.count >= MAX) {
    return { ok: false, retryAfter: Math.ceil((entry.reset - now) / 1000) };
  }
  entry.count++;
  return { ok: true };
}
