'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import { AuthNavigationButton } from '@/components/auth/AuthNavigationButton';
import { motion } from '@/components/ui/motion';
import { buildAuthHref, buildCurrentReturnTo } from '@/lib/auth-routing';
import { localizeHref, type Locale } from '@/lib/i18n/locale';

interface HomeHeroProps {
  isLoggedIn: boolean;
  locale: Locale;
}

export function HomeHero({ isLoggedIn, locale }: HomeHeroProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const backgroundImage =
    mounted && resolvedTheme === 'dark'
      ? "url('/images/bg-dark.svg')"
      : "url('/images/bg-light.svg')";
  const aboutHref = localizeHref('/about-emotions', locale);
  const signUpHref = buildAuthHref('sign-up', buildCurrentReturnTo(pathname, searchParams));

  return (
    <main
      className="homepage flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage }}
    >
      <div className="container px-4 md:px-[72px]">
        <motion.h2
          className="type-hero-display mb-0 pt-14 text-left font-bold !text-white text-nowrap"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        >
          找尋自我
        </motion.h2>
        <motion.h2
          className="type-hero-display mb-8 pt-6 text-right font-bold !text-white text-nowrap"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
        >
          情緒的浪潮
        </motion.h2>
        <motion.div
          className="flex w-full justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.9 }}
        >
          {isLoggedIn ? (
            <Link
              href={aboutHref}
              className="type-hero-cta rounded-full border-4 border-white bg-pink px-12 py-3 text-white transition-colors hover:bg-pink-dark"
            >
              認識情緒
            </Link>
          ) : (
            <AuthNavigationButton
              href={signUpHref}
              className="type-hero-cta rounded-full bg-pink px-12 py-3 text-white transition-colors hover:bg-pink-dark"
            >
              前往註冊
            </AuthNavigationButton>
          )}
        </motion.div>
      </div>
    </main>
  );
}
