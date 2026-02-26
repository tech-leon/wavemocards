import type { Metadata } from 'next';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirectToSignIn } from '@/lib/auth';
import { AccountProfile } from '@/components/account';

export const metadata: Metadata = {
  title: '浪潮情緒卡｜我的帳戶',
  description: '管理你的帳戶設定和個人資料',
};

export default async function AccountPage() {
  // Require authentication
  const { user } = await withAuth();

  if (!user) {
    await redirectToSignIn();
  }

  return <AccountProfile />;
}
