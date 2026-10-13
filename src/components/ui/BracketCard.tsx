import React from 'react';

interface BracketCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'signal' | 'acid' | 'ultra' | 'cyan' | 'none';
  headerTag?: string;
}

export function BracketCard({
  children,
  className = '',
  glowColor = 'none',
  headerTag,
}: BracketCardProps) {
  const glowStyles = {
    none: '',
    signal: 'hover:border-signal/50 hover:shadow-[0_0_25px_rgba(255,77,28,0.15)]',
    acid: 'hover:border-acid/50 hover:shadow-[0_0_25px_rgba(182,255,59,0.15)]',
    ultra: 'hover:border-ultra/50 hover:shadow-[0_0_25px_rgba(91,91,255,0.15)]',
    cyan: 'hover:border-cyan/50 hover:shadow-[0_0_25px_rgba(79,227,255,0.15)]',
  };

  return (
    <div
      className={`relative p-5 sm:p-6 rounded-[20px] bg-zinc-900/60 dark:bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-md transition-all duration-300 ${glowStyles[glowColor]} ${className}`}
    >
      {/* Corner Bracket Glyphs */}
      <div className="absolute top-2 left-2.5 font-mono text-[10px] text-zinc-500/50 select-none pointer-events-none">
        ┌
      </div>
      <div className="absolute top-2 right-2.5 font-mono text-[10px] text-zinc-500/50 select-none pointer-events-none">
        ┐
      </div>
      <div className="absolute bottom-2 left-2.5 font-mono text-[10px] text-zinc-500/50 select-none pointer-events-none">
        └
      </div>
      <div className="absolute bottom-2 right-2.5 font-mono text-[10px] text-zinc-500/50 select-none pointer-events-none">
        ┘
      </div>

      {headerTag && (
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800/60">
          <span className="font-mono text-[11px] text-zinc-400 tracking-wider uppercase">
            {headerTag}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
        </div>
      )}

      {children}
    </div>
  );
}
