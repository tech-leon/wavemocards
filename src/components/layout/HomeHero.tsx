'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion } from '@/components/ui/motion';
import { handleSignUp } from '@/lib/auth';

interface HomeHeroProps {
  isLoggedIn: boolean;
}

export function HomeHero({ isLoggedIn }: HomeHeroProps) {
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

  return (
    <main
      className="homepage flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage }}
    >
      <div className="container px-4 md:px-[72px]">
        <motion.h2
          className="pt-14 text-left text-5xl font-bold text-white text-nowrap md:text-8xl"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        >
          找尋自我
        </motion.h2>
        <motion.h2
          className="mb-8 pt-6 text-right text-5xl font-bold text-white text-nowrap md:text-8xl"
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
              href="/about-emotions"
              className="rounded-full border-4 border-white bg-pink px-12 py-3 text-2xl font-bold text-white transition-colors hover:bg-pink-dark md:text-3xl"
            >
              認識情緒
            </Link>
          ) : (
            <form action={handleSignUp}>
              <button
                type="submit"
                className="cursor-pointer rounded-full bg-pink px-12 py-3 text-2xl font-bold text-white transition-colors hover:bg-pink-dark md:text-3xl"
              >
                前往註冊
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}
