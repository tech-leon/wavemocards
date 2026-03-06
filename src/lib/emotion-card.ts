import type { EmotionCard } from '@/lib/emotions';
import type { EmotionCardData } from '@/types/emotion-card';

export function toEmotionCardData(
  card: EmotionCard,
  categoryName: string
): EmotionCardData {
  return {
    id: card.id,
    name: card.name,
    categoryId: card.category_id,
    categoryName,
    description: card.description || undefined,
    example: card.example || undefined,
    imagePath: card.image_path || undefined,
  };
}
