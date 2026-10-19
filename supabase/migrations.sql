-- StartupRival: Complete Platform Schema (Phases 1, 2, and 3)

-- ==========================================================
-- PHASE 1 TABLES
-- ==========================================================

-- TABLE 1: profiles (Extended profile linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 2: market_gap_results
CREATE TABLE IF NOT EXISTS market_gap_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  sector TEXT NOT NULL,
  region TEXT NOT NULL,
  gap_summary TEXT NOT NULL,
  demand_score INTEGER CHECK (demand_score >= 0 AND demand_score <= 100),
  sources_used TEXT[],
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 3: search_cache (Caches agent results for < 24h)
CREATE TABLE IF NOT EXISTS search_cache (
  query_hash TEXT PRIMARY KEY,
  result_json JSONB NOT NULL,
  source TEXT DEFAULT 'live',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 4: saved_ideas
CREATE TABLE IF NOT EXISTS saved_ideas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  gap_id UUID REFERENCES market_gap_results(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================================
-- PHASE 2 TABLES: The Actionable Startup Roadmap
-- ==========================================================

-- TABLE 5: roadmap_templates
CREATE TABLE IF NOT EXISTS roadmap_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sector TEXT NOT NULL UNIQUE,
  licenses_needed TEXT[] NOT NULL,
  govt_schemes TEXT[] NOT NULL,
  capital_min_inr INTEGER,
  capital_max_inr INTEGER,
  land_required BOOLEAN DEFAULT FALSE,
  registration_urls JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 6: competitor_data
CREATE TABLE IF NOT EXISTS competitor_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sector TEXT NOT NULL,
  cities_present TEXT[],
  gap_cities TEXT[],
  funding_stage TEXT,
  founded_year INTEGER,
  source_url TEXT,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 7: user_progress
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  gap_id UUID REFERENCES market_gap_results(id) ON DELETE CASCADE,
  stage TEXT CHECK (stage IN ('found','validated','kit_generated','ready')) DEFAULT 'found',
  completed_tasks TEXT[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================================
-- PHASE 3 TABLES: The Full Platform
-- ==========================================================

-- TABLE 8: funding_sources
CREATE TABLE IF NOT EXISTS funding_sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('grant','angel','vc','accelerator')) NOT NULL,
  sectors TEXT[] NOT NULL,
  ticket_size TEXT NOT NULL,
  eligibility TEXT NOT NULL,
  stages_supported TEXT[] DEFAULT '{"idea","mvp"}',
  apply_url TEXT NOT NULL,
  region_focus TEXT DEFAULT 'pan-india'
);

-- TABLE 9: posts (Community)
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  author_name TEXT DEFAULT 'Founder',
  type TEXT CHECK (type IN ('question','idea','success','resource')) NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  sector TEXT,
  region TEXT,
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 10: comments
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  author_name TEXT DEFAULT 'Founder',
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 11: notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS across all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_gap_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmap_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitor_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE funding_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Public read access for knowledge tables
CREATE POLICY "Public read on roadmap_templates" ON roadmap_templates FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Public read on competitor_data" ON competitor_data FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Public read on funding_sources" ON funding_sources FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Public read on posts" ON posts FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Public read on comments" ON comments FOR SELECT TO authenticated, anon USING (true);

-- User-scoped policies
CREATE POLICY "Users read own progress" ON user_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users modify own progress" ON user_progress FOR ALL TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users read own notifications" ON notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users update own notifications" ON notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);
