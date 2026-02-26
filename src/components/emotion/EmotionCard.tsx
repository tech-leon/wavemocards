'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface EmotionCardData {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
  description?: string;
  example?: string;
  imagePath?: string;
}

interface EmotionCardProps {
  card: EmotionCardData;
  variant?: 'default' | 'large' | 'selectable';
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

// Emotion category colors mapping
const categoryColors: Record<string, string> = {
  happy: 'bg-happy',
  expectation: 'bg-expectation',
  relived: 'bg-relived',
  unstable: 'bg-unstable',
  amazed: 'bg-amazed',
  sadness: 'bg-sadness',
  hate: 'bg-hate',
  anger: 'bg-anger',
  others: 'bg-others',
};

const categoryBorders: Record<string, string> = {
  happy: 'border-[#EBD175]',
  expectation: 'border-[#EAB27E]',
  relived: 'border-[#B0CC8B]',
  unstable: 'border-[#D7B3B3]',
  amazed: 'border-[#969DD7]',
  sadness: 'border-[#A2C5D6]',
  hate: 'border-[#C1B1A4]',
  anger: 'border-[#D19292]',
  others: 'border-[#CBCBCB]',
};

export function EmotionCard({
  card,
  variant = 'default',
  selected = false,
  onClick,
  className,
}: EmotionCardProps) {
  const categorySlug = card.categoryName.toLowerCase();
  const bgColor = categoryColors[categorySlug] || 'bg-gray-200';
  const borderColor = categoryBorders[categorySlug] || 'border-gray-400';

  if (variant === 'large') {
    return (
      <div
        className={cn(
          'min-w-[480px] p-9 rounded-xl flex items-center gap-4 transition-all duration-200',
          bgColor,
          onClick && 'cursor-pointer hover:shadow-lg',
          className
        )}
        onClick={onClick}
      >
        <p className="w-1/2 text-6xl font-bold text-gray-900 mr-4">
          {card.name}
        </p>
        <div className="w-1/2 rounded-full overflow-hidden">
          <Image
            src={card.imagePath || `/images/emoCards/${card.id}.svg`}
            alt={card.name}
            width={200}
            height={200}
            className="w-full h-full object-cover transition-transform duration-250 hover:scale-110"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'min-w-[236px] max-w-[236px] h-[140px] flex items-center justify-center p-5 rounded-xl mb-4',
        'transition-all duration-200',
        bgColor,
        onClick && 'cursor-pointer',
        selected && `border-4 ${borderColor}`,
        !selected && 'border-0 hover:p-2 hover:border-4 ' + borderColor,
        className
      )}
      onClick={onClick}
    >
      <p className={cn(
        'w-1/2 px-2 text-[28px] font-bold text-gray-900 transition-all duration-200',
        !selected && 'group-hover:w-[40%] group-hover:text-[32px] group-hover:px-0'
      )}>
        {card.name}
      </p>
      <div className={cn(
        'w-1/2 rounded-full overflow-hidden transition-all duration-200',
        !selected && 'group-hover:w-[55%]'
      )}>
        <Image
          src={card.imagePath || `/images/emoCards/${card.id}.svg`}
          alt={card.name}
          width={120}
          height={120}
          className="w-full h-full object-cover transition-transform duration-250 hover:scale-120"
        />
      </div>
    </div>
  );
}
