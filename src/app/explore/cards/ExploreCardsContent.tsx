'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlusCircle, Folder, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toEmotionCardData } from '@/lib/emotion-card';
import { useExploreStore } from '@/store/exploreStore';
import { EmotionCard } from '@/components/emotion/EmotionCard';
import { EmotionCardModal } from '@/components/emotion/EmotionCardModal';
import type { EmotionCategory, EmotionCard } from '@/lib/emotions';
import type { EmotionCardData } from '@/types/emotion-card';

type ViewMode = 'expanded' | 'folded' | 'table';

// Category representative card IDs for folded view
const categoryRepCards: Record<string, number> = {
  happy: 2,
  expectation: 8,
  relieved: 15,
  unstable: 21,
  amazed: 26,
  sadness: 34,
  hate: 44,
  anger: 51,
  others: 55,
};

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

const categoryBtnColors: Record<string, string> = {
  happy: 'bg-happy/70 hover:bg-happy',
  expectation: 'bg-expectation/70 hover:bg-expectation',
  relieved: 'bg-relived/70 hover:bg-relived',
  unstable: 'bg-unstable/70 hover:bg-unstable',
  amazed: 'bg-amazed/70 hover:bg-amazed',
  sadness: 'bg-sadness/70 hover:bg-sadness',
  hate: 'bg-hate/70 hover:bg-hate',
  anger: 'bg-anger/70 hover:bg-anger',
  others: 'bg-others/70 hover:bg-others',
};

interface ExploreCardsContentProps {
  categories: EmotionCategory[];
  cards: EmotionCard[];
}

export function ExploreCardsContent({ categories, cards }: ExploreCardsContentProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('expanded');
  const [showGuide, setShowGuide] = useState(true);
  const [modalCard, setModalCard] = useState<EmotionCardData | null>(null);

  const { selectedCards, addCard, hasCard } = useExploreStore();

  // Group cards by category
  const cardsByCategory = new Map<number, EmotionCard[]>();
  cards.forEach((card) => {
    const arr = cardsByCategory.get(card.category_id) || [];
    arr.push(card);
    cardsByCategory.set(card.category_id, arr);
  });

  const handleAddCard = (card: EmotionCard) => {
    const cat = categories.find((c) => c.id === card.category_id);
    const isAdded = hasCard(card.id);

    if (isAdded) {
      // Already added - show notification (could use toast)
      return;
    }

    addCard(toEmotionCardData(card, cat?.slug || 'others'));
  };

  const getCategorySlug = (cat: EmotionCategory) => cat.slug;

  return (
    <main>
      {/* Sticky header */}
      <div className="sticky top-[64px] z-30 pb-1 bg-gray-100/75 dark:bg-gray-900/75 backdrop-blur-sm">
        <div className="container mx-auto pt-4 px-3 sm:px-0">
          <div className="mb-4 pb-2 border-b-2 border-main-tint02 flex justify-between items-center flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-bold text-main md:hidden">探索情緒</h2>
              <h2 className="text-2xl font-bold text-main hidden md:block">探索情緒｜情緒卡</h2>
            </div>
            <div className="flex flex-col md:flex-row justify-end items-end md:items-center gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode('expanded')}
                  disabled={viewMode === 'expanded'}
                  className={cn(
                    'px-4 py-1.5 text-sm font-bold rounded-full border-2 transition-colors',
                    viewMode === 'expanded'
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-300 border-gray-300 dark:border-gray-700 cursor-not-allowed'
                      : 'border-main-tint01 text-main-tint01 hover:bg-main-tint03'
                  )}
                >
                  展開
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('folded')}
                  disabled={viewMode === 'folded'}
                  className={cn(
                    'px-4 py-1.5 text-sm font-bold rounded-full border-2 transition-colors',
                    viewMode === 'folded'
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-300 border-gray-300 dark:border-gray-700 cursor-not-allowed'
                      : 'border-main-tint01 text-main-tint01 hover:bg-main-tint03'
                  )}
                >
                  收合
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  disabled={viewMode === 'table'}
                  className={cn(
                    'px-4 py-1.5 text-sm font-bold rounded-full border-2 transition-colors',
                    viewMode === 'table'
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-300 border-gray-300 dark:border-gray-700 cursor-not-allowed'
                      : 'border-main-tint01 text-main-tint01 hover:bg-main-tint03'
                  )}
                >
                  情緒表
                </button>
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
      </div>

      <div className="container mx-auto py-4 px-3 sm:px-0">
        {/* Guide accordion */}
        <div className="mb-9">
          <div className="border-2 border-main-tint02 rounded-lg bg-gray-100 dark:bg-gray-900">
            <button
              type="button"
              onClick={() => setShowGuide(!showGuide)}
              className="w-full px-4 py-3 text-main font-bold text-left flex justify-between items-center"
            >
              <span>探索步驟與方法</span>
              <span className={cn('transition-transform', showGuide && 'rotate-180')}>▼</span>
            </button>
            {showGuide && (
              <div className="px-4 pb-4 text-sm">
                <h3 className="mb-1 font-bold text-gray-800 dark:text-gray-100">探索步驟</h3>
                <ol className="pl-6 mb-6 text-gray-700 dark:text-gray-100 list-decimal space-y-1">
                  <li>下滑頁面，開始瀏覽情緒卡。</li>
                  <li>
                    點擊情緒卡右上方的「
                    <span className="text-pink-tint01 font-bold">
                      <PlusCircle className="inline w-4 h-4" />
                    </span>
                    」按鈕，即可將情緒卡放進「我的情緒卡夾」中。
                  </li>
                  <li>
                    完成情緒卡挑選後，請點擊「
                    <span className="text-main font-bold">我的情緒卡夾</span>
                    」按鈕，進行<span className="text-main font-bold">下一步</span>的內容。
                  </li>
                </ol>
                <h3 className="mb-1 font-bold text-gray-800 dark:text-gray-100">瀏覽情緒卡的方法</h3>
                <ol className="pl-6 mb-4 text-gray-700 dark:text-gray-100 list-decimal space-y-1">
                  <li>
                    點擊右上方的「<span className="text-main font-bold">收合</span>」或「
                    <span className="text-main font-bold">展開</span>」按鈕，可以轉換情緒卡的展示方式。
                  </li>
                  <li>
                    點擊右上方的「<span className="text-main font-bold">情緒表</span>
                    」，可以快速瀏覽所有情緒詞彙。
                  </li>
                </ol>
              </div>
            )}
          </div>
        </div>

        {/* Expanded View */}
        {viewMode === 'expanded' && (
          <div className="space-y-6">
            {categories.map((cat) => {
              const slug = getCategorySlug(cat);
              const catCards = cardsByCategory.get(cat.id) || [];
              const styles = categoryStyles[slug] || {
                bg: 'bg-gray-200',
                hoverBorder: 'hover:border-gray-400',
              };

              return (
                <div key={cat.id} className="flex flex-nowrap gap-3">
                  {/* Category Header */}
                  <Link
                    href={`/explore/cards/${slug}`}
                    className={cn(
                      'shrink-0 w-[72px] h-[140px] mt-3 rounded-xl',
                      'flex flex-col items-center justify-center',
                      'font-bold text-main text-lg',
                      'transition-colors duration-200',
                      styles.bg,
                      styles.hoverBorder,
                      'hover:border-4'
                    )}
                  >
                    <span>{cat.name[0]}</span>
                    <span>{cat.name[1]}</span>
                  </Link>

                  {/* Cards Horizontal Scroll */}
                  <div className="flex gap-4 overflow-x-auto pt-3 pr-2 pb-2">
                    {catCards.map((card) => {
                      const isAdded = hasCard(card.id);
                      return (
                        <EmotionCard
                          key={card.id}
                          card={toEmotionCardData(card, slug)}
                          onCardClick={() => setModalCard(toEmotionCardData(card, slug))}
                          action={
                            isAdded
                              ? { kind: 'added', label: '已加入卡夾' }
                              : {
                                  kind: 'add',
                                  label: '加入卡夾',
                                  onClick: () => handleAddCard(card),
                                }
                          }
                          dimmed={isAdded}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Folded View - Category cards */}
        {viewMode === 'folded' && (
          <div className="mt-6 mb-16">
            <ul className="mb-9 text-gray-800 dark:text-gray-100 text-sm">
              <li>🔍 以下共有 9 張分類卡，點擊分類卡後，即可進入該分類的情緒卡頁。</li>
            </ul>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {categories.map((cat) => {
                const slug = getCategorySlug(cat);
                const styles = categoryStyles[slug] || {
                  bg: 'bg-gray-200',
                  hoverBorder: 'hover:border-gray-400',
                };
                const repCardId = categoryRepCards[slug];

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
                    <p className="text-lg font-bold text-main mt-2">
                      {cat.name[0]}&nbsp;{cat.name[1]}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Table View - Emotion word buttons */}
        {viewMode === 'table' && (
          <div className="mt-6 mb-16">
            <p className="mb-8 px-1 md:px-3 text-gray-800 dark:text-gray-100 text-sm">
              🔎 請點擊下方各個情緒名詞，可以展開觀看詳細的情緒資訊。
            </p>
            {categories.map((cat) => {
              const slug = getCategorySlug(cat);
              const catCards = cardsByCategory.get(cat.id) || [];
              return (
                <div key={cat.id} className="flex flex-nowrap mt-4">
                  <Link
                    href={`/explore/cards/${slug}`}
                    className={cn(
                      'shrink-0 mr-3 mt-2 px-3 py-1 rounded-full font-bold text-sm',
                      'flex items-center justify-center whitespace-nowrap transition-colors',
                      categoryBtnColors[slug]
                    )}
                  >
                    {cat.name}
                  </Link>
                  <div className="flex items-center overflow-x-auto pt-3 mb-1 gap-4">
                    {catCards.map((card) => {
                      const isAdded = hasCard(card.id);
                      return (
                        <div key={card.id} className="relative shrink-0">
                          {!isAdded && (
                            <button
                              type="button"
                              onClick={() => handleAddCard(card)}
                              className="absolute -top-1.5 -right-1.5 z-10 w-5 h-5 rounded-full bg-pink-tint01 hover:bg-pink text-white flex items-center justify-center shadow transition-colors"
                              title="加入卡夾"
                            >
                              <PlusCircle className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setModalCard(card)}
                            className={cn(
                              'px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors',
                              categoryBtnColors[slug],
                              isAdded && 'opacity-25'
                            )}
                          >
                            {card.name}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Card detail modal */}
      {modalCard && (
        <EmotionCardModal
          card={modalCard}
          categorySlug={modalCard.categoryName}
          isOpen={!!modalCard}
          onClose={() => setModalCard(null)}
          onAdd={
            !hasCard(modalCard.id)
              ? () => {
                  addCard(modalCard);
                  setModalCard(null);
                }
              : undefined
          }
        />
      )}
    </main>
  );
}
