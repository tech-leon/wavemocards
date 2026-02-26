import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { createServerClient } from '@/lib/supabase';

/**
 * Helper: get authenticated user's profile ID
 */
async function getAuthenticatedProfileId() {
  let user = null;
  try {
    const auth = await withAuth();
    user = auth.user;
  } catch {
    return { error: 'Unauthorized', status: 401, profileId: null };
  }

  if (!user) {
    return { error: 'Unauthorized', status: 401, profileId: null };
  }

  const supabase = createServerClient();
  if (!supabase) {
    return { error: 'Database not configured', status: 500, profileId: null };
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('workos_user_id', user.id)
    .single();

  if (profileError || !profile) {
    return { error: 'Profile not found', status: 404, profileId: null };
  }

  return { error: null, status: 200, profileId: profile.id };
}

/**
 * GET /api/records/[id]
 * Get a single emotion record by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { error, status, profileId } = await getAuthenticatedProfileId();

    if (error) {
      return NextResponse.json({ error }, { status });
    }

    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

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
      .eq('user_id', profileId!)
      .single();

    if (queryError || !record) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({ record });
  } catch (error) {
    console.error('Unexpected error in GET /api/records/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
    const { id } = await params;
    const { error, status, profileId } = await getAuthenticatedProfileId();

    if (error) {
      return NextResponse.json({ error }, { status });
    }

    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

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
      .eq('user_id', profileId!)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating record:', updateError);
      return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });
    }

    if (!updatedRecord) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Record updated successfully', record: updatedRecord });
  } catch (error) {
    console.error('Unexpected error in PUT /api/records/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
    const { id } = await params;
    const { error, status, profileId } = await getAuthenticatedProfileId();

    if (error) {
      return NextResponse.json({ error }, { status });
    }

    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const { error: deleteError } = await supabase
      .from('emotion_records')
      .delete()
      .eq('id', id)
      .eq('user_id', profileId!);

    if (deleteError) {
      console.error('Error deleting record:', deleteError);
      return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Unexpected error in DELETE /api/records/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
