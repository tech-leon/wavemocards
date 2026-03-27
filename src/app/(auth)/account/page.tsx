import type { Metadata } from 'next';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { getTranslations } from 'next-intl/server';
import { AccountProfile } from '@/components/account';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.account');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AccountPage() {
  await withAuth({ ensureSignedIn: true });

  return <AccountProfile />;
}
