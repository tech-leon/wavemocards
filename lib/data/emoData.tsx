import { useState, useEffect } from "react";
import { getEmotionLists } from "@/lib/api";
import { useTranslation } from "react-i18next";

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

export interface EmotionList {
  id: number;
  card1: number;
  card2: number;
  card3: number;
  after_card1_level: number;
  after_card2_level: number;
  after_card3_level: number;
  create: string;
}

export const useCategoryData = (): CategoryProps[] => {
  return [];
  // useMemo(() => {}, []);
};
export const useCardData = (): CardProps[] => {
  return [];
  // useMemo(() => {}, []);
};

export const useEmotionList = (userID: string | undefined) => {
  const { t } = useTranslation();
  const [emotionList, setEmotionList] = useState<EmotionList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!userID) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getEmotionLists(userID);

        const formattedData = data.map((item: EmotionList) => {
          return {
            id: item.id,
            cards: [
              { [t(`cards:${item?.card1}.name`)]: item?.after_card1_level },
              { [t(`cards:${item?.card2}.name`)]: item?.after_card2_level },
              { [t(`cards:${item?.card3}.name`)]: item?.after_card3_level },
            ],
            create: item?.create.split("T")[0],
          };
        });

        setEmotionList(formattedData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("未知錯誤"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userID, t]);

  return { emotionList, isLoading, error };
};
