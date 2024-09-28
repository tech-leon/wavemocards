'use client'
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useTranslation } from "react-i18next";
import { useEmotionList } from "@/lib/data/emoData";


export default function RecordsPage() {
  const { t } = useTranslation();
  const userDataString = typeof window !== 'undefined' ? localStorage.getItem("authUser") : null;
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const { emotionList, isLoading, error } = useEmotionList(userData?.uid);

  if (isLoading) {
    return <div>正在加載數據...</div>;
  }

  if (error) {
    return <div>加載數據時出錯: {error.message}</div>;
  }

  return (
    <div className="p-4 max-w-8xl px-16">
      <h1 className="text-3xl font-bold mb-6 ">{t("pages.myRecord.title")}</h1>
      <div className="border border-slate-300"></div>
      <div className="min-h-min">
        <DataTable columns={columns} data={emotionList} />
      </div>
    </div>
  );
}
