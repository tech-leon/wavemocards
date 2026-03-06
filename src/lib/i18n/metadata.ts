import 'server-only';

import type { Metadata } from 'next';
import { getRequestLocale } from './request';
import { getOpenGraphLocale, localizeHref } from './locale';

interface PublicMetadataOptions {
  pathname: string;
  title: string;
  description: string;
  keywords?: string[];
}

export async function createPublicMetadata({
  pathname,
  title,
  description,
  keywords,
}: PublicMetadataOptions): Promise<Metadata> {
  const locale = await getRequestLocale();
  const canonical = localizeHref(pathname, locale);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        'zh-TW': pathname,
        en: localizeHref(pathname, 'en'),
        ja: localizeHref(pathname, 'ja'),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: getOpenGraphLocale(locale),
    },
    twitter: {
      title,
      description,
    },
  };
}
