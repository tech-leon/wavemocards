'use client';

import Link from 'next/link';
import { PlusCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toEmotionCardData } from '@/lib/emotion-card';
import { categoryBtnColors } from '@/components/emotion/emotion-card-config';
import type { EmotionCategory, EmotionCard as EmotionCardRecord } from '@/lib/emotions';
import type { EmotionCardData } from '@/types/emotion-card';

interface TableViewProps {
  categories: EmotionCategory[];
  cardsByCategory: Map<number, EmotionCardRecord[]>;
  hasCard: (id: number) => boolean;
  isSelectionFull: boolean;
  onAddCard: (card: EmotionCardRecord) => void;
  onRemoveCard: (id: number) => void;
  onCardClick: (card: EmotionCardData) => void;
  t: (key: string) => string;
}

export function TableView({
  categories,
  cardsByCategory,
  hasCard,
  isSelectionFull,
  onAddCard,
  onRemoveCard,
  onCardClick,
  t,
}: TableViewProps) {
  return (
    <div className="mt-6 mb-16">
      <p className="type-body-sm mb-8 px-1 md:px-3 text-gray-800 dark:text-gray-100">
        {t('guide.tableHint')}
      </p>
      {categories.map((cat) => {
        const slug = cat.slug;
        const catCards = cardsByCategory.get(cat.id) || [];
        return (
          <div key={cat.id} className="flex flex-nowrap mt-4">
            <Link
              href={`/explore/cards/${slug}`}
              className={cn(
                'type-button shrink-0 mr-3 mt-2 px-3 py-1 rounded-full font-bold',
                'flex items-center justify-center whitespace-nowrap transition-colors',
                categoryBtnColors[slug]
              )}
            >
              {cat.name}
            </Link>
            <div className="flex items-center overflow-x-auto pt-3 mb-1 gap-4">
              {catCards.map((card) => {
                const isAdded = hasCard(card.id);
                const isLocked = !isAdded && isSelectionFull;

                return (
                  <div key={card.id} className="relative shrink-0">
                    {isAdded ? (
                      <button
                        type="button"
                        onClick={() => onRemoveCard(card.id)}
                        className="absolute -top-1.5 -right-1.5 z-10 w-5 h-5 rounded-full bg-pink-tint01 hover:bg-pink text-white flex items-center justify-center shadow transition-colors"
                        title={t('actions.removeFromHolder')}
                      >
                        <XCircle className="w-3.5 h-3.5" />
                      </button>
                    ) : !isLocked ? (
                      <button
                        type="button"
                        onClick={() => onAddCard(card)}
                        className="absolute -top-1.5 -right-1.5 z-10 w-5 h-5 rounded-full bg-pink-tint01 hover:bg-pink text-white flex items-center justify-center shadow transition-colors"
                        title={t('actions.addToHolder')}
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => onCardClick(toEmotionCardData(card, slug))}
                      className={cn(
                        'type-button px-3 py-1 rounded-full whitespace-nowrap transition-colors',
                        categoryBtnColors[slug],
                        isAdded && 'opacity-25',
                        isLocked && 'grayscale opacity-40'
                      )}
                    >
                      {card.name}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
