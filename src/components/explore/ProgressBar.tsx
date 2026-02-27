'use client';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface ProgressBarProps {
  currentStep: number; // 1-6
}

const steps = [
  { label: '我的情緒卡夾', path: '/explore/selected' },
  { label: '1st情緒強度', path: '/explore/strength/1' },
  { label: '背景篇', path: '/explore/story/background' },
  { label: '行動篇', path: '/explore/story/action' },
  { label: '2nd情緒強度', path: '/explore/strength/2' },
  { label: '感謝自我', path: '/explore/complete' },
];

export function ProgressBar({ currentStep }: ProgressBarProps) {
  const router = useRouter();
  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="flex justify-center sm:justify-end mb-5 pt-5">
      <div className="mb-2 px-3 w-[320px] sm:w-[380px]">
        <div className="relative m-1">
          {/* Background line */}
          <div className="h-[2px] bg-border w-full" />
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
                title={step.label}
                disabled={!isClickable}
                onClick={() => {
                  if (isClickable) {
                    router.push(step.path);
                  }
                }}
                className={cn(
                  'absolute top-0 translate-x-[-50%] translate-y-[-50%]',
                  'w-7 h-7 rounded-full text-xs font-bold',
                  'flex items-center justify-center',
                  'transition-all duration-200',
                  isCompleted && 'bg-main-tint01 text-white cursor-pointer hover:bg-main',
                  isCurrent && 'bg-background border-2 border-main-tint01 text-main-tint01',
                  !isCompleted && !isCurrent && 'bg-background border-2 border-muted-foreground/50 text-muted-foreground/50',
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
