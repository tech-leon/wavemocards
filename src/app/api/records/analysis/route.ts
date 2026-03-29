import { NextRequest, NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';
import { getRequestLocale } from '@/lib/i18n/request';
import { categoryRepresentativeCards } from '@/lib/emotions';
import { withAuthContext } from '@/lib/auth-context';

/**
 * GET /api/records/analysis
 * Get emotion analysis data (category counts) for a date range
 */
export async function GET(request: NextRequest) {
  try {
    const ctx = await withAuthContext();
    if (!ctx.ok) {
      return NextResponse.json({ error: ctx.error }, { status: ctx.status });
    }

    const { profileId, supabase, locale } = ctx;
    const tAnalysis = await getTranslations({ locale, namespace: 'apiErrors.analysis' });

    // Parse date range params
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!startDate || !endDate) {
      return NextResponse.json({ error: tAnalysis('missingDateRange') }, { status: 400 });
    }

    // Fetch records within date range
    const { data: records, error: queryError } = await supabase
      .from('emotion_records')
      .select(`
        card_1_id,
        card_2_id,
        card_3_id,
        card_1:emotion_cards!emotion_records_card_1_id_fkey(
          category:emotion_categories!emotion_cards_category_id_fkey(slug)
        ),
        card_2:emotion_cards!emotion_records_card_2_id_fkey(
          category:emotion_categories!emotion_cards_category_id_fkey(slug)
        ),
        card_3:emotion_cards!emotion_records_card_3_id_fkey(
          category:emotion_categories!emotion_cards_category_id_fkey(slug)
        )
      `)
      .eq('user_id', profileId)
      .gte('created_at', `${startDate}T00:00:00.000Z`)
      .lte('created_at', `${endDate}T23:59:59.999Z`);

    if (queryError) {
      console.error('Error fetching analysis data:', queryError);
      return NextResponse.json({ error: tAnalysis('fetchFailed') }, { status: 500 });
    }

    if (!records || records.length === 0) {
      return NextResponse.json({ message: tAnalysis('noData'), categoryCounts: {} });
    }

    // Count categories
    const categoryCounts: Record<string, number> = {};

    records.forEach((record) => {
      const getCategorySlug = (card: unknown): string | null => {
        if (!card) return null;
        const c = card as { category?: { slug?: string } };
        return c?.category?.slug || null;
      };

      const cat1 = getCategorySlug(record.card_1);
      const cat2 = getCategorySlug(record.card_2);
      const cat3 = getCategorySlug(record.card_3);

      if (cat1) categoryCounts[cat1] = (categoryCounts[cat1] || 0) + 1;
      if (cat2) categoryCounts[cat2] = (categoryCounts[cat2] || 0) + 1;
      if (cat3) categoryCounts[cat3] = (categoryCounts[cat3] || 0) + 1;
    });

    return NextResponse.json({
      categoryCounts,
      representativeCards: categoryRepresentativeCards,
      totalRecords: records.length,
    });
  } catch (error) {
    console.error('Unexpected error in GET /api/records/analysis:', error);
    const locale = await getRequestLocale();
    const tCommon = await getTranslations({ locale, namespace: 'apiErrors.common' });
    return NextResponse.json({ error: tCommon('internalServerError') }, { status: 500 });
  }
}
