-- ============================================
-- Enforce RLS ownership policies
-- ============================================
-- Previously all policies used USING (true) / WITH CHECK (true),
-- relying entirely on application code for ownership enforcement.
-- This migration tightens the policies so the database itself
-- enforces row-level ownership via auth.uid() (the JWT sub claim).
--
-- NOTE: Service role client bypasses RLS, so this does not affect
-- the current application code which uses the admin client.
--
-- NEXT STEP: When WorkOS third-party auth is integrated with Supabase,
-- these policies should be updated to use auth.jwt() ->> 'sub'
-- instead of auth.uid(), because WorkOS user IDs are not UUIDs.
-- See: 20260330_workos_rls_policies.sql (pending)
-- ============================================

-- =====================
-- profiles table
-- =====================
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT
    USING (id = auth.uid());

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT
    WITH CHECK (id = auth.uid());

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE
    USING (id = auth.uid());

-- =====================
-- emotion_records table
-- =====================
DROP POLICY IF EXISTS "Users can view own records" ON emotion_records;
DROP POLICY IF EXISTS "Users can insert own records" ON emotion_records;
DROP POLICY IF EXISTS "Users can update own records" ON emotion_records;
DROP POLICY IF EXISTS "Users can delete own records" ON emotion_records;

CREATE POLICY "Users can view own records" ON emotion_records
    FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Users can insert own records" ON emotion_records
    FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own records" ON emotion_records
    FOR UPDATE
    USING (user_id = auth.uid());

CREATE POLICY "Users can delete own records" ON emotion_records
    FOR DELETE
    USING (user_id = auth.uid());

-- Public tables (emotion_categories, emotion_cards, about_emotions) are unchanged.
-- Their SELECT USING (true) policies remain correct for public read access.
