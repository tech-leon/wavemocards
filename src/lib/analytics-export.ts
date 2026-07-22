// Pure helpers for the weekly Vercel Web Analytics export
// (src/app/api/analytics/export/route.ts).

export interface AnalyticsRouteDailyRow {
  day: string; // YYYY-MM-DD (UTC)
  route: string;
  pageviews: number;
  visitors: number;
}

/**
 * UTC day strings (YYYY-MM-DD) for the `lookback` days ending
 * yesterday. Today is excluded because its data is still incomplete.
 */
export function listExportDays(now: Date, lookback: number): string[] {
  const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const days: string[] = [];
  for (let i = lookback; i >= 1; i--) {
    days.push(new Date(todayUtc - i * 86_400_000).toISOString().slice(0, 10));
  }
  return days;
}

/**
 * Map one day's Vercel `visits/aggregate?by=route` response data
 * into table rows, dropping malformed entries (including the
 * "Others" overflow group, which has no route).
 */
export function toDailyRows(day: string, data: unknown): AnalyticsRouteDailyRow[] {
  if (!Array.isArray(data)) return [];
  const rows: AnalyticsRouteDailyRow[] = [];
  for (const item of data) {
    if (!item || typeof item !== 'object') continue;
    const { route, pageviews, visitors } = item as Record<string, unknown>;
    if (typeof route !== 'string' || !route.startsWith('/')) continue;
    if (typeof pageviews !== 'number' || !Number.isFinite(pageviews)) continue;
    if (typeof visitors !== 'number' || !Number.isFinite(visitors)) continue;
    rows.push({ day, route, pageviews, visitors });
  }
  return rows;
}
