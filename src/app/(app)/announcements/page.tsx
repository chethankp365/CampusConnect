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
  Building2,
  Calendar,
  Share2,
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

  const urgentList = announcements.filter(a => a.priority === 'urgent' || a.pinned);

  return (
    <AppShell>
      <div className="space-y-8 font-body w-full">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <HudLabel label="BROADCAST // VERIFIED AUDIENCE DISPATCH" color="ultra" />
              <span className="text-zinc-500 font-mono text-xs">• Filtered by RVCE Node &amp; Sem 5 Disciplines</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Targeted Campus Announcements
            </h1>
            <p className="text-zinc-400 font-mono text-sm mt-1 max-w-3xl">
              Zero WhatsApp noise. Realtime official academic notifications, placement advisories, and exam circulars with automatic AI TL;DR extraction.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={markAllRead}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono text-xs transition-colors shadow"
            >
              <CheckCheck className="w-4 h-4 text-acid" /> Mark All Read
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-mono text-xs px-4 py-2 rounded-full border transition-all ${
                selectedCategory === cat
                  ? 'bg-signal text-white border-signal font-bold shadow-lg shadow-signal/20'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* 2-Column Responsive Layout: Left Spotlight for Urgent/Pinned, Right Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Urgent Alerts (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <BracketCard headerTag="PRIORITY SPOTLIGHT // PINNED NOTICES" glowColor="signal" className="p-5">
              <div className="space-y-4">
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider block">
                  Urgent Institutional Advisories:
                </span>

                {urgentList.map(item => (
                  <div
                    key={`spot_${item.id}`}
                    className="p-4 rounded-xl bg-signal/10 border border-signal/30 space-y-2 font-mono text-xs shadow-md"
                  >
                    <div className="flex items-center justify-between text-signal">
                      <span className="flex items-center gap-1 font-bold">
                        <Pin className="w-3.5 h-3.5 fill-signal" /> HIGH PRIORITY
                      </span>
                      <span className="text-[10px] text-zinc-400">{item.category}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white font-sans">{item.title}</h4>
                    <p className="text-zinc-300 text-xs line-clamp-2 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </BracketCard>

            <BracketCard headerTag="VERIFIED PUBLISHERS // ROSTER" glowColor="cyan" className="p-5">
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <ShieldCheck className="w-5 h-5 text-acid" />
                  <div>
                    <span className="text-white font-semibold block">Office of the Controller of Exams</span>
                    <span className="text-zinc-500 text-[11px]">Academic Schedules &amp; Seating</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <Building2 className="w-5 h-5 text-cyan" />
                  <div>
                    <span className="text-white font-semibold block">Dept. of Training &amp; Placements</span>
                    <span className="text-zinc-500 text-[11px]">FTE &amp; Internship Openings</span>
                  </div>
                </div>
              </div>
            </BracketCard>
          </div>

          {/* Right Column: Full Feed (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {filtered.map(anc => {
              const isUrgent = anc.priority === 'urgent';

              return (
                <BracketCard
                  key={anc.id}
                  headerTag={`${anc.category.toUpperCase()} // ${anc.priority.toUpperCase()}`}
                  glowColor={isUrgent ? 'signal' : 'none'}
                  className={`p-6 transition-all ${isUrgent ? 'border-signal/50 bg-zinc-950' : 'bg-zinc-950/80'}`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {anc.pinned && (
                          <span className="flex items-center gap-1.5 text-xs font-mono text-signal bg-signal/15 px-2.5 py-1 rounded-md border border-signal/30 font-semibold">
                            <Pin className="w-3.5 h-3.5 fill-signal" /> PINNED
                          </span>
                        )}
                        <span className="font-mono text-xs text-zinc-400">
                          {new Date(anc.createdAt).toLocaleDateString('en-IN', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      {!anc.read && (
                        <span className="flex items-center gap-1.5 text-xs font-mono text-acid bg-acid/15 px-2.5 py-1 rounded-md border border-acid/30 font-bold">
                          <span className="w-2 h-2 rounded-full bg-acid animate-ping" /> UNREAD
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-white leading-snug">
                      {anc.title}
                    </h3>

                    <p className="text-zinc-300 font-mono text-sm leading-relaxed max-w-4xl">
                      {anc.body}
                    </p>

                    {/* AI TL;DR Section */}
                    <div className="pt-2">
                      {activeTldr === anc.id ? (
                        <div className="p-4 rounded-2xl bg-cyan/10 border border-cyan/40 font-mono text-xs space-y-1.5 shadow-lg shadow-cyan/5">
                          <span className="text-cyan font-bold flex items-center gap-2 text-xs">
                            <Sparkles className="w-4 h-4" /> GEMINI AI 1-LINE EXECUTIVE SUMMARY
                          </span>
                          <p className="text-zinc-200 text-sm leading-relaxed font-sans">{anc.aiSummary}</p>
                        </div>
                      ) : (
                        <button
                          onClick={() => setActiveTldr(anc.id)}
                          className="inline-flex items-center gap-2 text-xs font-mono text-cyan hover:underline p-1.5 rounded-lg hover:bg-cyan/10 transition-colors"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>Extract 1-Line AI TL;DR Summary</span>
                        </button>
                      )}
                    </div>

                    <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-acid" />
                        <span>Published by {anc.publisherName} ({anc.publisherRole})</span>
                      </span>
                      <span>AUDIENCE: ALL 15 CAMPUSES REGISTERED</span>
                    </div>
                  </div>
                </BracketCard>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
