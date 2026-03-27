import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createPublicMetadata } from '@/lib/i18n/metadata';
import { getRequestLocale } from '@/lib/i18n/request';
import {
  getEmotionCategoryBySlug,
  getEmotionCardsByCategoryId,
  categoryNames,
} from '@/lib/emotions';
import { CategoryCardsContent } from '@/app/emo-cards/[category]/CategoryCardsContent';

interface CategoryPageProps {
  params: Promise<{ locale: string; category: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const categoryName = categoryNames[slug] || slug;

  return createPublicMetadata({
    pathname: `/emo-cards/${slug}`,
    title: `浪潮情緒卡｜認識情緒｜${categoryName}`,
    description: `瀏覽${categoryName}類的情緒卡，了解各種${categoryName}情緒的意思和例句`,
    keywords: ['情緒卡', categoryName, '情緒詞彙', '情緒分類'],
  });
}

export async function generateStaticParams() {
  return Object.keys(categoryNames).map((slug) => ({
    category: slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const locale = await getRequestLocale();
  const category = await getEmotionCategoryBySlug(slug, locale);

  if (!category) {
    notFound();
  }

  const cards = await getEmotionCardsByCategoryId(category.id, locale);

  return (
    <CategoryCardsContent
      category={category}
      cards={cards}
      locale={locale}
    />
  );
}
