"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import bgDark from "@/app/assets/img/bg/bg-dark.svg";
import bgLight from "@/app/assets/img/bg/bg-light.svg";

export default function Hero() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const handelImg =
    theme === "dark" ? `url('${bgDark.src}')` : `url('${bgLight.src}')`;

  return (
    <section
      className="flex flex-col items-center justify-center h-[51rem] bg-cover bg-center bg-no-repeat min-w-full"
      style={{ backgroundImage: handelImg }}
    >
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 lg:pr-[300px] text-gray-100">
          {t("pages.home.title")}
        </h1>
        <h1 className="text-6xl md:text-8xl font-bold mt-4 lg:pl-[300px] text-gray-100">
          {t("pages.home.subtitle")}
        </h1>
      </div>
    </section>
  );
}
