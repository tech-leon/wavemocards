import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirectToSignIn } from '@/lib/auth';
import { ExploreCompleteContent } from './ExploreCompleteContent';

export const metadata = {
  title: '浪潮情緒卡｜謝謝自己',
  description: '感謝自己與情緒浪潮同在。',
};

export default async function ExploreCompletePage() {
  let user = null;
  try {
    const auth = await withAuth();
    user = auth.user;
  } catch {
    // not authenticated
  }

  if (!user) {
    await redirectToSignIn();
    return null;
  }

  return <ExploreCompleteContent userName={user.firstName || ''} />;
}
