'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { emotionCardCategoryStyles } from '@/components/emotion/emotion-card-config';
import { categoryRepresentativeCards } from '@/lib/emotions';
import type { EmotionCategory } from '@/lib/emotions';

interface FoldedViewProps {
  categories: EmotionCategory[];
  t: (key: string) => string;
}

export function FoldedView({ categories, t }: FoldedViewProps) {
  return (
    <div className="mt-6 mb-16">
      <ul className="type-body-sm mb-9 text-gray-800 dark:text-gray-100">
        <li>{t('guide.categoryCardsHint')}</li>
      </ul>
      <div className="flex flex-wrap justify-center md:justify-start gap-4">
        {categories.map((cat) => {
          const slug = cat.slug;
          const styles = emotionCardCategoryStyles[slug] || {
            bg: 'bg-gray-200',
            hoverBorder: 'hover:border-gray-400',
          };
          const repCardId = categoryRepresentativeCards[slug];

          return (
            <Link
              key={cat.id}
              href={`/explore/cards/${slug}`}
              className={cn(
                'group w-[140px] h-[140px] rounded-xl',
                'flex flex-col items-center justify-center p-3',
                'transition-all duration-200',
                styles.bg,
                styles.hoverBorder,
                'hover:border-4 hover:p-2'
              )}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={`/images/emoCards/${repCardId}.svg`}
                  alt={cat.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                />
              </div>
              <p className="type-subsection-title mt-2">
                {cat.name[0]}&nbsp;{cat.name[1]}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
