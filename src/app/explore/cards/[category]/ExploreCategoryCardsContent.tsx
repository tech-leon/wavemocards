'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Folder, FolderOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toEmotionCardData } from '@/lib/emotion-card';
import { useExploreStore } from '@/store/exploreStore';
import { EmotionCard } from '@/components/emotion/EmotionCard';
import { EmotionCardModal } from '@/components/emotion/EmotionCardModal';
import type { EmotionCategory, EmotionCard as EmotionCardRecord } from '@/lib/emotions';
import type { EmotionCardData } from '@/types/emotion-card';

interface ExploreCategoryCardsContentProps {
  category: EmotionCategory;
  cards: EmotionCardRecord[];
}

export function ExploreCategoryCardsContent({ category, cards }: ExploreCategoryCardsContentProps) {
  const t = useTranslations('explore.cards');
  const tCommon = useTranslations('common.actions');
  const router = useRouter();
  const [modalCard, setModalCard] = useState<EmotionCardData | null>(null);
  const [showError, setShowError] = useState<'tooFew' | 'tooMany' | null>(null);
  const { selectedCards, addCard, removeCard, hasCard } = useExploreStore();
  const slug = category.slug;

  const handleAddCard = (card: EmotionCardRecord) => {
    if (hasCard(card.id)) return;
    addCard(toEmotionCardData(card, slug));
  };

  const handleOpenHolder = () => {
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

  return (
    <section aria-label={t('aria.categorySection', { category: category.name })}>
      {/* Sticky header */}
      <div className="sticky top-[64px] z-30 pb-1 bg-gray-100/75 dark:bg-gray-900/75 backdrop-blur-sm">
        <div className="container mx-auto pt-4 px-3 sm:px-0">
          <div className="mb-4 pb-2 border-b-2 border-main-tint02 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link
                href="/explore/cards"
                className="text-gray-800 dark:text-gray-100 hover:text-main transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h2>{t('titles.category', { category: category.name })}</h2>
            </div>
            <button
              type="button"
              onClick={handleOpenHolder}
              className="type-button group px-4 py-1.5 bg-main hover:bg-main-dark text-white font-bold rounded-full flex items-center gap-1 transition-colors"
            >
              <Folder className="w-4 h-4 group-hover:hidden" />
              <FolderOpen className="w-4 h-4 hidden group-hover:block" />
              <span>{t('actions.openHolder')}</span>
              {selectedCards.length > 0 && (
                <span className="type-caption ml-1 bg-gray-100 dark:bg-gray-900 text-main font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {selectedCards.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-4 px-3 sm:px-0">
        <div className="flex flex-wrap justify-center md:justify-start gap-6 sm:gap-10 pt-2 pr-2 mb-16">
          {cards.map((card) => {
            const isAdded = hasCard(card.id);
            return (
              <EmotionCard
                key={card.id}
                card={toEmotionCardData(card, slug)}
                onCardClick={() => setModalCard(toEmotionCardData(card, slug))}
                action={
                  isAdded
                    ? {
                        kind: 'remove',
                        label: t('actions.removeFromHolder'),
                        onClick: () => removeCard(card.id),
                      }
                    : {
                        kind: 'add',
                        label: t('actions.addToHolder'),
                        onClick: () => handleAddCard(card),
                      }
                }
                dimmed={isAdded}
              />
            );
          })}
        </div>
      </div>

      {/* Card detail modal */}
      {modalCard && (
        <EmotionCardModal
          card={modalCard}
          categorySlug={slug}
          isOpen={!!modalCard}
          onClose={() => setModalCard(null)}
          showCloseButton={false}
        />
      )}

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
              {tCommon('confirm')}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
