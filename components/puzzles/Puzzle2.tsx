"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface PuzzleProps {
  onSolve: () => void;
  onBack: () => void;
}

export default function Puzzle2({ onSolve, onBack }: PuzzleProps) {
  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [solved, setSolved] = useState(false);
  const [hint, setHint] = useState(0);

  // Morse code for "LEGACY"
  const morseCode = ".-.. . --. .- -.-. -.--";
  const correctAnswer = "LEGACY";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempts(attempts + 1);

    if (input.toUpperCase().trim() === correctAnswer) {
      setSolved(true);
      onSolve();
    }
  };

  const showHint = () => {
    setHint(hint + 1);
  };

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="terminal-window p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-cyber-accent mb-2">
                PUZZLE #2: TRANSMISSION - REVIVE ERA
              </h1>
              <p className="text-cyber-text text-sm">
                Difficulty: EASY | Type: Morse Code Translation
              </p>
            </div>
            <button
              onClick={onBack}
              className="px-4 py-2 neon-border rounded hover:bg-cyber-accent hover:bg-opacity-20"
            >
              BACK
            </button>
          </div>
        </div>

        {!solved ? (
          <>
            {/* Puzzle content */}
            <div className="terminal-window p-6 mb-6">
              <div className="font-mono text-sm space-y-4">
                <p className="text-warning">
                  [INTERCEPTED TRANSMISSION]
                </p>
                <p className="text-cyber-text">
                  Incoming message from REVIVE ERA archives...
                </p>
                <p className="text-cyber-text">Signal strength: WEAK</p>
                <p className="text-cyber-text">Encryption: MORSE CODE</p>
                <br />
                <div className="bg-cyber-background p-6 rounded border border-cyber-accent">
                  <p className="text-cyber-glow text-center text-2xl tracking-widest">
                    {morseCode}
                  </p>
                </div>
                <br />
                <p className="text-cyber-text opacity-80">
                  Decode this Morse code transmission to unlock the heartfelt message.
                </p>
              </div>
            </div>

            {/* Hints */}
            <div className="terminal-window p-6 mb-6">
              <button
                onClick={showHint}
                className="text-warning hover:text-cyber-glow transition-colors mb-4"
              >
                [HINT SYSTEM] Click for hint ({hint}/2)
              </button>
              
              {hint >= 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-cyber-text text-sm mb-2"
                >
                  → Hint 1: Use a Morse code decoder. Dots (.) and dashes (-) represent letters.
                </motion.div>
              )}
              
              {hint >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-warning text-sm"
                >
                  → Hint 2: The message is a single word that represents what Duneworks carries forward.
                </motion.div>
              )}
            </div>

            {/* Input form */}
            <div className="terminal-window p-6">
              <form onSubmit={handleSubmit}>
                <label className="block text-cyber-accent mb-2 text-sm">
                  Enter decoded message:
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-cyber-background border border-cyber-accent rounded px-4 py-2 text-cyber-text focus:outline-none focus:border-cyber-glow"
                    placeholder="Enter the decoded word..."
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-cyber-accent text-cyber-background rounded hover:bg-cyber-glow transition-colors"
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
              
              {attempts > 0 && !solved && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-error text-sm mt-4"
                >
                  Incorrect transmission. Attempts: {attempts}
                </motion.p>
              )}
            </div>
          </>
        ) : (
          /* Success message */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="terminal-window p-8 border-success"
          >
            <div className="text-center mb-6">
              <p className="text-success text-4xl mb-4">✓ TRANSMISSION DECODED</p>
              <p className="text-cyber-accent text-xl mb-6">Message Decrypted Successfully</p>
            </div>
            
            <div className="text-cyber-text space-y-4 max-w-2xl mx-auto">
              <p className="text-success font-bold">
                [REVIVE ERA MESSAGE UNLOCKED]
              </p>
              <br />
              <p className="text-cyber-glow text-lg italic">
                "To all my friends — Vibez, Harry, Nyra — this studio wouldn't have existed without you in the Revive Era."
              </p>
              <p className="text-cyber-glow text-lg italic">
                "You're my best friends. When I retire, Duneworks' future belongs to you:"
              </p>
              <p className="text-cyber-text">
                → Harry as CEO (upon my retirement)<br />
                → Vibez as CTO (upon my retirement)<br />
                → Nyra as CAO (upon my retirement)<br />
                → And James where he is
              </p>
              <br />
              <p className="text-cyber-glow text-lg italic">
                "Until then, we build this together. When the time comes, carry the legacy."
              </p>
              <br />
              <p className="text-info text-sm">
                - Daniel, Founder of Duneworks
              </p>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={onBack}
                className="px-8 py-3 neon-border rounded hover:bg-cyber-accent hover:bg-opacity-20 transition-colors"
              >
                CONTINUE
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

