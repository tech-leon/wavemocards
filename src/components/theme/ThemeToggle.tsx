"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const label = "切換亮色/深色模式";

  const handleToggle = () => {
    const isDark =
      resolvedTheme === "dark" ||
      (resolvedTheme === undefined && document.documentElement.classList.contains("dark"));
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      onClick={handleToggle}
      className={cn(
        "text-gray-800 hover:text-[#3C9DAE] dark:text-gray-100 dark:hover:bg-yellow-100 dark:hover:text-black",
        className
      )}
    >
      <Sun className="hidden size-5 dark:block" />
      <Moon className="size-5 dark:hidden" />
    </Button>
  );
}
