"use client";

import { useState, useEffect } from "react";

export default function MatrixRain() {
  const [mounted, setMounted] = useState(false);

  // Generate consistent random values after mounting
  const [columns] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      key: i,
      left: `${i * 5}%`,
      animationDuration: `${5 + Math.random() * 5}s`,
      animationDelay: `${Math.random() * 5}s`,
      chars: Array.from({ length: 20 }, () => ({
        opacity: Math.random(),
        char: String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96)),
      })),
    }))
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render on server to avoid hydration mismatch
  if (!mounted) {
    return <div className="absolute inset-0 opacity-10 pointer-events-none" />;
  }

  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      {columns.map((col) => (
        <div
          key={col.key}
          className="absolute text-cyber-accent text-xs"
          style={{
            left: col.left,
            animation: `matrix-fall ${col.animationDuration} linear infinite`,
            animationDelay: col.animationDelay,
          }}
        >
          {col.chars.map((char, j) => (
            <div key={j} style={{ opacity: char.opacity }}>
              {char.char}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

