'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { EmotionCardData } from '@/components/emotion/EmotionCard';

/**
 * Explore flow state management
 * Manages the entire emotion exploration process (6 steps)
 */

export interface ExploreState {
  // Step 1: Selected emotion cards (1-3 cards)
  selectedCards: EmotionCardData[];

  // Step 2: First emotion strength rating (cardId -> 1~5)
  beforeLevels: Record<number, number>;

  // Step 3: Story background
  storyBackground: string;

  // Step 4: Story action (5 questions)
  storyAction: string; // Q1: What did you do?
  storyResult: string; // Q2: What result?
  storyFeeling: string; // Q3: How do you feel?
  storyExpect: number | null; // Q4: Is this expected? (0=yes, 1=no, null=unclear)
  storyBetterAction: string; // Q5: What could be done better?

  // Step 5: Second emotion strength rating (optional, cardId -> 1~5)
  afterLevels: Record<number, number>;

  // Actions - Card management
  addCard: (card: EmotionCardData) => void;
  removeCard: (cardId: number) => void;
  clearCards: () => void;
  hasCard: (cardId: number) => boolean;

  // Actions - Before levels (Step 2)
  setBeforeLevel: (cardId: number, level: number) => void;

  // Actions - Story background (Step 3)
  setStoryBackground: (value: string) => void;

  // Actions - Story action (Step 4)
  setStoryAction: (value: string) => void;
  setStoryResult: (value: string) => void;
  setStoryFeeling: (value: string) => void;
  setStoryExpect: (value: number | null) => void;
  setStoryBetterAction: (value: string) => void;

  // Actions - After levels (Step 5)
  setAfterLevel: (cardId: number, level: number) => void;

  // Actions - Reset
  reset: () => void;
}

const initialState = {
  selectedCards: [],
  beforeLevels: {},
  storyBackground: '',
  storyAction: '',
  storyResult: '',
  storyFeeling: '',
  storyExpect: null as number | null,
  storyBetterAction: '',
  afterLevels: {},
};

export const useExploreStore = create<ExploreState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Card management
      addCard: (card) =>
        set((state) => {
          if (state.selectedCards.find((c) => c.id === card.id)) return state;
          if (state.selectedCards.length >= 10) return state; // Safety limit
          return { selectedCards: [...state.selectedCards, card] };
        }),

      removeCard: (cardId) =>
        set((state) => ({
          selectedCards: state.selectedCards.filter((c) => c.id !== cardId),
          beforeLevels: (() => {
            const newLevels = { ...state.beforeLevels };
            delete newLevels[cardId];
            return newLevels;
          })(),
          afterLevels: (() => {
            const newLevels = { ...state.afterLevels };
            delete newLevels[cardId];
            return newLevels;
          })(),
        })),

      clearCards: () =>
        set({
          selectedCards: [],
          beforeLevels: {},
          afterLevels: {},
        }),

      hasCard: (cardId) => get().selectedCards.some((c) => c.id === cardId),

      // Before levels
      setBeforeLevel: (cardId, level) =>
        set((state) => ({
          beforeLevels: { ...state.beforeLevels, [cardId]: level },
        })),

      // Story background
      setStoryBackground: (value) => set({ storyBackground: value }),

      // Story action
      setStoryAction: (value) => set({ storyAction: value }),
      setStoryResult: (value) => set({ storyResult: value }),
      setStoryFeeling: (value) => set({ storyFeeling: value }),
      setStoryExpect: (value) => set({ storyExpect: value }),
      setStoryBetterAction: (value) => set({ storyBetterAction: value }),

      // After levels
      setAfterLevel: (cardId, level) =>
        set((state) => ({
          afterLevels: { ...state.afterLevels, [cardId]: level },
        })),

      // Reset entire store
      reset: () => set(initialState),
    }),
    {
      name: 'wavemo-explore',
    }
  )
);
