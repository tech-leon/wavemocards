"use client";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme("dark");
    }
    setMounted(true);
  }, [setTheme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Button
      className="shadow-none bg-transparent text-gray-800 hover:text-[#3c9daeff] dark:bg-transparent dark:text-gray-100 dark:hover:bg-yellow-100 dark:hover:text-black rounded-full duration-500"
      variant="default"
      size="icon"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 dark:scale-100" />
      ) : (
        <SunIcon className="h-[1.2rem] w-[1.2rem] scale-100 dark:-rotate-90 dark:scale-0" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
