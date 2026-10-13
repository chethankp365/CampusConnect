import React from 'react';

interface ProgressRingProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  color?: 'signal' | 'acid' | 'ultra' | 'cyan' | 'auto';
  showLabel?: boolean;
  className?: string;
}

export function ProgressRing({
  progress,
  size = 64,
  strokeWidth = 6,
  color = 'auto',
  showLabel = true,
  className = '',
}: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(100, progress));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  let strokeColor = '#4FE3FF';
  if (color === 'auto') {
    if (clamped >= 80) strokeColor = '#B6FF3B'; // acid
    else if (clamped >= 60) strokeColor = '#4FE3FF'; // cyan
    else if (clamped >= 40) strokeColor = '#5B5BFF'; // ultra
    else strokeColor = '#FF4D1C'; // signal
  } else {
    const colorMap = {
      signal: '#FF4D1C',
      acid: '#B6FF3B',
      ultra: '#5B5BFF',
      cyan: '#4FE3FF',
    };
    strokeColor = colorMap[color];
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-black/10 dark:text-white/10"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      {showLabel && (
        <span className="absolute font-mono text-[11px] sm:text-[13px] font-bold">
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  );
}
