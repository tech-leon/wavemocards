"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useExploreStore } from "@/store/exploreStore";
import { PAGE_CONTAINER, STICKY_TITLE_BAR } from "@/lib/layout";
import { FadeIn } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";

export function ExploreEntryContent() {
  const t = useTranslations("explore.entry");
  const router = useRouter();
  const reset = useExploreStore((s) => s.reset);

  const handleStart = () => {
    reset();
    router.push("/explore/cards");
  };

  return (
    <section className="grow" aria-label={t("aria.section")}>
      {/* Sticky title bar */}
      <div className={STICKY_TITLE_BAR}>
        <div className={`${PAGE_CONTAINER} pt-4`}>
          <div className="pb-2 border-b-2 border-main-tint02 flex justify-between">
            <h2>{t("title")}</h2>
          </div>
        </div>
      </div>

      <div className={`${PAGE_CONTAINER} pt-4 pb-10 md:pb-12`} id="top">
        <div className="flex flex-col md:flex-row items-center">
          {/* Guide text */}
          <FadeIn className="md:w-2/3 mb-6 md:mb-0" delay={0.1}>
            <div className="type-body h-full px-5 sm:px-9 py-4 sm:py-6 bg-main-tint03 rounded-lg text-gray-800 flex flex-col justify-center gap-1 md:gap-3">
              <p>{t("intro.line1")}</p>
              <p>{t("intro.line2")}</p>
              <p>
                {t("breathing.line1")}
                <span className="text-main font-bold">{t("breathing.highlight")}</span>
                {t("breathing.line2")}
              </p>
              <p>
                {t("awareness.line1")}
                <span className="text-main font-bold">
                  {t("awareness.highlight")}
                </span>
                {t("awareness.line2")}
              </p>
              <p>
                {t("ctaPrompt.line1")}
                <span className="text-main font-bold">{t("ctaPrompt.highlight")}</span>
                {t("ctaPrompt.line2")}
              </p>
            </div>
          </FadeIn>

          {/* Mobile start button */}
          <FadeIn
            className="md:hidden mt-2 flex justify-center w-full"
            delay={0.4}
          >
            <Button
              type="button"
              variant="main"
              className="type-button-lg h-auto w-3/4 py-6 shadow-md duration-200"
              onClick={handleStart}
            >
              {t("startButton")}
            </Button>
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
            <div className="type-caption mt-4 mb-8 flex justify-center text-muted-foreground md:mb-0">
              Illustration by{" "}
              <a
                className="text-muted-foreground hover:text-main ml-1"
                href="https://icons8.com/illustrations/author/iAdLsFJOKDrk"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tanya Krasutska
              </a>{" "}
              <span className="mx-1">from</span>
              <a
                className="text-muted-foreground hover:text-main"
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
            className="hidden md:flex mt-16 justify-center w-full"
            delay={0.5}
          >
            <Button
              type="button"
              variant="main"
              className="type-button-lg h-auto w-3/4 max-w-md py-6 shadow-md duration-200"
              onClick={handleStart}
            >
              {t("startButton")}
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
