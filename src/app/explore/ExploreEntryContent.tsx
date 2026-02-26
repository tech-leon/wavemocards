"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useExploreStore } from "@/store/exploreStore";
import { FadeIn } from "@/components/ui/motion";

export function ExploreEntryContent() {
  const router = useRouter();
  const reset = useExploreStore((s) => s.reset);

  const handleStart = () => {
    reset();
    router.push("/explore/cards");
  };

  return (
    <main className="px-3 sm:px-0 mx-15">
      <div className="container mx-auto py-4 pt-8" id="top">
        {/* Title bar */}
        <div className="mb-4 pb-2 border-b-2 border-main-tint02 flex justify-between">
          <h2 className="text-2xl font-bold">探索情緒</h2>
        </div>

        <div className="flex flex-col md:flex-row items-center">
          {/* Guide text */}
          <FadeIn className="md:w-2/3 mb-6 md:mb-0" delay={0.1}>
            <div className="h-full px-5 sm:px-9 py-4 sm:py-6 bg-main-tint03 rounded-lg text-md text-gray-700 flex flex-col justify-center gap-1 md:gap-3">
              <p>你在情緒的世界裡迷航了嗎？</p>
              <p>沒關係，讓我們一起在浪潮情緒卡中，探索自己的情緒。</p>
              <p>
                邀請你先閉上眼睛，
                <span className="text-main font-bold">深呼吸</span>
                ，再慢慢地吐氣。
              </p>
              <p>
                在吸氣與吐氣的過程，
                <span className="text-main font-bold">
                  慢慢地感受自己的身體與心靈的狀態
                </span>
                。
              </p>
              <p>
                如果準備好了的話，
                <span className="text-main font-bold">請點擊「開始探索」</span>
                。
              </p>
            </div>
          </FadeIn>

          {/* Mobile start button */}
          <FadeIn
            className="md:hidden mt-2 flex justify-center w-full"
            delay={0.4}
          >
            <button
              type="button"
              onClick={handleStart}
              className="w-3/4 py-6 bg-main hover:bg-main-dark text-white text-lg font-bold rounded-full transition-colors duration-200 shadow-md"
            >
              開始探索
            </button>
          </FadeIn>

          {/* Illustration */}
          <FadeIn
            className="md:w-1/3 pt-9 flex flex-col items-center"
            delay={0.3}
          >
            <Image
              src="/images/lime-Breath.svg"
              alt="breath"
              width={240}
              height={240}
              className="w-48 md:w-60"
            />
            {/* Illustration credit */}
            <div className="mt-4 mb-16 md:mb-2 flex justify-center text-gray-500 text-[10px]">
              Illustration by{" "}
              <a
                className="text-gray-500 ml-1"
                href="https://icons8.com/illustrations/author/iAdLsFJOKDrk"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tanya Krasutska
              </a>{" "}
              <span className="mx-1">from</span>
              <a
                className="text-gray-500"
                href="https://icons8.com/illustrations"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ouch!
              </a>
            </div>
          </FadeIn>
        </div>

        <div>
          {/* Desktop start button */}
          <FadeIn
            className="hidden md:flex mt-6 justify-center w-full"
            delay={0.5}
          >
            <button
              type="button"
              onClick={handleStart}
              className="w-3/4 max-w-md py-6 bg-main hover:bg-main-dark text-white text-lg font-bold rounded-full transition-colors duration-200 shadow-md"
            >
              開始探索
            </button>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
