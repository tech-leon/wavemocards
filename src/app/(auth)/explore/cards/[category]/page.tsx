import { withAuth } from '@workos-inc/authkit-nextjs';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getRequestLocale } from '@/lib/i18n/request';
import {
  getEmotionCardsByCategoryId,
  getEmotionCategoryBySlug,
} from '@/lib/emotions';
import { ExploreCategoryCardsContent } from '@/app/explore/cards/[category]/ExploreCategoryCardsContent';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const locale = await getRequestLocale();
  const categoryData = await getEmotionCategoryBySlug(category, locale);
  const name = categoryData?.name || category;
  const t = await getTranslations('meta.explore.category');
  return {
    title: t('title', { category: name }),
    description: t('description', { category: name }),
  };
}

export default async function ExploreCategoryPage({ params }: PageProps) {
  const { category } = await params;
  await withAuth({ ensureSignedIn: true });
  const locale = await getRequestLocale();

  const categoryData = await getEmotionCategoryBySlug(category, locale);
  if (!categoryData) {
    notFound();
  }

  const cards = await getEmotionCardsByCategoryId(categoryData.id, locale);

  return (
    <ExploreCategoryCardsContent
      category={categoryData}
      cards={cards}
    />
  );
}
