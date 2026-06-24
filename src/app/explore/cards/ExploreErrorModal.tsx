'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

interface ExploreErrorModalProps {
  error: 'tooFew' | 'tooMany' | null;
  onClose: () => void;
}

export function ExploreErrorModal({ error, onClose }: ExploreErrorModalProps) {
  const t = useTranslations('explore.cards');
  const tCommon = useTranslations('common.actions');

  if (!error) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative bg-background rounded-2xl max-w-sm w-full p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="type-page-title mb-3 text-pink">
          {error === 'tooFew' ? t('errors.tooFewTitle') : t('errors.tooManyTitle')}
        </p>
        {error === 'tooFew' ? (
          <p className="type-body-sm mb-4 text-foreground">
            {t('errors.tooFewDescription')}
          </p>
        ) : (
          <div className="type-body-sm mb-4 text-foreground">
            <p>{t('errors.tooManyDescriptionLine1')}</p>
            <p>{t('errors.tooManyDescriptionLine2')}</p>
          </div>
        )}
        <Image src="/images/addCardFail.svg" alt="" width={150} height={150} className="mx-auto mb-4" />
        <Button
          type="button"
          variant="pink"
          className="h-auto px-6 py-2 font-bold"
          onClick={onClose}
        >
          {tCommon('confirm')}
        </Button>
      </div>
    </div>
  );
}
