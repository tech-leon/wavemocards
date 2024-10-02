import React from 'react';
import { useEmoFormContext } from '@/components/emoForm/formContext';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { useCardData, useCategoryData } from "@/lib/data/cardData";
import CategorySection from "@/components/emoCards/CategorySection";
import { useTranslation } from 'react-i18next';

const emotionCards = ['快樂', '悲傷', '憤怒', '驚訝', '恐懼', '厭惡'];

export const EmoFormStep1: React.FC = () => {  
  const { t } = useTranslation();
  const { emoFormData, updateEmoFormData } = useEmoFormContext();
  const cards = useCardData();
  const categories = useCategoryData();

  const handleCardSelection = (card: number) => {
    const updatedCards = emoFormData.emotionCards.includes(card)
      ? emoFormData.emotionCards.filter((c: number) => c !== card)
      : [...emoFormData.emotionCards, card].slice(0, 3);
    updateEmoFormData({ emotionCards: updatedCards });
  };

  if (!cards) {
    return <p>{t("loading")}</p>;
  }
  if (cards.length === 0) {
    return <p>No Cards</p>;
  }

  return (
    <div>
      <h2>選擇三張情緒卡</h2>
      <div className="grid grid-cols-3 gap-4">
        {emotionCards.map(card => (
          <Button
            key={card}
            onClick={() => handleCardSelection(Number(card))}
            variant={emoFormData.emotionCards.includes(Number(card)) ? 'default' : 'outline'}
          >
            {card}
          </Button>
        ))}
      </div>
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