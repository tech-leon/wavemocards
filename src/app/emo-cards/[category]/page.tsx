import { redirect } from 'next/navigation';
import { DEFAULT_LOCALE, localizeHref } from '@/lib/i18n/locale';

interface CategoryPageRedirectProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPageRedirect({
  params,
}: CategoryPageRedirectProps) {
  const { category } = await params;

  redirect(localizeHref(`/emo-cards/${category}`, DEFAULT_LOCALE));
}
