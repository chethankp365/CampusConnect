-- 3. Functions, Triggers, Views and Row Level Security
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

CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_organizer() RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role IN ('organizer', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION calculate_level(xp_val INT) RETURNS INT AS $$
BEGIN
  RETURN FLOOR(SQRT(GREATEST(0, xp_val) / 50.0)) + 1;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

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

    IF new_xp >= 100 THEN
      INSERT INTO user_badges(user_id, badge_id)
      SELECT target_user, id FROM badges WHERE slug = 'early_bird'
      ON CONFLICT DO NOTHING;
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

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
