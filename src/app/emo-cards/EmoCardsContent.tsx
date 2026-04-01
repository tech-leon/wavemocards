'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { toEmotionCardData } from '@/lib/emotion-card';
import { categoryRepresentativeCards } from '@/lib/emotions';
import { EmotionCard } from '@/components/emotion/EmotionCard';
import { EmotionCardModal } from '@/components/emotion/EmotionCardModal';
import { getEmotionCardCategoryStyle } from '@/components/emotion/emotion-card-config';
import { EmotionTable } from '@/components/emotion/EmotionTable';
import { BackToTopButton } from '@/components/ui/BackToTopButton';
import { localizeHref, type Locale } from '@/lib/i18n/locale';
import type { EmotionCardData } from '@/types/emotion-card';
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
  locale: Locale;
}

export function EmoCardsContent({
  categories,
  cardsByCategoryObj,
  locale,
}: EmoCardsContentProps) {
  const t = useTranslations('emoCards.overview');
  const [viewMode, setViewMode] = useState<ViewMode>('expanded');
  const [selectedCard, setSelectedCard] = useState<EmotionCardData | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('');

  // Convert object to Map for EmotionTable
  const cardsByCategory = new Map<number, EmotionCard[]>();
  Object.entries(cardsByCategoryObj).forEach(([key, value]) => {
    cardsByCategory.set(Number(key), value);
  });

  const handleCardClick = (card: EmotionCard, categorySlug: string) => {
    setSelectedCard(toEmotionCardData(card, categorySlug));
    setSelectedCategorySlug(categorySlug);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setSelectedCategorySlug('');
  };

  return (
    <>
      <div className="grow px-3 sm:px-0">
        <div className="container mx-auto py-4 pt-9 pb-18" id="top">
          {/* Header */}
          <div className="pb-2 border-b-2 border-main-tint02 flex justify-between items-center">
            <h2>{t('pageTitle')}</h2>
            <div className="flex justify-end gap-4">
              <Link
                href={localizeHref('/about-emotions', locale)}
                className="px-4 py-2 border border-main text-main rounded-full hover:bg-main hover:text-white transition-colors font-medium"
              >
                {t('tabs.aboutEmotions')}
              </Link>
              <span className="px-4 py-2 text-gray-500 dark:text-gray-300 font-medium">{t('tabs.emoCards')}</span>
            </div>
          </div>

          {/* View Mode Buttons */}
          <div className="sticky top-[77px] z-40 bg-gray-100/75 dark:bg-gray-900/75 backdrop-blur-sm">
            <div className="py-6 flex justify-end items-center gap-2 md:gap-3">
              <button
                onClick={() => setViewMode('expanded')}
                disabled={viewMode === 'expanded'}
                className={cn(
                  'px-4 py-2 rounded-full font-bold text-nowrap transition-colors',
                  viewMode === 'expanded'
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 cursor-not-allowed'
                    : 'border border-main-tint01 text-main-tint01 hover:bg-main-tint01 hover:text-white'
                )}
              >
                {t('view.expand')}
              </button>
              <button
                onClick={() => setViewMode('folded')}
                disabled={viewMode === 'folded'}
                className={cn(
                  'px-4 py-2 rounded-full font-bold text-nowrap transition-colors',
                  viewMode === 'folded'
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 cursor-not-allowed'
                    : 'border border-main-tint01 text-main-tint01 hover:bg-main-tint01 hover:text-white'
                )}
              >
                {t('view.collapse')}
              </button>
              <button
                onClick={() => setViewMode('table')}
                disabled={viewMode === 'table'}
                className={cn(
                  'px-4 py-2 rounded-full font-bold text-nowrap transition-colors',
                  viewMode === 'table'
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 cursor-not-allowed'
                    : 'border border-main-tint01 text-main-tint01 hover:bg-main-tint01 hover:text-white'
                )}
              >
                {t('view.table')}
              </button>
            </div>
          </div>

          {/* Instructions Accordion */}
          <Accordion type="single" collapsible className="mb-12">
            <AccordionItem
              value="instructions"
              className="border-2 border-main-tint02 rounded-lg bg-gray-100 dark:bg-gray-900 last:border-b-2"
            >
              <AccordionTrigger className="px-4 py-3 text-main font-bold hover:no-underline">
                {t('guide.title')}
              </AccordionTrigger>
              <AccordionContent className="type-body-sm px-4 pb-4">
                <h3 className="type-body-sm mb-2 font-bold text-gray-800 dark:text-gray-100">{t('guide.interfaceTypes')}</h3>
                <ol className="pl-6 mb-6 text-gray-700 dark:text-gray-100 list-decimal space-y-1">
                  <li>{t('guide.switchViewDescription')}</li>
                  <li>{t('guide.tableDescription')}</li>
                </ol>
                <h3 className="type-body-sm mb-2 font-bold text-gray-800 dark:text-gray-100">{t('guide.usageByView')}</h3>
                <ol className="pl-6 mb-6 text-gray-800 dark:text-gray-100 list-decimal space-y-2">
                  <li>
                    <span className="font-bold">{t('guide.expand.title')}</span>：
                    <p className="text-gray-700 dark:text-gray-100">
                      {t('guide.expand.description')}
                    </p>
                  </li>
                  <li>
                    <span className="font-bold">{t('guide.collapse.title')}</span>：
                    <p className="text-gray-700 dark:text-gray-100">
                      {t('guide.collapse.description')}
                    </p>
                  </li>
                  <li>
                    <span className="font-bold">{t('guide.table.title')}</span>：
                    <p className="text-gray-700 dark:text-gray-100">
                      {t('guide.table.description')}
                    </p>
                  </li>
                </ol>
                <p className="type-caption text-gray-700 dark:text-gray-100">
                  {t('guide.hint')}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Expanded View */}
          {viewMode === 'expanded' && (
            <div className="space-y-6">
              {categories.map((category) => {
                const cards = cardsByCategoryObj[category.id] || [];
                const styles = getEmotionCardCategoryStyle(category.slug);

                return (
                  <div key={category.id} className="flex flex-nowrap gap-3">
                    {/* Category Header */}
                    <Link
                      href={localizeHref(`/emo-cards/${category.slug}`, locale)}
                      className={cn(
                        'flex-shrink-0 w-[72px] h-[140px] rounded-xl',
                        'flex flex-col items-center justify-center',
                        'type-subsection-title',
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
                        <EmotionCard
                          key={card.id}
                          card={toEmotionCardData(card, category.slug)}
                          onCardClick={() => handleCardClick(card, category.slug)}
                        />
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
              <ul className="type-body-sm mb-9 text-gray-800 dark:text-gray-100">
                <li>{t('categoryCardsHint')}</li>
              </ul>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {categories.map((category) => {
                  const styles = getEmotionCardCategoryStyle(category.slug);
                  const representativeCardId =
                    categoryRepresentativeCards[category.slug] || category.id;

                  return (
                    <Link
                      key={category.id}
                      href={localizeHref(`/emo-cards/${category.slug}`, locale)}
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
                          src={`/images/emoCards/${representativeCardId}.svg`}
                          alt={category.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                        />
                      </div>
                      <p className="type-subsection-title mt-2">
                        {category.name[0]}&nbsp;{category.name[1]}
                      </p>
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
                locale={locale}
                onCardClick={handleCardClick}
              />
            </div>
          )}
        </div>
      </div>

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
