import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { createServerClient } from '@/lib/supabase';
import type { Database } from '@/types/database';

type ThemePreference = 'light' | 'dark' | 'system';

function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'light' || value === 'dark' || value === 'system';
}

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

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: '無效的請求格式' }, { status: 400 });
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: '無效的請求格式' }, { status: 400 });
    }

    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const payload = body as Record<string, unknown>;
    const hasOwn = (key: string) => Object.prototype.hasOwnProperty.call(payload, key);

    // Build update object with patch-like semantics
    const updates: Database['public']['Tables']['profiles']['Update'] = {};

    if (hasOwn('first_name')) {
      if (typeof payload.first_name !== 'string' || !payload.first_name.trim()) {
        return NextResponse.json({ error: '名為必填欄位' }, { status: 400 });
      }
      updates.first_name = payload.first_name.trim();
    }

    if (hasOwn('last_name')) {
      if (typeof payload.last_name !== 'string' || !payload.last_name.trim()) {
        return NextResponse.json({ error: '姓為必填欄位' }, { status: 400 });
      }
      updates.last_name = payload.last_name.trim();
    }

    if (hasOwn('title')) {
      const title = payload.title;
      const validTitles = ['Student', 'Teacher', 'Null'];
      if (title === null || title === '') {
        updates.title = null;
      } else if (typeof title !== 'string' || !validTitles.includes(title)) {
        return NextResponse.json({ error: '無效的身份選項' }, { status: 400 });
      } else {
        updates.title = title;
      }
    }

    if (hasOwn('day_of_birth')) {
      const dayOfBirth = payload.day_of_birth;
      if (dayOfBirth === null || dayOfBirth === '') {
        updates.day_of_birth = null;
      } else if (typeof dayOfBirth !== 'string' || isNaN(Date.parse(dayOfBirth))) {
        return NextResponse.json({ error: '無效的日期格式' }, { status: 400 });
      } else {
        updates.day_of_birth = dayOfBirth;
      }
    }

    if (hasOwn('theme_preference')) {
      if (!isThemePreference(payload.theme_preference)) {
        return NextResponse.json({ error: '無效的主題偏好' }, { status: 400 });
      }
      updates.theme_preference = payload.theme_preference;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: '未提供可更新欄位' }, { status: 400 });
    }

    updates.updated_at = new Date().toISOString();

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
