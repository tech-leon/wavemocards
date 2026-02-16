import { handleSignOut } from "@/lib/auth";

interface SignOutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function SignOutButton({
  className = "",
  children = "登出",
}: SignOutButtonProps) {
  return (
    <form action={handleSignOut}>
      <button
        type="submit"
        className={`px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors ${className}`}
      >
        {children}
      </button>
    </form>
  );
}
