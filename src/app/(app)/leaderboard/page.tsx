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
  Users,
  Building2,
  ExternalLink,
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
      <div className="space-y-10 font-body w-full">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <HudLabel label="LEAGUE // MERIT MATRIX" color="signal" />
              <span className="text-zinc-500 font-mono text-xs">• Verified Proof-of-Contribution Across 15 Campuses</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Leaderboard &amp; Inter-College Arena
            </h1>
            <p className="text-zinc-400 font-mono text-sm mt-1 max-w-3xl">
              Earn XP through peer-verified lecture notes, code collaboration, hackathon podiums, and attendance streaks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-4 py-2 rounded-full border transition-all ${
                timeframe === 'weekly' ? 'bg-signal text-white border-signal font-bold shadow-lg shadow-signal/20' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-4 py-2 rounded-full border transition-all ${
                timeframe === 'monthly' ? 'bg-signal text-white border-signal font-bold shadow-lg shadow-signal/20' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => {
                setTimeframe('all');
                fireConfetti();
              }}
              className={`px-4 py-2 rounded-full border transition-all ${
                timeframe === 'all' ? 'bg-signal text-white border-signal font-bold shadow-lg shadow-signal/20' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              All Time Matrix
            </button>
          </div>
        </div>

        {/* 1. Grand 3D Animated Podium for Top 3 */}
        <div className="pt-6 pb-8 px-4 rounded-3xl bg-gradient-to-b from-zinc-900/60 via-zinc-950/80 to-zinc-950 border border-zinc-800/80 shadow-2xl">
          <div className="text-center mb-6">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
              // CURRENT REPUTATION CHAMPIONS
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-3xl mx-auto items-end text-center font-mono">
            {/* Rank 2 (Silver) */}
            <div className="space-y-3 group">
              <div className="relative inline-block">
                <img
                  src={top3[1].avatar}
                  alt={top3[1].name}
                  className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-zinc-400 mx-auto shadow-xl group-hover:scale-105 transition-transform"
                />
                <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-md bg-zinc-300 text-black text-xs font-bold shadow">
                  #2
                </span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white truncate px-1">{top3[1].name}</div>
              <div className="text-xs text-zinc-400">{top3[1].college}</div>
              <div className="h-32 sm:h-44 rounded-t-2xl bg-zinc-800/90 border-t-4 border-zinc-400 flex flex-col justify-center items-center text-xs p-3 shadow-lg">
                <span className="text-white font-bold text-sm sm:text-base">{top3[1].xp} XP</span>
                <span className="text-[11px] text-zinc-400 mt-0.5">LVL {top3[1].level} NODES</span>
              </div>
            </div>

            {/* Rank 1 (Gold) */}
            <div className="space-y-3 group -mt-6">
              <div className="relative inline-block">
                <Crown className="w-8 h-8 text-amber-400 mx-auto mb-1 animate-bounce" />
                <img
                  src={top3[0].avatar}
                  alt={top3[0].name}
                  className="w-24 h-24 sm:w-36 sm:h-36 rounded-2xl object-cover border-4 border-amber-400 mx-auto shadow-2xl shadow-amber-400/25 group-hover:scale-105 transition-transform"
                />
                <span className="absolute -bottom-2 -right-2 px-3 py-1 rounded-md bg-amber-400 text-black text-xs font-bold shadow-lg">
                  #1 APEX
                </span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white truncate px-1">{top3[0].name}</div>
              <div className="text-xs text-amber-400/80">{top3[0].college}</div>
              <div className="h-44 sm:h-60 rounded-t-2xl bg-gradient-to-t from-amber-950/60 to-zinc-900 border-t-4 border-amber-400 flex flex-col justify-center items-center text-xs p-4 shadow-2xl">
                <span className="text-amber-400 font-bold text-lg sm:text-xl">{top3[0].xp} XP</span>
                <span className="text-[11px] text-zinc-300 mt-1 uppercase tracking-wider">SUPREME COMMAND // LVL {top3[0].level}</span>
              </div>
            </div>

            {/* Rank 3 (Bronze) */}
            <div className="space-y-3 group">
              <div className="relative inline-block">
                <img
                  src={top3[2].avatar}
                  alt={top3[2].name}
                  className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-signal mx-auto shadow-xl group-hover:scale-105 transition-transform"
                />
                <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-md bg-signal text-white text-xs font-bold shadow">
                  #3
                </span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white truncate px-1">{top3[2].name}</div>
              <div className="text-xs text-zinc-400">{top3[2].college}</div>
              <div className="h-28 sm:h-36 rounded-t-2xl bg-zinc-800/90 border-t-4 border-signal flex flex-col justify-center items-center text-xs p-3 shadow-lg">
                <span className="text-white font-bold text-sm sm:text-base">{top3[2].xp} XP</span>
                <span className="text-[11px] text-zinc-400 mt-0.5">LVL {top3[2].level} NODES</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Side-by-Side: Inter-College Battle & Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inter-College Battle Bars */}
          <BracketCard headerTag="INTER-COLLEGE BATTLE // AGGREGATE SCORES" glowColor="cyan" className="p-6">
            <div className="space-y-5 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-zinc-900">
                <span className="text-xs uppercase tracking-wider">CAMPUS NODE</span>
                <span className="text-xs uppercase tracking-wider">AGGREGATE REPUTATION XP</span>
              </div>

              {MOCK_COLLEGE_RANKS.map((col, idx) => (
                <div key={col.name} className="space-y-2 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                  <div className="flex justify-between items-center text-white">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-zinc-400">#{idx + 1}</span>
                      <span className="font-semibold text-sm">{col.name}</span>
                    </div>
                    <span className="text-acid font-bold text-sm">{col.points} XP <span className="text-zinc-500 text-xs font-normal">({col.members} Nodes)</span></span>
                  </div>
                  <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
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

          {/* Telemetry & Velocity Chart */}
          <BracketCard headerTag="TELEMETRY // 7-DAY XP MOMENTUM" glowColor="acid" className="p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-heading font-bold text-white">My XP Velocity</h3>
                  <span className="text-xs font-mono text-acid">+100 XP gained this week • Rank #4 Overall</span>
                </div>
                <TrendingUp className="w-6 h-6 text-acid" />
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={XP_HISTORY}>
                    <defs>
                      <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#B6FF3B" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#B6FF3B" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" stroke="#71717a" fontSize={12} />
                    <YAxis stroke="#71717a" fontSize={12} domain={[300, 450]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#09090b',
                        borderColor: '#27272a',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontFamily: 'monospace',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="xp"
                      stroke="#B6FF3B"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#xpGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Level Progress Gauge */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-4 font-mono text-xs">
                <div>
                  <span className="text-white font-bold text-sm block">Progress to Level {levelProgress.nextLevel}</span>
                  <span className="text-zinc-400 text-xs mt-0.5 block">
                    {levelProgress.xpRemaining} XP required for next rank promotion
                  </span>
                </div>
                <ProgressRing progress={levelProgress.progressPercentage} size={58} color="signal" />
              </div>
            </div>
          </BracketCard>
        </div>

        {/* 3. Full Leaderboard Roster Table */}
        <BracketCard headerTag="MATRIX ROSTER // EXPANDED NODES" glowColor="signal" className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold text-white">Full Contributor Leaderboard</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 uppercase text-[11px]">
                    <th className="pb-3 pl-3">Rank</th>
                    <th className="pb-3">Student Node</th>
                    <th className="pb-3">Institution</th>
                    <th className="pb-3">Level</th>
                    <th className="pb-3">Streak</th>
                    <th className="pb-3 text-right pr-3">Total Merit XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {MOCK_LEADERBOARD.map((user, idx) => (
                    <tr
                      key={user.username}
                      className={`hover:bg-zinc-900/60 transition-colors ${
                        user.username === CURRENT_USER.username ? 'bg-signal/10 border-l-2 border-signal' : ''
                      }`}
                    >
                      <td className="py-4 pl-3">
                        <span className={`font-bold text-sm ${idx < 3 ? 'text-amber-400' : 'text-zinc-400'}`}>
                          #{idx + 1}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-xl object-cover border border-zinc-800"
                          />
                          <div>
                            <span className="text-white font-semibold text-sm block">{user.name}</span>
                            <span className="text-zinc-500 text-[11px]">@{user.name.toLowerCase().replace(' ', '_')}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-zinc-300 font-medium">{user.college}</td>
                      <td className="py-4">
                        <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold">
                          LVL {user.level}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="flex items-center gap-1.5 text-signal font-bold">
                          <Flame className="w-4 h-4 fill-signal" /> {user.streak || 12}d
                        </span>
                      </td>
                      <td className="py-4 text-right pr-3">
                        <span className="text-acid font-bold text-base">{user.xp} XP</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </BracketCard>
      </div>
    </AppShell>
  );
}
