'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import { Menu, X, Settings, LogOut, Home, Heart, BookOpen, FolderOpen } from 'lucide-react';
import { AuthNavigationButton } from '@/components/auth/AuthNavigationButton';
import { buttonVariants } from '@/components/ui/button';
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
  const tLanguage = useTranslations('languageSwitcher');
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
    'flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-muted/70 hover:text-main dark:hover:text-main-tint01';

  return (
    <>
      <button
        type="button"
        onClick={toggleMenu}
        className="inline-flex rounded-md p-2 text-foreground transition-colors hover:bg-muted/70 hover:text-main dark:hover:text-main-tint01"
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
              className="fixed right-0 top-[73px] z-50 h-[calc(100dvh-73px)] w-[min(85vw,360px)] overflow-y-auto border-l border-border bg-background p-6 shadow-xl lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label={tAria('mobileNavigationMenu')}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.26, ease: 'easeOut' }}
            >
              <div className="mb-4 border-b border-border pb-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="type-button text-foreground">{tLanguage('label')}</p>
                  <LanguageSwitcher
                    locale={locale}
                    isAuthenticated={Boolean(user)}
                    onChanged={closeMenu}
                    className="inline-flex"
                    triggerClassName="h-10 w-10 border-input text-foreground"
                  />
                </div>
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
                    <li className="mt-4 border-t border-border pt-4">
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
                    <li className="mt-4 border-t border-border pt-4">
                      <AuthNavigationButton
                        href={signInHref}
                        onNavigate={closeMenu}
                        className={`${buttonVariants({ variant: 'main-outline' })} w-full`}
                      >
                        {t('links.signIn')}
                      </AuthNavigationButton>
                    </li>
                    <li>
                      <AuthNavigationButton
                        href={signUpHref}
                        onNavigate={closeMenu}
                        className={`${buttonVariants({ variant: 'pink' })} w-full`}
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
