'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { TiltCard } from '@/components/ui/TiltCard';
import { BracketCard } from '@/components/ui/BracketCard';
import { HudLabel } from '@/components/ui/HudLabel';
import { PillButton } from '@/components/ui/PillButton';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { StatusLED } from '@/components/ui/StatusLED';
import { CURRENT_USER } from '@/lib/mock-data';
import {
  Flame,
  Trophy,
  Share2,
  MessageSquare,
  UserPlus,
  ShieldCheck,
  Github,
  Linkedin,
  Globe,
  Sparkles,
  Award,
  Zap,
  Building2,
  GraduationCap,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';

export default function UserProfilePage() {
  const params = useParams();
  const username = (params.username as string) || CURRENT_USER.username;
  const isMe = username === CURRENT_USER.username;
  const [connected, setConnected] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Public cryptographic profile card URL copied to clipboard!');
    }
  };

  const handleConnect = () => {
    setConnected(true);
    toast.success('Neural link request dispatched. +3 XP upon acceptance!');
  };

  return (
    <AppShell>
      <div className="space-y-10 font-body w-full">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <HudLabel label="IDENTITY // CRYPTOGRAPHIC PASSPORT" color="cyan" />
              <span className="text-zinc-500 font-mono text-xs">• Verified Autonomous Student Node</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              {CURRENT_USER.fullName}
            </h1>
            <p className="text-zinc-400 font-mono text-sm mt-1">
              Public profile verifiable across 15 engineering campuses.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <PillButton variant="outline" onClick={handleCopyLink}>
              <Share2 className="w-4 h-4 mr-2" /> Share Profile Card
            </PillButton>
          </div>
        </div>

        {/* Profile Card Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3D Tilt Avatar & Cryptographic Badge (4 cols) */}
          <div className="lg:col-span-4">
            <TiltCard className="bg-zinc-950 border border-zinc-800 p-8 flex flex-col items-center text-center space-y-6 shadow-2xl rounded-3xl">
              <div className="relative">
                <img
                  src={CURRENT_USER.avatarUrl}
                  alt={CURRENT_USER.fullName}
                  className="w-40 h-40 rounded-3xl object-cover border-4 border-signal shadow-2xl shadow-signal/25"
                />
                <span className="absolute -bottom-3 -right-2 px-3 py-1 rounded-lg bg-signal text-white font-mono text-xs font-bold shadow-lg">
                  LVL {CURRENT_USER.level}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2 text-white font-heading text-2xl font-bold">
                  <span>{CURRENT_USER.fullName}</span>
                  {CURRENT_USER.isCollegeVerified && (
                    <span title="Verified Institutional Node">
                      <ShieldCheck className="w-5 h-5 text-acid" />
                    </span>
                  )}
                </div>
                <p className="font-mono text-sm text-zinc-400">@{CURRENT_USER.username}</p>
              </div>

              <div className="flex items-center justify-center gap-3 font-mono text-sm text-zinc-400 py-1 px-4 rounded-xl bg-zinc-900 border border-zinc-800/80">
                <span className="text-signal font-bold flex items-center gap-1.5">
                  <Flame className="w-4 h-4 fill-signal" /> {CURRENT_USER.streak}d Streak
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-acid font-bold">{CURRENT_USER.xp} XP</span>
              </div>

              {CURRENT_USER.isMentor && (
                <span className="px-4 py-1.5 rounded-full bg-cyan/15 border border-cyan/40 text-cyan font-mono text-xs font-bold tracking-wide">
                  CAMPUS MENTOR ACTIVE
                </span>
              )}

              <div className="pt-2 w-full flex flex-col gap-3 font-mono text-xs">
                {!isMe && (
                  <PillButton
                    variant={connected ? 'outline' : 'signal'}
                    onClick={handleConnect}
                    className="w-full justify-center"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {connected ? 'LINK REQUESTED' : 'CONNECT NODE'}
                  </PillButton>
                )}
                <div className="flex items-center justify-center gap-4 pt-2 text-zinc-400">
                  <a href="#" className="hover:text-white transition-colors" title="GitHub"><Github className="w-5 h-5" /></a>
                  <a href="#" className="hover:text-white transition-colors" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                  <a href="#" className="hover:text-white transition-colors" title="Portfolio"><Globe className="w-5 h-5" /></a>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Bio, Skills, and Badges (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <BracketCard headerTag="NODE_TELEMETRY // ACADEMIC PROFILE" glowColor="cyan" className="p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-heading font-bold text-white">About Candidate</h2>
                  <p className="text-zinc-300 font-mono text-sm leading-relaxed mt-2.5">
                    {CURRENT_USER.bio}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-xs">
                  <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-1">
                    <span className="text-zinc-500 text-xs uppercase block">Institution</span>
                    <span className="text-white font-medium text-sm">{CURRENT_USER.collegeName}</span>
                  </div>
                  <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-1">
                    <span className="text-zinc-500 text-xs uppercase block">Discipline &amp; Standing</span>
                    <span className="text-white font-medium text-sm">{CURRENT_USER.branch} • Sem {CURRENT_USER.semester}</span>
                  </div>
                </div>

                <div>
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-3">
                    VERIFIED TECH COMPETENCIES:
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {CURRENT_USER.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-xs flex items-center gap-2 hover:border-cyan transition-colors"
                      >
                        <span className="font-semibold">{s.name}</span>
                        <span className="text-[11px] text-acid uppercase font-bold">({s.level})</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-3">
                    RESEARCH &amp; DOMAIN INTERESTS:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {CURRENT_USER.interests.map((int, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-300 font-mono text-xs"
                      >
                        #{int}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BracketCard>

            {/* Badges Earned */}
            <BracketCard headerTag="ACHIEVEMENTS // PROOF-OF-CONTRIBUTION" glowColor="acid" className="p-8">
              <div className="space-y-5">
                <h3 className="text-xl font-heading font-bold text-white">Cryptographic Badges Unlocked</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-signal shrink-0" />
                    <div>
                      <div className="text-white font-bold text-sm">Pioneer Badge</div>
                      <div className="text-xs text-zinc-400 mt-0.5">Genesis campus node</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
                    <Flame className="w-8 h-8 text-signal shrink-0" />
                    <div>
                      <div className="text-white font-bold text-sm">Consistency Cipher</div>
                      <div className="text-xs text-zinc-400 mt-0.5">12-day attendance streak</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
                    <Award className="w-8 h-8 text-acid shrink-0" />
                    <div>
                      <div className="text-white font-bold text-sm">Study Architect</div>
                      <div className="text-xs text-zinc-400 mt-0.5">420+ peer merit XP</div>
                    </div>
                  </div>
                </div>
              </div>
            </BracketCard>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
