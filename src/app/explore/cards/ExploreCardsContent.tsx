'use client';

import { Folder, FolderOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { PAGE_CONTAINER, STICKY_TITLE_BAR } from '@/lib/layout';
import { cn } from '@/lib/utils';
import { useExploreCards } from '@/hooks/useExploreCards';
import { EmotionCardModal } from '@/components/emotion/EmotionCardModal';
import { Button } from '@/components/ui/button';
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
    <section className="grow min-w-0" aria-label={t('aria.section')}>
      {/* Sticky header */}
      <div className={STICKY_TITLE_BAR}>
        <div className={cn(PAGE_CONTAINER, 'pt-4')}>
          <div className="mb-4 pb-2 border-b-2 border-main-tint02 flex justify-between items-center flex-wrap gap-2">
            <div>
              <h2 className="md:hidden">{t('titles.mobile')}</h2>
              <h2 className="hidden md:block">{t('titles.desktop')}</h2>
            </div>
            <div className="flex flex-col md:flex-row justify-end items-end md:items-center gap-2">
              <div className="flex items-center gap-2">
                {(['expanded', 'folded', 'table'] as const).map((mode) => (
                  <Button
                    key={mode}
                    variant={viewMode === mode ? 'main' : 'main-outline'}
                    aria-pressed={viewMode === mode}
                    onClick={() => setViewMode(mode)}
                  >
                    {mode === 'expanded' && t('view.expand')}
                    {mode === 'folded' && t('view.collapse')}
                    {mode === 'table' && t('view.table')}
                  </Button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleOpenHolder}
                className="type-button group w-60 px-4 py-1.5 bg-main hover:bg-main-dark text-white font-bold rounded-full flex justify-center items-center gap-1 transition-colors"
              >
                <Folder className="w-4 h-4 group-hover:hidden" />
                <FolderOpen className="w-4 h-4 hidden group-hover:block" />
                <span>{t('actions.openHolder')}</span>
                {selectedCards.length > 0 && (
                  <span className="type-caption ml-1 bg-background text-main font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {selectedCards.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={cn(PAGE_CONTAINER, 'py-4')}>
        {/* Guide accordion */}
        <div className="mb-9">
          <div className="border-2 border-main-tint02 rounded-lg bg-background">
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
                <h3 className="type-body-sm mb-1 font-bold text-foreground">{t('guide.stepsTitle')}</h3>
                <ol className="pl-6 mb-6 text-foreground list-decimal space-y-1">
                  <li>{t('guide.steps.0')}</li>
                  <li>{t('guide.steps.1')}</li>
                  <li>{t('guide.steps.2')}</li>
                </ol>
                <h3 className="type-body-sm mb-1 font-bold text-foreground">{t('guide.browseTitle')}</h3>
                <ol className="pl-6 mb-4 text-foreground list-decimal space-y-1">
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
