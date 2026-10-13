'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { HudLabel } from '@/components/ui/HudLabel';
import { BracketCard } from '@/components/ui/BracketCard';
import { PillButton } from '@/components/ui/PillButton';
import { StatusLED } from '@/components/ui/StatusLED';
import { MOCK_EVENTS, CURRENT_USER } from '@/lib/mock-data';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  QrCode,
  CheckCircle2,
  Share2,
  Sparkles,
  Download,
  ShieldCheck,
  Search,
  ExternalLink,
} from 'lucide-react';
import { toast } from 'sonner';

export default function EventsPage() {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [activeTab, setActiveTab] = useState<'all' | 'registered'>('all');
  const [search, setSearch] = useState('');
  const [selectedTicketEvent, setSelectedTicketEvent] = useState<typeof MOCK_EVENTS[0] | null>(null);

  const filtered = events.filter(e => {
    const matchesSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesTab = activeTab === 'all' || e.isRegistered;
    return matchesSearch && matchesTab;
  });

  const handleRegister = (id: string) => {
    setEvents(prev =>
      prev.map(e =>
        e.id === id
          ? {
              ...e,
              isRegistered: true,
              registeredCount: e.registeredCount + 1,
              qrToken: `TKT_${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
            }
          : e
      )
    );
    toast.success('Registration Confirmed! Digital QR Ticket Issued (+5 XP).');
  };

  return (
    <AppShell>
      <div className="space-y-10 font-body">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <HudLabel label="ARENA // CAMPUS EVENTS" color="acid" />
              <span className="text-zinc-500 font-mono text-sm">• Realtime QR Validation &amp; Verification</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
              Hackathons, Workshops &amp; Tech Talks
            </h1>
            <p className="text-zinc-400 font-mono text-sm max-w-2xl">
              Participate in flagship competitions, register for tickets, and earn verified participation credentials across 15 engineering campuses.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-full border transition-all text-sm font-semibold cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-signal text-white border-signal shadow-lg shadow-signal/20'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              All Events ({events.length})
            </button>
            <button
              onClick={() => setActiveTab('registered')}
              className={`px-5 py-2.5 rounded-full border transition-all text-sm font-semibold cursor-pointer ${
                activeTab === 'registered'
                  ? 'bg-signal text-white border-signal shadow-lg shadow-signal/20'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              My Tickets ({events.filter(e => e.isRegistered).length})
            </button>
          </div>
        </div>

        {/* Events Grid - Big Cards with High Impact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(evt => {
            const spotsRemaining = evt.capacity - evt.registeredCount;
            const pct = Math.round((evt.registeredCount / evt.capacity) * 100);

            return (
              <BracketCard
                key={evt.id}
                headerTag={`${evt.category.toUpperCase()} // ${evt.mode.toUpperCase()}`}
                glowColor={evt.isRegistered ? 'acid' : 'signal'}
                className="flex flex-col justify-between overflow-hidden p-8 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="relative h-48 -mx-8 -mt-4 overflow-hidden rounded-t-[20px]">
                    <img
                      src={evt.bannerUrl}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md text-white font-mono text-xs border border-white/20 font-medium">
                      {evt.organizerName}
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-white line-clamp-2 leading-snug">
                    {evt.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-zinc-400 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="space-y-2 font-mono text-xs sm:text-sm text-zinc-400 pt-2">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span className="truncate">{new Date(evt.startTime).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span className="truncate">{evt.venue || evt.onlineLink || 'Campus Tech Quad'}</span>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="space-y-1.5 font-mono text-xs pt-3">
                    <div className="flex justify-between text-zinc-400">
                      <span>Seat Capacity ({evt.registeredCount}/{evt.capacity})</span>
                      <span className={spotsRemaining <= 15 ? 'text-signal font-bold' : 'text-acid font-bold'}>
                        {spotsRemaining} spots left
                      </span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-signal to-acid transition-all duration-700 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-900 mt-6 flex items-center justify-between">
                  {evt.isRegistered ? (
                    <PillButton
                      variant="outline"
                      onClick={() => setSelectedTicketEvent(evt)}
                      className="w-full text-acid border-acid/50 hover:bg-acid hover:text-black text-sm py-3"
                    >
                      <QrCode className="w-4 h-4 mr-2" /> VIEW DIGITAL TICKET
                    </PillButton>
                  ) : (
                    <PillButton
                      variant="signal"
                      onClick={() => handleRegister(evt.id)}
                      className="w-full text-sm py-3"
                    >
                      REGISTER FOR EVENT (+5 XP)
                    </PillButton>
                  )}
                </div>
              </BracketCard>
            );
          })}
        </div>

        {/* Digital QR Ticket Modal - Spacious */}
        {selectedTicketEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="w-full max-w-md rounded-[32px] bg-zinc-950 border-2 border-signal p-8 text-center space-y-6 font-mono relative crt-overlay shadow-2xl">
              <button
                onClick={() => setSelectedTicketEvent(null)}
                className="absolute top-5 right-5 text-zinc-500 hover:text-white text-base"
              >
                ✕
              </button>

              <div className="space-y-1.5">
                <HudLabel label="CRYPTOGRAPHIC TICKET" color="acid" />
                <h3 className="text-xl font-heading font-bold text-white mt-2">
                  {selectedTicketEvent.title}
                </h3>
                <p className="text-xs text-zinc-400">{selectedTicketEvent.venue}</p>
              </div>

              {/* High Contrast QR Code */}
              <div className="p-6 bg-white rounded-3xl mx-auto w-56 h-56 flex flex-col items-center justify-center shadow-2xl">
                <QrCode className="w-44 h-44 text-black" />
                <span className="text-xs text-black font-bold tracking-widest mt-2">
                  {selectedTicketEvent.qrToken}
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-left space-y-1">
                  <div className="flex justify-between text-zinc-400 text-xs">
                    <span>ATTENDEE CREDENTIAL</span>
                    <span className="text-acid font-bold">VERIFIED</span>
                  </div>
                  <div className="text-white font-bold text-base">{CURRENT_USER.fullName}</div>
                  <div className="text-zinc-500 text-xs">ID: {CURRENT_USER.username} • {CURRENT_USER.collegeName}</div>
                </div>

                <p className="text-xs text-zinc-400">
                  Scan at event registration desk for instant check-in &amp; +15 XP bonus.
                </p>
              </div>

              <PillButton
                variant="signal"
                onClick={() => {
                  toast.success('Certificate generator unlocked upon check-in.');
                  window.open(`/verify/CERT-${selectedTicketEvent.qrToken}`, '_blank');
                }}
                className="w-full text-sm py-3"
              >
                View Public Certificate &rarr;
              </PillButton>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
