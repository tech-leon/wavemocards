'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';
import { EmotionCard } from '@/components/emotion/EmotionCard';
import { useExploreStore } from '@/store/exploreStore';
import { ExploreStepLayout } from '@/components/explore';

export default function ExploreSelectedPage() {
  const router = useRouter();
  const { selectedCards, removeCard, clearCards } = useExploreStore();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showError, setShowError] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedCards.length === 0) {
      setShowError('卡片數量不足');
      return;
    }
    if (selectedCards.length > 3) {
      setShowError('卡片數量過多');
      return;
    }
    router.push('/explore/strength/1');
  };

  const handleBack = () => {
    router.push('/explore/cards');
  };

  const handleClear = () => {
    clearCards();
    setShowClearConfirm(false);
  };

  return (
    <ExploreStepLayout
      currentStep={1}
      title="我的情緒卡夾"
      actions={
        <>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="type-button px-4 py-1.5 font-bold rounded-full border-2 border-main-tint01 text-main-tint01 hover:bg-main-tint03 transition-colors"
            >
              清空
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="type-button px-4 py-1.5 font-bold rounded-full border-2 border-main-tint01 text-main-tint01 hover:bg-main-tint03 transition-colors"
            >
              <span className="hidden sm:inline">回到情緒卡</span>
              <span className="sm:hidden">上一步</span>
            </button>
          </div>
          <button
            type="button"
            onClick={handleNext}
            className="type-button px-6 py-1.5 font-bold rounded-full bg-main hover:bg-main-dark text-white transition-colors"
          >
            下一步
          </button>
        </>
      }
    >
      {/* Instructions */}
      <ul className="type-body-sm ml-1 mt-3 mb-9 text-gray-800 dark:text-gray-100 space-y-1">
        <li>
          🔎 請 <span className="text-main font-bold">留下</span> 最符合您現在狀態的情緒卡「
          <span className="type-body text-main font-bold">3</span> 張」。
        </li>
        <li>
          🔎 您可以透過點擊{' '}
          <span className="text-pink-tint01">
            <XCircle className="inline w-4 h-4" />
          </span>
          ，將情緒卡移除。
        </li>
      </ul>

      {/* Cards grid */}
      {selectedCards.length === 0 ? (
        <div className="mb-8 flex flex-col items-center justify-center py-10 text-gray-500 dark:text-gray-300">
          <p className="type-subsection-title mb-2 text-foreground">尚未選擇任何情緒卡</p>
          <button
            type="button"
            onClick={handleBack}
            className="text-main hover:text-main-dark underline"
          >
            前往選擇情緒卡
          </button>
        </div>
      ) : (
        <div className="mb-8 flex flex-wrap justify-center gap-6 sm:gap-10 md:justify-start">
          {selectedCards.map((card) => {
            return (
              <EmotionCard
                key={card.id}
                card={card}
                action={{
                  kind: 'remove',
                  label: '移除',
                  onClick: () => removeCard(card.id),
                }}
              />
            );
          })}
        </div>
      )}

      {/* Clear confirm modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowClearConfirm(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative bg-gray-100 dark:bg-gray-900 rounded-2xl max-w-sm w-full p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="type-page-title mb-3 text-pink">確定要清空嗎？</p>
            <p className="type-body-sm mb-4 text-gray-800 dark:text-gray-100">
              點擊確定後，將會<span className="text-pink">移除所有卡片</span>，並且無法復原。
            </p>
            <Image src="/images/sureToDelete.svg" alt="" width={150} height={150} className="mx-auto mb-4" />
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="type-button px-6 py-2 rounded-full border-2 border-pink-tint01 text-pink-tint01 font-bold hover:bg-pink-tint02/20"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="type-button px-6 py-2 rounded-full bg-pink hover:bg-pink-dark text-white font-bold"
              >
                確定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error modal */}
      {showError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowError(null)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative bg-gray-100 dark:bg-gray-900 rounded-2xl max-w-sm w-full p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="type-page-title mb-3 text-pink">{showError}</p>
            {showError === '卡片數量不足' ? (
              <p className="type-body-sm mb-4 text-gray-800 dark:text-gray-100">
                請<span className="text-pink font-bold">至少挑選 1 </span>張卡片。
              </p>
            ) : (
              <div className="type-body-sm mb-4 text-gray-800 dark:text-gray-100">
                <p>卡片數量<span className="text-pink font-bold">最多 3 </span>張。</p>
                <p>請篩選出最貼近您的情緒的卡片。</p>
              </div>
            )}
            <Image src="/images/addCardFail.svg" alt="" width={150} height={150} className="mx-auto mb-4" />
            <button
              type="button"
              onClick={() => setShowError(null)}
              className="type-button px-6 py-2 rounded-full bg-pink hover:bg-pink-dark text-white font-bold"
            >
              我知道了
            </button>
          </div>
        </div>
      )}
    </ExploreStepLayout>
  );
}
