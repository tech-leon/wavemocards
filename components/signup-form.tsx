"use client";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { validateSignup, ValidationResult } from "@/lib/auth/validateSignup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import bgDark from "@/app/assets/img/bg/bg-login-dark.svg";
import bgLight from "@/app/assets/img/bg/bg-login-light.svg";
import { useAuth } from "@/lib/auth/authContext";

export default function SignupForm() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { signUp } = useAuth();
  const handelImg =
    theme === "dark" ? `url('${bgDark.src}')` : `url('${bgLight.src}')`;

    const [errors, setErrors] = useState<ValidationResult['errors']>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const name = formData.get("name") as string;
      const birthday = formData.get("birthday") as string;
      const occupation = formData.get("occupation") as string;
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
      const confirmPassword = formData.get("confirmPassword") as string;
  
      const signupData = {
        email,
        password,
        confirmPassword,
        name,
        birthday,
        occupation,
        timezone,
      };
  
      const validation = validateSignup(signupData);
  
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }
  
      try {
        await signUp(email, password, name, birthday, occupation, timezone);
        // 這裡可以選擇在註冊成功後自動登入或更新用戶狀態
      } catch (error) {
        console.error("Sign up error:", error);
        alert("註冊失敗，請檢查您的資料。");
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
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
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("pages.login.email")}
                    className="rounded-xl border-2 focus-visible:ring-teal-600 dark:focus-visible:ring-teal-200"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t("pages.register.form.name")}
                    className="rounded-xl border-2 focus-visible:ring-teal-600 dark:focus-visible:ring-teal-200"
                    required
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder={t("pages.register.form.password")}
                    className="rounded-xl border-2 focus-visible:ring-teal-600 dark:focus-visible:ring-teal-200"
                    required
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder={t("pages.register.form.confirmPassword")}
                    className="rounded-xl border-2 focus-visible:ring-teal-600 dark:focus-visible:ring-teal-200"
                    required
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Input
                    id="birthday"
                    name="birthday" // 添加 name 屬性
                    type="text"
                    placeholder={t("pages.register.form.birthday")}
                    className="rounded-xl border-2 focus-visible:ring-teal-600 dark:focus-visible:ring-teal-200"
                    required
                  />
                  {errors.birthday && (
                    <p className="text-red-500 text-sm">{errors.birthday}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Input
                    id="occupation"
                    name="occupation" // 添加 name 屬性
                    type="text"
                    placeholder={t("pages.register.form.occupations")}
                    className="rounded-xl border-2 focus-visible:ring-teal-600 dark:focus-visible:ring-teal-200"
                    required
                  />
                  {errors.occupation && (
                    <p className="text-red-500 text-sm">{errors.occupation}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  variant="loginSignup"
                >
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
      </form>
    );
  }