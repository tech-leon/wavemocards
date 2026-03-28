import type { Metadata } from 'next';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { getTranslations } from 'next-intl/server';
import { ExploreEntryContent } from '@/app/explore/ExploreEntryContent';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.explore.entry');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ExplorePage() {
  await withAuth({ ensureSignedIn: true });

  return <ExploreEntryContent />;
}
