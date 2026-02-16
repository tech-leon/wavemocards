import { getSignInUrl, withAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "浪潮情緒卡｜登入",
  description: "登入浪潮情緒卡，開始探索你的情緒",
};

export default async function LoginPage() {
  // Check if user is already logged in
  const { user } = await withAuth();

  if (user) {
    // User is already logged in, redirect to home
    redirect("/");
  }

  // Get the sign-in URL from WorkOS
  const signInUrl = await getSignInUrl();

  return (
    <main className="flex min-h-screen">
      {/* Left side - Background image (hidden on mobile) */}
      <div className="hidden lg:block w-1/2 relative">
        <Image
          src="/images/login-bg.svg"
          alt="登入頁面背景"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right side - Login content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Icon */}
          <div className="flex justify-center text-[#6B9080]">
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
          <h2 className="text-3xl font-bold text-center text-[#6B9080]">登入</h2>

          {/* Login button - redirects to WorkOS */}
          <a
            href={signInUrl}
            className="w-full block py-3 px-4 text-center text-white font-semibold rounded-full bg-[#6B9080] hover:bg-[#5a7a6c] transition-colors"
          >
            登入帳號
          </a>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E8B0AC]" />
            </div>
            <div className="relative px-4 bg-white text-[#D89591] font-bold">
              或
            </div>
          </div>

          {/* Sign up link */}
          <div className="text-center">
            <p className="text-gray-600 mb-2">尚未有帳號嗎？</p>
            <Link
              href="/signup"
              className="text-[#D89591] font-bold hover:text-[#C37979] transition-colors"
            >
              點我註冊
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
