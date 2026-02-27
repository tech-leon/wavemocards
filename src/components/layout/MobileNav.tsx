'use client';

import { useState } from 'react';
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

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="lg:hidden p-2 text-gray-800 dark:text-gray-100 hover:text-[#3C9DAE] transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Menu Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Mobile Menu */}
            <motion.div
              className="fixed top-[70px] right-0 h-full w-64 bg-gray-100 dark:bg-gray-900 shadow-lg z-50 lg:hidden border-l border-gray-200 dark:border-gray-700"
              role="dialog"
              aria-modal="true"
              aria-label="行動裝置導覽選單"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <nav className="p-6" aria-label="行動裝置導覽">
                {user ? (
                  // Logged in menu
                  <ul className="space-y-4">
                    <li>
                      <Link
                        href="/about-emotions"
                        onClick={closeMenu}
                        className="flex items-center gap-3 text-gray-800 dark:text-gray-100 hover:text-[#3C9DAE] transition-colors"
                      >
                        <BookOpen className="w-5 h-5" />
                        <span>認識情緒</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/explore"
                        onClick={closeMenu}
                        className="flex items-center gap-3 text-gray-800 dark:text-gray-100 hover:text-[#3C9DAE] transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                        <span>探索情緒</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/records"
                        onClick={closeMenu}
                        className="flex items-center gap-3 text-gray-800 dark:text-gray-100 hover:text-[#3C9DAE] transition-colors"
                      >
                        <FolderOpen className="w-5 h-5" />
                        <span>我的紀錄</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/emo-cards"
                        onClick={closeMenu}
                        className="flex items-center gap-3 text-gray-800 dark:text-gray-100 hover:text-[#3C9DAE] transition-colors"
                      >
                        <BookOpen className="w-5 h-5" />
                        <span>情緒卡</span>
                      </Link>
                    </li>
                    <li className="pt-4 border-t border-gray-300 dark:border-gray-700">
                      <Link
                        href="/account"
                        onClick={closeMenu}
                        className="flex items-center gap-3 text-gray-800 dark:text-gray-100 hover:text-[#3C9DAE] transition-colors"
                      >
                        <Settings className="w-5 h-5" />
                        <span>帳戶設定</span>
                      </Link>
                    </li>
                    <li>
                      <form action={handleSignOut}>
                        <button
                          type="submit"
                          className="flex items-center gap-3 text-gray-800 dark:text-gray-100 hover:text-[#3C9DAE] transition-colors w-full"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>登出</span>
                        </button>
                      </form>
                    </li>
                  </ul>
                ) : (
                  // Logged out menu
                  <ul className="space-y-4">
                    <li>
                      <Link
                        href="/"
                        onClick={closeMenu}
                        className="flex items-center gap-3 text-gray-800 dark:text-gray-100 hover:text-[#3C9DAE] transition-colors"
                      >
                        <Home className="w-5 h-5" />
                        <span>首頁</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about-emotions"
                        onClick={closeMenu}
                        className="flex items-center gap-3 text-gray-800 dark:text-gray-100 hover:text-[#3C9DAE] transition-colors"
                      >
                        <BookOpen className="w-5 h-5" />
                        <span>認識情緒</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/emo-cards"
                        onClick={closeMenu}
                        className="flex items-center gap-3 text-gray-800 dark:text-gray-100 hover:text-[#3C9DAE] transition-colors"
                      >
                        <BookOpen className="w-5 h-5" />
                        <span>情緒卡</span>
                      </Link>
                    </li>
                    <li className="pt-4 border-t border-gray-300 dark:border-gray-700">
                      <form action={handleSignIn}>
                        <Button
                          type="submit"
                          variant="outline"
                          className="w-full rounded-full border-2 border-main text-main hover:bg-main hover:text-white font-bold"
                        >
                          登入
                        </Button>
                      </form>
                    </li>
                    <li>
                      <form action={handleSignUp}>
                        <Button
                          type="submit"
                          className="w-full rounded-full bg-pink hover:bg-pink-dark text-white font-bold"
                        >
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
