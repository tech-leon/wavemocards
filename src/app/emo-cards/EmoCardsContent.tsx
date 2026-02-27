'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { categoryRepresentativeCards } from '@/lib/emotions';
import { EmotionCardModal } from '@/components/emotion/EmotionCardModal';
import { EmotionTable } from '@/components/emotion/EmotionTable';
import { BackToTopButton } from '@/components/ui/BackToTopButton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type ViewMode = 'expanded' | 'folded' | 'table';

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

interface EmoCardsContentProps {
  categories: EmotionCategory[];
  cardsByCategoryObj: Record<number, EmotionCard[]>;
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

export function EmoCardsContent({
  categories,
  cardsByCategoryObj,
}: EmoCardsContentProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('expanded');
  const [selectedCard, setSelectedCard] = useState<EmotionCard | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('');

  // Convert object to Map for EmotionTable
  const cardsByCategory = new Map<number, EmotionCard[]>();
  Object.entries(cardsByCategoryObj).forEach(([key, value]) => {
    cardsByCategory.set(Number(key), value);
  });

  const handleCardClick = (card: EmotionCard, categorySlug: string) => {
    setSelectedCard(card);
    setSelectedCategorySlug(categorySlug);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setSelectedCategorySlug('');
  };

  return (
    <>
      <main className="px-3 sm:px-0">
        <div className="container mx-auto py-4 pt-9 pb-18" id="top">
          {/* Header */}
          <div className="pb-2 border-b-2 border-main-tint02 flex justify-between items-center">
            <h2 className="text-2xl font-bold">認識情緒</h2>
            <div className="flex justify-end gap-4">
              <Link
                href="/about-emotions"
                className="px-4 py-2 border border-main text-main rounded-full hover:bg-main hover:text-white transition-colors font-medium"
              >
                認識情緒
              </Link>
              <span className="px-4 py-2 text-muted-foreground font-medium">情緒卡</span>
            </div>
          </div>

          {/* View Mode Buttons */}
          <div className="sticky top-[77px] z-40 bg-background/75 backdrop-blur-sm">
            <div className="py-6 flex justify-end items-center gap-2 md:gap-3">
              <button
                onClick={() => setViewMode('expanded')}
                disabled={viewMode === 'expanded'}
                className={cn(
                  'px-4 py-2 rounded-full font-bold text-nowrap transition-colors',
                  viewMode === 'expanded'
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'border border-main-tint01 text-main-tint01 hover:bg-main-tint01 hover:text-white'
                )}
              >
                展開
              </button>
              <button
                onClick={() => setViewMode('folded')}
                disabled={viewMode === 'folded'}
                className={cn(
                  'px-4 py-2 rounded-full font-bold text-nowrap transition-colors',
                  viewMode === 'folded'
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'border border-main-tint01 text-main-tint01 hover:bg-main-tint01 hover:text-white'
                )}
              >
                收合
              </button>
              <button
                onClick={() => setViewMode('table')}
                disabled={viewMode === 'table'}
                className={cn(
                  'px-4 py-2 rounded-full font-bold text-nowrap transition-colors',
                  viewMode === 'table'
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'border border-main-tint01 text-main-tint01 hover:bg-main-tint01 hover:text-white'
                )}
              >
                情緒表
              </button>
            </div>
          </div>

          {/* Instructions Accordion */}
          <Accordion type="single" collapsible className="mb-12">
            <AccordionItem
              value="instructions"
              className="border-2 border-main-tint02 rounded-lg bg-card last:border-b-2"
            >
              <AccordionTrigger className="px-4 py-3 text-main font-bold hover:no-underline">
                瀏覽情緒卡的方法
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-sm">
                <h3 className="mb-2 font-bold text-card-foreground">介面的種類</h3>
                <ol className="pl-6 mb-6 text-muted-foreground list-decimal space-y-1">
                  <li>
                    點擊右上方的「<span className="px-1 font-bold text-main">收合</span>
                    」或「<span className="px-1 font-bold text-main">展開</span>
                    」按鈕，可以轉換情緒卡的展示方式。
                  </li>
                  <li>
                    點擊右上方的「<span className="px-1 font-bold text-main">情緒表</span>
                    」，可以快速瀏覽所有情緒詞彙。
                  </li>
                </ol>
                <h3 className="mb-2 font-bold text-card-foreground">各個介面的使用說明</h3>
                <ol className="pl-6 mb-6 text-muted-foreground list-decimal space-y-2">
                  <li>
                    <span className="font-bold">展開</span>：
                    <p className="text-muted-foreground">
                      點擊單張「<span className="px-1">情緒卡</span>
                      」，可以查看關於該情緒的詳細內容。
                    </p>
                  </li>
                  <li>
                    <span className="font-bold">收合</span>：
                    <p className="text-muted-foreground">
                      共有 9 張分類卡，點擊單張「<span className="px-1">分類卡</span>
                      」後，即可進入該分類的情緒卡頁面。
                    </p>
                  </li>
                  <li>
                    <span className="font-bold">情緒表</span>：
                    <p className="text-muted-foreground">
                      點擊單一「<span className="px-1">情緒詞彙</span>
                      」，可以查看關於該情緒的詳細內容。
                    </p>
                  </li>
                </ol>
                <p className="text-gray-600 text-xs">
                  💬 透過點擊 標題「瀏覽情緒卡的方法」的區塊，可將此說明收合。
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Expanded View */}
          {viewMode === 'expanded' && (
            <div className="space-y-6">
              {categories.map((category) => {
                const cards = cardsByCategoryObj[category.id] || [];
                const styles = categoryStyles[category.slug] || {
                  bg: 'bg-gray-200',
                  hoverBorder: 'hover:border-gray-400',
                };

                return (
                  <div key={category.id} className="flex flex-nowrap gap-3">
                    {/* Category Header */}
                    <Link
                      href={`/emo-cards/${category.slug}`}
                      className={cn(
                        'flex-shrink-0 w-[72px] h-[140px] rounded-xl',
                        'flex flex-col items-center justify-center',
                        'font-bold text-gray-900 text-lg',
                        'transition-colors duration-200',
                        styles.bg,
                        styles.hoverBorder,
                        'hover:border-4'
                      )}
                    >
                      <span>{category.name[0]}</span>
                      <span>{category.name[1]}</span>
                    </Link>

                    {/* Cards Horizontal Scroll */}
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {cards.map((card) => (
                        <button
                          key={card.id}
                          onClick={() => handleCardClick(card, category.slug)}
                          className={cn(
                            'group flex-shrink-0 w-[140px] h-[140px] rounded-xl',
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
                );
              })}
            </div>
          )}

          {/* Folded View - Category Cards */}
          {viewMode === 'folded' && (
            <div className="mt-6 mb-18">
              <ul className="mb-9 text-muted-foreground text-sm">
                <li>🔍 以下共有 9 張分類卡，點擊分類卡後，即可進入該分類的情緒卡頁。</li>
              </ul>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {categories.map((category) => {
                  const styles = categoryStyles[category.slug] || {
                    bg: 'bg-gray-200',
                    hoverBorder: 'hover:border-gray-400',
                  };
                  const representativeCardId =
                    categoryRepresentativeCards[category.slug] || category.id;

                  return (
                    <Link
                      key={category.id}
                      href={`/emo-cards/${category.slug}`}
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
                        {category.name[0]}&nbsp;{category.name[1]}
                      </p>
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={`/images/emoCards/${representativeCardId}.svg`}
                          alt={category.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Table View */}
          {viewMode === 'table' && (
            <div className="mt-6 mb-18">
              <EmotionTable
                categories={categories}
                cardsByCategory={cardsByCategory}
                onCardClick={handleCardClick}
              />
            </div>
          )}
        </div>
      </main>

      {/* Emotion Card Modal */}
      <EmotionCardModal
        card={selectedCard}
        categorySlug={selectedCategorySlug}
        isOpen={!!selectedCard}
        onClose={handleCloseModal}
      />

      <BackToTopButton />
    </>
  );
}
