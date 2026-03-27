import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { getTranslations } from 'next-intl/server';

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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.records');

  return {
    title: t('analysisTitle'),
    description: t('analysisDescription'),
  };
}

export default async function RecordAnalysisPage() {
  await withAuth({ ensureSignedIn: true });

  return <RecordAnalysis />;
}
