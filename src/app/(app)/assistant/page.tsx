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
} from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  sender: 'user' | 'nova';
  text: string;
  cardType?: string;
  cardData?: any;
}

const SUGGESTED_PROMPTS = [
  'Am I short on attendance this semester?',
  'Events and hackathons happening this month',
  'Who knows Flutter at another college?',
  'Top internship opportunities with stipend',
  'Find study notes for DBMS normalization',
];

function AssistantContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init_1',
      sender: 'nova',
      text: "Greetings, Arjun. I am N.O.V.A (Navigation & Opportunity Voice Assistant). I am grounded directly in live campus records across 15 engineering nodes. What would you like to query?",
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
      <div className="space-y-6 font-body max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-cyan/20 border-2 border-cyan flex items-center justify-center text-cyan shadow-lg shadow-cyan/20">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-acid border-2 border-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-semibold text-white">N.O.V.A Cognitive Core</h1>
                <HudLabel label="GROUNDED RAG" color="cyan" />
              </div>
              <p className="text-[11px] font-mono text-zinc-400">
                Grounded strictly in verified campus DB records • Asia/Kolkata timezone
              </p>
            </div>
          </div>

          <StatusLED status={loading ? 'syncing' : 'online'} label={loading ? 'THINKING' : 'READY'} />
        </div>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-4 rounded-2xl bg-zinc-950/60 border border-zinc-900 space-y-4 font-mono text-xs">
          {messages.map(msg => {
            const isNova = msg.sender === 'nova';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isNova ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl leading-relaxed ${
                    isNova
                      ? 'bg-zinc-900 border border-zinc-800 text-zinc-200'
                      : 'bg-signal text-white shadow-lg shadow-signal/15'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 mb-1">
                    {isNova ? <Sparkles className="w-3 h-3 text-cyan" /> : <User className="w-3 h-3" />}
                    <span>{isNova ? 'N.O.V.A ASSISTANT' : 'STUDENT QUERY'}</span>
                  </div>

                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Render Rich Result Cards if available */}
                  {msg.cardType === 'attendance' && (
                    <div className="mt-3 pt-3 border-t border-zinc-800 space-y-2">
                      <Link
                        href="/attendance"
                        className="inline-flex items-center gap-1 text-[11px] text-cyan hover:underline"
                      >
                        <Clock className="w-3.5 h-3.5" /> Open Attendance Guardian &rarr;
                      </Link>
                    </div>
                  )}

                  {msg.cardType === 'events' && (
                    <div className="mt-3 pt-3 border-t border-zinc-800 space-y-2">
                      <Link
                        href="/events"
                        className="inline-flex items-center gap-1 text-[11px] text-acid hover:underline"
                      >
                        <Calendar className="w-3.5 h-3.5" /> Browse Arena Events &rarr;
                      </Link>
                    </div>
                  )}

                  {msg.cardType === 'opportunities' && (
                    <div className="mt-3 pt-3 border-t border-zinc-800 space-y-2">
                      <Link
                        href="/opportunities"
                        className="inline-flex items-center gap-1 text-[11px] text-signal hover:underline"
                      >
                        <Briefcase className="w-3.5 h-3.5" /> View Opportunity Pipeline &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-2 text-xs font-mono text-cyan p-2 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-cyan animate-ping" />
              <span>N.O.V.A querying pgvector semantic index...</span>
            </div>
          )}
        </div>

        {/* Suggested Prompt Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none font-mono text-[11px]">
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(prompt)}
              className="px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-cyan whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Query Input Box */}
        <form
          onSubmit={e => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="p-2 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask N.O.V.A about notes, attendance, hackathons, or teammates..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 bg-transparent px-3 py-2 text-white font-mono text-xs focus:outline-none placeholder-zinc-500"
          />

          <button
            type="button"
            onClick={handleVoiceInput}
            className="p-2.5 rounded-xl text-zinc-500 hover:text-white transition-colors"
            title="Voice Input (Web Speech API)"
          >
            <Mic className="w-4 h-4" />
          </button>

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-xl bg-cyan text-black font-bold hover:bg-cyan/90 transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </AppShell>
  );
}

export default function AssistantPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <AssistantContent />
    </Suspense>
  );
}
