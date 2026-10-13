import React from 'react';

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-[20px] p-5 sm:p-6 border border-zinc-800 bg-zinc-900/40 animate-pulse space-y-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 bg-zinc-800 rounded font-mono" />
        <div className="h-4 w-12 bg-zinc-800 rounded font-mono" />
      </div>
      <div className="h-6 w-3/4 bg-zinc-800 rounded" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-zinc-800/60 rounded" />
        <div className="h-3 w-5/6 bg-zinc-800/60 rounded" />
      </div>
      <div className="pt-2 flex items-center justify-between">
        <div className="h-5 w-16 bg-zinc-800 rounded-full" />
        <div className="h-8 w-20 bg-zinc-800 rounded-full" />
      </div>
    </div>
  );
}
