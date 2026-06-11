import { readFile } from 'node:fs/promises';
import path from 'node:path';

import type {
  LocalizedEmotionCardRecord,
  LocalizedEmotionCategoryRecord,
} from '../src/types/emotion-data';

const locales = ['zh-TW', 'en', 'ja'] as const;
const cardsDir = path.join(process.cwd(), 'src/data/cards');

function fail(message: string): never {
  throw new Error(message);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isPositiveInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
}

function parseCategories(
  locale: string,
  value: unknown,
): LocalizedEmotionCategoryRecord[] {
  if (!Array.isArray(value)) {
    fail(`categories.${locale}.json must export an array`);
  }

  return value.map((item, index) => {
    if (!isObject(item)) {
      fail(`categories.${locale}.json[${index}] must be an object`);
    }

    const { id, slug, name, displayOrder } = item;

    if (!isPositiveInteger(id)) {
      fail(`categories.${locale}.json[${index}].id must be a positive integer`);
    }
    if (!isNonEmptyString(slug)) {
      fail(`categories.${locale}.json[${index}].slug must be a non-empty string`);
    }
    if (!isNonEmptyString(name)) {
      fail(`categories.${locale}.json[${index}].name must be a non-empty string`);
    }
    if (!isPositiveInteger(displayOrder)) {
      fail(
        `categories.${locale}.json[${index}].displayOrder must be a positive integer`,
      );
    }

    return { id, slug, name, displayOrder };
  });
}

function parseCards(locale: string, value: unknown): LocalizedEmotionCardRecord[] {
  if (!Array.isArray(value)) {
    fail(`cards.${locale}.json must export an array`);
  }

  return value.map((item, index) => {
    if (!isObject(item)) {
      fail(`cards.${locale}.json[${index}] must be an object`);
    }

    const { id, slug, categoryId, name, description, example, imagePath } = item;

    if (!isPositiveInteger(id)) {
      fail(`cards.${locale}.json[${index}].id must be a positive integer`);
    }
    if (!isNonEmptyString(slug)) {
      fail(`cards.${locale}.json[${index}].slug must be a non-empty string`);
    }
    if (!isPositiveInteger(categoryId)) {
      fail(`cards.${locale}.json[${index}].categoryId must be a positive integer`);
    }
    if (!isNonEmptyString(name)) {
      fail(`cards.${locale}.json[${index}].name must be a non-empty string`);
    }
    if (!isNonEmptyString(description)) {
      fail(`cards.${locale}.json[${index}].description must be a non-empty string`);
    }
    if (!isNonEmptyString(example)) {
      fail(`cards.${locale}.json[${index}].example must be a non-empty string`);
    }
    if (!isNonEmptyString(imagePath)) {
      fail(`cards.${locale}.json[${index}].imagePath must be a non-empty string`);
    }
    if (!imagePath.startsWith('/images/emoCards/')) {
      fail(
        `cards.${locale}.json[${index}].imagePath must start with /images/emoCards/`,
      );
    }

    return { id, slug, categoryId, name, description, example, imagePath };
  });
}

function assertUniqueIds<T extends { id: number }>(
  records: T[],
  filename: string,
): void {
  const ids = new Set<number>();
  for (const record of records) {
    if (ids.has(record.id)) {
      fail(`${filename} contains duplicate id ${record.id}`);
    }
    ids.add(record.id);
  }
}

function assertUniqueSlugs<T extends { slug: string }>(
  records: T[],
  filename: string,
): void {
  const slugs = new Set<string>();
  for (const record of records) {
    if (slugs.has(record.slug)) {
      fail(`${filename} contains duplicate slug "${record.slug}"`);
    }
    slugs.add(record.slug);
  }
}

function assertMatchingKeys<T extends { id: number }>(
  baseline: T[],
  candidate: T[],
  filename: string,
  compareFields: Array<keyof T>,
): void {
  if (baseline.length !== candidate.length) {
    fail(`${filename} has ${candidate.length} records, expected ${baseline.length}`);
  }

  const baselineById = new Map(baseline.map((record) => [record.id, record]));
  for (const record of candidate) {
    const source = baselineById.get(record.id);
    if (!source) {
      fail(`${filename} contains unexpected id ${record.id}`);
    }

    for (const field of compareFields) {
      const expected = source[field] as unknown;
      const received = record[field] as unknown;

      if (expected !== received) {
        fail(
          `${filename} record id ${record.id} has mismatched ${String(field)}: expected "${String(expected)}", received "${String(received)}"`,
        );
      }
    }
  }
}

async function readJson(filename: string): Promise<unknown> {
  const content = await readFile(path.join(cardsDir, filename), 'utf8');
  return JSON.parse(content) as unknown;
}

async function main(): Promise<void> {
  const categoriesByLocale = new Map<
    string,
    LocalizedEmotionCategoryRecord[]
  >();
  const cardsByLocale = new Map<string, LocalizedEmotionCardRecord[]>();

  for (const locale of locales) {
    const categoriesFilename = `categories.${locale}.json`;
    const cardsFilename = `cards.${locale}.json`;

    const categories = parseCategories(locale, await readJson(categoriesFilename));
    const cards = parseCards(locale, await readJson(cardsFilename));

    assertUniqueIds(categories, categoriesFilename);
    assertUniqueSlugs(categories, categoriesFilename);
    assertUniqueIds(cards, cardsFilename);
    assertUniqueSlugs(cards, cardsFilename);

    const categoryIds = new Set(categories.map((category) => category.id));
    for (const card of cards) {
      if (!categoryIds.has(card.categoryId)) {
        fail(
          `${cardsFilename} record id ${card.id} references missing categoryId ${card.categoryId}`,
        );
      }
    }

    categoriesByLocale.set(locale, categories);
    cardsByLocale.set(locale, cards);
  }

  const baselineCategories = categoriesByLocale.get('zh-TW');
  const baselineCards = cardsByLocale.get('zh-TW');

  if (!baselineCategories || !baselineCards) {
    fail('Missing zh-TW baseline files');
  }

  for (const locale of locales.filter((value) => value !== 'zh-TW')) {
    assertMatchingKeys(
      baselineCategories,
      categoriesByLocale.get(locale) ?? [],
      `categories.${locale}.json`,
      ['slug', 'displayOrder'],
    );
    assertMatchingKeys(
      baselineCards,
      cardsByLocale.get(locale) ?? [],
      `cards.${locale}.json`,
      ['slug', 'categoryId', 'imagePath'],
    );
  }

  console.log(
    `Card translation files are valid: ${baselineCategories.length} categories, ${baselineCards.length} cards across ${locales.length} locales.`,
  );
}

main().catch((error: unknown) => {
  console.error(
    error instanceof Error ? error.message : 'Unknown validation error',
  );
  process.exit(1);
});
