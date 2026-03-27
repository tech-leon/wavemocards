'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useExploreStore } from '@/store/exploreStore';
import { ExploreStepLayout, StoryTextarea } from '@/components/explore';

export default function ExploreStoryActionPage() {
  const t = useTranslations('explore.storyAction');
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
      title={t('title')}
      titleMobile={{ line1: t('titleMobile.line1'), line2: t('titleMobile.line2') }}
      actions={
        <>
          <button
            type="button"
            onClick={handleBack}
            className="type-button px-6 py-1.5 font-bold rounded-full border-2 border-main-tint01 text-main-tint01 hover:bg-main-tint03 transition-colors"
          >
            {t('actions.previous')}
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="type-button px-6 py-1.5 font-bold rounded-full bg-main hover:bg-main-dark text-white transition-colors"
          >
            {t('actions.next')}
          </button>
        </>
      }
    >
      {/* Instructions */}
      <ul className="type-body-sm ml-1 mt-3 mb-6 text-gray-800 dark:text-gray-100 space-y-1">
        <li>{t('intro.line1')}</li>
        <li>{t('intro.line2')}</li>
        <li className="type-caption text-gray-500 dark:text-gray-300">{t('intro.skipHint')}</li>
      </ul>

      {/* Q1: What did you do? */}
      <div className="mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row items-stretch gap-6">
          <div className="md:w-2/3 lg:w-3/4 bg-main-tint03 rounded-lg">
            <label htmlFor="storyAction" className="block py-3 px-4">
              <p className="type-caption mb-1 text-gray-800">{t('question1.label')}</p>
              <p className="mb-1 text-main font-medium">
                {t('question1.prompt', { cardNames: cardNamesStr })}
              </p>
              <p className="type-body-sm text-gray-800">
                {t('question1.example')}
              </p>
            </label>
            <StoryTextarea
              id="storyAction"
              value={storyAction}
              onChange={(e) => setStoryAction(e.target.value)}
              className="min-h-[100px] resize-y"
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
              <p className="type-caption mb-1 text-gray-800">{t('question2.label')}</p>
              <p className="text-main font-medium">
                {t('question2.prompt')}
              </p>
            </label>
            <StoryTextarea
              id="storyResult"
              value={storyResult}
              onChange={(e) => setStoryResult(e.target.value)}
              className="min-h-[100px] resize-y"
            />
          </div>
        </div>
      </div>

      {/* Q3: How do you feel? */}
      <div className="mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row items-stretch gap-6">
          <div className="md:w-2/3 lg:w-3/4 bg-main-tint03 rounded-lg">
            <label htmlFor="storyFeeling" className="block py-3 px-4">
              <p className="type-caption mb-1 text-gray-800">{t('question3.label')}</p>
              <p className="text-main font-medium">
                {t('question3.prompt')}
              </p>
            </label>
            <StoryTextarea
              id="storyFeeling"
              value={storyFeeling}
              onChange={(e) => setStoryFeeling(e.target.value)}
              className="min-h-[100px] resize-y"
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
              <p className="type-caption mb-1 text-gray-800">{t('question4.label')}</p>
              <p className="text-main font-medium">
                {t('question4.prompt')}
              </p>
            </label>
            <div className="mb-4 px-4 flex items-center gap-4">
              {[
                { label: t('question4.options.yes'), value: 0 },
                { label: t('question4.options.no'), value: 1 },
                { label: t('question4.options.unclear'), value: null },
              ].map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setStoryExpect(option.value)}
                  className={cn(
                    'type-button px-5 py-2 rounded-full font-bold transition-colors border-2',
                    storyExpect === option.value
                      ? 'bg-main text-white border-main'
                      : 'border-gray-400 dark:border-gray-500 text-gray-700 hover:border-main-tint01 hover:text-main-tint01'
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
              <p className="type-caption mb-1 text-gray-800">{t('question5.label')}</p>
              <ul className="list-disc space-y-2">
                <li>
                  <p className="text-gray-800">{t('question5.promptUnexpected')}</p>
                </li>
                <li>
                  <p className="text-gray-700">{t('question5.promptAffirming')}</p>
                </li>
              </ul>
            </label>
            <StoryTextarea
              id="betterAction"
              value={storyBetterAction}
              onChange={(e) => setStoryBetterAction(e.target.value)}
              className="min-h-[100px] resize-y"
            />
          </div>
          <div className="md:w-1/3 lg:w-1/4 hidden md:flex justify-center md:justify-end items-center">
            <Image src="/images/emoStory/lime-nextActionPlan.svg" alt="" width={160} height={160} className="w-32 md:w-full max-w-[160px]" />
          </div>
        </div>
      </div>

      {/* Credit */}
      <div className="type-caption hidden md:block text-right text-gray-500 dark:text-gray-300 mb-16">
        Illustration by{' '}
        <a className="text-gray-500 dark:text-gray-300 hover:text-main" href="https://icons8.com/illustrations/author/iAdLsFJOKDrk" target="_blank" rel="noopener noreferrer">
          Tanya Krasutska
        </a>{' '}
        from{' '}
        <a className="text-gray-500 dark:text-gray-300 hover:text-main" href="https://icons8.com/illustrations" target="_blank" rel="noopener noreferrer">
          Ouch!
        </a>
      </div>
    </ExploreStepLayout>
  );
}
