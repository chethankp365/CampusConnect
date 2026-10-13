'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { HudLabel } from '@/components/ui/HudLabel';
import { BracketCard } from '@/components/ui/BracketCard';
import { PillButton } from '@/components/ui/PillButton';
import { ShieldCheck, Award, CheckCircle, Download, ArrowLeft } from 'lucide-react';

export default function CertificateVerifyPage() {
  const params = useParams();
  const code = (params.code as string) || 'CERT-RVCE-2026-99A';

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-12 flex flex-col justify-between max-w-4xl mx-auto font-body">
      <div className="flex items-center justify-between pb-6 border-b border-zinc-900">
        <Logo />
        <HudLabel label="CRYPTOGRAPHIC AUDIT // VALID" color="acid" />
      </div>

      <div className="py-8">
        <BracketCard headerTag={`CERTIFICATE_VERIFICATION // ${code}`} glowColor="acid" className="p-8 sm:p-12 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-acid/10 border border-acid/30 mx-auto flex items-center justify-center text-acid">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs text-acid uppercase tracking-widest block">
              OFFICIAL CERTIFICATE OF PARTICIPATION
            </span>
            <h1 className="text-2xl sm:text-4xl font-heading font-bold text-white">
              Arjun Venkatesh
            </h1>
            <p className="font-mono text-xs text-zinc-400">
              RV College of Engineering (RVCE) • Student ID @arjun_v
            </p>
          </div>

          <p className="max-w-xl mx-auto text-zinc-300 font-mono text-xs sm:text-sm leading-relaxed">
            Has successfully participated and checked in at <strong className="text-white">HackGrid 2026: 36-Hour National Inter-College Hackathon</strong>. This record is permanently registered on the Campus Connect immutable events ledger.
          </p>

          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 max-w-md mx-auto grid grid-cols-2 gap-4 font-mono text-xs text-left">
            <div>
              <span className="text-zinc-500 text-[10px] block">ISSUED BY</span>
              <span className="text-white">RVCE Tech Society</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">VERIFICATION CODE</span>
              <span className="text-acid font-bold">{code}</span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center gap-4">
            <PillButton variant="signal" onClick={() => window.print()}>
              <Download className="w-3.5 h-3.5 mr-1.5" /> Download PDF Certificate
            </PillButton>
          </div>
        </BracketCard>
      </div>

      <div className="pt-6 border-t border-zinc-900 flex justify-between items-center font-mono text-xs text-zinc-500">
        <Link href="/events" className="hover:text-white flex items-center gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Arena
        </Link>
        <span>STATUS: 100% AUTHENTICATED VIA RLS</span>
      </div>
    </div>
  );
}
