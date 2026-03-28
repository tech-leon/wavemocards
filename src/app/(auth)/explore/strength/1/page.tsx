'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { EmotionCard } from '@/components/emotion/EmotionCard';
import { useExploreStore } from '@/store/exploreStore';
import { ExploreStepLayout, StrengthSelector } from '@/components/explore';

export default function ExploreStrength1Page() {
  const t = useTranslations('explore.strength1');
  const router = useRouter();
  const { selectedCards, beforeLevels, setBeforeLevel, removeCard } = useExploreStore();
  const [showError, setShowError] = useState<'count' | 'levels' | null>(null);

  const handleNext = () => {
    if (selectedCards.length === 0 || selectedCards.length > 3) {
      setShowError('count');
      return;
    }

    // Validate all cards have a before level
    const allFilled = selectedCards.every((card) => beforeLevels[card.id] !== undefined);
    if (!allFilled) {
      setShowError('levels');
      return;
    }
    router.push('/explore/story/background');
  };

  const handleBack = () => {
    router.push('/explore/cards');
  };

  return (
    <ExploreStepLayout
      currentStep={1}
      title={t('title')}
      titleMobile={{ line1: t('titleMobile.line1'), line2: t('titleMobile.line2') }}
      actions={
        <>
          <button
            type="button"
            onClick={handleBack}
            className="type-button px-6 py-1.5 font-bold rounded-full border-2 border-main-tint01 text-main-tint01 hover:bg-main-tint03 transition-colors"
          >
            {t('actions.previous')}
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="type-button px-6 py-1.5 font-bold rounded-full bg-main hover:bg-main-dark text-white transition-colors"
          >
            {t('actions.next')}
          </button>
        </>
      }
    >
      {/* Instructions */}
      <ul className="type-body-sm ml-1 mt-3 mb-9 text-gray-800 dark:text-gray-100 space-y-1">
        <li>{t('instructions.line1')}</li>
        <li>
          {t('instructions.line2')}
        </li>
        <li className="mt-4">
          {t('instructions.line3')}
          <span className="type-caption text-gray-500 dark:text-gray-300">{t('instructions.scoreHint')}</span>
        </li>
        <li>{t('instructions.line4')}</li>
      </ul>

      {/* Strength selectors for each card */}
      <div className="space-y-10">
        {selectedCards.map((card) => {
          return (
            <div
              key={card.id}
              className="flex flex-col md:flex-row md:justify-between items-center gap-4"
            >
              {/* Card */}
              <EmotionCard
                card={card}
                action={{
                  kind: 'remove',
                  label: t('card.remove'),
                  onClick: () => removeCard(card.id),
                }}
              />

              {/* Strength selector */}
              <StrengthSelector
                value={beforeLevels[card.id]}
                onChange={(level) => setBeforeLevel(card.id, level)}
              />
            </div>
          );
        })}
      </div>

      {/* Error modal */}
      {showError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowError(null)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative bg-gray-100 dark:bg-gray-900 rounded-2xl max-w-sm w-full p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="type-page-title mb-3 text-pink">
              {showError === 'count' ? t('errors.countTitle') : t('errors.levelsTitle')}
            </p>
            {showError === 'count' ? (
              selectedCards.length === 0 ? (
                <p className="type-body-sm mb-4 text-gray-800 dark:text-gray-100">{t('errors.tooFewDescription')}</p>
              ) : (
                <div className="type-body-sm mb-4 text-gray-800 dark:text-gray-100">
                  <p>{t('errors.tooManyDescriptionLine1')}</p>
                  <p>{t('errors.tooManyDescriptionLine2')}</p>
                </div>
              )
            ) : (
              <p className="type-body-sm mb-4 text-gray-800 dark:text-gray-100">{t('errors.levelsDescription')}</p>
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
