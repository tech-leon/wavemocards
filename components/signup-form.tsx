"use client";
// import Image from "next/image";
// import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import bgDark from "@/app/assets/img/bg/bg-login-dark.svg";
import bgLight from "@/app/assets/img/bg/bg-login-light.svg";

export default function SignupForm() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const handelImg =
    theme === "dark" ? `url('${bgDark.src}')` : `url('${bgLight.src}')`;

  return (
    <div className="flex flex-col justify-center w-full lg:grid min-h-screen lg:grid-cols-2 -my-20">
      <div className="flex items-center justify-center py-12 order-last">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold"> {t("pages.register.title")}</h1>
            <p className="text-balance text-zinc-500 dark:text-zinc-400">
              {t("pages.register.subtitle")}
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
              <Label htmlFor="email"> {t("pages.register.form.name")}</Label>
              <Input
                id="name"
                type="text"
                // placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password"> {t("pages.register.form.password")}</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password"> {t("pages.register.form.confirmPassword")}</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email"> {t("pages.register.form.birthday")}</Label>
              <Input
                id="birthday"
                type="text"
                // placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email"> {t("pages.register.form.occupations")}</Label>
              <Input
                id="occupation"
                type="text"
                // placeholder="m@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
            {t("pages.register.form.submit")}
            </Button>
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
