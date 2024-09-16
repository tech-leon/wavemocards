'use client'
import React from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import logo from "@/app/assets/img/logo/logo.png";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login" || pathname === "/signup";

  if (isLoginPage) {
    return null;
  }

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className="mx-auto text-gray-700 bg-gray-200 dark:bg-gray-800 dark:text-white max-h-fit">
      <div className="max-w-7xl md:px-5 py-10 mx-auto flex items-center md:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="flex flex-col items-center md:items-start md:w-1/2 lg:w-1/4 md:mx-0 mx-auto text-center md:text-left ">
          <Link
            href="/"
            className="flex items-center justify-center md:justify-start hover:no-underline w-68"
          >
            <Image className="size-7 lg:size-9" src={logo} alt="logo" />
            <div className="ml-3 md:text-xl font-bold text-[#3c9daeff]">
              {t("nav.app")}
            </div>
          </Link>
          <p className="mt-2 mb-1">{t("footer.subtitle")}</p>
          <a
            className="hover:text-teal-600"
            target="_blank"
            rel="noreferrer"
            href={t("footer.email")}
          >
            info@wavemocards.com
          </a>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-10 lg:pl-20  md:mt-0 mt-10 md:text-left text-center w-3/4 justify-evenly">
          <div className="lg:w-1/2 w-full md:px-4">
            <h2 className="title-font font-medium tracking-widest text-xl mb-3">
              {t("footer.contributors.title")}
            </h2>
            <div className="border border-slate-300"></div>
            <nav className="list-none mb-10">
              <ul className="flex flex-col">
                <li>
                  <a
                    href={t("footer.contributors.url.elma")}
                    className="flex justify-between mb-1 hover:text-teal-600"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div>{t("footer.contributors.position.pm")}</div>
                    <div>{t("footer.contributors.name.elma")}</div>
                  </a>
                </li>
                <li>
                  <a
                    href={t("footer.contributors.url.elma")}
                    className="flex justify-between mb-1 hover:text-teal-600"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div>{t("footer.contributors.position.pd")}</div>
                    <div>{t("footer.contributors.name.elma")}</div>
                  </a>
                </li>
                <li>
                  <a
                    href={t("footer.contributors.url.elma")}
                    className="flex justify-between mb-1 hover:text-teal-600"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div>{t("footer.contributors.position.fd")}</div>
                    <div>{t("footer.contributors.name.elma")}</div>
                  </a>
                </li>
                <li>
                  <a
                    href={t("footer.contributors.url.wei")}
                    className="flex justify-between mb-1 hover:text-teal-600"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div>{t("footer.contributors.position.fc")}</div>
                    <div>{t("footer.contributors.name.wei")}</div>
                  </a>
                </li>
                <li>
                  <a
                    href={t("footer.contributors.url.leon")}
                    className="flex justify-between mb-1 hover:text-teal-600"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div>{t("footer.contributors.position.db")}</div>
                    <div>{t("footer.contributors.name.leon")}</div>
                  </a>
                </li>
                <li>
                  <a
                    href={t("footer.contributors.url.leon")}
                    className="flex justify-between mb-1 hover:text-teal-600"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div>{t("footer.contributors.position.bd")}</div>
                    <div>{t("footer.contributors.name.leon")}</div>
                  </a>
                </li>
                <li>
                  <a
                    href={t("footer.contributors.url.leon")}
                    className="flex justify-between mb-1 hover:text-teal-600"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div>{t("footer.contributors.position.sd")}</div>
                    <div>{t("footer.contributors.name.leon")}</div>
                  </a>
                </li>
                <li>
                  <a
                    href={t("footer.contributors.url.yi")}
                    className="flex justify-between mb-1 hover:text-teal-600"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div>{t("footer.contributors.position.gd")}</div>
                    <div>{t("footer.contributors.name.yi")}</div>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="lg:w-1/2 w-full px-4">
            <h2 className="title-font font-medium tracking-widest text-xl mb-3">
              {t("footer.usefulLinks.title")}
            </h2>
            <div className="border border-slate-300"></div>
            <nav className="list-none mb-10">
              <li>
                <a href="/emotions" className="mb-1 hover:text-teal-600">
                  {t("nav.emotions")}
                </a>
              </li>
              <li>
                <a href="/report-issues" className="mb-1 hover:text-teal-600">
                  {t("footer.usefulLinks.list.report")}
                </a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-300 dark: text-gray-700 dark:bg-gray-900 dark:text-white">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col">
          <p className="text-center">
            © 2023 - {getCurrentYear()} {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
