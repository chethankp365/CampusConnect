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
  Sparkles,
  ArrowUpRight,
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
    branch: 'Computer Science',
    semester: 5,
  },
  {
    id: 'mod_2',
    title: 'Design of Machine Elements Handout',
    uploader: 'Pooja Hegde',
    college: 'PES University',
    time: '1h ago',
    branch: 'Mechanical Eng.',
    semester: 6,
  },
  {
    id: 'mod_3',
    title: 'Cryptographic Protocols & Zero Knowledge Proofs Notes',
    uploader: 'Aditya Rao',
    college: 'RVCE',
    time: '2h ago',
    branch: 'Information Science',
    semester: 7,
  },
];

export default function AdminPage() {
  const [pending, setPending] = useState(PENDING_MODERATION);
  const [activeTab, setActiveTab] = useState<'analytics' | 'moderation' | 'colleges' | 'audit'>('analytics');

  const handleApprove = (id: string) => {
    setPending(pending.filter(p => p.id !== id));
    toast.success('Material approved! +20 XP awarded to student and pgvector 768d embedding generated.');
  };

  const handleReject = (id: string) => {
    setPending(pending.filter(p => p.id !== id));
    toast.error('Material rejected. Notification dispatched to student.');
  };

  const handleReindexEmbeddings = () => {
    toast.info('Triggering asynchronous pgvector HNSW re-index...');
    setTimeout(() => {
      toast.success('All campus content embeddings successfully re-indexed!');
    }, 1000);
  };

  return (
    <AppShell>
      <div className="space-y-8 font-body w-full">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <HudLabel label="ADMINISTRATION // PLATFORM GOVERNANCE CORE" color="signal" />
              <span className="text-zinc-500 font-mono text-xs">• Root Institutional Access Granted</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Platform Analytics &amp; Governance
            </h1>
            <p className="text-zinc-400 font-mono text-sm mt-1 max-w-3xl">
              Monitor multi-campus telemetry, review verified student lecture notes, manage connected institutional nodes, and inspect RLS security audit logs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-full border transition-all ${
                activeTab === 'analytics' ? 'bg-signal text-white border-signal font-bold shadow-lg shadow-signal/20' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              Telemetry
            </button>
            <button
              onClick={() => setActiveTab('moderation')}
              className={`px-4 py-2 rounded-full border transition-all ${
                activeTab === 'moderation' ? 'bg-signal text-white border-signal font-bold shadow-lg shadow-signal/20' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              Moderation ({pending.length})
            </button>
            <button
              onClick={() => setActiveTab('colleges')}
              className={`px-4 py-2 rounded-full border transition-all ${
                activeTab === 'colleges' ? 'bg-signal text-white border-signal font-bold shadow-lg shadow-signal/20' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              Colleges ({MOCK_COLLEGES.length})
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-2 rounded-full border transition-all ${
                activeTab === 'audit' ? 'bg-signal text-white border-signal font-bold shadow-lg shadow-signal/20' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              Security Audit
            </button>
          </div>
        </div>

        {/* 1. Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BracketCard headerTag="METRIC // DAU" glowColor="acid" className="p-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Daily Active Students</span>
                  <div className="text-4xl font-heading font-bold text-white">1,482</div>
                  <span className="text-xs font-mono text-acid font-semibold flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% WoW acceleration
                  </span>
                </div>
              </BracketCard>

              <BracketCard headerTag="METRIC // ARCHIVE" glowColor="cyan" className="p-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Verified Notes &amp; Exam Papers</span>
                  <div className="text-4xl font-heading font-bold text-white">842</div>
                  <span className="text-xs font-mono text-cyan font-semibold">99.4% faculty &amp; peer approval</span>
                </div>
              </BracketCard>

              <BracketCard headerTag="METRIC // AI SYNTHESIS" glowColor="signal" className="p-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">N.O.V.A Queries Processed</span>
                  <div className="text-4xl font-heading font-bold text-white">4,890</div>
                  <span className="text-xs font-mono text-signal font-semibold">320ms median latency</span>
                </div>
              </BracketCard>
            </div>

            {/* Weekly Activity Recharts Bar Graph */}
            <BracketCard headerTag="WEEKLY TELEMETRY // MULTI-CAMPUS ENGAGEMENT VOLUME" glowColor="cyan" className="p-6">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white">Platform Activity Breakdown</h3>
                    <p className="text-xs font-mono text-zinc-400 mt-0.5">
                      Daily cross-campus registrations, note uploads, and AI cognitive queries.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 font-mono text-xs">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#FF4D1C]" /> Students</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#B6FF3B]" /> Notes</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#4FE3FF]" /> AI Queries</span>
                  </div>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ANALYTICS_DATA}>
                      <XAxis dataKey="metric" stroke="#71717a" fontSize={12} />
                      <YAxis stroke="#71717a" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#09090b',
                          borderColor: '#27272a',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontFamily: 'monospace',
                        }}
                      />
                      <Bar dataKey="signups" fill="#FF4D1C" name="New Students" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="uploads" fill="#B6FF3B" name="Notes Uploaded" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="aiQueries" fill="#4FE3FF" name="AI Queries" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </BracketCard>

            <div className="flex justify-end">
              <PillButton variant="outline" onClick={handleReindexEmbeddings}>
                <RefreshCw className="w-4 h-4 mr-2" /> Reindex Gemini 768d Vector Store
              </PillButton>
            </div>
          </div>
        )}

        {/* 2. Moderation Tab */}
        {activeTab === 'moderation' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between font-mono text-xs text-zinc-400 pb-2 border-b border-zinc-900">
              <span className="text-sm font-semibold text-white">PENDING STUDY MATERIALS QUEUE</span>
              <span className="text-acid font-bold">{pending.length} ITEMS AWAITING PEER REVIEW</span>
            </div>

            <div className="space-y-4">
              {pending.map(item => (
                <BracketCard key={item.id} headerTag="PENDING VERIFICATION // STUDY MATERIAL" glowColor="signal" className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 font-mono text-xs">
                    <div className="space-y-1.5">
                      <h4 className="text-white font-heading font-bold text-lg">{item.title}</h4>
                      <p className="text-zinc-400 text-xs">
                        Uploaded by <span className="text-white font-medium">{item.uploader}</span> [{item.college}] • {item.branch} (Sem {item.semester}) • {item.time}
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300">
                          Handwritten PDF • 18 Pages
                        </span>
                        <span className="px-2 py-0.5 rounded bg-cyan/15 text-cyan border border-cyan/30 text-[11px]">
                          Automated OCR Passed
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleReject(item.id)}
                        className="px-5 py-2.5 rounded-full border border-red-900 bg-red-950/40 text-red-400 hover:bg-red-900 flex items-center gap-2 transition-colors font-bold text-xs"
                      >
                        <XCircle className="w-4 h-4" /> Reject Document
                      </button>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-5 py-2.5 rounded-full border border-emerald-900 bg-emerald-950/60 text-emerald-400 hover:bg-emerald-800 flex items-center gap-2 transition-colors font-bold text-xs shadow-lg shadow-emerald-950/40"
                      >
                        <CheckCircle className="w-4 h-4" /> Approve &amp; Award +20 XP
                      </button>
                    </div>
                  </div>
                </BracketCard>
              ))}

              {pending.length === 0 && (
                <div className="p-16 text-center rounded-3xl bg-zinc-950 border border-zinc-800 font-mono text-sm text-acid">
                  Queue Clean. All submitted study materials have been verified and indexed in vector storage.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. Colleges Tab */}
        {activeTab === 'colleges' && (
          <div className="space-y-6 font-mono text-xs">
            <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-zinc-900">
              <span className="text-sm font-semibold text-white">CONNECTED INSTITUTIONS</span>
              <span className="text-acid font-bold">{MOCK_COLLEGES.length} CAMPUSES ACTIVE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {MOCK_COLLEGES.map(c => (
                <div key={c.id} className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between hover:border-zinc-700 transition-colors">
                  <div>
                    <div className="text-white font-heading font-bold text-base">{c.name}</div>
                    <div className="text-zinc-400 text-xs mt-0.5">{c.city} • Institutional Domain Active</div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-acid/15 text-acid font-bold text-xs border border-acid/30">
                    VERIFIED
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Audit Log Tab */}
        {activeTab === 'audit' && (
          <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 font-mono text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
              <span className="text-zinc-400 font-semibold text-sm">
                IMMUTABLE SECURITY AUDIT LOG (POSTGRESQL RLS ENFORCED)
              </span>
              <span className="text-acid">STATUS: COMPLIANT</span>
            </div>
            <div className="space-y-3 text-xs text-zinc-400 divide-y divide-zinc-900/60">
              <div className="pt-2">[2026-10-13 15:02:12 UTC] AUTH_SIGNUP: Student node created @arjun_v [RVCE] (Auth ID: 77f98)</div>
              <div className="pt-2">[2026-10-13 15:04:45 UTC] MERIT_POINTS_AWARD: +25 XP Pioneer Badge awarded</div>
              <div className="pt-2">[2026-10-13 15:10:02 UTC] EVENT_REGISTRATION: Cryptographic ticket generated for HackGrid 2026</div>
              <div className="pt-2">[2026-10-13 15:18:30 UTC] ATTENDANCE_UPDATE: Log recorded for CS501 [owner_id verified]</div>
              <div className="pt-2">[2026-10-13 15:22:18 UTC] VECTOR_QUERY: pgvector match_profiles() executed (0.88 similarity)</div>
              <div className="pt-2">[2026-10-13 15:31:04 UTC] PEER_HANDSHAKE: Connection accepted between RVCE Node &amp; BMSCE Node</div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
