import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'white' | 'outline' | 'signal' | 'dark' | 'ghost';
  href?: string;
  icon?: boolean | React.ReactNode;
  children: React.ReactNode;
}

export function PillButton({
  variant = 'white',
  href,
  icon,
  children,
  className = '',
  ...props
}: PillButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-full text-[13px] sm:text-[15px] font-medium px-4 sm:px-5 py-[0.4em] transition-all duration-200 whitespace-nowrap cursor-pointer select-none';

  const variants = {
    white: 'bg-white text-black border border-black/10 hover:bg-black hover:text-white shadow-sm',
    outline: 'bg-transparent text-foreground border border-current hover:bg-foreground hover:text-background',
    signal: 'bg-signal text-white hover:bg-signal/90 shadow-md shadow-signal/20',
    dark: 'bg-zinc-900 text-white dark:bg-white dark:text-black border border-zinc-700/50 hover:opacity-90',
    ghost: 'bg-transparent text-foreground hover:bg-foreground/5',
  };

  const content = (
    <>
      <span>{children}</span>
      {icon === true ? (
        <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      ) : (
        icon
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${variants[variant]} group ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} group ${className}`} {...props}>
      {content}
    </button>
  );
}
