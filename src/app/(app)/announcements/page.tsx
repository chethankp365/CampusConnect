'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { HudLabel } from '@/components/ui/HudLabel';
import { BracketCard } from '@/components/ui/BracketCard';
import { PillButton } from '@/components/ui/PillButton';
import { StatusLED } from '@/components/ui/StatusLED';
import { MOCK_ANNOUNCEMENTS } from '@/lib/mock-data';
import {
  Bell,
  Sparkles,
  Pin,
  CheckCheck,
  Search,
  Filter,
  AlertTriangle,
  FileText,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(MOCK_ANNOUNCEMENTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTldr, setActiveTldr] = useState<string | null>(null);

  const categories = ['all', 'Exams', 'Placement', 'General', 'Academic', 'Hackathon'];

  const markAllRead = () => {
    setAnnouncements(prev => prev.map(a => ({ ...a, read: true })));
    toast.success('All broadcast items marked as read.');
  };

  const filtered = announcements.filter(
    a => selectedCategory === 'all' || a.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <AppShell>
      <div className="space-y-8 font-body max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HudLabel label="BROADCAST // SYSTEM NOTICES" color="ultra" />
              <span className="text-zinc-500 font-mono text-xs">• Audience Filtered (RVCE / Sem 5)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-white tracking-tight">
              Targeted Announcements
            </h1>
            <p className="text-zinc-400 font-mono text-xs mt-0.5">
              Zero clutter. Realtime academic notices and recruitment alerts tailored to your node.
            </p>
          </div>

          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white font-mono text-xs transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" /> Mark All Read
          </button>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-mono text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                selectedCategory === cat
                  ? 'bg-signal text-white border-signal'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Feed List */}
        <div className="space-y-4">
          {filtered.map(anc => {
            const isUrgent = anc.priority === 'urgent';

            return (
              <BracketCard
                key={anc.id}
                headerTag={`${anc.category.toUpperCase()} // ${anc.priority.toUpperCase()}`}
                glowColor={isUrgent ? 'signal' : 'none'}
                className={isUrgent ? 'border-signal/40 bg-zinc-950/80' : ''}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {anc.pinned && (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-signal bg-signal/10 px-2 py-0.5 rounded border border-signal/20">
                          <Pin className="w-3 h-3 fill-signal" /> PINNED
                        </span>
                      )}
                      <span className="font-mono text-xs text-zinc-500">
                        {new Date(anc.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    {!anc.read && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-acid bg-acid/10 px-2 py-0.5 rounded border border-acid/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-acid animate-ping" /> NEW
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-heading font-semibold text-white">
                    {anc.title}
                  </h3>

                  <p className="text-zinc-300 font-mono text-xs leading-relaxed">
                    {anc.body}
                  </p>

                  {/* AI TL;DR Section */}
                  <div className="pt-2">
                    {activeTldr === anc.id ? (
                      <div className="p-3 rounded-xl bg-cyan/10 border border-cyan/30 font-mono text-xs space-y-1">
                        <span className="text-cyan font-bold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" /> GEMINI TL;DR SUMMARY
                        </span>
                        <p className="text-zinc-300">{anc.aiSummary}</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveTldr(anc.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan hover:underline"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Extract 1-Line AI TL;DR</span>
                      </button>
                    )}
                  </div>

                  <div className="pt-3 border-t border-zinc-900 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-acid" />
                      <span>Published by {anc.publisherName} ({anc.publisherRole})</span>
                    </span>
                    <span>AUDIENCE: ALL REGISTERED NODES</span>
                  </div>
                </div>
              </BracketCard>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
