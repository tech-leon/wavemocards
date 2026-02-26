import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wavemocards.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/explore/', '/records/', '/account/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
