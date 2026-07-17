import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';
import { listExportDays, toDailyRows } from '@/lib/analytics-export';

// Hobby reporting window is 1 month; a 21-day lookback on a weekly
// cron re-pulls recent days (idempotent upsert) and still covers a
// missed run or two before data falls out of the window.
const LOOKBACK_DAYS = 21;

export const maxDuration = 60;

/**
 * GET /api/analytics/export
 * Triggered by the weekly cron in vercel.json. Pulls per-route daily
 * pageview/visitor aggregates from the Vercel Web Analytics API and
 * upserts them into analytics_route_daily before they fall out of
 * the 1-month Hobby reporting window. Aggregate counts only.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_ANALYTICS_PROJECT_ID;
  const teamId = process.env.VERCEL_ANALYTICS_TEAM_ID;
  if (!token || !projectId || !teamId) {
    console.error('Analytics export: VERCEL_API_TOKEN / VERCEL_ANALYTICS_PROJECT_ID / VERCEL_ANALYTICS_TEAM_ID missing');
    return NextResponse.json({ error: 'Export not configured' }, { status: 500 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const days = listExportDays(new Date(), LOOKBACK_DAYS);
  let upserted = 0;
  const failures: string[] = [];

  for (const day of days) {
    const params = new URLSearchParams({
      projectId,
      teamId,
      by: 'route',
      since: `${day}T00:00:00.000Z`,
      until: `${day}T23:59:59.999Z`,
      limit: '100',
    });

    const res = await fetch(
      `https://api.vercel.com/v1/query/web-analytics/visits/aggregate?${params}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) {
      console.error(`Analytics export: fetch for ${day} failed (${res.status})`);
      failures.push(day);
      continue;
    }

    const body: unknown = await res.json();
    const data = (body as { data?: unknown })?.data;
    const rows = toDailyRows(day, data);
    if (rows.length === 0) continue;

    const { error } = await supabase.from('analytics_route_daily').upsert(rows);
    if (error) {
      console.error(`Analytics export: upsert for ${day} failed:`, error);
      failures.push(day);
      continue;
    }
    upserted += rows.length;
  }

  return NextResponse.json({ days: days.length, upserted, failures });
}
