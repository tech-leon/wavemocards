import type { MetadataRoute } from 'next';
import { getEmotionCategories } from '@/lib/emotions';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wavemocards.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic routes
  const categories = await getEmotionCategories();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/about-emotions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/emo-cards`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic routes: emotion card categories
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/emo-cards/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes];
}
