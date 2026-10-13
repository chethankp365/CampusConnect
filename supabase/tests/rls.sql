-- =====================================================================
-- CAMPUS CONNECT: RLS VERIFICATION TEST SUITE
-- Tests that Row Level Security strictly isolates student attendance
-- and prevents non-admins from approving study materials.
-- =====================================================================

BEGIN;

-- 1. Setup Test Users
-- Create User A (Student 1) and User B (Student 2) in auth.users
INSERT INTO auth.users (id, email) VALUES
  ('11111111-1111-1111-1111-111111111111', 'student1@rvce.edu.in'),
  ('22222222-2222-2222-2222-222222222222', 'student2@bmsce.ac.in')
ON CONFLICT (id) DO NOTHING;

INSERT INTO profiles (id, full_name, username, role) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Aarav Sharma', 'aarav_rvce', 'student'),
  ('22222222-2222-2222-2222-222222222222', 'Priya Rao', 'priya_bms', 'student')
ON CONFLICT (id) DO NOTHING;

-- User A creates an attendance subject & log
SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claim.sub" TO '11111111-1111-1111-1111-111111111111';

INSERT INTO attendance_subjects (id, user_id, name, code)
VALUES ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Operating Systems', 'CS403');

INSERT INTO attendance_logs (subject_id, user_id, date, status)
VALUES ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', CURRENT_DATE, 'present');

-- User A creates a pending study material
INSERT INTO study_materials (id, title, description, uploader_id, status)
VALUES ('44444444-4444-4444-4444-444444444444', 'OS Kernel Notes', 'Handwritten notes', '11111111-1111-1111-1111-111111111111', 'pending');

-- 2. TEST: User B attempts to read User A's attendance records
SET LOCAL "request.jwt.claim.sub" TO '22222222-2222-2222-2222-222222222222';

DO $$
DECLARE
  v_count INT;
BEGIN
  SELECT COUNT(*) INTO v_count FROM attendance_subjects WHERE user_id = '11111111-1111-1111-1111-111111111111';
  IF v_count > 0 THEN
    RAISE EXCEPTION 'TEST FAILED: Student B was able to read Student A attendance subjects!';
  END IF;

  SELECT COUNT(*) INTO v_count FROM attendance_logs WHERE user_id = '11111111-1111-1111-1111-111111111111';
  IF v_count > 0 THEN
    RAISE EXCEPTION 'TEST FAILED: Student B was able to read Student A attendance logs!';
  END IF;

  RAISE NOTICE 'SUCCESS: Attendance RLS isolation verified (0 rows visible to third parties)';
END $$;

-- 3. TEST: User B attempts to read pending material of User A (should be invisible)
DO $$
DECLARE
  v_count INT;
BEGIN
  SELECT COUNT(*) INTO v_count FROM study_materials WHERE id = '44444444-4444-4444-4444-444444444444';
  IF v_count > 0 THEN
    RAISE EXCEPTION 'TEST FAILED: Student B was able to see Student A pending material!';
  END IF;
  RAISE NOTICE 'SUCCESS: Pending study materials hidden from other students';
END $$;

-- 4. TEST: User B attempts to approve User A's material (unauthorized)
DO $$
DECLARE
  v_updated INT;
BEGIN
  UPDATE study_materials SET status = 'approved' WHERE id = '44444444-4444-4444-4444-444444444444';
  GET DIAGNOSTICS v_updated = ROW_COUNT;
  IF v_updated > 0 THEN
    RAISE EXCEPTION 'TEST FAILED: Student was able to approve study material!';
  END IF;
  RAISE NOTICE 'SUCCESS: Material moderation RLS verified (students cannot approve materials)';
END $$;

ROLLBACK;
