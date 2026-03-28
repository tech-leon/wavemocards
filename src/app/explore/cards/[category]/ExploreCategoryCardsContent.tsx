'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Folder, FolderOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';
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
  const [modalCard, setModalCard] = useState<EmotionCardData | null>(null);
  const { selectedCards, addCard, removeCard, hasCard } = useExploreStore();
  const slug = category.slug;

  const handleAddCard = (card: EmotionCardRecord) => {
    if (hasCard(card.id)) return;
    addCard(toEmotionCardData(card, slug));
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
            <Link
              href="/explore/selected"
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
            </Link>
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
    </section>
  );
}
