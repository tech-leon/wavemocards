'use client'
import { useTranslation } from "react-i18next";

export default function ProfilePage() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("userPage.title")}</h1>
    </div>
  );
}