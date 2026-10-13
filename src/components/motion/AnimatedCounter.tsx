'use client';

import React, { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({
  value,
  duration = 1000,
  className = '',
  prefix = '',
  suffix = '',
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) {
      setDisplayValue(end);
      return;
    }

    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo curve
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(eased * end);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [value, duration]);

  return (
    <span className={`font-mono tracking-tight ${className}`}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}
