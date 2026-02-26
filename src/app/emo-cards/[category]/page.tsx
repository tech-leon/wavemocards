import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getEmotionCategoryBySlug,
  getEmotionCardsByCategoryId,
  categoryNames,
} from '@/lib/emotions';
import { CategoryCardsContent } from './CategoryCardsContent';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const categoryName = categoryNames[slug] || slug;

  return {
    title: `浪潮情緒卡｜認識情緒｜${categoryName}`,
    description: `瀏覽${categoryName}類的情緒卡，了解各種${categoryName}情緒的意思和例句`,
    keywords: ['情緒卡', categoryName, '情緒詞彙', '情緒分類'],
  };
}

// Generate static params for all categories
export async function generateStaticParams() {
  return Object.keys(categoryNames).map((slug) => ({
    category: slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;

  // Get category data
  const category = await getEmotionCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  // Get cards for this category
  const cards = await getEmotionCardsByCategoryId(category.id);

  return (
    <CategoryCardsContent
      category={category}
      cards={cards}
    />
  );
}
