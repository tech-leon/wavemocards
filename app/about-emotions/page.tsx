"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import happy from "@/app/assets/img/emotions/happy.svg";
import sadness from "@/app/assets/img/emotions/sadness.svg";
import fear from "@/app/assets/img/emotions/fear.svg";
import disgust from "@/app/assets/img/emotions/disgust.svg";
import anger from "@/app/assets/img/emotions/anger.svg";
import surprise from "@/app/assets/img/emotions/surprise.svg";
import Image from "next/image";

export default function AboutEmotions() {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col">
      <article className="flex flex-col max-w-7xl py-5 px-16 mx-auto">
        <h1 className="mb-4 mt-12">{t("pages.emotions.title.h1")}</h1>
        <div className="border border-slate-300"></div>
        <h2 className="mt-4">{t("pages.emotions.title.aboutEmotions")}</h2>
        <p>{t("pages.emotions.content.aboutEmotions")}</p>
        <h2 className="mt-4">{t("pages.emotions.title.6emotions")}</h2>
        <div className="flex flex-wrap justify-center items-center max-w-xl mx-auto lg:max-w-none">
          <div className="flex flex-col justify-center items-center m-5">
            <Image src={happy} alt="happy"></Image>
            <p>{t("pages.emotions.content.6emotions.happy")}</p>
          </div>
          <div className="flex flex-col justify-center items-center m-5">
            <Image src={sadness} alt="sadness"></Image>
            <p>{t("pages.emotions.content.6emotions.sadness")}</p>
          </div>
          <div className="flex flex-col justify-center items-center m-5">
            <Image src={fear} alt="fear"></Image>
            <p>{t("pages.emotions.content.6emotions.fear")}</p>
          </div>
          <div className="flex flex-col justify-center items-center m-5">
            <Image src={disgust} alt="disgust"></Image>
            <p>{t("pages.emotions.content.6emotions.disgust")}</p>
          </div>
          <div className="flex flex-col justify-center items-center m-5">
            <Image src={anger} alt="anger"></Image>
            <p>{t("pages.emotions.content.6emotions.anger")}</p>
          </div>
          <div className="flex flex-col justify-center items-center m-5">
            <Image src={surprise} alt="surprise"></Image>
            <p>{t("pages.emotions.content.6emotions.surprise")}</p>
          </div>
        </div>
        <p>{t("pages.emotions.content.6emotions.context")}</p>
        <h2 className="mt-4">{t("pages.emotions.title.emotionRange")}</h2>
        <p>{t("pages.emotions.content.emotionRange")}</p>
        <h2 className="mt-4">{t("pages.emotions.title.emotionsHealth")}</h2>
        <p>{t("pages.emotions.content.emotionsHealth")}</p>
        <div className="flex justify-end py-6">
          <a href={t("pages.emotions.refurl")} className="text-sm">
            {t("pages.emotions.reference")}
          </a>
        </div>
      </article>
    </section>
  );
}
