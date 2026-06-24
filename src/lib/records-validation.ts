/** Max length for each free-text narrative field, capped before insert/update to avoid abuse. */
export const MAX_NARRATIVE_LENGTH = 5000;

export interface RecordInput {
  cards: number[];
  beforeLevels?: Record<number, number>;
  afterLevels?: Record<number, number>;
  storyBackground?: string;
  storyAction?: string;
  storyResult?: string;
  storyFeeling?: string;
  storyExpect?: unknown;
  storyBetterAction?: string;
}

export type RecordValidationError = 'invalidCards' | 'invalidLevels' | 'fieldTooLong';

const NARRATIVE_FIELDS = [
  'storyBackground', 'storyAction', 'storyResult',
  'storyFeeling', 'storyExpect', 'storyBetterAction',
] as const;

function isValidLevel(value: unknown): boolean {
  return typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= 10;
}

/**
 * Validate a POST /api/records body at the trust boundary.
 * Pure function (no request/locale) — returns a translation key on failure.
 */
export function validateRecordInput(
  body: unknown,
): { ok: true; input: RecordInput } | { ok: false; key: RecordValidationError } {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, key: 'invalidCards' };
  }
  const payload = body as Record<string, unknown>;

  const cards = payload.cards;
  if (
    !Array.isArray(cards) || cards.length === 0 || cards.length > 3 ||
    !cards.every((c) => typeof c === 'number' && Number.isInteger(c))
  ) {
    return { ok: false, key: 'invalidCards' };
  }

  // Levels are optional; when present for a selected card they must be an integer 1–10.
  const beforeLevels = payload.beforeLevels as Record<number, unknown> | undefined;
  const afterLevels = payload.afterLevels as Record<number, unknown> | undefined;
  for (const cardId of cards) {
    for (const levels of [beforeLevels, afterLevels]) {
      const value = levels?.[cardId];
      if (value !== undefined && value !== null && !isValidLevel(value)) {
        return { ok: false, key: 'invalidLevels' };
      }
    }
  }

  // Cap free-text length.
  for (const field of NARRATIVE_FIELDS) {
    const value = payload[field];
    if (value !== undefined && value !== null && String(value).length > MAX_NARRATIVE_LENGTH) {
      return { ok: false, key: 'fieldTooLong' };
    }
  }

  return { ok: true, input: payload as unknown as RecordInput };
}
