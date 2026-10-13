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
    toast.success('System preferences and cryptographic profile updated.');
  };

  return (
    <AppShell>
      <div className="space-y-8 font-body max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HudLabel label="CONFIG // NODE PREFERENCES" color="cyan" />
              <span className="text-zinc-500 font-mono text-xs">• Local &amp; Server Synchronization</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-white tracking-tight">
              Settings &amp; Preferences
            </h1>
            <p className="text-zinc-400 font-mono text-xs mt-0.5">
              Configure CRT graphics, notifications, bio telemetry, and account security.
            </p>
          </div>

          <ThemeToggle />
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Details */}
          <BracketCard headerTag="01 // IDENTITY TELEMETRY" glowColor="cyan">
            <div className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-zinc-400 uppercase text-[10px]">Display Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 uppercase text-[10px]">Bio Statement</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan leading-relaxed"
                />
              </div>
            </div>
          </BracketCard>

          {/* Retro Graphics & Scanlines */}
          <BracketCard headerTag="02 // RETRO-FUTURIST RENDER PIPELINE" glowColor="acid">
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <div>
                  <span className="text-white font-medium block">CRT Scanline &amp; Grain Overlay</span>
                  <span className="text-zinc-500 text-[10px]">Simulate 1980s mainframe phosphorus monitors</span>
                </div>
                <input
                  type="checkbox"
                  checked={scanlines}
                  onChange={e => setScanlines(e.target.checked)}
                  className="w-5 h-5 accent-signal cursor-pointer"
                />
              </div>
            </div>
          </BracketCard>

          {/* Notifications */}
          <BracketCard headerTag="03 // NOTIFICATION DISPATCH" glowColor="ultra">
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <div>
                  <span className="text-white font-medium block">Hackathon &amp; Event Reminders</span>
                  <span className="text-zinc-500 text-[10px]">24h and 1h alerts before registered events start</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifEvents}
                  onChange={e => setNotifEvents(e.target.checked)}
                  className="w-5 h-5 accent-signal cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <div>
                  <span className="text-white font-medium block">Attendance Threshold Warnings</span>
                  <span className="text-zinc-500 text-[10px]">Alert when attendance approaches within 5 points of 75%</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifAttendanceAlerts}
                  onChange={e => setNotifAttendanceAlerts(e.target.checked)}
                  className="w-5 h-5 accent-signal cursor-pointer"
                />
              </div>
            </div>
          </BracketCard>

          <div className="flex justify-end pt-2">
            <PillButton variant="signal" type="submit">
              Save Configuration
            </PillButton>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
