'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ExploreStepLayout } from '@/components/explore';
import { Button } from '@/components/ui/button';

interface ExploreCompleteContentProps {
  userName: string;
}

export function ExploreCompleteContent({ userName }: ExploreCompleteContentProps) {
  const t = useTranslations('explore.complete');
  return (
    <ExploreStepLayout
      currentStep={5}
      title={t('title')}
      titleMobile={{ line1: t('titleMobile.line1'), line2: t('titleMobile.line2') }}
      actions={
        <Button asChild variant="main" className="h-auto px-8 py-1.5">
          <Link href="/records">{t('actions.complete')}</Link>
        </Button>
      }
    >
      <ul className="ml-1 mt-3 mb-9 space-y-1">
        <li className="type-subsection-title text-foreground">
          {t('greeting', { userName })}
          {t('saveSuccess')}
        </li>
        <li className="type-subsection-title text-foreground">
          {t('thanks')}
        </li>
        <li className="type-subsection-title mb-3 text-foreground">{t('selfTalkIntro')}</li>
        <li className="type-subsection-title font-medium">{t('selfTalkLead')}</li>
        <li className="type-subsection-title hidden md:block font-medium">
          {t('selfTalkFull')}
        </li>
        <li className="type-subsection-title md:hidden font-medium">
          {t('selfTalkLine1')}
        </li>
        <li className="type-subsection-title md:hidden font-medium">
          {t('selfTalkLine2')}
        </li>
        <li className="type-caption mt-2 text-muted-foreground">
          {t('hint')}
        </li>
      </ul>

      <div className="flex justify-end">
        <Image
          src="/images/emoStory/lime-thanks.svg"
          alt="thanks myself"
          width={300}
          height={300}
          className="w-64 md:w-80"
        />
      </div>

      {/* Credit */}
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
