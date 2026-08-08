import type { Metadata } from 'next';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { getTranslations } from 'next-intl/server';
import { ExploreCompleteContent } from '@/app/explore/complete/ExploreCompleteContent';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.explore.complete');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ExploreCompletePage() {
  const { user } = await withAuth({ ensureSignedIn: true });
  const tCommon = await getTranslations('common.labels');
  const userName = user.firstName?.trim() || tCommon('defaultUserName');

  return <ExploreCompleteContent userName={userName} />;
}
