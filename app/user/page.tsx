"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/authContext";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import userDark from "@/app/assets/img/illustration/profile-dark.svg";
import userLight from "@/app/assets/img/illustration/profile-light.svg";

interface UserData {
  birthday: string;
  occupation: string;
  sign_up_day: string;
  timezone: string;
}

export default function UserPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const { theme } = useTheme();
  const handelImg = theme === "dark" ? userDark.src : userLight.src;

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex flex-grow flex-col justify-center items-center h-[35rem]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-4/5 mx-auto my-10">
      <h1>{t("pages.user.title")}</h1>
      <div className="border border-slate-300 my-3"></div>
      <div className="flex w-full my-10">
        <div className="w-1/2">
          <Image src={handelImg} alt="profile" width={400} height={400}></Image>
        </div>
        <div className="flex flex-col w-1/2 px-9 text-2xl gap-5">
          <p>
            {t("pages.user.email")} {user?.email}
          </p>
          <p>{t("pages.user.password")} ***************</p>
          <p>
            {t("pages.user.name")} {user?.displayName || "Not set"}
          </p>
          <p>
            {t("pages.user.occupation")} {userData?.occupation || t("pages.user.valueEmpty")}
          </p>
          <p>
            {t("pages.user.birthday")} {userData?.birthday.slice(0, 10) || t("pages.user.valueEmpty")}
          </p>
          {/* <p>
            {t("pages.userProfile.photoURL")} {user?.photoURL || "Not set"}
          </p> */}
          <p>
            {t("pages.user.creationTime")}{" "}
            {userData?.sign_up_day.slice(0, 10) || "Not set"}
          </p>
        </div>
      </div>
      <p className="text-sm dark:invisible text-gray-400">
        Illustration by{" "}
        <a href="https://icons8.com/illustrations/author/iAdLsFJOKDrk">
          Tanya Krasutska
        </a>{" "}
        from <a href="https://icons8.com/illustrations">Ouch</a>!
      </p>
    </div>
  );
}
