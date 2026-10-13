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
      p.skills.some(s => s.name.toLowerCase().includes(search.toLowerCase()));
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
      <div className="space-y-8 font-body">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HudLabel label="GRID // CROSS-CAMPUS CONNECTIONS" color="cyan" />
              <span className="text-zinc-500 font-mono text-xs">• 15 Colleges Linked</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-white tracking-tight">
              Peer Directory &amp; Mentorship
            </h1>
            <p className="text-zinc-400 font-mono text-xs mt-0.5">
              Connect with engineers across RVCE, BMSCE, PES, MSRIT, and IISc without intermediary barriers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <PillButton variant="outline" href="/network/collab">
              <Layers className="w-3.5 h-3.5 mr-1.5" /> Collab Board
            </PillButton>
            <PillButton variant="signal" href="/network/chat">
              <MessageSquare className="w-3.5 h-3.5 mr-1.5" /> Realtime Chat
            </PillButton>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by name, skill (e.g. 'Flutter', 'Python')..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 font-mono text-xs focus:outline-none focus:border-cyan"
            />
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <select
              value={collegeFilter}
              onChange={e => setCollegeFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 focus:outline-none"
            >
              <option value="all">All Colleges</option>
              {MOCK_COLLEGES.map(c => (
                <option key={c.id} value={c.id}>{c.name.split(' ')[0]}</option>
              ))}
            </select>

            <button
              onClick={() => setTab(tab === 'all' ? 'mentors' : 'all')}
              className={`px-3.5 py-2.5 rounded-xl border transition-all ${
                tab === 'mentors'
                  ? 'bg-cyan text-black font-bold border-cyan'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              {tab === 'mentors' ? '✓ Mentors Only' : 'Show Mentors'}
            </button>
          </div>
        </div>

        {/* Peer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(peer => (
            <BracketCard
              key={peer.id}
              headerTag={`SEM 0${peer.semester} // ${peer.collegeName.split(' ')[0].toUpperCase()}`}
              glowColor={peer.isMentor ? 'cyan' : 'signal'}
              className="flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <img
                    src={peer.avatarUrl}
                    alt={peer.fullName}
                    className="w-12 h-12 rounded-xl object-cover border border-zinc-700"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-white font-semibold text-base">{peer.fullName}</span>
                      {peer.isMentor && (
                        <span className="px-1.5 py-0.2 rounded bg-cyan/20 text-cyan font-mono text-[9px] font-bold">
                          MENTOR
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono text-zinc-400">{peer.branch}</div>
                    <div className="text-[10px] font-mono text-zinc-500 mt-0.5">{peer.collegeName}</div>
                  </div>
                </div>

                <p className="text-xs font-mono text-zinc-400 line-clamp-2 leading-relaxed">
                  {peer.bio}
                </p>

                <div>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase block mb-1">
                    Skills:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {peer.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-zinc-300"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-900 mt-4 flex items-center justify-between gap-3 font-mono text-xs">
                <div className="text-acid font-bold">{peer.xp} XP • L{peer.level}</div>
                {peer.status === 'connected' ? (
                  <Link
                    href={`/network/chat?user=${peer.id}`}
                    className="px-3.5 py-1.5 rounded-full bg-signal/15 text-signal border border-signal/30 font-medium hover:bg-signal hover:text-white transition-all flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat</span>
                  </Link>
                ) : peer.status === 'pending' ? (
                  <span className="text-zinc-500 text-xs italic">Handshake Pending...</span>
                ) : (
                  <button
                    onClick={() => handleConnect(peer.id)}
                    className="px-3.5 py-1.5 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors flex items-center gap-1"
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
