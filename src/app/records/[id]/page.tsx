import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { RecordDetail } from '@/components/records';

export const metadata: Metadata = {
  title: '浪潮情緒卡｜我的紀錄｜情緒故事',
  description: '查看和編輯情緒故事詳情',
};

export default async function RecordDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Require authentication
  const { user } = await withAuth();

  if (!user) {
    redirect('/login');
  }

  const { id } = await params;

  return <RecordDetail recordId={id} />;
}
