import type { Locale } from '@/lib/i18n/locale';
import { getEmotionCardMap, getEmotionCategoryMap } from '@/lib/emotions';

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

async function localizeCardInfo(
  card: RawCardInfo | null | undefined,
  locale: Locale,
): Promise<LocalizedCardInfo | null> {
  if (!card) {
    return null;
  }

  const [localizedCardMap, localizedCategoryMap] = await Promise.all([
    getEmotionCardMap(locale),
    getEmotionCategoryMap(locale),
  ]);

  const localizedCard = localizedCardMap.get(card.id);
  const localizedCategory =
    (card.category?.slug
      ? localizedCategoryMap.bySlug.get(card.category.slug)
      : undefined) ??
    localizedCategoryMap.byId.get(card.category?.id ?? card.category_id);

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
  const [card1, card2, card3] = await Promise.all([
    localizeCardInfo(record.card_1, locale),
    localizeCardInfo(record.card_2, locale),
    localizeCardInfo(record.card_3, locale),
  ]);

  return {
    ...record,
    card_1: card1,
    card_2: card2,
    card_3: card3,
  };
}

export async function localizeRecordCollection<T extends RawRecordWithCards>(
  records: T[],
  locale: Locale,
): Promise<Array<T & LocalizedRecordItem>> {
  const localizedCardMap = await getEmotionCardMap(locale);
  const localizedCategoryMap = await getEmotionCategoryMap(locale);

  const localizeCard = (card: RawCardInfo | null | undefined): LocalizedCardInfo | null => {
    if (!card) {
      return null;
    }

    const localizedCard = localizedCardMap.get(card.id);
    const localizedCategory =
      (card.category?.slug
        ? localizedCategoryMap.bySlug.get(card.category.slug)
        : undefined) ??
      localizedCategoryMap.byId.get(card.category?.id ?? card.category_id);

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
  };

  return records.map((record) => ({
    ...record,
    card_1: localizeCard(record.card_1),
    card_2: localizeCard(record.card_2),
    card_3: localizeCard(record.card_3),
  }));
}
