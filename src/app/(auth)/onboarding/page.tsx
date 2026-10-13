'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { HudLabel } from '@/components/ui/HudLabel';
import { PillButton } from '@/components/ui/PillButton';
import { BracketCard } from '@/components/ui/BracketCard';
import { fireMilestoneConfetti } from '@/components/motion/ConfettiBurst';
import { MOCK_COLLEGES } from '@/lib/mock-data';
import { Check, ArrowRight, ArrowLeft, Upload, Sparkles, Shield, User } from 'lucide-react';
import { toast } from 'sonner';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1: Identity & Avatar
  const [username, setUsername] = useState('arjun_v');
  const [fullName, setFullName] = useState('Arjun Venkatesh');

  // Step 2: Academic Anchor
  const [college, setCollege] = useState('clg_rvce');
  const [course, setCourse] = useState('B.E.');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [semester, setSemester] = useState(5);

  // Step 3: Skills with levels
  const [selectedSkills, setSelectedSkills] = useState([
    { name: 'React.js', level: 'advanced' },
    { name: 'TypeScript', level: 'advanced' },
    { name: 'Python', level: 'intermediate' },
  ]);

  // Step 4: Interests & Collaboration
  const [interests, setInterests] = useState(['Distributed Systems', 'WebGL', 'AI Agents']);
  const [lookingFor, setLookingFor] = useState('Hackathon Teammates & Open Source Collaborators');
  const [isMentor, setIsMentor] = useState(true);

  // Step 5: Privacy
  const [isPublic, setIsPublic] = useState(true);
  const [showAttendanceToAI, setShowAttendanceToAI] = useState(true);

  const handleFinish = () => {
    fireMilestoneConfetti();
    toast.success('Pioneer Badge Unlocked! +25 Starter XP Awarded.');
    setTimeout(() => {
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-12 flex flex-col justify-between max-w-4xl mx-auto font-body">
      {/* Top Telemetry Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-zinc-900">
        <Logo />
        <div className="flex items-center gap-3">
          <HudLabel label={`STEP 0${step} OF 05`} color="acid" />
          <div className="hidden sm:flex gap-1.5">
            {[1, 2, 3, 4, 5].map(s => (
              <div
                key={s}
                className={`w-6 h-1 rounded-full transition-colors ${
                  s <= step ? 'bg-signal' : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Wizard Step Box */}
      <div className="py-8">
        <BracketCard headerTag={`ONBOARDING // SEQUENCE_0${step}`} glowColor="signal">
          {/* STEP 1: Identity & Avatar */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-heading font-semibold text-white">
                  Craft Your Handle &amp; Avatar
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  Your handle is your unique student node ID across all connected campuses.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
                <div className="w-24 h-24 rounded-2xl bg-zinc-800 border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center cursor-pointer hover:border-signal transition-colors group">
                  <Upload className="w-6 h-6 text-zinc-500 group-hover:text-signal transition-colors" />
                  <span className="text-[10px] font-mono text-zinc-500 mt-1">UPLOAD</span>
                </div>
                <div className="flex-1 w-full space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-400 uppercase">Node Username</label>
                    <div className="flex items-center rounded-xl bg-zinc-900 border border-zinc-800 px-3">
                      <span className="text-zinc-500 font-mono text-sm">@</span>
                      <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="w-full bg-transparent p-2.5 text-white font-mono text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-400 uppercase">Display Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-sm focus:outline-none focus:border-signal"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Academic Anchor */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-heading font-semibold text-white">
                  Academic Anchor
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  Connect to your institution for course syllabus, study materials, and branch-specific notices.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-mono text-zinc-400 uppercase">College</label>
                  <select
                    value={college}
                    onChange={e => setCollege(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-sm focus:outline-none focus:border-signal"
                  >
                    {MOCK_COLLEGES.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.city})
                      </option>
                    ))}
                    <option value="other">[ Other / My College Is Not Listed ]</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase">Degree Program</label>
                  <input
                    type="text"
                    value={course}
                    onChange={e => setCourse(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-sm focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase">Branch / Major</label>
                  <input
                    type="text"
                    value={branch}
                    onChange={e => setBranch(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-sm focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase">Current Semester (1-8)</label>
                  <input
                    type="number"
                    min={1}
                    max={8}
                    value={semester}
                    onChange={e => setSemester(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Skills & Competencies */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-heading font-semibold text-white">
                  Skills &amp; Competencies
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  Power the Skill Match algorithm and stand out to hackathon recruiters.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 font-mono text-xs text-white flex items-center gap-2"
                    >
                      <span>{s.name}</span>
                      <span className="text-[10px] text-acid uppercase">({s.level})</span>
                    </span>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                  <span className="font-mono text-xs text-zinc-400 block">QUICK-ADD POPULAR SKILLS:</span>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'Go (Golang)', 'Docker', 'Figma', 'PyTorch', 'Flutter'].map(name => (
                      <button
                        key={name}
                        onClick={() => setSelectedSkills([...selectedSkills, { name, level: 'intermediate' }])}
                        className="font-mono text-xs px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-signal"
                      >
                        + {name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Collaboration & Mentorship */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-heading font-semibold text-white">
                  Collaboration Profile
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  Help peers discover you for cross-campus initiatives.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase">Looking For</label>
                  <input
                    type="text"
                    value={lookingFor}
                    onChange={e => setLookingFor(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-sm focus:outline-none"
                  />
                </div>

                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Enable Mentorship Mode</h4>
                    <p className="text-xs font-mono text-zinc-400 mt-0.5">
                      Allow junior students to request guidance in your verified tech skills.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isMentor}
                    onChange={e => setIsMentor(e.target.checked)}
                    className="w-5 h-5 accent-signal cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Privacy & Confirmation */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-heading font-semibold text-white">
                  Privacy Choices &amp; Node Activation
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  You hold full sovereign control over your data.
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-white block font-medium">Public Node Discovery</span>
                    <span className="text-zinc-500 text-[10px]">Visible to students across other colleges</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={e => setIsPublic(e.target.checked)}
                    className="w-5 h-5 accent-signal"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-white block font-medium">Attendance Private Defense</span>
                    <span className="text-zinc-500 text-[10px]">Strictly owner-only RLS; never visible to anyone else</span>
                  </div>
                  <span className="text-acid font-bold">[ ENFORCED ]</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-signal/10 border border-signal/30 text-signal font-mono text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Ready to initialize node. +25 XP Pioneer Badge will be deposited immediately.</span>
              </div>
            </div>
          )}
        </BracketCard>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-6 border-t border-zinc-900">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> PREVIOUS STEP
          </button>
        ) : (
          <div />
        )}

        {step < 5 ? (
          <PillButton variant="signal" onClick={() => setStep(step + 1)}>
            NEXT SEQUENCE <ArrowRight className="w-4 h-4 ml-1.5" />
          </PillButton>
        ) : (
          <PillButton variant="signal" onClick={handleFinish}>
            COMPLETE ACTIVATION &rarr;
          </PillButton>
        )}
      </div>
    </div>
  );
}
