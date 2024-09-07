"use client";
// import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import bgDark from "@/app/assets/img/bg/bg-login-dark.svg";
import bgLight from "@/app/assets/img/bg/bg-login-light.svg";

export default function LoginForm() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const handelImg =
    theme === "dark" ? `url('${bgDark.src}')` : `url('${bgLight.src}')`;

  return (
    <div className="flex flex-col justify-center w-full lg:grid min-h-screen lg:grid-cols-2 -my-20">
      <div className="flex items-center justify-center py-12 order-last">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{t("pages.login.title")}</h1>
            <p className="text-balance text-zinc-500 dark:text-zinc-400">
              {t("pages.login.subtitle")}
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email"> {t("pages.login.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password"> {t("pages.login.password")}</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  {t("pages.login.forget")}{" "}
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              {t("pages.login.login")}
            </Button>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            <Link href="/signup" className="underline">
              {t("pages.login.register")}{" "}
            </Link>
          </div>
        </div>
      </div>
      <div
        className="hidden lg:block bg-cover bg-no-repeat"
        style={{ backgroundImage: handelImg }}
      ></div>
    </div>
  );
}
