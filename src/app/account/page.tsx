import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { AccountProfile } from '@/components/account';

export const metadata: Metadata = {
  title: '浪潮情緒卡｜我的帳戶',
  description: '管理你的帳戶設定和個人資料',
};

export default async function AccountPage() {
  // Require authentication
  const { user } = await withAuth();

  if (!user) {
    redirect('/login');
  }

  return <AccountProfile />;
}
