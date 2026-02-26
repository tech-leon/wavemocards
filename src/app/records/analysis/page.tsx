import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirectToSignIn } from '@/lib/auth';

const RecordAnalysis = dynamic(() =>
  import('@/components/records').then((mod) => ({ default: mod.RecordAnalysis })),
  {
    loading: () => (
      <div className="py-20 flex justify-center">
        <div className="w-8 h-8 border-4 border-main-tint02 border-t-main rounded-full animate-spin" />
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: '浪潮情緒卡｜我的紀錄｜分析',
  description: '分析你的情緒紀錄，查看情緒類組次數和比例',
};

export default async function RecordAnalysisPage() {
  // Require authentication
  const { user } = await withAuth();

  if (!user) {
    await redirectToSignIn();
  }

  return <RecordAnalysis />;
}
