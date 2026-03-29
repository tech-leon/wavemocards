-- ============================================
-- Update RLS policies for WorkOS third-party auth
-- ============================================
-- The previous migration (20260330_enforce_rls_policies.sql) used auth.uid()
-- which casts the JWT sub claim to UUID. WorkOS user IDs are strings
-- (e.g. "user_01XXXX"), not UUIDs, so auth.uid() fails.
--
-- This migration replaces auth.uid() with auth.jwt() ->> 'sub',
-- matching against profiles.workos_user_id for ownership enforcement.
--
-- Prerequisites:
--   1. Supabase Dashboard: Authentication > Third-party Auth > WorkOS enabled
--   2. WorkOS Dashboard: JWT Template includes { "role": "authenticated" }
-- ============================================

-- =====================
-- profiles table
-- =====================
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Authenticated users can only see their own profile
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT TO authenticated
    USING (workos_user_id = (auth.jwt() ->> 'sub'));

-- Profile creation uses admin client (bypasses RLS), but this policy
-- prevents any authenticated user from inserting a profile for someone else
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT TO authenticated
    WITH CHECK (workos_user_id = (auth.jwt() ->> 'sub'));

-- Authenticated users can only update their own profile
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE TO authenticated
    USING (workos_user_id = (auth.jwt() ->> 'sub'));

-- =====================
-- emotion_records table
-- =====================
DROP POLICY IF EXISTS "Users can view own records" ON emotion_records;
DROP POLICY IF EXISTS "Users can insert own records" ON emotion_records;
DROP POLICY IF EXISTS "Users can update own records" ON emotion_records;
DROP POLICY IF EXISTS "Users can delete own records" ON emotion_records;

-- Authenticated users can only see their own records
CREATE POLICY "Users can view own records" ON emotion_records
    FOR SELECT TO authenticated
    USING (
        user_id IN (
            SELECT id FROM profiles
            WHERE workos_user_id = (auth.jwt() ->> 'sub')
        )
    );

-- Authenticated users can only create records for themselves
CREATE POLICY "Users can insert own records" ON emotion_records
    FOR INSERT TO authenticated
    WITH CHECK (
        user_id IN (
            SELECT id FROM profiles
            WHERE workos_user_id = (auth.jwt() ->> 'sub')
        )
    );

-- Authenticated users can only update their own records
CREATE POLICY "Users can update own records" ON emotion_records
    FOR UPDATE TO authenticated
    USING (
        user_id IN (
            SELECT id FROM profiles
            WHERE workos_user_id = (auth.jwt() ->> 'sub')
        )
    );

-- Authenticated users can only delete their own records
CREATE POLICY "Users can delete own records" ON emotion_records
    FOR DELETE TO authenticated
    USING (
        user_id IN (
            SELECT id FROM profiles
            WHERE workos_user_id = (auth.jwt() ->> 'sub')
        )
    );

-- Public tables (emotion_categories, emotion_cards, about_emotions) are unchanged.
