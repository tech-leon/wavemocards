'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useExploreStore } from '@/store/exploreStore';
import { ExploreStepLayout } from '@/components/explore';

export default function ExploreStoryBackgroundPage() {
  const router = useRouter();
  const { selectedCards, storyBackground, setStoryBackground } = useExploreStore();

  const cardNames = selectedCards.map((c) => c.name);
  const cardNamesStr = cardNames.join('、');

  const handleNext = () => {
    router.push('/explore/story/action');
  };

  const handleBack = () => {
    router.push('/explore/strength/1');
  };

  return (
    <ExploreStepLayout
      currentStep={3}
      title="我的情緒故事｜背景篇"
      titleMobile={{ line1: '我的情緒故事', line2: '背景篇' }}
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
      <ul className="ml-1 mt-3 mb-6 text-gray-800 dark:text-gray-100 text-sm space-y-1">
        <li>謝謝你，真誠地感受自己的情緒。</li>
        <li>接下來，想邀請你慢慢地潛入自己的情緒故事中，找尋自己情緒的源頭。</li>
        <li className="text-gray-500 dark:text-gray-300 text-xs">若您暫時不想紀錄，可以跳過此步驟，直接點擊「下一步」</li>
      </ul>

      {/* Question */}
      <div className="flex flex-col md:flex-row items-stretch gap-6 mb-16">
        <div className="md:w-2/3 lg:w-3/4 bg-main-tint03 rounded-lg">
          <label htmlFor="whatHappened" className="block py-3 px-4">
            <p className="mb-2 text-main font-medium text-base">
              邀請你輕輕地闔上雙眼，在吸氣與吐氣之間，慢慢地回想，在感受到「
              <span className="px-0.5">{cardNamesStr}</span>
              」的情緒之前，發生了什麼事情呢？
            </p>
            <p className="text-gray-800 dark:text-gray-100 text-sm">
              請在下欄中，試著寫下你覺得可能是讓你有這些情緒的原因或是事情、背景故事等。
            </p>
          </label>
          <textarea
            id="whatHappened"
            value={storyBackground}
            onChange={(e) => setStoryBackground(e.target.value)}
            className="w-full mb-3 mx-0 p-3 border rounded border-gray-500 dark:border-gray-400 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-[120px] resize-y"
            placeholder="在這裡寫下你的故事..."
          />
        </div>
        <div className="md:w-1/3 lg:w-1/4 flex justify-center md:justify-end items-center">
          <Image
            src="/images/emoStory/lime-diving.svg"
            alt="a person diving"
            width={200}
            height={200}
            className="w-40 md:w-full max-w-[200px]"
          />
        </div>
      </div>

      {/* Credit */}
      <div className="text-right text-gray-500 dark:text-gray-300 text-[10px] mb-16">
        Illustration by{' '}
        <a className="text-gray-500 dark:text-gray-300 hover:text-[#3C9DAE]" href="https://icons8.com/illustrations/author/iAdLsFJOKDrk" target="_blank" rel="noopener noreferrer">
          Tanya Krasutska
        </a>{' '}
        from{' '}
        <a className="text-gray-500 dark:text-gray-300 hover:text-[#3C9DAE]" href="https://icons8.com/illustrations" target="_blank" rel="noopener noreferrer">
          Ouch!
        </a>
      </div>
    </ExploreStepLayout>
  );
}
