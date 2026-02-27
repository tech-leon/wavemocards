'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface EmotionCategory {
  id: number;
  name: string;
  slug: string;
  displayOrder: number;
}

interface EmotionCategoryCardProps {
  category: EmotionCategory;
  href: string;
  className?: string;
}

// Category colors mapping
const categoryStyles: Record<string, { bg: string; hoverBorder: string }> = {
  happy: { bg: 'bg-happy', hoverBorder: 'hover:border-[#EBD175]' },
  expectation: { bg: 'bg-expectation', hoverBorder: 'hover:border-[#EAB27E]' },
  relived: { bg: 'bg-relived', hoverBorder: 'hover:border-[#B0CC8B]' },
  unstable: { bg: 'bg-unstable', hoverBorder: 'hover:border-[#D7B3B3]' },
  amazed: { bg: 'bg-amazed', hoverBorder: 'hover:border-[#969DD7]' },
  sadness: { bg: 'bg-sadness', hoverBorder: 'hover:border-[#A2C5D6]' },
  hate: { bg: 'bg-hate', hoverBorder: 'hover:border-[#C1B1A4]' },
  anger: { bg: 'bg-anger', hoverBorder: 'hover:border-[#D19292]' },
  others: { bg: 'bg-others', hoverBorder: 'hover:border-[#CBCBCB]' },
};

export function EmotionCategoryCard({ category, href, className }: EmotionCategoryCardProps) {
  const styles = categoryStyles[category.slug] || {
    bg: 'bg-gray-200',
    hoverBorder: 'hover:border-gray-400',
  };

  return (
    <Link href={href} className="group">
      <div
        className={cn(
          'min-w-[236px] max-w-[236px] h-[140px] flex items-center justify-center p-5 rounded-xl mb-4',
          'border-0 transition-all duration-200',
          styles.bg,
          'hover:p-2 hover:border-4',
          styles.hoverBorder,
          className
        )}
      >
        <p className="w-1/2 px-2 text-[28px] font-bold text-gray-900 dark:text-gray-900 transition-all duration-200 group-hover:w-[40%] group-hover:text-[32px] group-hover:px-0">
          {category.name}
        </p>
        <div className="w-1/2 rounded-full overflow-hidden transition-all duration-200 group-hover:w-[55%]">
          <Image
            src={`/images/aboutEmotions/aboutEmo_${category.slug}.svg`}
            alt={category.name}
            width={120}
            height={120}
            className="w-full h-full object-cover transition-transform duration-250 group-hover:scale-120"
          />
        </div>
      </div>
    </Link>
  );
}
