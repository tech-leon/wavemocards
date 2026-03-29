import categoriesEn from '@/data/cards/categories.en.json';
import categoriesJa from '@/data/cards/categories.ja.json';
import categoriesZhTW from '@/data/cards/categories.zh-TW.json';
import cardsEn from '@/data/cards/cards.en.json';
import cardsJa from '@/data/cards/cards.ja.json';
import cardsZhTW from '@/data/cards/cards.zh-TW.json';
import type {
  LocalizedEmotionCardRecord,
  LocalizedEmotionCategoryRecord,
} from '@/types/emotion-data';
import type { Locale } from '@/lib/i18n/locale';
import { createAnonClient } from './supabase';

// Types - simplified interfaces for the app
export interface EmotionCategory {
  id: number;
  name: string;
  slug: string;
  display_order: number;
}

export interface EmotionCard {
  id: number;
  slug: string;
  category_id: number;
  name: string;
  description?: string | null;
  example?: string | null;
  image_path?: string | null;
}

export interface AboutEmotion {
  id: number;
  key: string;
  title: string;
  content: string;
  display_order: number;
}

const localizedCategories = {
  'zh-TW': categoriesZhTW,
  en: categoriesEn,
  ja: categoriesJa,
} satisfies Record<Locale, LocalizedEmotionCategoryRecord[]>;

const localizedCards = {
  'zh-TW': cardsZhTW,
  en: cardsEn,
  ja: cardsJa,
} satisfies Record<Locale, LocalizedEmotionCardRecord[]>;

function withFallbackText<T extends { id: number }>(
  records: T[],
  baselineRecords: T[],
  textFields: Array<keyof T>,
): T[] {
  const baselineById = new Map(baselineRecords.map((record) => [record.id, record]));

  return records.map((record) => {
    const baseline = baselineById.get(record.id);
    if (!baseline) {
      return record;
    }

    const mergedRecord = { ...record };

    for (const field of textFields) {
      const value = mergedRecord[field];
      if (typeof value === 'string' && value.trim().length > 0) {
        continue;
      }

      mergedRecord[field] = baseline[field];
    }

    return mergedRecord;
  });
}

function getLocalizedCategoryRecords(locale: Locale): LocalizedEmotionCategoryRecord[] {
  const records = localizedCategories[locale] ?? localizedCategories['zh-TW'];

  if (locale === 'zh-TW') {
    return records;
  }

  return withFallbackText(records, localizedCategories['zh-TW'], ['name']);
}

function getLocalizedCardRecords(locale: Locale): LocalizedEmotionCardRecord[] {
  const records = localizedCards[locale] ?? localizedCards['zh-TW'];

  if (locale === 'zh-TW') {
    return records;
  }

  return withFallbackText(records, localizedCards['zh-TW'], [
    'name',
    'description',
    'example',
  ]);
}

function toEmotionCategory(
  record: LocalizedEmotionCategoryRecord,
): EmotionCategory {
  return {
    id: record.id,
    slug: record.slug,
    name: record.name,
    display_order: record.displayOrder,
  };
}

function toEmotionCard(record: LocalizedEmotionCardRecord): EmotionCard {
  return {
    id: record.id,
    slug: record.slug,
    category_id: record.categoryId,
    name: record.name,
    description: record.description,
    example: record.example,
    image_path: record.imagePath,
  };
}

export const categoryNames: Record<string, string> = Object.fromEntries(
  localizedCategories['zh-TW'].map((category) => [category.slug, category.name]),
);

/** Maximum number of emotion cards that can be selected in the Explore flow. */
export const MAX_SELECTED_CARDS = 3;

// Category slug to representative card ID mapping (for display)
export const categoryRepresentativeCards: Record<string, number> = {
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

// Fallback about emotions data
const fallbackAboutEmotions: AboutEmotion[] = [
  { id: 1, key: 'whatIsEmotion', title: '什麼是情緒？', content: '情緒英文是emotion，代表流動在我們身體的能量。當我們受到刺激，引發出內心感受、身體反應、想法與行動，就是情緒。例如某人踏進後巷時，遇到一隻看來很兇惡的狗（刺激），覺得十分害怕，擔心自己被咬傷（內心感受和想法），不禁心跳加速和顫抖（身體反應），最終決定急步繞路離開（行動）。', display_order: 1 },
  { id: 2, key: '6BasicEmotions', title: '六種基本情緒', content: '博物學家達爾文提及過人類有六種基本情緒，包括快樂（happiness）、悲傷（sadness）、恐懼（fear）、厭惡（disgust）、憤怒（anger）和驚訝（surprise），屬於有助人類提高生存機會的本能情緒。其他複雜情緒如興奮、委屈、自卑、妒忌、內疚、寂寞等，則是由基本情緒混合衍生而成，並且經過學習與社會化之後產生。', display_order: 2 },
  { id: 3, key: 'goodOrBad', title: '情緒有好壞之分嗎？', content: '一般人習慣將情緒分為正負面，覺得快樂屬於正面情緒，悲傷、憤怒、恐懼則對人有害。其實情緒無分好與壞，每一種情緒都有其獨特意義。例如對於陌生環境感到恐懼不安，反映著對安全感的渴求，提醒我們遠離危險。悲傷時脆弱流淚，則可吸引關顧與扶持，促進人際聯繫。', display_order: 3 },
  { id: 4, key: 'healthyEmotion', title: '什麼是情緒健康？', content: '假如對情緒存在偏見，否定和壓抑自己的真正感覺，明明傷心卻扮開心，明明生氣卻默默忍受，很容易令身心健康出現問題。所謂情緒健康，不代表要時刻保持愉快心情，而是要有能力覺察自己的不同情緒，了解內心需要，並以健康恰當的方式去表達和調適，讓心靈回復平靜。', display_order: 4 },
];

/**
 * Get all emotion categories
 */
export async function getEmotionCategories(
  locale: Locale = 'zh-TW',
): Promise<EmotionCategory[]> {
  return getLocalizedCategoryRecords(locale).map(toEmotionCategory);
}

export async function getEmotionCategoryMap(
  locale: Locale = 'zh-TW',
): Promise<{
  byId: Map<number, EmotionCategory>;
  bySlug: Map<string, EmotionCategory>;
}> {
  const categories = await getEmotionCategories(locale);

  return {
    byId: new Map(categories.map((category) => [category.id, category])),
    bySlug: new Map(categories.map((category) => [category.slug, category])),
  };
}

/**
 * Get emotion category by slug
 */
export async function getEmotionCategoryBySlug(
  slug: string,
  locale: Locale = 'zh-TW',
): Promise<EmotionCategory | null> {
  return (
    getLocalizedCategoryRecords(locale)
      .map(toEmotionCategory)
      .find((category) => category.slug === slug) ?? null
  );
}

/**
 * Get all emotion cards
 */
export async function getEmotionCards(
  locale: Locale = 'zh-TW',
): Promise<EmotionCard[]> {
  return getLocalizedCardRecords(locale).map(toEmotionCard);
}

export async function getEmotionCardMap(
  locale: Locale = 'zh-TW',
): Promise<Map<number, EmotionCard>> {
  const cards = await getEmotionCards(locale);
  return new Map(cards.map((card) => [card.id, card]));
}

/**
 * Get emotion cards by category ID
 */
export async function getEmotionCardsByCategoryId(
  categoryId: number,
  locale: Locale = 'zh-TW',
): Promise<EmotionCard[]> {
  return getLocalizedCardRecords(locale)
    .filter((card) => card.categoryId === categoryId)
    .map(toEmotionCard);
}

/**
 * Get emotion cards grouped by category
 */
export async function getEmotionCardsGroupedByCategory(
  locale: Locale = 'zh-TW',
): Promise<Map<number, EmotionCard[]>> {
  const cards = await getEmotionCards(locale);
  const grouped = new Map<number, EmotionCard[]>();
  
  cards.forEach(card => {
    const categoryId = card.category_id;
    if (!grouped.has(categoryId)) {
      grouped.set(categoryId, []);
    }
    grouped.get(categoryId)!.push(card);
  });
  
  return grouped;
}

/**
 * Get about emotions content
 */
export async function getAboutEmotions(): Promise<AboutEmotion[]> {
  const supabase = createAnonClient();
  
  if (!supabase) {
    console.warn('Supabase not configured, using fallback data');
    return fallbackAboutEmotions;
  }
  
  const { data, error } = await supabase
    .from('about_emotions')
    .select('*')
    .order('display_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching about emotions:', error);
    return fallbackAboutEmotions;
  }
  
  return data || fallbackAboutEmotions;
}

/**
 * Get about emotion by key
 */
export async function getAboutEmotionByKey(key: string): Promise<AboutEmotion | null> {
  const supabase = createAnonClient();
  
  if (!supabase) {
    console.warn('Supabase not configured, using fallback data');
    return fallbackAboutEmotions.find(e => e.key === key) || null;
  }
  
  const { data, error } = await supabase
    .from('about_emotions')
    .select('*')
    .eq('key', key)
    .single();
  
  if (error) {
    console.error('Error fetching about emotion:', error);
    return fallbackAboutEmotions.find(e => e.key === key) || null;
  }
  
  return data;
}

/**
 * Get emotion card by ID
 */
export async function getEmotionCardById(
  id: number,
  locale: Locale = 'zh-TW',
): Promise<EmotionCard | null> {
  return (
    getLocalizedCardRecords(locale)
      .map(toEmotionCard)
      .find((card) => card.id === id) ?? null
  );
}
