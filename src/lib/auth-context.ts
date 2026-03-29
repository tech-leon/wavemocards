import type { SupabaseClient } from '@supabase/supabase-js';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { getTranslations } from 'next-intl/server';
import { getRequestLocale } from '@/lib/i18n/request';
import { createUserClient } from '@/lib/supabase';
import type { Database } from '@/types/database';
import type { Locale } from '@/lib/i18n/locale';

type AuthContextSuccess = {
  ok: true;
  profileId: string;
  workosUserId: string;
  email: string;
  supabase: SupabaseClient<Database>;
  locale: Locale;
};

type AuthContextError = {
  ok: false;
  error: string;
  status: number;
};

export type AuthContextResult = AuthContextSuccess | AuthContextError;

/**
 * Consolidated auth helper for API routes and server actions.
 *
 * Handles the full auth pipeline in one call:
 * 1. Verify WorkOS authentication and get the access token
 * 2. Create a user-scoped Supabase client (WorkOS JWT verified by Supabase via JWKS)
 * 3. Look up the user's profile ID
 *
 * RLS enforcement: the WorkOS access token is passed directly to Supabase.
 * Supabase verifies it via WorkOS's JWKS endpoint, and RLS policies use
 * auth.jwt() ->> 'sub' to enforce ownership.
 *
 * Returns a discriminated union so callers can pattern-match:
 *   const ctx = await withAuthContext();
 *   if (!ctx.ok) return NextResponse.json({ error: ctx.error }, { status: ctx.status });
 *   const { profileId, supabase, locale } = ctx;
 */
export async function withAuthContext(): Promise<AuthContextResult> {
  const locale = (await getRequestLocale()) as Locale;
  const tCommon = await getTranslations({ locale, namespace: 'apiErrors.common' });
  const tProfile = await getTranslations({ locale, namespace: 'apiErrors.profile' });

  // 1. Verify WorkOS auth and get access token
  let user;
  let accessToken: string | undefined;
  try {
    const auth = await withAuth();
    user = auth.user;
    accessToken = auth.accessToken;
  } catch {
    return { ok: false, error: tCommon('unauthorized'), status: 401 };
  }

  if (!user || !accessToken) {
    return { ok: false, error: tCommon('unauthorized'), status: 401 };
  }

  // 2. Create user-scoped client (WorkOS JWT → Supabase verifies via JWKS)
  const supabase = createUserClient(accessToken);
  if (!supabase) {
    return { ok: false, error: tCommon('databaseNotConfigured'), status: 500 };
  }

  // 3. Look up profile (through RLS — the JWT sub matches workos_user_id)
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('workos_user_id', user.id)
    .single();

  if (profileError || !profile) {
    return { ok: false, error: tProfile('notFound'), status: 404 };
  }

  return {
    ok: true,
    profileId: profile.id,
    workosUserId: user.id,
    email: user.email,
    supabase,
    locale,
  };
}
