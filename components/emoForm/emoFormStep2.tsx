import React from "react";
import { useEmoFormContext } from "@/components/emoForm/formContext";
import { cn } from "@/lib/utils";
import { useCardData } from "@/lib/data/cardData";
import EmoCard from "@/components/emoCards/Card";
// import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

export const EmoFormStep2: React.FC = () => {
  const { t } = useTranslation(['translation', 'cards', 'category']);
  const { emoFormData } = useEmoFormContext();
  const cards = useCardData();
  const selectedCards = cards.filter((card) => emoFormData.emotionCards.includes(card.ID));

  console.log(selectedCards);

  return (
    <div>
      <h2>選擇三張情緒卡</h2>
      <div className={cn("mt-4 space-y-4")}>
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
    </div>
  );
};
