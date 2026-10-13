'use client';

import React from 'react';
import { HeroSection } from '@/components/marketing/HeroSection';
import { ScrollStory } from '@/components/marketing/ScrollStory';
import { BootSequence } from '@/components/motion/BootSequence';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-black">
      <BootSequence />
      <HeroSection />
      <ScrollStory />
    </main>
  );
}
