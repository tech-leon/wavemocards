'use server';

import { withAuthContext } from '@/lib/auth-context';
import { getRequestLocale } from '@/lib/i18n/request';
import { localizeRecord } from '@/lib/records';
import type { Locale } from '@/lib/i18n/locale';
import type { RecordData } from '@/types/record-detail';

/**
 * Get a single emotion record by ID (server action).
 */
export async function getRecord(id: string): Promise<RecordData | null> {
  const ctx = await withAuthContext();
  if (!ctx.ok) {
    return null;
  }

  const { profileId, supabase, locale } = ctx;

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
    return null;
  }

  const localizedRecord = await localizeRecord(record, locale);
  return localizedRecord as unknown as RecordData;
}

/**
 * Update story fields of an emotion record (server action).
 */
export async function updateRecordStory(
  id: string,
  fields: {
    story?: string;
    actions?: string;
    results?: string;
    feelings?: string;
    reaction?: string;
  }
): Promise<RecordData | null> {
  const ctx = await withAuthContext();
  if (!ctx.ok) {
    return null;
  }

  const { profileId, supabase } = ctx;

  const { data: updatedRecord, error: updateError } = await supabase
    .from('emotion_records')
    .update({
      story: fields.story ?? undefined,
      actions: fields.actions ?? undefined,
      results: fields.results ?? undefined,
      feelings: fields.feelings ?? undefined,
      reaction: fields.reaction ?? undefined,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('user_id', profileId)
    .select()
    .single();

  if (updateError || !updatedRecord) {
    return null;
  }

  return updatedRecord as unknown as RecordData;
}

/**
 * Delete an emotion record (server action).
 */
export async function deleteRecord(id: string): Promise<boolean> {
  const ctx = await withAuthContext();
  if (!ctx.ok) {
    return false;
  }

  const { profileId, supabase } = ctx;

  const { error: deleteError } = await supabase
    .from('emotion_records')
    .delete()
    .eq('id', id)
    .eq('user_id', profileId);

  return !deleteError;
}
