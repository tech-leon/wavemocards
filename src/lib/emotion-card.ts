import type { EmotionCardData } from '@/types/emotion-card';

interface EmotionCardLike {
  id: number;
  name: string;
  category_id: number;
  description?: string | null;
  example?: string | null;
  image_path?: string | null;
}

export function toEmotionCardData(
  card: EmotionCardLike,
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
