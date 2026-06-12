'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toEmotionCardData } from '@/lib/emotion-card';
import { EmotionCard } from '@/components/emotion/EmotionCard';
import { EmotionCardModal } from '@/components/emotion/EmotionCardModal';
import { BackToTopButton } from '@/components/ui/BackToTopButton';
import { localizeHref, type Locale } from '@/lib/i18n/locale';
import { PAGE_CONTAINER, STICKY_TITLE_BAR } from '@/lib/layout';
import type { EmotionCardData } from '@/types/emotion-card';

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
  locale: Locale;
}

export function CategoryCardsContent({
  category,
  cards,
  locale,
}: CategoryCardsContentProps) {
  const [selectedCard, setSelectedCard] = useState<EmotionCardData | null>(null);

  const handleCardClick = (card: EmotionCard) => {
    setSelectedCard(toEmotionCardData(card, category.slug));
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <>
      <div className="grow">
        {/* Sticky title bar */}
        <div className={STICKY_TITLE_BAR}>
          <div className={`${PAGE_CONTAINER} pt-4`}>
            <div className="pb-2 border-b-2 border-main-tint02 flex justify-between items-center">
              <h2>{category.name}</h2>
              <div className="flex justify-end">
                <Link
                  href={localizeHref('/emo-cards', locale)}
                  className="px-4 py-2 border border-main text-main rounded-full hover:bg-main hover:text-white transition-colors font-medium"
                >
                  返回
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={`${PAGE_CONTAINER} pb-18`} id="top">
          {/* Cards Grid */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 mt-12 mb-18">
            {cards.map((card) => (
              <EmotionCard
                key={card.id}
                card={toEmotionCardData(card, category.slug)}
                onCardClick={() => handleCardClick(card)}
              />
            ))}
          </div>
        </div>
      </div>

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
