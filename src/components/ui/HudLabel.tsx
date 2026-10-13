import React from 'react';

interface HudLabelProps {
  label: string;
  index?: string | number;
  className?: string;
  color?: 'signal' | 'acid' | 'ultra' | 'cyan' | 'muted';
}

export function HudLabel({ label, index, className = '', color = 'muted' }: HudLabelProps) {
  const colorClasses = {
    signal: 'text-signal border-signal/20 bg-signal/5',
    acid: 'text-acid border-acid/20 bg-acid/5',
    ultra: 'text-ultra border-ultra/20 bg-ultra/5',
    cyan: 'text-cyan border-cyan/20 bg-cyan/5',
    muted: 'text-zinc-500 dark:text-zinc-400 border-zinc-500/20 bg-zinc-500/5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-[12px] tracking-wider uppercase px-2 py-0.5 rounded border ${colorClasses[color]} ${className}`}
    >
      {index !== undefined && <span className="opacity-60">{`[ ${String(index).padStart(2, '0')} ]`}</span>}
      <span>{label}</span>
    </span>
  );
}
