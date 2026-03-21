import { withAuth } from '@workos-inc/authkit-nextjs';
import {
  getEmotionCards,
  getEmotionCategories,
} from '@/lib/emotions';
import { ExploreCardsContent } from '@/app/explore/cards/ExploreCardsContent';

export const metadata = {
  title: '浪潮情緒卡｜探索情緒｜情緒卡',
  description: '瀏覽並選擇情緒卡，放入你的情緒卡夾。',
};

export default async function ExploreCardsPage() {
  await withAuth({ ensureSignedIn: true });

  const [categories, cards] = await Promise.all([
    getEmotionCategories(),
    getEmotionCards(),
  ]);

  return <ExploreCardsContent categories={categories} cards={cards} />;
}
