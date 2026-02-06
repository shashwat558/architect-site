export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  reset: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitStore = Map<string, RateLimitEntry>;

const globalStore = globalThis as typeof globalThis & {
  __rateLimitStore?: RateLimitStore;
};

const store: RateLimitStore = globalStore.__rateLimitStore ?? new Map();
globalStore.__rateLimitStore = store;

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

export function rateLimit(
  key: string,
  options: { windowMs: number; max: number }
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + options.windowMs;
    store.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      limit: options.max,
      remaining: Math.max(options.max - 1, 0),
      reset: resetAt,
    };
  }

  if (entry.count >= options.max) {
    return {
      allowed: false,
      limit: options.max,
      remaining: 0,
      reset: entry.resetAt,
    };
  }

  entry.count += 1;
  store.set(key, entry);

  return {
    allowed: true,
    limit: options.max,
    remaining: Math.max(options.max - entry.count, 0),
    reset: entry.resetAt,
  };
}

export function rateLimitHeaders(result: RateLimitResult) {
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(result.reset),
  };
}