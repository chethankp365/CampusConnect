import React from 'react';

interface StatusLEDProps {
  status?: 'online' | 'warning' | 'error' | 'syncing';
  label?: string;
  className?: string;
}

export function StatusLED({ status = 'online', label, className = '' }: StatusLEDProps) {
  const statusStyles = {
    online: 'bg-acid shadow-[0_0_8px_#B6FF3B]',
    warning: 'bg-amber-400 shadow-[0_0_8px_#F59E0B]',
    error: 'bg-signal shadow-[0_0_8px_#FF4D1C]',
    syncing: 'bg-cyan shadow-[0_0_8px_#4FE3FF] animate-pulse',
  };

  return (
    <div className={`inline-flex items-center gap-2 font-mono text-xs select-none ${className}`}>
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusStyles[status].split(' ')[0]}`}
        />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${statusStyles[status]}`} />
      </span>
      {label && <span className="opacity-80 uppercase tracking-wider text-[10px]">{label}</span>}
    </div>
  );
}
