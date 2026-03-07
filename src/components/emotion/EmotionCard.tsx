'use client';

import Image from 'next/image';
import { Check, PlusCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { EmotionCardAction, EmotionCardData } from '@/types/emotion-card';
import {
  formatEmotionCardName,
  getEmotionCardCategoryStyle,
  getEmotionCardImageSrc,
} from './emotion-card-config';

interface EmotionCardProps {
  card: EmotionCardData;
  onCardClick?: () => void;
  action?: EmotionCardAction;
  disabled?: boolean;
  dimmed?: boolean;
  className?: string;
}

function EmotionCardActionButton({ action }: { action: EmotionCardAction }) {
  const icon =
    action.kind === 'add' ? (
      <PlusCircle className="w-5 h-5" />
    ) : action.kind === 'remove' ? (
      <XCircle className="w-5 h-5" />
    ) : (
      <Check className="w-4 h-4" />
    );

  const toneClass =
    action.kind === 'added'
      ? 'bg-gray-800/80 dark:bg-gray-100/80 text-white dark:text-gray-900 cursor-default'
      : 'bg-pink-tint01 hover:bg-pink text-white';

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        action.onClick?.();
      }}
      disabled={!action.onClick}
      aria-label={action.label}
      title={action.label}
      className={cn(
        'absolute -top-2 -right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full shadow transition-colors',
        toneClass
      )}
    >
      {icon}
    </button>
  );
}

export function EmotionCard({
  card,
  onCardClick,
  action,
  disabled = false,
  dimmed = false,
  className,
}: EmotionCardProps) {
  const categorySlug = card.categoryName.toLowerCase();
  const styles = getEmotionCardCategoryStyle(categorySlug);
  const interactive = Boolean(onCardClick) && !disabled;
  const bodyClassName = cn(
    'group flex h-[140px] w-[140px] flex-col items-center justify-center rounded-xl border-4 border-transparent p-3 text-left transition-all duration-200',
    styles.bg,
    interactive && ['cursor-pointer', styles.hoverBorder, 'hover:p-2'],
    dimmed && 'opacity-50',
    disabled && 'cursor-not-allowed'
  );
  const bodyContent = (
    <>
      <div className="h-16 w-16 rounded-full overflow-hidden">
        <Image
          src={getEmotionCardImageSrc(card)}
          alt={card.name}
          width={64}
          height={64}
          className={cn(
            'h-full w-full object-cover transition-transform duration-200',
            interactive && 'group-hover:scale-110'
          )}
        />
      </div>
      <p className="type-subsection-title mt-2 text-center">
        {formatEmotionCardName(card.name)}
      </p>
    </>
  );

  return (
    <div className={cn('relative shrink-0', className)}>
      {action ? <EmotionCardActionButton action={action} /> : null}
      {onCardClick ? (
        <button
          type="button"
          onClick={onCardClick}
          disabled={disabled}
          className={bodyClassName}
        >
          {bodyContent}
        </button>
      ) : (
        <div className={bodyClassName}>{bodyContent}</div>
      )}
    </div>
  );
}
