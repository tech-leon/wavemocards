'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { EmotionCard } from '@/components/emotion/EmotionCard';
import { useExploreStore } from '@/store/exploreStore';
import { ExploreStepLayout } from '@/components/explore';

export default function ExploreSelectedPage() {
  const t = useTranslations('explore.selected');
  const tCommon = useTranslations('common.actions');
  const router = useRouter();
  const { selectedCards, removeCard, clearCards } = useExploreStore();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showError, setShowError] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedCards.length === 0) {
      setShowError('tooFew');
      return;
    }
    if (selectedCards.length > 3) {
      setShowError('tooMany');
      return;
    }
    router.push('/explore/strength/1');
  };

  const handleBack = () => {
    router.push('/explore/cards');
  };

  const handleClear = () => {
    clearCards();
    setShowClearConfirm(false);
  };

  return (
    <ExploreStepLayout
      currentStep={1}
      title={t('title')}
      actions={
        <>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="type-button px-4 py-1.5 font-bold rounded-full border-2 border-main-tint01 text-main-tint01 hover:bg-main-tint03 transition-colors"
            >
              {t('actions.clear')}
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="type-button px-4 py-1.5 font-bold rounded-full border-2 border-main-tint01 text-main-tint01 hover:bg-main-tint03 transition-colors"
            >
              <span className="hidden sm:inline">{t('actions.backToCards')}</span>
              <span className="sm:hidden">{t('actions.previousStep')}</span>
            </button>
          </div>
          <button
            type="button"
            onClick={handleNext}
            className="type-button px-6 py-1.5 font-bold rounded-full bg-main hover:bg-main-dark text-white transition-colors"
          >
            {t('actions.nextStep')}
          </button>
        </>
      }
    >
      {/* Instructions */}
      <ul className="type-body-sm ml-1 mt-3 mb-9 text-gray-800 dark:text-gray-100 space-y-1">
        <li>
          {t('instructions.keepThreeCards')}
        </li>
        <li>{t('instructions.removeHint')}</li>
      </ul>

      {/* Cards grid */}
      {selectedCards.length === 0 ? (
        <div className="mb-8 flex flex-col items-center justify-center py-10 text-gray-500 dark:text-gray-300">
          <p className="type-subsection-title mb-2 text-foreground">{t('empty.title')}</p>
          <button
            type="button"
            onClick={handleBack}
            className="text-main hover:text-main-dark underline"
          >
            {t('empty.cta')}
          </button>
        </div>
      ) : (
        <div className="mb-8 flex flex-wrap justify-center gap-6 sm:gap-10 md:justify-start">
          {selectedCards.map((card) => {
            return (
              <EmotionCard
                key={card.id}
                card={card}
                action={{
                  kind: 'remove',
                  label: t('card.remove'),
                  onClick: () => removeCard(card.id),
                }}
              />
            );
          })}
        </div>
      )}

      {/* Clear confirm modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowClearConfirm(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative bg-gray-100 dark:bg-gray-900 rounded-2xl max-w-sm w-full p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="type-page-title mb-3 text-pink">{t('confirmClear.title')}</p>
            <p className="type-body-sm mb-4 text-gray-800 dark:text-gray-100">
              {t('confirmClear.description')}
            </p>
            <Image src="/images/sureToDelete.svg" alt="" width={150} height={150} className="mx-auto mb-4" />
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="type-button px-6 py-2 rounded-full border-2 border-pink-tint01 text-pink-tint01 font-bold hover:bg-pink-tint02/20"
              >
                {tCommon('cancel')}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="type-button px-6 py-2 rounded-full bg-pink hover:bg-pink-dark text-white font-bold"
              >
                {tCommon('confirm')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error modal */}
      {showError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowError(null)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative bg-gray-100 dark:bg-gray-900 rounded-2xl max-w-sm w-full p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="type-page-title mb-3 text-pink">
              {showError === 'tooFew' ? t('errors.tooFewTitle') : t('errors.tooManyTitle')}
            </p>
            {showError === 'tooFew' ? (
              <p className="type-body-sm mb-4 text-gray-800 dark:text-gray-100">
                {t('errors.tooFewDescription')}
              </p>
            ) : (
              <div className="type-body-sm mb-4 text-gray-800 dark:text-gray-100">
                <p>{t('errors.tooManyDescriptionLine1')}</p>
                <p>{t('errors.tooManyDescriptionLine2')}</p>
              </div>
            )}
            <Image src="/images/addCardFail.svg" alt="" width={150} height={150} className="mx-auto mb-4" />
            <button
              type="button"
              onClick={() => setShowError(null)}
              className="type-button px-6 py-2 rounded-full bg-pink hover:bg-pink-dark text-white font-bold"
            >
              {t('acknowledge')}
            </button>
          </div>
        </div>
      )}
    </ExploreStepLayout>
  );
}
