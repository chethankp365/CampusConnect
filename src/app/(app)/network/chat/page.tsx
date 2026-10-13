'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { HudLabel } from '@/components/ui/HudLabel';
import { StatusLED } from '@/components/ui/StatusLED';
import { CURRENT_USER, MOCK_PEERS } from '@/lib/mock-data';
import {
  Send,
  ArrowLeft,
  CheckCheck,
  User,
  Paperclip,
  Smile,
  ShieldCheck,
  Search,
  MessageSquare,
  Flame,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'me' | 'peer';
  text: string;
  time: string;
  read: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'peer',
    text: 'Hey Arjun! Saw your note on OS Kernel CPU schedulers. Super helpful for our upcoming BMSCE internals!',
    time: '10:14 AM',
    read: true,
  },
  {
    id: 'm2',
    sender: 'me',
    text: 'Glad it helped! Are you taking part in HackGrid 2026 this weekend?',
    time: '10:18 AM',
    read: true,
  },
  {
    id: 'm3',
    sender: 'peer',
    text: 'Yes! We have Flutter and UI ready, but we really need someone solid with Next.js and backend microservices. Interested in teaming up?',
    time: '10:20 AM',
    read: true,
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [selectedPeerId, setSelectedPeerId] = useState(MOCK_PEERS[0].id);

  const activePeer = MOCK_PEERS.find(p => p.id === selectedPeerId) || MOCK_PEERS[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'me',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'peer',
        text: 'Awesome! Let me invite you to our Collab Board thread right away.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true,
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1200);
  };

  return (
    <AppShell>
      <div className="space-y-6 font-body h-[calc(100vh-140px)] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HudLabel label="GRID // 1:1 REALTIME COMM" color="cyan" />
              <span className="text-zinc-500 font-mono text-xs">• Cross-College Encrypted Stream</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
              Realtime Peer Communications
            </h1>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-acid bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
            <ShieldCheck className="w-4 h-4" />
            <span>RLS ISOLATED THREAD</span>
          </div>
        </div>

        {/* 2-Column Full Width Chat Workspace */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 min-h-0">
          {/* Left Column: Conversations List */}
          <div className="hidden md:flex md:col-span-4 flex-col rounded-3xl bg-zinc-950 border border-zinc-800 p-4 space-y-4 overflow-hidden">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search peers or channels..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-cyan"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {MOCK_PEERS.map(p => {
                const active = p.id === activePeer.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPeerId(p.id)}
                    className={`p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                      active
                        ? 'bg-signal/15 border border-signal/40 shadow-md'
                        : 'bg-zinc-900/60 border border-zinc-800/80 hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className="relative shrink-0">
                        <img
                          src={p.avatarUrl}
                          alt={p.fullName}
                          className="w-11 h-11 rounded-2xl object-cover border border-zinc-700"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-acid border-2 border-black" />
                      </div>
                      <div className="truncate">
                        <div className="text-white text-sm font-semibold truncate">{p.fullName}</div>
                        <div className="text-[11px] font-mono text-zinc-400 truncate">{p.collegeName.split(' ')[0]}</div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 font-mono">
                      <span className="text-[10px] text-zinc-500">10:20 AM</span>
                      {active && <span className="block w-2 h-2 rounded-full bg-signal ml-auto mt-1" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Thread */}
          <div className="col-span-12 md:col-span-8 flex flex-col rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-2xl">
            {/* Thread Header */}
            <div className="p-4 sm:p-5 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/50">
              <div className="flex items-center gap-3.5">
                <Link href="/network" className="text-zinc-400 hover:text-white md:hidden">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="relative">
                  <img
                    src={activePeer.avatarUrl}
                    alt={activePeer.fullName}
                    className="w-11 h-11 rounded-2xl object-cover border border-zinc-700"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-acid border-2 border-black" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-base">{activePeer.fullName}</span>
                    <span className="text-xs font-mono text-zinc-400">[{activePeer.collegeName}]</span>
                  </div>
                  <div className="text-xs font-mono text-zinc-400">
                    {activePeer.branch} • {activePeer.skills.map(s => s.name).slice(0, 3).join(', ')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <StatusLED status="online" label="ACTIVE NOW" />
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 font-mono text-xs sm:text-sm">
              <div className="text-center text-[11px] text-zinc-600 uppercase tracking-widest my-2 font-bold">
                — TODAY —
              </div>

              {messages.map(msg => {
                const isMe = msg.sender === 'me';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] sm:max-w-[70%] p-4 rounded-2xl leading-relaxed ${
                        isMe
                          ? 'bg-signal text-white rounded-br-none shadow-lg shadow-signal/15'
                          : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 mt-1 px-1">
                      <span>{msg.time}</span>
                      {isMe && <CheckCheck className="w-3.5 h-3.5 text-cyan" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSend} className="p-3 bg-zinc-900/60 border-t border-zinc-800 flex items-center gap-3">
              <input
                type="text"
                placeholder="Type your message to collaborator (Enter to send)..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                className="flex-1 bg-zinc-950 px-4 py-3 rounded-2xl border border-zinc-800 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-signal placeholder-zinc-500"
              />
              <button
                type="submit"
                className="p-3.5 rounded-2xl bg-signal text-white hover:bg-signal/90 transition-all cursor-pointer shadow-lg shadow-signal/20 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
