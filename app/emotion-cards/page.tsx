'use client'
import { useTranslation } from "react-i18next";
import EmoCard from "@/components/emoCards/card";

export default function EmotionCardsPage() {
  const { t } = useTranslation(['translation', 'cards', 'category']);
  
  const cardIds = Array.from({ length: 65 }, (_, i) => i + 1);

  return (
    <div>
      <h1>{t("pages.emotionCards.title")}</h1>
      {cardIds.map(id => (
        <div key={id} className="flex">
          <EmoCard 
            ID={id} 
            name={t(`cards:${id}.name`)} 
            color={t(`category:${t(`cards:${id}.categoryID`)}.color`)} 
            description={t(`cards:${id}.description`)} 
            example={t(`cards:${id}.example`)} 
          />
          {/* <h2>{t(`cards:${id}.name`)}</h2>
          <p>{t(`category:${t(`cards:${id}.categoryID`)}.name`)}</p>
          <p>{t(`category:${t(`cards:${id}.categoryID`)}.color`)}</p>
          <p>{t(`cards:${id}.description`)}</p>
          <p>{t(`cards:${id}.example`)}</p> */}
        </div>
      ))}
    </div>
  );
}