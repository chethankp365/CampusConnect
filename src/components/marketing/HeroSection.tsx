'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useTypewriter } from '@/hooks/useTypewriter';
import { ArrowUpRight, Menu, X } from 'lucide-react';

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
  const { displayed, done } = useTypewriter(typewriterParagraph, 36, 500);

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

    // Fade in pills after 400ms
    const timer = setTimeout(() => setPillsVisible(true), 400);

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
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
        style={{ objectPosition: '70% center' }}
      />

      {/* Subtle overlay to ensure high legibility */}
      <div className="fixed inset-0 bg-black/15 z-0 pointer-events-none" />

      {/* Fixed Navbar (z-index 10) */}
      <nav className="fixed top-0 left-0 right-0 z-30 px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center backdrop-blur-[2px]">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 group select-none">
          <span className="font-heading tracking-tight text-[21px] sm:text-[26px] text-black font-semibold">
            Campus Connect<span className="text-[14px] align-top font-mono">®</span>
          </span>
          <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-mono group-hover:rotate-90 transition-transform duration-300">
            ✱
          </span>
        </Link>

        {/* Center: Desktop links */}
        <div className="hidden md:flex items-center text-[22px] lg:text-[23px] text-black font-normal">
          <a href="#features" className="hover:opacity-60 transition-opacity">Features</a>
          <span className="mx-1">,</span>
          <a href="#community" className="hover:opacity-60 transition-opacity">Community</a>
          <span className="mx-1">,</span>
          <a href="#opportunities" className="hover:opacity-60 transition-opacity">Opportunities</a>
          <span className="mx-1">,</span>
          <a href="#ai" className="hover:opacity-60 transition-opacity">AI</a>
        </div>

        {/* Right: Desktop CTA */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/login"
            className="text-[17px] text-black hover:opacity-70 transition-opacity font-medium"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-[22px] lg:text-[23px] text-black underline underline-offset-4 hover:opacity-60 transition-opacity font-normal"
          >
            Get started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] z-40 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile overlay menu (z-index 25) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-25 bg-white/95 backdrop-blur-md flex flex-col justify-center px-8 gap-8 transition-opacity duration-300">
          <Link
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[30px] font-medium text-black hover:text-signal transition-colors"
          >
            Features
          </Link>
          <Link
            href="#community"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[30px] font-medium text-black hover:text-signal transition-colors"
          >
            Community
          </Link>
          <Link
            href="#opportunities"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[30px] font-medium text-black hover:text-signal transition-colors"
          >
            Opportunities
          </Link>
          <Link
            href="#ai"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[30px] font-medium text-black hover:text-signal transition-colors"
          >
            AI Assistant
          </Link>
          <div className="pt-6 border-t border-black/10 flex flex-col gap-4">
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[32px] font-semibold text-black underline underline-offset-4"
            >
              Get started
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[20px] text-black/70"
            >
              Log in to account &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Hero Content Section (z-index 10) */}
      <section className="relative z-10 min-h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-12 pointer-events-auto">
        <div className="max-w-xl">
          {/* Blurred Intro Label */}
          <div
            className="pointer-events-none select-none mb-5 sm:mb-6 text-black font-normal leading-[1.3] text-[clamp(18px,4vw,25px)]"
            style={{ filter: 'blur(3.5px)' }}
          >
            <p>Hey there, meet N.O.V.A,</p>
            <p>Campus Connect&apos;s Navigation & Opportunity Voice Assistant</p>
          </div>

          {/* Typewriter Paragraph */}
          <div className="mb-6 sm:mb-8 text-black font-normal leading-[1.35] text-[clamp(18px,4vw,25px)] min-h-[58px]">
            <span>{displayed}</span>
            {!done && (
              <span className="inline-block w-[2.5px] h-[1.15em] bg-black align-middle ml-[2px] animate-blink" />
            )}
          </div>

          {/* Action Pills */}
          <div
            className={`flex flex-wrap gap-y-1.5 transition-all duration-500 transform ${
              pillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <Link
              href="/signup?intent=notes"
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] font-medium px-4 sm:px-5 py-[0.38em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 shadow-sm"
            >
              Find study notes
            </Link>
            <Link
              href="/signup?intent=events"
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] font-medium px-4 sm:px-5 py-[0.38em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 shadow-sm"
            >
              Discover events
            </Link>
            <Link
              href="/signup?intent=match"
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] font-medium px-4 sm:px-5 py-[0.38em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 shadow-sm"
            >
              Match with teammates
            </Link>
            <Link
              href="/signup?intent=opportunities"
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] font-medium px-4 sm:px-5 py-[0.38em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 shadow-sm"
            >
              Explore opportunities
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center bg-transparent text-white border border-white rounded-full text-[13px] sm:text-[15px] font-medium px-4 sm:px-5 py-[0.38em] mx-[0.2em] mb-[0.4em] gap-2 whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-200 shadow-sm backdrop-blur-xs"
            >
              <span>Join free in 30 seconds</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
