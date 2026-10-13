'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { HudLabel } from '@/components/ui/HudLabel';
import { BracketCard } from '@/components/ui/BracketCard';
import { PillButton } from '@/components/ui/PillButton';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { StatusLED } from '@/components/ui/StatusLED';
import { MOCK_PEERS, MOCK_COLLEGES } from '@/lib/mock-data';
import {
  Users,
  MessageSquare,
  UserPlus,
  ShieldCheck,
  Search,
  Filter,
  Layers,
  Sparkles,
  Flame,
  Award,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';

export default function NetworkPage() {
  const [peers, setPeers] = useState(MOCK_PEERS);
  const [search, setSearch] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('all');
  const [tab, setTab] = useState<'all' | 'mentors'>('all');

  const filtered = peers.filter(p => {
    const matchesSearch =
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.skills.some(s => s.name.toLowerCase().includes(search.toLowerCase())) ||
      p.branch.toLowerCase().includes(search.toLowerCase());
    const matchesCollege = collegeFilter === 'all' || p.collegeId === collegeFilter;
    const matchesTab = tab === 'all' || p.isMentor;
    return matchesSearch && matchesCollege && matchesTab;
  });

  const handleConnect = (id: string) => {
    setPeers(prev =>
      prev.map(p => (p.id === id ? { ...p, status: 'pending' } : p))
    );
    toast.success('Connection handshake dispatched. +3 XP upon acceptance.');
  };

  return (
    <AppShell>
      <div className="space-y-8 font-body w-full">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <HudLabel label="GRID // CROSS-CAMPUS CONNECTIONS" color="cyan" />
              <span className="text-zinc-500 font-mono text-xs">• 15 Bengaluru Colleges Interconnected</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Peer Directory &amp; Campus Mentors
            </h1>
            <p className="text-zinc-400 font-mono text-sm mt-1 max-w-3xl">
              Break out of isolated campus WhatsApp groups. Connect directly with peer coders, researchers, and senior mentors across RVCE, BMSCE, PES, MSRIT, and IISc.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <PillButton variant="outline" href="/network/collab">
              <Layers className="w-4 h-4 mr-2" /> Hackathon Collab Board
            </PillButton>
            <PillButton variant="signal" href="/network/chat">
              <MessageSquare className="w-4 h-4 mr-2" /> Realtime Chat Mesh
            </PillButton>
          </div>
        </div>

        {/* Telemetry Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">Connected Campuses</span>
              <span className="text-3xl font-heading font-bold text-cyan mt-0.5 block">15</span>
              <span className="text-[11px] font-mono text-zinc-400">Zero network barriers</span>
            </div>
            <Users className="w-8 h-8 text-cyan/30" />
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">Verified Student Nodes</span>
              <span className="text-3xl font-heading font-bold text-white mt-0.5 block">1,480+</span>
              <span className="text-[11px] font-mono text-acid">Domain auth validated</span>
            </div>
            <ShieldCheck className="w-8 h-8 text-acid/30" />
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">Senior Mentors</span>
              <span className="text-3xl font-heading font-bold text-signal mt-0.5 block">240+</span>
              <span className="text-[11px] font-mono text-signal">Available for code reviews</span>
            </div>
            <Award className="w-8 h-8 text-signal/30" />
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">Cross-Campus Teams</span>
              <span className="text-3xl font-heading font-bold text-white mt-0.5 block">84 Active</span>
              <span className="text-[11px] font-mono text-zinc-400">Formed for hackathons</span>
            </div>
            <Sparkles className="w-8 h-8 text-amber-400/30" />
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search peers by name, skills (e.g. 'Flutter', 'Next.js', 'PyTorch'), or branch..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 font-mono text-xs focus:outline-none focus:border-cyan transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <select
              value={collegeFilter}
              onChange={e => setCollegeFilter(e.target.value)}
              className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 focus:outline-none focus:border-cyan text-xs"
            >
              <option value="all">All 15 Colleges</option>
              {MOCK_COLLEGES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <button
              onClick={() => setTab(tab === 'all' ? 'mentors' : 'all')}
              className={`px-4 py-3 rounded-xl border transition-all ${
                tab === 'mentors'
                  ? 'bg-cyan text-black font-bold border-cyan shadow-lg shadow-cyan/20'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              {tab === 'mentors' ? '✓ Mentors Only Filter' : 'Filter Mentors'}
            </button>
          </div>
        </div>

        {/* Peer Grid - Spacious 3 to 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(peer => (
            <BracketCard
              key={peer.id}
              headerTag={`SEM 0${peer.semester} // ${peer.collegeName.split(' ')[0].toUpperCase()}`}
              glowColor={peer.isMentor ? 'cyan' : 'signal'}
              className="flex flex-col justify-between p-5 h-full hover:border-zinc-600 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={peer.avatarUrl}
                      alt={peer.fullName}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-zinc-700 shadow-md"
                    />
                    {peer.isMentor && (
                      <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded bg-cyan text-black font-mono text-[9px] font-bold shadow">
                        MENTOR
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-heading font-bold text-base leading-tight">
                      {peer.fullName}
                    </h3>
                    <div className="text-xs font-mono text-zinc-300 mt-0.5">{peer.branch}</div>
                    <div className="text-[11px] font-mono text-zinc-500">{peer.collegeName}</div>
                  </div>
                </div>

                <p className="text-xs font-mono text-zinc-300 line-clamp-3 leading-relaxed bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/50">
                  {peer.bio}
                </p>

                <div>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-2">
                    Verified Competencies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {peer.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 font-mono text-[11px] text-zinc-300 hover:border-cyan hover:text-white transition-colors"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-900 mt-5 flex items-center justify-between gap-3 font-mono text-xs">
                <div className="text-acid font-bold text-xs flex items-center gap-1">
                  <span>{peer.xp} XP</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-400">LVL {peer.level}</span>
                </div>

                {peer.status === 'connected' ? (
                  <Link
                    href={`/network/chat?user=${peer.id}`}
                    className="px-4 py-2 rounded-full bg-signal/20 text-signal border border-signal/40 font-semibold hover:bg-signal hover:text-white transition-all flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open Chat</span>
                  </Link>
                ) : peer.status === 'pending' ? (
                  <span className="text-zinc-500 text-xs italic">Handshake Pending...</span>
                ) : (
                  <button
                    onClick={() => handleConnect(peer.id)}
                    className="px-4 py-2 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-colors flex items-center gap-1.5 shadow"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Connect</span>
                  </button>
                )}
              </div>
            </BracketCard>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
