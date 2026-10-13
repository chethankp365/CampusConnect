'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { HudLabel } from '@/components/ui/HudLabel';
import { BracketCard } from '@/components/ui/BracketCard';
import { PillButton } from '@/components/ui/PillButton';
import { StatusLED } from '@/components/ui/StatusLED';
import {
  ArrowLeft,
  Building2,
  Calendar,
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Briefcase,
  TrendingUp,
  Award,
  Sparkles,
  DollarSign,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { toast } from 'sonner';

interface KanbanCard {
  id: string;
  title: string;
  company: string;
  stipend?: string;
  location?: string;
  status: 'saved' | 'applied' | 'interview' | 'offer' | 'rejected';
  notes?: string;
  deadline?: string;
  appliedDate?: string;
}

const INITIAL_CARDS: KanbanCard[] = [
  {
    id: 'app_1',
    title: 'Frontend Systems Intern',
    company: 'Razorpay',
    stipend: '₹45,000 / mo',
    location: 'Bengaluru (Hybrid)',
    status: 'interview',
    notes: 'Round 1 technical review scheduled Friday. Deep dive on React reconciliation & Web Vitals.',
    deadline: 'Oct 25',
    appliedDate: 'Oct 08',
  },
  {
    id: 'app_2',
    title: 'Generative AI Fellow',
    company: 'IISc Computational Lab',
    stipend: '₹35,000 / mo',
    location: 'Bengaluru (On-site)',
    status: 'applied',
    notes: 'Submitted resume, research statement, and GitHub repository for RAG benchmarks.',
    deadline: 'Oct 22',
    appliedDate: 'Oct 10',
  },
  {
    id: 'app_3',
    title: 'Backend Platform Intern',
    company: 'Zerodha',
    stipend: '₹60,000 / mo',
    location: 'Bengaluru (Remote)',
    status: 'saved',
    notes: 'Brush up Go concurrency primitives, PostgreSQL partitioning, and Kafka streaming.',
    deadline: 'Nov 05',
    appliedDate: 'Not submitted',
  },
  {
    id: 'app_4',
    title: 'Systems Research Assistant',
    company: 'IIIT-B Embedded Lab',
    stipend: '₹40,000 / mo',
    location: 'Electronic City',
    status: 'offer',
    notes: 'Letter of recommendation + published paper opportunity with faculty guide.',
    deadline: 'Accepted',
    appliedDate: 'Sep 28',
  },
  {
    id: 'app_5',
    title: 'Compiler & Tooling Engineer Intern',
    company: 'Hasura',
    stipend: '₹50,000 / mo',
    location: 'Remote',
    status: 'saved',
    notes: 'Review GraphQL AST traversal and Rust runtime basics.',
    deadline: 'Nov 12',
    appliedDate: 'Not submitted',
  },
  {
    id: 'app_6',
    title: 'Distributed Systems Intern',
    company: 'Postman',
    stipend: '₹55,000 / mo',
    location: 'Bengaluru',
    status: 'applied',
    notes: 'OA test completed on HackerRank (Score: 100%). Waiting for recruiter call.',
    deadline: 'Oct 30',
    appliedDate: 'Oct 04',
  },
];

const COLUMNS: { key: KanbanCard['status']; label: string; subtext: string; color: string; border: string; bg: string }[] = [
  { key: 'saved', label: 'SAVED', subtext: 'Targeted Pipeline', color: 'text-zinc-300', border: 'border-zinc-800', bg: 'bg-zinc-950/60' },
  { key: 'applied', label: 'APPLIED', subtext: 'OA / Review Phase', color: 'text-cyan', border: 'border-cyan/30', bg: 'bg-cyan/5' },
  { key: 'interview', label: 'INTERVIEWING', subtext: 'Technical Rounds', color: 'text-signal', border: 'border-signal/30', bg: 'bg-signal/5' },
  { key: 'offer', label: 'OFFERS RECEIVED', subtext: 'Decision Stage', color: 'text-acid', border: 'border-acid/30', bg: 'bg-acid/5' },
  { key: 'rejected', label: 'ARCHIVED', subtext: 'Feedback Logged', color: 'text-zinc-500', border: 'border-zinc-800', bg: 'bg-zinc-950/40' },
];

export default function KanbanTrackerPage() {
  const [cards, setCards] = useState<KanbanCard[]>(INITIAL_CARDS);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newStipend, setNewStipend] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const moveCard = (id: string, newStatus: KanbanCard['status']) => {
    setCards(prev =>
      prev.map(c => (c.id === id ? { ...c, status: newStatus } : c))
    );
    toast.success(`Application updated to ${newStatus.toUpperCase()}`);
  };

  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim()) return;

    const newApp: KanbanCard = {
      id: `app_${Date.now()}`,
      title: newTitle,
      company: newCompany,
      stipend: newStipend || 'Competitive',
      status: 'saved',
      notes: newNotes,
      deadline: 'TBD',
      appliedDate: 'Today',
    };

    setCards(prev => [newApp, ...prev]);
    setIsNewModalOpen(false);
    setNewTitle('');
    setNewCompany('');
    setNewStipend('');
    setNewNotes('');
    toast.success('New application tracked in Pipeline!');
  };

  const savedCount = cards.filter(c => c.status === 'saved').length;
  const appliedCount = cards.filter(c => c.status === 'applied').length;
  const interviewCount = cards.filter(c => c.status === 'interview').length;
  const offerCount = cards.filter(c => c.status === 'offer').length;

  return (
    <AppShell>
      <div className="space-y-8 font-body w-full">
        {/* Navigation & Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-900">
          <div>
            <Link
              href="/opportunities"
              className="inline-flex items-center text-xs font-mono text-zinc-400 hover:text-signal mb-3 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" /> RETURN TO OPPORTUNITY DIRECTORY
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
                Application Kanban Command Center
              </h1>
              <HudLabel label="LIVE STAGES" color="signal" />
            </div>
            <p className="text-zinc-400 font-mono text-sm mt-1 max-w-3xl">
              Track multi-stage internship pipelines, OA deadlines, technical coding rounds, and compensation offers in one unified workspace.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <PillButton variant="signal" onClick={() => setIsNewModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Add Opportunity
            </PillButton>
          </div>
        </div>

        {/* Telemetry KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">Total Active</span>
              <span className="text-3xl font-heading font-bold text-white mt-0.5 block">{cards.length}</span>
              <span className="text-[11px] font-mono text-cyan">Across all stages</span>
            </div>
            <Briefcase className="w-8 h-8 text-cyan/40" />
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">In Interview</span>
              <span className="text-3xl font-heading font-bold text-signal mt-0.5 block">{interviewCount}</span>
              <span className="text-[11px] font-mono text-signal">Active evaluations</span>
            </div>
            <TrendingUp className="w-8 h-8 text-signal/40" />
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">Offers In Hand</span>
              <span className="text-3xl font-heading font-bold text-acid mt-0.5 block">{offerCount}</span>
              <span className="text-[11px] font-mono text-acid">100% acceptance ready</span>
            </div>
            <Award className="w-8 h-8 text-acid/40" />
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">Conversion Rate</span>
              <span className="text-3xl font-heading font-bold text-white mt-0.5 block">
                {Math.round(((interviewCount + offerCount) / (cards.length || 1)) * 100)}%
              </span>
              <span className="text-[11px] font-mono text-zinc-400">High response ratio</span>
            </div>
            <Sparkles className="w-8 h-8 text-amber-400/40" />
          </div>
        </div>

        {/* Kanban Board Grid - Expansive full-width layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5 items-start">
          {COLUMNS.map(col => {
            const colCards = cards.filter(c => c.status === col.key);

            return (
              <div
                key={col.key}
                className={`rounded-2xl ${col.bg} border ${col.border} p-4 flex flex-col min-h-[640px] transition-all`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-zinc-900 font-mono">
                  <div>
                    <span className={`text-sm font-bold tracking-wider ${col.color}`}>{col.label}</span>
                    <span className="text-[11px] text-zinc-500 block">{col.subtext}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-bold text-white">
                    {colCards.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-3.5 flex-1">
                  {colCards.map(card => (
                    <div
                      key={card.id}
                      className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition-all space-y-3 shadow-lg group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-acid font-mono text-xs font-bold uppercase tracking-wider">
                            {card.company}
                          </span>
                          <h3 className="text-sm font-semibold text-white mt-0.5 leading-snug group-hover:text-cyan transition-colors">
                            {card.title}
                          </h3>
                        </div>
                      </div>

                      {card.stipend && (
                        <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-300 bg-zinc-950/60 px-2.5 py-1 rounded-lg border border-zinc-800/80 w-fit">
                          <DollarSign className="w-3.5 h-3.5 text-acid" />
                          <span>{card.stipend}</span>
                        </div>
                      )}

                      {card.notes && (
                        <p className="text-zinc-400 font-mono text-xs leading-relaxed bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-800/50">
                          {card.notes}
                        </p>
                      )}

                      <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500 pt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Due: {card.deadline || 'Rolling'}
                        </span>
                        <span>Applied: {card.appliedDate}</span>
                      </div>

                      {/* Quick stage selector */}
                      <div className="pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-400 text-[11px]">Move Stage:</span>
                        <select
                          value={card.status}
                          onChange={e => moveCard(card.id, e.target.value as any)}
                          className="bg-zinc-800 text-white rounded-lg px-2.5 py-1 border border-zinc-700 text-xs focus:outline-none focus:border-cyan"
                        >
                          <option value="saved">Saved</option>
                          <option value="applied">Applied</option>
                          <option value="interview">Interview</option>
                          <option value="offer">Offer</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                  ))}

                  {colCards.length === 0 && (
                    <div className="py-16 text-center text-zinc-600 font-mono text-xs border border-dashed border-zinc-800/80 rounded-xl">
                      No applications in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for adding application */}
        {isNewModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-lg w-full bg-zinc-950 border border-zinc-800 p-6 rounded-2xl space-y-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <h3 className="text-xl font-heading font-bold text-white">Track New Opportunity</h3>
                <button
                  onClick={() => setIsNewModalOpen(false)}
                  className="text-zinc-500 hover:text-white font-mono text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddApplication} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1">ROLE / TITLE</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Distributed Systems Intern"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">COMPANY / INSTITUTION</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Postman, Razorpay, IISc"
                    value={newCompany}
                    onChange={e => setNewCompany(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">STIPEND / COMPENSATION</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹50,000 / month"
                    value={newStipend}
                    onChange={e => setNewStipend(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">NOTES / INTERVIEW PREPARATION</label>
                  <textarea
                    rows={3}
                    placeholder="Topics to study, interview dates, referral name..."
                    value={newNotes}
                    onChange={e => setNewNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-zinc-900">
                  <PillButton variant="outline" onClick={() => setIsNewModalOpen(false)}>
                    Cancel
                  </PillButton>
                  <PillButton variant="signal" type="submit">
                    Add to Pipeline
                  </PillButton>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
