/**
 * Simple in-memory limiter: `limit` requests per `windowMs` for each key (IP).
 * Memory is per server instance, so on serverless hosting it's a speed bump,
 * not a guarantee. Turnstile is the main defence against bots.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    const oldest = recent[0] ?? now;
    hits.set(key, recent);
    return { allowed: false, retryAfterSeconds: Math.ceil((windowMs - (now - oldest)) / 1000) };
  }
  recent.push(now);
  hits.set(key, recent);
  // Keep the map from growing forever
  if (hits.size > 5000) {
    for (const [k, times] of hits) if (times.every((t) => now - t >= windowMs)) hits.delete(k);
  }
  return { allowed: true, retryAfterSeconds: 0 };
}
