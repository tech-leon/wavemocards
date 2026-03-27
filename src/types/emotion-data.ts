export interface LocalizedEmotionCategoryRecord {
  id: number;
  slug: string;
  name: string;
  displayOrder: number;
}

export interface LocalizedEmotionCardRecord {
  id: number;
  slug: string;
  categoryId: number;
  name: string;
  description: string;
  example: string;
  imagePath: string;
}
