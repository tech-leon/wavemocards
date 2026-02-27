'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useExploreStore } from '@/store/exploreStore';
import { ExploreStepLayout, StrengthSelector } from '@/components/explore';

// Category colors mapping
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

export default function ExploreStrength2Page() {
  const router = useRouter();
  const store = useExploreStore();
  const { selectedCards, afterLevels, setAfterLevel } = store;
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveResult, setSaveResult] = useState<'success' | 'error' | null>(null);

  const handleBack = () => {
    router.push('/explore/story/action');
  };

  const handleSave = async () => {
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
        setSaveResult('success');
        store.reset();
      } else {
        setSaveResult('error');
      }
    } catch {
      setSaveResult('error');
    } finally {
      setSaving(false);
      setShowConfirm(false);
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
            onClick={() => setShowConfirm(true)}
            className="px-6 py-1.5 text-sm font-bold rounded-full bg-main hover:bg-main-dark text-white transition-colors"
          >
            儲存紀錄
          </button>
        </>
      }
    >
      {/* Instructions */}
      <ul className="ml-1 mt-3 mb-9 text-muted-foreground text-sm space-y-1">
        <li>在覺察與記錄情緒故事後，不知道你現在的情緒還好嗎？</li>
        <li>
          <span className="text-main font-medium">
            邀請你再次深呼吸，並問問心中的自己，現在的情緒強度分別如何呢？
          </span>
          <span className="text-xs text-muted-foreground">（ 1分代表最為微弱，5分代表最為強烈 ）</span>
        </li>
        <li className="text-muted-foreground text-xs">若您不想紀錄，可以跳過此步驟，直接點擊「儲存紀錄」</li>
      </ul>

      {/* Strength selectors for each card */}
      <div className="space-y-10">
        {selectedCards.map((card) => {
          const slug = card.categoryName;
          return (
            <div
              key={card.id}
              className="flex flex-col md:flex-row md:justify-between items-center gap-4"
            >
              <div
                className={cn(
                  'min-w-[130px] max-w-[130px] h-[90px] sm:min-w-[180px] sm:max-w-[180px] sm:h-[110px]',
                  'flex items-center justify-center p-3 rounded-xl',
                  categoryBgColors[slug] || 'bg-gray-200'
                )}
              >
                <p className="w-1/2 text-lg sm:text-xl font-bold text-gray-900">
                  {card.name.length === 2
                    ? `${card.name[0]}\u00A0${card.name[1]}`
                    : card.name}
                </p>
                <div className="w-1/2 rounded-full overflow-hidden">
                  <Image
                    src={card.imagePath || `/images/emoCards/${card.id}.svg`}
                    alt={card.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <StrengthSelector
                value={afterLevels[card.id]}
                onChange={(level) => setAfterLevel(card.id, level)}
              />
            </div>
          );
        })}
      </div>

      {/* Confirm save modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowConfirm(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative bg-card rounded-2xl max-w-sm w-full p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="text-2xl font-bold text-main mb-3">確定完成了嗎？</p>
            <p className="text-sm text-card-foreground mb-1">
              點擊「確定完成」後，將會儲存您的紀錄，並且<span className="text-main">無法再返回到此頁面</span>。
            </p>
            <p className="text-sm text-card-foreground mb-4">若想再繼續編輯的話，請點擊「返回」</p>
            <Image src="/images/sureToSave.svg" alt="" width={150} height={150} className="mx-auto mb-4" />
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="px-6 py-2 rounded-full border-2 border-main-tint01 text-main-tint01 font-bold text-sm hover:bg-main-tint03"
              >
                返回
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 rounded-full bg-main hover:bg-main-dark text-white font-bold text-sm disabled:opacity-50"
              >
                {saving ? '儲存中...' : '確定完成'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save result modal */}
      {saveResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative bg-card rounded-2xl max-w-sm w-full p-6 text-center">
            <p className={cn('text-2xl font-bold mb-3', saveResult === 'success' ? 'text-main' : 'text-pink')}>
              {saveResult === 'success' ? '儲存成功' : '儲存失敗'}
            </p>
            {saveResult === 'error' && (
              <p className="text-sm text-card-foreground mb-4">
                很抱歉，儲存紀錄失敗，請確認您的網路狀態，並重新點擊「儲存紀錄」。
              </p>
            )}
            <Image
              src={saveResult === 'success' ? '/images/addCardSuccess.svg' : '/images/addCardFail.svg'}
              alt=""
              width={150}
              height={150}
              className="mx-auto mb-4"
            />
            {saveResult === 'success' ? (
              <button
                type="button"
                onClick={() => router.push('/explore/complete')}
                className="px-6 py-2 rounded-full bg-main hover:bg-main-dark text-white font-bold text-sm"
              >
                前往最後一個步驟
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setSaveResult(null)}
                className="px-6 py-2 rounded-full bg-pink hover:bg-pink-dark text-white font-bold text-sm"
              >
                我知道了
              </button>
            )}
          </div>
        </div>
      )}
    </ExploreStepLayout>
  );
}
