'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlusCircle, XCircle, Folder, FolderOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { AUTH_STICKY_TOP } from '@/lib/layout';
import { cn } from '@/lib/utils';
import { toEmotionCardData } from '@/lib/emotion-card';
import { useExploreStore } from '@/store/exploreStore';
import { EmotionCard as EmotionCardComponent } from '@/components/emotion/EmotionCard';
import { EmotionCardModal } from '@/components/emotion/EmotionCardModal';
import type { EmotionCategory, EmotionCard as EmotionCardRecord } from '@/lib/emotions';
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
  cards: EmotionCardRecord[];
}

export function ExploreCardsContent({ categories, cards }: ExploreCardsContentProps) {
  const t = useTranslations('explore.cards');
  const tCommon = useTranslations('common.actions');
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('expanded');
  const [showGuide, setShowGuide] = useState(false);
  const [modalCard, setModalCard] = useState<EmotionCardData | null>(null);
  const [showError, setShowError] = useState<'tooFew' | 'tooMany' | null>(null);

  const { selectedCards, addCard, removeCard, hasCard } = useExploreStore();
  const selectedCount = selectedCards.length;
  const isSelectionFull = selectedCount >= 3;

  // Group cards by category
  const cardsByCategory = new Map<number, EmotionCardRecord[]>();
  cards.forEach((card) => {
    const arr = cardsByCategory.get(card.category_id) || [];
    arr.push(card);
    cardsByCategory.set(card.category_id, arr);
  });

  const handleAddCard = (card: EmotionCardRecord) => {
    const cat = categories.find((c) => c.id === card.category_id);
    const isAdded = hasCard(card.id);

    if (isAdded) {
      // Already added - show notification (could use toast)
      return;
    }

    addCard(toEmotionCardData(card, cat?.slug || 'others'));
  };

  const getCategorySlug = (cat: EmotionCategory) => cat.slug;

  const handleOpenHolder = () => {
    if (selectedCards.length === 0) {
      setShowError('tooFew');
      return;
    }

    if (selectedCards.length > 3) {
      setShowError('tooMany');
      return;
    }

    router.push('/explore/strength/1');
  };

  return (
    <section aria-label={t('aria.section')}>
      {/* Sticky header */}
      <div className={cn('sticky z-30 pb-1 bg-gray-100/75 dark:bg-gray-900/75 backdrop-blur-sm', AUTH_STICKY_TOP)}>
        <div className="container mx-auto pt-4 px-3 sm:px-0">
          <div className="mb-4 pb-2 border-b-2 border-main-tint02 flex justify-between items-center flex-wrap gap-2">
            <div>
              <h2 className="md:hidden">{t('titles.mobile')}</h2>
              <h2 className="hidden md:block">{t('titles.desktop')}</h2>
            </div>
            <div className="flex flex-col md:flex-row justify-end items-end md:items-center gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode('expanded')}
                  disabled={viewMode === 'expanded'}
                  className={cn(
                    'type-button px-4 py-1.5 font-bold rounded-full border-2 transition-colors',
                    viewMode === 'expanded'
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-300 border-gray-300 dark:border-gray-700 cursor-not-allowed'
                      : 'border-main-tint01 text-main-tint01 hover:bg-main-tint03'
                  )}
                >
                  {t('view.expand')}
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('folded')}
                  disabled={viewMode === 'folded'}
                  className={cn(
                    'type-button px-4 py-1.5 font-bold rounded-full border-2 transition-colors',
                    viewMode === 'folded'
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-300 border-gray-300 dark:border-gray-700 cursor-not-allowed'
                      : 'border-main-tint01 text-main-tint01 hover:bg-main-tint03'
                  )}
                >
                  {t('view.collapse')}
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  disabled={viewMode === 'table'}
                  className={cn(
                    'type-button px-4 py-1.5 font-bold rounded-full border-2 transition-colors',
                    viewMode === 'table'
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-300 border-gray-300 dark:border-gray-700 cursor-not-allowed'
                      : 'border-main-tint01 text-main-tint01 hover:bg-main-tint03'
                  )}
                >
                  {t('view.table')}
                </button>
              </div>
              <button
                type="button"
                onClick={handleOpenHolder}
                className="type-button group px-4 py-1.5 bg-main hover:bg-main-dark text-white font-bold rounded-full flex items-center gap-1 transition-colors"
              >
                <Folder className="w-4 h-4 group-hover:hidden" />
                <FolderOpen className="w-4 h-4 hidden group-hover:block" />
                <span>{t('actions.openHolder')}</span>
                {selectedCards.length > 0 && (
                  <span className="type-caption ml-1 bg-gray-100 dark:bg-gray-900 text-main font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {selectedCards.length}
                  </span>
                )}
              </button>
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
              <span>{t('guide.title')}</span>
              <span className={cn('transition-transform', showGuide && 'rotate-180')}>▼</span>
            </button>
            {showGuide && (
              <div className="type-body-sm px-4 pb-4">
                <h3 className="type-body-sm mb-1 font-bold text-gray-800 dark:text-gray-100">{t('guide.stepsTitle')}</h3>
                <ol className="pl-6 mb-6 text-gray-700 dark:text-gray-100 list-decimal space-y-1">
                  <li>{t('guide.steps.0')}</li>
                  <li>{t('guide.steps.1')}</li>
                  <li>{t('guide.steps.2')}</li>
                </ol>
                <h3 className="type-body-sm mb-1 font-bold text-gray-800 dark:text-gray-100">{t('guide.browseTitle')}</h3>
                <ol className="pl-6 mb-4 text-gray-700 dark:text-gray-100 list-decimal space-y-1">
                  <li>{t('guide.browseMethods.0')}</li>
                  <li>{t('guide.browseMethods.1')}</li>
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
                      'type-subsection-title',
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
                      const action = isAdded
                        ? {
                            kind: 'remove' as const,
                            label: t('actions.removeFromHolder'),
                            onClick: () => removeCard(card.id),
                          }
                        : isSelectionFull
                          ? undefined
                          : {
                              kind: 'add' as const,
                              label: t('actions.addToHolder'),
                              onClick: () => handleAddCard(card),
                            };

                      return (
                        <EmotionCardComponent
                          key={card.id}
                          card={toEmotionCardData(card, slug)}
                          onCardClick={() => setModalCard(toEmotionCardData(card, slug))}
                          action={action}
                          dimmed={isAdded}
                          locked={!isAdded && isSelectionFull}
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
            <ul className="type-body-sm mb-9 text-gray-800 dark:text-gray-100">
              <li>{t('guide.categoryCardsHint')}</li>
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
                    <p className="type-subsection-title mt-2">
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
            <p className="type-body-sm mb-8 px-1 md:px-3 text-gray-800 dark:text-gray-100">
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
                      'type-button shrink-0 mr-3 mt-2 px-3 py-1 rounded-full font-bold',
                      'flex items-center justify-center whitespace-nowrap transition-colors',
                      categoryBtnColors[slug]
                    )}
                  >
                    {cat.name}
                  </Link>
                  <div className="flex items-center overflow-x-auto pt-3 mb-1 gap-4">
                    {catCards.map((card) => {
                      const isAdded = hasCard(card.id);
                      const isLocked = !isAdded && isSelectionFull;

                      return (
                        <div key={card.id} className="relative shrink-0">
                          {isAdded ? (
                            <button
                              type="button"
                              onClick={() => removeCard(card.id)}
                              className="absolute -top-1.5 -right-1.5 z-10 w-5 h-5 rounded-full bg-pink-tint01 hover:bg-pink text-white flex items-center justify-center shadow transition-colors"
                              title={t('actions.removeFromHolder')}
                            >
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          ) : !isLocked ? (
                            <button
                              type="button"
                              onClick={() => handleAddCard(card)}
                              className="absolute -top-1.5 -right-1.5 z-10 w-5 h-5 rounded-full bg-pink-tint01 hover:bg-pink text-white flex items-center justify-center shadow transition-colors"
                              title={t('actions.addToHolder')}
                            >
                              <PlusCircle className="w-3.5 h-3.5" />
                            </button>
                          ) : null}
                          <button
                            type="button"
                            onClick={() => setModalCard(toEmotionCardData(card, slug))}
                            className={cn(
                              'type-button px-3 py-1 rounded-full whitespace-nowrap transition-colors',
                              categoryBtnColors[slug],
                              isAdded && 'opacity-25',
                              isLocked && 'grayscale opacity-40'
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
          categorySlug={modalCard.categorySlug}
          isOpen={!!modalCard}
          onClose={() => setModalCard(null)}
          showCloseButton={false}
        />
      )}

      {showError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowError(null)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative bg-gray-100 dark:bg-gray-900 rounded-2xl max-w-sm w-full p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="type-page-title mb-3 text-pink">
              {showError === 'tooFew' ? t('errors.tooFewTitle') : t('errors.tooManyTitle')}
            </p>
            {showError === 'tooFew' ? (
              <p className="type-body-sm mb-4 text-gray-800 dark:text-gray-100">
                {t('errors.tooFewDescription')}
              </p>
            ) : (
              <div className="type-body-sm mb-4 text-gray-800 dark:text-gray-100">
                <p>{t('errors.tooManyDescriptionLine1')}</p>
                <p>{t('errors.tooManyDescriptionLine2')}</p>
              </div>
            )}
            <Image src="/images/addCardFail.svg" alt="" width={150} height={150} className="mx-auto mb-4" />
            <button
              type="button"
              onClick={() => setShowError(null)}
              className="type-button px-6 py-2 rounded-full bg-pink hover:bg-pink-dark text-white font-bold"
            >
              {tCommon('confirm')}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
