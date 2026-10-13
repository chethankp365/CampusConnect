'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { HudLabel } from '@/components/ui/HudLabel';
import { BracketCard } from '@/components/ui/BracketCard';
import { PillButton } from '@/components/ui/PillButton';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { StatusLED } from '@/components/ui/StatusLED';
import { MOCK_OPPORTUNITIES, CURRENT_USER } from '@/lib/mock-data';
import {
  Briefcase,
  ExternalLink,
  Kanban,
  Bookmark,
  Clock,
  MapPin,
  Building2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState(MOCK_OPPORTUNITIES);
  const [filterType, setFilterType] = useState<string>('all');
  const [activeMatchModal, setActiveMatchModal] = useState<typeof MOCK_OPPORTUNITIES[0] | null>(null);

  const calculateMatch = (reqSkills: string[]) => {
    const userSkillNames = CURRENT_USER.skills.map(s => s.name.toLowerCase());
    const matched = reqSkills.filter(s => userSkillNames.includes(s.toLowerCase()));
    const percentage = reqSkills.length > 0 ? Math.round((matched.length / reqSkills.length) * 100) : 100;
    const missing = reqSkills.filter(s => !userSkillNames.includes(s.toLowerCase()));
    return { percentage, matched, missing };
  };

  const handleSaveToTracker = (id: string) => {
    toast.success('Opportunity saved to your Kanban Application Tracker!');
  };

  const filtered = opportunities.filter(
    o => filterType === 'all' || o.type.toLowerCase() === filterType.toLowerCase()
  );

  return (
    <AppShell>
      <div className="space-y-10 font-body">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <HudLabel label="PIPELINE // CAREERS &amp; RESEARCH" color="signal" />
              <span className="text-zinc-500 font-mono text-sm">• Skill Match Assisted</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
              Internships, Hackathons &amp; Fellowships
            </h1>
            <p className="text-zinc-400 font-mono text-sm max-w-2xl">
              Verified corporate technology internships and university research labs across Bengaluru tech corridors.
            </p>
          </div>

          <PillButton variant="outline" href="/opportunities/tracker" className="text-sm px-6 py-3">
            <Kanban className="w-4 h-4 mr-2" /> Kanban Application Tracker
          </PillButton>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {['all', 'internship', 'research', 'hackathon'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`font-mono text-xs sm:text-sm px-5 py-2 rounded-full border transition-all cursor-pointer ${
                filterType === t
                  ? 'bg-signal text-white border-signal shadow-lg shadow-signal/20'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Opportunities List - Roomy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(opp => {
            const matchInfo = calculateMatch(opp.skillsRequired);

            return (
              <BracketCard
                key={opp.id}
                headerTag={`${opp.type.toUpperCase()} // ${opp.mode.toUpperCase()}`}
                glowColor={matchInfo.percentage >= 75 ? 'acid' : 'signal'}
                className="flex flex-col justify-between p-8 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs sm:text-sm font-mono text-acid font-bold block uppercase tracking-wider">
                        {opp.organization}
                      </span>
                      <h3 className="text-lg sm:text-xl font-heading font-bold text-white mt-1 leading-snug">
                        {opp.title}
                      </h3>
                    </div>
                    {/* Match percentage ring */}
                    <div
                      onClick={() => setActiveMatchModal(opp)}
                      className="cursor-pointer hover:scale-105 transition-transform shrink-0"
                      title="Click to view match explanation"
                    >
                      <ProgressRing progress={matchInfo.percentage} size={52} color="auto" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm font-mono text-zinc-400 line-clamp-3 leading-relaxed">
                    {opp.description}
                  </p>

                  <div className="space-y-2 font-mono text-xs sm:text-sm text-zinc-400 pt-2 border-t border-zinc-900">
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span className="truncate">{opp.location || 'Bengaluru / Hybrid'}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span className="text-acid font-bold">{opp.stipend || 'Competitive'}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="font-mono text-xs text-zinc-500 uppercase block mb-2 font-semibold">
                      Required Skills:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {opp.skillsRequired.map(skill => {
                        const hasSkill = matchInfo.matched.includes(skill);
                        return (
                          <span
                            key={skill}
                            className={`px-2.5 py-1 rounded-lg font-mono text-xs border ${
                              hasSkill
                                ? 'bg-acid/15 text-acid border-acid/30 font-semibold'
                                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                            }`}
                          >
                            {hasSkill ? '✓ ' : ''}
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-900 mt-6 flex items-center justify-between gap-4">
                  <button
                    onClick={() => handleSaveToTracker(opp.id)}
                    className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Save to Kanban Tracker"
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <PillButton
                    variant="signal"
                    onClick={() => {
                      toast.success(`Redirecting to ${opp.organization} portal...`);
                      window.open(opp.applyUrl || '#', '_blank');
                    }}
                    className="flex-1 text-sm py-3"
                  >
                    <span>Apply Now</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </PillButton>
                </div>
              </BracketCard>
            );
          })}
        </div>

        {/* Why this matches you modal */}
        {activeMatchModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="w-full max-w-lg rounded-3xl bg-zinc-950 border border-zinc-800 p-8 space-y-6 font-mono text-xs sm:text-sm shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="font-bold text-white uppercase text-base">WHY THIS MATCHES YOU</span>
                <button onClick={() => setActiveMatchModal(null)} className="text-zinc-500 hover:text-white text-base">✕</button>
              </div>

              {(() => {
                const match = calculateMatch(activeMatchModal.skillsRequired);
                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
                      <div>
                        <div className="text-white font-bold text-base">{activeMatchModal.title}</div>
                        <div className="text-xs text-zinc-400">{activeMatchModal.organization}</div>
                      </div>
                      <ProgressRing progress={match.percentage} size={56} color="auto" />
                    </div>

                    <div>
                      <span className="text-acid font-bold block mb-2 text-xs">Matched Skills:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {match.matched.length > 0 ? (
                          match.matched.map(s => (
                            <span key={s} className="px-2.5 py-1 rounded-lg bg-acid/15 text-acid border border-acid/25">
                              ✓ {s}
                            </span>
                          ))
                        ) : (
                          <span className="text-zinc-500">None yet</span>
                        )}
                      </div>
                    </div>

                    {match.missing.length > 0 && (
                      <div>
                        <span className="text-signal font-bold block mb-2 text-xs">Missing Skills to Learn:</span>
                        <div className="flex flex-wrap gap-2">
                          {match.missing.map(s => (
                            <Link
                              key={s}
                              href="/materials"
                              className="px-3 py-1 rounded-lg bg-signal/15 text-signal border border-signal/25 hover:underline"
                            >
                              + Study {s} Notes &rarr;
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
