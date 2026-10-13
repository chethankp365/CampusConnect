'use client';

import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed: number = 38, startDelay: number = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let timeoutId: NodeJS.Timeout;

    const delayTimer = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayed(text.slice(0, index + 1));
          index++;
        } else {
          setDone(true);
          clearInterval(typeInterval);
        }
      }, speed);

      timeoutId = typeInterval as unknown as NodeJS.Timeout;
    }, startDelay);

    return () => {
      clearTimeout(delayTimer);
      if (timeoutId) clearInterval(timeoutId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
