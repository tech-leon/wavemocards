'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useExploreStore } from '@/store/exploreStore';
import { MAX_SELECTED_CARDS } from '@/lib/emotions';

export function useOpenHolder() {
  const router = useRouter();
  const { selectedCards } = useExploreStore();
  const [showError, setShowError] = useState<'tooFew' | 'tooMany' | null>(null);

  const handleOpenHolder = useCallback(() => {
    if (selectedCards.length === 0) {
      setShowError('tooFew');
      return;
    }
    if (selectedCards.length > MAX_SELECTED_CARDS) {
      setShowError('tooMany');
      return;
    }
    router.push('/explore/strength/1');
  }, [selectedCards.length, router]);

  return { showError, setShowError, handleOpenHolder };
}
