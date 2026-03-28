import type { MetadataRoute } from 'next';
import { getEmotionCategories } from '@/lib/emotions';
import { DEFAULT_LOCALE } from '@/lib/i18n/locale';
import { buildLanguageAlternates, buildPublicUrl } from '@/lib/i18n/metadata';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getEmotionCategories(DEFAULT_LOCALE);
  const now = new Date();
  const createEntry = (
    pathname: string,
    priority: number,
  ): MetadataRoute.Sitemap[number] => ({
    url: buildPublicUrl(pathname, DEFAULT_LOCALE),
    lastModified: now,
    changeFrequency: 'monthly',
    priority,
    alternates: {
      languages: buildLanguageAlternates(pathname),
    },
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    createEntry('/', 1),
    createEntry('/about-emotions', 0.8),
    createEntry('/emo-cards', 0.8),
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) =>
    createEntry(`/emo-cards/${category.slug}`, 0.7)
  );

  return [...staticRoutes, ...categoryRoutes];
}
