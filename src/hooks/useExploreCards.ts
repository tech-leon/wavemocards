'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toEmotionCardData } from '@/lib/emotion-card';
import { useExploreStore } from '@/store/exploreStore';
import type { EmotionCategory, EmotionCard as EmotionCardRecord } from '@/lib/emotions';
import type { EmotionCardData } from '@/types/emotion-card';

type ViewMode = 'expanded' | 'folded' | 'table';

export function useExploreCards(categories: EmotionCategory[], cards: EmotionCardRecord[]) {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('expanded');
  const [showGuide, setShowGuide] = useState(false);
  const [modalCard, setModalCard] = useState<EmotionCardData | null>(null);
  const [showError, setShowError] = useState<'tooFew' | 'tooMany' | null>(null);

  const { selectedCards, addCard, removeCard, hasCard } = useExploreStore();
  const selectedCount = selectedCards.length;
  const isSelectionFull = selectedCount >= 3;

  // Group cards by category
  const cardsByCategory = useMemo(() => {
    const map = new Map<number, EmotionCardRecord[]>();
    cards.forEach((card) => {
      const arr = map.get(card.category_id) || [];
      arr.push(card);
      map.set(card.category_id, arr);
    });
    return map;
  }, [cards]);

  const handleAddCard = useCallback(
    (card: EmotionCardRecord) => {
      if (hasCard(card.id)) return;
      const cat = categories.find((c) => c.id === card.category_id);
      addCard(toEmotionCardData(card, cat?.slug || 'others'));
    },
    [categories, hasCard, addCard]
  );

  const handleOpenHolder = useCallback(() => {
    if (selectedCards.length === 0) {
      setShowError('tooFew');
      return;
    }
    if (selectedCards.length > 3) {
      setShowError('tooMany');
      return;
    }
    router.push('/explore/strength/1');
  }, [selectedCards.length, router]);

  return {
    viewMode,
    setViewMode,
    showGuide,
    setShowGuide,
    modalCard,
    setModalCard,
    showError,
    setShowError,
    selectedCards,
    selectedCount,
    isSelectionFull,
    hasCard,
    removeCard,
    cardsByCategory,
    handleAddCard,
    handleOpenHolder,
  };
}
