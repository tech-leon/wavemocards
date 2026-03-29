import type { Metadata } from 'next';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { getTranslations } from 'next-intl/server';
import { getUserProfile } from '@/lib/profile';
import { AccountProfile } from '@/components/account';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.account');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AccountPage() {
  const { user } = await withAuth({ ensureSignedIn: true });
  const profile = await getUserProfile();

  if (!profile) {
    const t = await getTranslations('account.profile');
    return (
      <div className="py-20 text-center text-gray-500 dark:text-gray-300 text-lg">{t('empty.loadFailed')}</div>
    );
  }

  return <AccountProfile initialProfile={profile} email={user.email} />;
}
