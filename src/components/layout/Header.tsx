'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import { Settings, LogOut } from 'lucide-react';
import { AuthNavigationButton } from '@/components/auth/AuthNavigationButton';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { buildAuthHref, buildCurrentReturnTo, buildSignOutHref } from '@/lib/auth-routing';
import { localizeHref, type Locale } from '@/lib/i18n/locale';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileNav } from './MobileNav';

interface HeaderProps {
  locale: Locale;
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  } | null;
}

export function Header({ locale, user }: HeaderProps) {
  const t = useTranslations('layout.header');
  const tAria = useTranslations('aria');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAuthenticated = Boolean(user);
  const aboutHref = localizeHref('/about-emotions', locale);
  const homeHref = localizeHref('/', locale);
  const currentReturnTo = buildCurrentReturnTo(pathname, searchParams);
  const signInHref = buildAuthHref('sign-in', currentReturnTo);
  const signUpHref = buildAuthHref('sign-up', currentReturnTo);
  const signOutHref = buildSignOutHref(homeHref);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const navLinkClass = (href: string) =>
    `type-button rounded-md px-3 py-2 transition-colors ${
      isCurrent(href)
        ? 'text-main'
        : 'text-slate-800 hover:text-main dark:text-slate-100 dark:hover:text-main-tint01'
    }`;

  return (
    <header
      className="sticky top-0 z-50 shadow-md backdrop-blur-sm bg-slate-100 dark:bg-slate-800"
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="hidden items-center gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <nav className="flex items-center gap-1" aria-label={tAria('mainNavigation')}>
            {user ? (
              <>
                <Link href={aboutHref} className={navLinkClass(aboutHref)}>
                  {t('links.aboutEmotions')}
                </Link>
                <Link href="/explore" className={navLinkClass('/explore')}>
                  {t('links.explore')}
                </Link>
                <Link href="/records" className={navLinkClass('/records')}>
                  {t('links.records')}
                </Link>
              </>
            ) : (
              <Link href={aboutHref} className={navLinkClass(aboutHref)}>
                {t('links.aboutEmotions')}
              </Link>
            )}
          </nav>

          <h1>
            <Link href={homeHref} className="group block h-[45px] w-[200px]">
              <span className="sr-only">{tAria('brand')}</span>
              <span
                aria-hidden="true"
                className="block h-full w-full bg-[url('/images/logo_name.svg')] bg-contain bg-center bg-no-repeat"
              />
            </Link>
          </h1>

          <div className="flex items-center justify-end gap-2">
            {user ? (
              <>
                <Link
                  href="/account"
                  className={`inline-flex rounded-md p-2 transition-colors ${
                    isCurrent('/account')
                      ? 'text-main'
                      : 'text-slate-800 hover:text-main dark:text-slate-100 dark:hover:text-main-tint01'
                  }`}
                >
                  <Settings className="size-5" strokeWidth={pathname === '/account' ? 2.5 : 2} />
                  <span className="sr-only">{t('sr.accountSettings')}</span>
                </Link>
                <AuthNavigationButton
                  href={signOutHref}
                  className="inline-flex rounded-md p-2 text-slate-800 transition-colors hover:text-main dark:text-slate-100 dark:hover:text-main-tint01"
                >
                  <LogOut className="size-5" />
                  <span className="sr-only">{t('sr.signOut')}</span>
                </AuthNavigationButton>
              </>
            ) : (
              <>
                <AuthNavigationButton
                  href={signInHref}
                  className="type-button inline-flex h-9 items-center justify-center rounded-full border-2 border-main bg-background px-4 py-2 text-main shadow-xs transition-all hover:bg-main hover:text-white disabled:pointer-events-none disabled:opacity-50 dark:bg-input/30 dark:border-input dark:hover:bg-main dark:hover:text-slate-900"
                >
                  {t('links.signIn')}
                </AuthNavigationButton>
                <AuthNavigationButton
                  href={signUpHref}
                  className="type-button inline-flex h-9 items-center justify-center rounded-full bg-pink px-4 py-2 text-white transition-all hover:bg-pink-dark disabled:pointer-events-none disabled:opacity-50"
                >
                  {t('links.signUp')}
                </AuthNavigationButton>
              </>
            )}
            <LanguageSwitcher
              locale={locale}
              isAuthenticated={isAuthenticated}
              className="inline-flex"
              selectClassName="type-button h-9 rounded-full border border-slate-300 bg-transparent px-3 text-slate-800 transition-colors hover:border-main hover:text-main disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:text-slate-100 dark:hover:border-main dark:hover:text-main"
            />
            <ThemeToggle isAuthenticated={isAuthenticated} />
          </div>
        </div>

        <div className="flex items-center justify-between lg:hidden">
          <Link href={homeHref} className="block h-[36px] w-[150px]">
            <span className="sr-only">{tAria('brand')}</span>
            <span
              aria-hidden="true"
              className="block h-full w-full bg-[url('/images/logo_name.svg')] bg-contain bg-left bg-no-repeat"
            />
          </Link>
          <div className="flex items-center gap-1">
            <ThemeToggle isAuthenticated={isAuthenticated} />
            <MobileNav locale={locale} user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}
