-- 1. Initial Schema Migration
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";
CREATE EXTENSION IF NOT EXISTS "vector";

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

CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT,
  branch TEXT,
  semester INT,
  created_at TIMESTAMPTZ DEFAULT now()
);
