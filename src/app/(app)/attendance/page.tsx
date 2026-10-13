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
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AttendancePage() {
  const [subjects, setSubjects] = useState(MOCK_ATTENDANCE);
  const [whatIfMiss, setWhatIfMiss] = useState<number>(0);
  const [whatIfAttend, setWhatIfAttend] = useState<number>(0);

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
          return s;
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
      <div className="space-y-10 font-body">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <HudLabel label="DEFENSE // OWNER-ONLY RLS" color="acid" />
              <span className="text-zinc-500 font-mono text-sm">• 100% Private (Zero Leakage Across Nodes)</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
              Attendance Guardian &amp; Simulator
            </h1>
            <p className="text-zinc-400 font-mono text-sm max-w-2xl">
              Strict mathematical forecasting: Calculate exactly how many lectures you can safely skip or must attend to clear university hall ticket mandates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white font-mono text-sm transition-colors cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" /> Export Audit CSV
            </button>
          </div>
        </div>

        {/* Aggregate Standing Card - Grand & Prominent */}
        <BracketCard headerTag="AGGREGATE STANDING // 75% EXAMINATION MANDATE" glowColor={overallPct >= 75 ? 'acid' : 'signal'} className="p-8 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-acid" />
                <h3 className="text-2xl font-heading font-bold text-white">Overall Semester Health</h3>
              </div>
              <p className="text-sm font-mono text-zinc-400">
                Total Classes: <strong className="text-white">{totalClasses}</strong> • Attended: <strong className="text-acid">{totalAttended}</strong> • Missed: <strong className="text-signal">{totalClasses - totalAttended}</strong>
              </p>
              <p className="text-sm font-mono text-zinc-300 leading-relaxed max-w-2xl">
                {overallPct >= 75
                  ? 'Your aggregate attendance safely satisfies university hall ticket criteria. Safe bunking margins remain active.'
                  : 'Warning: Aggregate attendance is currently below the required threshold. Attend upcoming lectures to recover.'}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <ProgressRing progress={overallPct} size={96} strokeWidth={8} color={overallPct >= 80 ? 'acid' : overallPct >= 75 ? 'cyan' : 'signal'} />
            </div>
          </div>
        </BracketCard>

        {/* Mark Today Cards - Roomy Multi-Column Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between font-mono text-sm text-zinc-400">
            <span>TODAY&apos;S SCHEDULE &amp; REALTIME TELEMETRY</span>
            <span className="text-acid font-bold">{subjects.length} COURSES ACTIVE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map(sub => {
              const calc = calculateAttendance(sub.attended, sub.total, sub.minRequired);

              return (
                <BracketCard
                  key={sub.id}
                  headerTag={`${sub.code} // MIN: ${sub.minRequired}%`}
                  glowColor={calc.status === 'safe' ? 'acid' : calc.status === 'warning' ? 'cyan' : 'signal'}
                  className="p-7 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-white">{sub.name}</h4>
                        <span className="text-xs font-mono text-zinc-400 mt-0.5 block">
                          {sub.attended} of {sub.total} classes attended
                        </span>
                      </div>
                      <ProgressRing
                        progress={calc.percentage}
                        size={56}
                        color={calc.status === 'safe' ? 'acid' : calc.status === 'warning' ? 'cyan' : 'signal'}
                      />
                    </div>

                    <div className={`p-3.5 rounded-2xl font-mono text-xs border leading-relaxed ${
                      calc.status === 'safe'
                        ? 'bg-acid/10 border-acid/30 text-acid'
                        : calc.status === 'warning'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        : 'bg-signal/10 border-signal/30 text-signal'
                    }`}>
                      {calc.message}
                    </div>
                  </div>

                  {/* Mark buttons - Big & Tactile */}
                  <div className="pt-6 border-t border-zinc-900 mt-6 grid grid-cols-3 gap-2.5 font-mono text-xs">
                    <button
                      onClick={() => handleMark(sub.id, 'present')}
                      className="py-3 px-2 rounded-xl bg-emerald-950/70 border border-emerald-800 text-emerald-400 hover:bg-emerald-900 flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold active:scale-95"
                    >
                      <Check className="w-4 h-4" /> Present
                    </button>
                    <button
                      onClick={() => handleMark(sub.id, 'absent')}
                      className="py-3 px-2 rounded-xl bg-red-950/70 border border-red-800 text-red-400 hover:bg-red-900 flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold active:scale-95"
                    >
                      <X className="w-4 h-4" /> Absent
                    </button>
                    <button
                      onClick={() => handleMark(sub.id, 'cancelled')}
                      className="py-3 px-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                    >
                      <Minus className="w-4 h-4" /> Skip
                    </button>
                  </div>
                </BracketCard>
              );
            })}
          </div>
        </div>

        {/* What-If Simulator - Wide & Engaging */}
        <BracketCard headerTag="PREDICTIVE SIMULATOR // WHAT-IF SCENARIOS" glowColor="cyan" className="p-8 sm:p-10">
          <div className="space-y-6 font-mono text-xs sm:text-sm">
            <div>
              <h3 className="text-xl font-heading font-semibold text-white">Bunk &amp; Recovery Simulator</h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                Simulate the mathematical impact of skipping or attending upcoming classes before making real schedule decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                <label className="text-zinc-400 uppercase text-xs block font-semibold">If I miss next N classes:</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={0}
                    max={12}
                    value={whatIfMiss}
                    onChange={e => setWhatIfMiss(Number(e.target.value))}
                    className="flex-1 accent-signal h-2"
                  />
                  <span className="text-signal font-bold text-lg w-10 text-right">{whatIfMiss}</span>
                </div>
                <div className="text-xs text-zinc-300 pt-1">
                  Simulated attendance: <strong className="text-white">{totalClasses + whatIfMiss > 0 ? Math.round((totalAttended / (totalClasses + whatIfMiss)) * 1000) / 10 : 100}%</strong>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                <label className="text-zinc-400 uppercase text-xs block font-semibold">If I attend next N classes:</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={0}
                    max={12}
                    value={whatIfAttend}
                    onChange={e => setWhatIfAttend(Number(e.target.value))}
                    className="flex-1 accent-acid h-2"
                  />
                  <span className="text-acid font-bold text-lg w-10 text-right">{whatIfAttend}</span>
                </div>
                <div className="text-xs text-zinc-300 pt-1">
                  Simulated attendance: <strong className="text-white">{totalClasses + whatIfAttend > 0 ? Math.round(((totalAttended + whatIfAttend) / (totalClasses + whatIfAttend)) * 1000) / 10 : 100}%</strong>
                </div>
              </div>
            </div>
          </div>
        </BracketCard>
      </div>
    </AppShell>
  );
}
