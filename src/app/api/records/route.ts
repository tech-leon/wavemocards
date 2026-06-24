import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { getTranslations } from 'next-intl/server';
import { getRequestLocale } from '@/lib/i18n/request';
import { localizeRecordCollection } from '@/lib/records';
import {
  buildBaseRecordsQuery,
  buildPagination,
  parseRecordsListParams,
  RECORDS_WITH_CARDS_SELECT,
} from '@/lib/records-query';
import { buildSearchTokens, resolveMatchingCardIds } from '@/lib/records-search';
import { withAuthContext } from '@/lib/auth-context';
import { createAdminClient } from '@/lib/supabase';
import { buildProfileInsert } from '@/lib/profile-insert';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import type { SearchEmotionRecordsRow } from '@/types/database';

async function fetchRecordsByIds(
  recordIds: string[],
  supabase: SupabaseClient<Database>,
) {
  if (recordIds.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from('emotion_records')
    .select(RECORDS_WITH_CARDS_SELECT)
    .in('id', recordIds);

  if (error) {
    throw error;
  }

  const recordsById = new Map((data ?? []).map((record) => [record.id, record]));
  return recordIds
    .map((recordId) => recordsById.get(recordId))
    .filter((r): r is NonNullable<typeof r> => r != null);
}

interface RecordInput {
  cards: number[];
  beforeLevels?: Record<number, number>;
  afterLevels?: Record<number, number>;
  storyBackground?: string;
  storyAction?: string;
  storyResult?: string;
  storyFeeling?: string;
  storyExpect?: unknown;
  storyBetterAction?: string;
}

/** Shape an emotion_records insert row from the request body, shared by both POST paths. */
function buildRecordRow(input: RecordInput, userId: string) {
  const card1Id = input.cards[0] || null;
  const card2Id = input.cards[1] || null;
  const card3Id = input.cards[2] || null;

  return {
    user_id: userId,
    card_1_id: card1Id,
    card_2_id: card2Id,
    card_3_id: card3Id,
    before_level_1: card1Id ? input.beforeLevels?.[card1Id] || null : null,
    before_level_2: card2Id ? input.beforeLevels?.[card2Id] || null : null,
    before_level_3: card3Id ? input.beforeLevels?.[card3Id] || null : null,
    after_level_1: card1Id ? input.afterLevels?.[card1Id] || null : null,
    after_level_2: card2Id ? input.afterLevels?.[card2Id] || null : null,
    after_level_3: card3Id ? input.afterLevels?.[card3Id] || null : null,
    story: input.storyBackground || null,
    actions: input.storyAction || null,
    results: input.storyResult || null,
    feelings: input.storyFeeling || null,
    expect: input.storyExpect !== null && input.storyExpect !== undefined ? String(input.storyExpect) : null,
    reaction: input.storyBetterAction || null,
  };
}

/** Max length for each free-text narrative field, capped before insert to avoid abuse. */
const MAX_NARRATIVE_LENGTH = 5000;

const NARRATIVE_FIELDS = [
  'storyBackground', 'storyAction', 'storyResult',
  'storyFeeling', 'storyExpect', 'storyBetterAction',
] as const;

type RecordValidationError = 'invalidCards' | 'invalidLevels' | 'fieldTooLong';

function isValidLevel(value: unknown): boolean {
  return typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= 10;
}

/**
 * Validate a POST /api/records body at the trust boundary.
 * Pure function (no request/locale) — returns a translation key on failure.
 */
function validateRecordInput(
  body: unknown,
): { ok: true; input: RecordInput } | { ok: false; key: RecordValidationError } {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, key: 'invalidCards' };
  }
  const payload = body as Record<string, unknown>;

  const cards = payload.cards;
  if (
    !Array.isArray(cards) || cards.length === 0 || cards.length > 3 ||
    !cards.every((c) => typeof c === 'number' && Number.isInteger(c))
  ) {
    return { ok: false, key: 'invalidCards' };
  }

  // Levels are optional; when present for a selected card they must be an integer 1–10.
  const beforeLevels = payload.beforeLevels as Record<number, unknown> | undefined;
  const afterLevels = payload.afterLevels as Record<number, unknown> | undefined;
  for (const cardId of cards) {
    for (const levels of [beforeLevels, afterLevels]) {
      const value = levels?.[cardId];
      if (value !== undefined && value !== null && !isValidLevel(value)) {
        return { ok: false, key: 'invalidLevels' };
      }
    }
  }

  // Cap free-text length.
  for (const field of NARRATIVE_FIELDS) {
    const value = payload[field];
    if (value !== undefined && value !== null && String(value).length > MAX_NARRATIVE_LENGTH) {
      return { ok: false, key: 'fieldTooLong' };
    }
  }

  return { ok: true, input: payload as unknown as RecordInput };
}

/**
 * GET /api/records
 * Get emotion records for the current user
 * Supports: date filtering, keyword search, pagination
 */
export async function GET(request: NextRequest) {
  try {
    const ctx = await withAuthContext();
    if (!ctx.ok) {
      return NextResponse.json({ error: ctx.error }, { status: ctx.status });
    }

    const { profileId, supabase, locale } = ctx;
    const tRecords = await getTranslations({ locale, namespace: 'apiErrors.records' });

    const params = parseRecordsListParams(request.nextUrl.searchParams);
    const { startDate, endDate, keyword, page, perPage } = params;

    if (!keyword) {
      const rangeFrom = (page - 1) * perPage;
      const rangeTo = rangeFrom + perPage - 1;

      const { data: records, error: queryError, count } = await buildBaseRecordsQuery(
        supabase,
        profileId,
        startDate,
        endDate,
      ).range(rangeFrom, rangeTo);

      if (queryError) {
        console.error('Error fetching paginated records:', queryError);
        return NextResponse.json({ error: tRecords('fetchFailed') }, { status: 500 });
      }

      const localizedRecords = await localizeRecordCollection(records || [], locale);

      return NextResponse.json({
        records: localizedRecords,
        pagination: buildPagination(page, perPage, count ?? 0),
      });
    }

    const matchingCardIds = await resolveMatchingCardIds({ keyword, locale });
    const keywordTokens = buildSearchTokens({ keyword, locale });
    const { data: searchResults, error: searchError } = await supabase.rpc(
      'search_emotion_records_paginated',
      {
        p_user_id: profileId,
        p_locale: locale,
        p_start_date: startDate ? `${startDate}T00:00:00.000Z` : null,
        p_end_date: endDate ? `${endDate}T23:59:59.999Z` : null,
        p_keyword_query: keyword,
        p_keyword_tokens: keywordTokens,
        p_matching_card_ids: matchingCardIds,
        p_page: page,
        p_per_page: perPage,
      },
    );

    if (searchError) {
      console.error('Error searching records:', searchError);
      return NextResponse.json({ error: tRecords('fetchFailed') }, { status: 500 });
    }

    const typedSearchResults = (searchResults ?? []) as SearchEmotionRecordsRow[];
    const recordIds = typedSearchResults.map((record) => record.id);
    const totalRecords = typedSearchResults[0]?.total_count ?? 0;
    const records = await fetchRecordsByIds(recordIds, supabase);
    const localizedRecords = await localizeRecordCollection(records, locale);

    return NextResponse.json({
      records: localizedRecords,
      pagination: buildPagination(page, perPage, totalRecords),
    });
  } catch (error) {
    console.error('Unexpected error in GET /api/records:', error);
    const locale = await getRequestLocale();
    const tCommon = await getTranslations({ locale, namespace: 'apiErrors.common' });
    return NextResponse.json({ error: tCommon('internalServerError') }, { status: 500 });
  }
}

/**
 * POST /api/records
 * Create a new emotion record
 */
export async function POST(request: NextRequest) {
  try {
    const ctx = await withAuthContext();

    // If profile not found, try to create one with admin client
    if (!ctx.ok && ctx.status === 404) {
      const locale = await getRequestLocale();
      const tCommon = await getTranslations({ locale, namespace: 'apiErrors.common' });
      const tRecords = await getTranslations({ locale, namespace: 'apiErrors.records' });

      let user = null;
      try {
        const auth = await withAuth();
        user = auth.user;
      } catch {
        return NextResponse.json({ error: tCommon('unauthorized') }, { status: 401 });
      }
      if (!user) {
        return NextResponse.json({ error: tCommon('unauthorized') }, { status: 401 });
      }

      const adminClient = createAdminClient();
      if (!adminClient) {
        return NextResponse.json({ error: tCommon('databaseNotConfigured') }, { status: 500 });
      }

      const body = await request.json();
      const validation = validateRecordInput(body);
      if (!validation.ok) {
        return NextResponse.json({ error: tRecords(validation.key) }, { status: 400 });
      }

      const { data: newProfile, error: createError } = await adminClient
        .from('profiles')
        .insert(buildProfileInsert(user))
        .select('id')
        .single();

      if (createError || !newProfile) {
        console.error('Error creating profile:', createError);
        return NextResponse.json({ error: tRecords('profileCreateFailed') }, { status: 500 });
      }

      const { error: insertError } = await adminClient
        .from('emotion_records')
        .insert(buildRecordRow(validation.input, newProfile.id));

      if (insertError) {
        console.error('Error inserting emotion record:', insertError);
        return NextResponse.json({ error: tRecords('createFailed') }, { status: 500 });
      }

      return NextResponse.json({ message: 'Record saved successfully' });
    }

    if (!ctx.ok) {
      return NextResponse.json({ error: ctx.error }, { status: ctx.status });
    }

    const { profileId, supabase, locale } = ctx;
    const tRecords = await getTranslations({ locale, namespace: 'apiErrors.records' });

    const body = await request.json();
    const validation = validateRecordInput(body);
    if (!validation.ok) {
      return NextResponse.json({ error: tRecords(validation.key) }, { status: 400 });
    }

    const { error: insertError } = await supabase
      .from('emotion_records')
      .insert(buildRecordRow(validation.input, profileId));

    if (insertError) {
      console.error('Error inserting emotion record:', insertError);
      return NextResponse.json({ error: tRecords('createFailed') }, { status: 500 });
    }

    return NextResponse.json({ message: 'Record saved successfully' });
  } catch (error) {
    console.error('Unexpected error in POST /api/records:', error);
    const locale = await getRequestLocale();
    const tCommon = await getTranslations({ locale, namespace: 'apiErrors.common' });
    return NextResponse.json({ error: tCommon('internalServerError') }, { status: 500 });
  }
}
