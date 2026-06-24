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
          'block w-full box-border rounded border border-input bg-background px-3 py-3 text-foreground focus:border-main focus:outline-none',
          className
        )}
      />
    </div>
  );
}
