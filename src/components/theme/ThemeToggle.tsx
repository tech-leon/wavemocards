"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ThemePreference = "light" | "dark" | "system";

interface ThemeToggleProps {
  className?: string;
  isAuthenticated?: boolean;
}

function isThemePreference(value: unknown): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

export function ThemeToggle({ className, isAuthenticated = false }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [isSavingTheme, setIsSavingTheme] = useState(false);
  const label = "切換亮色/深色模式";

  const syncThemeFromDatabase = async () => {
    try {
      const response = await fetch("/api/user", { cache: "no-store" });
      if (!response.ok) return;

      const data: { profile?: { theme_preference?: unknown } } = await response.json();
      const databaseTheme = data.profile?.theme_preference;

      if (isThemePreference(databaseTheme)) {
        setTheme(databaseTheme);
      }
    } catch {
      // Ignore network errors and keep the current UI theme
    }
  };

  const handleToggle = async () => {
    if (isSavingTheme) {
      return;
    }

    const isDark =
      resolvedTheme === "dark" ||
      (resolvedTheme === undefined && document.documentElement.classList.contains("dark"));
    const nextTheme: ThemePreference = isDark ? "light" : "dark";

    // Optimistic update for immediate UI feedback
    setTheme(nextTheme);

    if (!isAuthenticated) {
      return;
    }

    setIsSavingTheme(true);
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme_preference: nextTheme }),
      });

      if (!response.ok) {
        throw new Error("Failed to persist theme preference");
      }

      const data: { profile?: { theme_preference?: unknown } } = await response.json();
      const databaseTheme = data.profile?.theme_preference;

      if (isThemePreference(databaseTheme)) {
        // DB is canonical; enforce server-returned theme
        setTheme(databaseTheme);
      } else {
        await syncThemeFromDatabase();
      }
    } catch {
      await syncThemeFromDatabase();
    } finally {
      setIsSavingTheme(false);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      onClick={() => {
        void handleToggle();
      }}
      disabled={isSavingTheme}
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
