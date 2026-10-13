'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { HudLabel } from '@/components/ui/HudLabel';
import { BracketCard } from '@/components/ui/BracketCard';
import { PillButton } from '@/components/ui/PillButton';
import { StatusLED } from '@/components/ui/StatusLED';
import { MOCK_COLLEGES, MOCK_MATERIALS } from '@/lib/mock-data';
import {
  Shield,
  Users,
  FileCheck,
  Building,
  Activity,
  CheckCircle,
  XCircle,
  AlertOctagon,
  RefreshCw,
  Search,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { toast } from 'sonner';

const ANALYTICS_DATA = [
  { metric: 'Mon', signups: 42, uploads: 18, aiQueries: 140 },
  { metric: 'Tue', signups: 58, uploads: 24, aiQueries: 210 },
  { metric: 'Wed', signups: 65, uploads: 32, aiQueries: 290 },
  { metric: 'Thu', signups: 82, uploads: 45, aiQueries: 340 },
  { metric: 'Fri', signups: 94, uploads: 51, aiQueries: 410 },
  { metric: 'Sat', signups: 110, uploads: 38, aiQueries: 380 },
  { metric: 'Sun', signups: 125, uploads: 29, aiQueries: 310 },
];

const PENDING_MODERATION = [
  {
    id: 'mod_1',
    title: 'Computer Networks Solved Lab Manual',
    uploader: 'Rahul Nayak',
    college: 'BMSCE',
    time: '20 mins ago',
  },
  {
    id: 'mod_2',
    title: 'Design of Machine Elements Handout',
    uploader: 'Pooja Hegde',
    college: 'PES University',
    time: '1h ago',
  },
];

export default function AdminPage() {
  const [pending, setPending] = useState(PENDING_MODERATION);
  const [activeTab, setActiveTab] = useState<'analytics' | 'moderation' | 'colleges' | 'audit'>('analytics');

  const handleApprove = (id: string) => {
    setPending(pending.filter(p => p.id !== id));
    toast.success('Material approved! +20 XP awarded to uploader and vector embedding generated.');
  };

  const handleReject = (id: string) => {
    setPending(pending.filter(p => p.id !== id));
    toast.error('Material rejected. Notification sent to student.');
  };

  const handleReindexEmbeddings = () => {
    toast.info('Triggering asynchronous pgvector HNSW re-index...');
    setTimeout(() => {
      toast.success('All campus content embeddings successfully re-indexed!');
    }, 1000);
  };

  return (
    <AppShell>
      <div className="space-y-8 font-body max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HudLabel label="ADMINISTRATION // GOVERNANCE CORE" color="signal" />
              <span className="text-zinc-500 font-mono text-xs">• Root Node Access Granted</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-white tracking-tight">
              Platform Analytics &amp; Moderation
            </h1>
            <p className="text-zinc-400 font-mono text-xs mt-0.5">
              Review campus telemetry, approve student lecture uploads, manage verified institutions, and view audit trails.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                activeTab === 'analytics' ? 'bg-signal text-white border-signal' : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('moderation')}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                activeTab === 'moderation' ? 'bg-signal text-white border-signal' : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              Moderation ({pending.length})
            </button>
            <button
              onClick={() => setActiveTab('colleges')}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                activeTab === 'colleges' ? 'bg-signal text-white border-signal' : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              Colleges
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                activeTab === 'audit' ? 'bg-signal text-white border-signal' : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              Audit Log
            </button>
          </div>
        </div>

        {/* 1. Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <BracketCard headerTag="METRIC // DAU" glowColor="acid">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-zinc-400">Daily Active Students</span>
                  <div className="text-2xl font-bold font-mono text-white">1,482</div>
                  <span className="text-[11px] font-mono text-acid">+18% this week</span>
                </div>
              </BracketCard>
              <BracketCard headerTag="METRIC // ARCHIVE" glowColor="cyan">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-zinc-400">Total Notes &amp; Papers</span>
                  <div className="text-2xl font-bold font-mono text-white">842</div>
                  <span className="text-[11px] font-mono text-cyan">99.4% approval rate</span>
                </div>
              </BracketCard>
              <BracketCard headerTag="METRIC // AI SYNTHESIS" glowColor="signal">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-zinc-400">N.O.V.A Queries Processed</span>
                  <div className="text-2xl font-bold font-mono text-white">4,890</div>
                  <span className="text-[11px] font-mono text-signal">Avg latency 320ms</span>
                </div>
              </BracketCard>
            </div>

            {/* Weekly Activity Recharts Bar Graph */}
            <BracketCard headerTag="WEEKLY TELEMETRY // ENGAGEMENT VOLUME" glowColor="cyan">
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-white">Activity Breakdown</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ANALYTICS_DATA}>
                      <XAxis dataKey="metric" stroke="#52525b" fontSize={11} />
                      <YAxis stroke="#52525b" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#09090b',
                          borderColor: '#27272a',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontFamily: 'monospace',
                        }}
                      />
                      <Bar dataKey="signups" fill="#FF4D1C" name="New Students" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="uploads" fill="#B6FF3B" name="Notes Uploaded" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="aiQueries" fill="#4FE3FF" name="AI Queries" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </BracketCard>

            <div className="flex justify-end">
              <PillButton variant="outline" onClick={handleReindexEmbeddings}>
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Reindex Gemini 768d Vector Store
              </PillButton>
            </div>
          </div>
        )}

        {/* 2. Moderation Tab */}
        {activeTab === 'moderation' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
              <span>PENDING STUDY MATERIALS QUEUE</span>
              <span className="text-acid">{pending.length} ITEMS AWAITING REVIEW</span>
            </div>

            {pending.map(item => (
              <BracketCard key={item.id} headerTag="PENDING VERIFICATION" glowColor="signal">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                  <div>
                    <h4 className="text-white font-bold text-sm">{item.title}</h4>
                    <p className="text-zinc-400 text-xs mt-0.5">
                      Uploaded by {item.uploader} ({item.college}) • {item.time}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleReject(item.id)}
                      className="px-3.5 py-1.5 rounded-full border border-red-900 bg-red-950/40 text-red-400 hover:bg-red-900 flex items-center gap-1.5 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="px-3.5 py-1.5 rounded-full border border-emerald-900 bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900 flex items-center gap-1.5 transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Approve (+20 XP)
                    </button>
                  </div>
                </div>
              </BracketCard>
            ))}

            {pending.length === 0 && (
              <div className="p-12 text-center rounded-2xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-acid">
                Queue clean. All submitted study materials verified and public.
              </div>
            )}
          </div>
        )}

        {/* 3. Colleges Tab */}
        {activeTab === 'colleges' && (
          <div className="space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between text-zinc-400">
              <span>CONNECTED INSTITUTIONS</span>
              <span className="text-acid">{MOCK_COLLEGES.length} CAMPUSES VERIFIED</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_COLLEGES.map(c => (
                <div key={c.id} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold">{c.name}</div>
                    <div className="text-zinc-400 text-[10px]">{c.city} • Institutional Domain Active</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-acid/15 text-acid font-bold text-[10px]">
                    VERIFIED
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Audit Log Tab */}
        {activeTab === 'audit' && (
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 font-mono text-xs space-y-3">
            <span className="text-zinc-500 uppercase block pb-2 border-b border-zinc-900">
              IMMUTABLE SECURITY AUDIT LOG (RLS MONITORED)
            </span>
            <div className="space-y-2 text-[11px] text-zinc-400">
              <div>[2026-10-13 15:02:12 UTC] AUTH_SIGNUP: Node created @arjun_v [RVCE]</div>
              <div>[2026-10-13 15:04:45 UTC] POINTS_AWARD: +25 XP Pioneer Badge awarded</div>
              <div>[2026-10-13 15:10:02 UTC] EVENT_REGISTRATION: Ticket generated for HackGrid 2026</div>
              <div>[2026-10-13 15:18:30 UTC] ATTENDANCE_UPDATE: Log recorded for CS501 [owner_id verified]</div>
              <div>[2026-10-13 15:22:18 UTC] VECTOR_QUERY: pgvector match_profiles() executed (0.88 similarity)</div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
