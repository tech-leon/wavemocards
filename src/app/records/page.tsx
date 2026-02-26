import type { Metadata } from 'next';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirectToSignIn } from '@/lib/auth';
import { RecordsList } from '@/components/records';

export const metadata: Metadata = {
  title: '浪潮情緒卡｜我的紀錄',
  description: '查看和管理你的情緒紀錄',
};

export default async function RecordsPage() {
  // Require authentication
  const { user } = await withAuth();

  if (!user) {
    await redirectToSignIn();
  }

  return <RecordsList />;
}
