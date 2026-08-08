import { withAuth } from '@workos-inc/authkit-nextjs';
import { getTranslations } from 'next-intl/server';
import { ExploreStoryBackgroundContent } from '@/app/explore/story/background/ExploreStoryBackgroundContent';

export default async function ExploreStoryBackgroundPage() {
  const { user } = await withAuth({ ensureSignedIn: true });
  const t = await getTranslations('common.labels');
  const userName = user.firstName?.trim() || t('defaultUserName');

  return <ExploreStoryBackgroundContent userName={userName} />;
}
