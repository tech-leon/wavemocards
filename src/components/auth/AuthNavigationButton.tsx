'use client';

import type { MouseEvent, ReactNode } from 'react';

interface AuthNavigationButtonProps {
  href: string;
  className: string;
  children: ReactNode;
  onNavigate?: () => void;
}

export function AuthNavigationButton({
  href,
  className,
  children,
  onNavigate,
}: AuthNavigationButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    onNavigate?.();
    window.location.assign(href);
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
