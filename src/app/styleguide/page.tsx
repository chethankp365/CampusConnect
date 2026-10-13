'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { HudLabel } from '@/components/ui/HudLabel';
import { PillButton } from '@/components/ui/PillButton';
import { BracketCard } from '@/components/ui/BracketCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { TiltCard } from '@/components/ui/TiltCard';
import { StatusLED } from '@/components/ui/StatusLED';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { AnimatedCounter } from '@/components/motion/AnimatedCounter';
import { fireConfetti } from '@/components/motion/ConfettiBurst';
import { ArrowLeft, Sparkles, Terminal } from 'lucide-react';

export default function StyleguidePage() {
  return (
    <div className="min-h-screen p-6 sm:p-12 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-zinc-800">
        <div>
          <Link href="/" className="inline-flex items-center text-xs font-mono text-zinc-400 hover:text-signal mb-3 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> RETURN TO MAINFRAME
          </Link>
          <div className="flex items-center gap-3">
            <Logo />
            <HudLabel label="DESIGN SYSTEM // v1.0" color="acid" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <PillButton variant="signal" onClick={() => fireConfetti()}>
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Fire Confetti
          </PillButton>
        </div>
      </div>

      {/* Color Tokens */}
      <section className="space-y-4">
        <HudLabel label="01 / COLOR TOKENS" color="cyan" />
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
          <div className="p-4 rounded-xl bg-[#07070D] border border-white/10 text-white font-mono text-xs">
            <div className="h-10 rounded mb-2 bg-[#07070D] border border-white/20" />
            <div>--void</div>
            <div className="opacity-60 text-[10px]">#07070D</div>
          </div>
          <div className="p-4 rounded-xl bg-[#0A0A0F] border border-white/10 text-white font-mono text-xs">
            <div className="h-10 rounded mb-2 bg-[#0A0A0F] border border-white/20" />
            <div>--ink</div>
            <div className="opacity-60 text-[10px]">#0A0A0F</div>
          </div>
          <div className="p-4 rounded-xl bg-[#F4F1EA] border border-black/10 text-black font-mono text-xs">
            <div className="h-10 rounded mb-2 bg-[#F4F1EA] border border-black/20" />
            <div>--paper</div>
            <div className="opacity-60 text-[10px]">#F4F1EA</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-white font-mono text-xs">
            <div className="h-10 rounded mb-2 bg-[#FF4D1C]" />
            <div>--signal</div>
            <div className="opacity-60 text-[10px]">#FF4D1C</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-white font-mono text-xs">
            <div className="h-10 rounded mb-2 bg-[#B6FF3B] text-black font-bold flex items-center justify-center text-[10px]" />
            <div>--acid</div>
            <div className="opacity-60 text-[10px]">#B6FF3B</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-white font-mono text-xs">
            <div className="h-10 rounded mb-2 bg-[#5B5BFF]" />
            <div>--ultra</div>
            <div className="opacity-60 text-[10px]">#5B5BFF</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-white font-mono text-xs">
            <div className="h-10 rounded mb-2 bg-[#4FE3FF]" />
            <div>--cyan</div>
            <div className="opacity-60 text-[10px]">#4FE3FF</div>
          </div>
        </div>
      </section>

      {/* Pill Buttons & Interactive Elements */}
      <section className="space-y-4">
        <HudLabel label="02 / PILL BUTTON VARIANTS" color="signal" />
        <div className="p-6 rounded-[20px] bg-zinc-900/50 border border-zinc-800 flex flex-wrap items-center gap-3">
          <PillButton variant="white">Find study notes</PillButton>
          <PillButton variant="white">Discover events</PillButton>
          <PillButton variant="white">Match with teammates</PillButton>
          <PillButton variant="outline" icon={true}>Join free in 30 seconds</PillButton>
          <PillButton variant="signal">Create Collab</PillButton>
          <PillButton variant="dark">Terminal View</PillButton>
        </div>
      </section>

      {/* Cards: BracketCard, GlassCard, TiltCard */}
      <section className="space-y-4">
        <HudLabel label="03 / CARD ARCHITECTURE" color="acid" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BracketCard headerTag="TELEMETRY // NODE_RVCE" glowColor="signal">
            <h4 className="text-base font-semibold mb-2">Bracket Card</h4>
            <p className="text-xs font-mono text-zinc-400 mb-4">
              Retro mainframe chassis with corner brackets, monospaced header strip, and reactive border glow.
            </p>
            <StatusLED status="online" label="RLS ACTIVE" />
          </BracketCard>

          <GlassCard>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-zinc-400">GLASS PANEL</span>
              <StatusLED status="syncing" label="SYNCED" />
            </div>
            <h4 className="text-base font-semibold mb-2">GlassCard Component</h4>
            <p className="text-xs text-zinc-400 mb-4">
              Lightweight backdrop blur with 1px border gradient, calibrated for both light and dark backgrounds.
            </p>
            <ProgressRing progress={86} size={50} color="acid" />
          </GlassCard>

          <TiltCard className="p-6 bg-zinc-900/80 border border-zinc-700">
            <h4 className="text-base font-semibold mb-2">3D TiltCard with Glare</h4>
            <p className="text-xs text-zinc-400 mb-4">
              Interactive 3D perspective shift with dynamic cursor glare reflection.
            </p>
            <div className="flex items-center gap-2">
              <HudLabel label="PHYSICS ON" color="ultra" />
              <AnimatedCounter value={12450} prefix="+" suffix=" XP" className="text-xs text-signal font-bold" />
            </div>
          </TiltCard>
        </div>
      </section>

      {/* Progress Rings & Status Telemetry */}
      <section className="space-y-4">
        <HudLabel label="04 / METRIC GAUGES & COUNTERS" color="ultra" />
        <div className="p-6 rounded-[20px] bg-zinc-900/50 border border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <ProgressRing progress={92} color="acid" />
            <span className="font-mono text-xs text-zinc-400">Match Affinity</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ProgressRing progress={75} color="cyan" />
            <span className="font-mono text-xs text-zinc-400">Attendance Barrier</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ProgressRing progress={48} color="signal" />
            <span className="font-mono text-xs text-zinc-400">Warning Threshold</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ProgressRing progress={64} color="ultra" />
            <span className="font-mono text-xs text-zinc-400">Level 4 Completion</span>
          </div>
        </div>
      </section>

      {/* Skeleton & Empty States */}
      <section className="space-y-4">
        <HudLabel label="05 / SKELETONS & EMPTY STATES" color="muted" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkeletonCard />
          <EmptyState
            title="Search Index Clean"
            description="No matching hackathons or notes found for query 'quantum_crypto'."
            actionText="Reset Parameters"
            onAction={() => alert('Search filters cleared')}
          />
        </div>
      </section>
    </div>
  );
}
