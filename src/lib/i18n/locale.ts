export const DEFAULT_LOCALE = 'zh-TW' as const;
export const PUBLIC_LOCALES = [DEFAULT_LOCALE, 'en', 'ja'] as const;
export const SUPPORTED_LOCALES = PUBLIC_LOCALES;

export const LOCALE_COOKIE_NAME = 'locale';
export const LOCALE_HEADER_NAME = 'x-wavemocards-locale';

export type Locale = (typeof SUPPORTED_LOCALES)[number];
export type PublicLocale = Locale;

const PUBLIC_ROUTE_PREFIXES = ['/about-emotions', '/emo-cards'] as const;

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function isLocale(value: string | null | undefined): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export function isPublicLocale(value: string | null | undefined): value is PublicLocale {
  return PUBLIC_LOCALES.includes(value as PublicLocale);
}

export function extractLocaleFromPathname(pathname: string): {
  pathname: string;
  locale: Locale | null;
} {
  const normalizedPathname = normalizePathname(pathname);

  if (normalizedPathname === '/') {
    return { pathname: '/', locale: null };
  }

  const segments = normalizedPathname.split('/');
  const firstSegment = segments[1];

  if (!isLocale(firstSegment)) {
    return { pathname: normalizedPathname, locale: null };
  }

  const strippedPathname = `/${segments.slice(2).join('/')}`;

  return {
    pathname: normalizePathname(strippedPathname),
    locale: firstSegment,
  };
}

function isPublicPathWithoutLocale(pathname: string): boolean {
  return (
    pathname === '/' ||
    PUBLIC_ROUTE_PREFIXES.some(
      (prefix) =>
        pathname === prefix || pathname.startsWith(`${prefix}/`)
    )
  );
}

export function stripLocaleFromPathname(pathname: string): { pathname: string; locale: PublicLocale | null } {
  const { pathname: normalizedStrippedPathname, locale } = extractLocaleFromPathname(pathname);

  if (!locale || !isPublicPathWithoutLocale(normalizedStrippedPathname)) {
    return { pathname: normalizePathname(pathname), locale: null };
  }

  return {
    pathname: normalizedStrippedPathname,
    locale,
  };
}

export function isPublicPath(pathname: string): boolean {
  const { pathname: normalizedPathname } = stripLocaleFromPathname(pathname);

  return isPublicPathWithoutLocale(normalizedPathname);
}

export function resolveLocale(pathname: string, cookieLocale?: string | null): Locale {
  const { locale: pathLocale } = stripLocaleFromPathname(pathname);

  if (pathLocale) {
    return pathLocale;
  }

  if (isLocale(cookieLocale)) {
    return cookieLocale;
  }

  return DEFAULT_LOCALE;
}

export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith('/')) {
    return href;
  }

  const match = href.match(/^([^?#]*)(.*)$/);
  const rawPathname = match?.[1] || href;
  const suffix = match?.[2] || '';
  const { pathname } = stripLocaleFromPathname(rawPathname);
  const normalizedPathname = normalizePathname(pathname);

  if (!isPublicPath(normalizedPathname)) {
    return `${normalizedPathname}${suffix}`;
  }

  const localePrefix = `/${locale}`;

  if (normalizedPathname === '/') {
    return `${localePrefix}${suffix}`;
  }

  return `${localePrefix}${normalizedPathname}${suffix}`;
}

export function getOpenGraphLocale(locale: Locale): string {
  switch (locale) {
    case 'en':
      return 'en_US';
    case 'ja':
      return 'ja_JP';
    default:
      return 'zh_TW';
  }
}
