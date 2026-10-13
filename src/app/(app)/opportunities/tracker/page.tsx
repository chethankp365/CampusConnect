'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { HudLabel } from '@/components/ui/HudLabel';
import { BracketCard } from '@/components/ui/BracketCard';
import { PillButton } from '@/components/ui/PillButton';
import {
  ArrowLeft,
  Building2,
  Calendar,
  Clock,
  Plus,
  Trash2,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';

interface KanbanCard {
  id: string;
  title: string;
  company: string;
  status: 'saved' | 'applied' | 'interview' | 'offer' | 'rejected';
  notes?: string;
  deadline?: string;
}

const INITIAL_CARDS: KanbanCard[] = [
  { id: 'app_1', title: 'Frontend Systems Intern', company: 'Razorpay', status: 'interview', notes: 'Round 1 technical review scheduled Friday.', deadline: 'Oct 25' },
  { id: 'app_2', title: 'Generative AI Fellow', company: 'IISc Computational Lab', status: 'applied', notes: 'Submitted resume and GitHub repo.', deadline: 'Oct 22' },
  { id: 'app_3', title: 'Backend Platform Intern', company: 'Zerodha', status: 'saved', notes: 'Brush up Go concurrency and Postgres partitioning.', deadline: 'Nov 05' },
  { id: 'app_4', title: 'Systems Research Assistant', company: 'IIIT-B Embedded Lab', status: 'offer', notes: 'Stipend ₹40,000 / mo + Letter of Recommendation.', deadline: 'Accepted' },
];

const COLUMNS = [
  { key: 'saved', label: 'SAVED (01)', color: 'text-zinc-400' },
  { key: 'applied', label: 'APPLIED (02)', color: 'text-cyan' },
  { key: 'interview', label: 'INTERVIEW (03)', color: 'text-signal' },
  { key: 'offer', label: 'OFFER (04)', color: 'text-acid' },
  { key: 'rejected', label: 'REJECTED (05)', color: 'text-zinc-600' },
];

export default function KanbanTrackerPage() {
  const [cards, setCards] = useState<KanbanCard[]>(INITIAL_CARDS);

  const moveCard = (id: string, newStatus: KanbanCard['status']) => {
    setCards(prev =>
      prev.map(c => (c.id === id ? { ...c, status: newStatus } : c))
    );
    toast.success(`Application updated to ${newStatus.toUpperCase()}`);
  };

  return (
    <AppShell>
      <div className="space-y-6 font-body">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-900">
          <div>
            <Link
              href="/opportunities"
              className="inline-flex items-center text-xs font-mono text-zinc-400 hover:text-signal mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> RETURN TO PIPELINE
            </Link>
            <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-white tracking-tight">
              Application Kanban Tracker
            </h1>
            <p className="text-zinc-400 font-mono text-xs mt-0.5">
              Track internship applications, OA deadlines, and technical interview stages.
            </p>
          </div>
        </div>

        {/* Kanban Board Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {COLUMNS.map(col => {
            const colCards = cards.filter(c => c.status === col.key);

            return (
              <div
                key={col.key}
                className="rounded-2xl bg-zinc-950/80 border border-zinc-800 p-3.5 flex flex-col min-h-[500px]"
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-900 font-mono text-xs">
                  <span className={`font-bold ${col.color}`}>{col.label}</span>
                  <span className="text-zinc-600 text-[11px]">{colCards.length}</span>
                </div>

                <div className="space-y-3 flex-1">
                  {colCards.map(card => (
                    <div
                      key={card.id}
                      className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 font-mono text-xs shadow-md hover:border-zinc-700 transition-colors"
                    >
                      <div className="text-acid text-[10px] uppercase font-bold">{card.company}</div>
                      <div className="text-white font-medium">{card.title}</div>
                      {card.notes && (
                        <p className="text-zinc-400 text-[10px] leading-relaxed bg-zinc-950/50 p-2 rounded">
                          {card.notes}
                        </p>
                      )}

                      {/* Quick stage selector */}
                      <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-500">
                        <span>STAGE &rarr;</span>
                        <select
                          value={card.status}
                          onChange={e => moveCard(card.id, e.target.value as any)}
                          className="bg-zinc-800 text-white rounded px-1.5 py-0.5 border border-zinc-700"
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
                    <div className="py-8 text-center text-zinc-600 font-mono text-[11px]">
                      Empty Column
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
