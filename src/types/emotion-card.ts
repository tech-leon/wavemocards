export interface EmotionCardData {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
  description?: string;
  example?: string;
  imagePath?: string;
}

export interface EmotionCardAction {
  kind: 'add' | 'remove' | 'added';
  onClick?: () => void;
  label: string;
}
