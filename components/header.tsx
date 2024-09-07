"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import logo from "@/app/assets/img/logo/logo.png";
import { ModeToggle } from "@/components/mode-toggle";
import { LangToggle } from "@/components/lang-toggle";
// import { UserToggle } from "@/components/user-toggle";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  // ArrowPathIcon,
  Bars3Icon,
  // ChartPieIcon,
  // CursorArrowRaysIcon,
  // FingerPrintIcon,
  // SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 bg-gray-100 dark:bg-gray-800 dark:text-white shadow-md z-10">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-5 lg:px-8"
      >
        <div className="hidden lg:flex lg:gap-x-5 lg:w-68">
          <Link href="/">{t("nav.home")}</Link>
          <Link href="/about-emotions">{t("nav.emotions")}</Link>
          <Link href="/emotion-cards">{t("nav.emotioncards")}</Link>
        </div>
        <Link
          href="/"
          className="flex items-center justify-center hover:no-underline w-68"
        >
          <Image className="size-9" src={logo} alt="logo" />
          <div className="ml-3 md:text-3xl font-bold text-[#3c9daeff]">
            {t("nav.app")}
          </div>
        </Link>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:justify-end lg:w-68">
          <Link
            href="/login"
            className="flex w-16 items-center justify-center rounded-full hover:bg-gray-200"
          >
            {t("pages.login.login")}
          </Link>
          {/* <UserToggle /> */}
          <LangToggle />
          <ModeToggle />
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-1/2 overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 bg-gray-100 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <Image className="size-9" src={logo} alt="logo" />
              <span className="sr-only">Wave Emotion Cards</span>
            </a>
            <ModeToggle />
            <LangToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 dark:text-gray-200"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-10 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 text-gray-900 dark:text-gray-100">
              <div className="space-y-2 py-6">
                <Link
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
                >
                  {t("nav.home")}
                </Link>
                <Link
                  href="/about-emotions"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
                >
                  {t("nav.emotions")}
                </Link>
                <Link
                  href="/emotioncards"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
                >
                  {t("nav.emotioncards")}
                </Link>
              </div>
              <div className="py-6">
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50"
                >
                  {t("pages.login.login")}
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
