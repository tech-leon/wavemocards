'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, Settings, LogOut, Home, Heart, BookOpen, FolderOpen } from 'lucide-react';
import { handleSignOut, handleSignIn, handleSignUp } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from '@/components/ui/motion';

interface MobileNavProps {
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  } | null;
}

export function MobileNav({ user }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

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
        aria-label="Toggle menu"
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
              aria-label="行動裝置導覽選單"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.26, ease: 'easeOut' }}
            >
              <nav aria-label="行動裝置導覽">
                {user ? (
                  <ul className="space-y-2">
                    <li>
                      <Link href="/about-emotions" onClick={closeMenu} className={mobileItemClass}>
                        <BookOpen className="size-5" />
                        <span>認識情緒</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/explore" onClick={closeMenu} className={mobileItemClass}>
                        <Heart className="size-5" />
                        <span>探索情緒</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/records" onClick={closeMenu} className={mobileItemClass}>
                        <FolderOpen className="size-5" />
                        <span>我的紀錄</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/emo-cards" onClick={closeMenu} className={mobileItemClass}>
                        <BookOpen className="size-5" />
                        <span>情緒卡</span>
                      </Link>
                    </li>
                    <li className="mt-4 border-t border-gray-300 pt-4 dark:border-gray-700">
                      <Link href="/account" onClick={closeMenu} className={mobileItemClass}>
                        <Settings className="size-5" />
                        <span>帳戶設定</span>
                      </Link>
                    </li>
                    <li>
                      <form action={handleSignOut}>
                        <button type="submit" onClick={closeMenu} className={`${mobileItemClass} w-full`}>
                          <LogOut className="size-5" />
                          <span>登出</span>
                        </button>
                      </form>
                    </li>
                  </ul>
                ) : (
                  <ul className="space-y-2">
                    <li>
                      <Link href="/" onClick={closeMenu} className={mobileItemClass}>
                        <Home className="size-5" />
                        <span>首頁</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/about-emotions" onClick={closeMenu} className={mobileItemClass}>
                        <BookOpen className="size-5" />
                        <span>認識情緒</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/emo-cards" onClick={closeMenu} className={mobileItemClass}>
                        <BookOpen className="size-5" />
                        <span>情緒卡</span>
                      </Link>
                    </li>
                    <li className="mt-4 border-t border-gray-300 pt-4 dark:border-gray-700">
                      <form action={handleSignIn}>
                        <Button
                          type="submit"
                          onClick={closeMenu}
                          variant="outline"
                          className="w-full rounded-full border-2 border-main text-main hover:bg-main hover:text-white"
                        >
                          登入
                        </Button>
                      </form>
                    </li>
                    <li>
                      <form action={handleSignUp}>
                        <Button type="submit" onClick={closeMenu} className="w-full rounded-full bg-pink text-white hover:bg-pink-dark">
                          註冊
                        </Button>
                      </form>
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
