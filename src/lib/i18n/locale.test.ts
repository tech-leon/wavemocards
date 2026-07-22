import { describe, it, expect } from 'vitest';
import {
  extractLocaleFromPathname,
  stripLocaleFromPathname,
  isPublicPath,
  resolveLocale,
  resolveRequestLocale,
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
  it.each(['/', '/emo-cards', '/emo-cards/anger', '/about-emotions', '/en/emo-cards', '/privacy', '/terms', '/ja/privacy'])(
    'treats %s as public',
    (p) => expect(isPublicPath(p)).toBe(true),
  );

  it.each(['/records', '/explore', '/account', '/explore/cards', '/privacy-temp', '/terms-of-trade'])(
    'treats %s as private',
    (p) => expect(isPublicPath(p)).toBe(false),
  );
});

describe('resolveRequestLocale', () => {
  it('lets the URL prefix win for anonymous visitors on public paths', () => {
    expect(
      resolveRequestLocale({ pathname: '/en/privacy', isSignedIn: false, cookieLocale: 'zh-TW' }),
    ).toBe('en');
  });

  it('ignores the prefix on private paths so it cannot clobber the cookie', () => {
    expect(
      resolveRequestLocale({ pathname: '/en/records', isSignedIn: false, cookieLocale: 'zh-TW' }),
    ).toBe('zh-TW');
  });

  it('keeps preference-first resolution for signed-in users', () => {
    expect(
      resolveRequestLocale({ pathname: '/en/privacy', isSignedIn: true, cookieLocale: 'zh-TW' }),
    ).toBe('zh-TW');
  });

  it('falls back to the profile preference for signed-in users without a cookie', () => {
    expect(
      resolveRequestLocale({
        pathname: '/en/privacy',
        isSignedIn: true,
        profileLocalePreference: 'ja',
      }),
    ).toBe('ja');
  });

  it('uses the prefix for anonymous visitors without a cookie', () => {
    expect(resolveRequestLocale({ pathname: '/ja/terms', isSignedIn: false })).toBe('ja');
  });

  it('defaults when no source resolves', () => {
    expect(resolveRequestLocale({ pathname: '/records', isSignedIn: true })).toBe(DEFAULT_LOCALE);
    expect(
      resolveRequestLocale({ pathname: '/privacy', isSignedIn: false, cookieLocale: 'xx' }),
    ).toBe(DEFAULT_LOCALE);
  });
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
