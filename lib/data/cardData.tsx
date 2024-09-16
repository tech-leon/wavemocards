import { useTranslation } from "react-i18next";
import { useMemo } from "react";

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
  const { t } = useTranslation(["translation", "cards", "category"]);

  return useMemo(() => {
    return Array.from({ length: 9 }, (_, i) => ({
      ID: i + 1,
      name: t(`category:${i + 1}.name`),
      color: t(`category:${i + 1}.color`),
    }));
  }, [t]);
};
export const useCardData = (): CardProps[] => {
  const { t } = useTranslation(["translation", "cards", "category"]);

  return useMemo(() => {
    return Array.from({ length: 65 }, (_, i) => ({
      name: t(`cards:${i + 1}.name`),
      description: t(`cards:${i + 1}.description`),
      example: t(`cards:${i + 1}.example`),
      ID: i + 1,
      categoryID: t(`cards:${i + 1}.categoryID`),
    }));
  }, [t]);
};