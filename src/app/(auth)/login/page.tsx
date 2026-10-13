'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { HudLabel } from '@/components/ui/HudLabel';
import { PillButton } from '@/components/ui/PillButton';
import { StatusLED } from '@/components/ui/StatusLED';
import { Terminal, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    setLoading(true);
    // Simulate real auth validation / Supabase login
    setTimeout(() => {
      setLoading(false);
      toast.success('Mainframe access granted. Welcome back, Node!');
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-black font-body">
      {/* Left Column: Retro Terminal Visual */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-zinc-950 border-r border-zinc-900 crt-overlay">
        <div>
          <Logo />
          <div className="mt-16 space-y-4">
            <HudLabel label="SECURE GATEWAY // PROTOCOL v4" color="signal" />
            <h1 className="text-4xl font-heading font-semibold text-white tracking-tight">
              Connect to the Inter-College Grid.
            </h1>
            <p className="text-zinc-400 font-mono text-xs max-w-md leading-relaxed">
              Authenticate using your institutional credentials or personal student account. Row Level Security isolates your private attendance records and communication streams.
            </p>
          </div>
        </div>

        {/* Live Terminal Telemetry readout */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 font-mono text-xs text-zinc-400 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <StatusLED status="online" label="NODE LINK READY" />
            <span className="text-[10px] text-zinc-500">PORT: 443 // TLS 1.3</span>
          </div>
          <p className="text-[11px] text-acid">&gt; AUTH_LAYER: COOKIE_SSR_ACTIVE</p>
          <p className="text-[11px] text-zinc-500">&gt; ZERO_LEAKAGE: SERVICE_KEYS_SERVER_ENFORCED</p>
        </div>
      </div>

      {/* Right Column: Interactive Login Form */}
      <div className="flex flex-col justify-center px-6 sm:px-12 md:px-16 py-12 max-w-xl mx-auto w-full">
        <div className="lg:hidden mb-8">
          <Logo />
        </div>

        <div className="space-y-2 mb-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-white tracking-tight">
            Terminal Access
          </h2>
          <p className="text-zinc-400 font-mono text-xs">
            Enter your credentials to access your student dashboard.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="font-mono text-xs text-zinc-400 uppercase tracking-wider flex items-center justify-between">
              <span>College Email / Username</span>
              <Mail className="w-3.5 h-3.5 text-zinc-500" />
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="student@rvce.edu.in"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-signal font-mono text-sm transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-xs text-zinc-400 uppercase tracking-wider flex items-center justify-between">
              <span>Passphrase</span>
              <Lock className="w-3.5 h-3.5 text-zinc-500" />
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-signal font-mono text-sm transition-colors"
            />
          </div>

          <div className="flex items-center justify-between font-mono text-xs pt-1">
            <label className="flex items-center gap-2 text-zinc-400 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-zinc-800 bg-zinc-900 text-signal" />
              <span>Persist Session</span>
            </label>
            <Link href="/signup" className="text-signal hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-signal text-white font-medium hover:bg-signal/90 transition-all flex items-center justify-center gap-2 font-mono text-sm cursor-pointer shadow-lg shadow-signal/20 disabled:opacity-50"
          >
            {loading ? 'AUTHENTICATING...' : 'AUTHENTICATE ACCESS'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-900 flex items-center justify-between font-mono text-xs text-zinc-500">
          <span>New student node?</span>
          <Link href="/signup" className="text-white hover:text-signal underline transition-colors">
            Initialize Account &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
