'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { HudLabel } from '@/components/ui/HudLabel';
import { BracketCard } from '@/components/ui/BracketCard';
import { PillButton } from '@/components/ui/PillButton';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { StatusLED } from '@/components/ui/StatusLED';
import { fireConfetti } from '@/components/motion/ConfettiBurst';
import {
  CURRENT_USER,
  MOCK_EVENTS,
  MOCK_ANNOUNCEMENTS,
  MOCK_OPPORTUNITIES,
  MOCK_MATERIALS,
  MOCK_PEERS,
  MOCK_ATTENDANCE,
  MOCK_LEADERBOARD,
} from '@/lib/mock-data';
import { calculateAttendance } from '@/lib/scoring/attendance';
import {
  Flame,
  Sparkles,
  Trophy,
  ArrowRight,
  Calendar,
  Bell,
  Briefcase,
  FileText,
  Users,
  Clock,
  Send,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardPage() {
  const router = useRouter();
  const [novaInput, setNovaInput] = useState('');
  const [streakCelebrated, setStreakCelebrated] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastCheckin = localStorage.getItem('cc_last_checkin');

    if (lastCheckin !== today) {
      localStorage.setItem('cc_last_checkin', today);
      setStreakCelebrated(true);
      fireConfetti();
      toast.success('Daily Check-In Recorded! +2 XP & Streak Flame Preserved 🔥');
    }
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleNovaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaInput.trim()) return;
    router.push(`/assistant?q=${encodeURIComponent(novaInput)}`);
  };

  const attendanceAlerts = MOCK_ATTENDANCE.map(s => ({
    ...s,
    calc: calculateAttendance(s.attended, s.total, s.minRequired),
  })).filter(s => s.calc.percentage < s.minRequired || s.calc.status === 'warning');

  return (
    <AppShell>
      <div className="space-y-10 font-body">
        {/* 1. Header Greeting & Telemetry Metrics */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <HudLabel label="TELEMETRY // TODAY" color="acid" />
              <span className="text-zinc-500 font-mono text-sm">• 15 Bengaluru Colleges Active</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
              {getGreeting()}, {CURRENT_USER.fullName}
            </h1>
            <p className="text-zinc-400 font-mono text-sm">
              {CURRENT_USER.collegeName} • {CURRENT_USER.branch} (Semester {CURRENT_USER.semester})
            </p>
          </div>

          {/* Large Streak Flame and Level/XP Card */}
          <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-800 p-4 rounded-3xl shadow-xl">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-signal/15 border border-signal/30 text-signal font-mono text-sm font-bold shadow-lg shadow-signal/10">
              <Flame className="w-5 h-5 fill-signal animate-bounce" />
              <span>{CURRENT_USER.streak} DAY STREAK</span>
            </div>
            <div className="flex flex-col text-right font-mono pr-2">
              <span className="text-base font-bold text-white">LEVEL {CURRENT_USER.level} ARCHITECT</span>
              <span className="text-xs text-acid font-semibold">{CURRENT_USER.xp} XP ACCUMULATED</span>
            </div>
          </div>
        </div>

        {/* 2. Top Metric KPI Row - Big & Prominent */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 font-mono">
          <div className="p-6 rounded-[22px] bg-zinc-950/80 border border-zinc-800 space-y-2">
            <span className="text-xs text-zinc-500 uppercase">Campus Standing</span>
            <div className="text-3xl font-bold text-white">#4 Rank</div>
            <span className="text-xs text-acid flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Top 2% in RVCE
            </span>
          </div>

          <div className="p-6 rounded-[22px] bg-zinc-950/80 border border-zinc-800 space-y-2">
            <span className="text-xs text-zinc-500 uppercase">Attendance Health</span>
            <div className="text-3xl font-bold text-acid">85.4%</div>
            <span className="text-xs text-zinc-400">Above 75% examination threshold</span>
          </div>

          <div className="p-6 rounded-[22px] bg-zinc-950/80 border border-zinc-800 space-y-2">
            <span className="text-xs text-zinc-500 uppercase">Registered Events</span>
            <div className="text-3xl font-bold text-cyan">2 Active</div>
            <span className="text-xs text-cyan">HackGrid 2026 QR Ready</span>
          </div>

          <div className="p-6 rounded-[22px] bg-zinc-950/80 border border-zinc-800 space-y-2">
            <span className="text-xs text-zinc-500 uppercase">Network Handshakes</span>
            <div className="text-3xl font-bold text-signal">12 Peers</div>
            <span className="text-xs text-signal">+3 cross-campus squads</span>
          </div>
        </div>

        {/* 3. Bento Grid Hub - Expansive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Bento Item 1: N.O.V.A Assistant Input Prompt */}
          <BracketCard headerTag="01 // N.O.V.A COGNITIVE ORBIT" glowColor="cyan" className="lg:col-span-2 p-8">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-heading font-semibold text-white">
                    Ask N.O.V.A Anything
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-1">
                    Grounded campus RAG: Query event rules, safe bunk math, DBMS notes, or teammates across 15 colleges.
                  </p>
                </div>
                <StatusLED status="online" label="LLM READY" />
              </div>

              <form onSubmit={handleNovaSubmit} className="flex gap-3">
                <input
                  type="text"
                  placeholder="e.g. 'Can I safely bunk OS on Friday?' or 'Who knows Flutter at BMSCE?'"
                  value={novaInput}
                  onChange={e => setNovaInput(e.target.value)}
                  className="flex-1 px-5 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 font-mono text-sm focus:outline-none focus:border-cyan shadow-inner"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-cyan text-black font-mono text-sm font-bold hover:bg-cyan/90 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan/20 active:scale-95"
                >
                  <span>QUERY</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </BracketCard>

          {/* Bento Item 2: Attendance Watch Dog */}
          <BracketCard
            headerTag="02 // ATTENDANCE DEFENSE"
            glowColor={attendanceAlerts.length > 0 ? 'signal' : 'acid'}
            className="p-8"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-white">Attendance Watch</h3>
                <Link href="/attendance" className="text-xs font-mono text-signal hover:underline">
                  Full Simulator &rarr;
                </Link>
              </div>

              {attendanceAlerts.length > 0 ? (
                <div className="space-y-3 font-mono text-xs">
                  {attendanceAlerts.map(sub => (
                    <div key={sub.id} className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                      <div className="truncate pr-3 space-y-0.5">
                        <div className="text-white truncate font-medium text-sm">{sub.name}</div>
                        <div className="text-xs text-zinc-400">{sub.calc.message}</div>
                      </div>
                      <span className={`text-sm font-bold ${sub.calc.status === 'danger' ? 'text-signal' : 'text-amber-400'}`}>
                        {sub.calc.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center font-mono text-xs text-acid">
                  All courses safely above 75% threshold.
                </div>
              )}
            </div>
          </BracketCard>

          {/* Bento Item 3: Events This Week */}
          <BracketCard headerTag="03 // UPCOMING ARENA" glowColor="acid" className="p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-white">Events This Week</h3>
                <Link href="/events" className="text-xs font-mono text-acid hover:underline">
                  Explore All &rarr;
                </Link>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {MOCK_EVENTS.slice(0, 2).map(evt => (
                  <div key={evt.id} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-signal font-bold uppercase">{evt.category}</span>
                      <span className="text-xs text-zinc-400">{evt.capacity - evt.registeredCount} spots remaining</span>
                    </div>
                    <div className="text-white font-medium text-sm truncate">{evt.title}</div>
                    <div className="text-xs text-zinc-400 truncate">{evt.venue || 'Online Link'}</div>
                  </div>
                ))}
              </div>
            </div>
          </BracketCard>

          {/* Bento Item 4: High-Priority Pinned Announcements */}
          <BracketCard headerTag="04 // BROADCAST NOTICE" glowColor="signal" className="p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-white">Urgent Broadcast</h3>
                <Link href="/announcements" className="text-xs font-mono text-signal hover:underline">
                  Feed &rarr;
                </Link>
              </div>

              {MOCK_ANNOUNCEMENTS.slice(0, 1).map(anc => (
                <div key={anc.id} className="p-4 rounded-2xl bg-zinc-900 border border-signal/30 space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-signal">
                    <span className="font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-signal animate-ping" /> {anc.category}
                    </span>
                    <span className="text-xs text-zinc-500">EXAMS OFFICE</span>
                  </div>
                  <h4 className="text-white font-medium text-sm leading-snug">{anc.title}</h4>
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                    {anc.aiSummary}
                  </p>
                </div>
              ))}
            </div>
          </BracketCard>

          {/* Bento Item 5: People You Should Meet */}
          <BracketCard headerTag="05 // TELEMETRY MATCH" glowColor="ultra" className="p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-white">People to Meet</h3>
                <Link href="/match" className="text-xs font-mono text-ultra hover:underline">
                  Squad Finder &rarr;
                </Link>
              </div>

              <div className="space-y-3">
                {MOCK_PEERS.slice(0, 2).map(peer => (
                  <div key={peer.id} className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={peer.avatarUrl} alt={peer.fullName} className="w-10 h-10 rounded-full object-cover border border-zinc-700" />
                      <div>
                        <div className="text-sm font-semibold text-white">{peer.fullName}</div>
                        <div className="text-xs font-mono text-zinc-400">{peer.collegeName.split(' ')[0]} • Sem {peer.semester}</div>
                      </div>
                    </div>
                    <ProgressRing progress={88} size={42} color="acid" />
                  </div>
                ))}
              </div>
            </div>
          </BracketCard>

          {/* Bento Item 6: Curated Study Notes */}
          <BracketCard headerTag="06 // ARCHIVE" glowColor="cyan" className="lg:col-span-2 p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-white">Notes for 5th Semester</h3>
                <Link href="/materials" className="text-xs font-mono text-cyan hover:underline">
                  Explore Repository &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                {MOCK_MATERIALS.slice(0, 2).map(mat => (
                  <div key={mat.id} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span>{mat.subject}</span>
                      <span className="text-acid font-bold">{mat.upvotes} UPVOTES</span>
                    </div>
                    <h4 className="text-white font-medium text-sm truncate">{mat.title}</h4>
                    <p className="text-xs text-zinc-400 line-clamp-2">{mat.aiSummary}</p>
                  </div>
                ))}
              </div>
            </div>
          </BracketCard>

          {/* Bento Item 7: Leaderboard Snapshot */}
          <BracketCard headerTag="07 // LEAGUE SNAPSHOT" glowColor="signal" className="p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-white">Leaderboard</h3>
                <Link href="/leaderboard" className="text-xs font-mono text-signal hover:underline">
                  Podium &rarr;
                </Link>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                {MOCK_LEADERBOARD.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <div className="flex items-center gap-2.5">
                      <span className={`font-bold text-sm ${i === 0 ? 'text-signal' : 'text-zinc-500'}`}>#{item.rank}</span>
                      <span className="text-white text-xs sm:text-sm font-medium truncate">{item.name}</span>
                    </div>
                    <span className="text-acid font-bold text-xs">{item.xp} XP</span>
                  </div>
                ))}
              </div>
            </div>
          </BracketCard>
        </div>
      </div>
    </AppShell>
  );
}
