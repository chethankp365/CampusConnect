'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { HudLabel } from '@/components/ui/HudLabel';
import { BracketCard } from '@/components/ui/BracketCard';
import { PillButton } from '@/components/ui/PillButton';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { CURRENT_USER } from '@/lib/mock-data';
import {
  Settings,
  Bell,
  Lock,
  Eye,
  Sliders,
  Trash2,
  CheckCircle,
  Shield,
  Monitor,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [fullName, setFullName] = useState(CURRENT_USER.fullName);
  const [bio, setBio] = useState(CURRENT_USER.bio);
  const [scanlines, setScanlines] = useState(true);
  const [notifEvents, setNotifEvents] = useState(true);
  const [notifCollabs, setNotifCollabs] = useState(true);
  const [notifAttendanceAlerts, setNotifAttendanceAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('System preferences and cryptographic profile configuration saved.');
  };

  return (
    <AppShell>
      <div className="space-y-8 font-body w-full">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <HudLabel label="CONFIG // NODE PREFERENCES" color="cyan" />
              <span className="text-zinc-500 font-mono text-xs">• Synchronized with Local Storage &amp; Cloud Database</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Settings &amp; Preferences
            </h1>
            <p className="text-zinc-400 font-mono text-sm mt-1 max-w-3xl">
              Configure CRT scanlines, attendance risk thresholds, hackathon notification dispatch, and public telemetry.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-zinc-400">INTERFACE THEME:</span>
            <ThemeToggle />
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 01: Profile Details */}
            <BracketCard headerTag="01 // IDENTITY TELEMETRY" glowColor="cyan" className="p-6">
              <div className="space-y-5 font-mono text-xs">
                <div className="space-y-2">
                  <label className="text-zinc-400 uppercase text-xs font-semibold block">Full Display Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-zinc-400 uppercase text-xs font-semibold block">Academic Bio Statement</label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan text-xs leading-relaxed"
                  />
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                  <span className="text-zinc-500 text-[11px] uppercase block">Institutional Domain Bind</span>
                  <span className="text-white text-xs font-medium">Verified under @rvce.edu.in</span>
                </div>
              </div>
            </BracketCard>

            {/* 02: Retro Graphics Pipeline */}
            <BracketCard headerTag="02 // RETRO-FUTURIST RENDER PIPELINE" glowColor="acid" className="p-6">
              <div className="space-y-5 font-mono text-xs">
                <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="space-y-1 pr-4">
                    <span className="text-white font-semibold text-sm block">CRT Scanline &amp; Grain Overlay</span>
                    <span className="text-zinc-400 text-xs block leading-relaxed">
                      Renders authentic 1980s phosphorus mainframe aesthetic with subtle CRT curvature and scanlines.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={scanlines}
                    onChange={e => setScanlines(e.target.checked)}
                    className="w-6 h-6 accent-signal cursor-pointer shrink-0"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="space-y-1 pr-4">
                    <span className="text-white font-semibold text-sm block">Three.js Chrome Globe Hardware Acceleration</span>
                    <span className="text-zinc-400 text-xs block leading-relaxed">
                      Uses WebGL 2.0 with wireframe vertex shader and dynamic orbital satellites.
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-acid/15 text-acid font-bold text-xs">
                    ACTIVE
                  </span>
                </div>
              </div>
            </BracketCard>
          </div>

          {/* 03: Notifications */}
          <BracketCard headerTag="03 // NOTIFICATION DISPATCH ENGINE" glowColor="signal" className="p-6">
            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="space-y-1 pr-4">
                  <span className="text-white font-semibold text-sm block">Hackathon &amp; Workshop Reminders</span>
                  <span className="text-zinc-400 text-xs block">
                    Receive alerts 24 hours and 1 hour before registered campus events start.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={notifEvents}
                  onChange={e => setNotifEvents(e.target.checked)}
                  className="w-6 h-6 accent-signal cursor-pointer shrink-0"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="space-y-1 pr-4">
                  <span className="text-white font-semibold text-sm block">Attendance 75% Risk Early-Warning</span>
                  <span className="text-zinc-400 text-xs block">
                    Immediately alert via banner if safe bunc count falls to 1 class or lower.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={notifAttendanceAlerts}
                  onChange={e => setNotifAttendanceAlerts(e.target.checked)}
                  className="w-6 h-6 accent-signal cursor-pointer shrink-0"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="space-y-1 pr-4">
                  <span className="text-white font-semibold text-sm block">Cross-Campus Collab Team Invites</span>
                  <span className="text-zinc-400 text-xs block">
                    Alert when student leaders across BMSCE, PES, or MSRIT invite your node to a squad.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={notifCollabs}
                  onChange={e => setNotifCollabs(e.target.checked)}
                  className="w-6 h-6 accent-signal cursor-pointer shrink-0"
                />
              </div>
            </div>
          </BracketCard>

          <div className="flex justify-end pt-4">
            <PillButton variant="signal" type="submit">
              Save Configuration Settings
            </PillButton>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
