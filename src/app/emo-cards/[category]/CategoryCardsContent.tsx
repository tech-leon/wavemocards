'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { EmotionCardModal } from '@/components/emotion/EmotionCardModal';
import { BackToTopButton } from '@/components/ui/BackToTopButton';

interface EmotionCategory {
  id: number;
  name: string;
  slug: string;
  display_order: number;
}

interface EmotionCard {
  id: number;
  name: string;
  category_id: number;
  description?: string | null;
  example?: string | null;
  image_path?: string | null;
}

interface CategoryCardsContentProps {
  category: EmotionCategory;
  cards: EmotionCard[];
}

// Category colors mapping
const categoryStyles: Record<string, { bg: string; hoverBorder: string }> = {
  happy: { bg: 'bg-happy', hoverBorder: 'hover:border-[#EBD175]' },
  expectation: { bg: 'bg-expectation', hoverBorder: 'hover:border-[#EAB27E]' },
  relieved: { bg: 'bg-relived', hoverBorder: 'hover:border-[#B0CC8B]' },
  unstable: { bg: 'bg-unstable', hoverBorder: 'hover:border-[#D7B3B3]' },
  amazed: { bg: 'bg-amazed', hoverBorder: 'hover:border-[#969DD7]' },
  sadness: { bg: 'bg-sadness', hoverBorder: 'hover:border-[#A2C5D6]' },
  hate: { bg: 'bg-hate', hoverBorder: 'hover:border-[#C1B1A4]' },
  anger: { bg: 'bg-anger', hoverBorder: 'hover:border-[#D19292]' },
  others: { bg: 'bg-others', hoverBorder: 'hover:border-[#CBCBCB]' },
};

export function CategoryCardsContent({
  category,
  cards,
}: CategoryCardsContentProps) {
  const [selectedCard, setSelectedCard] = useState<EmotionCard | null>(null);

  const styles = categoryStyles[category.slug] || {
    bg: 'bg-gray-200',
    hoverBorder: 'hover:border-gray-400',
  };

  const handleCardClick = (card: EmotionCard) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <>
      <main className="px-3 sm:px-0">
        <div className="container mx-auto py-4 pt-9 pb-18" id="top">
          {/* Header */}
          <div className="mb-4 pb-2 border-b-2 border-main-tint02 flex justify-between items-center">
            <h2 className="text-2xl font-bold">{category.name}</h2>
            <div className="flex justify-end">
              <Link
                href="/emo-cards"
                className="px-4 py-2 border border-main text-main rounded-full hover:bg-main hover:text-white transition-colors font-medium"
              >
                返回
              </Link>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 mt-12 mb-18">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={cn(
                  'group w-[140px] h-[140px] rounded-xl',
                  'flex flex-col items-center justify-center p-3',
                  'transition-all duration-200',
                  styles.bg,
                  styles.hoverBorder,
                  'hover:border-4 hover:p-2'
                )}
              >
                <p className="text-lg font-bold text-gray-900 mb-2">
                  {card.name.length === 2
                    ? `${card.name[0]}\u00A0${card.name[1]}`
                    : card.name}
                </p>
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={card.image_path || `/images/emoCards/${card.id}.svg`}
                    alt={card.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Emotion Card Modal */}
      <EmotionCardModal
        card={selectedCard}
        categorySlug={category.slug}
        isOpen={!!selectedCard}
        onClose={handleCloseModal}
      />

      <BackToTopButton />
    </>
  );
}
