import type { Metadata } from 'next';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { getTranslations } from 'next-intl/server';
import { getRequestLocale } from '@/lib/i18n/request';
import {
  getEmotionCards,
  getEmotionCategories,
} from '@/lib/emotions';
import { ExploreCardsContent } from '@/app/explore/cards/ExploreCardsContent';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.explore.cards');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ExploreCardsPage() {
  await withAuth({ ensureSignedIn: true });
  const locale = await getRequestLocale();

  const [categories, cards] = await Promise.all([
    getEmotionCategories(locale),
    getEmotionCards(locale),
  ]);

  return <ExploreCardsContent categories={categories} cards={cards} />;
}
