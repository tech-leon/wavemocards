"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

type ThemePreference = "light" | "dark" | "system";

interface ThemeSyncerProps {
  userId: string | null;
}

const syncedUserIds = new Set<string>();

function isThemePreference(value: unknown): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

export function ThemeSyncer({ userId }: ThemeSyncerProps) {
  const { setTheme } = useTheme();
  const syncedUserRef = useRef<string | null>(null);

  useEffect(() => {
    if (!userId) {
      syncedUserRef.current = null;
      return;
    }

    if (syncedUserRef.current === userId || syncedUserIds.has(userId)) {
      return;
    }

    syncedUserRef.current = userId;
    syncedUserIds.add(userId);

    const controller = new AbortController();

    const syncTheme = async () => {
      try {
        const response = await fetch("/api/user", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const data: { profile?: { theme_preference?: unknown } } = await response.json();
        const themePreference = data.profile?.theme_preference;

        if (!isThemePreference(themePreference)) {
          return;
        }

        setTheme(themePreference);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    };

    void syncTheme();

    return () => {
      controller.abort();
    };
  }, [userId, setTheme]);

  return null;
}
