import { describe, it, expect } from 'vitest';
import { parseRecordsListParams, buildPagination } from '@/lib/records-query';

function params(init: Record<string, string>): URLSearchParams {
  return new URLSearchParams(init);
}

describe('parseRecordsListParams', () => {
  it('applies defaults when nothing is provided', () => {
    const result = parseRecordsListParams(params({}));
    expect(result).toEqual({
      startDate: null,
      endDate: null,
      keyword: null,
      page: 1,
      perPage: 10,
    });
  });

  it('parses page and perPage', () => {
    const result = parseRecordsListParams(params({ page: '3', perPage: '20' }));
    expect(result.page).toBe(3);
    expect(result.perPage).toBe(20);
  });

  it('caps perPage at the maximum', () => {
    expect(parseRecordsListParams(params({ perPage: '999' })).perPage).toBe(50);
  });

  it.each(['0', '-5', 'abc'])('falls back to defaults for invalid page "%s"', (page) => {
    expect(parseRecordsListParams(params({ page })).page).toBe(1);
  });

  it('trims a keyword and nulls a blank one', () => {
    expect(parseRecordsListParams(params({ keyword: '  焦慮  ' })).keyword).toBe('焦慮');
    expect(parseRecordsListParams(params({ keyword: '   ' })).keyword).toBeNull();
  });

  it('passes through date filters as-is', () => {
    const result = parseRecordsListParams(params({ startDate: '2026-01-01', endDate: '2026-06-30' }));
    expect(result.startDate).toBe('2026-01-01');
    expect(result.endDate).toBe('2026-06-30');
  });
});

describe('buildPagination', () => {
  it('rounds total pages up', () => {
    expect(buildPagination(1, 10, 25)).toEqual({
      page: 1,
      perPage: 10,
      totalRecords: 25,
      totalPages: 3,
    });
  });

  it('returns zero pages for an empty result set', () => {
    expect(buildPagination(1, 10, 0).totalPages).toBe(0);
  });

  it('returns a single page when records fit exactly', () => {
    expect(buildPagination(1, 10, 10).totalPages).toBe(1);
  });
});
