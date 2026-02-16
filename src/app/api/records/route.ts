import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { createServerClient } from '@/lib/supabase';

/**
 * GET /api/records
 * Get emotion records for the current user
 * Supports: date filtering, keyword search, pagination
 */
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    let user = null;
    try {
      const auth = await withAuth();
      user = auth.user;
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('workos_user_id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Parse query params
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const keyword = searchParams.get('keyword');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const perPage = parseInt(searchParams.get('perPage') || '10', 10);

    // Build query - fetch records with card info
    let query = supabase
      .from('emotion_records')
      .select(`
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
      `, { count: 'exact' })
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false });

    // Date filtering
    if (startDate) {
      query = query.gte('created_at', `${startDate}T00:00:00.000Z`);
    }
    if (endDate) {
      query = query.lte('created_at', `${endDate}T23:59:59.999Z`);
    }

    // Execute query (keyword filtering will be done client-side for now
    // because Supabase doesn't support OR across multiple text columns easily)
    const { data: records, error: queryError } = await query;

    if (queryError) {
      console.error('Error fetching records:', queryError);
      return NextResponse.json({ error: 'Failed to fetch records' }, { status: 500 });
    }

    // Keyword filtering (client-side)
    let filteredRecords = records || [];
    if (keyword && keyword.trim()) {
      const keywords = keyword.trim().split(/\s+/);
      filteredRecords = filteredRecords.filter((record) => {
        const searchableText = [
          record.story,
          record.actions,
          record.results,
          record.feelings,
          record.reaction,
          // Card names
          (record.card_1 as Record<string, unknown>)?.name,
          (record.card_2 as Record<string, unknown>)?.name,
          (record.card_3 as Record<string, unknown>)?.name,
          // Category names
          ((record.card_1 as Record<string, unknown>)?.category as Record<string, unknown>)?.name,
          ((record.card_2 as Record<string, unknown>)?.category as Record<string, unknown>)?.name,
          ((record.card_3 as Record<string, unknown>)?.category as Record<string, unknown>)?.name,
        ]
          .filter(Boolean)
          .join(' ');

        return keywords.some((kw) => searchableText.includes(kw));
      });
    }

    // Pagination
    const totalRecords = filteredRecords.length;
    const totalPages = Math.ceil(totalRecords / perPage);
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedRecords = filteredRecords.slice(start, end);

    return NextResponse.json({
      records: paginatedRecords,
      pagination: {
        page,
        perPage,
        totalRecords,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Unexpected error in GET /api/records:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/records
 * Create a new emotion record
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    let user = null;
    try {
      const auth = await withAuth();
      user = auth.user;
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
      return NextResponse.json(
        { error: 'Cards must be an array of 1-3 card IDs' },
        { status: 400 }
      );
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
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
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
        return NextResponse.json(
          { error: 'Failed to create user profile' },
          { status: 500 }
        );
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
        return NextResponse.json(
          { error: 'Failed to save emotion record' },
          { status: 500 }
        );
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
      return NextResponse.json(
        { error: 'Failed to save emotion record' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Record saved successfully' });
  } catch (error) {
    console.error('Unexpected error in POST /api/records:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
