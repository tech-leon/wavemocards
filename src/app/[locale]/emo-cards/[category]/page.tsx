import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PUBLIC_LOCALES, isPublicLocale } from '@/lib/i18n/locale';
import CategoryPage, {
  generateMetadata as generateBaseMetadata,
  generateStaticParams as generateBaseStaticParams,
} from '../../../emo-cards/[category]/page';

interface LocalizedCategoryPageProps {
  params: Promise<{ locale: string; category: string }>;
}

export async function generateMetadata({
  params,
}: LocalizedCategoryPageProps): Promise<Metadata> {
  const { locale, category } = await params;

  if (!isPublicLocale(locale)) {
    notFound();
  }

  return generateBaseMetadata({
    params: Promise.resolve({ category }),
  });
}

export async function generateStaticParams() {
  const baseParams = await generateBaseStaticParams();

  return PUBLIC_LOCALES.flatMap((locale) =>
    baseParams.map(({ category }) => ({ locale, category }))
  );
}

export default CategoryPage;
