'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { toEmotionCardData } from '@/lib/emotion-card';
import { emotionCardCategoryStyles } from '@/components/emotion/emotion-card-config';
import { EmotionCard as EmotionCardComponent } from '@/components/emotion/EmotionCard';
import type { EmotionCategory, EmotionCard as EmotionCardRecord } from '@/lib/emotions';
import type { EmotionCardData } from '@/types/emotion-card';

interface ExpandedViewProps {
  categories: EmotionCategory[];
  cardsByCategory: Map<number, EmotionCardRecord[]>;
  hasCard: (id: number) => boolean;
  isSelectionFull: boolean;
  onAddCard: (card: EmotionCardRecord) => void;
  onRemoveCard: (id: number) => void;
  onCardClick: (card: EmotionCardData) => void;
  t: (key: string) => string;
}

export function ExpandedView({
  categories,
  cardsByCategory,
  hasCard,
  isSelectionFull,
  onAddCard,
  onRemoveCard,
  onCardClick,
  t,
}: ExpandedViewProps) {
  return (
    <div className="space-y-6">
      {categories.map((cat) => {
        const slug = cat.slug;
        const catCards = cardsByCategory.get(cat.id) || [];
        const styles = emotionCardCategoryStyles[slug] || {
          bg: 'bg-gray-200',
          hoverBorder: 'hover:border-gray-400',
        };

        return (
          <div key={cat.id} className="flex flex-nowrap gap-3">
            {/* Category Header */}
            <Link
              href={`/explore/cards/${slug}`}
              className={cn(
                'shrink-0 w-[72px] h-[140px] mt-3 rounded-xl',
                'flex flex-col items-center justify-center',
                'type-subsection-title',
                'transition-colors duration-200',
                styles.bg,
                styles.hoverBorder,
                'hover:border-4'
              )}
            >
              <span>{cat.name[0]}</span>
              <span>{cat.name[1]}</span>
            </Link>

            {/* Cards Horizontal Scroll */}
            <div className="flex gap-4 overflow-x-auto pt-3 pr-2 pb-2 min-w-0">
              {catCards.map((card) => {
                const isAdded = hasCard(card.id);
                const action = isAdded
                  ? {
                      kind: 'remove' as const,
                      label: t('actions.removeFromHolder'),
                      onClick: () => onRemoveCard(card.id),
                    }
                  : isSelectionFull
                    ? undefined
                    : {
                        kind: 'add' as const,
                        label: t('actions.addToHolder'),
                        onClick: () => onAddCard(card),
                      };

                return (
                  <EmotionCardComponent
                    key={card.id}
                    card={toEmotionCardData(card, slug)}
                    onCardClick={() => onCardClick(toEmotionCardData(card, slug))}
                    action={action}
                    dimmed={isAdded}
                    locked={!isAdded && isSelectionFull}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
