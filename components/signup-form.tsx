"use client";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { validateSignup, ValidationResult } from "@/lib/auth/validateSignup";
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import bgDark from "@/app/assets/img/bg/bg-login-dark.svg";
import bgLight from "@/app/assets/img/bg/bg-login-light.svg";
import { useAuth } from "@/lib/auth/authContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { CustomDatePicker } from "@/components/ui/custom-datepicker";

export default function SignupForm() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { signUp } = useAuth();
  const handelImg =
    theme === "dark" ? `url('${bgDark.src}')` : `url('${bgLight.src}')`;
  
  const router = useRouter();
  const [errors, setErrors] = useState<ValidationResult["errors"]>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [occupation, setOccupation] = useState("");
  const [birthday, setBirthday] = useState<Date | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const confirmPassword = formData.get("confirmPassword") as string;

    const formattedBirthday = birthday
      ? `${birthday.getFullYear()}-${String(birthday.getMonth() + 1).padStart(2, "0")}-${String(
          birthday.getDate()
        ).padStart(2, "0")}`
      : "";

    const signupData = {
      email,
      password,
      confirmPassword,
      name,
      birthday: formattedBirthday,
      occupation,
      timezone,
    };

    const validation = validateSignup(signupData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      await signUp(
        email,
        password,
        name,
        formattedBirthday,
        occupation,
        timezone
      );
    } catch (error) {
      console.error("Sign up error:", error);
      alert("註冊失敗，請檢查您的資料。");
    } finally {
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={cn("flex flex-col justify-center w-full lg:grid min-h-screen lg:grid-cols-2 -my-20")}>
        <div className={cn("flex items-center justify-center py-12 order-last")}>
          <div className={cn("mx-auto grid w-[350px] gap-6")}>
            <div className={cn("grid gap-2 text-center")}>
              <h1 className={cn("text-3xl font-bold")}>
                {t("pages.register.title")}
              </h1>
              <p className={cn("text-balance text-zinc-500 dark:text-zinc-400")}>
                {t("pages.register.subtitle")}
              </p>
            </div>
            <div className={cn("grid gap-4")}>
              <div className={cn("grid gap-2")}>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("pages.login.email")}
                  className={cn("rounded-xl border-2 focus-visible:ring-teal-600 dark:focus-visible:ring-teal-200")}
                  required
                />
                {errors.email && (
                  <p className={cn("text-red-500 text-sm")}>{errors.email}</p>
                )}
              </div>
              <div className={cn("grid gap-2")}>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t("pages.register.form.name")}
                  className={cn("rounded-xl border-2 focus-visible:ring-teal-600 dark:focus-visible:ring-teal-200")}
                  required
                />
                {errors.name && (
                  <p className={cn("text-red-500 text-sm")}>{errors.name}</p>
                )}
              </div>
              <div className={cn("grid gap-2 relative")}>
                <Input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder={t("pages.register.form.password")}
                  className={cn("rounded-xl border-2 focus-visible:ring-teal-600 dark:focus-visible:ring-teal-200")}
                  required
                />
                <span
                  className="absolute right-3 top-[0.70rem] cursor-pointer"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
                {errors.password && (
                  <p className={cn("text-red-500 text-sm")}>{errors.password}</p>
                )}
              </div>
              <div className={cn("grid gap-2 relative")}>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  placeholder={t("pages.register.form.confirmPassword")}
                  className={cn("rounded-xl border-2 focus-visible:ring-teal-600 dark:focus-visible:ring-teal-200")}
                  required
                />
                <span
                  className="absolute right-3 top-[0.65rem] cursor-pointer"
                  onClick={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                >
                  {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
                {errors.confirmPassword && (
                  <p className={cn("text-red-500 text-sm")}>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <div className={cn("flex flex-col gap-4")}>
                <CustomDatePicker
                  value={birthday}
                  onChange={(date) => setBirthday(date)}
                  placeholder={t("pages.register.form.birthday")}
                />
                {errors.birthday && (
                  <p className={cn("text-red-500 text-sm")}>{errors.birthday}</p>
                )}
              </div>
              <div className={cn("grid gap-2")}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Input
                      id="occupation"
                      name="occupation"
                      type="text"
                      placeholder={t("pages.register.form.occupation")}
                      className={cn("rounded-xl border-2 focus-visible:ring-teal-600 dark:focus-visible:ring-teal-200")}
                      value={occupation}
                      readOnly
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {Object.values(
                      t("pages.register.occupations", { returnObjects: true })
                    ).map((job) => (
                      <DropdownMenuItem
                        key={job}
                        onClick={() => setOccupation(job)}
                      >
                        {job}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {errors.occupation && (
                  <p className={cn("text-red-500 text-sm")}>{errors.occupation}</p>
                )}
              </div>
              <Button type="submit" className={cn("w-full")} variant="loginSignup">
                {t("pages.register.form.submit")}
              </Button>
            </div>
          </div>
        </div>
        <div
          className={cn("hidden lg:block bg-cover bg-no-repeat")}
          style={{ backgroundImage: handelImg }}
        ></div>
      </div>
    </form>
  );
}
