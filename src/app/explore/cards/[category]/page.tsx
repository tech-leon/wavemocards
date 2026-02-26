import { withAuth } from '@workos-inc/authkit-nextjs';
import { notFound } from 'next/navigation';
import { redirectToSignIn } from '@/lib/auth';
import {
  getEmotionCardsByCategoryId,
  getEmotionCategoryBySlug,
  categoryNames,
} from '@/lib/emotions';
import { ExploreCategoryCardsContent } from './ExploreCategoryCardsContent';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const name = categoryNames[category] || category;
  return {
    title: `浪潮情緒卡｜探索情緒｜${name}`,
    description: `瀏覽${name}類情緒卡，選擇放入你的情緒卡夾。`,
  };
}

export default async function ExploreCategoryPage({ params }: PageProps) {
  const { category } = await params;

  let user = null;
  try {
    const auth = await withAuth();
    user = auth.user;
  } catch {
    // not authenticated
  }

  if (!user) {
    await redirectToSignIn();
  }

  const categoryData = await getEmotionCategoryBySlug(category);
  if (!categoryData) {
    notFound();
  }

  const cards = await getEmotionCardsByCategoryId(categoryData.id);

  return (
    <ExploreCategoryCardsContent
      category={categoryData}
      cards={cards}
    />
  );
}
