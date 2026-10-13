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
import { fireConfetti } from '@/components/motion/ConfettiBurst';
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
  MessageSquare,
  QrCode,
  Zap,
} from 'lucide-react';

const ChromeGlobe = dynamic(() => import('@/components/three/ChromeGlobe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 flex items-center justify-center font-mono text-xs text-zinc-500">
      [ INITIALIZING 3D CHROME MESH... ]
    </div>
  ),
});

export function ScrollStory() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['React.js', 'Python']);
  const [interactiveScore, setInteractiveScore] = useState(88);

  const toggleSkill = (skill: string) => {
    let next: string[];
    if (selectedSkills.includes(skill)) {
      next = selectedSkills.filter(s => s !== skill);
    } else {
      next = [...selectedSkills, skill];
    }
    setSelectedSkills(next);
    setInteractiveScore(Math.min(98, 45 + next.length * 16));
  };

  const moduleCards = [
    {
      title: 'Student Dashboard',
      hud: '01 / SYSTEM_HUD',
      desc: 'Bento-grid command hub with daily streak flame, XP levels, and high-priority action feeds.',
      icon: <LayoutDashboard className="w-5 h-5 text-signal" />,
      color: 'signal' as const,
      preview: (
        <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 space-y-2 text-xs font-mono">
          <div className="flex justify-between items-center text-zinc-400">
            <span>STREAK: 12 DAYS</span>
            <span className="text-acid">LVL 4 // 420 XP</span>
          </div>
          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-signal" />
          </div>
          <span className="text-[10px] text-zinc-500 block text-right">EXAMPLE</span>
        </div>
      ),
    },
    {
      title: 'Study Materials & Notes',
      hud: '02 / ARCHIVE',
      desc: 'Semester-sorted syllabus, verified handwritten notes, and solved past exam papers with AI summaries.',
      icon: <FileText className="w-5 h-5 text-cyan" />,
      color: 'cyan' as const,
      preview: (
        <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 space-y-1.5 text-xs font-mono">
          <div className="text-white truncate font-medium">OS Kernel Internals.pdf</div>
          <div className="flex justify-between text-zinc-400 text-[10px]">
            <span>142 downloads</span>
            <span className="text-acid">38 upvotes</span>
          </div>
          <span className="text-[10px] text-zinc-500 block text-right">EXAMPLE</span>
        </div>
      ),
    },
    {
      title: 'Events & Digital Tickets',
      hud: '03 / ARENA',
      desc: 'Hackathons, symposiums, and workshops with instant QR tickets and verifiable digital certificates.',
      icon: <Calendar className="w-5 h-5 text-acid" />,
      color: 'acid' as const,
      preview: (
        <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 flex items-center justify-between text-xs font-mono">
          <div>
            <div className="text-white font-semibold">HackGrid 2026</div>
            <div className="text-[10px] text-zinc-400">TKT #8829F • VERIFIED</div>
          </div>
          <QrCode className="w-8 h-8 text-signal" />
        </div>
      ),
    },
    {
      title: 'Targeted Announcements',
      hud: '04 / BROADCAST',
      desc: 'Zero noise. Announcements targeted by college, branch, and semester with one-tap AI TL;DR.',
      icon: <Bell className="w-5 h-5 text-ultra" />,
      color: 'ultra' as const,
      preview: (
        <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 space-y-1 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-signal text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-signal animate-ping" /> URGENT NOTICE
          </div>
          <div className="text-white truncate text-[11px]">End-Sem Timetable Published</div>
        </div>
      ),
    },
    {
      title: 'Opportunities Tracker',
      hud: '05 / PIPELINE',
      desc: 'Internships, research grants, and fellowships with match rings and a drag-and-drop Kanban tracker.',
      icon: <Briefcase className="w-5 h-5 text-signal" />,
      color: 'signal' as const,
      preview: (
        <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 flex items-center justify-between text-xs font-mono">
          <div>
            <div className="text-white font-semibold">Razorpay Checkout</div>
            <div className="text-[10px] text-acid">₹45,000 / mo</div>
          </div>
          <ProgressRing progress={92} size={36} color="acid" />
        </div>
      ),
    },
    {
      title: 'Cross-College Network',
      hud: '06 / GRID',
      desc: 'Discover peers across 15+ engineering campuses, find mentors, and coordinate in real-time 1:1 chat.',
      icon: <Users className="w-5 h-5 text-cyan" />,
      color: 'cyan' as const,
      preview: (
        <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 flex items-center gap-2.5 text-xs font-mono">
          <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-signal">
            A
          </div>
          <div className="truncate">
            <div className="text-white truncate font-medium">Ananya D.</div>
            <div className="text-[10px] text-zinc-400">BMSCE • Mobile Dev</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Skill Match Engine',
      hud: '07 / SYNAPSE',
      desc: 'Algorithmic teammate matchmaking pairing rule-based tech competencies with Gemini 768-dim embeddings.',
      icon: <Compass className="w-5 h-5 text-acid" />,
      color: 'acid' as const,
      preview: (
        <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 flex items-center justify-between text-xs font-mono">
          <div>
            <div className="text-white">Natural Lang Match</div>
            <div className="text-[10px] text-acid">AI Crop Disease App</div>
          </div>
          <span className="text-acid font-bold text-sm">94%</span>
        </div>
      ),
    },
    {
      title: 'Leaderboard & Gamification',
      hud: '08 / LEAGUE',
      desc: 'Earn verified XP for peer review, attendance consistency, and open source contributions.',
      icon: <Trophy className="w-5 h-5 text-signal" />,
      color: 'signal' as const,
      preview: (
        <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-signal font-bold">#1</span>
            <span className="text-white">Siddharth V.</span>
          </div>
          <span className="text-zinc-400 text-[10px]">890 XP</span>
        </div>
      ),
    },
    {
      title: 'N.O.V.A AI Assistant',
      hud: '09 / COGNITION',
      desc: 'Grounded in real campus records via pgvector RAG. Asks, discovers, schedules, and queries attendance.',
      icon: <Bot className="w-5 h-5 text-cyan" />,
      color: 'cyan' as const,
      preview: (
        <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 space-y-1 text-xs font-mono">
          <div className="text-zinc-400 text-[10px]">&gt; am I short on attendance?</div>
          <div className="text-acid text-[10px]">Safe: can bunk 2 more OS lectures</div>
        </div>
      ),
    },
    {
      title: 'Attendance Guardian',
      hud: '10 / DEFENSE',
      desc: 'Private, owner-only RLS tracker with mathematical bunking forecasts and recovery alerts.',
      icon: <Clock className="w-5 h-5 text-acid" />,
      color: 'acid' as const,
      preview: (
        <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 flex items-center justify-between text-xs font-mono">
          <div>
            <div className="text-white">DBMS (CS501)</div>
            <div className="text-[10px] text-zinc-400">28 / 32 Classes</div>
          </div>
          <span className="text-acid font-bold">87.5%</span>
        </div>
      ),
    },
    {
      title: 'Shareable Profile Card',
      hud: '11 / IDENTITY',
      desc: 'Tilt-3D cryptographic card showcasing verified skills, college standing, streaks, and achievements.',
      icon: <UserCheck className="w-5 h-5 text-ultra" />,
      color: 'ultra' as const,
      preview: (
        <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-acid" />
            <span className="text-white">arjun_v</span>
          </div>
          <span className="text-signal text-[10px]">[ RVCE CSE ]</span>
        </div>
      ),
    },
  ];

  return (
    <div className="relative z-10 bg-zinc-950 text-paper border-t border-zinc-800">
      {/* 1. Live Ticker Strip */}
      <div className="py-3 bg-zinc-900 border-b border-zinc-800">
        <Marquee speed={28} className="font-mono text-xs sm:text-sm text-zinc-300">
          <span className="inline-flex items-center gap-2">
            <StatusLED status="online" />
            <span>15 BENGALURU COLLEGES MOUNTED</span>
          </span>
          <span className="text-zinc-600">//</span>
          <span className="inline-flex items-center gap-2">
            <span className="text-signal font-bold">1,480+</span>
            <span>VERIFIED STUDENTS ACTIVE</span>
          </span>
          <span className="text-zinc-600">//</span>
          <span className="inline-flex items-center gap-2">
            <span className="text-acid font-bold">840+</span>
            <span>LECTURE NOTES &amp; EXAM PAPERS</span>
          </span>
          <span className="text-zinc-600">//</span>
          <span className="inline-flex items-center gap-2">
            <span className="text-cyan font-bold">48</span>
            <span>HACKATHONS &amp; TECH EVENTS</span>
          </span>
          <span className="text-zinc-600">//</span>
          <span className="inline-flex items-center gap-2">
            <StatusLED status="syncing" />
            <span>REALTIME RLS PROTOCOLS ACTIVE</span>
          </span>
          <span className="text-zinc-600">//</span>
        </Marquee>
      </div>

      {/* 2. 3D Chrome Globe Section */}
      <section id="community" className="py-20 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <HudLabel label="INTER-COLLEGE NEURAL TOPOLOGY" color="cyan" />
            <h2 className="text-3xl sm:text-5xl font-heading font-medium tracking-tight text-white leading-tight">
              One Unified Grid Across All Campuses.
            </h2>
            <p className="text-zinc-400 font-mono text-xs sm:text-sm leading-relaxed">
              Break out of fragmented WhatsApp silos and circular campus word-of-mouth. Campus Connect bridges RVCE, BMSCE, PES, MSRIT, and IISc into one interconnected knowledge layer.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-acid" />
                <span>Zero Dead Ends</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-acid" />
                <span>Cross-Campus Collabs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-acid" />
                <span>Verified Domain Auth</span>
              </div>
            </div>
            <div className="pt-4">
              <PillButton variant="signal" href="/signup">
                Connect Your Campus &rarr;
              </PillButton>
            </div>
          </div>

          <div className="relative rounded-[24px] border border-zinc-800 bg-zinc-900/40 p-4 overflow-hidden">
            <div className="absolute top-4 left-4 z-10">
              <HudLabel label="LIVE ORBIT // NODE MESH" color="acid" />
            </div>
            <ChromeGlobe />
          </div>
        </div>
      </section>

      {/* 3. Problem to Solution Transformation */}
      <section className="py-20 bg-zinc-900/60 border-y border-zinc-800 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto space-y-12 text-center">
          <div className="space-y-3">
            <HudLabel label="THE EVOLUTION" color="signal" />
            <h2 className="text-2xl sm:text-4xl font-heading font-medium tracking-tight text-white">
              From WhatsApp Chaos to Mission Control
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* The Chaos */}
            <div className="p-6 sm:p-8 rounded-[20px] bg-red-950/20 border border-red-900/40 space-y-4">
              <div className="flex items-center justify-between text-red-400 font-mono text-xs">
                <span>BEFORE // CHAOS</span>
                <span>STATUS: BROKEN</span>
              </div>
              <div className="space-y-3 font-mono text-xs text-zinc-400">
                <div className="p-3 bg-zinc-900/80 rounded border border-red-900/30">
                  <span className="text-red-400 font-bold">&quot;Bro who has OS Unit 3 notes?&quot;</span>
                  <p className="text-[10px] text-zinc-500 mt-1">Lost among 400 spam messages in 5 WhatsApp groups.</p>
                </div>
                <div className="p-3 bg-zinc-900/80 rounded border border-red-900/30">
                  <span className="text-red-400 font-bold">&quot;Need 1 Flutter dev for hackathon tomorrow!&quot;</span>
                  <p className="text-[10px] text-zinc-500 mt-1">Expired notice board posters with zero responses.</p>
                </div>
                <div className="p-3 bg-zinc-900/80 rounded border border-red-900/30">
                  <span className="text-red-400 font-bold">&quot;Am I going to be detained in DBMS?&quot;</span>
                  <p className="text-[10px] text-zinc-500 mt-1">Manual guesswork spreadsheet calculated after exams.</p>
                </div>
              </div>
            </div>

            {/* The Solution */}
            <div className="p-6 sm:p-8 rounded-[20px] bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <div className="flex items-center justify-between text-emerald-400 font-mono text-xs">
                <span>AFTER // CAMPUS CONNECT</span>
                <span>STATUS: OPTIMAL</span>
              </div>
              <div className="space-y-3 font-mono text-xs text-zinc-300">
                <div className="p-3 bg-zinc-900/80 rounded border border-emerald-900/30">
                  <span className="text-emerald-400 font-bold">1-Click Verified Materials</span>
                  <p className="text-[10px] text-zinc-400 mt-1">Search by semester and subject with AI summary pre-extracted.</p>
                </div>
                <div className="p-3 bg-zinc-900/80 rounded border border-emerald-900/30">
                  <span className="text-emerald-400 font-bold">Precision Teammate Match</span>
                  <p className="text-[10px] text-zinc-400 mt-1">Semantic vector engine matches skills, branch, and hackathon roles.</p>
                </div>
                <div className="p-3 bg-zinc-900/80 rounded border border-emerald-900/30">
                  <span className="text-emerald-400 font-bold">Attendance Guardian</span>
                  <p className="text-[10px] text-zinc-400 mt-1">Precise safe bunk counts and recovery math with private RLS.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 11 Module Cards */}
      <section id="features" className="py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto space-y-12">
        <div className="space-y-3">
          <HudLabel label="COMPLETE FEATURE COVERAGE // 11 MODULES" color="acid" />
          <h2 className="text-3xl sm:text-5xl font-heading font-medium tracking-tight text-white">
            Built for Real Campus Life. Nothing Faked.
          </h2>
          <p className="text-zinc-400 font-mono text-xs sm:text-sm max-w-xl">
            Every module operates against live relational tables and strict Row Level Security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moduleCards.map((mod, idx) => (
            <TiltCard key={idx} className="bg-zinc-900/70 border border-zinc-800/80 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">{mod.icon}</div>
                  <HudLabel label={mod.hud} color={mod.color} />
                </div>
                <h3 className="text-lg font-heading font-medium text-white mb-2">{mod.title}</h3>
                <p className="text-zinc-400 font-mono text-xs leading-relaxed mb-6">{mod.desc}</p>
              </div>
              <div>{mod.preview}</div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 5. Interactive Skill Match Demo */}
      <section className="py-20 bg-zinc-900/40 border-t border-zinc-800 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <HudLabel label="INTERACTIVE DEMO // SKILL MATCH" color="ultra" />
            <h2 className="text-2xl sm:text-4xl font-heading font-medium tracking-tight text-white">
              Test the Matchmaking Algorithm Live
            </h2>
            <p className="text-zinc-400 font-mono text-xs sm:text-sm">
              Click skills to simulate teammate compatibility across college boundaries.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-[20px] bg-zinc-950 border border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="font-mono text-xs text-zinc-400 block">SELECT REQUIRED PROJECT SKILLS:</span>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Python', 'Flutter', 'TypeScript', 'Docker', 'Figma', 'PyTorch'].map(skill => {
                  const active = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`font-mono text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                        active
                          ? 'bg-signal text-white border-signal shadow-[0_0_12px_rgba(255,77,28,0.3)]'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {active ? '✓ ' : '+ '}
                      {skill}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-zinc-900 font-mono text-xs text-zinc-400">
                <span>Active Seeker: </span>
                <span className="text-white">Arjun V. [RVCE CSE]</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
              <div className="space-y-2">
                <HudLabel label="COMPUTED AFFINITY" color="acid" />
                <h4 className="text-white font-medium">Ananya Deshmukh</h4>
                <p className="text-xs font-mono text-zinc-400">BMSCE • 5th Sem ISE</p>
                <div className="text-[11px] font-mono text-acid">
                  Matches {selectedSkills.length} selected skills
                </div>
              </div>

              <ProgressRing progress={interactiveScore} size={78} color="acid" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. "How It Works" 8-Step Timeline */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <HudLabel label="8-STEP JOURNEY" color="cyan" />
          <h2 className="text-3xl sm:text-4xl font-heading font-medium tracking-tight text-white">
            How Campus Connect Powers Your Semester
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
          {[
            { step: '01', title: 'Register & Verify', desc: 'Sign in with college domain email or credentials; auto-verify your campus.' },
            { step: '02', title: 'Build Profile', desc: 'Log skills, project portfolios, GitHub links, and mentorship availability.' },
            { step: '03', title: 'Daily Check-In', desc: 'Open Today dashboard to advance streak flame and earn consistency XP.' },
            { step: '04', title: 'Access Notes', desc: 'Download curated exam solutions, question papers, and lab manuals.' },
            { step: '05', title: 'Cross-Campus Connect', desc: 'Reach out to students in other colleges for hackathon teams and project collabs.' },
            { step: '06', title: 'Compete & Earn QR', desc: 'Register for events, scan camera QR code on-site, and claim digital certificates.' },
            { step: '07', title: 'Climb Podium', desc: 'Gain milestone badges, level up to Veteran node, and lead the college battle.' },
            { step: '08', title: 'Ask N.O.V.A AI', desc: 'Zero guesswork: Ask AI for attendance calculations, deadlines, and notes.' },
          ].map(s => (
            <div key={s.step} className="p-5 rounded-[20px] bg-zinc-900/60 border border-zinc-800 space-y-2">
              <span className="text-signal font-bold text-sm">{s.step} //</span>
              <h4 className="text-white font-heading text-sm font-semibold">{s.title}</h4>
              <p className="text-zinc-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. System Status Footer */}
      <footer className="border-t border-zinc-800 bg-black p-8 font-mono text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-acid animate-pulse" />
            <span>CAMPUS_CONNECT MAINFRAME // ALL SERVICES OPERATIONAL</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-zinc-500">
            <Link href="/styleguide" className="hover:text-signal transition-colors">[ STYLEGUIDE ]</Link>
            <Link href="/login" className="hover:text-signal transition-colors">[ LOGIN ]</Link>
            <Link href="/signup" className="hover:text-signal transition-colors">[ SIGNUP ]</Link>
            <span className="text-zinc-700">|</span>
            <span>RLS: SECURE</span>
            <span>VECTOR: HNSW</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
