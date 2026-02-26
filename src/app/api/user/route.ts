import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { createServerClient } from '@/lib/supabase';

/**
 * GET /api/user
 * Get the current user's profile data
 */
export async function GET() {
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

    // Fetch user profile
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('workos_user_id', user.id)
      .single();

    if (error) {
      // Profile not found - create one
      if (error.code === 'PGRST116') {
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert({
            workos_user_id: user.id,
            email: user.email,
            first_name: user.firstName || null,
            last_name: user.lastName || null,
          })
          .select()
          .single();

        if (insertError) {
          console.error('Error creating profile:', insertError);
          return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
        }

        return NextResponse.json({
          profile: newProfile,
          email: user.email,
        });
      }

      console.error('Error fetching profile:', error);
      return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }

    return NextResponse.json({
      profile,
      email: user.email,
    });
  } catch (error) {
    console.error('Unexpected error in GET /api/user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PUT /api/user
 * Update the current user's profile data
 */
export async function PUT(request: NextRequest) {
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
    const { first_name, last_name, title, day_of_birth } = body;

    // Validate required fields
    if (!first_name || !first_name.trim()) {
      return NextResponse.json({ error: '名為必填欄位' }, { status: 400 });
    }

    if (!last_name || !last_name.trim()) {
      return NextResponse.json({ error: '姓為必填欄位' }, { status: 400 });
    }

    // Validate title if provided
    const validTitles = ['Student', 'Teacher', 'Null'];
    if (title && !validTitles.includes(title)) {
      return NextResponse.json({ error: '無效的身份選項' }, { status: 400 });
    }

    // Validate date format if provided
    if (day_of_birth && isNaN(Date.parse(day_of_birth))) {
      return NextResponse.json({ error: '無效的日期格式' }, { status: 400 });
    }

    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    // Build update object
    const updates: Record<string, string | null> = {
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      title: title || null,
      day_of_birth: day_of_birth || null,
      updated_at: new Date().toISOString(),
    };

    // Update profile
    const { data: updatedProfile, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('workos_user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      profile: updatedProfile,
    });
  } catch (error) {
    console.error('Unexpected error in PUT /api/user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
