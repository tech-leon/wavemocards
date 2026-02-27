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
          className="px-8 py-1.5 text-base font-bold rounded-full bg-main hover:bg-main-dark text-white transition-colors"
        >
          完成
        </Link>
      }
    >
      <ul className="ml-1 mt-3 mb-9 space-y-1">
        <li className="text-gray-800 dark:text-gray-100 text-lg">
          親愛的<span className="px-0.5 text-main font-bold">{userName}</span>，
        </li>
        <li className="text-gray-800 dark:text-gray-100 text-lg">
          謝謝你為了自己花了時間、心思，做覺察、紀錄與省思。
        </li>
        <li className="text-gray-800 dark:text-gray-100 text-lg mb-3">想邀請你對自己說：</li>
        <li className="text-main text-lg font-medium">我想謝謝自己，</li>
        <li className="text-main text-lg font-medium hidden md:block">
          我願意覺察、擁抱情緒與我自己，這樣的我已經很棒了！
        </li>
        <li className="text-main text-lg font-medium md:hidden">
          我願意覺察、擁抱情緒與我自己
        </li>
        <li className="text-main text-lg font-medium md:hidden">
          這樣的我已經很棒了！
        </li>
        <li className="text-gray-500 dark:text-gray-300 text-xs mt-2">
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
      <div className="text-right text-gray-500 dark:text-gray-300 text-[10px] mb-16">
        Illustration by{' '}
        <a
          className="text-gray-500 dark:text-gray-300 hover:text-[#3C9DAE]"
          href="https://icons8.com/illustrations/author/iAdLsFJOKDrk"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tanya Krasutska
        </a>{' '}
        from{' '}
        <a
          className="text-gray-500 dark:text-gray-300 hover:text-[#3C9DAE]"
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
