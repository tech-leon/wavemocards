import { withAuth } from '@workos-inc/authkit-nextjs';
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
  return {
    title: `浪潮情緒卡｜探索情緒｜${name}`,
    description: `瀏覽${name}類情緒卡，選擇放入你的情緒卡夾。`,
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
