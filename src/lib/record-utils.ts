import type { CardInfo } from '@/types/record-detail';

/**
 * Format a date string to "YYYY / MM / DD" display format.
 */
export function formatRecordDate(dateStr: string): string {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year} / ${month} / ${day}`;
}

/**
 * Build emotion strength display string from cards and levels.
 * Returns parts joined by "・" or the provided fallback.
 */
export function buildStrengthDisplay(
  card1: CardInfo | null,
  card2: CardInfo | null,
  card3: CardInfo | null,
  level1: number | null,
  level2: number | null,
  level3: number | null,
  fallback: string
): string {
  const parts: string[] = [];
  if (card1 && level1 != null) parts.push(`${card1.name} ${level1}`);
  if (card2 && level2 != null) parts.push(`${card2.name} ${level2}`);
  if (card3 && level3 != null) parts.push(`${card3.name} ${level3}`);
  return parts.join('\u30FB') || fallback;
}

/**
 * Map the expect field value to a display text key.
 */
export function getExpectText(
  expect: string | null,
  t: (key: string) => string
): string {
  switch (expect) {
    case '0':
      return t('expect.yes');
    case '1':
      return t('expect.no');
    case '2':
      return t('expect.unknown');
    default:
      return t('empty.notAvailable');
  }
}
