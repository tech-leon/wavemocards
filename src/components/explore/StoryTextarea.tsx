import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface StoryTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  wrapperClassName?: string;
}

export function StoryTextarea({
  className,
  wrapperClassName,
  ...props
}: StoryTextareaProps) {
  return (
    <div className={cn('px-4 pb-4', wrapperClassName)}>
      <textarea
        {...props}
        className={cn(
          'block w-full box-border rounded border border-gray-500 bg-gray-100 px-3 py-3 text-gray-900 focus:border-main focus:outline-none dark:border-gray-400 dark:bg-gray-900 dark:text-gray-100',
          className
        )}
      />
    </div>
  );
}
