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
      toast.success('Public profile card URL copied to clipboard!');
    }
  };

  const handleConnect = () => {
    setConnected(true);
    toast.success('Neural link request dispatched. +3 XP upon acceptance!');
  };

  return (
    <AppShell>
      <div className="space-y-8 font-body max-w-5xl mx-auto">
        {/* Profile Card Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left Column: 3D Tilt Avatar & Cryptographic Badge */}
          <TiltCard className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col items-center text-center space-y-4 shadow-xl">
            <div className="relative">
              <img
                src={CURRENT_USER.avatarUrl}
                alt={CURRENT_USER.fullName}
                className="w-32 h-32 rounded-2xl object-cover border-2 border-signal shadow-lg shadow-signal/20"
              />
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md bg-signal text-white font-mono text-[10px] font-bold">
                LVL {CURRENT_USER.level}
              </span>
            </div>

            <div>
              <div className="flex items-center justify-center gap-1.5 text-white font-heading text-xl font-bold">
                <span>{CURRENT_USER.fullName}</span>
                {CURRENT_USER.isCollegeVerified && (
                  <span title="Verified Institutional Node">
                    <ShieldCheck className="w-4 h-4 text-acid" />
                  </span>
                )}
              </div>
              <p className="font-mono text-xs text-zinc-400 mt-0.5">@{CURRENT_USER.username}</p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
              <span className="text-signal font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-signal" /> {CURRENT_USER.streak}d Streak
              </span>
              <span>•</span>
              <span className="text-acid">{CURRENT_USER.xp} XP</span>
            </div>

            {CURRENT_USER.isMentor && (
              <span className="px-3 py-1 rounded-full bg-cyan/15 border border-cyan/30 text-cyan font-mono text-[11px] font-semibold">
                CAMPUS MENTOR ACTIVE
              </span>
            )}

            <div className="pt-2 w-full flex flex-col gap-2">
              {!isMe && (
                <PillButton
                  variant={connected ? 'outline' : 'signal'}
                  onClick={handleConnect}
                  className="w-full"
                >
                  <UserPlus className="w-3.5 h-3.5 mr-1.5" />
                  {connected ? 'LINK REQUESTED' : 'CONNECT NODE'}
                </PillButton>
              )}
              <PillButton variant="outline" onClick={handleCopyLink} className="w-full">
                <Share2 className="w-3.5 h-3.5 mr-1.5" /> SHARE PROFILE
              </PillButton>
            </div>
          </TiltCard>

          {/* Right Column: Bio, Skills, and Badges */}
          <div className="md:col-span-2 space-y-6">
            <BracketCard headerTag="NODE_TELEMETRY // ACADEMIC PROFILE" glowColor="cyan">
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-heading font-semibold text-white">About Candidate</h2>
                  <p className="text-zinc-300 font-mono text-xs leading-relaxed mt-2">
                    {CURRENT_USER.bio}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                  <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] uppercase block">Institution</span>
                    <span className="text-white font-medium">{CURRENT_USER.collegeName}</span>
                  </div>
                  <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] uppercase block">Discipline</span>
                    <span className="text-white font-medium">{CURRENT_USER.branch} • Sem {CURRENT_USER.semester}</span>
                  </div>
                </div>

                <div>
                  <span className="font-mono text-xs text-zinc-400 block mb-2">VERIFIED TECH SKILLS:</span>
                  <div className="flex flex-wrap gap-2">
                    {CURRENT_USER.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-white font-mono text-xs flex items-center gap-1.5"
                      >
                        <span>{s.name}</span>
                        <span className="text-[10px] text-acid uppercase font-semibold">({s.level})</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-mono text-xs text-zinc-400 block mb-2">RESEARCH &amp; DOMAIN INTERESTS:</span>
                  <div className="flex flex-wrap gap-2">
                    {CURRENT_USER.interests.map((int, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-300 font-mono text-xs"
                      >
                        #{int}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BracketCard>

            {/* Badges Earned */}
            <BracketCard headerTag="02 // CRYPTOGRAPHIC ACHIEVEMENTS" glowColor="acid">
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-white">Unlocked Badges</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-signal" />
                    <div>
                      <div className="text-white font-bold">Pioneer Badge</div>
                      <div className="text-[10px] text-zinc-400">Node genesis</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-2.5">
                    <Flame className="w-5 h-5 text-signal" />
                    <div>
                      <div className="text-white font-bold">Consistency Cipher</div>
                      <div className="text-[10px] text-zinc-400">7-day streak</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-acid" />
                    <div>
                      <div className="text-white font-bold">Early Bird</div>
                      <div className="text-[10px] text-zinc-400">100+ XP earned</div>
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
