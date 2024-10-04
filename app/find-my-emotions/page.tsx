"use client";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { EmoFormProvider } from "@/components/emoForm/formContext";
import { MultiStepForm } from "@/components/emoForm/multiStep";

export default function FindMyEmotionsPage() {
  const { t } = useTranslation();

  return (
    <EmoFormProvider>
      <div className={cn("p-4 max-w-8xl px-16")}>
        <h1>{t("pages.findMyEmotions.title")}</h1>
        <div className={cn("border border-slate-300")}></div>
        <p className={cn("text-lg mb-6")}>
          {t("pages.findMyEmotions.subtitle")}
        </p>
        <MultiStepForm />
      </div>
    </EmoFormProvider>
  );
}
