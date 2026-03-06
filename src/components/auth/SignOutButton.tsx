import { buildSignOutHref } from "@/lib/auth-routing";
import { AuthNavigationButton } from "@/components/auth/AuthNavigationButton";

interface SignOutButtonProps {
  className?: string;
  children?: React.ReactNode;
  returnTo?: string;
}

export function SignOutButton({
  className = "",
  children = "登出",
  returnTo = "/",
}: SignOutButtonProps) {
  return (
    <AuthNavigationButton
      href={buildSignOutHref(returnTo)}
      className={`px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:text-[#3C9DAE] dark:text-gray-100 ${className}`}
    >
      {children}
    </AuthNavigationButton>
  );
}
