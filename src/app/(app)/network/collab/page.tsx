'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { HudLabel } from '@/components/ui/HudLabel';
import { BracketCard } from '@/components/ui/BracketCard';
import { PillButton } from '@/components/ui/PillButton';
import { ProgressRing } from '@/components/ui/ProgressRing';
import {
  Layers,
  Users,
  Plus,
  ArrowLeft,
  CheckCircle,
  MessageSquare,
  Sparkles,
  Zap,
  Target,
  Send,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';

interface CollabPost {
  id: string;
  creator: string;
  college: string;
  title: string;
  description: string;
  skillsNeeded: string[];
  teamSize: number;
  currentSize: number;
  matchScore: number;
  targetHackathon: string;
}

const INITIAL_COLLABS: CollabPost[] = [
  {
    id: 'col_1',
    creator: 'Ananya Deshmukh',
    college: 'BMSCE',
    title: 'HackGrid 2026: AI Healthcare Triage System',
    description: 'Building an automated vernacular voice assistant for rural PHCs in Karnataka. We have biomedical dataset pipelines ready. Seeking a Next.js frontend lead and a Python fastAPI backend developer with pgvector experience.',
    skillsNeeded: ['Next.js', 'Python', 'Tailwind CSS', 'FastAPI'],
    teamSize: 4,
    currentSize: 2,
    matchScore: 92,
    targetHackathon: 'HackGrid 2026 (PES University)',
  },
  {
    id: 'col_2',
    creator: 'Karthik Raman',
    college: 'PES University',
    title: 'Autonomous Drone Swarm for Campus Parcel Delivery',
    description: 'Hardware + computer vision project for autonomous delivery navigation across college tech quadrangles. Seeking embedded C++ or ROS engineers with experience in edge tensor processing.',
    skillsNeeded: ['C++', 'Embedded Systems', 'Computer Vision', 'ROS'],
    teamSize: 3,
    currentSize: 2,
    matchScore: 68,
    targetHackathon: 'Bangalore Robotics Olympiad',
  },
  {
    id: 'col_3',
    creator: 'Sahana Kulkarni',
    college: 'RVCE',
    title: 'Zero-Knowledge Credential Vault for University Degrees',
    description: 'Building a privacy-first verifiable credential issuer using Circom and Ethereum zk-SNARKs. Seeking cryptographic protocol research enthusiasts and Solidity developers.',
    skillsNeeded: ['Rust', 'Solidity', 'Zero Knowledge Proofs', 'TypeScript'],
    teamSize: 4,
    currentSize: 3,
    matchScore: 84,
    targetHackathon: 'ETHDenver India Edition',
  },
];

export default function CollabBoardPage() {
  const [collabs, setCollabs] = useState<CollabPost[]>(INITIAL_COLLABS);
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [skills, setSkills] = useState('React.js, Python, Figma');
  const [hackathon, setHackathon] = useState('Smart India Hackathon');
  const [teamSize, setTeamSize] = useState(4);

  const handleJoin = (title: string) => {
    toast.success(`Join request dispatched to team leader for "${title}"! (+10 XP on approval)`);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newPost: CollabPost = {
      id: `col_${Date.now()}`,
      creator: 'Arjun Venkatesh (You)',
      college: 'RVCE',
      title,
      description: desc || 'Looking for passionate student developers.',
      skillsNeeded: skills.split(',').map(s => s.trim()),
      teamSize,
      currentSize: 1,
      matchScore: 100,
      targetHackathon: hackathon || 'National Hackathon',
    };

    setCollabs([newPost, ...collabs]);
    setCreateModal(false);
    setTitle('');
    setDesc('');
    toast.success('Collab post published across all 15 connected campuses!');
  };

  return (
    <AppShell>
      <div className="space-y-8 font-body w-full">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-900">
          <div>
            <Link
              href="/network"
              className="inline-flex items-center text-xs font-mono text-zinc-400 hover:text-signal mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" /> RETURN TO DIRECTORY
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
                Hackathon Squads &amp; Collab Board
              </h1>
              <HudLabel label="CROSS-CAMPUS SQUADS" color="acid" />
            </div>
            <p className="text-zinc-400 font-mono text-sm mt-1 max-w-3xl">
              Form cross-campus squads for national hackathons, capstone projects, and deep-tech startup MVPs across college boundaries.
            </p>
          </div>

          <PillButton variant="signal" onClick={() => setCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" /> Create Collab Post
          </PillButton>
        </div>

        {/* Collab Posts Feed - Expansive Cards */}
        <div className="space-y-6">
          {collabs.map(col => (
            <BracketCard
              key={col.id}
              headerTag={`TEAM ROSTER // ${col.currentSize} OF ${col.teamSize} FILLED`}
              glowColor="acid"
              className="p-6"
            >
              <div className="space-y-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-zinc-900">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-acid font-bold">
                        INITIATED BY {col.creator.toUpperCase()} [{col.college}]
                      </span>
                      <span className="text-zinc-600 font-mono text-xs">•</span>
                      <span className="text-zinc-400 font-mono text-xs flex items-center gap-1">
                        <Target className="w-3.5 h-3.5 text-signal" /> {col.targetHackathon}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                      {col.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 bg-zinc-900/60 px-4 py-2 rounded-2xl border border-zinc-800">
                    <div>
                      <span className="font-mono text-[10px] text-zinc-500 uppercase block">Skill Synergy</span>
                      <span className="font-mono text-sm font-bold text-white">{col.matchScore}% Match</span>
                    </div>
                    <ProgressRing progress={col.matchScore} size={46} color="acid" />
                  </div>
                </div>

                <p className="text-zinc-300 font-mono text-sm leading-relaxed max-w-4xl">
                  {col.description}
                </p>

                {/* Team Roster Slot Visualizer */}
                <div className="space-y-2">
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider block">
                    Squad Formation ({col.currentSize} / {col.teamSize} Nodes Assembled):
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {Array.from({ length: col.teamSize }).map((_, idx) => {
                      const isOccupied = idx < col.currentSize;
                      return (
                        <div
                          key={idx}
                          className={`px-4 py-2 rounded-xl font-mono text-xs flex items-center gap-2 transition-all ${
                            isOccupied
                              ? 'bg-zinc-900 border border-zinc-700 text-white'
                              : 'bg-zinc-950 border border-dashed border-zinc-800 text-zinc-500'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full ${isOccupied ? 'bg-acid' : 'bg-zinc-700'}`} />
                          <span>{isOccupied ? `Node #${idx + 1} Locked` : `Open Role #${idx + 1}`}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Skills tags and Apply Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-zinc-900">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-zinc-500 mr-1">LOOKING FOR:</span>
                    {col.skillsNeeded.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs hover:border-acid transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <PillButton variant="signal" onClick={() => handleJoin(col.title)}>
                      <Send className="w-3.5 h-3.5 mr-1.5" /> Request to Join Squad
                    </PillButton>
                  </div>
                </div>
              </div>
            </BracketCard>
          ))}
        </div>

        {/* Modal for creating collab post */}
        {createModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-xl w-full bg-zinc-950 border border-zinc-800 p-6 rounded-3xl space-y-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <h3 className="text-xl font-heading font-bold text-white">Create Cross-Campus Collab</h3>
                <button
                  onClick={() => setCreateModal(false)}
                  className="text-zinc-500 hover:text-white font-mono text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1">PROJECT OR HACKATHON TITLE</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Smart India Hackathon: AgriTech AI Drone"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">TARGET EVENT / HACKATHON</label>
                  <input
                    type="text"
                    placeholder="e.g. HackGrid 2026, PES TechFest, Inter-College Capstone"
                    value={hackathon}
                    onChange={e => setHackathon(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">REQUIRED TECH STACK (COMMA-SEPARATED)</label>
                  <input
                    type="text"
                    placeholder="e.g. React.js, FastAPI, PyTorch, Figma"
                    value={skills}
                    onChange={e => setSkills(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">PROJECT MISSION &amp; SPECIFICATIONS</label>
                  <textarea
                    rows={4}
                    placeholder="Describe problem statement, what roles you need, expected workload..."
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan leading-relaxed"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-zinc-900">
                  <PillButton variant="outline" onClick={() => setCreateModal(false)}>
                    Cancel
                  </PillButton>
                  <PillButton variant="signal" type="submit">
                    Publish Across Campuses
                  </PillButton>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
