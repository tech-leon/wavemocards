-- ============================================
-- Wavemocards Database Schema
-- Version: 1.0.0
-- Description: Initial database schema for Wavemocards
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. Emotion Categories Table
-- ============================================
CREATE TABLE IF NOT EXISTS emotion_categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comment
COMMENT ON TABLE emotion_categories IS 'Emotion categories for classifying emotion cards';

-- ============================================
-- 2. Emotion Cards Table
-- ============================================
CREATE TABLE IF NOT EXISTS emotion_cards (
    id SERIAL PRIMARY KEY,
    category_id INT NOT NULL REFERENCES emotion_categories(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    description TEXT,
    example TEXT,
    image_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for category lookup
CREATE INDEX IF NOT EXISTS idx_emotion_cards_category ON emotion_cards(category_id);

-- Add comment
COMMENT ON TABLE emotion_cards IS 'Emotion cards with descriptions and examples';

-- ============================================
-- 3. About Emotions Table (Static content)
-- ============================================
CREATE TABLE IF NOT EXISTS about_emotions (
    id SERIAL PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comment
COMMENT ON TABLE about_emotions IS 'Educational content about emotions';

-- ============================================
-- 4. User Profiles Table
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workos_user_id TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    title TEXT,
    first_name TEXT,
    last_name TEXT,
    day_of_birth DATE,
    gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for WorkOS user lookup
CREATE INDEX IF NOT EXISTS idx_profiles_workos_user ON profiles(workos_user_id);

-- Add comment
COMMENT ON TABLE profiles IS 'User profile data (authentication handled by WorkOS)';

-- ============================================
-- 5. Emotion Records Table
-- ============================================
CREATE TABLE IF NOT EXISTS emotion_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    
    -- Story details
    story TEXT,
    reaction TEXT,
    results TEXT,
    feelings TEXT,
    expect TEXT,
    actions TEXT,
    
    -- Selected emotion cards (1-3 cards)
    card_1_id INT REFERENCES emotion_cards(id) ON DELETE SET NULL,
    card_2_id INT REFERENCES emotion_cards(id) ON DELETE SET NULL,
    card_3_id INT REFERENCES emotion_cards(id) ON DELETE SET NULL,
    
    -- Emotion levels before reflection (1-10 scale)
    before_level_1 INT CHECK (before_level_1 BETWEEN 1 AND 10),
    before_level_2 INT CHECK (before_level_2 BETWEEN 1 AND 10),
    before_level_3 INT CHECK (before_level_3 BETWEEN 1 AND 10),
    
    -- Emotion levels after reflection (1-10 scale)
    after_level_1 INT CHECK (after_level_1 BETWEEN 1 AND 10),
    after_level_2 INT CHECK (after_level_2 BETWEEN 1 AND 10),
    after_level_3 INT CHECK (after_level_3 BETWEEN 1 AND 10),
    
    -- Sharing settings
    is_shared BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for user records lookup
CREATE INDEX IF NOT EXISTS idx_emotion_records_user ON emotion_records(user_id);
CREATE INDEX IF NOT EXISTS idx_emotion_records_created ON emotion_records(created_at DESC);

-- Add comment
COMMENT ON TABLE emotion_records IS 'User emotion records with selected cards and story details';

-- ============================================
-- 6. Row Level Security (RLS) Policies
-- ============================================

-- Enable RLS on tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE emotion_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE emotion_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE emotion_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_emotions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT
    USING (true);  -- Will be restricted by application logic using WorkOS

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT
    WITH CHECK (true);  -- Controlled by application

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE
    USING (true);  -- Controlled by application

-- Emotion Records policies
CREATE POLICY "Users can view own records" ON emotion_records
    FOR SELECT
    USING (true);  -- Will be filtered by user_id in application

CREATE POLICY "Users can insert own records" ON emotion_records
    FOR INSERT
    WITH CHECK (true);  -- Controlled by application

CREATE POLICY "Users can update own records" ON emotion_records
    FOR UPDATE
    USING (true);  -- Controlled by application

CREATE POLICY "Users can delete own records" ON emotion_records
    FOR DELETE
    USING (true);  -- Controlled by application

-- Public read access for emotion cards and categories
CREATE POLICY "Anyone can view emotion categories" ON emotion_categories
    FOR SELECT
    USING (true);

CREATE POLICY "Anyone can view emotion cards" ON emotion_cards
    FOR SELECT
    USING (true);

CREATE POLICY "Anyone can view about emotions" ON about_emotions
    FOR SELECT
    USING (true);

-- ============================================
-- 7. Updated At Trigger Function
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to profiles
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to emotion_records
CREATE TRIGGER update_emotion_records_updated_at
    BEFORE UPDATE ON emotion_records
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to about_emotions
CREATE TRIGGER update_about_emotions_updated_at
    BEFORE UPDATE ON about_emotions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
