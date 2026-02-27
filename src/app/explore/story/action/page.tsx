'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useExploreStore } from '@/store/exploreStore';
import { ExploreStepLayout } from '@/components/explore';

export default function ExploreStoryActionPage() {
  const router = useRouter();
  const {
    selectedCards,
    storyAction,
    setStoryAction,
    storyResult,
    setStoryResult,
    storyFeeling,
    setStoryFeeling,
    storyExpect,
    setStoryExpect,
    storyBetterAction,
    setStoryBetterAction,
  } = useExploreStore();

  const cardNames = selectedCards.map((c) => c.name);
  const cardNamesStr = cardNames.join('、');

  const handleNext = () => {
    router.push('/explore/strength/2');
  };

  const handleBack = () => {
    router.push('/explore/story/background');
  };

  return (
    <ExploreStepLayout
      currentStep={4}
      title="我的情緒故事｜行動篇"
      titleMobile={{ line1: '我的情緒故事', line2: '行動篇' }}
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
        <li>謝謝你，努力地回想了情緒發生的背景、原因。</li>
        <li>接下來，想邀請你一起回想在情緒浪潮來臨之後⋯⋯</li>
        <li className="text-gray-500 dark:text-gray-300 text-xs">若您暫時不想紀錄，可以跳過此步驟，直接點擊「下一步」</li>
      </ul>

      {/* Q1: What did you do? */}
      <div className="mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row items-stretch gap-6">
          <div className="md:w-2/3 lg:w-3/4 bg-main-tint03 rounded-lg">
            <label htmlFor="storyAction" className="block py-3 px-4">
              <p className="mb-1 text-gray-800 dark:text-gray-100 text-xs">第 1 題</p>
              <p className="mb-1 text-main font-medium">
                在感受到「<span className="px-0.5">{cardNamesStr}</span>」的情緒後，你有什麼反應呢？或是做了什麼事情呢？
              </p>
              <p className="text-gray-800 dark:text-gray-100 text-sm">
                例如：在感受到心中的焦慮後，我在日記本寫下各種心中所擔憂的事情。
              </p>
            </label>
            <textarea
              id="storyAction"
              value={storyAction}
              onChange={(e) => setStoryAction(e.target.value)}
              className="w-full mb-3 p-3 border rounded border-gray-500 dark:border-gray-400 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-[100px] resize-y"
            />
          </div>
          <div className="md:w-1/3 lg:w-1/4 flex justify-center md:justify-end items-center">
            <Image src="/images/emoStory/lime-action.svg" alt="" width={160} height={160} className="w-32 md:w-full max-w-[160px]" />
          </div>
        </div>
      </div>

      {/* Q2: What result? */}
      <div className="mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row items-stretch gap-6">
          <div className="md:w-1/3 lg:w-1/4 hidden md:flex justify-center md:justify-end items-center order-1">
            <Image src="/images/emoStory/lime-happened.svg" alt="" width={160} height={160} className="w-32 md:w-full max-w-[160px]" />
          </div>
          <div className="md:w-2/3 lg:w-3/4 bg-main-tint03 rounded-lg order-2">
            <label htmlFor="storyResult" className="block py-3 px-4">
              <p className="mb-1 text-gray-800 dark:text-gray-100 text-xs">第 2 題</p>
              <p className="text-main font-medium">
                在上述你所做的反應後，帶來了什麼樣的結果呢？
              </p>
            </label>
            <textarea
              id="storyResult"
              value={storyResult}
              onChange={(e) => setStoryResult(e.target.value)}
              className="w-full mb-3 p-3 border rounded border-gray-500 dark:border-gray-400 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-[100px] resize-y"
            />
          </div>
        </div>
      </div>

      {/* Q3: How do you feel? */}
      <div className="mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row items-stretch gap-6">
          <div className="md:w-2/3 lg:w-3/4 bg-main-tint03 rounded-lg">
            <label htmlFor="storyFeeling" className="block py-3 px-4">
              <p className="mb-1 text-gray-800 dark:text-gray-100 text-xs">第 3 題</p>
              <p className="text-main font-medium">
                對於上述發生的結果，你有什麼樣的感受呢？
              </p>
            </label>
            <textarea
              id="storyFeeling"
              value={storyFeeling}
              onChange={(e) => setStoryFeeling(e.target.value)}
              className="w-full mb-3 p-3 border rounded border-gray-500 dark:border-gray-400 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-[100px] resize-y"
            />
          </div>
          <div className="md:w-1/3 lg:w-1/4 hidden md:flex justify-center md:justify-end items-center">
            <Image src="/images/emoStory/lime-feel.svg" alt="" width={160} height={160} className="w-32 md:w-full max-w-[160px]" />
          </div>
        </div>
      </div>

      {/* Q4: Is this expected? */}
      <div className="mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row items-stretch gap-6">
          <div className="md:w-1/3 lg:w-1/4 hidden md:flex justify-center md:justify-end items-center order-1">
            <Image src="/images/emoStory/lime-goodOrBad.svg" alt="" width={160} height={160} className="w-32 md:w-full max-w-[160px]" />
          </div>
          <div className="md:w-2/3 lg:w-3/4 bg-main-tint03 rounded-lg order-2">
            <label className="block py-3 px-4">
              <p className="mb-1 text-gray-800 dark:text-gray-100 text-xs">第 4 題</p>
              <p className="text-main font-medium">
                你覺得這個的結果是否是你所期待的結果呢？
              </p>
            </label>
            <div className="mb-4 px-4 flex items-center gap-4">
              {[
                { label: '是', value: 0 },
                { label: '否', value: 1 },
                { label: '不清楚', value: null },
              ].map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setStoryExpect(option.value)}
                  className={cn(
                    'px-5 py-2 rounded-full text-sm font-bold transition-colors border-2',
                    storyExpect === option.value
                      ? 'bg-main text-white border-main'
                      : 'border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-200 hover:border-main-tint01 hover:text-main-tint01'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Q5: Better action */}
      <div className="mb-16">
        <div className="flex flex-col md:flex-row items-stretch gap-6">
          <div className="md:w-2/3 lg:w-3/4 bg-main-tint03 rounded-lg">
            <label htmlFor="betterAction" className="block py-3 px-4">
              <p className="mb-1 text-gray-800 dark:text-gray-100 text-xs">第 5 題</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <p className="text-gray-800 dark:text-gray-100">
                    如果這次的<span className="text-main font-medium">結果不如你所期待</span>的話，你覺得
                    <span className="text-main font-medium">下次有類似的情緒時，可以怎麼做</span>
                    ，可能可以得到你所期待的結果呢？
                  </p>
                </li>
                <li>
                  <p className="text-gray-700 dark:text-gray-100">
                    這次的情緒歷程，有哪些是你覺得做得不錯的地方呢？邀請你寫下
                    <span className="text-main font-medium">肯定自己做得不錯的地方</span>。
                  </p>
                </li>
              </ul>
            </label>
            <textarea
              id="betterAction"
              value={storyBetterAction}
              onChange={(e) => setStoryBetterAction(e.target.value)}
              className="w-full mb-3 p-3 border rounded border-gray-500 dark:border-gray-400 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-[100px] resize-y"
            />
          </div>
          <div className="md:w-1/3 lg:w-1/4 hidden md:flex justify-center md:justify-end items-center">
            <Image src="/images/emoStory/lime-nextActionPlan.svg" alt="" width={160} height={160} className="w-32 md:w-full max-w-[160px]" />
          </div>
        </div>
      </div>

      {/* Credit */}
      <div className="hidden md:block text-right text-gray-500 dark:text-gray-300 text-[10px] mb-16">
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
