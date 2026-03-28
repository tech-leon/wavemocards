import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { localizeHref, type Locale } from '@/lib/i18n/locale';

const CONTRIBUTORS = [
  {
    roleKey: 'projectManager',
    name: 'Shu-Ping Yu',
    href: 'https://www.linkedin.com/in/shu-ping-yu-238655268/',
  },
  {
    roleKey: 'productDesigner',
    name: 'Shu-Ping Yu',
    href: 'https://www.linkedin.com/in/shu-ping-yu-238655268/',
  },
  {
    roleKey: 'frontEndEngineer',
    name: 'Shu-Ping Yu',
    href: 'https://www.linkedin.com/in/shu-ping-yu-238655268/',
  },
  {
    roleKey: 'frontEndConsultant',
    name: 'Wei-Kai Lin',
    href: 'https://www.linkedin.com/in/%E5%81%89%E5%87%B1-%E6%9E%97-668aaa204/',
  },
  {
    roleKey: 'databaseDeveloper',
    name: 'Leon Wu',
    href: 'https://www.linkedin.com/in/techleon/',
  },
  {
    roleKey: 'backEndDeveloper',
    name: 'Leon Wu',
    href: 'https://www.linkedin.com/in/techleon/',
  },
  {
    roleKey: 'systemDesigner',
    name: 'Leon Wu',
    href: 'https://www.linkedin.com/in/techleon/',
  },
  {
    roleKey: 'illustrator',
    name: 'Yi-Wen Fang',
    href: 'https://a8607125167.wixsite.com/mysite/about',
  },
] as const;

const REPORT_ISSUE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdiAQt45Pzuha3aj9OYdS-2-ljOcEcwEDwZjjls_ufdXHkQNw/viewform?usp=sharing';

interface FooterProps {
  locale: Locale;
}

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations('layout.footer');
  const tAria = await getTranslations('aria');
  const year = new Date().getFullYear();
  const homeHref = localizeHref('/', locale);
  const aboutHref = localizeHref('/about-emotions', locale);

  return (
    <footer className="border-t border-slate-300 dark:border-slate-700" role="contentinfo">
      <div className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 md:flex-row md:items-start md:justify-between">
          <div className="mx-auto flex w-full max-w-sm flex-col items-center text-center md:mx-0 md:items-start md:text-left">
            <Link href={homeHref} className="block h-[45px] w-[200px]">
              <span className="sr-only">{tAria('brand')}</span>
              <span
                aria-hidden="true"
                className="block h-full w-full bg-[url('/images/logo_name.svg')] bg-contain bg-left bg-no-repeat"
              />
            </Link>
            <p className="mt-3 text-slate-700 dark:text-slate-200">{t('tagline')}</p>
            <a
              className="mt-1 transition-colors hover:text-main"
              href="mailto:info@wavemocards.com"
            >
              info@wavemocards.com
            </a>
          </div>

          <div className="grid justify-center w-full flex-1 gap-16 lg:grid-cols-2">
            <section className="w-70">
              <h3 className="mb-3 border-b border-slate-300 pb-2 dark:border-slate-600">{t('sections.team')}</h3>
              <ul className="space-y-1.5">
                {CONTRIBUTORS.map((member) => (
                  <li key={`${member.roleKey}-${member.name}`}>
                    <a
                      href={member.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 transition-colors hover:text-main"
                    >
                      <span>{t(`contributors.${member.roleKey}`)}</span>
                      <span className="text-right">{member.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="md:max-w-60">
              <h3 className="mb-3 border-b border-slate-300 pb-2 font-semibold dark:border-slate-600">{t('sections.usefulLinks')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={aboutHref} className="inline-flex transition-colors hover:text-main">
                    {t('links.aboutEmotions')}
                  </Link>
                </li>
                <li>
                  <a href="mailto:info@wavemocards.com" className="inline-flex transition-colors hover:text-main">
                    {t('links.contactUs')}
                  </a>
                </li>
                <li>
                  <a
                    href={REPORT_ISSUE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex transition-colors hover:text-main"
                  >
                    {t('links.reportIssue')}
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <div className="bg-slate-300 text-slate-700 dark:bg-slate-900 dark:text-slate-100">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-center px-4 text-center whitespace-nowrap sm:px-6">
          {t('copyright', { year })}
        </div>
      </div>
    </footer>
  );
}
