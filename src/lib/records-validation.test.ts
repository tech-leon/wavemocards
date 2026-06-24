import { describe, it, expect } from 'vitest';
import { validateRecordInput, MAX_NARRATIVE_LENGTH } from '@/lib/records-validation';

describe('validateRecordInput', () => {
  it('accepts a minimal valid body', () => {
    const result = validateRecordInput({ cards: [1] });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.input.cards).toEqual([1]);
  });

  it('accepts up to 3 cards with valid levels and narratives', () => {
    const result = validateRecordInput({
      cards: [1, 2, 3],
      beforeLevels: { 1: 1, 2: 5, 3: 10 },
      afterLevels: { 1: 10 },
      storyBackground: 'hello',
    });
    expect(result.ok).toBe(true);
  });

  it.each([
    ['null', null],
    ['array', [1, 2]],
    ['string', 'nope'],
  ])('rejects a non-object body (%s) as invalidCards', (_label, body) => {
    const result = validateRecordInput(body);
    expect(result).toEqual({ ok: false, key: 'invalidCards' });
  });

  it.each([
    ['empty cards', { cards: [] }],
    ['too many cards', { cards: [1, 2, 3, 4] }],
    ['missing cards', { beforeLevels: { 1: 5 } }],
    ['non-integer card', { cards: [1.5] }],
    ['non-number card', { cards: ['1'] }],
  ])('rejects %s as invalidCards', (_label, body) => {
    const result = validateRecordInput(body);
    expect(result).toEqual({ ok: false, key: 'invalidCards' });
  });

  it.each([
    ['below range', 0],
    ['above range', 11],
    ['non-integer', 5.5],
    ['non-number', 'high'],
  ])('rejects a %s level as invalidLevels', (_label, level) => {
    const result = validateRecordInput({ cards: [1], beforeLevels: { 1: level } });
    expect(result).toEqual({ ok: false, key: 'invalidLevels' });
  });

  it('allows null or undefined levels for a selected card', () => {
    expect(validateRecordInput({ cards: [1], beforeLevels: { 1: null } }).ok).toBe(true);
    expect(validateRecordInput({ cards: [1], afterLevels: {} }).ok).toBe(true);
  });

  it('ignores levels keyed to unselected cards', () => {
    const result = validateRecordInput({ cards: [1], beforeLevels: { 2: 99 } });
    expect(result.ok).toBe(true);
  });

  it('rejects a narrative field over the max length', () => {
    const result = validateRecordInput({
      cards: [1],
      storyBackground: 'a'.repeat(MAX_NARRATIVE_LENGTH + 1),
    });
    expect(result).toEqual({ ok: false, key: 'fieldTooLong' });
  });

  it('accepts a narrative field exactly at the max length', () => {
    const result = validateRecordInput({
      cards: [1],
      storyFeeling: 'a'.repeat(MAX_NARRATIVE_LENGTH),
    });
    expect(result.ok).toBe(true);
  });

  it('coerces storyExpect to a string before measuring length', () => {
    // A numeric expect value (0/1/2) must not throw and is within length.
    const result = validateRecordInput({ cards: [1], storyExpect: 2 });
    expect(result.ok).toBe(true);
  });
});
