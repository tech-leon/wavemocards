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
              className="px-4 py-1.5 text-sm font-bold rounded-full border-2 border-main-tint01 text-main-tint01 hover:bg-main-tint03 transition-colors"
            >
              清空
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-1.5 text-sm font-bold rounded-full border-2 border-main-tint01 text-main-tint01 hover:bg-main-tint03 transition-colors"
            >
              <span className="hidden sm:inline">回到情緒卡</span>
              <span className="sm:hidden">上一步</span>
            </button>
          </div>
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-1.5 text-sm font-bold rounded-full bg-main hover:bg-main-dark text-white transition-colors"
          >
            下一步
          </button>
        </>
      }
    >
      {/* Instructions */}
      <ul className="ml-1 mt-3 mb-9 text-gray-800 dark:text-gray-100 text-sm space-y-1">
        <li>
          🔎 請 <span className="text-main font-bold">留下</span> 最符合您現在狀態的情緒卡「
          <span className="text-main font-bold text-base">3</span> 張」。
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
        <div className="mb-16 py-16 flex flex-col items-center justify-center text-gray-500 dark:text-gray-300">
          <p className="text-lg mb-2">尚未選擇任何情緒卡</p>
          <button
            type="button"
            onClick={handleBack}
            className="text-main hover:text-main-dark underline"
          >
            前往選擇情緒卡
          </button>
        </div>
      ) : (
        <div className="mb-16 flex flex-wrap justify-center md:justify-start gap-6 sm:gap-10">
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
            <p className="text-2xl font-bold text-pink mb-3">確定要清空嗎？</p>
            <p className="text-sm text-gray-800 dark:text-gray-100 mb-4">
              點擊確定後，將會<span className="text-pink">移除所有卡片</span>，並且無法復原。
            </p>
            <Image src="/images/sureToDelete.svg" alt="" width={150} height={150} className="mx-auto mb-4" />
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-6 py-2 rounded-full border-2 border-pink-tint01 text-pink-tint01 font-bold text-sm hover:bg-pink-tint02/20"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-6 py-2 rounded-full bg-pink hover:bg-pink-dark text-white font-bold text-sm"
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
            <p className="text-2xl font-bold text-pink mb-3">{showError}</p>
            {showError === '卡片數量不足' ? (
              <p className="text-sm text-gray-800 dark:text-gray-100 mb-4">
                請<span className="text-pink font-bold">至少挑選 1 </span>張卡片。
              </p>
            ) : (
              <div className="text-sm text-gray-800 dark:text-gray-100 mb-4">
                <p>卡片數量<span className="text-pink font-bold">最多 3 </span>張。</p>
                <p>請篩選出最貼近您的情緒的卡片。</p>
              </div>
            )}
            <Image src="/images/addCardFail.svg" alt="" width={150} height={150} className="mx-auto mb-4" />
            <button
              type="button"
              onClick={() => setShowError(null)}
              className="px-6 py-2 rounded-full bg-pink hover:bg-pink-dark text-white font-bold text-sm"
            >
              我知道了
            </button>
          </div>
        </div>
      )}
    </ExploreStepLayout>
  );
}
