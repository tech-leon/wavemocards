import React from "react";
import { useEmoFormContext } from "@/components/emoForm/formContext";
import { cn } from "@/lib/utils";
import { useCardData } from "@/lib/data/cardData";
import EmoCard from "@/components/emoCards/Card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const EmoFormStep2: React.FC = () => {
  const { t } = useTranslation(["translation", "cards", "category"]);
  const { emoFormData, updateEmoFormData } = useEmoFormContext();
  const cards = useCardData();
  const selectedCards = cards.filter((card) =>
    emoFormData.emotionCards.includes(card.ID)
  );

  const handleIntensityChange = (cardID: number, intensity: number) => {
    console.log(`更新卡片 ${cardID} 的強度為 ${intensity}`);
    const updatedIntensity = {
      ...emoFormData.emotionIntensity,
      [cardID]: intensity,
    };
    updateEmoFormData({ emotionIntensity: updatedIntensity });
  };

  return (
    <div className={cn("flex flex-col my-10")}>
      <div className={cn("flex px-20")}>
        <div className={cn("flex flex-col mt-4 space-y-4 basis-1/2")}>
          {selectedCards.map((card) => (
            <EmoCard
              key={card.ID}
              name={card.name}
              description={card.description}
              example={card.example}
              ID={card.ID}
              color={t(`category:${card.categoryID}.color`)}
              choosable={false}
            />
          ))}
        </div>
        <div
          className={cn("flex flex-col justify-between items-center basis-1/2")}
        >
          <h2>1 到 5 分的強度，1 為最弱 5 為最強</h2>
          {selectedCards.map((card) => (
            <div
              key={card.ID}
              className={cn(
                "flex basis-1/3 w-full items-center justify-between"
              )}
            >
              {[1, 2, 3, 4, 5].map((intensity) => (
                <Button
                  key={intensity}
                  size="iconLg"
                  variant={
                    emoFormData.emotionIntensity[card.ID] === intensity
                      ? "numberCircleActive"
                      : "numberCircle"
                  }
                  onClick={() => handleIntensityChange(card.ID, intensity)}
                >
                  {intensity}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
