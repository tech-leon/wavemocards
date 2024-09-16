"use client";
import React, { useState, useEffect } from "react";
import { LanguageIcon } from "@heroicons/react/16/solid";
import i18n from "@/i18n/config";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function LangToggle() {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    localStorage.setItem("language", lng);
  };
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setCurrentLanguage(savedLanguage);
    }
  }, []);
  const languages = [
    { code: "zh-TW", name: "中文" },
    { code: "ja", name: "日本語" },
    { code: "en", name: "English" },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex group items-center w-24 bg-transparent border-none shadow-none hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent p-0 m-0 rounded-full"
            variant="default"
          >
            <LanguageIcon className="h-5 w-5 fill-gray-800 dark:fill-gray-100 group-hover:fill-[#3c9daeff] transition-all duration-300" />
            <div className="flex flex-col items-center justify-center w-14 text-gray-800 dark:text-gray-100 group-hover:text-[#3c9daeff] transition-all duration-300">
              {languages.find((lang) => lang.code === currentLanguage)?.name}
              <span className="sr-only">Toggle language</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className={cn("hover:bg-[#3c9daeff] hover:text-white")}
            inset={true}
            onClick={() => changeLanguage("en")}
          >
            English
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn("hover:bg-[#3c9daeff] hover:text-white")}
            inset={true}
            onClick={() => changeLanguage("ja")}
          >
            日本語
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn("hover:bg-[#3c9daeff] hover:text-white")}
            inset={true}
            onClick={() => changeLanguage("zh-TW")}
          >
            中文
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
