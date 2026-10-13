import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlassCard({ children, className = '', onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-[20px] bg-white/70 dark:bg-zinc-950/60 backdrop-blur-xl border border-black/10 dark:border-white/10 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 ${onClick ? 'cursor-pointer hover:border-black/20 dark:hover:border-white/20' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
