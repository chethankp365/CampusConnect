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
} from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardPage() {
  const router = useRouter();
  const [novaInput, setNovaInput] = useState('');
  const [streakCelebrated, setStreakCelebrated] = useState(false);

  // Daily check-in greeting & streak celebration
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

  // Find attendance below threshold
  const attendanceAlerts = MOCK_ATTENDANCE.map(s => ({
    ...s,
    calc: calculateAttendance(s.attended, s.total, s.minRequired),
  })).filter(s => s.calc.percentage < s.minRequired || s.calc.status === 'warning');

  return (
    <AppShell>
      <div className="space-y-8 font-body">
        {/* 1. Header Greeting & Streak Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HudLabel label="TELEMETRY // TODAY" color="acid" />
              <span className="text-zinc-500 font-mono text-xs">• 15 Colleges Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-white tracking-tight">
              {getGreeting()}, {CURRENT_USER.fullName}
            </h1>
            <p className="text-zinc-400 font-mono text-xs mt-0.5">
              {CURRENT_USER.collegeName} • {CURRENT_USER.branch} (Sem {CURRENT_USER.semester})
            </p>
          </div>

          {/* Streak Flame and Level/XP pill */}
          <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 p-2.5 rounded-2xl">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-signal/10 border border-signal/30 text-signal font-mono text-xs font-bold">
              <Flame className="w-4 h-4 fill-signal animate-bounce" />
              <span>{CURRENT_USER.streak} DAY STREAK</span>
            </div>
            <div className="flex flex-col text-right font-mono pr-2">
              <span className="text-xs font-bold text-white">LEVEL {CURRENT_USER.level}</span>
              <span className="text-[10px] text-acid">{CURRENT_USER.xp} XP ACCUMULATED</span>
            </div>
          </div>
        </div>

        {/* 2. Bento Grid Hub */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bento Item 1: N.O.V.A Assistant Input Prompt */}
          <BracketCard headerTag="01 // N.O.V.A ASSISTANT ORBIT" glowColor="cyan" className="lg:col-span-2">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-heading font-medium text-white">
                    Ask N.O.V.A Anything
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-1">
                    Grounded campus RAG: Query event rules, safe bunk math, DBMS notes, or teammates.
                  </p>
                </div>
                <StatusLED status="online" label="LLM READY" />
              </div>

              <form onSubmit={handleNovaSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. 'Can I safely bunk OS on Friday?' or 'Who knows Flutter at BMSCE?'"
                  value={novaInput}
                  onChange={e => setNovaInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 font-mono text-xs focus:outline-none focus:border-cyan"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-cyan text-black font-mono text-xs font-bold hover:bg-cyan/90 transition-colors flex items-center gap-1.5"
                >
                  <span>QUERY</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </BracketCard>

          {/* Bento Item 2: Attendance Watch Dog */}
          <BracketCard
            headerTag="02 // ATTENDANCE DEFENSE"
            glowColor={attendanceAlerts.length > 0 ? 'signal' : 'acid'}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">Attendance Watch</h3>
                <Link href="/attendance" className="text-[11px] font-mono text-signal hover:underline">
                  Simulator &rarr;
                </Link>
              </div>

              {attendanceAlerts.length > 0 ? (
                <div className="space-y-2.5 font-mono text-xs">
                  {attendanceAlerts.map(sub => (
                    <div key={sub.id} className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                      <div className="truncate pr-2">
                        <div className="text-white truncate font-medium">{sub.name}</div>
                        <div className="text-[10px] text-zinc-400">{sub.calc.message}</div>
                      </div>
                      <span className={`text-xs font-bold ${sub.calc.status === 'danger' ? 'text-signal' : 'text-amber-400'}`}>
                        {sub.calc.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center font-mono text-xs text-acid">
                  All courses safely above 75% threshold.
                </div>
              )}
            </div>
          </BracketCard>

          {/* Bento Item 3: Events This Week */}
          <BracketCard headerTag="03 // UPCOMING ARENA" glowColor="acid">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">Events This Week</h3>
                <Link href="/events" className="text-[11px] font-mono text-acid hover:underline">
                  All &rarr;
                </Link>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                {MOCK_EVENTS.slice(0, 2).map(evt => (
                  <div key={evt.id} className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-signal font-bold uppercase">{evt.category}</span>
                      <span className="text-[10px] text-zinc-500">{evt.capacity - evt.registeredCount} spots left</span>
                    </div>
                    <div className="text-white font-medium truncate">{evt.title}</div>
                    <div className="text-[10px] text-zinc-400 truncate">{evt.venue || 'Online Link'}</div>
                  </div>
                ))}
              </div>
            </div>
          </BracketCard>

          {/* Bento Item 4: High-Priority Pinned Announcements */}
          <BracketCard headerTag="04 // BROADCAST NOTICE" glowColor="signal">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">Urgent Broadcast</h3>
                <Link href="/announcements" className="text-[11px] font-mono text-signal hover:underline">
                  Feed &rarr;
                </Link>
              </div>

              {MOCK_ANNOUNCEMENTS.slice(0, 1).map(anc => (
                <div key={anc.id} className="p-3.5 rounded-xl bg-zinc-900 border border-signal/30 space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-signal">
                    <span className="font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-signal animate-ping" /> {anc.category}
                    </span>
                    <span className="text-[10px] text-zinc-500">EXAMS</span>
                  </div>
                  <h4 className="text-white font-medium text-xs leading-snug">{anc.title}</h4>
                  <p className="text-zinc-400 text-[11px] leading-relaxed line-clamp-2">
                    {anc.aiSummary}
                  </p>
                </div>
              ))}
            </div>
          </BracketCard>

          {/* Bento Item 5: People You Should Meet (Teammate Match) */}
          <BracketCard headerTag="05 // TELEMETRY MATCH" glowColor="ultra">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">People to Meet</h3>
                <Link href="/match" className="text-[11px] font-mono text-ultra hover:underline">
                  Find &rarr;
                </Link>
              </div>

              <div className="space-y-2.5">
                {MOCK_PEERS.slice(0, 2).map(peer => (
                  <div key={peer.id} className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={peer.avatarUrl} alt={peer.fullName} className="w-8 h-8 rounded-full object-cover border border-zinc-700" />
                      <div>
                        <div className="text-xs font-semibold text-white">{peer.fullName}</div>
                        <div className="text-[10px] font-mono text-zinc-400">{peer.collegeName.split(' ')[0]} • Sem {peer.semester}</div>
                      </div>
                    </div>
                    <ProgressRing progress={88} size={36} color="acid" />
                  </div>
                ))}
              </div>
            </div>
          </BracketCard>

          {/* Bento Item 6: Curated Study Notes */}
          <BracketCard headerTag="06 // ARCHIVE" glowColor="cyan" className="lg:col-span-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">Notes for 5th Semester</h3>
                <Link href="/materials" className="text-[11px] font-mono text-cyan hover:underline">
                  Explore Repository &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                {MOCK_MATERIALS.slice(0, 2).map(mat => (
                  <div key={mat.id} className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-zinc-500">
                      <span>{mat.subject}</span>
                      <span className="text-acid">{mat.upvotes} UPVOTES</span>
                    </div>
                    <h4 className="text-white font-medium truncate">{mat.title}</h4>
                    <p className="text-[10px] text-zinc-400 line-clamp-1">{mat.aiSummary}</p>
                  </div>
                ))}
              </div>
            </div>
          </BracketCard>

          {/* Bento Item 7: Leaderboard Snapshot */}
          <BracketCard headerTag="07 // LEAGUE SNAPSHOT" glowColor="signal">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">Leaderboard</h3>
                <Link href="/leaderboard" className="text-[11px] font-mono text-signal hover:underline">
                  Podium &rarr;
                </Link>
              </div>

              <div className="space-y-2 font-mono text-xs">
                {MOCK_LEADERBOARD.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-zinc-800">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${i === 0 ? 'text-signal' : 'text-zinc-500'}`}>#{item.rank}</span>
                      <span className="text-white text-xs truncate">{item.name}</span>
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
