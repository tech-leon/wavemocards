import type { EmotionCardData } from '@/types/emotion-card';

const defaultCategoryStyle = {
  bg: 'bg-gray-200',
  hoverBorder: 'hover:border-gray-400',
  border: 'border-gray-400',
};

export const emotionCardCategoryStyles: Record<
  string,
  { bg: string; hoverBorder: string; border: string }
> = {
  happy: {
    bg: 'bg-happy',
    hoverBorder: 'hover:border-[#EBD175]',
    border: 'border-[#EBD175]',
  },
  expectation: {
    bg: 'bg-expectation',
    hoverBorder: 'hover:border-[#EAB27E]',
    border: 'border-[#EAB27E]',
  },
  relieved: {
    bg: 'bg-relived',
    hoverBorder: 'hover:border-[#B0CC8B]',
    border: 'border-[#B0CC8B]',
  },
  unstable: {
    bg: 'bg-unstable',
    hoverBorder: 'hover:border-[#D7B3B3]',
    border: 'border-[#D7B3B3]',
  },
  amazed: {
    bg: 'bg-amazed',
    hoverBorder: 'hover:border-[#969DD7]',
    border: 'border-[#969DD7]',
  },
  sadness: {
    bg: 'bg-sadness',
    hoverBorder: 'hover:border-[#A2C5D6]',
    border: 'border-[#A2C5D6]',
  },
  hate: {
    bg: 'bg-hate',
    hoverBorder: 'hover:border-[#C1B1A4]',
    border: 'border-[#C1B1A4]',
  },
  anger: {
    bg: 'bg-anger',
    hoverBorder: 'hover:border-[#D19292]',
    border: 'border-[#D19292]',
  },
  others: {
    bg: 'bg-others',
    hoverBorder: 'hover:border-[#CBCBCB]',
    border: 'border-[#CBCBCB]',
  },
};

export function getEmotionCardCategoryStyle(categorySlug: string) {
  return emotionCardCategoryStyles[categorySlug] || defaultCategoryStyle;
}

export function formatEmotionCardName(name: string) {
  return name.length === 2 ? `${name[0]}\u00A0${name[1]}` : name;
}

export function getEmotionCardImageSrc(card: Pick<EmotionCardData, 'id' | 'imagePath'>) {
  return card.imagePath || `/images/emoCards/${card.id}.svg`;
}

/**
 * Category representative card IDs for folded view.
 */
export const categoryRepCards: Record<string, number> = {
  happy: 2,
  expectation: 8,
  relieved: 15,
  unstable: 21,
  amazed: 26,
  sadness: 34,
  hate: 44,
  anger: 51,
  others: 55,
};

/**
 * Category button colors (70% opacity base + full opacity on hover).
 */
export const categoryBtnColors: Record<string, string> = {
  happy: 'bg-happy/70 hover:bg-happy',
  expectation: 'bg-expectation/70 hover:bg-expectation',
  relieved: 'bg-relived/70 hover:bg-relived',
  unstable: 'bg-unstable/70 hover:bg-unstable',
  amazed: 'bg-amazed/70 hover:bg-amazed',
  sadness: 'bg-sadness/70 hover:bg-sadness',
  hate: 'bg-hate/70 hover:bg-hate',
  anger: 'bg-anger/70 hover:bg-anger',
  others: 'bg-others/70 hover:bg-others',
};
