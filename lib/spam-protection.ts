export type SpamCheckInput = {
  honeypot?: string | null;
  formStartedAt?: number | string | null;
  message?: string | null;
};

export type SpamCheckResult =
  | { blocked: false }
  | { blocked: true; reason: string };

const MIN_TIME_TO_SUBMIT_MS = 3000;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_LINKS = 2;

export function checkForSpam(input: SpamCheckInput): SpamCheckResult {
  if (typeof input.honeypot === "string" && input.honeypot.trim().length > 0) {
    return { blocked: true, reason: "Honeypot triggered" };
  }

  if (input.formStartedAt !== null && input.formStartedAt !== undefined) {
    const startedAt =
      typeof input.formStartedAt === "string"
        ? Number(input.formStartedAt)
        : input.formStartedAt;

    if (!Number.isNaN(startedAt)) {
      const elapsed = Date.now() - startedAt;
      if (elapsed >= 0 && elapsed < MIN_TIME_TO_SUBMIT_MS) {
        return { blocked: true, reason: "Submitted too quickly" };
      }
    }
  }

  if (typeof input.message === "string") {
    if (input.message.length > MAX_MESSAGE_LENGTH) {
      return { blocked: true, reason: "Message too long" };
    }

    const linkMatches = input.message.match(/https?:\/\//gi) ?? [];
    if (linkMatches.length > MAX_LINKS) {
      return { blocked: true, reason: "Too many links" };
    }
  }

  return { blocked: false };
}