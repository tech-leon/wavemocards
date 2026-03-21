import { withAuth } from '@workos-inc/authkit-nextjs';
import { ExploreStoryBackgroundContent } from '@/app/explore/story/background/ExploreStoryBackgroundContent';

export default async function ExploreStoryBackgroundPage() {
  const { user } = await withAuth({ ensureSignedIn: true });
  const userName = user.firstName?.trim() || '你';

  return <ExploreStoryBackgroundContent userName={userName} />;
}
