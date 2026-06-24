import { describe, it, expect } from 'vitest';
import { formatRecordDate, buildStrengthDisplay, getExpectText } from '@/lib/record-utils';
import type { CardInfo } from '@/types/record-detail';

const card = (name: string): CardInfo => ({ name }) as CardInfo;

describe('formatRecordDate', () => {
  it('formats to "YYYY / MM / DD" with zero padding', () => {
    // Local-time literal (no trailing Z) so the day never shifts by timezone.
    // formatRecordDate reads local getFullYear/Month/Date; a bare date like
    // '2026-06-24' would parse as UTC and could render as the 23rd west of UTC.
    expect(formatRecordDate('2026-06-24T12:00:00')).toBe('2026 / 06 / 24');
    expect(formatRecordDate('2026-01-05T12:00:00')).toBe('2026 / 01 / 05');
  });
});

describe('buildStrengthDisplay', () => {
  it('joins present card/level pairs with a katakana middle dot', () => {
    const result = buildStrengthDisplay(card('Anger'), card('Joy'), null, 8, 3, null, 'none');
    expect(result).toBe('Anger 8・Joy 3');
  });

  it('skips a card when its level is null', () => {
    const result = buildStrengthDisplay(card('Anger'), card('Joy'), null, 8, null, null, 'none');
    expect(result).toBe('Anger 8');
  });

  it('returns the fallback when nothing is present', () => {
    expect(buildStrengthDisplay(null, null, null, null, null, null, 'none')).toBe('none');
  });
});

describe('getExpectText', () => {
  const t = (key: string) => key;

  it.each([
    ['0', 'expect.yes'],
    ['1', 'expect.no'],
    ['2', 'expect.unknown'],
    [null, 'empty.notAvailable'],
    ['9', 'empty.notAvailable'],
  ])('maps %s to %s', (expect_, key) => {
    expect(getExpectText(expect_, t)).toBe(key);
  });
});
