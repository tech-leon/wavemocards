'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlusCircle, ArrowLeft, Folder, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useExploreStore } from '@/store/exploreStore';
import { EmotionCardModal } from '@/components/emotion/EmotionCardModal';
import type { EmotionCategory, EmotionCard } from '@/lib/emotions';

// Category colors mapping
const categoryBgColors: Record<string, string> = {
  happy: 'bg-happy',
  expectation: 'bg-expectation',
  relieved: 'bg-relived',
  unstable: 'bg-unstable',
  amazed: 'bg-amazed',
  sadness: 'bg-sadness',
  hate: 'bg-hate',
  anger: 'bg-anger',
  others: 'bg-others',
};

interface ExploreCategoryCardsContentProps {
  category: EmotionCategory;
  cards: EmotionCard[];
}

export function ExploreCategoryCardsContent({ category, cards }: ExploreCategoryCardsContentProps) {
  const [modalCard, setModalCard] = useState<EmotionCard | null>(null);
  const { selectedCards, addCard, hasCard } = useExploreStore();
  const slug = category.slug;

  const handleAddCard = (card: EmotionCard) => {
    if (hasCard(card.id)) return;
    addCard({
      id: card.id,
      name: card.name,
      categoryId: card.category_id,
      categoryName: slug,
      description: card.description || undefined,
      example: card.example || undefined,
      imagePath: card.image_path || undefined,
    });
  };

  return (
    <main>
      {/* Sticky header */}
      <div className="sticky top-[64px] z-30 pb-1 bg-white">
        <div className="container mx-auto max-w-6xl pt-4 px-3 sm:px-0">
          <div className="mb-4 pb-2 border-b-2 border-main-tint02 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link
                href="/explore/cards"
                className="text-gray-500 hover:text-main transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h2 className="text-2xl font-bold">探索情緒｜{category.name}</h2>
            </div>
            <Link
              href="/explore/selected"
              className="group px-4 py-1.5 bg-main hover:bg-main-dark text-white text-sm font-bold rounded-full flex items-center gap-1 transition-colors"
            >
              <Folder className="w-4 h-4 group-hover:hidden" />
              <FolderOpen className="w-4 h-4 hidden group-hover:block" />
              <span>我的情緒卡夾</span>
              {selectedCards.length > 0 && (
                <span className="ml-1 bg-white text-main text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {selectedCards.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl py-4 px-3 sm:px-0">
        <div className="flex flex-wrap justify-center md:justify-start gap-6 sm:gap-10 mb-16">
          {cards.map((card) => {
            const isAdded = hasCard(card.id);
            return (
              <div key={card.id} className="relative">
                {!isAdded && (
                  <button
                    type="button"
                    onClick={() => handleAddCard(card)}
                    className="absolute -top-2 -right-2 z-10 w-7 h-7 rounded-full bg-pink-tint01 hover:bg-pink text-white flex items-center justify-center shadow transition-colors"
                    title="加入卡夾"
                  >
                    <PlusCircle className="w-5 h-5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setModalCard(card)}
                  className={cn(
                    'min-w-[130px] max-w-[130px] h-[90px] sm:min-w-[180px] sm:max-w-[180px] sm:h-[110px]',
                    'flex items-center justify-center p-3 rounded-xl transition-all',
                    categoryBgColors[slug] || 'bg-gray-200',
                    isAdded && 'opacity-50'
                  )}
                >
                  <p className="w-1/2 text-lg sm:text-xl font-bold text-gray-900">
                    {card.name.length === 2
                      ? `${card.name[0]}\u00A0${card.name[1]}`
                      : card.name}
                  </p>
                  <div className="w-1/2 rounded-full overflow-hidden">
                    <Image
                      src={card.image_path || `/images/emoCards/${card.id}.svg`}
                      alt={card.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card detail modal */}
      {modalCard && (
        <EmotionCardModal
          card={modalCard}
          categorySlug={slug}
          isOpen={!!modalCard}
          onClose={() => setModalCard(null)}
          onAdd={
            !hasCard(modalCard.id)
              ? () => {
                  handleAddCard(modalCard);
                  setModalCard(null);
                }
              : undefined
          }
        />
      )}
    </main>
  );
}
