'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import { Menu, X, Settings, LogOut, Home, Heart, BookOpen, FolderOpen } from 'lucide-react';
import { AuthNavigationButton } from '@/components/auth/AuthNavigationButton';
import { buildAuthHref, buildCurrentReturnTo, buildSignOutHref } from '@/lib/auth-routing';
import { motion, AnimatePresence } from '@/components/ui/motion';
import { localizeHref, type Locale } from '@/lib/i18n/locale';
import { LanguageSwitcher } from './LanguageSwitcher';

interface MobileNavProps {
  locale: Locale;
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  } | null;
}

export function MobileNav({ locale, user }: MobileNavProps) {
  const t = useTranslations('layout.mobileNav');
  const tAria = useTranslations('aria');
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const aboutHref = localizeHref('/about-emotions', locale);
  const emoCardsHref = localizeHref('/emo-cards', locale);
  const homeHref = localizeHref('/', locale);
  const currentReturnTo = buildCurrentReturnTo(pathname, searchParams);
  const signInHref = buildAuthHref('sign-in', currentReturnTo);
  const signUpHref = buildAuthHref('sign-up', currentReturnTo);
  const signOutHref = buildSignOutHref(homeHref);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const mobileItemClass =
    'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-800 transition-colors hover:bg-gray-200/70 hover:text-main dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-main-tint01';

  return (
    <>
      <button
        type="button"
        onClick={toggleMenu}
        className="inline-flex rounded-md p-2 text-gray-800 transition-colors hover:bg-gray-200/70 hover:text-main dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-main-tint01"
        aria-label={tAria('toggleMenu')}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/45 lg:hidden"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            <motion.div
              className="fixed right-0 top-[73px] z-50 h-[calc(100dvh-73px)] w-[min(85vw,360px)] overflow-y-auto border-l border-gray-200 bg-gray-100 p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900 lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label={tAria('mobileNavigationMenu')}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.26, ease: 'easeOut' }}
            >
              <div className="mb-4 border-b border-gray-300 pb-4 dark:border-gray-700">
                <LanguageSwitcher
                  locale={locale}
                  isAuthenticated={Boolean(user)}
                  onChanged={closeMenu}
                  className="flex w-full"
                  selectClassName="type-button h-10 w-full rounded-full border border-gray-300 bg-transparent px-4 text-gray-800 transition-colors hover:border-main hover:text-main disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:text-gray-100 dark:hover:border-main dark:hover:text-main"
                />
              </div>
              <nav aria-label={tAria('mobileNavigation')}>
                {user ? (
                  <ul className="space-y-2">
                    <li>
                      <Link href={aboutHref} onClick={closeMenu} className={mobileItemClass}>
                        <BookOpen className="size-5" />
                        <span>{t('links.aboutEmotions')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/explore" onClick={closeMenu} className={mobileItemClass}>
                        <Heart className="size-5" />
                        <span>{t('links.explore')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/records" onClick={closeMenu} className={mobileItemClass}>
                        <FolderOpen className="size-5" />
                        <span>{t('links.records')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={emoCardsHref} onClick={closeMenu} className={mobileItemClass}>
                        <BookOpen className="size-5" />
                        <span>{t('links.emoCards')}</span>
                      </Link>
                    </li>
                    <li className="mt-4 border-t border-gray-300 pt-4 dark:border-gray-700">
                      <Link href="/account" onClick={closeMenu} className={mobileItemClass}>
                        <Settings className="size-5" />
                        <span>{t('links.account')}</span>
                      </Link>
                    </li>
                    <li>
                      <AuthNavigationButton
                        href={signOutHref}
                        onNavigate={closeMenu}
                        className={`${mobileItemClass} w-full`}
                      >
                          <LogOut className="size-5" />
                          <span>{t('links.signOut')}</span>
                      </AuthNavigationButton>
                    </li>
                  </ul>
                ) : (
                  <ul className="space-y-2">
                    <li>
                      <Link href={homeHref} onClick={closeMenu} className={mobileItemClass}>
                        <Home className="size-5" />
                        <span>{t('links.home')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={aboutHref} onClick={closeMenu} className={mobileItemClass}>
                        <BookOpen className="size-5" />
                        <span>{t('links.aboutEmotions')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={emoCardsHref} onClick={closeMenu} className={mobileItemClass}>
                        <BookOpen className="size-5" />
                        <span>{t('links.emoCards')}</span>
                      </Link>
                    </li>
                    <li className="mt-4 border-t border-gray-300 pt-4 dark:border-gray-700">
                      <AuthNavigationButton
                        href={signInHref}
                        onNavigate={closeMenu}
                        className="type-button inline-flex h-9 w-full items-center justify-center rounded-full border-2 border-main bg-background px-4 py-2 text-main shadow-xs transition-all hover:bg-main hover:text-white disabled:pointer-events-none disabled:opacity-50 dark:bg-input/30 dark:border-input dark:hover:bg-main"
                      >
                        {t('links.signIn')}
                      </AuthNavigationButton>
                    </li>
                    <li>
                      <AuthNavigationButton
                        href={signUpHref}
                        onNavigate={closeMenu}
                        className="type-button inline-flex h-9 w-full items-center justify-center rounded-full bg-pink px-4 py-2 text-white transition-all hover:bg-pink-dark disabled:pointer-events-none disabled:opacity-50"
                      >
                        {t('links.signUp')}
                      </AuthNavigationButton>
                    </li>
                  </ul>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
