'use client';

import { Folder, FolderOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { AUTH_STICKY_TOP } from '@/lib/layout';
import { cn } from '@/lib/utils';
import { useExploreCards } from '@/hooks/useExploreCards';
import { EmotionCardModal } from '@/components/emotion/EmotionCardModal';
import { ExpandedView, FoldedView, TableView } from './views';
import { ExploreErrorModal } from './ExploreErrorModal';
import type { EmotionCategory, EmotionCard as EmotionCardRecord } from '@/lib/emotions';

interface ExploreCardsContentProps {
  categories: EmotionCategory[];
  cards: EmotionCardRecord[];
}

export function ExploreCardsContent({ categories, cards }: ExploreCardsContentProps) {
  const t = useTranslations('explore.cards');

  const {
    viewMode,
    setViewMode,
    showGuide,
    setShowGuide,
    modalCard,
    setModalCard,
    showError,
    setShowError,
    selectedCards,
    isSelectionFull,
    hasCard,
    removeCard,
    cardsByCategory,
    handleAddCard,
    handleOpenHolder,
  } = useExploreCards(categories, cards);

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
                {(['expanded', 'folded', 'table'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setViewMode(mode)}
                    disabled={viewMode === mode}
                    className={cn(
                      'type-button px-4 py-1.5 font-bold rounded-full border-2 transition-colors',
                      viewMode === mode
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-300 border-gray-300 dark:border-gray-700 cursor-not-allowed'
                        : 'border-main-tint01 text-main-tint01 hover:bg-main-tint03'
                    )}
                  >
                    {mode === 'expanded' && t('view.expand')}
                    {mode === 'folded' && t('view.collapse')}
                    {mode === 'table' && t('view.table')}
                  </button>
                ))}
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
              <span className={cn('transition-transform', showGuide && 'rotate-180')}>&#x25BC;</span>
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

        {/* View modes */}
        {viewMode === 'expanded' && (
          <ExpandedView
            categories={categories}
            cardsByCategory={cardsByCategory}
            hasCard={hasCard}
            isSelectionFull={isSelectionFull}
            onAddCard={handleAddCard}
            onRemoveCard={removeCard}
            onCardClick={setModalCard}
            t={t}
          />
        )}

        {viewMode === 'folded' && <FoldedView categories={categories} t={t} />}

        {viewMode === 'table' && (
          <TableView
            categories={categories}
            cardsByCategory={cardsByCategory}
            hasCard={hasCard}
            isSelectionFull={isSelectionFull}
            onAddCard={handleAddCard}
            onRemoveCard={removeCard}
            onCardClick={setModalCard}
            t={t}
          />
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

      {/* Error modal */}
      <ExploreErrorModal error={showError} onClose={() => setShowError(null)} />
    </section>
  );
}
