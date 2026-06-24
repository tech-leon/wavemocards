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
      className={`type-button px-4 py-2 text-foreground transition-colors hover:text-main ${className}`}
    >
      {children}
    </AuthNavigationButton>
  );
}
