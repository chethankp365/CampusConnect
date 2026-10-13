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
      <div className="space-y-8 font-body">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HudLabel label="PIPELINE // CAREERS &amp; RESEARCH" color="signal" />
              <span className="text-zinc-500 font-mono text-xs">• Skill Match Assisted</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-white tracking-tight">
              Internships, Hackathons &amp; Fellowships
            </h1>
            <p className="text-zinc-400 font-mono text-xs mt-0.5">
              Verified corporate internships and university research labs across Bengaluru tech corridors.
            </p>
          </div>

          <PillButton variant="outline" href="/opportunities/tracker">
            <Kanban className="w-3.5 h-3.5 mr-1.5" /> Kanban Application Tracker
          </PillButton>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {['all', 'internship', 'research', 'hackathon'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`font-mono text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                filterType === t
                  ? 'bg-signal text-white border-signal'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Opportunities List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(opp => {
            const matchInfo = calculateMatch(opp.skillsRequired);

            return (
              <BracketCard
                key={opp.id}
                headerTag={`${opp.type.toUpperCase()} // ${opp.mode.toUpperCase()}`}
                glowColor={matchInfo.percentage >= 75 ? 'acid' : 'signal'}
                className="flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-mono text-acid font-semibold block">
                        {opp.organization}
                      </span>
                      <h3 className="text-base font-semibold text-white mt-0.5">{opp.title}</h3>
                    </div>
                    {/* Match percentage ring */}
                    <div
                      onClick={() => setActiveMatchModal(opp)}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      title="Click to view match explanation"
                    >
                      <ProgressRing progress={matchInfo.percentage} size={44} color="auto" />
                    </div>
                  </div>

                  <p className="text-xs font-mono text-zinc-400 line-clamp-3 leading-relaxed">
                    {opp.description}
                  </p>

                  <div className="space-y-1.5 font-mono text-xs text-zinc-400 pt-1">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="truncate">{opp.location || 'Bengaluru / Hybrid'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="text-acid font-bold">{opp.stipend || 'Competitive'}</span>
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-zinc-500 uppercase block mb-1.5">
                      Required Skills:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {opp.skillsRequired.map(skill => {
                        const hasSkill = matchInfo.matched.includes(skill);
                        return (
                          <span
                            key={skill}
                            className={`px-2 py-0.5 rounded font-mono text-[10px] border ${
                              hasSkill
                                ? 'bg-acid/10 text-acid border-acid/30 font-semibold'
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

                <div className="pt-4 border-t border-zinc-900 mt-4 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleSaveToTracker(opp.id)}
                    className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    title="Save to Kanban Tracker"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <PillButton
                    variant="signal"
                    onClick={() => {
                      toast.success(`Redirecting to ${opp.organization} portal...`);
                      window.open(opp.applyUrl || '#', '_blank');
                    }}
                    className="flex-1"
                  >
                    <span>Apply Now</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </PillButton>
                </div>
              </BracketCard>
            );
          })}
        </div>

        {/* Why this matches you modal */}
        {activeMatchModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="font-bold text-white uppercase">WHY THIS MATCHES YOU</span>
                <button onClick={() => setActiveMatchModal(null)} className="text-zinc-500 hover:text-white">✕</button>
              </div>

              {(() => {
                const match = calculateMatch(activeMatchModal.skillsRequired);
                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                      <div>
                        <div className="text-white font-bold">{activeMatchModal.title}</div>
                        <div className="text-[10px] text-zinc-400">{activeMatchModal.organization}</div>
                      </div>
                      <ProgressRing progress={match.percentage} size={48} color="auto" />
                    </div>

                    <div>
                      <span className="text-acid font-bold block mb-1">Matched Skills:</span>
                      <div className="flex flex-wrap gap-1">
                        {match.matched.length > 0 ? (
                          match.matched.map(s => (
                            <span key={s} className="px-2 py-0.5 rounded bg-acid/10 text-acid border border-acid/20">
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
                        <span className="text-signal font-bold block mb-1">Missing Skills to Learn:</span>
                        <div className="flex flex-wrap gap-1">
                          {match.missing.map(s => (
                            <Link
                              key={s}
                              href="/materials"
                              className="px-2 py-0.5 rounded bg-signal/10 text-signal border border-signal/20 hover:underline"
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
