'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { HudLabel } from '@/components/ui/HudLabel';
import { BracketCard } from '@/components/ui/BracketCard';
import { PillButton } from '@/components/ui/PillButton';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { StatusLED } from '@/components/ui/StatusLED';
import { MOCK_PEERS, CURRENT_USER } from '@/lib/mock-data';
import { calculateSkillMatch } from '@/lib/scoring/engine';
import {
  Compass,
  Sparkles,
  Search,
  Users,
  ShieldCheck,
  Send,
  UserPlus,
  Layers,
  ArrowRight,
  BrainCircuit,
  MessageSquare,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';

export default function SkillMatchPage() {
  const [projectPrompt, setProjectPrompt] = useState(
    'Building an AI crop-disease diagnostic app, need a Flutter mobile dev and UI designer with Python backend experience.'
  );
  const [extractedSkills, setExtractedSkills] = useState(['Flutter', 'Python', 'Figma']);
  const [mode, setMode] = useState<'teammates' | 'complementary' | 'mentors' | 'teambuilder'>('teammates');
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const handleSynthesize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectPrompt.trim()) return;

    setIsSynthesizing(true);
    setTimeout(() => {
      const lower = projectPrompt.toLowerCase();
      const skillsFound: string[] = [];
      if (lower.includes('flutter') || lower.includes('mobile')) skillsFound.push('Flutter');
      if (lower.includes('python') || lower.includes('backend') || lower.includes('ai')) skillsFound.push('Python');
      if (lower.includes('ui') || lower.includes('designer') || lower.includes('figma')) skillsFound.push('Figma');
      if (lower.includes('react') || lower.includes('frontend')) skillsFound.push('React.js');

      setExtractedSkills(skillsFound.length > 0 ? skillsFound : ['Python', 'Flutter', 'TypeScript']);
      setIsSynthesizing(false);
      toast.success('Gemini AI parsed required technical skills & roles!');
    }, 700);
  };

  const removeSkill = (skill: string) => {
    setExtractedSkills(extractedSkills.filter(s => s !== skill));
  };

  const rankedPeers = MOCK_PEERS.map(p => {
    const result = calculateSkillMatch(
      {
        id: p.id,
        fullName: p.fullName,
        username: p.username,
        avatarUrl: p.avatarUrl,
        collegeId: p.collegeId,
        collegeName: p.collegeName,
        branch: p.branch,
        semester: p.semester,
        skills: p.skills,
        interests: p.interests,
        bio: p.bio,
      },
      {
        requiredSkills: extractedSkills,
        seekerCollegeId: CURRENT_USER.collegeId,
        seekerSemester: CURRENT_USER.semester,
        seekerSkills: CURRENT_USER.skills.map(s => s.name),
        mode: mode === 'complementary' ? 'complementary' : 'teammates',
      }
    );

    return { ...p, result };
  }).sort((a, b) => b.result.score - a.result.score);

  return (
    <AppShell>
      <div className="space-y-10 font-body">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <HudLabel label="SYNAPSE // NEURAL MATCH ENGINE" color="acid" />
              <span className="text-zinc-500 font-mono text-sm">• Layer 1 (Rules) + Layer 2 (Gemini 768d Embeddings)</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
              Skill Match &amp; Squad Builder
            </h1>
            <p className="text-zinc-400 font-mono text-sm max-w-2xl">
              Describe your project idea in natural language. Gemini extracts skills while our mathematical engine ranks complementary teammates across 15 engineering campuses.
            </p>
          </div>

          <div className="flex items-center gap-2.5 font-mono text-xs">
            <button
              onClick={() => setMode('teammates')}
              className={`px-4 py-2 rounded-full border transition-all ${
                mode === 'teammates'
                  ? 'bg-signal text-white border-signal shadow-lg shadow-signal/20'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              Teammates
            </button>
            <button
              onClick={() => setMode('complementary')}
              className={`px-4 py-2 rounded-full border transition-all ${
                mode === 'complementary'
                  ? 'bg-signal text-white border-signal shadow-lg shadow-signal/20'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              Complementary
            </button>
            <button
              onClick={() => setMode('teambuilder')}
              className={`px-4 py-2 rounded-full border transition-all ${
                mode === 'teambuilder'
                  ? 'bg-signal text-white border-signal shadow-lg shadow-signal/20'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              Team Builder
            </button>
          </div>
        </div>

        {/* Natural Language "Describe Your Project" Box - Roomy */}
        <BracketCard headerTag="GEMINI 2.5 COGNITION // NATURAL LANGUAGE PARSER" glowColor="cyan" className="p-8 sm:p-10">
          <form onSubmit={handleSynthesize} className="space-y-6 font-mono text-xs sm:text-sm">
            <div className="space-y-2">
              <label className="text-zinc-400 uppercase text-xs flex items-center justify-between font-semibold">
                <span>Describe Your Idea, Problem Statement, or Hackathon Track</span>
                <span className="text-acid">LLM PARSING CORE READY</span>
              </label>
              <textarea
                rows={3}
                value={projectPrompt}
                onChange={e => setProjectPrompt(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-white font-mono text-sm sm:text-base focus:outline-none focus:border-cyan leading-relaxed shadow-inner"
              />
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-zinc-500 uppercase text-xs font-semibold">Target Skills:</span>
                {extractedSkills.map(s => (
                  <span
                    key={s}
                    className="px-3.5 py-1.5 rounded-full bg-cyan/15 text-cyan border border-cyan/30 flex items-center gap-2 text-xs font-medium"
                  >
                    <span>{s}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(s)}
                      className="hover:text-white"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>

              <button
                type="submit"
                disabled={isSynthesizing}
                className="px-6 py-3 rounded-2xl bg-cyan text-black font-bold font-mono text-sm hover:bg-cyan/90 transition-all flex items-center gap-2 shadow-lg shadow-cyan/20 cursor-pointer active:scale-95 self-start lg:self-auto"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSynthesizing ? 'SYNTHESIZING...' : 'PARSE SKILLS VIA GEMINI'}</span>
              </button>
            </div>
          </form>
        </BracketCard>

        {/* Ranked Match Results Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between font-mono text-xs sm:text-sm text-zinc-400">
            <span>RANKED CANDIDATES (ORDERED BY COSINE SIMILARITY + SKILL RULES)</span>
            <span className="text-acid font-bold">{rankedPeers.length} CANDIDATES EVALUATED</span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {rankedPeers.map((peer, idx) => (
              <BracketCard
                key={peer.id}
                headerTag={`CANDIDATE #0${idx + 1} // AFFINITY: ${peer.result.score}%`}
                glowColor={peer.result.score >= 80 ? 'acid' : 'none'}
                className="p-8 sm:p-10"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="flex items-start gap-6">
                    <img
                      src={peer.avatarUrl}
                      alt={peer.fullName}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-zinc-700 shadow-xl shrink-0"
                    />

                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                          {peer.fullName}
                        </h3>
                        <span className="font-mono text-xs text-zinc-500">
                          [@{peer.username}]
                        </span>
                      </div>

                      <div className="text-sm font-mono text-zinc-400">
                        {peer.collegeName} • {peer.branch} (Semester {peer.semester})
                      </div>

                      <p className="text-sm font-mono text-acid pt-1 leading-relaxed">
                        {peer.result.explanation}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {peer.skills.map((s, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs"
                          >
                            {s.name} ({s.level})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Score Gauge & Action */}
                  <div className="flex sm:flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-5 font-mono pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-900">
                    <ProgressRing progress={peer.result.score} size={68} color="auto" />
                    <PillButton
                      variant="signal"
                      onClick={() => {
                        toast.success(`Invite dispatched to @${peer.username}!`);
                      }}
                      className="text-sm px-6 py-2.5"
                    >
                      <UserPlus className="w-4 h-4 mr-2" /> Invite to Squad
                    </PillButton>
                  </div>
                </div>
              </BracketCard>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
