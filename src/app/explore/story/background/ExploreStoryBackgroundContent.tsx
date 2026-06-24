'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useExploreStore } from '@/store/exploreStore';
import { ExploreStepLayout, StoryTextarea } from '@/components/explore';
import { Button } from '@/components/ui/button';

interface ExploreStoryBackgroundContentProps {
  userName: string;
}

export function ExploreStoryBackgroundContent({
  userName,
}: ExploreStoryBackgroundContentProps) {
  const t = useTranslations('explore.storyBackground');
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
      currentStep={2}
      title={t('title')}
      titleMobile={{ line1: t('titleMobile.line1'), line2: t('titleMobile.line2') }}
      actions={
        <>
          <Button
            type="button"
            variant="main-tint-outline"
            className="px-6 py-1.5"
            onClick={handleBack}
          >
            {t('actions.previous')}
          </Button>
          <Button
            type="button"
            variant="main"
            className="px-6 py-1.5"
            onClick={handleNext}
          >
            {t('actions.next')}
          </Button>
        </>
      }
    >
      <ul className="type-body-sm ml-1 mt-8 mb-10 space-y-1 text-foreground">
        <li>
          {t('greeting', { userName })}
        </li>
        <li>{t('instructions.line2')}</li>
        <li className="type-caption text-muted-foreground">
          {t('instructions.skipHint')}
        </li>
      </ul>

      <div className="mb-10 flex flex-col items-stretch gap-6 md:flex-row">
        <div className="rounded-lg bg-main-tint03 md:w-2/3 lg:w-3/4">
          <label htmlFor="whatHappened" className="block px-4 py-3">
            <p className="type-body mb-2 font-medium text-main">
              {t('prompt.title', { cardNames: cardNamesStr })}
            </p>
            <p className="type-body-sm text-gray-800">
              {t('prompt.description')}
            </p>
          </label>
          <StoryTextarea
            id="whatHappened"
            value={storyBackground}
            onChange={(e) => setStoryBackground(e.target.value)}
            className="min-h-[200px] resize-y"
            placeholder={t('placeholder')}
          />
        </div>
        <div className="flex items-center justify-center md:w-1/3 md:justify-end lg:w-1/4">
          <Image
            src="/images/emoStory/lime-diving.svg"
            alt="a person diving"
            width={200}
            height={200}
            className="w-40 max-w-[200px] md:w-full"
          />
        </div>
      </div>

      <div className="type-caption text-right text-muted-foreground">
        Illustration by{' '}
        <a
          className="text-muted-foreground hover:text-main"
          href="https://icons8.com/illustrations/author/iAdLsFJOKDrk"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tanya Krasutska
        </a>{' '}
        from{' '}
        <a
          className="text-muted-foreground hover:text-main"
          href="https://icons8.com/illustrations"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ouch!
        </a>
      </div>
    </ExploreStepLayout>
  );
}
