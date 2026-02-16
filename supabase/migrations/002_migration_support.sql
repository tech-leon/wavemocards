-- ============================================
-- Migration Support Schema
-- Version: 1.0.0
-- Description: Add legacy user tracking for MySQL → Supabase migration
-- ============================================

-- Add legacy_user_id column to profiles for tracking migrated users
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS legacy_user_id INT UNIQUE;

-- Add legacy_username column for reference
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS legacy_username TEXT;

-- Add comment
COMMENT ON COLUMN profiles.legacy_user_id IS 'Original MySQL userID for migrated users';
COMMENT ON COLUMN profiles.legacy_username IS 'Original MySQL userName for migrated users';

-- Create index for legacy user lookup (used during WorkOS re-registration matching)
CREATE INDEX IF NOT EXISTS idx_profiles_legacy_user ON profiles(legacy_user_id) WHERE legacy_user_id IS NOT NULL;

-- Add legacy_emo_id column to emotion_records for tracking
ALTER TABLE emotion_records ADD COLUMN IF NOT EXISTS legacy_emo_id INT UNIQUE;

COMMENT ON COLUMN emotion_records.legacy_emo_id IS 'Original MySQL emoID for migrated records';
