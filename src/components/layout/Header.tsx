'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
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
  const isAuthenticated = Boolean(user);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const navLinkClass = (href: string) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
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
          <nav className="flex items-center gap-1" aria-label="主導覽">
            {user ? (
              <>
                <Link href="/about-emotions" className={navLinkClass('/about-emotions')}>
                  認識情緒
                </Link>
                <Link href="/explore" className={navLinkClass('/explore')}>
                  探索情緒
                </Link>
                <Link href="/records" className={navLinkClass('/records')}>
                  我的紀錄
                </Link>
              </>
            ) : (
              <Link href="/about-emotions" className={navLinkClass('/about-emotions')}>
                認識情緒
              </Link>
            )}
          </nav>

          <h1>
            <Link href="/" className="group block h-[45px] w-[200px]">
              <span className="sr-only">Wavemocards</span>
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
                  <span className="sr-only">帳戶設定</span>
                </Link>
                <form action={handleSignOut}>
                  <button
                    type="submit"
                    className="inline-flex rounded-md p-2 text-slate-800 transition-colors hover:text-main dark:text-slate-100 dark:hover:text-main-tint01"
                  >
                    <LogOut className="size-5" />
                    <span className="sr-only">登出</span>
                  </button>
                </form>
              </>
            ) : (
              <>
                <form action={handleSignIn}>
                  <Button
                    type="submit"
                    variant="outline"
                    className="rounded-full border-2 border-main text-main hover:bg-main hover:text-white dark:hover:text-slate-900"
                  >
                    登入
                  </Button>
                </form>
                <form action={handleSignUp}>
                  <Button type="submit" className="rounded-full bg-pink text-white hover:bg-pink-dark">
                    註冊
                  </Button>
                </form>
              </>
            )}
            <ThemeToggle isAuthenticated={isAuthenticated} />
          </div>
        </div>

        <div className="flex items-center justify-between lg:hidden">
          <Link href="/" className="block h-[36px] w-[150px]">
            <span className="sr-only">Wavemocards</span>
            <span
              aria-hidden="true"
              className="block h-full w-full bg-[url('/images/logo_name.svg')] bg-contain bg-left bg-no-repeat"
            />
          </Link>
          <div className="flex items-center gap-1">
            <ThemeToggle isAuthenticated={isAuthenticated} />
            <MobileNav user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}
