import Image from 'next/image';

export function Footer() {
  return (
    <footer className="py-12 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800" role="contentinfo">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Logo */}
            <div className="flex justify-center md:justify-start">
              <div className="w-[30%] md:w-auto lg:w-20">
                <Image
                  src="/images/logo_footer.svg"
                  alt="Wavemocards Logo"
                  width={80}
                  height={80}
                  className="w-full md:w-auto"
                />
              </div>
            </div>

            <div className="text-center md:text-left lg:w-full">
              <h3 className="text-[#3C9DAE] text-lg font-medium mb-4 pb-2 border-b border-zinc-300 dark:border-zinc-700">
                開發團隊
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.linkedin.com/in/shu-ping-yu-238655268/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row justify-between text-zinc-900 dark:text-zinc-50 hover:text-[#3C9DAE] transition-colors"
                  >
                    <span>Project Manager</span>
                    <span className="text-right">Shu-Ping Yu</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/shu-ping-yu-238655268/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row justify-between text-zinc-900 dark:text-zinc-50 hover:text-[#3C9DAE] transition-colors"
                  >
                    <span>Product Designer</span>
                    <span className="text-right">Shu-Ping Yu</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/shu-ping-yu-238655268/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row justify-between text-zinc-900 dark:text-zinc-50 hover:text-[#3C9DAE] transition-colors"
                  >
                    <span>Front-End Engineer</span>
                    <span className="text-right">Shu-Ping Yu</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/%E5%81%89%E5%87%B1-%E6%9E%97-668aaa204/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row justify-between text-zinc-900 dark:text-zinc-50 hover:text-[#3C9DAE] transition-colors"
                  >
                    <span>Front-End Consultant</span>
                    <span className="text-right">Wei-Kai Lin</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/techleon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row justify-between text-zinc-900 dark:text-zinc-50 hover:text-[#3C9DAE] transition-colors"
                  >
                    <span>Database Developer</span>
                    <span className="text-right">Leon Wu</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/techleon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row justify-between text-zinc-900 dark:text-zinc-50 hover:text-[#3C9DAE] transition-colors"
                  >
                    <span>Back-End Developer</span>
                    <span className="text-right">Leon Wu</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/techleon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row justify-between text-zinc-900 dark:text-zinc-50 hover:text-[#3C9DAE] transition-colors"
                  >
                    <span>System Designer</span>
                    <span className="text-right">Leon Wu</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://a8607125167.wixsite.com/mysite/about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row justify-between text-zinc-900 dark:text-zinc-50 hover:text-[#3C9DAE] transition-colors"
                  >
                    <span>Illustrator</span>
                    <span className="text-right">Yi-Wen Fang</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="hidden lg:block text-left">
              {/* Contact */}
              <div className="mb-12">
                <a href="mailto:info@wavemocards.com">
                  <h3 className="text-[#3C9DAE] text-lg font-medium mb-4 pb-2 border-b border-zinc-300 dark:border-zinc-700 hover:text-[#3C9DAE] transition-colors">
                    聯絡我們
                  </h3>
                  <span className="text-zinc-900 dark:text-zinc-50 text-sm hover:text-[#3C9DAE] transition-colors">
                    點我寄信聯絡浪潮服務小組
                  </span>
                </a>
              </div>

              {/* Report Issue */}
              <div>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdiAQt45Pzuha3aj9OYdS-2-ljOcEcwEDwZjjls_ufdXHkQNw/viewform?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 className="text-[#3C9DAE] text-lg font-medium mb-4 pb-2 border-b border-zinc-300 dark:border-zinc-700 hover:text-[#3C9DAE] transition-colors">
                    回報問題
                  </h3>
                  <span className="text-zinc-900 dark:text-zinc-50 text-sm hover:text-[#3C9DAE] transition-colors">
                    點我填寫回報問題表單
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:hidden">
            <div className="text-center md:text-left">
              <a href="mailto:info@wavemocards.com">
                <h3 className="text-[#3C9DAE] text-lg font-medium mb-4 pb-2 border-b border-zinc-300 dark:border-zinc-700 hover:text-[#3C9DAE] transition-colors">
                  聯絡我們
                </h3>
                <span className="text-zinc-900 dark:text-zinc-50 text-sm hover:text-[#3C9DAE] transition-colors">
                  點我寄信聯絡浪潮服務小組
                </span>
              </a>
            </div>

            <div className="text-center md:text-left">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdiAQt45Pzuha3aj9OYdS-2-ljOcEcwEDwZjjls_ufdXHkQNw/viewform?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="text-[#3C9DAE] text-lg font-medium mb-4 pb-2 border-b border-zinc-300 dark:border-zinc-700 hover:text-[#3C9DAE] transition-colors">
                  回報問題
                </h3>
                <span className="text-zinc-900 dark:text-zinc-50 text-sm hover:text-[#3C9DAE] transition-colors">
                  點我填寫回報問題表單
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
