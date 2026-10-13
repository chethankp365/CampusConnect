# Architectural & Engineering Decisions Log

## 1. Project Scaffolding
- Selected Next.js App Router with TypeScript and Tailwind CSS as specified.
- Root layout with font definitions for Helvetica Now Display fallbacks and JetBrains Mono for HUD telemetry.
- Comprehensive database schema with 25+ relational tables, PostgreSQL triggers for automated XP and streak management, and strict Row Level Security (RLS) policies.

## 2. Retro-Futurist Theme
- Color palette implemented through CSS custom properties:
  - `--void`: `#07070D`
  - `--ink`: `#0A0A0F`
  - `--paper`: `#F4F1EA`
  - `--signal`: `#FF4D1C`
  - `--acid`: `#B6FF3B`
  - `--ultra`: `#5B5BFF`
  - `--cyan`: `#4FE3FF`
- CRT scanline & grain toggles implemented with lightweight SVG/CSS overlays to ensure 60fps performance.
- Motion optimized with `prefers-reduced-motion` fallbacks.

## 3. Database & RLS
- All tables enforce Row Level Security.
- Client cannot insert directly into `points_ledger` or `attendance_logs` for other users.
- Server-side admin clients use `SUPABASE_SERVICE_ROLE_KEY` with an import guard to prevent leakages to client bundles.

## 4. Fallback Architecture
- Built-in graceful fallbacks for local preview and development if Supabase/Gemini API keys are pending configuration in `.env.local`.
- Mock/Demo provider layer ensures the complete UI, 3D globe, audio/visuals, and interactive workflows can be tested immediately, switching automatically to live Supabase and Gemini endpoints when `.env.local` contains active credentials.
