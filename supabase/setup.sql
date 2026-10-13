-- =====================================================================
-- CAMPUS CONNECT: Comprehensive Database Schema, Functions, RLS & RPCs
-- =====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 2. ENUMS
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('student', 'organizer', 'admin');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE material_type AS ENUM ('notes', 'question_paper', 'assignment', 'syllabus', 'cheatsheet', 'project_report');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE content_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE event_category AS ENUM ('hackathon', 'workshop', 'cultural', 'tech_talk', 'symposium', 'competition', 'webinar');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE event_mode AS ENUM ('in_person', 'online', 'hybrid');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE registration_status AS ENUM ('registered', 'waitlisted', 'cancelled');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE opportunity_type AS ENUM ('internship', 'full_time', 'hackathon', 'research', 'freelance', 'fellowship');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE connection_status AS ENUM ('pending', 'accepted', 'declined', 'blocked');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'cancelled');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE application_status AS ENUM ('saved', 'applied', 'interview', 'offer', 'rejected');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE skill_level AS ENUM ('beginner', 'intermediate', 'advanced');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE announcement_priority AS ENUM ('low', 'medium', 'high', 'urgent');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. TABLES

-- Colleges Table
CREATE TABLE IF NOT EXISTS colleges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  email_domain TEXT UNIQUE,
  logo_url TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Profiles Table (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  college_id UUID REFERENCES colleges(id) ON DELETE SET NULL,
  course TEXT,
  branch TEXT,
  semester INT,
  bio TEXT,
  interests TEXT[] DEFAULT '{}',
  looking_for TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  role user_role DEFAULT 'student',
  is_mentor BOOLEAN DEFAULT FALSE,
  is_alumni BOOLEAN DEFAULT FALSE,
  xp INT DEFAULT 0,
  level INT DEFAULT 1,
  streak_count INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  last_active_date DATE DEFAULT CURRENT_DATE,
  is_public BOOLEAN DEFAULT TRUE,
  embedding vector(768),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Skills & Profile Skills
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profile_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  level skill_level DEFAULT 'intermediate',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(profile_id, skill_id)
);

-- Subjects Table
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT,
  branch TEXT,
  semester INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Study Materials
CREATE TABLE IF NOT EXISTS study_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
  college_id UUID REFERENCES colleges(id) ON DELETE SET NULL,
  semester INT,
  type material_type DEFAULT 'notes',
  file_path TEXT,
  external_url TEXT,
  tags TEXT[] DEFAULT '{}',
  ai_summary TEXT,
  uploader_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status content_status DEFAULT 'pending',
  downloads INT DEFAULT 0,
  upvotes INT DEFAULT 0,
  search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '') || ' ' || array_to_string(tags, ' '))
  ) STORED,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS material_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id UUID NOT NULL REFERENCES study_materials(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(material_id, user_id)
);

CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  material_id UUID NOT NULL REFERENCES study_materials(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, material_id)
);

-- Events & Certificates
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  organizer UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  club TEXT,
  college_id UUID REFERENCES colleges(id) ON DELETE SET NULL,
  category event_category NOT NULL DEFAULT 'hackathon',
  mode event_mode NOT NULL DEFAULT 'in_person',
  venue TEXT,
  online_link TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  registration_deadline TIMESTAMPTZ NOT NULL,
  eligibility TEXT,
  capacity INT NOT NULL DEFAULT 100,
  tags TEXT[] DEFAULT '{}',
  banner_path TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status registration_status DEFAULT 'registered',
  qr_token TEXT NOT NULL UNIQUE,
  checked_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(event_id, user_id)
);

CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, event_id)
);

-- Announcements
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  priority announcement_priority DEFAULT 'medium',
  pinned BOOLEAN DEFAULT FALSE,
  publisher UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  audience_college UUID REFERENCES colleges(id) ON DELETE SET NULL,
  audience_branch TEXT,
  audience_semester INT,
  attachment_path TEXT,
  expires_at TIMESTAMPTZ,
  ai_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS announcement_reads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  announcement_id UUID NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  read_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(announcement_id, user_id)
);

-- Opportunities
CREATE TABLE IF NOT EXISTS opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  type opportunity_type DEFAULT 'internship',
  description TEXT NOT NULL,
  skills_required TEXT[] DEFAULT '{}',
  eligibility TEXT,
  location TEXT,
  mode event_mode DEFAULT 'in_person',
  stipend TEXT,
  deadline TIMESTAMPTZ NOT NULL,
  apply_url TEXT,
  posted_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS opportunity_tracker (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  status application_status DEFAULT 'saved',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, opportunity_id)
);

-- Connections & Chats
CREATE TABLE IF NOT EXISTS connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status connection_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(requester_id, receiver_id)
);

CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  is_group BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS conversation_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(conversation_id, user_id)
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Collab Posts
CREATE TABLE IF NOT EXISTS collab_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  skills_needed TEXT[] DEFAULT '{}',
  team_size INT DEFAULT 4,
  current_size INT DEFAULT 1,
  is_open BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS collab_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collab_id UUID NOT NULL REFERENCES collab_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT,
  status connection_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(collab_id, user_id)
);

-- Attendance Guardian
CREATE TABLE IF NOT EXISTS attendance_subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT,
  color TEXT DEFAULT '#4FE3FF',
  min_required INT DEFAULT 75,
  is_archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS attendance_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES attendance_subjects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status attendance_status NOT NULL DEFAULT 'present',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(subject_id, date)
);

-- Points Ledger & Gamification
CREATE TABLE IF NOT EXISTS points_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  points INT NOT NULL,
  ref_type TEXT,
  ref_id UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  criteria JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  awarded_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  link TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- AI Assistant
CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'New Conversation',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  tool_calls JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS content_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  content TEXT NOT NULL,
  embedding vector(768),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Role Requests, Reports, Audit Logs
CREATE TABLE IF NOT EXISTS role_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  requested_role user_role NOT NULL,
  reason TEXT NOT NULL,
  status content_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  reason TEXT NOT NULL,
  status content_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS saved_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  filters JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. VIEWS
CREATE OR REPLACE VIEW attendance_summary AS
WITH counts AS (
  SELECT
    s.id AS subject_id,
    s.user_id,
    s.name,
    s.code,
    s.color,
    s.min_required,
    COUNT(l.id) FILTER (WHERE l.status != 'cancelled') AS total_classes,
    COUNT(l.id) FILTER (WHERE l.status = 'present') AS attended_classes
  FROM attendance_subjects s
  LEFT JOIN attendance_logs l ON s.id = l.subject_id
  WHERE s.is_archived = FALSE
  GROUP BY s.id, s.user_id, s.name, s.code, s.color, s.min_required
)
SELECT
  subject_id,
  user_id,
  name,
  code,
  color,
  min_required,
  total_classes,
  attended_classes,
  CASE 
    WHEN total_classes = 0 THEN 100.0
    ELSE ROUND((attended_classes::numeric / total_classes::numeric) * 100, 1)
  END AS percentage,
  CASE 
    WHEN total_classes = 0 THEN 0
    WHEN (attended_classes::numeric / total_classes::numeric) >= (min_required::numeric / 100.0) THEN
      FLOOR((attended_classes::numeric * 100.0 / min_required::numeric) - total_classes::numeric)::int
    ELSE 0
  END AS classes_can_bunk,
  CASE
    WHEN total_classes = 0 THEN 0
    WHEN (attended_classes::numeric / total_classes::numeric) < (min_required::numeric / 100.0) THEN
      CEIL(((min_required::numeric * total_classes::numeric) - (100.0 * attended_classes::numeric)) / (100.0 - min_required::numeric))::int
    ELSE 0
  END AS classes_needed
FROM counts;

-- 5. HELPER FUNCTIONS & TRIGGERS

-- Check if user is admin
CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is organizer or admin
CREATE OR REPLACE FUNCTION is_organizer() RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role IN ('organizer', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Calculate level from XP: level = floor(sqrt(xp / 100)) + 1
CREATE OR REPLACE FUNCTION calculate_level(xp_val INT) RETURNS INT AS $$
BEGIN
  RETURN FLOOR(SQRT(GREATEST(0, xp_val) / 50.0)) + 1;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Award points with anti-abuse daily caps
CREATE OR REPLACE FUNCTION award_points(
  target_user UUID,
  action_name TEXT,
  points_to_give INT,
  p_ref_type TEXT DEFAULT NULL,
  p_ref_id UUID DEFAULT NULL
) RETURNS VOID AS $$
DECLARE
  today_points INT;
  cap INT := 100;
  actual_points INT;
  new_xp INT;
  new_lvl INT;
BEGIN
  IF action_name = 'upvote_received' THEN
    cap := 20;
  ELSIF action_name = 'daily_checkin' THEN
    cap := 10;
  END IF;

  SELECT COALESCE(SUM(points), 0) INTO today_points
  FROM points_ledger
  WHERE user_id = target_user 
    AND action = action_name 
    AND created_at::date = CURRENT_DATE;

  IF today_points + points_to_give > cap THEN
    actual_points := GREATEST(0, cap - today_points);
  ELSE
    actual_points := points_to_give;
  END IF;

  IF actual_points > 0 THEN
    INSERT INTO points_ledger(user_id, action, points, ref_type, ref_id)
    VALUES (target_user, action_name, actual_points, p_ref_type, p_ref_id);

    UPDATE profiles
    SET xp = xp + actual_points,
        level = calculate_level(xp + actual_points),
        updated_at = now()
    WHERE id = target_user
    RETURNING xp, level INTO new_xp, new_lvl;

    -- Award milestone badges
    IF new_xp >= 100 THEN
      INSERT INTO user_badges(user_id, badge_id)
      SELECT target_user, id FROM badges WHERE slug = 'early_bird'
      ON CONFLICT DO NOTHING;
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Daily check-in touch for streaks
CREATE OR REPLACE FUNCTION touch_daily_checkin() RETURNS JSONB AS $$
DECLARE
  v_uid UUID := auth.uid();
  v_last_active DATE;
  v_streak INT;
  v_longest INT;
  v_increased BOOLEAN := FALSE;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('error', 'Unauthorized');
  END IF;

  SELECT last_active_date, streak_count, longest_streak 
  INTO v_last_active, v_streak, v_longest
  FROM profiles WHERE id = v_uid;

  IF v_last_active IS NULL OR v_last_active < CURRENT_DATE THEN
    IF v_last_active = CURRENT_DATE - 1 THEN
      v_streak := v_streak + 1;
    ELSE
      v_streak := 1;
    END IF;

    IF v_streak > v_longest THEN
      v_longest := v_streak;
    END IF;

    UPDATE profiles
    SET streak_count = v_streak,
        longest_streak = v_longest,
        last_active_date = CURRENT_DATE,
        updated_at = now()
    WHERE id = v_uid;

    PERFORM award_points(v_uid, 'daily_checkin', 2, 'streak', NULL);
    v_increased := TRUE;

    -- Check streak badges
    IF v_streak >= 7 THEN
      INSERT INTO user_badges(user_id, badge_id)
      SELECT v_uid, id FROM badges WHERE slug = '7_day_streak'
      ON CONFLICT DO NOTHING;
    END IF;
    IF v_streak >= 30 THEN
      INSERT INTO user_badges(user_id, badge_id)
      SELECT v_uid, id FROM badges WHERE slug = '30_day_streak'
      ON CONFLICT DO NOTHING;
    END IF;
  END IF;

  RETURN jsonb_build_object(
    'streak', v_streak,
    'longest', v_longest,
    'awarded_today', v_increased
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Race-safe event registration with waitlist
CREATE OR REPLACE FUNCTION register_for_event(p_event_id UUID) RETURNS JSONB AS $$
DECLARE
  v_uid UUID := auth.uid();
  v_cap INT;
  v_reg_count INT;
  v_status registration_status;
  v_token TEXT;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('error', 'Unauthorized');
  END IF;

  SELECT capacity INTO v_cap FROM events WHERE id = p_event_id AND is_published = TRUE;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'Event not found or not published');
  END IF;

  SELECT COUNT(*) INTO v_reg_count 
  FROM event_registrations 
  WHERE event_id = p_event_id AND status = 'registered';

  IF v_reg_count < v_cap THEN
    v_status := 'registered';
  ELSE
    v_status := 'waitlisted';
  END IF;

  v_token := encode(gen_random_bytes(16), 'hex');

  INSERT INTO event_registrations (event_id, user_id, status, qr_token)
  VALUES (p_event_id, v_uid, v_status, v_token)
  ON CONFLICT (event_id, user_id) 
  DO UPDATE SET status = v_status, updated_at = now()
  RETURNING qr_token INTO v_token;

  IF v_status = 'registered' THEN
    PERFORM award_points(v_uid, 'event_registration', 5, 'events', p_event_id);
  END IF;

  RETURN jsonb_build_object('status', v_status, 'qr_token', v_token);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Vector matching for profiles
CREATE OR REPLACE FUNCTION match_profiles(
  query_embedding vector(768),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  username TEXT,
  avatar_url TEXT,
  branch TEXT,
  course TEXT,
  similarity float
)
LANGUAGE sql STABLE AS $$
  SELECT
    p.id,
    p.full_name,
    p.username,
    p.avatar_url,
    p.branch,
    p.course,
    1 - (p.embedding <=> query_embedding) AS similarity
  FROM profiles p
  WHERE p.embedding IS NOT NULL
    AND 1 - (p.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$;

-- Vector matching for content (RAG)
CREATE OR REPLACE FUNCTION match_content(
  query_embedding vector(768),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 6
)
RETURNS TABLE (
  id UUID,
  entity_type TEXT,
  entity_id UUID,
  content TEXT,
  similarity float
)
LANGUAGE sql STABLE AS $$
  SELECT
    c.id,
    c.entity_type,
    c.entity_id,
    c.content,
    1 - (c.embedding <=> query_embedding) AS similarity
  FROM content_embeddings c
  WHERE c.embedding IS NOT NULL
    AND 1 - (c.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$;

-- Global typo-tolerant search across all modules
CREATE OR REPLACE FUNCTION global_search(query_text TEXT)
RETURNS JSONB AS $$
DECLARE
  v_res JSONB;
BEGIN
  SELECT jsonb_build_object(
    'materials', (
      SELECT COALESCE(jsonb_agg(jsonb_build_object('id', id, 'title', title, 'type', type, 'semester', semester)), '[]'::jsonb)
      FROM study_materials
      WHERE status = 'approved' AND (title ILIKE '%' || query_text || '%' OR search_vector @@ plainto_tsquery('english', query_text))
      LIMIT 5
    ),
    'events', (
      SELECT COALESCE(jsonb_agg(jsonb_build_object('id', id, 'title', title, 'category', category, 'mode', mode, 'start_time', start_time)), '[]'::jsonb)
      FROM events
      WHERE is_published = TRUE AND (title ILIKE '%' || query_text || '%' OR description ILIKE '%' || query_text || '%')
      LIMIT 5
    ),
    'opportunities', (
      SELECT COALESCE(jsonb_agg(jsonb_build_object('id', id, 'title', title, 'organization', organization, 'type', type)), '[]'::jsonb)
      FROM opportunities
      WHERE is_active = TRUE AND (title ILIKE '%' || query_text || '%' OR organization ILIKE '%' || query_text || '%')
      LIMIT 5
    ),
    'students', (
      SELECT COALESCE(jsonb_agg(jsonb_build_object('id', id, 'full_name', full_name, 'username', username, 'avatar_url', avatar_url, 'branch', branch)), '[]'::jsonb)
      FROM profiles
      WHERE is_public = TRUE AND (full_name ILIKE '%' || query_text || '%' OR username ILIKE '%' || query_text || '%')
      LIMIT 5
    )
  ) INTO v_res;

  RETURN v_res;
END;
$$ LANGUAGE plpgsql STABLE;

-- Leaderboard RPC
CREATE OR REPLACE FUNCTION get_leaderboard(
  timeframe TEXT DEFAULT 'all_time',
  college_filter UUID DEFAULT NULL
)
RETURNS TABLE (
  rank BIGINT,
  user_id UUID,
  full_name TEXT,
  username TEXT,
  avatar_url TEXT,
  college_id UUID,
  college_name TEXT,
  score BIGINT,
  level INT,
  streak INT
) LANGUAGE sql STABLE AS $$
  SELECT
    ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(l.points), 0) DESC) AS rank,
    p.id AS user_id,
    p.full_name,
    p.username,
    p.avatar_url,
    p.college_id,
    c.name AS college_name,
    COALESCE(SUM(l.points), 0)::BIGINT AS score,
    p.level,
    p.streak_count AS streak
  FROM profiles p
  LEFT JOIN colleges c ON p.college_id = c.id
  LEFT JOIN points_ledger l ON p.id = l.user_id
    AND (
      timeframe = 'all_time' OR
      (timeframe = 'weekly' AND l.created_at >= date_trunc('week', now())) OR
      (timeframe = 'monthly' AND l.created_at >= date_trunc('month', now()))
    )
  WHERE (college_filter IS NULL OR p.college_id = college_filter)
  GROUP BY p.id, p.full_name, p.username, p.avatar_url, p.college_id, c.name, p.level, p.streak_count
  ORDER BY score DESC
  LIMIT 50;
$$;

-- 6. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcement_reads ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunity_tracker ENABLE ROW LEVEL SECURITY;
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE collab_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE collab_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE points_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Colleges: Read public, write admin
CREATE POLICY "Colleges readable by everyone" ON colleges FOR SELECT USING (true);
CREATE POLICY "Colleges editable by admin" ON colleges FOR ALL USING (is_admin());

-- Profiles: Authenticated read public, owner edit
CREATE POLICY "Profiles readable if public or authenticated" ON profiles 
  FOR SELECT USING (is_public = TRUE OR auth.uid() IS NOT NULL);
CREATE POLICY "Profiles updatable by owner" ON profiles 
  FOR UPDATE USING (auth.uid() = id);

-- Skills: Read all
CREATE POLICY "Skills readable by all" ON skills FOR SELECT USING (true);
CREATE POLICY "Profile skills editable by owner" ON profile_skills 
  FOR ALL USING (auth.uid() = profile_id);

-- Materials: Approved readable by all, pending readable by uploader and admins
CREATE POLICY "Materials readable when approved or uploader" ON study_materials
  FOR SELECT USING (status = 'approved' OR auth.uid() = uploader_id OR is_admin());
CREATE POLICY "Materials insertable by authenticated users" ON study_materials
  FOR INSERT WITH CHECK (auth.uid() = uploader_id);
CREATE POLICY "Materials updatable by uploader or admin" ON study_materials
  FOR UPDATE USING (auth.uid() = uploader_id OR is_admin());

-- Material votes & bookmarks: Owner only
CREATE POLICY "Votes readable by all" ON material_votes FOR SELECT USING (true);
CREATE POLICY "Votes manageable by owner" ON material_votes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Bookmarks manageable by owner" ON bookmarks FOR ALL USING (auth.uid() = user_id);

-- Events: Published readable by all, manageable by organizer
CREATE POLICY "Events readable" ON events FOR SELECT USING (is_published = TRUE OR organizer = auth.uid() OR is_admin());
CREATE POLICY "Events insertable by organizer" ON events FOR INSERT WITH CHECK (is_organizer());
CREATE POLICY "Events updatable by owner" ON events FOR UPDATE USING (organizer = auth.uid() OR is_admin());

-- Event Registrations: User can see own or event organizer can see
CREATE POLICY "Registrations readable by owner or event organizer" ON event_registrations
  FOR SELECT USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM events WHERE events.id = event_registrations.event_id AND events.organizer = auth.uid()));
CREATE POLICY "Registrations updatable by organizer for checkin" ON event_registrations
  FOR UPDATE USING (EXISTS (SELECT 1 FROM events WHERE events.id = event_registrations.event_id AND events.organizer = auth.uid()) OR auth.uid() = user_id);

-- Certificates: Publicly readable for verification
CREATE POLICY "Certificates readable by anyone" ON certificates FOR SELECT USING (true);

-- Announcements: Enforce audience or organizer
CREATE POLICY "Announcements readable" ON announcements FOR SELECT USING (
  publisher = auth.uid() OR is_admin() OR
  (audience_college IS NULL OR audience_college = (SELECT college_id FROM profiles WHERE id = auth.uid()))
);
CREATE POLICY "Announcements writable by organizer" ON announcements FOR ALL USING (is_organizer());

-- Opportunities: All active readable, organizer can write
CREATE POLICY "Opportunities readable" ON opportunities FOR SELECT USING (is_active = TRUE OR posted_by = auth.uid() OR is_admin());
CREATE POLICY "Opportunities writable by organizer" ON opportunities FOR ALL USING (is_organizer());
CREATE POLICY "Opportunity tracker owner only" ON opportunity_tracker FOR ALL USING (auth.uid() = user_id);

-- Connections: Participants only
CREATE POLICY "Connections readable by participants" ON connections 
  FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = receiver_id);
CREATE POLICY "Connections insertable by requester" ON connections 
  FOR INSERT WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Connections updatable by participants" ON connections 
  FOR UPDATE USING (auth.uid() = requester_id OR auth.uid() = receiver_id);

-- Conversations & Messages: Members only
CREATE POLICY "Conversations readable by members" ON conversations 
  FOR SELECT USING (EXISTS (SELECT 1 FROM conversation_members WHERE conversation_id = conversations.id AND user_id = auth.uid()));
CREATE POLICY "Conversation members readable by members" ON conversation_members 
  FOR SELECT USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM conversation_members cm WHERE cm.conversation_id = conversation_members.conversation_id AND cm.user_id = auth.uid()));
CREATE POLICY "Messages readable by members" ON messages 
  FOR SELECT USING (EXISTS (SELECT 1 FROM conversation_members WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()));
CREATE POLICY "Messages insertable by members" ON messages 
  FOR INSERT WITH CHECK (auth.uid() = sender_id AND EXISTS (SELECT 1 FROM conversation_members WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()));

-- Collab board: Readable by all, manageable by creator
CREATE POLICY "Collab posts readable" ON collab_posts FOR SELECT USING (true);
CREATE POLICY "Collab posts insertable" ON collab_posts FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Collab posts manageable" ON collab_posts FOR UPDATE USING (auth.uid() = creator_id);
CREATE POLICY "Collab requests manageable by requester or owner" ON collab_requests 
  FOR ALL USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM collab_posts WHERE collab_posts.id = collab_requests.collab_id AND collab_posts.creator_id = auth.uid()));

-- Attendance: STRICTLY OWNER-ONLY (Privacy guaranteed)
CREATE POLICY "Attendance subjects strictly owner only" ON attendance_subjects 
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Attendance logs strictly owner only" ON attendance_logs 
  FOR ALL USING (auth.uid() = user_id);

-- Points ledger & User Badges: Read own only, NO client direct inserts
CREATE POLICY "Points ledger read own only" ON points_ledger FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Badges readable by all" ON badges FOR SELECT USING (true);
CREATE POLICY "User badges read all" ON user_badges FOR SELECT USING (true);

-- Notifications: Owner only
CREATE POLICY "Notifications read and manage own" ON notifications FOR ALL USING (auth.uid() = user_id);

-- AI Conversations & Messages: Owner only
CREATE POLICY "AI conversations owner only" ON ai_conversations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "AI messages owner only" ON ai_messages FOR ALL USING (
  EXISTS (SELECT 1 FROM ai_conversations WHERE ai_conversations.id = ai_messages.conversation_id AND ai_conversations.user_id = auth.uid())
);

-- Content Embeddings: Read all
CREATE POLICY "Embeddings readable" ON content_embeddings FOR SELECT USING (true);
CREATE POLICY "Audit logs admin only" ON audit_log FOR SELECT USING (is_admin());

-- 7. STORAGE BUCKETS (Metadata configuration)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif']),
  ('event-banners', 'event-banners', true, 10485760, ARRAY['image/png', 'image/jpeg', 'image/webp']),
  ('materials', 'materials', false, 26214400, ARRAY['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'image/png', 'image/jpeg']),
  ('announcement-files', 'announcement-files', false, 15728640, ARRAY['application/pdf', 'image/png', 'image/jpeg'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;
