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
import { createServerClient } from '@/lib/supabase';
import type { SearchEmotionRecordsRow } from '@/types/database';

async function fetchRecordsByIds(
  recordIds: string[],
  supabase: NonNullable<ReturnType<typeof createServerClient>>,
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
  return recordIds.map((recordId) => recordsById.get(recordId)).filter(Boolean);
}

/**
 * GET /api/records
 * Get emotion records for the current user
 * Supports: date filtering, keyword search, pagination
 */
export async function GET(request: NextRequest) {
  try {
    const locale = await getRequestLocale();
    const tCommon = await getTranslations({ locale, namespace: 'apiErrors.common' });
    const tProfile = await getTranslations({ locale, namespace: 'apiErrors.profile' });
    const tRecords = await getTranslations({ locale, namespace: 'apiErrors.records' });
    // Verify authentication
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

    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ error: tCommon('databaseNotConfigured') }, { status: 500 });
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('workos_user_id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: tProfile('notFound') }, { status: 404 });
    }

    const params = parseRecordsListParams(request.nextUrl.searchParams);
    const { startDate, endDate, keyword, page, perPage } = params;

    if (!keyword) {
      const rangeFrom = (page - 1) * perPage;
      const rangeTo = rangeFrom + perPage - 1;

      const { data: records, error: queryError, count } = await buildBaseRecordsQuery(
        supabase,
        profile.id,
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
        p_user_id: profile.id,
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
    const locale = await getRequestLocale();
    const tCommon = await getTranslations({ locale, namespace: 'apiErrors.common' });
    const tRecords = await getTranslations({ locale, namespace: 'apiErrors.records' });
    // Verify authentication
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

    const body = await request.json();
    const {
      cards,
      beforeLevels,
      afterLevels,
      storyBackground,
      storyAction,
      storyResult,
      storyFeeling,
      storyExpect,
      storyBetterAction,
    } = body;

    // Validate required fields
    if (!cards || !Array.isArray(cards) || cards.length === 0 || cards.length > 3) {
      return NextResponse.json({ error: tRecords('invalidCards') }, { status: 400 });
    }

    // Map cards to card_1_id, card_2_id, card_3_id
    const card1Id = cards[0] || null;
    const card2Id = cards[1] || null;
    const card3Id = cards[2] || null;

    // Map before levels
    const beforeLevel1 = card1Id ? beforeLevels?.[card1Id] || null : null;
    const beforeLevel2 = card2Id ? beforeLevels?.[card2Id] || null : null;
    const beforeLevel3 = card3Id ? beforeLevels?.[card3Id] || null : null;

    // Map after levels (optional)
    const afterLevel1 = card1Id ? afterLevels?.[card1Id] || null : null;
    const afterLevel2 = card2Id ? afterLevels?.[card2Id] || null : null;
    const afterLevel3 = card3Id ? afterLevels?.[card3Id] || null : null;

    // Get user profile from Supabase
    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ error: tCommon('databaseNotConfigured') }, { status: 500 });
    }

    // Get the profile by workos_user_id
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('workos_user_id', user.id)
      .single();

    if (profileError || !profile) {
      // If no profile, try to create one
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert({
          workos_user_id: user.id,
          email: user.email,
          first_name: user.firstName || null,
          last_name: user.lastName || null,
        })
        .select('id')
        .single();

      if (createError || !newProfile) {
        console.error('Error creating profile:', createError);
        return NextResponse.json({ error: tRecords('profileCreateFailed') }, { status: 500 });
      }

      // Use the new profile
      const userId = newProfile.id;

      const { error: insertError } = await supabase
        .from('emotion_records')
        .insert({
          user_id: userId,
          card_1_id: card1Id,
          card_2_id: card2Id,
          card_3_id: card3Id,
          before_level_1: beforeLevel1,
          before_level_2: beforeLevel2,
          before_level_3: beforeLevel3,
          after_level_1: afterLevel1,
          after_level_2: afterLevel2,
          after_level_3: afterLevel3,
          story: storyBackground || null,
          actions: storyAction || null,
          results: storyResult || null,
          feelings: storyFeeling || null,
          expect: storyExpect !== null && storyExpect !== undefined ? String(storyExpect) : null,
          reaction: storyBetterAction || null,
        });

      if (insertError) {
        console.error('Error inserting emotion record:', insertError);
        return NextResponse.json({ error: tRecords('createFailed') }, { status: 500 });
      }

      return NextResponse.json({ message: 'Record saved successfully' });
    }

    // Insert the emotion record
    const { error: insertError } = await supabase
      .from('emotion_records')
      .insert({
        user_id: profile.id,
        card_1_id: card1Id,
        card_2_id: card2Id,
        card_3_id: card3Id,
        before_level_1: beforeLevel1,
        before_level_2: beforeLevel2,
        before_level_3: beforeLevel3,
        after_level_1: afterLevel1,
        after_level_2: afterLevel2,
        after_level_3: afterLevel3,
        story: storyBackground || null,
        actions: storyAction || null,
        results: storyResult || null,
        feelings: storyFeeling || null,
        expect: storyExpect !== null && storyExpect !== undefined ? String(storyExpect) : null,
        reaction: storyBetterAction || null,
      });

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
