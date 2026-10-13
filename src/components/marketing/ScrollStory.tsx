'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Marquee } from '@/components/motion/Marquee';
import { HudLabel } from '@/components/ui/HudLabel';
import { BracketCard } from '@/components/ui/BracketCard';
import { TiltCard } from '@/components/ui/TiltCard';
import { PillButton } from '@/components/ui/PillButton';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { StatusLED } from '@/components/ui/StatusLED';
import { AnimatedCounter } from '@/components/motion/AnimatedCounter';
import {
  FileText,
  Calendar,
  Bell,
  Briefcase,
  Users,
  Compass,
  Trophy,
  Bot,
  Clock,
  UserCheck,
  LayoutDashboard,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Flame,
  Terminal,
  Shield,
  QrCode,
  Zap,
  Activity,
  Layers,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';

const ChromeGlobe = dynamic(() => import('@/components/three/ChromeGlobe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center font-mono text-sm text-zinc-500">
      [ INITIALIZING 3D CHROME TOPOLOGY... ]
    </div>
  ),
});

export function ScrollStory() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['React.js', 'Python', 'Flutter']);
  const [interactiveScore, setInteractiveScore] = useState(92);

  const toggleSkill = (skill: string) => {
    let next: string[];
    if (selectedSkills.includes(skill)) {
      next = selectedSkills.filter(s => s !== skill);
    } else {
      next = [...selectedSkills, skill];
    }
    setSelectedSkills(next);
    setInteractiveScore(Math.min(99, 40 + next.length * 15));
  };

  const moduleCards = [
    {
      title: 'Student Dashboard',
      hud: '01 / SYSTEM_HUD',
      desc: 'Bento-grid command hub with daily streak flame, XP levels, and high-priority action feeds.',
      icon: <LayoutDashboard className="w-6 h-6 text-signal" />,
      color: 'signal' as const,
      preview: (
        <div className="p-4 bg-zinc-950/90 rounded-2xl border border-zinc-800 space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center text-zinc-400">
            <span className="flex items-center gap-1.5 text-signal font-bold">
              <Flame className="w-4 h-4 fill-signal" /> 12 DAY STREAK
            </span>
            <span className="text-acid font-bold">LEVEL 4 // 420 XP</span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-gradient-to-r from-signal to-acid rounded-full" />
          </div>
          <div className="flex justify-between text-[11px] text-zinc-500">
            <span>Next promotion: 450 XP</span>
            <span className="text-acid">93% Complete</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Study Materials & Notes',
      hud: '02 / ARCHIVE',
      desc: 'Semester-sorted syllabus, verified handwritten notes, and solved past exam papers with AI summaries.',
      icon: <FileText className="w-6 h-6 text-cyan" />,
      color: 'cyan' as const,
      preview: (
        <div className="p-4 bg-zinc-950/90 rounded-2xl border border-zinc-800 space-y-2.5 font-mono text-xs">
          <div className="text-white text-sm font-semibold truncate">OS Kernel Internals &amp; Schedulers.pdf</div>
          <p className="text-zinc-400 text-[11px] line-clamp-1">Handwritten notes covering CPU scheduling &amp; semaphores.</p>
          <div className="flex justify-between items-center text-zinc-400 text-[11px] pt-1 border-t border-zinc-900">
            <span className="text-cyan font-medium">142 downloads</span>
            <span className="text-acid font-medium">38 upvotes (+20 XP)</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Events & Digital Tickets',
      hud: '03 / ARENA',
      desc: 'Hackathons, symposiums, and workshops with instant QR tickets and verifiable digital certificates.',
      icon: <Calendar className="w-6 h-6 text-acid" />,
      color: 'acid' as const,
      preview: (
        <div className="p-4 bg-zinc-950/90 rounded-2xl border border-zinc-800 flex items-center justify-between font-mono text-xs">
          <div className="space-y-1">
            <div className="text-white text-sm font-bold">HackGrid 2026</div>
            <div className="text-[11px] text-zinc-400">RVCE Tech Quad • Oct 24</div>
            <span className="inline-block px-2 py-0.5 rounded bg-acid/15 text-acid text-[10px] font-bold">
              VERIFIED TICKET #8829F
            </span>
          </div>
          <div className="p-2 bg-white rounded-xl">
            <QrCode className="w-10 h-10 text-black" />
          </div>
        </div>
      ),
    },
    {
      title: 'Targeted Announcements',
      hud: '04 / BROADCAST',
      desc: 'Zero noise. Announcements targeted by college, branch, and semester with one-tap AI TL;DR.',
      icon: <Bell className="w-6 h-6 text-ultra" />,
      color: 'ultra' as const,
      preview: (
        <div className="p-4 bg-zinc-950/90 rounded-2xl border border-zinc-800 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-signal text-[11px] font-bold">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-signal animate-ping" /> URGENT NOTICE
            </span>
            <span className="text-zinc-500">EXAMS OFFICE</span>
          </div>
          <div className="text-white text-sm font-semibold truncate">Odd Sem Exam Timetable Released</div>
          <p className="text-zinc-400 text-[11px] line-clamp-1">Download provisional schedule &amp; clear library dues.</p>
        </div>
      ),
    },
    {
      title: 'Opportunities Tracker',
      hud: '05 / PIPELINE',
      desc: 'Internships, research grants, and fellowships with match rings and a drag-and-drop Kanban tracker.',
      icon: <Briefcase className="w-6 h-6 text-signal" />,
      color: 'signal' as const,
      preview: (
        <div className="p-4 bg-zinc-950/90 rounded-2xl border border-zinc-800 flex items-center justify-between font-mono text-xs">
          <div className="space-y-1">
            <div className="text-acid text-[10px] font-bold uppercase">Razorpay Core Checkout</div>
            <div className="text-white text-sm font-semibold">Frontend Systems Intern</div>
            <div className="text-zinc-400 text-[11px]">₹45,000 / month • Bengaluru</div>
          </div>
          <ProgressRing progress={92} size={46} color="acid" />
        </div>
      ),
    },
    {
      title: 'Cross-College Network',
      hud: '06 / GRID',
      desc: 'Discover peers across 15+ engineering campuses, find mentors, and coordinate in real-time 1:1 chat.',
      icon: <Users className="w-6 h-6 text-cyan" />,
      color: 'cyan' as const,
      preview: (
        <div className="p-4 bg-zinc-950/90 rounded-2xl border border-zinc-800 flex items-center gap-3 font-mono text-xs">
          <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-signal flex items-center justify-center font-bold text-signal text-sm">
            A
          </div>
          <div className="truncate space-y-0.5">
            <div className="text-white text-sm font-semibold truncate">Ananya Deshmukh</div>
            <div className="text-[11px] text-zinc-400">BMSCE • 5th Sem ISE (Flutter / Mobile)</div>
            <span className="text-[10px] text-acid">● ACTIVE IN 1:1 CHAT</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Skill Match Engine',
      hud: '07 / SYNAPSE',
      desc: 'Algorithmic teammate matchmaking pairing rule-based tech competencies with Gemini 768-dim embeddings.',
      icon: <Compass className="w-6 h-6 text-acid" />,
      color: 'acid' as const,
      preview: (
        <div className="p-4 bg-zinc-950/90 rounded-2xl border border-zinc-800 flex items-center justify-between font-mono text-xs">
          <div className="space-y-1">
            <div className="text-acid text-[10px] font-bold">NATURAL LANGUAGE PARSED</div>
            <div className="text-white text-sm font-semibold">&quot;AI Crop Disease Mobile App&quot;</div>
            <div className="text-zinc-400 text-[11px]">Covers Flutter, Python, and Next.js</div>
          </div>
          <span className="text-acid font-bold text-lg">94%</span>
        </div>
      ),
    },
    {
      title: 'Leaderboard & Gamification',
      hud: '08 / LEAGUE',
      desc: 'Earn verified XP for peer review, attendance consistency, and open source contributions.',
      icon: <Trophy className="w-6 h-6 text-signal" />,
      color: 'signal' as const,
      preview: (
        <div className="p-4 bg-zinc-950/90 rounded-2xl border border-zinc-800 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="text-signal font-bold text-base">#1</span>
            <div>
              <div className="text-white text-sm font-semibold">Siddharth V.</div>
              <div className="text-zinc-400 text-[11px]">PES University • 32d Streak</div>
            </div>
          </div>
          <span className="text-acid font-bold text-sm">890 XP</span>
        </div>
      ),
    },
    {
      title: 'N.O.V.A AI Assistant',
      hud: '09 / COGNITION',
      desc: 'Grounded in real campus records via pgvector RAG. Asks, discovers, schedules, and queries attendance.',
      icon: <Bot className="w-6 h-6 text-cyan" />,
      color: 'cyan' as const,
      preview: (
        <div className="p-4 bg-zinc-950/90 rounded-2xl border border-zinc-800 space-y-1.5 font-mono text-xs">
          <div className="text-zinc-400 text-[11px]">&gt; &quot;Can I bunk Operating Systems on Friday?&quot;</div>
          <div className="text-acid text-[12px] font-medium leading-relaxed">
            Safe: At 87.5% you can safely skip 3 classes while preserving the 75% examination threshold.
          </div>
        </div>
      ),
    },
    {
      title: 'Attendance Guardian',
      hud: '10 / DEFENSE',
      desc: 'Private, owner-only RLS tracker with mathematical bunking forecasts and recovery alerts.',
      icon: <Clock className="w-6 h-6 text-acid" />,
      color: 'acid' as const,
      preview: (
        <div className="p-4 bg-zinc-950/90 rounded-2xl border border-zinc-800 flex items-center justify-between font-mono text-xs">
          <div>
            <div className="text-white text-sm font-semibold">Database Management Systems</div>
            <div className="text-zinc-400 text-[11px]">28 of 32 Classes Attended</div>
          </div>
          <div className="text-right">
            <span className="text-acid font-bold text-base">87.5%</span>
            <div className="text-[10px] text-zinc-500">SAFE STANDING</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Shareable Profile Card',
      hud: '11 / IDENTITY',
      desc: 'Tilt-3D cryptographic card showcasing verified skills, college standing, streaks, and achievements.',
      icon: <UserCheck className="w-6 h-6 text-ultra" />,
      color: 'ultra' as const,
      preview: (
        <div className="p-4 bg-zinc-950/90 rounded-2xl border border-zinc-800 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-acid animate-pulse" />
            <div>
              <div className="text-white font-bold">@arjun_v</div>
              <div className="text-zinc-400 text-[11px]">RVCE • Computer Science</div>
            </div>
          </div>
          <span className="text-signal text-[11px] font-bold px-2 py-0.5 rounded bg-signal/15">
            VERIFIED NODE
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="relative z-10 bg-zinc-950 text-paper border-t border-zinc-800">
      {/* 1. Live Ticker Strip - Taller & Impactful */}
      <div className="py-4 bg-zinc-900 border-b border-zinc-800">
        <Marquee speed={28} className="font-mono text-sm sm:text-base text-zinc-200">
          <span className="inline-flex items-center gap-2.5">
            <StatusLED status="online" />
            <span className="font-bold">15 BENGALURU COLLEGES MOUNTED</span>
          </span>
          <span className="text-zinc-600">//</span>
          <span className="inline-flex items-center gap-2">
            <span className="text-signal font-bold text-base sm:text-lg">1,480+</span>
            <span>VERIFIED STUDENTS ACTIVE</span>
          </span>
          <span className="text-zinc-600">//</span>
          <span className="inline-flex items-center gap-2">
            <span className="text-acid font-bold text-base sm:text-lg">840+</span>
            <span>LECTURE NOTES &amp; EXAM PAPERS</span>
          </span>
          <span className="text-zinc-600">//</span>
          <span className="inline-flex items-center gap-2">
            <span className="text-cyan font-bold text-base sm:text-lg">48</span>
            <span>HACKATHONS &amp; TECH EVENTS</span>
          </span>
          <span className="text-zinc-600">//</span>
          <span className="inline-flex items-center gap-2.5">
            <StatusLED status="syncing" />
            <span className="font-bold">REALTIME RLS PROTOCOLS ACTIVE</span>
          </span>
          <span className="text-zinc-600">//</span>
        </Marquee>
      </div>

      {/* 2. 3D Chrome Globe Section - Expansive Layout */}
      <section id="community" className="py-24 sm:py-36 px-6 sm:px-12 lg:px-16 xl:px-20 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-8">
            <HudLabel label="INTER-COLLEGE NEURAL TOPOLOGY" color="cyan" />
            <h2 className="text-4xl sm:text-6xl xl:text-7xl font-heading font-medium tracking-tight text-white leading-[1.1]">
              One Unified Grid Across All Campuses.
            </h2>
            <p className="text-zinc-400 font-mono text-sm sm:text-base leading-relaxed max-w-xl">
              Break out of fragmented WhatsApp silos and circular campus word-of-mouth. Campus Connect bridges RVCE, BMSCE, PES, MSRIT, and IISc into one interconnected knowledge layer.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-sm text-zinc-300">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <CheckCircle2 className="w-5 h-5 text-acid shrink-0" />
                <span>Zero Dead Ends</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <CheckCircle2 className="w-5 h-5 text-acid shrink-0" />
                <span>Cross-Campus Collabs</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <CheckCircle2 className="w-5 h-5 text-acid shrink-0" />
                <span>Verified Domain Auth</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <CheckCircle2 className="w-5 h-5 text-acid shrink-0" />
                <span>Sub-Second pgvector</span>
              </div>
            </div>

            <div className="pt-4">
              <PillButton variant="signal" href="/signup" className="text-base px-8 py-3.5">
                Connect Your Campus &rarr;
              </PillButton>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-[28px] border border-zinc-800 bg-zinc-900/40 p-6 overflow-hidden shadow-2xl">
            <div className="absolute top-6 left-6 z-10">
              <HudLabel label="LIVE ORBIT // 32 COLLEGE NODES" color="acid" />
            </div>
            <ChromeGlobe />
          </div>
        </div>
      </section>

      {/* 3. Problem to Solution Transformation - Spatially Roomy */}
      <section className="py-24 sm:py-36 bg-zinc-900/60 border-y border-zinc-800 px-6 sm:px-12 lg:px-16 xl:px-20">
        <div className="max-w-[1500px] mx-auto space-y-16 text-center">
          <div className="space-y-4 max-w-3xl mx-auto">
            <HudLabel label="THE SYSTEM SHIFT" color="signal" />
            <h2 className="text-3xl sm:text-5xl xl:text-6xl font-heading font-medium tracking-tight text-white leading-tight">
              From WhatsApp Chaos to Mission Control
            </h2>
            <p className="text-zinc-400 font-mono text-sm sm:text-base">
              The difference between lost student opportunities and an algorithmic campus command hub.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 text-left">
            {/* The Chaos */}
            <div className="p-8 sm:p-10 rounded-[28px] bg-red-950/20 border border-red-900/40 space-y-6">
              <div className="flex items-center justify-between text-red-400 font-mono text-sm pb-2 border-b border-red-900/30">
                <span className="font-bold">BEFORE // FRAGMENTED SILOS</span>
                <span className="px-2.5 py-0.5 rounded bg-red-950 text-red-400 font-bold text-xs">BROKEN SYSTEM</span>
              </div>
              <div className="space-y-4 font-mono text-xs sm:text-sm text-zinc-300">
                <div className="p-4 bg-zinc-900/90 rounded-2xl border border-red-900/30 space-y-1.5">
                  <div className="text-red-400 font-bold">&quot;Bro who has OS Unit 3 handwritten notes?&quot;</div>
                  <p className="text-xs text-zinc-400">Lost among 400 unread messages, memes, and forwards across 6 WhatsApp groups.</p>
                </div>
                <div className="p-4 bg-zinc-900/90 rounded-2xl border border-red-900/30 space-y-1.5">
                  <div className="text-red-400 font-bold">&quot;Need 1 Flutter developer for hackathon tomorrow!&quot;</div>
                  <p className="text-xs text-zinc-400">Expired physical notice board posters with zero responses from other colleges.</p>
                </div>
                <div className="p-4 bg-zinc-900/90 rounded-2xl border border-red-900/30 space-y-1.5">
                  <div className="text-red-400 font-bold">&quot;Am I going to be detained in DBMS?&quot;</div>
                  <p className="text-xs text-zinc-400">Manual guesswork spreadsheet calculated after exams when it is too late to recover.</p>
                </div>
              </div>
            </div>

            {/* The Solution */}
            <div className="p-8 sm:p-10 rounded-[28px] bg-emerald-950/20 border border-emerald-900/40 space-y-6">
              <div className="flex items-center justify-between text-emerald-400 font-mono text-sm pb-2 border-b border-emerald-900/30">
                <span className="font-bold">AFTER // CAMPUS CONNECT CORE</span>
                <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold text-xs">OPTIMAL STATUS</span>
              </div>
              <div className="space-y-4 font-mono text-xs sm:text-sm text-zinc-200">
                <div className="p-4 bg-zinc-900/90 rounded-2xl border border-emerald-900/30 space-y-1.5">
                  <div className="text-emerald-400 font-bold">1-Click Verified Study Repository</div>
                  <p className="text-xs text-zinc-400">Search by semester and subject with 3-line Gemini AI synthesis auto-extracted.</p>
                </div>
                <div className="p-4 bg-zinc-900/90 rounded-2xl border border-emerald-900/30 space-y-1.5">
                  <div className="text-emerald-400 font-bold">Precision Teammate Match Engine</div>
                  <p className="text-xs text-zinc-400">Semantic vector embeddings match skills, branch, and hackathon roles instantly.</p>
                </div>
                <div className="p-4 bg-zinc-900/90 rounded-2xl border border-emerald-900/30 space-y-1.5">
                  <div className="text-emerald-400 font-bold">Attendance Guardian &amp; Simulator</div>
                  <p className="text-xs text-zinc-400">Precise safe bunk counts and recovery math with private owner-only RLS.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 11 Module Cards - Generous Grid */}
      <section id="features" className="py-24 sm:py-36 px-6 sm:px-12 lg:px-16 xl:px-20 max-w-[1600px] mx-auto space-y-16">
        <div className="space-y-4 max-w-3xl">
          <HudLabel label="COMPLETE FEATURE COVERAGE // 11 MODULES" color="acid" />
          <h2 className="text-4xl sm:text-6xl xl:text-7xl font-heading font-medium tracking-tight text-white leading-tight">
            Built for Real Campus Life. Nothing Faked.
          </h2>
          <p className="text-zinc-400 font-mono text-sm sm:text-base leading-relaxed">
            Every module operates against live relational tables and strict Row Level Security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {moduleCards.map((mod, idx) => (
            <TiltCard
              key={idx}
              className="bg-zinc-900/80 border border-zinc-800/90 p-8 flex flex-col justify-between shadow-xl min-h-[420px]"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-inner">
                    {mod.icon}
                  </div>
                  <HudLabel label={mod.hud} color={mod.color} />
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-semibold text-white mb-2.5">
                  {mod.title}
                </h3>
                <p className="text-zinc-400 font-mono text-xs sm:text-sm leading-relaxed mb-8">
                  {mod.desc}
                </p>
              </div>
              <div>{mod.preview}</div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 5. Interactive Skill Match Demo - Wide & Tactile */}
      <section className="py-24 sm:py-36 bg-zinc-900/50 border-t border-zinc-800 px-6 sm:px-12 lg:px-16 xl:px-20">
        <div className="max-w-[1500px] mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <HudLabel label="INTERACTIVE DEMO // SYNAPSE ENGINE" color="ultra" />
            <h2 className="text-3xl sm:text-5xl xl:text-6xl font-heading font-medium tracking-tight text-white leading-tight">
              Test the Matchmaking Algorithm Live
            </h2>
            <p className="text-zinc-400 font-mono text-sm sm:text-base">
              Click required project skills to simulate teammate compatibility across college boundaries in real-time.
            </p>
          </div>

          <div className="p-8 sm:p-12 rounded-[28px] bg-zinc-950 border border-zinc-800 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl">
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs sm:text-sm text-zinc-400 block tracking-wider uppercase font-semibold">
                SELECT DESIRED PROJECT TECH STACK:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {['React.js', 'Python', 'Flutter', 'TypeScript', 'Docker', 'Figma', 'PyTorch', 'Next.js', 'Go (Golang)', 'FastAPI'].map(skill => {
                  const active = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`font-mono text-xs sm:text-sm px-4 py-2.5 rounded-full border transition-all cursor-pointer ${
                        active
                          ? 'bg-signal text-white border-signal shadow-lg shadow-signal/30 scale-105'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      {active ? '✓ ' : '+ '}
                      {skill}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-zinc-900 font-mono text-xs text-zinc-400 flex items-center justify-between">
                <span>Active Project Leader: <strong className="text-white">Arjun V. [RVCE CSE]</strong></span>
                <span className="text-acid">3 Targets Configured</span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between shadow-inner">
              <div className="space-y-2">
                <HudLabel label="ALGORITHMIC AFFINITY" color="acid" />
                <h4 className="text-lg font-bold text-white">Ananya Deshmukh</h4>
                <p className="text-xs font-mono text-zinc-400">BMSCE • 5th Sem ISE (Mobile Lead)</p>
                <div className="text-xs font-mono text-acid pt-1">
                  ✓ Covers {selectedSkills.length} selected project skills
                </div>
              </div>

              <ProgressRing progress={interactiveScore} size={88} color="acid" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. "How It Works" 8-Step Timeline - Wide & Roomy */}
      <section className="py-24 sm:py-36 px-6 sm:px-12 lg:px-16 xl:px-20 max-w-[1600px] mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <HudLabel label="8-STEP JOURNEY" color="cyan" />
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-heading font-medium tracking-tight text-white leading-tight">
            How Campus Connect Powers Your Semester
          </h2>
          <p className="text-zinc-400 font-mono text-sm sm:text-base">
            From Day 1 enrollment to national hackathon podiums.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs sm:text-sm">
          {[
            { step: '01', title: 'Register & Verify', desc: 'Sign in with college domain email or credentials; auto-verify your institutional standing.' },
            { step: '02', title: 'Build Profile', desc: 'Log skills, project portfolios, GitHub links, and mentorship availability.' },
            { step: '03', title: 'Daily Check-In', desc: 'Open Today dashboard to advance streak flame and earn consistency XP.' },
            { step: '04', title: 'Access Notes', desc: 'Download curated exam solutions, question papers, and lab manuals.' },
            { step: '05', title: 'Cross-Campus Connect', desc: 'Reach out to students in other colleges for hackathon teams and project collabs.' },
            { step: '06', title: 'Compete & Earn QR', desc: 'Register for events, scan camera QR code on-site, and claim digital certificates.' },
            { step: '07', title: 'Climb Podium', desc: 'Gain milestone badges, level up to Veteran node, and lead the college battle.' },
            { step: '08', title: 'Ask N.O.V.A AI', desc: 'Zero guesswork: Ask AI for attendance calculations, deadlines, and notes.' },
          ].map(s => (
            <div key={s.step} className="p-6 rounded-[24px] bg-zinc-900/70 border border-zinc-800 space-y-3 hover:border-zinc-700 transition-colors">
              <span className="text-signal font-bold text-base">{s.step} //</span>
              <h4 className="text-white font-heading text-base font-semibold">{s.title}</h4>
              <p className="text-zinc-400 leading-relaxed text-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. System Status Footer */}
      <footer className="border-t border-zinc-800 bg-black p-10 font-mono text-xs sm:text-sm text-zinc-400">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-acid animate-pulse" />
            <span className="font-bold">CAMPUS_CONNECT MAINFRAME // ALL SERVICES OPERATIONAL</span>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-zinc-400">
            <Link href="/styleguide" className="hover:text-signal transition-colors">[ STYLEGUIDE ]</Link>
            <Link href="/login" className="hover:text-signal transition-colors">[ LOGIN ]</Link>
            <Link href="/signup" className="hover:text-signal transition-colors">[ SIGNUP ]</Link>
            <span className="text-zinc-700">|</span>
            <span>RLS: SECURE</span>
            <span>VECTOR: HNSW</span>
            <span>NODES: 15</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
