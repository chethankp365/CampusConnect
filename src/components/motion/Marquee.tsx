import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number; // seconds
  className?: string;
}

export function Marquee({ children, speed = 25, className = '' }: MarqueeProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap flex select-none ${className}`}>
      <div
        className="flex shrink-0 animate-marquee items-center gap-8 pr-8"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      <div
        className="flex shrink-0 animate-marquee items-center gap-8 pr-8"
        style={{ animationDuration: `${speed}s` }}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
