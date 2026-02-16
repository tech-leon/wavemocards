import { getSignUpUrl, withAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "浪潮情緒卡｜註冊",
  description: "註冊浪潮情緒卡帳號，開始探索你的情緒",
};

export default async function SignUpPage() {
  // Check if user is already logged in
  const { user } = await withAuth();

  if (user) {
    // User is already logged in, redirect to home
    redirect("/");
  }

  // Get the sign-up URL from WorkOS
  const signUpUrl = await getSignUpUrl();

  return (
    <main className="flex min-h-screen">
      {/* Left side - Background image (hidden on mobile) */}
      <div className="hidden lg:block w-1/2 relative">
        <Image
          src="/images/login-bg.svg"
          alt="註冊頁面背景"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right side - Sign up content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Icon */}
          <div className="flex justify-center text-[#D89591]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="88"
              height="88"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="5" />
              <path d="M20 21a8 8 0 1 0-16 0" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-[#D89591]">註冊</h2>

          {/* Description */}
          <p className="text-center text-gray-600">
            建立您的帳號，開始使用浪潮情緒卡
          </p>

          {/* Sign up button - redirects to WorkOS */}
          <a
            href={signUpUrl}
            className="w-full block py-3 px-4 text-center text-white font-semibold rounded-full bg-[#D89591] hover:bg-[#C37979] transition-colors"
          >
            建立帳號
          </a>

          {/* Features list */}
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-[#6B9080]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>65 張情緒卡隨時探索</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-[#6B9080]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>記錄並追蹤你的情緒變化</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-[#6B9080]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>個人化情緒分析報告</span>
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#B1DBE5]" />
            </div>
            <div className="relative px-4 bg-white text-[#85C5D6] font-bold">
              或
            </div>
          </div>

          {/* Login link */}
          <div className="text-center">
            <p className="text-gray-600 mb-2">已經有帳號了嗎？</p>
            <Link
              href="/login"
              className="text-[#85C5D6] font-bold hover:text-[#3C9DAE] transition-colors"
            >
              點我登入
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
