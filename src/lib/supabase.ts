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
 * Supabase client for client-side usage
 * Uses anon key with RLS policies
 */
export const supabase = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false, // We use WorkOS for auth
      },
    })
  : (null as unknown as SupabaseClient<Database>);

/**
 * Supabase admin client for server-side usage
 * Uses service role key to bypass RLS
 * WARNING: Only use in server-side code (API routes, Server Actions)
 */
export const supabaseAdmin = isSupabaseConfigured && supabaseServiceRoleKey
  ? createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : (null as unknown as SupabaseClient<Database>);

/**
 * Create a Supabase client for server-side usage
 * This is useful for Server Components and Server Actions
 */
export function createServerClient(): SupabaseClient<Database> | null {
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
 * Create a Supabase client for client-side usage
 * This is useful for Client Components
 */
export function createBrowserClient(): SupabaseClient<Database> | null {
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
