import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;
const MAX_PER_PAGE = 50;

export const RECORDS_WITH_CARDS_SELECT = `
  *,
  card_1:emotion_cards!emotion_records_card_1_id_fkey(id, name, category_id, description, image_path,
    category:emotion_categories!emotion_cards_category_id_fkey(id, name, slug)
  ),
  card_2:emotion_cards!emotion_records_card_2_id_fkey(id, name, category_id, description, image_path,
    category:emotion_categories!emotion_cards_category_id_fkey(id, name, slug)
  ),
  card_3:emotion_cards!emotion_records_card_3_id_fkey(id, name, category_id, description, image_path,
    category:emotion_categories!emotion_cards_category_id_fkey(id, name, slug)
  )
`;

export interface RecordsListParams {
  startDate: string | null;
  endDate: string | null;
  keyword: string | null;
  page: number;
  perPage: number;
}

export interface PaginationInfo {
  page: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
}

function parsePositiveInt(value: string | null, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
}

export function parseRecordsListParams(searchParams: URLSearchParams): RecordsListParams {
  const page = parsePositiveInt(searchParams.get('page'), DEFAULT_PAGE);
  const perPage = Math.min(parsePositiveInt(searchParams.get('perPage'), DEFAULT_PER_PAGE), MAX_PER_PAGE);
  const rawKeyword = searchParams.get('keyword');
  const keyword = rawKeyword?.trim() ? rawKeyword.trim() : null;

  return {
    startDate: searchParams.get('startDate'),
    endDate: searchParams.get('endDate'),
    keyword,
    page,
    perPage,
  };
}

export function buildPagination(
  page: number,
  perPage: number,
  totalRecords: number,
): PaginationInfo {
  return {
    page,
    perPage,
    totalRecords,
    totalPages: Math.ceil(totalRecords / perPage),
  };
}

export function buildBaseRecordsQuery(
  supabase: SupabaseClient<Database>,
  profileId: string,
  startDate: string | null,
  endDate: string | null,
) {
  let query = supabase
    .from('emotion_records')
    .select(RECORDS_WITH_CARDS_SELECT, { count: 'exact' })
    .eq('user_id', profileId)
    .order('created_at', { ascending: false });

  if (startDate) {
    query = query.gte('created_at', `${startDate}T00:00:00.000Z`);
  }

  if (endDate) {
    query = query.lte('created_at', `${endDate}T23:59:59.999Z`);
  }

  return query;
}
