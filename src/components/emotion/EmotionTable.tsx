'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface EmotionCard {
  id: number;
  name: string;
  category_id: number;
  description?: string | null;
  example?: string | null;
  image_path?: string | null;
}

interface EmotionCategory {
  id: number;
  name: string;
  slug: string;
  display_order: number;
}

interface EmotionTableProps {
  categories: EmotionCategory[];
  cardsByCategory: Map<number, EmotionCard[]>;
  onCardClick: (card: EmotionCard, categorySlug: string) => void;
}

// Category button styles
const categoryButtonStyles: Record<string, string> = {
  happy: 'bg-happy hover:bg-happy-dark border-happy-dark',
  expectation: 'bg-expectation hover:bg-expectation-dark border-expectation-dark',
  relieved: 'bg-relived hover:bg-relived-dark border-relived-dark',
  unstable: 'bg-unstable hover:bg-unstable-dark border-unstable-dark',
  amazed: 'bg-amazed hover:bg-amazed-dark border-amazed-dark',
  sadness: 'bg-sadness hover:bg-sadness-dark border-sadness-dark',
  hate: 'bg-hate hover:bg-hate-dark border-hate-dark',
  anger: 'bg-anger hover:bg-anger-dark border-anger-dark',
  others: 'bg-others hover:bg-others-dark border-others-dark',
};

const cardButtonStyles: Record<string, string> = {
  happy: 'bg-happy/80 hover:bg-happy border-happy',
  expectation: 'bg-expectation/80 hover:bg-expectation border-expectation',
  relieved: 'bg-relived/80 hover:bg-relived border-relived',
  unstable: 'bg-unstable/80 hover:bg-unstable border-unstable',
  amazed: 'bg-amazed/80 hover:bg-amazed border-amazed',
  sadness: 'bg-sadness/80 hover:bg-sadness border-sadness',
  hate: 'bg-hate/80 hover:bg-hate border-hate',
  anger: 'bg-anger/80 hover:bg-anger border-anger',
  others: 'bg-others/80 hover:bg-others border-others',
};

export function EmotionTable({
  categories,
  cardsByCategory,
  onCardClick,
}: EmotionTableProps) {
  return (
    <div className="space-y-4">
      {categories.map((category) => {
        const cards = cardsByCategory.get(category.id) || [];
        const categoryStyle = categoryButtonStyles[category.slug] || 'bg-gray-200';
        const cardStyle = cardButtonStyles[category.slug] || 'bg-gray-100';

        return (
          <div key={category.id} className="flex flex-nowrap items-start gap-3">
            {/* Category Header Button */}
            <Link
              href={`/emo-cards/${category.slug}`}
              className={cn(
                'flex-shrink-0 w-16 h-10 rounded-lg',
                'flex items-center justify-center',
                'font-bold text-gray-900 dark:text-gray-900 text-sm',
                'transition-colors duration-200',
                categoryStyle
              )}
            >
              {category.name}
            </Link>

            {/* Card Buttons */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => onCardClick(card, category.slug)}
                  className={cn(
                    'flex-shrink-0 px-3 py-2 rounded-lg',
                    'font-medium text-gray-800 dark:text-gray-900 text-sm whitespace-nowrap',
                    'transition-colors duration-200',
                    cardStyle
                  )}
                >
                  {card.name}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
