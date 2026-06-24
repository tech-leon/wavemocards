import { describe, it, expect } from 'vitest';
import { normalizeKeyword, tokenizeKeyword, buildSearchTokens } from '@/lib/records-search';

describe('normalizeKeyword', () => {
  it('trims and lowercases', () => {
    expect(normalizeKeyword('  Anger  ', 'en')).toBe('anger');
  });

  it('leaves CJK text intact', () => {
    expect(normalizeKeyword('  焦慮  ', 'zh-TW')).toBe('焦慮');
  });
});

describe('tokenizeKeyword', () => {
  it('splits on runs of whitespace', () => {
    expect(tokenizeKeyword('anger   joy')).toEqual(['anger', 'joy']);
  });

  it('drops empty tokens from leading/trailing space', () => {
    expect(tokenizeKeyword('  anger  ')).toEqual(['anger']);
  });

  it('keeps a space-free CJK phrase as a single token', () => {
    expect(tokenizeKeyword('焦慮')).toEqual(['焦慮']);
  });

  it('returns an empty array for a blank string', () => {
    expect(tokenizeKeyword('   ')).toEqual([]);
  });
});

describe('buildSearchTokens', () => {
  it('normalizes then tokenizes', () => {
    expect(buildSearchTokens({ keyword: '  Anger Joy  ', locale: 'en' })).toEqual(['anger', 'joy']);
  });

  it('returns an empty array when the keyword is whitespace only', () => {
    expect(buildSearchTokens({ keyword: '   ', locale: 'zh-TW' })).toEqual([]);
  });
});
