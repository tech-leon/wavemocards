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

export default function ExploreStrength1Page() {
  const router = useRouter();
  const { selectedCards, beforeLevels, setBeforeLevel } = useExploreStore();
  const [showError, setShowError] = useState(false);

  const handleNext = () => {
    // Validate all cards have a before level
    const allFilled = selectedCards.every((card) => beforeLevels[card.id] !== undefined);
    if (!allFilled) {
      setShowError(true);
      return;
    }
    router.push('/explore/story/background');
  };

  const handleBack = () => {
    router.push('/explore/selected');
  };

  return (
    <ExploreStepLayout
      currentStep={2}
      title="我的情緒強度｜第一次"
      titleMobile={{ line1: '我的情緒強度', line2: '第一次' }}
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
        <li>謝謝你努力地找尋到屬於自己的情緒卡。</li>
        <li>
          接下來，想邀請你，再次{' '}
          <span className="text-main font-medium">閉上眼睛，深呼吸～吐氣～</span>
        </li>
        <li className="mt-4">
          在深呼吸的過程中，感受心中的自己，
          <span className="text-main font-medium">挑選的情緒，其強度分別如何呢？</span>
          <span className="text-xs text-gray-500 dark:text-gray-300">（ 1分代表最為微弱，5分代表最為強烈 ）</span>
        </li>
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
              {/* Card */}
              <div
                className={cn(
                  'min-w-[130px] max-w-[130px] h-[90px] sm:min-w-[180px] sm:max-w-[180px] sm:h-[110px]',
                  'flex items-center justify-center p-3 rounded-xl',
                  categoryBgColors[slug] || 'bg-gray-200'
                )}
              >
                <p className="w-1/2 text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-900">
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

              {/* Strength selector */}
              <StrengthSelector
                value={beforeLevels[card.id]}
                onChange={(level) => setBeforeLevel(card.id, level)}
              />
            </div>
          );
        })}
      </div>

      {/* Error modal */}
      {showError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowError(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative bg-gray-100 dark:bg-gray-900 rounded-2xl max-w-sm w-full p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="text-2xl font-bold text-pink mb-3">尚未完成</p>
            <p className="text-sm text-gray-800 dark:text-gray-100 mb-4">每張情緒卡的情緒強度皆須選填。</p>
            <Image src="/images/addCardFail.svg" alt="" width={150} height={150} className="mx-auto mb-4" />
            <button
              type="button"
              onClick={() => setShowError(false)}
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
