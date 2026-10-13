'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function BootSequence({ onComplete }: { onComplete?: () => void }) {
  const [booting, setBooting] = useState(false);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    // Check if user already booted this session
    const hasBooted = sessionStorage.getItem('cc_booted');
    if (hasBooted) {
      if (onComplete) onComplete();
      return;
    }

    setBooting(true);

    const bootLogs = [
      'BIOS_INIT // CAMPUS_CONNECT MAINFRAME v4.12.0',
      'CHECKING NEURAL TOPOLOGY... OK',
      'CONNECTING 15 BENGALURU NODES (IISc, RVCE, BMSCE, PESU, MSRIT)... MOUNTED',
      'SYNCHRONIZING REPUTATION LEDGERS & RLS PROTOCOLS... ACTIVE',
      'INITIALIZING N.O.V.A ASSISTANT INTELLIGENCE CORE... ONLINE',
      'TERMINAL READY. ACCESS GRANTED.',
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < bootLogs.length) {
        setLines(prev => [...prev, bootLogs[current]]);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          sessionStorage.setItem('cc_booted', 'true');
          setBooting(false);
          if (onComplete) onComplete();
        }, 600);
      }
    }, 280);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('cc_booted', 'true');
    setBooting(false);
    if (onComplete) onComplete();
  };

  if (!booting) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 bg-black font-mono text-zinc-300 select-none crt-overlay"
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-500 pb-4 border-b border-zinc-800">
            <span>SYS_BOOT_LOADER // ID: CC-8086</span>
            <span className="animate-pulse text-acid">● KERNEL OK</span>
          </div>

          <div className="space-y-1.5 pt-4 text-xs sm:text-sm">
            {lines.map((line, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-zinc-600">&gt;</span>
                <span className={idx === lines.length - 1 ? 'text-signal font-semibold' : 'text-zinc-300'}>
                  {line}
                </span>
              </div>
            ))}
            <div className="inline-block w-2.5 h-4 bg-signal animate-blink" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-zinc-800 text-xs">
          <span className="text-zinc-500">PRESS ESC OR TAP TO SKIP</span>
          <button
            onClick={handleSkip}
            className="px-3 py-1 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors uppercase font-mono tracking-wider"
          >
            [ SKIP BOOT ]
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
