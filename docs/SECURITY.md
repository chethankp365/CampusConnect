# Security Audit & Defense Architecture Report

## 1. Secrets Isolation & Zero-Leakage Guarantee
- `SUPABASE_SERVICE_ROLE_KEY` and `GEMINI_API_KEY` are strictly server-only environment variables.
- Verified that neither secret is prefixed with `NEXT_PUBLIC_`.
- Implemented an active import runtime guard in `src/lib/supabase/admin.ts` and `src/lib/gemini/client.ts` which immediately throws an unrecoverable exception if imported in any client/browser context.

## 2. Row Level Security (RLS) Policies
- All 25+ database tables have RLS enabled:
  - `attendance_subjects` and `attendance_logs`: Strictly owner-only (`auth.uid() = user_id`). No other student, organizer, or AI context can access a peer's private attendance records.
  - `messages`: Strictly conversation members only.
  - `points_ledger`: Read-own only. Client direct inserts are prohibited; XP is minted solely by `award_points()` PostgreSQL SECURITY DEFINER function with daily rate caps.
  - `study_materials`: Unapproved documents visible only to the uploader and platform moderators.
  - `announcements`: Filtered strictly by college, branch, and semester tags.

## 3. Rate Limiting & Anti-Abuse
- Daily XP caps enforced at database function level (max 20 XP from upvotes/day, max 10 XP daily check-in).
- Self-voting and duplicate check-in prevention.
- Attendance modification limited to current enrolled terms.

## 4. Input Sanitization & Integrity
- All AI inputs to N.O.V.A are processed server-side with strict system prompt grounding to avoid prompt injection.
- URL parameters and uploaded metadata validated with Zod schemas.
