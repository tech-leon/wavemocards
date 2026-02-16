import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-gray-550 py-12" role="contentinfo">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          {/* Logo */}
          <div className="w-[30%] lg:w-[10%] mb-12 lg:mb-0 lg:mr-24">
            <Image
              src="/images/logo_footer.svg"
              alt="Wavemocards Logo"
              width={80}
              height={80}
              className="w-full"
            />
          </div>

          {/* Developers */}
          <div className="w-full lg:w-[30%] text-center lg:text-left mb-12 lg:mb-0 lg:mr-14">
            <h3 className="text-white text-lg font-medium mb-4 pb-2 border-b border-white">
              開發團隊
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://www.linkedin.com/in/shu-ping-yu-238655268/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col lg:flex-row justify-between text-white hover:text-happy transition-colors"
                >
                  <span>Project Manager</span>
                  <span className="mt-1 lg:mt-0 text-right">Shu-Ping Yu</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/shu-ping-yu-238655268/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col lg:flex-row justify-between text-white hover:text-happy transition-colors"
                >
                  <span>Product Designer</span>
                  <span className="mt-1 lg:mt-0 text-right">Shu-Ping Yu</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/shu-ping-yu-238655268/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col lg:flex-row justify-between text-white hover:text-happy transition-colors"
                >
                  <span>Front-End Engineer</span>
                  <span className="mt-1 lg:mt-0 text-right">Shu-Ping Yu</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/%E5%81%89%E5%87%B1-%E6%9E%97-668aaa204/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col lg:flex-row justify-between text-white hover:text-happy transition-colors"
                >
                  <span>Front-End Consultant</span>
                  <span className="mt-1 lg:mt-0 text-right">Wei-Kai Lin</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/techleon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col lg:flex-row justify-between text-white hover:text-happy transition-colors"
                >
                  <span>Database Developer</span>
                  <span className="mt-1 lg:mt-0 text-right">Leon Wu</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/techleon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col lg:flex-row justify-between text-white hover:text-happy transition-colors"
                >
                  <span>Back-End Developer</span>
                  <span className="mt-1 lg:mt-0 text-right">Leon Wu</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/techleon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col lg:flex-row justify-between text-white hover:text-happy transition-colors"
                >
                  <span>System Designer</span>
                  <span className="mt-1 lg:mt-0 text-right">Leon Wu</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://a8607125167.wixsite.com/mysite/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col lg:flex-row justify-between text-white hover:text-happy transition-colors"
                >
                  <span>Illustrator</span>
                  <span className="mt-1 lg:mt-0 text-right">Yi-Wen Fang</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Report */}
          <div className="w-full lg:w-[30%] text-center lg:text-left mb-12 lg:mb-0 lg:mr-14">
            {/* Contact */}
            <div className="mb-12">
              <a href="mailto:info@wavemocards.com">
                <h3 className="text-white text-lg font-medium mb-4 pb-2 border-b border-white hover:text-happy transition-colors">
                  聯絡我們
                </h3>
                <span className="text-white text-sm hover:text-happy transition-colors">
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
                <h3 className="text-white text-lg font-medium mb-4 pb-2 border-b border-white hover:text-happy transition-colors">
                  回報問題
                </h3>
                <span className="text-white text-sm hover:text-happy transition-colors">
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
