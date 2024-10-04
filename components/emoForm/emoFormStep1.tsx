import React from 'react';
import { cn } from "@/lib/utils";
import { useCardData, useCategoryData } from "@/lib/data/cardData";
import CategorySection from "@/components/emoCards/CategorySection";
import { useTranslation } from 'react-i18next';


export const EmoFormStep1: React.FC = () => {  
  const { t } = useTranslation();
  const cards = useCardData();
  const categories = useCategoryData();

  if (!cards) {
    return <p>{t("loading")}</p>;
  }
  if (cards.length === 0) {
    return <p>No Cards</p>;
  }

  return (
    <div>
      <h2>選擇三張情緒卡</h2>
      <div className={cn("mt-4 space-y-4")}>
          {categories.map((category) => (
            <CategorySection
              key={category.ID}
              name={category.name}
              color={category.color}
              ID={category.ID}
              cards={cards
                .filter((card) => card.categoryID === String(category.ID))
                .map((card) => ({ ...card, color: category.color, choosable: true }))}
            />
          ))}
        </div>
    </div>
  );
};