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
      // Simulate Gemini extracting structured skills from natural language
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

  const addSkill = (skill: string) => {
    if (!extractedSkills.includes(skill)) {
      setExtractedSkills([...extractedSkills, skill]);
    }
  };

  // Rank candidate peers using our scoring engine
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
      <div className="space-y-8 font-body max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HudLabel label="SYNAPSE // NEURAL MATCH ENGINE" color="acid" />
              <span className="text-zinc-500 font-mono text-xs">• Layer 1 (Rules) + Layer 2 (Gemini 768d)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-white tracking-tight">
              Skill Match &amp; Squad Builder
            </h1>
            <p className="text-zinc-400 font-mono text-xs mt-0.5">
              Describe your project in natural language. Gemini extracts skills while the mathematical engine ranks complementary teammates.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setMode('teammates')}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                mode === 'teammates'
                  ? 'bg-signal text-white border-signal'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              Teammates
            </button>
            <button
              onClick={() => setMode('complementary')}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                mode === 'complementary'
                  ? 'bg-signal text-white border-signal'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              Complementary
            </button>
            <button
              onClick={() => setMode('teambuilder')}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                mode === 'teambuilder'
                  ? 'bg-signal text-white border-signal'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              Team Builder
            </button>
          </div>
        </div>

        {/* Natural Language "Describe Your Project" Box */}
        <BracketCard headerTag="GEMINI COGNITION // NATURAL LANGUAGE PARSER" glowColor="cyan">
          <form onSubmit={handleSynthesize} className="space-y-4 font-mono text-xs">
            <div className="space-y-1">
              <label className="text-zinc-400 uppercase text-[10px] flex items-center justify-between">
                <span>Describe Your Idea, Problem Statement, or Hackathon Track</span>
                <span className="text-acid">GEMINI 2.5 FLASH ACTIVE</span>
              </label>
              <textarea
                rows={3}
                value={projectPrompt}
                onChange={e => setProjectPrompt(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-cyan leading-relaxed"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-zinc-500 text-[10px] uppercase">Active Target Skills:</span>
                {extractedSkills.map(s => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-full bg-cyan/15 text-cyan border border-cyan/30 flex items-center gap-1.5 text-xs"
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
                className="px-4 py-2 rounded-full bg-cyan text-black font-bold font-mono text-xs hover:bg-cyan/90 transition-colors flex items-center gap-1.5 shadow-md shadow-cyan/20 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isSynthesizing ? 'SYNTHESIZING...' : 'PARSE SKILLS'}</span>
              </button>
            </div>
          </form>
        </BracketCard>

        {/* Ranked Match Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
            <span>RANKED CANDIDATES (ORDERED BY COSINE SIMILARITY + SKILL RULES)</span>
            <span className="text-acid">{rankedPeers.length} PEERS EVALUATED</span>
          </div>

          <div className="space-y-4">
            {rankedPeers.map((peer, idx) => (
              <BracketCard
                key={peer.id}
                headerTag={`CANDIDATE #0${idx + 1} // AFFINITY: ${peer.result.score}%`}
                glowColor={peer.result.score >= 80 ? 'acid' : 'none'}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={peer.avatarUrl}
                      alt={peer.fullName}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-zinc-700 shadow-md"
                    />

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-heading font-semibold text-white">
                          {peer.fullName}
                        </h3>
                        <span className="font-mono text-xs text-zinc-500">
                          [@{peer.username}]
                        </span>
                      </div>

                      <div className="text-xs font-mono text-zinc-400">
                        {peer.collegeName} • {peer.branch} (Sem {peer.semester})
                      </div>

                      <p className="text-xs font-mono text-acid pt-1">
                        {peer.result.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Score Gauge & Action */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 font-mono">
                    <ProgressRing progress={peer.result.score} size={54} color="auto" />
                    <PillButton
                      variant="signal"
                      onClick={() => {
                        toast.success(`Invite dispatched to @${peer.username}!`);
                      }}
                    >
                      <UserPlus className="w-3.5 h-3.5 mr-1.5" /> Invite to Squad
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
