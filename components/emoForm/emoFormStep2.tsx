import React from 'react';
import { useEmoFormContext } from '@/components/emoForm/formContext';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const emotionCards = ['快樂', '悲傷', '憤怒', '驚訝', '恐懼', '厭惡'];

export const EmoFormStep2: React.FC = () => {  
  const { t } = useTranslation();
  const { emoFormData, updateEmoFormData } = useEmoFormContext();

  const handleCardSelection = (card: number) => {
    const updatedCards = emoFormData.emotionCards.includes(card)
      ? emoFormData.emotionCards.filter((c: number) => c !== card)
      : [...emoFormData.emotionCards, card].slice(0, 3);
    updateEmoFormData({ emotionCards: updatedCards });
  };
  
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
          
        </div>
    </div>
  );
};