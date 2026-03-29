import { NextRequest, NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';
import { getRequestLocale } from '@/lib/i18n/request';
import { localizeRecord } from '@/lib/records';
import { withAuthContext } from '@/lib/auth-context';

/**
 * GET /api/records/[id]
 * Get a single emotion record by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await withAuthContext();
    if (!ctx.ok) {
      return NextResponse.json({ error: ctx.error }, { status: ctx.status });
    }

    const { profileId, supabase, locale } = ctx;
    const tRecords = await getTranslations({ locale, namespace: 'apiErrors.records' });
    const { id } = await params;

    const { data: record, error: queryError } = await supabase
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
      `)
      .eq('id', id)
      .eq('user_id', profileId)
      .single();

    if (queryError || !record) {
      return NextResponse.json({ error: tRecords('notFound') }, { status: 404 });
    }

    const localizedRecord = await localizeRecord(record, locale);

    return NextResponse.json({ record: localizedRecord });
  } catch (error) {
    console.error('Unexpected error in GET /api/records/[id]:', error);
    const locale = await getRequestLocale();
    const tCommon = await getTranslations({ locale, namespace: 'apiErrors.common' });
    return NextResponse.json({ error: tCommon('internalServerError') }, { status: 500 });
  }
}

/**
 * PUT /api/records/[id]
 * Update an emotion record (only story fields are editable)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await withAuthContext();
    if (!ctx.ok) {
      return NextResponse.json({ error: ctx.error }, { status: ctx.status });
    }

    const { profileId, supabase, locale } = ctx;
    const tRecords = await getTranslations({ locale, namespace: 'apiErrors.records' });
    const { id } = await params;

    const body = await request.json();
    const { story, actions, results, feelings, reaction } = body;

    // Only allow updating story-related fields (same as old version)
    const { data: updatedRecord, error: updateError } = await supabase
      .from('emotion_records')
      .update({
        story: story ?? undefined,
        actions: actions ?? undefined,
        results: results ?? undefined,
        feelings: feelings ?? undefined,
        reaction: reaction ?? undefined,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', profileId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating record:', updateError);
      return NextResponse.json({ error: tRecords('updateFailed') }, { status: 500 });
    }

    if (!updatedRecord) {
      return NextResponse.json({ error: tRecords('notFound') }, { status: 404 });
    }

    return NextResponse.json({ message: 'Record updated successfully', record: updatedRecord });
  } catch (error) {
    console.error('Unexpected error in PUT /api/records/[id]:', error);
    const locale = await getRequestLocale();
    const tCommon = await getTranslations({ locale, namespace: 'apiErrors.common' });
    return NextResponse.json({ error: tCommon('internalServerError') }, { status: 500 });
  }
}

/**
 * DELETE /api/records/[id]
 * Delete an emotion record
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await withAuthContext();
    if (!ctx.ok) {
      return NextResponse.json({ error: ctx.error }, { status: ctx.status });
    }

    const { profileId, supabase, locale } = ctx;
    const tRecords = await getTranslations({ locale, namespace: 'apiErrors.records' });
    const { id } = await params;

    const { error: deleteError } = await supabase
      .from('emotion_records')
      .delete()
      .eq('id', id)
      .eq('user_id', profileId);

    if (deleteError) {
      console.error('Error deleting record:', deleteError);
      return NextResponse.json({ error: tRecords('deleteFailed') }, { status: 500 });
    }

    return NextResponse.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Unexpected error in DELETE /api/records/[id]:', error);
    const locale = await getRequestLocale();
    const tCommon = await getTranslations({ locale, namespace: 'apiErrors.common' });
    return NextResponse.json({ error: tCommon('internalServerError') }, { status: 500 });
  }
}
