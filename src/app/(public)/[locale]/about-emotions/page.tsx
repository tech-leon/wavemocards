import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { AuthNavigationButton } from '@/components/auth/AuthNavigationButton';
import { BackToTopButton } from '@/components/ui/BackToTopButton';
import { getUser } from '@/lib/auth';
import { buildAuthHref } from '@/lib/auth-routing';
import { getAboutEmotions } from '@/lib/emotions';
import { createPublicMetadata } from '@/lib/i18n/metadata';
import { localizeHref, resolveLocale } from '@/lib/i18n/locale';
import { getRequestLocale } from '@/lib/i18n/request';
import { AUTH_STICKY_TOP } from '@/lib/layout';
import { cn } from '@/lib/utils';

interface AboutEmotionsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: AboutEmotionsPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale('/', rawLocale);
  const t = await getTranslations({ locale, namespace: 'meta.aboutEmotions' });

  return createPublicMetadata({
    pathname: '/about-emotions',
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords') as string[],
    locale,
  });
}

const basicEmotions = [
  { key: 'happiness', image: 'aboutEmo_happy.svg' },
  { key: 'sadness', image: 'aboutEmo_sadness.svg' },
  { key: 'fear', image: 'aboutEmo_fear.svg' },
  { key: 'disgust', image: 'aboutEmo_hate.svg' },
  { key: 'anger', image: 'aboutEmo_anger.svg' },
  { key: 'surprise', image: 'aboutEmo_amazing.svg' },
];

export default async function AboutEmotionsPage() {
  const t = await getTranslations('aboutEmotions');
  const user = await getUser();
  const aboutEmotions = await getAboutEmotions();
  const locale = await getRequestLocale();
  const emoCardsHref = localizeHref('/emo-cards', locale);

  const whatIsEmotion = aboutEmotions.find(e => e.key === 'whatIsEmotion');
  const sixBasicEmotions = aboutEmotions.find(e => e.key === '6BasicEmotions');
  const goodOrBad = aboutEmotions.find(e => e.key === 'goodOrBad');
  const healthyEmotion = aboutEmotions.find(e => e.key === 'healthyEmotion');
  const getSectionContent = (content: string | undefined, key: string) => {
    if (locale === 'zh-TW' && content) {
      return content;
    }

    return t(key);
  };

  return (
    <>
      <section className="grow">
        <div className={cn('sticky z-30 pb-1 bg-gray-100/75 dark:bg-gray-900/75 backdrop-blur-sm', AUTH_STICKY_TOP)}>
          <div className="container mx-auto pt-4 px-3 sm:px-0">
            <div className="mb-4 flex items-center justify-between border-b-2 border-main-tint02 pb-2">
              <h2>{t('pageTitle')}</h2>
              <div className="flex justify-end gap-4">
                <span className="px-4 py-2 font-medium text-gray-500 dark:text-gray-300">
                  {t('tabs.aboutEmotions')}
                </span>
                {user ? (
                  <Link
                    href={emoCardsHref}
                    className="rounded-full border border-main px-4 py-2 font-medium text-main transition-colors hover:bg-main hover:text-white"
                  >
                    {t('tabs.emoCards')}
                  </Link>
                ) : (
                  <EmoCardsLoginButton
                    href={buildAuthHref('sign-in', emoCardsHref)}
                    label={t('tabs.emoCards')}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="px-3 sm:px-0">
        <div className="container mx-auto pb-4">

          <div className="py-4">
            <section className="mb-14">
              <h2 className="type-section-title mb-3">{t('sections.whatIsEmotion.title')}</h2>
              <p className="leading-relaxed text-gray-800 dark:text-gray-100">
                {getSectionContent(whatIsEmotion?.content, 'sections.whatIsEmotion.content')}
              </p>
            </section>

            <section className="mb-14">
              <h2 className="type-section-title mb-3">{t('sections.sixBasicEmotions.title')}</h2>
              <div className="mb-3 flex flex-wrap justify-center gap-6 md:gap-8">
                {basicEmotions.map((emotion) => (
                  <div key={emotion.key} className="mb-5 flex flex-col items-center">
                    <div className="mb-2 h-25 w-25 md:h-30 md:w-30">
                      <Image
                        src={`/images/aboutEmotions/${emotion.image}`}
                        alt={t(`basicEmotions.${emotion.key}`)}
                        width={150}
                        height={150}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span className="font-medium text-gray-800 dark:text-gray-100">
                      {t(`basicEmotions.${emotion.key}`)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="leading-relaxed text-gray-800 dark:text-gray-100">
                {getSectionContent(
                  sixBasicEmotions?.content,
                  'sections.sixBasicEmotions.content'
                )}
              </p>
            </section>

            <section className="mb-14">
              <h2 className="type-section-title mb-3">{t('sections.goodOrBad.title')}</h2>
              <p className="leading-relaxed text-gray-800 dark:text-gray-100">
                {getSectionContent(goodOrBad?.content, 'sections.goodOrBad.content')}
              </p>
            </section>

            <section className="mb-14">
              <h2 className="type-section-title mb-3">{t('sections.healthyEmotion.title')}</h2>
              <p className="leading-relaxed text-gray-800 dark:text-gray-100">
                {getSectionContent(healthyEmotion?.content, 'sections.healthyEmotion.content')}
              </p>
            </section>

            <div className="mb-16 text-right">
              <a
                href="https://wmc.hkfyg.org.hk/emo1"
                target="_blank"
                rel="noopener noreferrer"
                className="type-body-sm text-gray-500 transition-colors hover:text-main dark:text-gray-300"
              >
                {t('sourceLabel')} {t('sourceName')}
              </a>
            </div>
          </div>
        </div>
        </div>
      </section>

      <BackToTopButton />
    </>
  );
}

function EmoCardsLoginButton({ href, label }: { href: string; label: string }) {
  return (
    <AuthNavigationButton
      href={href}
      className="rounded-full border border-main px-4 py-2 font-medium text-main transition-colors hover:bg-main hover:text-white"
    >
      {label}
    </AuthNavigationButton>
  );
}
