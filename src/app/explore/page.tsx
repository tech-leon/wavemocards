import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirectToSignIn } from '@/lib/auth';
import { ExploreEntryContent } from './ExploreEntryContent';

export const metadata = {
  title: '探索情緒',
  description: '透過浪潮情緒卡，探索與覺察自己的情緒。',
};

export default async function ExplorePage() {
  let user = null;
  try {
    const auth = await withAuth();
    user = auth.user;
  } catch {
    // not authenticated
  }

  if (!user) {
    await redirectToSignIn();
  }

  return <ExploreEntryContent />;
}
