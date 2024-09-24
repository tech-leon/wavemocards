// import { useTranslation } from "react-i18next";
// import { useMemo } from "react";
// import { getEmotionRecords } from "@/lib/api";

export interface CardProps {
  name: string;
  description: string;
  example: string;
  ID: number;
  categoryID: string;
}

export interface CategoryProps {
  ID: number;
  name: string;
  color: string;
}

export const useCategoryData = (): CategoryProps[] => {
  return [];
  // useMemo(() => {}, []);
};
export const useCardData = (): CardProps[] => {
  return [];
  // useMemo(() => {}, []);
};
