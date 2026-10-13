'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { HudLabel } from '@/components/ui/HudLabel';
import { StatusLED } from '@/components/ui/StatusLED';
import { ArrowRight, Mail, Lock, User, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const intent = searchParams.get('intent') || 'general';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [detectedCollege, setDetectedCollege] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Detect Bengaluru college from domain
    if (email.includes('@rvce.edu.in')) {
      setDetectedCollege('RV College of Engineering (Verified Institutional Node)');
    } else if (email.includes('@bmsce.ac.in')) {
      setDetectedCollege('BMS College of Engineering (Verified Institutional Node)');
    } else if (email.includes('@pes.edu')) {
      setDetectedCollege('PES University (Verified Institutional Node)');
    } else if (email.includes('@iisc.ac.in')) {
      setDetectedCollege('Indian Institute of Science (Verified Institutional Node)');
    } else {
      setDetectedCollege('');
    }
  }, [email]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      toast.error('Please complete all registration parameters.');
      return;
    }

    setLoading(true);
    if (typeof window !== 'undefined') {
      document.cookie = 'campus_session=active; path=/; max-age=604800; SameSite=Lax';
      localStorage.setItem('campus_user_session', JSON.stringify({
        email,
        name: fullName,
        college: detectedCollege || 'RV College of Engineering',
        role: 'student',
      }));
    }

    toast.success('Node initialized! Proceeding to onboarding sequence...');
    router.push(`/onboarding?intent=${intent}`);
    setTimeout(() => {
      window.location.href = `/onboarding?intent=${intent}`;
    }, 400);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-black font-body">
      {/* Left Column */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-zinc-950 border-r border-zinc-900 crt-overlay">
        <div>
          <Logo />
          <div className="mt-16 space-y-4">
            <HudLabel label={`TARGET INTENT // ${intent.toUpperCase()}`} color="acid" />
            <h1 className="text-4xl font-heading font-semibold text-white tracking-tight">
              Initialize Your Campus Identity.
            </h1>
            <p className="text-zinc-400 font-mono text-xs max-w-md leading-relaxed">
              Join 15 Bengaluru college nodes. Verified college domain emails receive immediate verified badge access and automatic campus matching.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 font-mono text-xs text-zinc-400 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <StatusLED status="online" label="REGISTRATION POOL READY" />
            <span className="text-acid text-[10px]">+25 XP WELCOME REWARD</span>
          </div>
          <p className="text-[11px] text-zinc-400">&gt; ZERO_SPAM: Granular student privacy controls</p>
          <p className="text-[11px] text-zinc-400">&gt; REALTIME: Cross-college collaboration &amp; attendance math</p>
        </div>
      </div>

      {/* Right Column Form */}
      <div className="flex flex-col justify-center px-6 sm:px-12 md:px-16 py-12 max-w-xl mx-auto w-full">
        <div className="lg:hidden mb-8">
          <Logo />
        </div>

        <div className="space-y-2 mb-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-white tracking-tight">
            Create Student Node
          </h2>
          <p className="text-zinc-400 font-mono text-xs">
            Free inter-college network access in 30 seconds.
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1.5">
            <label className="font-mono text-xs text-zinc-400 uppercase tracking-wider flex items-center justify-between">
              <span>Full Name</span>
              <User className="w-3.5 h-3.5 text-zinc-500" />
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Arjun Venkatesh"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-signal font-mono text-sm transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-xs text-zinc-400 uppercase tracking-wider flex items-center justify-between">
              <span>College or Personal Email</span>
              <Mail className="w-3.5 h-3.5 text-zinc-500" />
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@college.edu.in"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-signal font-mono text-sm transition-colors"
            />
            {detectedCollege && (
              <div className="flex items-center gap-1.5 text-acid font-mono text-[11px] pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{detectedCollege}</span>
              </div>
            )}
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
              placeholder="At least 8 characters"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-signal font-mono text-sm transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-signal text-white font-medium hover:bg-signal/90 transition-all flex items-center justify-center gap-2 font-mono text-sm cursor-pointer shadow-lg shadow-signal/20 mt-2 disabled:opacity-50"
          >
            {loading ? 'INITIALIZING NODE...' : 'INITIALIZE & ONBOARD'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-900 flex items-center justify-between font-mono text-xs text-zinc-500">
          <span>Already registered?</span>
          <Link href="/login" className="text-white hover:text-signal underline transition-colors">
            Access Terminal &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <SignupContent />
    </Suspense>
  );
}
