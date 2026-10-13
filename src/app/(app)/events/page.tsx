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
      <div className="space-y-8 font-body">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HudLabel label="ARENA // CAMPUS EVENTS" color="acid" />
              <span className="text-zinc-500 font-mono text-xs">• Realtime QR Validation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-white tracking-tight">
              Hackathons, Workshops &amp; Tech Talks
            </h1>
            <p className="text-zinc-400 font-mono text-xs mt-0.5">
              Participate in flagship competitions across 15 engineering campuses.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full border transition-all ${
                activeTab === 'all'
                  ? 'bg-signal text-white border-signal'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setActiveTab('registered')}
              className={`px-4 py-2 rounded-full border transition-all ${
                activeTab === 'registered'
                  ? 'bg-signal text-white border-signal'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              My Tickets ({events.filter(e => e.isRegistered).length})
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(evt => {
            const spotsRemaining = evt.capacity - evt.registeredCount;
            const pct = Math.round((evt.registeredCount / evt.capacity) * 100);

            return (
              <BracketCard
                key={evt.id}
                headerTag={`${evt.category.toUpperCase()} // ${evt.mode.toUpperCase()}`}
                glowColor={evt.isRegistered ? 'acid' : 'signal'}
                className="flex flex-col justify-between overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="relative h-40 -mx-6 -mt-2 overflow-hidden rounded-t-[18px]">
                    <img
                      src={evt.bannerUrl}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-white font-mono text-[10px] border border-white/20">
                      {evt.organizerName}
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-white line-clamp-2">{evt.title}</h3>
                  <p className="text-xs font-mono text-zinc-400 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="space-y-1.5 font-mono text-xs text-zinc-400 pt-1">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="truncate">{new Date(evt.startTime).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="truncate">{evt.venue || evt.onlineLink || 'Campus Venue'}</span>
                    </div>
                  </div>

                  {/* Capacity Meter */}
                  <div className="space-y-1 font-mono text-[11px] pt-2">
                    <div className="flex justify-between text-zinc-400">
                      <span>Capacity</span>
                      <span className={spotsRemaining <= 10 ? 'text-signal font-bold' : 'text-acid'}>
                        {spotsRemaining} spots left
                      </span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-signal transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-900 mt-4 flex items-center justify-between">
                  {evt.isRegistered ? (
                    <PillButton
                      variant="outline"
                      onClick={() => setSelectedTicketEvent(evt)}
                      className="w-full text-acid border-acid/50 hover:bg-acid hover:text-black"
                    >
                      <QrCode className="w-3.5 h-3.5 mr-1.5" /> VIEW DIGITAL TICKET
                    </PillButton>
                  ) : (
                    <PillButton
                      variant="signal"
                      onClick={() => handleRegister(evt.id)}
                      className="w-full"
                    >
                      REGISTER NOW (+5 XP)
                    </PillButton>
                  )}
                </div>
              </BracketCard>
            );
          })}
        </div>

        {/* Digital QR Ticket Modal */}
        {selectedTicketEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="w-full max-w-sm rounded-[24px] bg-zinc-950 border-2 border-signal p-6 text-center space-y-6 font-mono relative crt-overlay">
              <button
                onClick={() => setSelectedTicketEvent(null)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white text-sm"
              >
                ✕
              </button>

              <div className="space-y-1">
                <HudLabel label="CRYPTOGRAPHIC TICKET" color="acid" />
                <h3 className="text-lg font-heading font-bold text-white mt-2">
                  {selectedTicketEvent.title}
                </h3>
                <p className="text-[10px] text-zinc-400">{selectedTicketEvent.venue}</p>
              </div>

              {/* High Contrast QR Code Display */}
              <div className="p-4 bg-white rounded-2xl mx-auto w-48 h-48 flex flex-col items-center justify-center shadow-2xl">
                <QrCode className="w-36 h-36 text-black" />
                <span className="text-[10px] text-black font-bold tracking-widest mt-1">
                  {selectedTicketEvent.qrToken}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-left space-y-1">
                  <div className="flex justify-between text-zinc-400 text-[10px]">
                    <span>ATTENDEE</span>
                    <span className="text-acid">VERIFIED</span>
                  </div>
                  <div className="text-white font-bold">{CURRENT_USER.fullName}</div>
                  <div className="text-zinc-500 text-[10px]">ID: {CURRENT_USER.username} • {CURRENT_USER.collegeName.split(' ')[0]}</div>
                </div>

                <p className="text-[10px] text-zinc-500">
                  Scan at event registration desk for instant check-in &amp; +15 XP bonus.
                </p>
              </div>

              <PillButton
                variant="signal"
                onClick={() => {
                  toast.success('Certificate generator unlocked upon check-in.');
                  window.open(`/verify/CERT-${selectedTicketEvent.qrToken}`, '_blank');
                }}
                className="w-full"
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
