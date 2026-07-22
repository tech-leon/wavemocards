import { describe, expect, it } from 'vitest';
import { listExportDays, toDailyRows } from './analytics-export';

describe('listExportDays', () => {
  it('returns lookback days ending yesterday, oldest first', () => {
    const days = listExportDays(new Date('2026-07-17T10:30:00Z'), 3);
    expect(days).toEqual(['2026-07-14', '2026-07-15', '2026-07-16']);
  });

  it('crosses month boundaries', () => {
    const days = listExportDays(new Date('2026-07-01T00:00:00Z'), 2);
    expect(days).toEqual(['2026-06-29', '2026-06-30']);
  });

  it('uses the UTC date, not local time', () => {
    // 2026-07-17T23:30Z is already 07-18 in UTC+8; UTC must win
    const days = listExportDays(new Date('2026-07-17T23:30:00Z'), 1);
    expect(days).toEqual(['2026-07-16']);
  });
});

describe('toDailyRows', () => {
  const day = '2026-07-16';

  it('maps valid API rows to table rows', () => {
    const rows = toDailyRows(day, [
      { route: '/explore/cards', pageviews: 42, visitors: 30 },
      { route: '/[locale]', pageviews: 10, visitors: 9 },
    ]);
    expect(rows).toEqual([
      { day, route: '/explore/cards', pageviews: 42, visitors: 30 },
      { day, route: '/[locale]', pageviews: 10, visitors: 9 },
    ]);
  });

  it('drops malformed entries and non-route groups', () => {
    const rows = toDailyRows(day, [
      { route: 'Others', pageviews: 5, visitors: 5 },
      { route: '/ok', pageviews: 'many', visitors: 1 },
      { route: '/ok', pageviews: 1 },
      { pageviews: 1, visitors: 1 },
      null,
      { route: '/kept', pageviews: 1, visitors: 1 },
    ]);
    expect(rows).toEqual([{ day, route: '/kept', pageviews: 1, visitors: 1 }]);
  });

  it('returns empty for a non-array payload', () => {
    expect(toDailyRows(day, undefined)).toEqual([]);
    expect(toDailyRows(day, { data: [] })).toEqual([]);
  });
});
