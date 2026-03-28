'use client';

import { EmotionCard } from './EmotionCard';
import { cn } from '@/lib/utils';
import type { EmotionCardAction, EmotionCardData } from '@/types/emotion-card';

interface EmotionCardGridProps {
  cards: EmotionCardData[];
  onCardClick?: (card: EmotionCardData) => void;
  getAction?: (card: EmotionCardData) => EmotionCardAction | undefined;
  isDimmed?: (card: EmotionCardData) => boolean;
  isLocked?: (card: EmotionCardData) => boolean;
  className?: string;
}

export function EmotionCardGrid({
  cards,
  onCardClick,
  getAction,
  isDimmed,
  isLocked,
  className,
}: EmotionCardGridProps) {
  return (
    <div className={cn('flex flex-wrap gap-4', className)}>
      {cards.map((card) => (
        <EmotionCard
          key={card.id}
          card={card}
          onCardClick={onCardClick ? () => onCardClick(card) : undefined}
          action={getAction?.(card)}
          dimmed={isDimmed?.(card)}
          locked={isLocked?.(card)}
        />
      ))}
    </div>
  );
}
