'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlusCircle, Folder, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useExploreStore } from '@/store/exploreStore';
import { EmotionCardModal } from '@/components/emotion/EmotionCardModal';
import type { EmotionCategory, EmotionCard } from '@/lib/emotions';

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

// Emotion category color classes
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

const categoryHeadColors: Record<string, string> = {
  happy: 'bg-happy/80 hover:bg-happy',
  expectation: 'bg-expectation/80 hover:bg-expectation',
  relieved: 'bg-relived/80 hover:bg-relived',
  unstable: 'bg-unstable/80 hover:bg-unstable',
  amazed: 'bg-amazed/80 hover:bg-amazed',
  sadness: 'bg-sadness/80 hover:bg-sadness',
  hate: 'bg-hate/80 hover:bg-hate',
  anger: 'bg-anger/80 hover:bg-anger',
  others: 'bg-others/80 hover:bg-others',
};

interface ExploreCardsContentProps {
  categories: EmotionCategory[];
  cards: EmotionCard[];
}

export function ExploreCardsContent({ categories, cards }: ExploreCardsContentProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('expanded');
  const [showGuide, setShowGuide] = useState(true);
  const [modalCard, setModalCard] = useState<EmotionCard | null>(null);

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

    addCard({
      id: card.id,
      name: card.name,
      categoryId: card.category_id,
      categoryName: cat?.slug || 'others',
      description: card.description || undefined,
      example: card.example || undefined,
      imagePath: card.image_path || undefined,
    });
  };

  const getCategorySlug = (cat: EmotionCategory) => cat.slug;

  return (
    <main>
      {/* Sticky header */}
      <div className="sticky top-[64px] z-30 pb-1 bg-white">
        <div className="container mx-auto max-w-6xl pt-4 px-3 sm:px-0">
          <div className="mb-4 pb-2 border-b-2 border-main-tint02 flex justify-between items-center flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-bold md:hidden">探索情緒</h2>
              <h2 className="text-2xl font-bold hidden md:block">探索情緒｜情緒卡</h2>
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
                      ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
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
                      ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
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
                      ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
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
                  <span className="ml-1 bg-white text-main text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {selectedCards.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl py-4 px-3 sm:px-0">
        {/* Guide accordion */}
        <div className="mb-9">
          <div className="border-2 border-main-tint02 rounded-lg bg-white">
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
                <h3 className="mb-1 font-bold text-gray-700">探索步驟</h3>
                <ol className="pl-6 mb-6 text-gray-600 list-decimal space-y-1">
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
                <h3 className="mb-1 font-bold text-gray-700">瀏覽情緒卡的方法</h3>
                <ol className="pl-6 mb-4 text-gray-600 list-decimal space-y-1">
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
          <div>
            {categories.map((cat) => {
              const slug = getCategorySlug(cat);
              const catCards = cardsByCategory.get(cat.id) || [];
              return (
                <div key={cat.id} className="mb-5 flex flex-nowrap">
                  <Link
                    href={`/explore/cards/${slug}`}
                    className={cn(
                      'shrink-0 w-[60px] sm:w-[80px] mr-4 mt-5 rounded-xl flex flex-col items-center justify-center py-3',
                      'text-gray-900 font-bold text-base sm:text-lg transition-all hover:shadow-md',
                      categoryHeadColors[slug]
                    )}
                  >
                    {cat.name.split('').map((char, i) => (
                      <span key={i}>{char}</span>
                    ))}
                  </Link>
                  <div className="flex overflow-x-auto pt-5 gap-7 pb-2">
                    {catCards.map((card) => {
                      const isAdded = hasCard(card.id);
                      return (
                        <div key={card.id} className="relative shrink-0">
                          {/* Add button */}
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
                              categoryBgColors[slug],
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
              );
            })}
          </div>
        )}

        {/* Folded View - Category cards */}
        {viewMode === 'folded' && (
          <div className="mt-6 mb-16">
            <p className="mb-6 text-gray-550 text-sm">
              🔍 以下共有 9 張分類卡，點擊分類卡後，即可進入該分類的情緒卡頁。
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {categories.map((cat) => {
                const slug = getCategorySlug(cat);
                const repCardId = categoryRepCards[slug];
                return (
                  <Link
                    key={cat.id}
                    href={`/explore/cards/${slug}`}
                    className={cn(
                      'group min-w-[130px] max-w-[130px] h-[90px] sm:min-w-[180px] sm:max-w-[180px] sm:h-[110px]',
                      'flex items-center justify-center p-3 rounded-xl transition-all',
                      'hover:p-1.5 hover:border-4 hover:shadow-md',
                      categoryBgColors[slug]
                    )}
                  >
                    <p className="w-1/2 text-lg sm:text-xl font-bold text-gray-900">
                      {cat.name.length === 2
                        ? `${cat.name[0]}\u00A0${cat.name[1]}`
                        : cat.name}
                    </p>
                    <div className="w-1/2 rounded-full overflow-hidden">
                      <Image
                        src={`/images/emoCards/${repCardId}.svg`}
                        alt={cat.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Table View - Emotion word buttons */}
        {viewMode === 'table' && (
          <div className="mt-6 mb-16">
            <p className="mb-8 px-1 md:px-3 text-gray-550 text-sm">
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
          categorySlug={categories.find((c) => c.id === modalCard.category_id)?.slug || 'others'}
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
