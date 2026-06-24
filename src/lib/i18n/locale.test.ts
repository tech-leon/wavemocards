import { describe, it, expect } from 'vitest';
import {
  extractLocaleFromPathname,
  stripLocaleFromPathname,
  isPublicPath,
  resolveLocale,
  localizeHref,
  getOpenGraphLocale,
  DEFAULT_LOCALE,
} from '@/lib/i18n/locale';

describe('extractLocaleFromPathname', () => {
  it('returns null locale for the root path', () => {
    expect(extractLocaleFromPathname('/')).toEqual({ pathname: '/', locale: null });
  });

  it('strips a known locale prefix', () => {
    expect(extractLocaleFromPathname('/en/emo-cards')).toEqual({
      pathname: '/emo-cards',
      locale: 'en',
    });
  });

  it('leaves an unknown first segment untouched', () => {
    expect(extractLocaleFromPathname('/records')).toEqual({
      pathname: '/records',
      locale: null,
    });
  });

  it('reduces a bare locale prefix to root', () => {
    expect(extractLocaleFromPathname('/ja')).toEqual({ pathname: '/', locale: 'ja' });
  });
});

describe('stripLocaleFromPathname', () => {
  it('keeps the locale only for public paths', () => {
    expect(stripLocaleFromPathname('/en/about-emotions')).toEqual({
      pathname: '/about-emotions',
      locale: 'en',
    });
  });

  it('drops the locale for a private path even if prefixed', () => {
    // /en/records is not a public route, so the locale is not honoured.
    expect(stripLocaleFromPathname('/en/records')).toEqual({
      pathname: '/en/records',
      locale: null,
    });
  });
});

describe('isPublicPath', () => {
  it.each(['/', '/emo-cards', '/emo-cards/anger', '/about-emotions', '/en/emo-cards'])(
    'treats %s as public',
    (p) => expect(isPublicPath(p)).toBe(true),
  );

  it.each(['/records', '/explore', '/account', '/explore/cards'])(
    'treats %s as private',
    (p) => expect(isPublicPath(p)).toBe(false),
  );
});

describe('resolveLocale', () => {
  it('prefers the locale from the path', () => {
    expect(resolveLocale('/ja/emo-cards', 'en')).toBe('ja');
  });

  it('falls back to the cookie when the path has no locale', () => {
    expect(resolveLocale('/records', 'en')).toBe('en');
  });

  it('falls back to the default when neither is present or valid', () => {
    expect(resolveLocale('/records', 'xx')).toBe(DEFAULT_LOCALE);
    expect(resolveLocale('/records', null)).toBe(DEFAULT_LOCALE);
  });
});

describe('localizeHref', () => {
  it('adds a locale prefix to a public path', () => {
    expect(localizeHref('/emo-cards', 'ja')).toBe('/ja/emo-cards');
  });

  it('localizes the root path', () => {
    expect(localizeHref('/', 'en')).toBe('/en');
  });

  it('does not prefix a private path', () => {
    expect(localizeHref('/records', 'ja')).toBe('/records');
  });

  it('preserves query and hash suffixes', () => {
    expect(localizeHref('/emo-cards?tab=all#top', 'en')).toBe('/en/emo-cards?tab=all#top');
  });

  it('leaves external hrefs untouched', () => {
    expect(localizeHref('https://example.com', 'en')).toBe('https://example.com');
  });
});

describe('getOpenGraphLocale', () => {
  it.each([
    ['en', 'en_US'],
    ['ja', 'ja_JP'],
    ['zh-TW', 'zh_TW'],
  ] as const)('maps %s to %s', (locale, og) => {
    expect(getOpenGraphLocale(locale)).toBe(og);
  });
});
