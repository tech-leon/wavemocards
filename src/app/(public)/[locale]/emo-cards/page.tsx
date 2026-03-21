import { Metadata } from 'next';
import { createPublicMetadata } from '@/lib/i18n/metadata';
import { getRequestLocale } from '@/lib/i18n/request';
import { getEmotionCategories, getEmotionCards } from '@/lib/emotions';
import { EmoCardsContent } from '@/app/emo-cards/EmoCardsContent';

export async function generateMetadata(): Promise<Metadata> {
  return createPublicMetadata({
    pathname: '/emo-cards',
    title: '浪潮情緒卡｜認識情緒｜情緒卡',
    description: '瀏覽 65 張情緒卡，了解各種情緒的意思和例句',
    keywords: ['情緒卡', '情緒詞彙', '情緒分類', '情緒教育'],
  });
}

export default async function EmoCardsPage() {
  const [categories, cards] = await Promise.all([
    getEmotionCategories(),
    getEmotionCards(),
  ]);
  const locale = await getRequestLocale();

  const cardsByCategory = new Map<number, typeof cards>();
  cards.forEach((card) => {
    const categoryId = card.category_id;
    if (!cardsByCategory.has(categoryId)) {
      cardsByCategory.set(categoryId, []);
    }
    cardsByCategory.get(categoryId)!.push(card);
  });

  const cardsByCategoryObj: Record<number, typeof cards> = {};
  cardsByCategory.forEach((value, key) => {
    cardsByCategoryObj[key] = value;
  });

  return (
    <EmoCardsContent
      categories={categories}
      cardsByCategoryObj={cardsByCategoryObj}
      locale={locale}
    />
  );
}
