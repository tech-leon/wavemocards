'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface ProgressBarProps {
  currentStep: number; // 1-5
}

const steps = [
  { key: 'strength1', path: '/explore/strength/1' },
  { key: 'storyBackground', path: '/explore/story/background' },
  { key: 'storyAction', path: '/explore/story/action' },
  { key: 'strength2', path: '/explore/strength/2' },
  { key: 'complete', path: '/explore/complete' },
] as const;

export function ProgressBar({ currentStep }: ProgressBarProps) {
  const t = useTranslations('explore.progress.steps');
  const router = useRouter();
  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="flex justify-center sm:justify-end mb-5 pt-5">
      <div className="mb-2 px-3 w-[320px] sm:w-[380px]">
        <div className="relative m-1">
          {/* Background line */}
          <div className="h-[2px] bg-gray-300 w-full" />
          {/* Progress line */}
          <div
            className="absolute top-0 left-0 h-[2px] bg-main-tint01 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />

          {/* Step dots */}
          {steps.map((step, index) => {
            const stepNum = index + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;
            const isClickable = isCompleted;
            const position = (index / (steps.length - 1)) * 100;

            return (
              <button
                key={stepNum}
                type="button"
                title={t(step.key)}
                disabled={!isClickable}
                onClick={() => {
                  if (isClickable) {
                    router.push(step.path);
                  }
                }}
                className={cn(
                  'absolute top-0 translate-x-[-50%] translate-y-[-50%]',
                  'type-caption w-7 h-7 rounded-full font-bold',
                  'flex items-center justify-center',
                  'transition-all duration-200',
                  isCompleted && 'bg-main-tint01 text-white cursor-pointer hover:bg-main',
                  isCurrent && 'bg-background border-2 border-main-tint01 text-main-tint01',
                  !isCompleted && !isCurrent && 'bg-background border-2 border-gray-450 text-gray-450 dark:text-gray-300',
                  isClickable && 'cursor-pointer'
                )}
                style={{ left: `${position}%` }}
              >
                {stepNum}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
