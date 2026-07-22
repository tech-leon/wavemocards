import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { BackToTopButton } from '@/components/ui/BackToTopButton';
import { localizeHref } from '@/lib/i18n/locale';
import { getRequestLocale } from '@/lib/i18n/request';
import { PAGE_CONTAINER, STICKY_TITLE_BAR } from '@/lib/layout';
import { cn } from '@/lib/utils';

interface LegalSection {
  title: string;
  body?: string[];
  items?: string[];
  after?: string[];
}

interface LegalPageProps {
  page: 'privacy' | 'terms';
}

export async function LegalPage({ page }: LegalPageProps) {
  const t = await getTranslations('legal');
  const locale = await getRequestLocale();
  const intro = t.raw(`${page}.intro`) as string[];
  const sections = t.raw(`${page}.sections`) as LegalSection[];
  const otherPage = page === 'privacy' ? 'terms' : 'privacy';
  const otherHref = localizeHref(`/${otherPage}`, locale);

  return (
    <>
      <section className="grow">
        <div className={STICKY_TITLE_BAR}>
          <div className={cn(PAGE_CONTAINER, 'pt-4')}>
            <div className="mb-4 border-b-2 border-main-tint02 pb-2">
              <h2>{t(`${page}.pageTitle`)}</h2>
            </div>
          </div>
        </div>
        <div className={cn(PAGE_CONTAINER, 'pb-4')}>
          <div className="max-w-3xl py-4">
            <p className="type-body-sm mb-8 text-muted-foreground">
              {t(`${page}.effectiveDate`)}
            </p>
            {intro.map((paragraph) => (
              <p key={paragraph} className="mb-3 leading-relaxed text-foreground">
                {paragraph}
              </p>
            ))}
            {sections.map((section, index) => (
              <section key={section.title} className="mt-10">
                <h2 className="type-section-title mb-3">
                  {`${index + 1}. ${section.title}`}
                </h2>
                {section.body?.map((paragraph) => (
                  <p key={paragraph} className="mb-3 leading-relaxed text-foreground">
                    {paragraph}
                  </p>
                ))}
                {section.items && (
                  <ul className="mb-3 list-disc space-y-2 pl-6 leading-relaxed text-foreground">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.after?.map((paragraph) => (
                  <p key={paragraph} className="mb-3 leading-relaxed text-foreground">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
            <div className="mt-14 border-t border-border pt-6">
              <span className="text-muted-foreground">{t('seeAlso')} </span>
              <Link
                href={otherHref}
                className="text-main underline-offset-4 transition-colors hover:underline"
              >
                {t(`${otherPage}.pageTitle`)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BackToTopButton />
    </>
  );
}
