import { withAuth } from '@workos-inc/authkit-nextjs';
import { ExploreEntryContent } from './ExploreEntryContent';

export const metadata = {
  title: '探索情緒',
  description: '透過浪潮情緒卡，探索與覺察自己的情緒。',
};

export default async function ExplorePage() {
  await withAuth({ ensureSignedIn: true });

  return <ExploreEntryContent />;
}
