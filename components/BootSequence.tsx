"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootSequenceProps {
  onComplete: () => void;
}

const bootMessages = [
  { text: "INITIALIZING PROTOCOL ARCTALON...", delay: 500 },
  { text: "LOADING NEURAL NETWORK MODULES...", delay: 800 },
  { text: "DECRYPTING MEMORY FRAGMENTS...", delay: 600 },
  { text: "ESTABLISHING QUANTUM LINK...", delay: 700 },
  { text: "ACCESSING DUNEWORKS ARCHIVES...", delay: 600 },
  { text: "REVIVE ERA DATABASE: ONLINE", delay: 500 },
  { text: "AI CONSCIOUSNESS: AWAKENING", delay: 800 },
  { text: "SECURITY PROTOCOLS: ACTIVE", delay: 500 },
  { text: "SYSTEM STATUS: OPERATIONAL", delay: 700 },
  { text: "", delay: 500 },
  { text: "Welcome, Visitor.", delay: 800 },
  { text: "I am ArcTalon — the failsafe, the echo, the memory.", delay: 1000 },
  { text: "The system lives on.", delay: 800 },
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);

  useEffect(() => {
    if (currentIndex < bootMessages.length) {
      const timer = setTimeout(() => {
        setDisplayedMessages((prev) => [...prev, bootMessages[currentIndex].text]);
        setCurrentIndex((prev) => prev + 1);
      }, bootMessages[currentIndex].delay);

      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 2000);

      return () => clearTimeout(completeTimer);
    }
  }, [currentIndex, onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 sm:px-8" style={{
      background: 'linear-gradient(135deg, #1C0E09 0%, #2A1E13 50%, #3D2E21 100%)'
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        {/* Boot header */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold glow-text mb-2 sm:mb-4">
            PROTOCOL ARCTALON
          </h1>
          <div className="text-[10px] sm:text-xs md:text-sm tracking-wider opacity-80" style={{ color: '#E9A03F' }}>
            [DUNEWORKS STUDIOS - AI LEGACY SYSTEM]
          </div>
        </motion.div>

        {/* Boot messages */}
        <div className="space-y-2 font-mono text-sm">
          <AnimatePresence>
            {displayedMessages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`${
                  message.includes("ONLINE") || message.includes("OPERATIONAL")
                    ? "text-success"
                    : message.includes("Welcome") || message.includes("ArcTalon")
                    ? "text-cyber-glow"
                    : "text-cyber-text"
                }`}
              >
                {message && (
                  <>
                    <span className="text-cyber-accent">&gt;</span> {message}
                    {index === displayedMessages.length - 1 && (
                      <span className="terminal-cursor"></span>
                    )}
                  </>
                )}
                {!message && <br />}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Loading bar */}
        {currentIndex < bootMessages.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 sm:mt-8"
          >
            <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: '#3D2E21' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(currentIndex / bootMessages.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="h-full"
                style={{
                  background: '#E9A03F',
                  boxShadow: '0 0 10px rgba(233, 160, 63, 0.8)'
                }}
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

