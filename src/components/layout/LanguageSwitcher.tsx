'use client';

import { useEffect, useState } from 'react';
import { Check, Languages } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import {
  buildLocaleCookieValue,
  isLocale,
  isPublicPath,
  localizeHref,
  stripLocaleFromPathname,
  type Locale,
} from '@/lib/i18n/locale';

interface LanguageSwitcherProps {
  locale: Locale;
  isAuthenticated: boolean;
  className?: string;
  triggerClassName?: string;
  onChanged?: () => void;
  align?: 'start' | 'end';
  side?: 'bottom' | 'top';
}

function setLocaleCookie(locale: Locale) {
  document.cookie = buildLocaleCookieValue(locale);
}

export function LanguageSwitcher({
  locale,
  isAuthenticated,
  className,
  triggerClassName,
  onChanged,
  align = 'start',
  side = 'bottom',
}: LanguageSwitcherProps) {
  const t = useTranslations('languageSwitcher');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedLocale, setSelectedLocale] = useState<Locale>(locale);
  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false);

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

        const data = (await response.json()) as {
          profile?: { locale_preference?: Locale };
        };
        const confirmedLocale = data.profile?.locale_preference;

        if (!isLocale(confirmedLocale)) {
          setSelectedLocale(locale);
          setIsPending(false);
          return;
        }

        setSelectedLocale(confirmedLocale);
        setOpen(false);
        onChanged?.();
        navigateToLocale(confirmedLocale);
        return;
      } catch {
        setSelectedLocale(locale);
        setIsPending(false);
        return;
      }
    }

    setLocaleCookie(nextLocale);
    setOpen(false);
    onChanged?.();
    navigateToLocale(nextLocale);
  };

  const localeOptions: Locale[] = ['zh-TW', 'en', 'ja'];

  return (
    <div className={className}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild disabled={isPending}>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={cn(
              'rounded-full border-slate-300 bg-transparent text-slate-800 shadow-none transition-colors hover:border-main hover:bg-slate-200/70 hover:text-main data-[state=open]:border-main data-[state=open]:bg-slate-200/80 data-[state=open]:text-main dark:border-slate-600 dark:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-main dark:data-[state=open]:bg-slate-800',
              triggerClassName
            )}
            aria-label={t('ariaLabel')}
          >
            <Languages className="size-4" />
            <span className="sr-only">{t('ariaLabel')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={align}
          side={side}
          sideOffset={8}
          className="w-44"
        >
          {localeOptions.map((localeOption) => {
            const isSelected = selectedLocale === localeOption;

            return (
              <DropdownMenuItem
                key={localeOption}
                disabled={isPending}
                onSelect={() => {
                  void handleChange(localeOption);
                }}
                className={cn(
                  'type-button justify-start gap-3 px-3 py-2 text-slate-700 hover:text-main dark:text-slate-100 dark:hover:text-main',
                  isSelected && 'bg-main/10 text-main dark:bg-main/15'
                )}
              >
                <span className="flex size-4 items-center justify-center">
                  {isSelected ? <Check className="size-4 text-main" /> : null}
                </span>
                <span>{t(`options.${localeOption}`)}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
