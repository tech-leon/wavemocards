import { withAuth } from '@workos-inc/authkit-nextjs';
import { ExploreCompleteContent } from './ExploreCompleteContent';

export const metadata = {
  title: '浪潮情緒卡｜謝謝自己',
  description: '感謝自己與情緒浪潮同在。',
};

export default async function ExploreCompletePage() {
  const { user } = await withAuth({ ensureSignedIn: true });

  return <ExploreCompleteContent userName={user.firstName || ''} />;
}
