'use client'
// import { useState, useEffect } from 'react';
import { columns } from "./columns";
import { DataTable } from "./data-table";
// import { useTranslation } from "react-i18next";
import { useEmotionList } from "@/lib/data/emoData";


export default function RecordsPage() {
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
    <div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={emotionList} />
      </div>
    </div>
  );
}
