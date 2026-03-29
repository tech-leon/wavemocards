import type { Locale } from '@/lib/i18n/locale';
import { getEmotionCardMap, getEmotionCategoryMap } from '@/lib/emotions';

export interface RecordsSearchInput {
  keyword: string;
  locale: Locale;
}

export function normalizeKeyword(keyword: string, locale: Locale): string {
  return keyword.trim().toLocaleLowerCase(locale);
}

export function tokenizeKeyword(keyword: string): string[] {
  return keyword.split(/\s+/).map((token) => token.trim()).filter(Boolean);
}

export async function resolveMatchingCardIds({
  keyword,
  locale,
}: RecordsSearchInput): Promise<number[]> {
  const normalizedKeyword = normalizeKeyword(keyword, locale);
  const tokens = tokenizeKeyword(normalizedKeyword);

  if (tokens.length === 0) {
    return [];
  }

  const [cardMap, categoryMap] = await Promise.all([
    getEmotionCardMap(locale),
    getEmotionCategoryMap(locale),
  ]);

  const matchingCategoryIds = new Set<number>();
  const matchingCardIds = new Set<number>();

  for (const category of categoryMap.byId.values()) {
    const normalizedName = category.name.toLocaleLowerCase(locale);
    if (tokens.some((token) => normalizedName.includes(token))) {
      matchingCategoryIds.add(category.id);
    }
  }

  for (const card of cardMap.values()) {
    const normalizedName = card.name.toLocaleLowerCase(locale);
    if (
      tokens.some((token) => normalizedName.includes(token)) ||
      matchingCategoryIds.has(card.category_id)
    ) {
      matchingCardIds.add(card.id);
    }
  }

  return Array.from(matchingCardIds);
}
