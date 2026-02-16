'use client';

import { cn } from '@/lib/utils';

interface StrengthSelectorProps {
  value?: number;
  onChange: (level: number) => void;
}

/**
 * Strength selector for emotion levels (1-5)
 * Matches the original design: circular radio buttons
 */
export function StrengthSelector({ value, onChange }: StrengthSelectorProps) {
  const levels = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center justify-between gap-4 sm:gap-6 w-full max-w-[360px] mx-auto md:mx-0 mt-4 md:mt-0">
      {levels.map((level) => {
        const isSelected = value === level;
        return (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            className={cn(
              'w-12 h-12 sm:w-14 sm:h-14 rounded-full text-lg font-bold',
              'transition-all duration-200',
              'flex items-center justify-center',
              isSelected
                ? 'bg-main text-white shadow-md scale-110'
                : 'bg-white border-2 border-gray-400 text-gray-500 hover:border-main-tint01 hover:text-main-tint01'
            )}
          >
            {level}
          </button>
        );
      })}
    </div>
  );
}
