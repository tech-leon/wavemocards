'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  isPublicPath,
  localizeHref,
  stripLocaleFromPathname,
  type Locale,
} from '@/lib/i18n/locale';

const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

interface LanguageSwitcherProps {
  locale: Locale;
  isAuthenticated: boolean;
  className?: string;
  selectClassName?: string;
  onChanged?: () => void;
}

function setLocaleCookie(locale: Locale) {
  document.cookie = `locale=${locale}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function LanguageSwitcher({
  locale,
  isAuthenticated,
  className,
  selectClassName,
  onChanged,
}: LanguageSwitcherProps) {
  const t = useTranslations('languageSwitcher');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedLocale, setSelectedLocale] = useState<Locale>(locale);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setSelectedLocale(locale);
  }, [locale]);

  const navigateToLocale = (nextLocale: Locale) => {
    const search = searchParams.toString();
    const basePathname = stripLocaleFromPathname(pathname).pathname;
    const targetPathname = isPublicPath(pathname)
      ? localizeHref(basePathname, nextLocale)
      : pathname;
    const targetHref = search ? `${targetPathname}?${search}` : targetPathname;
    const currentHref = search ? `${pathname}?${search}` : pathname;

    if (targetHref === currentHref) {
      window.location.reload();
      return;
    }

    window.location.assign(targetHref);
  };

  const handleChange = async (nextLocale: Locale) => {
    if (nextLocale === locale || isPending) {
      onChanged?.();
      return;
    }

    setSelectedLocale(nextLocale);
    setIsPending(true);

    if (isAuthenticated) {
      try {
        const response = await fetch('/api/user', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ locale_preference: nextLocale }),
        });

        if (!response.ok) {
          setSelectedLocale(locale);
          setIsPending(false);
          return;
        }
      } catch {
        setSelectedLocale(locale);
        setIsPending(false);
        return;
      }
    }

    setLocaleCookie(nextLocale);
    navigateToLocale(nextLocale);
    onChanged?.();
  };

  return (
    <label className={className}>
      <span className="sr-only">{t('ariaLabel')}</span>
      <select
        aria-label={t('ariaLabel')}
        value={selectedLocale}
        disabled={isPending}
        onChange={(event) => {
          void handleChange(event.target.value as Locale);
        }}
        className={selectClassName}
      >
        <option value="zh-TW">{t('options.zh-TW')}</option>
        <option value="en">{t('options.en')}</option>
        <option value="ja">{t('options.ja')}</option>
      </select>
    </label>
  );
}
