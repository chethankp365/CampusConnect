'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { HudLabel } from '@/components/ui/HudLabel';
import { BracketCard } from '@/components/ui/BracketCard';
import { PillButton } from '@/components/ui/PillButton';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { StatusLED } from '@/components/ui/StatusLED';
import { MOCK_ATTENDANCE } from '@/lib/mock-data';
import { calculateAttendance } from '@/lib/scoring/attendance';
import {
  Clock,
  ShieldCheck,
  Check,
  X,
  Minus,
  Sparkles,
  Download,
  AlertTriangle,
  Plus,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AttendancePage() {
  const [subjects, setSubjects] = useState(MOCK_ATTENDANCE);
  const [whatIfMiss, setWhatIfMiss] = useState<number>(0);
  const [whatIfAttend, setWhatIfAttend] = useState<number>(0);

  // Overall attendance calculation
  const totalAttended = subjects.reduce((acc, s) => acc + s.attended, 0);
  const totalClasses = subjects.reduce((acc, s) => acc + s.total, 0);
  const overallPct = totalClasses > 0 ? Math.round((totalAttended / totalClasses) * 1000) / 10 : 100;

  const handleMark = (id: string, action: 'present' | 'absent' | 'cancelled') => {
    setSubjects(prev =>
      prev.map(s => {
        if (s.id !== id) return s;
        if (action === 'present') {
          return { ...s, attended: s.attended + 1, total: s.total + 1 };
        } else if (action === 'absent') {
          return { ...s, total: s.total + 1 };
        } else {
          return s; // cancelled does not count towards total
        }
      })
    );

    const labels = {
      present: 'Marked Present! Attendance updated.',
      absent: 'Marked Absent. Recalculating safety margins.',
      cancelled: 'Class marked Cancelled (no penalty).',
    };
    toast.success(labels[action]);
  };

  const handleExportCSV = () => {
    const headers = 'Subject,Code,Attended,Total,Percentage,MinRequired\n';
    const rows = subjects
      .map(s => `"${s.name}","${s.code}",${s.attended},${s.total},${Math.round((s.attended/s.total)*100)}%,${s.minRequired}%`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_audit_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Attendance audit report exported to CSV!');
  };

  return (
    <AppShell>
      <div className="space-y-8 font-body max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HudLabel label="DEFENSE // OWNER-ONLY RLS" color="acid" />
              <span className="text-zinc-500 font-mono text-xs">• 100% Private (Isolated From Other Nodes)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-white tracking-tight">
              Attendance Guardian &amp; Simulator
            </h1>
            <p className="text-zinc-400 font-mono text-xs mt-0.5">
              Strict mathematical forecasting: Calculate how many classes you can safely skip or must attend to clear the 75% threshold.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white font-mono text-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export Audit CSV
            </button>
          </div>
        </div>

        {/* Aggregate Standing Card */}
        <BracketCard headerTag="AGGREGATE STANDING // 75% MANDATE" glowColor={overallPct >= 75 ? 'acid' : 'signal'}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-acid" />
                <h3 className="text-xl font-heading font-semibold text-white">Overall Semester Standing</h3>
              </div>
              <p className="text-xs font-mono text-zinc-400">
                Total Classes: {totalClasses} • Attended: {totalAttended} • Absent: {totalClasses - totalAttended}
              </p>
              <p className="text-xs font-mono text-zinc-300">
                {overallPct >= 75
                  ? 'Your aggregate attendance satisfies the VTU/University examination hall ticket criteria.'
                  : 'Action Required: Aggregate attendance is below threshold. Attend upcoming lectures.'}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <ProgressRing progress={overallPct} size={78} color={overallPct >= 80 ? 'acid' : overallPct >= 75 ? 'cyan' : 'signal'} />
            </div>
          </div>
        </BracketCard>

        {/* Mark Today Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
            <span>TODAY&apos;S SCHEDULE &amp; REALTIME RECORDING</span>
            <span className="text-acid">{subjects.length} COURSES ACTIVE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjects.map(sub => {
              const calc = calculateAttendance(sub.attended, sub.total, sub.minRequired);

              return (
                <BracketCard
                  key={sub.id}
                  headerTag={`${sub.code} // MIN: ${sub.minRequired}%`}
                  glowColor={calc.status === 'safe' ? 'acid' : calc.status === 'warning' ? 'cyan' : 'signal'}
                  className="flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-base font-semibold text-white">{sub.name}</h4>
                        <span className="text-xs font-mono text-zinc-400">
                          {sub.attended} of {sub.total} classes attended
                        </span>
                      </div>
                      <ProgressRing
                        progress={calc.percentage}
                        size={48}
                        color={calc.status === 'safe' ? 'acid' : calc.status === 'warning' ? 'cyan' : 'signal'}
                      />
                    </div>

                    <div className={`p-2.5 rounded-xl font-mono text-xs border ${
                      calc.status === 'safe'
                        ? 'bg-acid/10 border-acid/30 text-acid'
                        : calc.status === 'warning'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        : 'bg-signal/10 border-signal/30 text-signal'
                    }`}>
                      {calc.message}
                    </div>
                  </div>

                  {/* Mark buttons */}
                  <div className="pt-4 border-t border-zinc-900 mt-4 grid grid-cols-3 gap-2 font-mono text-xs">
                    <button
                      onClick={() => handleMark(sub.id, 'present')}
                      className="py-2 px-2 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 hover:bg-emerald-900/80 flex items-center justify-center gap-1 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" /> Present
                    </button>
                    <button
                      onClick={() => handleMark(sub.id, 'absent')}
                      className="py-2 px-2 rounded-xl bg-red-950/60 border border-red-800/80 text-red-400 hover:bg-red-900/80 flex items-center justify-center gap-1 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" /> Absent
                    </button>
                    <button
                      onClick={() => handleMark(sub.id, 'cancelled')}
                      className="py-2 px-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center gap-1 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" /> Skip
                    </button>
                  </div>
                </BracketCard>
              );
            })}
          </div>
        </div>

        {/* What-If Simulator */}
        <BracketCard headerTag="PREDICTIVE SIMULATOR // WHAT-IF SCENARIOS" glowColor="cyan">
          <div className="space-y-4 font-mono text-xs">
            <div>
              <h3 className="text-base font-semibold text-white">Bunk &amp; Recovery Simulator</h3>
              <p className="text-zinc-400 text-xs mt-0.5">
                Simulate the mathematical impact of skipping or attending upcoming classes across the semester.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                <label className="text-zinc-400 uppercase text-[10px] block">If I miss next N classes:</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={whatIfMiss}
                    onChange={e => setWhatIfMiss(Number(e.target.value))}
                    className="flex-1 accent-signal"
                  />
                  <span className="text-signal font-bold text-sm w-8 text-right">{whatIfMiss}</span>
                </div>
                <div className="text-[11px] text-zinc-400">
                  Simulated percentage: {totalClasses + whatIfMiss > 0 ? Math.round((totalAttended / (totalClasses + whatIfMiss)) * 1000) / 10 : 100}%
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                <label className="text-zinc-400 uppercase text-[10px] block">If I attend next N classes:</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={whatIfAttend}
                    onChange={e => setWhatIfAttend(Number(e.target.value))}
                    className="flex-1 accent-acid"
                  />
                  <span className="text-acid font-bold text-sm w-8 text-right">{whatIfAttend}</span>
                </div>
                <div className="text-[11px] text-zinc-400">
                  Simulated percentage: {totalClasses + whatIfAttend > 0 ? Math.round(((totalAttended + whatIfAttend) / (totalClasses + whatIfAttend)) * 1000) / 10 : 100}%
                </div>
              </div>
            </div>
          </div>
        </BracketCard>
      </div>
    </AppShell>
  );
}
