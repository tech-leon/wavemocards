import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { createPublicMetadata } from '@/lib/i18n/metadata';
import { getRequestLocale } from '@/lib/i18n/request';
import { getEmotionCategories, getEmotionCards } from '@/lib/emotions';
import { EmoCardsContent } from '@/app/emo-cards/EmoCardsContent';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const t = await getTranslations({ locale, namespace: 'meta.emoCards' });

  return createPublicMetadata({
    pathname: '/emo-cards',
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords') as string[],
  });
}

export default async function EmoCardsPage() {
  const locale = await getRequestLocale();
  const [categories, cards] = await Promise.all([
    getEmotionCategories(locale),
    getEmotionCards(locale),
  ]);

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
