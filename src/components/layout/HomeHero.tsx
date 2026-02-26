'use client';

import Link from 'next/link';
import { motion } from '@/components/ui/motion';
import { handleSignUp } from '@/lib/auth';

interface HomeHeroProps {
  isLoggedIn: boolean;
}

export function HomeHero({ isLoggedIn }: HomeHeroProps) {
  return (
      <main className="homepage flex flex-col justify-center items-center min-h-[calc(100vh-64px)] bg-[url('/images/homepage.svg')] bg-cover bg-center bg-no-repeat">
        <div className="container px-4 md:px-[72px]">
          <motion.h2
            className="pt-14 text-white text-nowrap text-left md:text-left text-5xl md:text-8xl font-bold"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            找尋自我
          </motion.h2>
          <motion.h2
            className="pt-6 text-white text-nowrap text-right md:text-right mb-8 text-5xl md:text-8xl font-bold"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
          >
            情緒的浪潮
          </motion.h2>
          <motion.div
            className="flex justify-center w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.9 }}
          >
            {isLoggedIn ? (
              <Link
                href="/about-emotions"
                className="px-12 py-3 bg-pink hover:bg-pink-dark text-white font-bold text-2xl md:text-3xl rounded-full border-4 border-white transition-colors"
              >
                認識情緒
              </Link>
            ) : (
              <form action={handleSignUp}>
                <button
                  type="submit"
                  className="px-12 py-3 bg-pink hover:bg-pink-dark text-white font-bold text-2xl md:text-3xl rounded-full transition-colors cursor-pointer"
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
