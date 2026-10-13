import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  isDarkTheme?: boolean;
}

export function Logo({ className = '', isDarkTheme = false }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 group select-none ${className}`}>
      <span className="font-heading font-medium tracking-tight text-[21px] sm:text-[25px]">
        Campus Connect<span className="text-[12px] sm:text-[14px] align-top ml-0.5 font-mono">®</span>
      </span>
      <span className="text-signal text-[24px] sm:text-[28px] font-mono leading-none group-hover:rotate-90 transition-transform duration-300">
        ✱
      </span>
    </Link>
  );
}
