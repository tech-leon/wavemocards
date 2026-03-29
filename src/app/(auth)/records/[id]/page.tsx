import type { Metadata } from 'next';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { getTranslations } from 'next-intl/server';
import { getRecord } from '@/lib/records-actions';
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
  const record = await getRecord(id);

  if (!record) {
    const t = await getTranslations('records.detail');
    return (
      <div className="type-subsection-title py-20 text-center text-gray-500 dark:text-gray-300">
        {t('empty.notFound')}
      </div>
    );
  }

  return <RecordDetail recordId={id} initialRecord={record} />;
}
