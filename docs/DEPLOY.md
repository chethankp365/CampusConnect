# Campus Connect - Vercel & Production Deployment Guide

## 1. Environment Variables Matrix

| Variable Name | Description | Where to Get | Target Scope |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project API URL | Supabase Dashboard > Settings > API | Public (Browser & Server) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anonymous Client Key | Supabase Dashboard > Settings > API | Public (Browser & Server) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Admin Service Key | Supabase Dashboard > Settings > API | **Server-Only (SECRET)** |
| `GEMINI_API_KEY` | Google Gemini AI Key | [aistudio.google.com](https://aistudio.google.com) | **Server-Only (SECRET)** |
| `GEMINI_MODEL` | Flash model identifier (`gemini-1.5-flash` or `gemini-2.5-flash`) | Google AI Studio documentation | Server-Only |
| `GEMINI_EMBEDDING_MODEL` | Embedding model (`text-embedding-004`) | Google AI Studio documentation | Server-Only |
| `NEXT_PUBLIC_SITE_URL` | Production site URL (e.g., `https://campusconnect.vercel.app`) | Vercel Project Settings | Public |
| `CRON_SECRET` | Secret token for automated event reminder crons | Any random 32-character string | Server-Only |
| `RESEND_API_KEY` | Optional email transactional provider key | [resend.com](https://resend.com) | Server-Only (Optional) |

## 2. Supabase Production Settings
1. **Database Extensions**: Ensure `vector`, `pg_trgm`, `pgcrypto`, and `unaccent` are active.
2. **Execute Database Setup**: Paste `supabase/setup.sql` in Supabase SQL Editor and execute.
3. **Execute Seed Data**: Paste `supabase/seed.sql` to populate Bengaluru colleges, 120+ skills, and badges.
4. **Auth Configuration**:
   - Set **Site URL** to `https://your-vercel-domain.vercel.app`
   - Add Redirect URLs:
     - `https://your-vercel-domain.vercel.app/**`
     - `http://localhost:3000/**`
5. **Storage Buckets**: Confirm that `avatars`, `event-banners`, `materials`, and `announcement-files` are created with RLS enabled.

## 3. Vercel Deployment Steps
1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "feat: complete Campus Connect production release"
   git remote add origin https://github.com/YOUR_USERNAME/campus-connect.git
   git push -u origin main
   ```
2. Log into [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `campus-connect` repository.
4. Expand the **Environment Variables** section and add all keys from Section 1 above.
5. Click **Deploy**. Vercel will run `npm run build` and provision your globally distributed edge site.

## 4. Smoke Test Checklist
- [ ] **Landing Page**: Mouse scrubs background video; blurred intro label, typewriter, and action pills display cleanly.
- [ ] **3D Chrome Globe**: Orbiting node mesh and glow lights render at 60fps.
- [ ] **Auth Flow**: Sign up with college email auto-detects college and routes to onboarding.
- [ ] **Onboarding Wizard**: 5 steps complete smoothly; awards Pioneer Badge + 25 starter XP.
- [ ] **Bento Dashboard**: Streak flame glows; daily check-in modal triggers confetti.
- [ ] **Study Materials**: Search and filter by semester; detail drawer shows Gemini AI summary.
- [ ] **Events & QR Code**: Registration issues cryptographic digital QR ticket; `/verify/[code]` authenticates certificate.
- [ ] **Skill Match**: Natural language query parses required roles; ranks teammates using cosine similarity.
- [ ] **Leaderboard**: 3D podium highlights Top 3; Recharts XP curve reflects daily momentum.
- [ ] **N.O.V.A Assistant**: Streams grounded answers from database records without hallucinations.
- [ ] **Attendance Guardian**: "Can I bunk?" math matches manual calculations; owner-only RLS guarantees privacy.
- [ ] **Administration**: Analytics graphs render; pending notes can be approved or rejected.

## 5. Rollback & Monitoring
- In Vercel Dashboard > Deployments, instant 1-click rollback is available for any prior immutable deployment.
