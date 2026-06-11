import type { EmotionCardData } from '@/types/emotion-card';

/** Canonical display order of the nine emotion categories. */
export const emotionCategoryOrder = [
  'happy',
  'expectation',
  'relieved',
  'unstable',
  'amazed',
  'sadness',
  'hate',
  'anger',
  'others',
] as const;

/**
 * Emotion category base colors as literal values, for SVG/chart libraries
 * that cannot resolve CSS variables (e.g. Recharts attributes).
 * Must stay in sync with the `--color-{slug}` tokens in src/app/globals.css.
 */
export const emotionCategoryColors: Record<string, string> = {
  happy: '#FFE589',
  expectation: '#F8C18F',
  relieved: '#CEE5AF',
  unstable: '#E0CACA',
  amazed: '#B4B9E7',
  sadness: '#C5DDE8',
  hate: '#D6CAC0',
  anger: '#E0AEAE',
  others: '#EBEBEB',
};

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
    hoverBorder: 'hover:border-happy-dark',
    border: 'border-happy-dark',
  },
  expectation: {
    bg: 'bg-expectation',
    hoverBorder: 'hover:border-expectation-dark',
    border: 'border-expectation-dark',
  },
  relieved: {
    bg: 'bg-relieved',
    hoverBorder: 'hover:border-relieved-dark',
    border: 'border-relieved-dark',
  },
  unstable: {
    bg: 'bg-unstable',
    hoverBorder: 'hover:border-unstable-dark',
    border: 'border-unstable-dark',
  },
  amazed: {
    bg: 'bg-amazed',
    hoverBorder: 'hover:border-amazed-dark',
    border: 'border-amazed-dark',
  },
  sadness: {
    bg: 'bg-sadness',
    hoverBorder: 'hover:border-sadness-dark',
    border: 'border-sadness-dark',
  },
  hate: {
    bg: 'bg-hate',
    hoverBorder: 'hover:border-hate-dark',
    border: 'border-hate-dark',
  },
  anger: {
    bg: 'bg-anger',
    hoverBorder: 'hover:border-anger-dark',
    border: 'border-anger-dark',
  },
  others: {
    bg: 'bg-others',
    hoverBorder: 'hover:border-others-dark',
    border: 'border-others-dark',
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
 * Category button colors (70% opacity base + full opacity on hover).
 */
export const categoryBtnColors: Record<string, string> = {
  happy: 'bg-happy/70 hover:bg-happy',
  expectation: 'bg-expectation/70 hover:bg-expectation',
  relieved: 'bg-relieved/70 hover:bg-relieved',
  unstable: 'bg-unstable/70 hover:bg-unstable',
  amazed: 'bg-amazed/70 hover:bg-amazed',
  sadness: 'bg-sadness/70 hover:bg-sadness',
  hate: 'bg-hate/70 hover:bg-hate',
  anger: 'bg-anger/70 hover:bg-anger',
  others: 'bg-others/70 hover:bg-others',
};
