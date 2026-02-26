'use client';

import { EmotionCard, EmotionCardData } from './EmotionCard';
import { cn } from '@/lib/utils';

interface EmotionCardGridProps {
  cards: EmotionCardData[];
  variant?: 'default' | 'large' | 'selectable';
  selectedIds?: number[];
  onCardClick?: (card: EmotionCardData) => void;
  maxSelection?: number;
  className?: string;
}

export function EmotionCardGrid({
  cards,
  variant = 'default',
  selectedIds = [],
  onCardClick,
  maxSelection,
  className,
}: EmotionCardGridProps) {
  const handleCardClick = (card: EmotionCardData) => {
    if (onCardClick) {
      // Check if max selection is reached and card is not already selected
      if (maxSelection && selectedIds.length >= maxSelection && !selectedIds.includes(card.id)) {
        return; // Don't allow selection if max reached
      }
      onCardClick(card);
    }
  };

  if (variant === 'large') {
    return (
      <div className={cn('flex flex-col gap-6', className)}>
        {cards.map((card) => (
          <EmotionCard
            key={card.id}
            card={card}
            variant="large"
            selected={selectedIds.includes(card.id)}
            onClick={onCardClick ? () => handleCardClick(card) : undefined}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
        className
      )}
    >
      {cards.map((card) => (
        <EmotionCard
          key={card.id}
          card={card}
          variant={variant}
          selected={selectedIds.includes(card.id)}
          onClick={onCardClick ? () => handleCardClick(card) : undefined}
        />
      ))}
    </div>
  );
}
