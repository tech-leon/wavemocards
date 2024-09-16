'use client'
import { useTranslation } from "react-i18next";
import { useCardData, useCategoryData } from "@/lib/data/cardData";
import CategorySection from "../../components/emoCards/CategorySection";

export default function EmotionCardsPage() {
  const { t } = useTranslation(['translation', 'cards', 'category']);
  const cards = useCardData();
  const categories = useCategoryData();

  if (!cards) {
    return <p>{t('loading')}</p>;
  }
  if (cards.length === 0) {
    return <p>No Cards</p>;
  }

  return (
    <div className="p-4 min-h-screen max-w-8xl px-16">
      <h1 className="text-3xl font-bold mb-6 ">{t("pages.emotionCards.title")}</h1>
      <div className="border border-slate-300"></div>
      <div className="mt-4 space-y-4">
        {categories.map(category => (
          <CategorySection
            key={category.ID}
            name={category.name}
            color={category.color}
            ID={category.ID}
            cards={cards.filter(card => card.categoryID === String(category.ID))
              .map(card => ({ ...card, color: category.color }))}
          />
        ))}
      </div>
    </div>
  );
}