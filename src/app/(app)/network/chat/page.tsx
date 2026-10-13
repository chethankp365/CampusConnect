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
  const activePeer = MOCK_PEERS[0]; // Ananya Deshmukh

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

    // Simulate peer typing back
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'peer',
        text: 'Awesome! Let me invite you to our Collab Board thread right away.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true,
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1500);
  };

  return (
    <AppShell>
      <div className="space-y-4 font-body max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
        {/* Chat Thread Header */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
          <div className="flex items-center gap-3">
            <Link href="/network" className="text-zinc-400 hover:text-white md:hidden">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="relative">
              <img
                src={activePeer.avatarUrl}
                alt={activePeer.fullName}
                className="w-10 h-10 rounded-full object-cover border border-zinc-700"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-acid border-2 border-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium text-sm">{activePeer.fullName}</span>
                <span className="text-[10px] font-mono text-zinc-500">[{activePeer.collegeName.split(' ')[0]}]</span>
              </div>
              <div className="text-[11px] font-mono text-zinc-400">Mobile Dev • 5th Sem ISE</div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-zinc-500">
            <ShieldCheck className="w-4 h-4 text-acid" />
            <span>ENCRYPTED 1:1 RLS THREAD</span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 rounded-2xl bg-zinc-950/60 border border-zinc-900 space-y-4 font-mono text-xs">
          <div className="text-center text-[10px] text-zinc-600 uppercase tracking-widest my-2">
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
                  className={`max-w-[78%] p-3.5 rounded-2xl leading-relaxed ${
                    isMe
                      ? 'bg-signal text-white rounded-br-none shadow-md shadow-signal/15'
                      : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-zinc-500 mt-1 px-1">
                  <span>{msg.time}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-cyan" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input Box */}
        <form onSubmit={handleSend} className="p-2 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message (Enter to send)..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            className="flex-1 bg-transparent px-3 py-2 text-white font-mono text-xs focus:outline-none placeholder-zinc-500"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-signal text-white hover:bg-signal/90 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </AppShell>
  );
}
