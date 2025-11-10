"use client";

import { useEffect, useState } from "react";

export default function DuneEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate dust particles
  const dustParticles = Array.from({ length: 15 }, (_, i) => ({
    key: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 20}s`,
    animationDuration: `${15 + Math.random() * 10}s`,
  }));

  return (
    <>
      {/* Dust particles */}
      <div className="fixed inset-0 pointer-events-none z-[3] overflow-hidden opacity-20">
        {dustParticles.map((particle) => (
          <div
            key={particle.key}
            className="dust-particle absolute"
            style={{
              left: particle.left,
              bottom: 0,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration,
            }}
          />
        ))}
      </div>

      {/* Heatwave distortion effect */}
      <div className="heatwave" />
    </>
  );
}

