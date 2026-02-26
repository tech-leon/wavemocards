'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { handleSignOut, handleSignIn, handleSignUp } from '@/lib/auth';
import { MobileNav } from './MobileNav';

interface HeaderProps {
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  } | null;
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50" role="banner">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <h1>
            <Link 
              href="/" 
              className="block w-[200px] h-[45px] bg-[url('/images/logo_name.svg')] bg-no-repeat bg-contain indent-[-9999px]"
            >
              Wavemocards
            </Link>
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            {user ? (
              // Logged in state
              <nav className="flex items-center gap-4" aria-label="主導覽">
                <Link 
                  href="/about-emotions"
                  className="px-4 py-2 text-gray-550 hover:text-main transition-colors font-medium"
                >
                  認識情緒
                </Link>
                <Link 
                  href="/explore"
                  className="px-4 py-2 text-gray-550 hover:text-main transition-colors font-medium"
                >
                  探索情緒
                </Link>
                <Link 
                  href="/records"
                  className="px-4 py-2 text-gray-550 hover:text-main transition-colors font-medium"
                >
                  我的紀錄
                </Link>
                <Link 
                  href="/account"
                  className="px-4 py-2 text-gray-550 hover:text-main transition-colors group"
                >
                  <Settings 
                    className="w-6 h-6" 
                    strokeWidth={pathname === '/account' ? 2.5 : 2}
                  />
                  <span className="sr-only">帳戶設定</span>
                </Link>
                <form action={handleSignOut}>
                  <button
                    type="submit"
                    className="px-4 py-2 text-gray-550 hover:text-main transition-colors"
                  >
                    <LogOut className="w-6 h-6" />
                    <span className="sr-only">登出</span>
                  </button>
                </form>
              </nav>
          ) : (
            // Logged out state
            <nav className="flex items-center gap-4" aria-label="主導覽">
              <Link 
                href="/about-emotions"
                className="text-gray-550 hover:text-main transition-colors font-medium hidden sm:block"
              >
                認識情緒
              </Link>
              <form action={handleSignIn}>
                <Button 
                  type="submit"
                  variant="outline" 
                  className="rounded-full border-2 border-main text-main hover:bg-main hover:text-white font-bold"
                >
                  登入
                </Button>
              </form>
              <form action={handleSignUp}>
                <Button 
                  type="submit"
                  className="rounded-full bg-pink hover:bg-pink-dark text-white font-bold"
                >
                  註冊
                </Button>
              </form>
            </nav>
            )}
          </div>

          {/* Mobile Navigation */}
          <MobileNav user={user} />
        </div>
      </div>
    </header>
  );
}
