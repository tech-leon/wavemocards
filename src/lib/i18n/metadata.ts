import 'server-only';

import type { Metadata } from 'next';
import type { Locale } from './locale';
import { getRequestLocale } from './request';
import { getOpenGraphLocale, localizeHref } from './locale';

interface PublicMetadataOptions {
  pathname: string;
  title: string;
  description: string;
  keywords?: string[];
  locale?: Locale;
}

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wavemocards.com';

export function buildPublicUrl(pathname: string, locale: Locale): string {
  return new URL(localizeHref(pathname, locale), siteUrl).toString();
}

export function buildLanguageAlternates(pathname: string): Record<Locale, string> {
  return {
    'zh-TW': buildPublicUrl(pathname, 'zh-TW'),
    en: buildPublicUrl(pathname, 'en'),
    ja: buildPublicUrl(pathname, 'ja'),
  };
}

export async function createPublicMetadata({
  pathname,
  title,
  description,
  keywords,
  locale: requestedLocale,
}: PublicMetadataOptions): Promise<Metadata> {
  const locale = requestedLocale ?? await getRequestLocale();
  const canonical = buildPublicUrl(pathname, locale);
  const alternates = buildLanguageAlternates(pathname);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: getOpenGraphLocale(locale),
      alternateLocale: (['zh-TW', 'en', 'ja'] as const)
        .filter((item) => item !== locale)
        .map((item) => getOpenGraphLocale(item)),
    },
    twitter: {
      title,
      description,
    },
  };
}
