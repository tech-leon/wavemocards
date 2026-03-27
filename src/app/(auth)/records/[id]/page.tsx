import type { Metadata } from 'next';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { getTranslations } from 'next-intl/server';
import { RecordDetail } from '@/components/records';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.records');

  return {
    title: t('detailTitle'),
    description: t('detailDescription'),
  };
}

export default async function RecordDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await withAuth({ ensureSignedIn: true });

  const { id } = await params;

  return <RecordDetail recordId={id} />;
}
