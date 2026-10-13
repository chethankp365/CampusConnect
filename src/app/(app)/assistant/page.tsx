'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { HudLabel } from '@/components/ui/HudLabel';
import { BracketCard } from '@/components/ui/BracketCard';
import { PillButton } from '@/components/ui/PillButton';
import { StatusLED } from '@/components/ui/StatusLED';
import {
  Bot,
  Send,
  Sparkles,
  ArrowRight,
  User,
  Clock,
  Calendar,
  Briefcase,
  FileText,
  Users,
  Mic,
  ShieldCheck,
  Cpu,
  Layers,
  Database,
  Terminal,
} from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  sender: 'user' | 'nova';
  text: string;
  timestamp: string;
  cardType?: string;
  cardData?: any;
}

const SUGGESTED_PROMPTS = [
  'Am I short on attendance for any subjects this semester?',
  'What hackathons and tech symposiums are happening this month?',
  'Who knows Flutter or React Native at BMSCE and PES?',
  'Top internship opportunities with stipends above ₹40,000',
  'Find verified handwritten study notes for Operating Systems',
];

function AssistantContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init_1',
      sender: 'nova',
      text: "Greetings, Arjun. I am N.O.V.A (Navigation & Opportunity Voice Assistant), grounded directly in live relational records across 15 engineering nodes in Bengaluru. What campus query would you like to execute?",
      timestamp: '16:00',
    },
  ]);
  const [input, setInput] = useState(initialQuery);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      sendMessage(initialQuery);
    }
  }, [initialQuery]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend }),
      });
      const data = await res.json();

      const novaMsg: Message = {
        id: `nova_${Date.now()}`,
        sender: 'nova',
        text: data.response || 'Telemetry received from neural database.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cardType: data.cardType,
        cardData: data.cardData,
      };

      setMessages(prev => [...prev, novaMsg]);
    } catch (e) {
      toast.error('Failed to communicate with N.O.V.A cognitive node.');
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Web Speech API is not supported in this browser.');
      return;
    }
    toast.info('Listening for voice telemetry...');
  };

  return (
    <AppShell>
      <div className="space-y-6 font-body w-full">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <HudLabel label="N.O.V.A // COGNITIVE AGENT CORE" color="cyan" />
              <span className="text-zinc-500 font-mono text-xs">• Grounded in PostgreSQL + pgvector Embeddings</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Campus Intelligence Assistant
            </h1>
            <p className="text-zinc-400 font-mono text-sm mt-1">
              Ask natural queries across student attendance calculations, campus hackathons, peer skill graphs, and study archives.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <StatusLED status={loading ? 'syncing' : 'online'} label={loading ? 'REASONING...' : 'GROUNDED & READY'} />
          </div>
        </div>

        {/* Dual-Pane Cockpit: Left Telemetry & Shortcuts, Right Expansive Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[680px]">
          {/* Left Column: Diagnostics & Quick Prompts (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <BracketCard headerTag="AGENT DIAGNOSTICS // STATUS" glowColor="cyan" className="p-5">
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <Database className="w-4 h-4 text-cyan" />
                    <span className="text-zinc-300">Vector Store</span>
                  </div>
                  <span className="text-acid font-bold">15 Campuses Synced</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-acid" />
                    <span className="text-zinc-300">Grounding Policy</span>
                  </div>
                  <span className="text-white font-medium">Strict RLS Enforced</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-signal" />
                    <span className="text-zinc-300">LLM Engine</span>
                  </div>
                  <span className="text-zinc-400">Gemini 1.5 Flash</span>
                </div>
              </div>
            </BracketCard>

            <BracketCard headerTag="QUERY ACCELERATORS // ONE-TAP" glowColor="signal" className="p-5">
              <div className="space-y-3">
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider block">
                  Frequently Executed Prompts:
                </span>
                <div className="space-y-2">
                  {SUGGESTED_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(prompt)}
                      className="w-full text-left p-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-cyan text-zinc-300 hover:text-white font-mono text-xs transition-all flex items-start justify-between gap-2 group"
                    >
                      <span className="leading-snug">{prompt}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan shrink-0 mt-0.5" />
                    </button>
                  ))}
                </div>
              </div>
            </BracketCard>
          </div>

          {/* Right Column: Expansive Chat Console (8 cols) */}
          <div className="lg:col-span-8 flex flex-col rounded-3xl bg-zinc-950 border border-zinc-800/80 p-5 shadow-2xl h-[720px]">
            {/* Chat Stream */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 font-mono text-xs">
              {messages.map(msg => {
                const isNova = msg.sender === 'nova';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isNova ? 'items-start' : 'items-end'}`}
                  >
                    <div
                      className={`max-w-[85%] p-5 rounded-2xl leading-relaxed shadow-lg transition-all ${
                        isNova
                          ? 'bg-zinc-900/90 border border-zinc-800 text-zinc-200'
                          : 'bg-signal text-white shadow-signal/20'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 text-[11px] text-zinc-400 mb-2 border-b border-zinc-800/60 pb-1.5">
                        <div className="flex items-center gap-1.5">
                          {isNova ? <Sparkles className="w-3.5 h-3.5 text-cyan" /> : <User className="w-3.5 h-3.5 text-white" />}
                          <span className="font-bold tracking-wider">{isNova ? 'N.O.V.A COGNITIVE AGENT' : 'STUDENT QUERY'}</span>
                        </div>
                        <span className="text-[10px] text-zinc-500">{msg.timestamp}</span>
                      </div>

                      <p className="whitespace-pre-wrap text-sm font-sans leading-relaxed">{msg.text}</p>

                      {/* Interactive cards */}
                      {msg.cardType === 'attendance' && (
                        <div className="mt-4 pt-3 border-t border-zinc-800/80 space-y-2">
                          <Link
                            href="/attendance"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-950 border border-zinc-700 text-acid font-mono text-xs hover:border-acid transition-colors"
                          >
                            <span>Open Attendance Calculator &rarr;</span>
                          </Link>
                        </div>
                      )}

                      {msg.cardType === 'events' && (
                        <div className="mt-4 pt-3 border-t border-zinc-800/80 space-y-2">
                          <Link
                            href="/events"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-950 border border-zinc-700 text-cyan font-mono text-xs hover:border-cyan transition-colors"
                          >
                            <span>Browse Hackathons &amp; RSVP &rarr;</span>
                          </Link>
                        </div>
                      )}

                      {msg.cardType === 'match' && (
                        <div className="mt-4 pt-3 border-t border-zinc-800/80 space-y-2">
                          <Link
                            href="/match"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-950 border border-zinc-700 text-signal font-mono text-xs hover:border-signal transition-colors"
                          >
                            <span>Run Matchmaking Algorithm &rarr;</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 max-w-sm">
                  <div className="w-3 h-3 rounded-full bg-cyan animate-ping" />
                  <span className="text-zinc-400 font-mono text-xs">Querying pgvector &amp; synthesizing response...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="pt-4 border-t border-zinc-900 mt-2">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex items-center gap-3"
              >
                <div className="relative flex-1">
                  <Terminal className="w-4 h-4 text-zinc-500 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask N.O.V.A about attendance, notes, events, or peers..."
                    className="w-full pl-11 pr-12 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 font-mono text-xs focus:outline-none focus:border-cyan transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleVoiceInput}
                    title="Voice query input"
                    className="absolute right-3 top-2.5 p-1 text-zinc-400 hover:text-cyan transition-colors"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                </div>

                <PillButton variant="signal" type="submit" disabled={loading || !input.trim()}>
                  <Send className="w-4 h-4 mr-1.5" /> Transmit
                </PillButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default function AssistantPage() {
  return (
    <Suspense fallback={<div className="p-8 text-white font-mono">Loading N.O.V.A Core...</div>}>
      <AssistantContent />
    </Suspense>
  );
}
