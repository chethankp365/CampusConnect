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
}

const INITIAL_COLLABS: CollabPost[] = [
  {
    id: 'col_1',
    creator: 'Ananya Deshmukh',
    college: 'BMSCE',
    title: 'HackGrid 2026: AI Healthcare Triage System',
    description: 'Building an automated vernacular voice assistant for rural PHCs in Karnataka. We need a Next.js frontend lead and a Python fastAPI backend developer.',
    skillsNeeded: ['Next.js', 'Python', 'Tailwind CSS', 'FastAPI'],
    teamSize: 4,
    currentSize: 2,
    matchScore: 92,
  },
  {
    id: 'col_2',
    creator: 'Karthik Raman',
    college: 'PES University',
    title: 'Autonomous Drone Swarm for Campus Delivery',
    description: 'Hardware + computer vision project for autonomous parcel navigation across college tech quadrangles. Seeking embedded C++ or ROS engineers.',
    skillsNeeded: ['C++', 'Embedded Systems', 'Computer Vision', 'ROS'],
    teamSize: 3,
    currentSize: 2,
    matchScore: 68,
  },
];

export default function CollabBoardPage() {
  const [collabs, setCollabs] = useState<CollabPost[]>(INITIAL_COLLABS);
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [skills, setSkills] = useState('React.js, Python, Figma');
  const [teamSize, setTeamSize] = useState(4);

  const handleJoin = (id: string) => {
    toast.success('Join request sent to project leader with your skill portfolio! (+10 XP on join)');
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
    };

    setCollabs([newPost, ...collabs]);
    setCreateModal(false);
    setTitle('');
    setDesc('');
    toast.success('Collab post published across all 15 connected campuses!');
  };

  return (
    <AppShell>
      <div className="space-y-8 font-body max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
          <div>
            <Link
              href="/network"
              className="inline-flex items-center text-xs font-mono text-zinc-400 hover:text-signal mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> RETURN TO DIRECTORY
            </Link>
            <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-white tracking-tight">
              Teammate Match &amp; Collab Board
            </h1>
            <p className="text-zinc-400 font-mono text-xs mt-0.5">
              Form cross-campus squads for national hackathons, capstone projects, and startup MVPs.
            </p>
          </div>

          <PillButton variant="signal" onClick={() => setCreateModal(true)}>
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Create Collab Post
          </PillButton>
        </div>

        {/* Collab Posts Feed */}
        <div className="space-y-6">
          {collabs.map(col => (
            <BracketCard
              key={col.id}
              headerTag={`TEAM ROSTER // ${col.currentSize} OF ${col.teamSize} SPOTS`}
              glowColor="acid"
            >
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-xs text-acid">
                      Initiated by {col.creator} [{col.college}]
                    </span>
                    <h3 className="text-lg font-heading font-bold text-white mt-1">
                      {col.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-zinc-400">Match Affinity:</span>
                    <ProgressRing progress={col.matchScore} size={42} color="acid" />
                  </div>
                </div>

                <p className="text-zinc-300 font-mono text-xs leading-relaxed">
                  {col.description}
                </p>

                <div>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase block mb-1.5">
                    Skills Required for Team:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {col.skillsNeeded.map(s => (
                      <span
                        key={s}
                        className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                  <div className="font-mono text-xs text-zinc-500">
                    STATUS: {col.teamSize - col.currentSize} SEATS REMAINING
                  </div>
                  <PillButton variant="signal" onClick={() => handleJoin(col.id)}>
                    Request to Join Team &rarr;
                  </PillButton>
                </div>
              </div>
            </BracketCard>
          ))}
        </div>

        {/* Create Collab Modal */}
        {createModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="font-bold text-white uppercase text-sm">CREATE COLLABORATION POST</span>
                <button onClick={() => setCreateModal(false)} className="text-zinc-500 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px]">Project or Hackathon Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nexus 2026: Autonomous Rover Project"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px]">Project Mission &amp; Goals</label>
                  <textarea
                    rows={3}
                    placeholder="Explain what you are building and which roles are missing..."
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase text-[10px]">Skills Needed (Comma Separated)</label>
                  <input
                    type="text"
                    value={skills}
                    onChange={e => setSkills(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setCreateModal(false)}
                    className="px-4 py-2 rounded-full border border-zinc-800 text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <PillButton variant="signal" type="submit">
                    Publish Collab Post
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
