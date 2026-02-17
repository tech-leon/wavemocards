import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: ReactNode;
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  } | null;
}

export function MainLayout({ children, user }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:px-4 focus:py-2 focus:bg-main focus:text-white focus:rounded-md focus:outline-none"
      >
        跳到主要內容
      </a>
      <Header user={user} />
      <main id="main-content" className="grow" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
}
