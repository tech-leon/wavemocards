'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

const emptySubscribe = () => () => {};

/**
 * Theme toggle button for the Header.
 * Cycles through: light → dark → system → light ...
 * Shows the appropriate icon for the current resolved theme.
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  // Avoid hydration mismatch - useSyncExternalStore returns false on server, true on client
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!mounted) {
    // Render a placeholder with the same dimensions to avoid layout shift
    return (
      <div className="w-9 h-9 rounded-full" aria-hidden="true" />
    );
  }

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="w-5 h-5" />;
    }
    if (resolvedTheme === 'dark') {
      return <Moon className="w-5 h-5" />;
    }
    return <Sun className="w-5 h-5" />;
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return '淺色模式';
      case 'dark':
        return '深色模式';
      default:
        return '系統偏好';
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className="relative w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      aria-label={`切換主題（目前：${getLabel()}）`}
      title={getLabel()}
    >
      {getIcon()}
    </button>
  );
}
