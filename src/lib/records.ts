import type { Locale } from '@/lib/i18n/locale';
import type { EmotionCard, EmotionCategory } from '@/lib/emotions';
import { getEmotionCardMap, getEmotionCategoryMap } from '@/lib/emotions';

type CardMap = Map<number, EmotionCard>;
type CategoryMaps = {
  byId: Map<number, EmotionCategory>;
  bySlug: Map<string, EmotionCategory>;
};

interface RawCategoryInfo {
  id: number;
  name?: string | null;
  slug?: string | null;
}

interface RawCardInfo {
  id: number;
  name?: string | null;
  category_id: number;
  description?: string | null;
  image_path?: string | null;
  category?: RawCategoryInfo | null;
}

interface RawRecordWithCards {
  card_1?: RawCardInfo | null;
  card_2?: RawCardInfo | null;
  card_3?: RawCardInfo | null;
}

export interface LocalizedCategoryInfo {
  id: number;
  name: string;
  slug: string;
}

export interface LocalizedCardInfo {
  id: number;
  name: string;
  category_id: number;
  description?: string | null;
  image_path?: string | null;
  category?: LocalizedCategoryInfo | null;
}

export interface LocalizedRecordItem extends RawRecordWithCards {
  card_1?: LocalizedCardInfo | null;
  card_2?: LocalizedCardInfo | null;
  card_3?: LocalizedCardInfo | null;
}

async function buildLocalizationMaps(locale: Locale) {
  const [cardMap, categoryMaps] = await Promise.all([
    getEmotionCardMap(locale),
    getEmotionCategoryMap(locale),
  ]);
  return { cardMap, categoryMaps };
}

function localizeCard(
  card: RawCardInfo | null | undefined,
  cardMap: CardMap,
  categoryMaps: CategoryMaps,
): LocalizedCardInfo | null {
  if (!card) {
    return null;
  }

  const localizedCard = cardMap.get(card.id);
  const localizedCategory =
    (card.category?.slug
      ? categoryMaps.bySlug.get(card.category.slug)
      : undefined) ??
    categoryMaps.byId.get(card.category?.id ?? card.category_id);

  return {
    ...card,
    name: localizedCard?.name ?? card.name ?? '',
    category: card.category
      ? {
          id: card.category.id,
          slug: localizedCategory?.slug ?? card.category.slug ?? '',
          name: localizedCategory?.name ?? card.category.name ?? '',
        }
      : localizedCategory
        ? {
            id: localizedCategory.id,
            slug: localizedCategory.slug,
            name: localizedCategory.name,
          }
        : null,
  };
}

export async function localizeRecord(
  record: RawRecordWithCards,
  locale: Locale,
): Promise<LocalizedRecordItem> {
  const { cardMap, categoryMaps } = await buildLocalizationMaps(locale);

  return {
    ...record,
    card_1: localizeCard(record.card_1, cardMap, categoryMaps),
    card_2: localizeCard(record.card_2, cardMap, categoryMaps),
    card_3: localizeCard(record.card_3, cardMap, categoryMaps),
  };
}

export async function localizeRecordCollection<T extends RawRecordWithCards>(
  records: T[],
  locale: Locale,
): Promise<Array<T & LocalizedRecordItem>> {
  const { cardMap, categoryMaps } = await buildLocalizationMaps(locale);

  return records.map((record) => ({
    ...record,
    card_1: localizeCard(record.card_1, cardMap, categoryMaps),
    card_2: localizeCard(record.card_2, cardMap, categoryMaps),
    card_3: localizeCard(record.card_3, cardMap, categoryMaps),
  }));
}
