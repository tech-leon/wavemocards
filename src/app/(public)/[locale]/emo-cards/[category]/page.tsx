import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { createPublicMetadata } from '@/lib/i18n/metadata';
import { getRequestLocale } from '@/lib/i18n/request';
import {
  getEmotionCategoryBySlug,
  getEmotionCardsByCategoryId,
  getEmotionCategories,
} from '@/lib/emotions';
import { DEFAULT_LOCALE } from '@/lib/i18n/locale';
import { CategoryCardsContent } from '@/app/emo-cards/[category]/CategoryCardsContent';

interface CategoryPageProps {
  params: Promise<{ locale: string; category: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const locale = await getRequestLocale();
  const t = await getTranslations({ locale, namespace: 'meta.emoCards.category' });
  const category = await getEmotionCategoryBySlug(slug, locale);
  const categoryName = category?.name || slug;

  return createPublicMetadata({
    pathname: `/emo-cards/${slug}`,
    title: t('title', { category: categoryName }),
    description: t('description', { category: categoryName }),
    keywords: [
      t('keywords.card'),
      categoryName,
      t('keywords.vocabulary'),
      t('keywords.category'),
    ],
    locale,
  });
}

export async function generateStaticParams() {
  const categories = await getEmotionCategories(DEFAULT_LOCALE);

  return categories.map((category) => ({
    category: category.slug,
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
