'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { EmotionCard } from '@/components/emotion/EmotionCard';
import { cn } from '@/lib/utils';
import { useExploreStore } from '@/store/exploreStore';
import { ExploreStepLayout, StrengthSelector } from '@/components/explore';

export default function ExploreStrength2Page() {
  const router = useRouter();
  const store = useExploreStore();
  const { selectedCards, afterLevels, setAfterLevel } = store;
  const [saving, setSaving] = useState(false);

  const handleBack = () => {
    router.push('/explore/story/action');
  };

  const handleSave = async () => {
    if (saving) return;

    setSaving(true);
    try {
      const body = {
        cards: selectedCards.map((c) => c.id),
        beforeLevels: store.beforeLevels,
        afterLevels: store.afterLevels,
        storyBackground: store.storyBackground,
        storyAction: store.storyAction,
        storyResult: store.storyResult,
        storyFeeling: store.storyFeeling,
        storyExpect: store.storyExpect,
        storyBetterAction: store.storyBetterAction,
      };

      const res = await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success('儲存成功');
        store.reset();
        router.push('/explore/complete');
      } else {
        toast.error('很抱歉，儲存紀錄失敗，請稍後再試。');
      }
    } catch {
      toast.error('儲存時發生錯誤，請確認網路狀態後再試一次。');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ExploreStepLayout
      currentStep={5}
      title="我的情緒強度｜第二次"
      titleMobile={{ line1: '我的情緒強度', line2: '第二次' }}
      actions={
        <>
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-1.5 text-sm font-bold rounded-full border-2 border-main-tint01 text-main-tint01 hover:bg-main-tint03 transition-colors"
          >
            上一步
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className={cn(
              'px-6 py-1.5 text-sm font-bold rounded-full bg-main text-white transition-colors',
              saving ? 'cursor-not-allowed opacity-60' : 'hover:bg-main-dark'
            )}
          >
            {saving ? '儲存中...' : '儲存紀錄'}
          </button>
        </>
      }
    >
      {/* Instructions */}
      <ul className="ml-1 mt-3 mb-9 text-gray-800 dark:text-gray-100 text-sm space-y-1">
        <li>在覺察與記錄情緒故事後，不知道你現在的情緒還好嗎？</li>
        <li>
          <span className="text-main font-medium">
            邀請你再次深呼吸，並問問心中的自己，現在的情緒強度分別如何呢？
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-300">（ 1分代表最為微弱，5分代表最為強烈 ）</span>
        </li>
        <li className="text-gray-500 dark:text-gray-300 text-xs">若您不想紀錄，可以跳過此步驟，直接點擊「儲存紀錄」</li>
      </ul>

      {/* Strength selectors for each card */}
      <div className="space-y-10">
        {selectedCards.map((card) => {
          return (
            <div
              key={card.id}
              className="flex flex-col md:flex-row md:justify-between items-center gap-4"
            >
              <EmotionCard card={card} />

              <StrengthSelector
                value={afterLevels[card.id]}
                onChange={(level) => setAfterLevel(card.id, level)}
              />
            </div>
          );
        })}
      </div>
    </ExploreStepLayout>
  );
}
