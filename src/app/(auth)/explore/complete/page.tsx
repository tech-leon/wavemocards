import { withAuth } from '@workos-inc/authkit-nextjs';
import { ExploreCompleteContent } from '@/app/explore/complete/ExploreCompleteContent';

export const metadata = {
  title: '浪潮情緒卡｜謝謝自己',
  description: '感謝自己與情緒浪潮同在。',
};

export default async function ExploreCompletePage() {
  const { user } = await withAuth({ ensureSignedIn: true });
  const userName = user.firstName?.trim() || '你';

  return <ExploreCompleteContent userName={userName} />;
}
