import { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/locale';
import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: ReactNode;
  locale: Locale;
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  } | null;
}

export async function MainLayout({ children, locale, user }: MainLayoutProps) {
  const t = await getTranslations('aria');

  return (
    <div className="grid min-h-dvh grid-rows-[auto_minmax(0,1fr)_auto] grid-cols-[minmax(0,1fr)] bg-gray-100 dark:bg-gray-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:px-4 focus:py-2 focus:bg-main focus:text-white focus:rounded-md focus:outline-none"
      >
        {t('skipToMainContent')}
      </a>
      <Header locale={locale} user={user} />
      <main id="main-content" className="min-h-0 flex flex-col min-h-[calc(100dvh-68px)] lg:min-h-[calc(100dvh-77px)] bg-gray-100 dark:bg-gray-900 overflow-x-clip" role="main">
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  );
}
