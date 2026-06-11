'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getEmotionCardCategoryStyle } from './emotion-card-config';

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

export function EmotionCategoryCard({ category, href, className }: EmotionCategoryCardProps) {
  const styles = getEmotionCardCategoryStyle(category.slug);

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
        <p className="type-card-display type-card-display-hover w-1/2 px-2 text-main transition-all duration-200 group-hover:w-[40%] group-hover:px-0">
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
