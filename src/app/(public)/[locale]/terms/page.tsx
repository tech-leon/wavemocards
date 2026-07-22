import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LegalPage } from '@/components/legal/LegalPage';
import { createPublicMetadata } from '@/lib/i18n/metadata';
import { resolveLocale } from '@/lib/i18n/locale';

interface TermsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: TermsPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale('/', rawLocale);
  const t = await getTranslations({ locale, namespace: 'meta.terms' });

  return createPublicMetadata({
    pathname: '/terms',
    title: t('title'),
    description: t('description'),
    locale,
  });
}

export default function TermsPage() {
  return <LegalPage page="terms" />;
}
