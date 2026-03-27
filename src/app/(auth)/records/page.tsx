import type { Metadata } from 'next';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { getTranslations } from 'next-intl/server';
import { RecordsList } from '@/components/records';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.records');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function RecordsPage() {
  await withAuth({ ensureSignedIn: true });

  return <RecordsList />;
}
