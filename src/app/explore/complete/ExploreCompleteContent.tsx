'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ExploreStepLayout } from '@/components/explore';

interface ExploreCompleteContentProps {
  userName: string;
}

export function ExploreCompleteContent({ userName }: ExploreCompleteContentProps) {
  return (
    <ExploreStepLayout
      currentStep={6}
      title="謝謝自己與情緒浪潮同在"
      titleMobile={{ line1: '謝謝自己', line2: '與情緒浪潮同在' }}
      actions={
        <Link
          href="/records"
          className="type-button px-8 py-1.5 font-bold rounded-full bg-main hover:bg-main-dark text-white transition-colors"
        >
          完成
        </Link>
      }
    >
      <ul className="ml-1 mt-3 mb-9 space-y-1">
        <li className="type-subsection-title text-gray-800 dark:text-gray-100">
          親愛的<span className="px-0.5 text-main font-bold">{userName}</span>，
          紀錄已成功儲存。
        </li>
        <li className="type-subsection-title text-gray-800 dark:text-gray-100">
          謝謝你為了自己花了時間、心思，做覺察、紀錄與省思。
        </li>
        <li className="type-subsection-title mb-3 text-gray-800 dark:text-gray-100">想邀請你對自己說：</li>
        <li className="type-subsection-title font-medium">我想謝謝自己，</li>
        <li className="type-subsection-title hidden md:block font-medium">
          我願意覺察、擁抱情緒與我自己，這樣的我已經很棒了！
        </li>
        <li className="type-subsection-title md:hidden font-medium">
          我願意覺察、擁抱情緒與我自己
        </li>
        <li className="type-subsection-title md:hidden font-medium">
          這樣的我已經很棒了！
        </li>
        <li className="type-caption mt-2 text-gray-500 dark:text-gray-300">
          您可以點擊右上方的「完成」，前往「我的紀錄」觀看紀錄內容。
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
      <div className="type-caption text-right text-gray-500 dark:text-gray-300">
        Illustration by{' '}
        <a
          className="text-gray-500 dark:text-gray-300 hover:text-main"
          href="https://icons8.com/illustrations/author/iAdLsFJOKDrk"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tanya Krasutska
        </a>{' '}
        from{' '}
        <a
          className="text-gray-500 dark:text-gray-300 hover:text-main"
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
