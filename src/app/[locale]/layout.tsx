import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { PUBLIC_LOCALES, isPublicLocale } from '@/lib/i18n/locale';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return PUBLIC_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isPublicLocale(locale)) {
    notFound();
  }

  return children;
}
