import { normalizePathname } from '@/lib/i18n/locale';

export type AuthScreenHint = 'sign-in' | 'sign-up';

interface BuildAuthHrefOptions {
  force?: boolean;
}

type SearchParamsLike =
  | { toString(): string }
  | string
  | null
  | undefined;

function getSearchString(searchParams?: SearchParamsLike): string {
  if (!searchParams) {
    return '';
  }

  if (typeof searchParams === 'string') {
    return searchParams.startsWith('?') ? searchParams.slice(1) : searchParams;
  }

  return searchParams.toString();
}

export function sanitizeReturnTo(returnTo?: string | null): string {
  if (!returnTo) {
    return '/';
  }

  const trimmed = returnTo.trim();
  if (!trimmed.startsWith('/') || trimmed.startsWith('//')) {
    return '/';
  }

  try {
    const parsedUrl = new URL(trimmed, 'https://wavemocards.local');
    const pathname = normalizePathname(parsedUrl.pathname);
    return `${pathname}${parsedUrl.search}`;
  } catch {
    return '/';
  }
}

export function buildCurrentReturnTo(pathname: string, searchParams?: SearchParamsLike): string {
  const safePathname = sanitizeReturnTo(pathname);
  const search = getSearchString(searchParams);

  if (!search) {
    return safePathname;
  }

  return `${safePathname}?${search}`;
}

export function buildAuthHref(
  screenHint: AuthScreenHint,
  returnTo: string,
  options: BuildAuthHrefOptions = {},
): string {
  const params = new URLSearchParams({
    returnTo: sanitizeReturnTo(returnTo),
  });

  if (options.force) {
    params.set('force', '1');
  }

  return `/auth/${screenHint}?${params.toString()}`;
}

export function buildSignOutHref(returnTo: string): string {
  const params = new URLSearchParams({
    returnTo: sanitizeReturnTo(returnTo),
  });

  return `/auth/sign-out?${params.toString()}`;
}
