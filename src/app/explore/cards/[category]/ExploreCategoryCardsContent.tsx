'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlusCircle, ArrowLeft, Folder, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useExploreStore } from '@/store/exploreStore';
import { EmotionCardModal } from '@/components/emotion/EmotionCardModal';
import type { EmotionCategory, EmotionCard } from '@/lib/emotions';

// Category colors mapping (matching EmoCardsContent)
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
      <div className="sticky top-[64px] z-30 pb-1 bg-gray-100/75 dark:bg-gray-900/75 backdrop-blur-sm">
        <div className="container mx-auto pt-4 px-3 sm:px-0">
          <div className="mb-4 pb-2 border-b-2 border-main-tint02 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link
                href="/explore/cards"
                className="text-gray-800 dark:text-gray-100 hover:text-main transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h2 className="text-2xl font-bold text-[#3C9DAE]">探索情緒｜{category.name}</h2>
            </div>
            <Link
              href="/explore/selected"
              className="group px-4 py-1.5 bg-main hover:bg-main-dark text-white text-sm font-bold rounded-full flex items-center gap-1 transition-colors"
            >
              <Folder className="w-4 h-4 group-hover:hidden" />
              <FolderOpen className="w-4 h-4 hidden group-hover:block" />
              <span>我的情緒卡夾</span>
              {selectedCards.length > 0 && (
                <span className="ml-1 bg-gray-100 dark:bg-gray-900 text-main text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {selectedCards.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-4 px-3 sm:px-0">
        <div className="flex flex-wrap justify-center md:justify-start gap-6 sm:gap-10 pt-2 pr-2 mb-16">
          {cards.map((card) => {
            const isAdded = hasCard(card.id);
            const styles = categoryStyles[slug] || {
              bg: 'bg-gray-200',
              hoverBorder: 'hover:border-gray-400',
            };
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
                    'group w-[140px] h-[140px] rounded-xl',
                    'flex flex-col items-center justify-center p-3',
                    'transition-all duration-200',
                    styles.bg,
                    styles.hoverBorder,
                    'hover:border-4 hover:p-2',
                    isAdded && 'opacity-50'
                )}
              >
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-900 mb-2">
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
