import 'server-only';

import { cookies, headers } from 'next/headers';
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  LOCALE_HEADER_NAME,
  type Locale,
  resolveLocale,
} from './locale';

export async function getRequestLocale(): Promise<Locale> {
  const headerStore = await headers();
  const headerLocale = headerStore.get(LOCALE_HEADER_NAME);

  if (headerLocale) {
    return resolveLocale('/', headerLocale);
  }

  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;

  return resolveLocale('/', cookieLocale ?? DEFAULT_LOCALE);
}
