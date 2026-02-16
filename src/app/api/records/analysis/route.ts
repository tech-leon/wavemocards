import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { createServerClient } from '@/lib/supabase';

/**
 * GET /api/records/analysis
 * Get emotion analysis data (category counts) for a date range
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

    // Parse date range params
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'Both startDate and endDate are required' },
        { status: 400 }
      );
    }

    // Fetch records within date range
    const { data: records, error: queryError } = await supabase
      .from('emotion_records')
      .select(`
        card_1_id,
        card_2_id,
        card_3_id,
        card_1:emotion_cards!emotion_records_card_1_id_fkey(
          category:emotion_categories!emotion_cards_category_id_fkey(name)
        ),
        card_2:emotion_cards!emotion_records_card_2_id_fkey(
          category:emotion_categories!emotion_cards_category_id_fkey(name)
        ),
        card_3:emotion_cards!emotion_records_card_3_id_fkey(
          category:emotion_categories!emotion_cards_category_id_fkey(name)
        )
      `)
      .eq('user_id', profile.id)
      .gte('created_at', `${startDate}T00:00:00.000Z`)
      .lte('created_at', `${endDate}T23:59:59.999Z`);

    if (queryError) {
      console.error('Error fetching analysis data:', queryError);
      return NextResponse.json({ error: 'Failed to fetch analysis data' }, { status: 500 });
    }

    if (!records || records.length === 0) {
      return NextResponse.json({ message: '這段期間沒有資料', categoryCounts: {} });
    }

    // Count categories
    const categoryCounts: Record<string, number> = {};

    records.forEach((record) => {
      // Helper to extract category name from nested relation
      const getCategoryName = (card: unknown): string | null => {
        if (!card) return null;
        const c = card as { category?: { name?: string } };
        return c?.category?.name || null;
      };

      const cat1 = getCategoryName(record.card_1);
      const cat2 = getCategoryName(record.card_2);
      const cat3 = getCategoryName(record.card_3);

      if (cat1) categoryCounts[cat1] = (categoryCounts[cat1] || 0) + 1;
      if (cat2) categoryCounts[cat2] = (categoryCounts[cat2] || 0) + 1;
      if (cat3) categoryCounts[cat3] = (categoryCounts[cat3] || 0) + 1;
    });

    return NextResponse.json({
      categoryCounts,
      totalRecords: records.length,
    });
  } catch (error) {
    console.error('Unexpected error in GET /api/records/analysis:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
