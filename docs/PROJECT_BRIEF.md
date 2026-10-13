# CAMPUS CONNECT - Comprehensive Project Brief & System Specification

## Overview
Campus Connect is a production-grade, inter-college student collaboration and campus communication platform. It replaces fragmented WhatsApp groups, notices, and word of mouth with a unified ecosystem operating across colleges.

## Core Modules
1. **Student Dashboard**: Bento-grid layout, streak flames, level/XP progress, personalized widgets (events, deadlines, announcements, recommendations, attendance watch, collaboration opportunities).
2. **Student Profile**: Custom 3D tilt avatar card, bio, college, branch, semester, skill tags with proficiency levels, interests, badges, public shareable profile card.
3. **Study Materials / Notes**: Repository filterable by college, course, branch, semester, subject, and type. Full-text search, preview, short-lived signed URLs for downloads, upvoting, bookmarking, AI-assisted summaries & auto-tagging, moderation queue.
4. **Events & Tickets**: Event discoverability (category, mode, college), parallax banner, live spots count, waitlist promotion, animated flip-card digital ticket with QR code, live camera QR check-in, certificates with public verification code (`/verify/[code]`).
5. **Announcements**: Categorized feed (Academic, Exams, Placement, Club, Hackathon, General), urgency badges, unread tracking, markdown renderer, AI TL;DR summary, college/branch/semester audience targeting.
6. **Opportunities & Tracker**: Internships, jobs, hackathons, research grants. Match percentage rings, missing skill insights, kanban application tracker (Saved, Applied, Interview, Offer, Rejected) with drag-and-drop.
7. **Cross-College Network & Chat**: Directory with smart filters, connection requests, real-time 1:1 chat with optimistic send, teammate matchmaking collab posts with instant team chats.
8. **Skill Match Engine**: Layer 1 rule-based skill scoring + Layer 2 semantic matching using Gemini 768-dim embeddings. Natural language "Describe your project" parsing into required skills. Team Builder mode.
9. **Leaderboard & Gamification**: Daily check-in streaks, XP ledger with anti-abuse daily caps, 3D animated podium, tier badges, college-vs-college battle metric bars, Recharts XP history.
10. **N.O.V.A AI Assistant**: Campus navigation & opportunity voice/chat assistant powered by Gemini with function calling, streaming SSE, strict RAG grounding in Supabase records, and interactive card responses.
11. **Attendance Guardian**: Owner-only RLS tracking, "can I bunk?" / "classes needed to recover" math, 30-day trends, safe/warning/danger threshold alerts.
12. **Administration & Governance**: Role-based access control (Student, Organizer/Club, Department/Admin), material moderation, role elevation queue, audit logs, broadcast alerts, analytics dashboard.

## Technical Architecture & Stack
- **Framework**: Next.js 14+ (App Router), TypeScript Strict, Tailwind CSS
- **Design System**: Retro-Futurist aesthetic (1980s mainframe HUD meets sleek modern agency, CRT scanline & grain overlay, bracket cards, HUD typography, chrome 3D components)
- **Component Libraries & Motion**: Lucide React, Framer Motion, Three.js / @react-three/fiber, Canvas-Confetti, Recharts, dnd-kit, Sonner, next-themes
- **Database & Auth**: Supabase PostgreSQL with `pgvector`, `pg_trgm`, `unaccent`, Row Level Security (RLS) on all tables, Supabase Auth with SSR cookies & middleware
- **AI**: Google Gemini (`@google/genai` or `@google/generative-ai`), embedding model `gemini-embedding-001` or `text-embedding-004`
- **Quality & Testing**: Vitest for unit & scoring tests, comprehensive RLS verification script.
