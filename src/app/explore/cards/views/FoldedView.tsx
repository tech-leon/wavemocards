'use client';

import { CategoryRepresentativeCard } from '@/components/emotion/CategoryRepresentativeCard';
import { categoryRepresentativeCards } from '@/lib/emotions';
import type { EmotionCategory } from '@/lib/emotions';

interface FoldedViewProps {
  categories: EmotionCategory[];
  t: (key: string) => string;
}

export function FoldedView({ categories, t }: FoldedViewProps) {
  return (
    <div className="mt-6 mb-16">
      <ul className="type-body-sm mb-9 text-foreground">
        <li>{t('guide.categoryCardsHint')}</li>
      </ul>
      <div className="flex flex-wrap justify-center md:justify-start gap-4">
        {categories.map((cat) => (
          <CategoryRepresentativeCard
            key={cat.id}
            slug={cat.slug}
            name={cat.name}
            href={`/explore/cards/${cat.slug}`}
            imageId={categoryRepresentativeCards[cat.slug]}
          />
        ))}
      </div>
    </div>
  );
}
