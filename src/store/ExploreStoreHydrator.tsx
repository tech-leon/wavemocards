'use client';

import { useEffect } from 'react';
import { useExploreStore } from './exploreStore';

/**
 * Rehydrates the Zustand explore store from localStorage after React hydration.
 * This prevents SSR/client mismatch because the store uses `skipHydration: true`,
 * ensuring both server and client render with the same initial state first.
 */
export function ExploreStoreHydrator() {
  useEffect(() => {
    useExploreStore.persist.rehydrate();
  }, []);
  return null;
}
