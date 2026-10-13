'use client';

import React, { useRef, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className = '', maxTilt = 12 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -maxTilt;
    const rotY = ((x - centerX) / centerX) * maxTilt;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s cubic-bezier(0.2, 0, 0, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`relative rounded-[20px] overflow-hidden ${className}`}
    >
      {/* Glare effect */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          opacity: glarePosition.opacity,
        }}
      />
      {children}
    </div>
  );
}
