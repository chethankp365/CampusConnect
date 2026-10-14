'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useTypewriter } from '@/hooks/useTypewriter';
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';

const SENSITIVITY = 0.8;

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pillsVisible, setPillsVisible] = useState(false);

  const typewriterParagraph =
    'Glad you made it. Notes, events, teammates and opportunities from every campus, all in one place. What are you looking for today?';
  const { displayed, done } = useTypewriter(typewriterParagraph, 34, 450);

  // Video mouse scrubbing implementation
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.05) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    video.addEventListener('seeked', handleSeeked);

    const handleMouseMove = (e: MouseEvent) => {
      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      if (!video.duration || isNaN(video.duration)) return;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      let nextTime = targetTimeRef.current + timeOffset;
      nextTime = Math.max(0, Math.min(video.duration, nextTime));
      targetTimeRef.current = nextTime;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = nextTime;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const clientX = e.touches[0].clientX;
        if (prevXRef.current === null) {
          prevXRef.current = clientX;
          return;
        }
        const delta = clientX - prevXRef.current;
        prevXRef.current = clientX;

        if (!video.duration || isNaN(video.duration)) return;
        const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
        let nextTime = targetTimeRef.current + timeOffset;
        nextTime = Math.max(0, Math.min(video.duration, nextTime));
        targetTimeRef.current = nextTime;

        if (!isSeekingRef.current) {
          isSeekingRef.current = true;
          video.currentTime = nextTime;
        }
      }
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    const timer = setTimeout(() => setPillsVisible(true), 350);

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background scrubbable video */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none select-none transition-transform duration-700"
        style={{ objectPosition: '70% center' }}
      />

      {/* Subtle vignette overlay */}
      <div className="fixed inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10 z-0 pointer-events-none" />

      {/* Fixed Navbar (z-index 30) */}
      <nav className="fixed top-0 left-0 right-0 z-30 px-6 sm:px-10 lg:px-16 py-5 sm:py-6 flex justify-between items-center backdrop-blur-[3px] transition-all">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5 group select-none">
          <span className="font-heading tracking-tight text-[24px] sm:text-[30px] lg:text-[32px] text-black font-semibold">
            Campus Connect<span className="text-[15px] align-top font-mono">®</span>
          </span>
          <span className="text-[28px] sm:text-[34px] text-black select-none tracking-[-0.02em] font-mono group-hover:rotate-90 transition-transform duration-300">
            ✱
          </span>
        </Link>

        {/* Center: Desktop links with clean typography */}
        <div className="hidden lg:flex items-center gap-8 text-[20px] xl:text-[22px] text-black font-normal">
          <a href="#features" className="hover:opacity-60 transition-opacity">Features</a>
          <span className="text-black/30">•</span>
          <a href="#community" className="hover:opacity-60 transition-opacity">Community</a>
          <span className="text-black/30">•</span>
          <a href="#opportunities" className="hover:opacity-60 transition-opacity">Opportunities</a>
          <span className="text-black/30">•</span>
          <a href="#ai" className="hover:opacity-60 transition-opacity">AI</a>
        </div>

        {/* Right: Desktop CTA */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/login"
            className="text-[18px] lg:text-[20px] text-black hover:opacity-70 transition-opacity font-medium px-3 py-1"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-[20px] lg:text-[22px] text-black underline underline-offset-6 hover:opacity-60 transition-opacity font-normal"
          >
            Get started &rarr;
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-[6px] z-40 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <span
            className={`w-7 h-[2px] bg-black transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''
            }`}
          />
          <span
            className={`w-7 h-[2px] bg-black transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-7 h-[2px] bg-black transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-25 bg-white/95 backdrop-blur-md flex flex-col justify-center px-8 sm:px-12 gap-8 transition-opacity duration-300">
          <Link
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[34px] font-medium text-black hover:text-signal transition-colors"
          >
            Features
          </Link>
          <Link
            href="#community"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[34px] font-medium text-black hover:text-signal transition-colors"
          >
            Community
          </Link>
          <Link
            href="#opportunities"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[34px] font-medium text-black hover:text-signal transition-colors"
          >
            Opportunities
          </Link>
          <Link
            href="#ai"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[34px] font-medium text-black hover:text-signal transition-colors"
          >
            AI Assistant
          </Link>
          <div className="pt-6 border-t border-black/10 flex flex-col gap-4">
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[34px] font-semibold text-black underline underline-offset-6"
            >
              Get started
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[22px] text-black/70"
            >
              Log in to account &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Hero Content Section */}
      <section className="relative z-10 min-h-screen flex flex-col justify-end pb-16 md:justify-center md:pb-0 px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 pointer-events-auto">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Blurred Intro Label */}
          <div
            className="pointer-events-none select-none mb-5 sm:mb-6 text-black font-normal leading-[1.3] text-[clamp(20px,2.8vw,30px)]"
            style={{ filter: 'blur(3.2px)' }}
          >
            <p>Hey there, meet N.O.V.A,</p>
            <p>Campus Connect&apos;s Navigation &amp; Opportunity Voice Assistant</p>
          </div>

          {/* Typewriter Paragraph */}
          <div className="mb-7 sm:mb-8 text-black font-normal leading-[1.3] text-[clamp(21px,2.8vw,36px)] min-h-[82px] tracking-tight">
            <span>{displayed}</span>
            {!done && (
              <span className="inline-block w-[3.5px] h-[1.15em] bg-black align-middle ml-[3px] animate-blink" />
            )}
          </div>

          {/* Action Pills */}
          <div
            className={`flex flex-wrap gap-2.5 sm:gap-3 transition-all duration-700 transform ${
              pillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <Link
              href="/signup?intent=notes"
              className="inline-flex items-center justify-center bg-white text-black border border-black/15 rounded-full text-[14px] sm:text-[16px] font-medium px-4 sm:px-6 py-2 sm:py-3 whitespace-nowrap hover:bg-black hover:text-white transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
            >
              Find study notes
            </Link>
            <Link
              href="/signup?intent=events"
              className="inline-flex items-center justify-center bg-white text-black border border-black/15 rounded-full text-[14px] sm:text-[16px] font-medium px-4 sm:px-6 py-2 sm:py-3 whitespace-nowrap hover:bg-black hover:text-white transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
            >
              Discover events
            </Link>
            <Link
              href="/signup?intent=match"
              className="inline-flex items-center justify-center bg-white text-black border border-black/15 rounded-full text-[14px] sm:text-[16px] font-medium px-4 sm:px-6 py-2 sm:py-3 whitespace-nowrap hover:bg-black hover:text-white transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
            >
              Match with teammates
            </Link>
            <Link
              href="/signup?intent=opportunities"
              className="inline-flex items-center justify-center bg-white text-black border border-black/15 rounded-full text-[14px] sm:text-[16px] font-medium px-4 sm:px-6 py-2 sm:py-3 whitespace-nowrap hover:bg-black hover:text-white transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
            >
              Explore opportunities
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center bg-zinc-900/90 text-white border border-black/20 rounded-full text-[14px] sm:text-[16px] font-medium px-4 sm:px-6 py-2 sm:py-3 gap-2.5 whitespace-nowrap hover:bg-black hover:text-white transition-all duration-200 shadow-lg hover:scale-105 active:scale-95 backdrop-blur-md"
            >
              <span>Join free in 30 seconds</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
