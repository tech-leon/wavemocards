"use client";
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/auth/firebase";
import { useAuth } from "@/lib/auth/authContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import bgDark from "@/app/assets/img/bg/bg-login-dark.svg";
import bgLight from "@/app/assets/img/bg/bg-login-light.svg";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);
  const [error, setError] = useState(String);
  const { user, loading } = useAuth();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const handelImg =
    theme === "dark" ? `url('${bgDark.src}')` : `url('${bgLight.src}')`;

  useEffect(() => {
    if (user && !loading) {
      if (process.env.NODE_ENV !== "production") {
        console.log(user);
      }
      router.push("/");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your email and password.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center w-full lg:grid min-h-screen lg:grid-cols-2 -my-20">
      <div className="flex items-center justify-center py-12 order-last">
        <div className="mx-auto grid w-[350px] gap-16">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{t("pages.login.title")}</h1>
            <p className="text-balance text-zinc-500 dark:text-zinc-400">
              {t("pages.login.subtitle")}
            </p>
            {error && <p className="text-red-500 mb-4">{error}</p>}
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Input
                id="email"
                type="email"
                placeholder={t("pages.login.email")}
                className="rounded-xl border-2 focus-visible:ring-teal-600 dark:focus-visible:ring-teal-200"
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)} // {{ edit_1 }}
                required
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="password"
                type="password"
                placeholder={t("pages.login.password")}
                className="rounded-xl border-2 focus-visible:ring-teal-600 dark:focus-visible:ring-teal-200"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)} // {{ edit_2 }}
                required
              />
            </div>
            <Button
              className="w-full"
              onClick={handleSubmit}
              type="submit"
              variant="loginSignup"
            >
              {t("pages.login.login")}
            </Button>
            <div className="flex mt-2 justify-center items-center text-sm">
              <Link href="/forgot-password">{t("pages.login.forget")} </Link>
            </div>
          </div>
          <div className="text-center text-sm">
            <Link href="/signup">{t("pages.login.register")} </Link>
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
