import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// Environment variables - support both naming conventions
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Flag to track if Supabase is configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Warn about missing environment variables (don't throw)
if (!supabaseUrl) {
  console.warn('Missing SUPABASE_URL environment variable - Supabase features will not work');
}

if (!supabaseAnonKey) {
  console.warn('Missing SUPABASE_ANON_KEY environment variable - Supabase features will not work');
}

if (!supabaseServiceRoleKey) {
  console.warn('Missing SUPABASE_SERVICE_ROLE_KEY - admin functions will not work');
}

/**
 * Create a Supabase client with the anon key for public table reads.
 * Suitable for: emotion_categories, emotion_cards, about_emotions.
 */
export function createAnonClient(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured) {
    console.warn('Supabase is not configured - returning null');
    return null;
  }
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });
}

/**
 * Create a Supabase admin client using the service role key (bypasses RLS).
 * Only use for operations that genuinely require elevated privileges:
 * - Profile creation/sync (user doesn't exist yet in Supabase)
 * - Middleware locale lookups
 */
export function createAdminClient(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured || !supabaseServiceRoleKey) {
    console.warn('Supabase is not configured - returning null');
    return null;
  }
  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Create a user-scoped Supabase client using a WorkOS access token.
 * Supabase verifies the token via WorkOS's JWKS endpoint (third-party auth).
 * RLS policies can use auth.jwt() ->> 'sub' to enforce ownership.
 */
export function createUserClient(accessToken: string): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured) {
    console.warn('Supabase is not configured - returning null');
    return null;
  }
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    accessToken: async () => accessToken,
  });
}
