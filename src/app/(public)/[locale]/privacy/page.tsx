import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LegalPage } from '@/components/legal/LegalPage';
import { createPublicMetadata } from '@/lib/i18n/metadata';
import { resolveLocale } from '@/lib/i18n/locale';

interface PrivacyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale('/', rawLocale);
  const t = await getTranslations({ locale, namespace: 'meta.privacy' });

  return createPublicMetadata({
    pathname: '/privacy',
    title: t('title'),
    description: t('description'),
    locale,
  });
}

export default function PrivacyPage() {
  return <LegalPage page="privacy" />;
}
