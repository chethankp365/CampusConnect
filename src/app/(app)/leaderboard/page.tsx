'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { HudLabel } from '@/components/ui/HudLabel';
import { BracketCard } from '@/components/ui/BracketCard';
import { PillButton } from '@/components/ui/PillButton';
import { StatusLED } from '@/components/ui/StatusLED';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { fireConfetti } from '@/components/motion/ConfettiBurst';
import { MOCK_LEADERBOARD, MOCK_COLLEGE_RANKS, CURRENT_USER } from '@/lib/mock-data';
import { getLevelProgress } from '@/lib/scoring/levels';
import {
  Trophy,
  Flame,
  Medal,
  Sparkles,
  TrendingUp,
  Award,
  Crown,
  Shield,
  Zap,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const XP_HISTORY = [
  { day: 'Mon', xp: 320 },
  { day: 'Tue', xp: 340 },
  { day: 'Wed', xp: 365 },
  { day: 'Thu', xp: 390 },
  { day: 'Fri', xp: 405 },
  { day: 'Sat', xp: 410 },
  { day: 'Sun', xp: 420 },
];

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'all'>('all');
  const [scope, setScope] = useState<'everyone' | 'my_college'>('everyone');
  const levelProgress = getLevelProgress(CURRENT_USER.xp);

  const top3 = MOCK_LEADERBOARD.slice(0, 3);
  const remaining = MOCK_LEADERBOARD.slice(3);

  return (
    <AppShell>
      <div className="space-y-8 font-body max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HudLabel label="LEAGUE // MERIT MATRIX" color="signal" />
              <span className="text-zinc-500 font-mono text-xs">• Verified Proof-of-Contribution</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-white tracking-tight">
              Leaderboard &amp; College Battle
            </h1>
            <p className="text-zinc-400 font-mono text-xs mt-0.5">
              Accumulate XP through verified note uploads, peer upvotes, event participation, and daily check-ins.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                timeframe === 'weekly' ? 'bg-signal text-white border-signal' : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                timeframe === 'monthly' ? 'bg-signal text-white border-signal' : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeframe('all')}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                timeframe === 'all' ? 'bg-signal text-white border-signal' : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              All Time
            </button>
          </div>
        </div>

        {/* 1. 3D Animated Podium for Top 3 */}
        <div className="pt-4 pb-8">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto items-end text-center font-mono">
            {/* Rank 2 (Silver) */}
            <div className="space-y-2">
              <div className="relative inline-block">
                <img
                  src={top3[1].avatar}
                  alt={top3[1].name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-zinc-400 mx-auto shadow-lg"
                />
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded bg-zinc-300 text-black text-[10px] font-bold">
                  #2
                </span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white truncate">{top3[1].name}</div>
              <div className="text-[10px] text-zinc-400">{top3[1].college}</div>
              <div className="h-24 sm:h-32 rounded-t-2xl bg-zinc-800/80 border-t-2 border-zinc-400 flex flex-col justify-center text-xs">
                <span className="text-white font-bold">{top3[1].xp} XP</span>
                <span className="text-[10px] text-zinc-400">LVL {top3[1].level}</span>
              </div>
            </div>

            {/* Rank 1 (Gold) */}
            <div className="space-y-2">
              <div className="relative inline-block">
                <Crown className="w-6 h-6 text-amber-400 mx-auto mb-1 animate-bounce" />
                <img
                  src={top3[0].avatar}
                  alt={top3[0].name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-amber-400 mx-auto shadow-xl shadow-amber-400/20"
                />
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded bg-amber-400 text-black text-[10px] font-bold">
                  #1
                </span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white truncate">{top3[0].name}</div>
              <div className="text-[10px] text-zinc-400">{top3[0].college}</div>
              <div className="h-36 sm:h-44 rounded-t-2xl bg-amber-950/40 border-t-2 border-amber-400 flex flex-col justify-center text-xs">
                <span className="text-amber-400 font-bold text-sm sm:text-base">{top3[0].xp} XP</span>
                <span className="text-[10px] text-zinc-300">MAIN NODE // LVL {top3[0].level}</span>
              </div>
            </div>

            {/* Rank 3 (Bronze) */}
            <div className="space-y-2">
              <div className="relative inline-block">
                <img
                  src={top3[2].avatar}
                  alt={top3[2].name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-signal mx-auto shadow-lg"
                />
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded bg-signal text-white text-[10px] font-bold">
                  #3
                </span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white truncate">{top3[2].name}</div>
              <div className="text-[10px] text-zinc-400">{top3[2].college}</div>
              <div className="h-20 sm:h-24 rounded-t-2xl bg-zinc-800/80 border-t-2 border-signal flex flex-col justify-center text-xs">
                <span className="text-white font-bold">{top3[2].xp} XP</span>
                <span className="text-[10px] text-zinc-400">LVL {top3[2].level}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. College vs College Battle Bars */}
        <BracketCard headerTag="INTER-COLLEGE BATTLE // AGGREGATE SCORES" glowColor="cyan">
          <div className="space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between text-zinc-400">
              <span>CAMPUS NODE</span>
              <span>AGGREGATE REPUTATION XP</span>
            </div>

            {MOCK_COLLEGE_RANKS.map((col, idx) => (
              <div key={col.name} className="space-y-1.5">
                <div className="flex justify-between text-white">
                  <span className="font-medium">
                    #{idx + 1} {col.name}
                  </span>
                  <span className="text-acid font-bold">{col.points} XP ({col.members} Nodes)</span>
                </div>
                <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(col.points / 5000) * 100}%`,
                      backgroundColor: col.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </BracketCard>

        {/* 3. My Stats & Level Progress with Recharts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* XP History Chart */}
          <BracketCard headerTag="TELEMETRY // 7-DAY XP MOMENTUM" glowColor="acid">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">My XP Velocity</h3>
                  <span className="text-xs font-mono text-acid">+100 XP gained this week</span>
                </div>
                <TrendingUp className="w-5 h-5 text-acid" />
              </div>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={XP_HISTORY}>
                    <defs>
                      <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#B6FF3B" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#B6FF3B" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" stroke="#52525b" fontSize={11} />
                    <YAxis stroke="#52525b" fontSize={11} domain={[300, 450]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#09090b',
                        borderColor: '#27272a',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontFamily: 'monospace',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="xp"
                      stroke="#B6FF3B"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#xpGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </BracketCard>

          {/* Level Progress Gauge */}
          <BracketCard headerTag="LEVEL ARCHITECTURE // LEVEL 4" glowColor="signal">
            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-bold text-base">Progress to Level {levelProgress.nextLevel}</span>
                  <div className="text-zinc-400 text-[11px] mt-0.5">
                    {levelProgress.xpRemaining} XP required for next rank promotion
                  </div>
                </div>
                <ProgressRing progress={levelProgress.progressPercentage} size={54} color="signal" />
              </div>

              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-2">
                <span className="text-zinc-500 uppercase text-[10px]">Active Multipliers:</span>
                <div className="flex justify-between text-zinc-300">
                  <span>Daily Streak Check-In</span>
                  <span className="text-acid">+2 XP / day</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>Verified Study Material Upload</span>
                  <span className="text-acid">+20 XP</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>Event Attendance QR Scan</span>
                  <span className="text-acid">+15 XP</span>
                </div>
              </div>
            </div>
          </BracketCard>
        </div>
      </div>
    </AppShell>
  );
}
