import Link from 'next/link';

const CONTRIBUTORS = [
  {
    role: 'Project Manager',
    name: 'Shu-Ping Yu',
    href: 'https://www.linkedin.com/in/shu-ping-yu-238655268/',
  },
  {
    role: 'Product Designer',
    name: 'Shu-Ping Yu',
    href: 'https://www.linkedin.com/in/shu-ping-yu-238655268/',
  },
  {
    role: 'Front-End Engineer',
    name: 'Shu-Ping Yu',
    href: 'https://www.linkedin.com/in/shu-ping-yu-238655268/',
  },
  {
    role: 'Front-End Consultant',
    name: 'Wei-Kai Lin',
    href: 'https://www.linkedin.com/in/%E5%81%89%E5%87%B1-%E6%9E%97-668aaa204/',
  },
  {
    role: 'Database Developer',
    name: 'Leon Wu',
    href: 'https://www.linkedin.com/in/techleon/',
  },
  {
    role: 'Back-End Developer',
    name: 'Leon Wu',
    href: 'https://www.linkedin.com/in/techleon/',
  },
  {
    role: 'System Designer',
    name: 'Leon Wu',
    href: 'https://www.linkedin.com/in/techleon/',
  },
  {
    role: 'Illustrator',
    name: 'Yi-Wen Fang',
    href: 'https://a8607125167.wixsite.com/mysite/about',
  },
] as const;

const REPORT_ISSUE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdiAQt45Pzuha3aj9OYdS-2-ljOcEcwEDwZjjls_ufdXHkQNw/viewform?usp=sharing';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-300 dark:border-slate-700" role="contentinfo">
      <div className="bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 md:flex-row md:items-start md:justify-between">
          <div className="mx-auto flex w-full max-w-sm flex-col items-center text-center md:mx-0 md:items-start md:text-left">
            <Link href="/" className="block h-[45px] w-[200px]">
              <span className="sr-only">Wavemocards</span>
              <span
                aria-hidden="true"
                className="block h-full w-full bg-[url('/images/logo_name.svg')] bg-contain bg-left bg-no-repeat"
              />
            </Link>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">透過情緒卡認識、探索和記錄你的情緒</p>
            <a
              className="mt-1 text-sm transition-colors hover:text-main"
              href="mailto:info@wavemocards.com"
            >
              info@wavemocards.com
            </a>
          </div>

          <div className="grid w-full flex-1 gap-10 md:grid-cols-2 md:pl-8 lg:pl-16">
            <section>
              <h3 className="mb-3 border-b border-slate-300 pb-2 text-lg font-semibold text-main dark:border-slate-600">開發團隊</h3>
              <ul className="space-y-1.5 text-sm">
                {CONTRIBUTORS.map((member) => (
                  <li key={`${member.role}-${member.name}`}>
                    <a
                      href={member.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 transition-colors hover:text-main"
                    >
                      <span>{member.role}</span>
                      <span className="text-right">{member.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-3 border-b border-slate-300 pb-2 text-lg font-semibold text-main dark:border-slate-600">實用連結</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about-emotions" className="inline-flex transition-colors hover:text-main">
                    認識情緒
                  </Link>
                </li>
                <li>
                  <a href="mailto:info@wavemocards.com" className="inline-flex transition-colors hover:text-main">
                    聯絡我們
                  </a>
                </li>
                <li>
                  <a
                    href={REPORT_ISSUE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex transition-colors hover:text-main"
                  >
                    回報問題
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <div className="bg-slate-300 text-slate-700 dark:bg-slate-900 dark:text-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-4 text-center text-sm">© 2023 - {year} 浪潮情緒卡 | Wave Emotion Cards 版權所有</div>
      </div>
    </footer>
  );
}
