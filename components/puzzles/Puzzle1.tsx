"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CryptoJS from "crypto-js";

interface PuzzleProps {
  onSolve: () => void;
  onBack: () => void;
}

export default function Puzzle1({ onSolve, onBack }: PuzzleProps) {
  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [solved, setSolved] = useState(false);
  const [hint, setHint] = useState(0);

  // The encrypted message that decrypts to "AURADYNAMICS"
  const encryptedCode = "QVVSQURZTkFNSUNT"; // Base64 encoded
  const correctAnswer = "AURADYNAMICS";

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
                PUZZLE #1: ORIGIN LOG - AURAGENESIS
              </h1>
              <p className="text-cyber-text text-sm">
                Difficulty: EASY | Type: Decryption
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
                  [ENCRYPTED FILE DETECTED]
                </p>
                <p className="text-cyber-text">
                  Accessing Duneworks origin records...
                </p>
                <p className="text-cyber-text">File: FOUNDATION_LOG_2021.enc</p>
                <br />
                <p className="text-info">
                  The following encoded string contains the original company name:
                </p>
                <br />
                <div className="bg-cyber-background p-4 rounded border border-cyber-accent">
                  <p className="text-cyber-glow text-center text-xl tracking-wider">
                    {encryptedCode}
                  </p>
                </div>
                <br />
                <p className="text-cyber-text opacity-80">
                  Decode this Base64 string to reveal the original name of what would become Duneworks Studios.
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
                  → Hint 1: This is Base64 encoding. Use an online decoder or terminal command to decode it.
                </motion.div>
              )}
              
              {hint >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-warning text-sm"
                >
                  → Hint 2: The answer is the original name before "Duneworks" - all uppercase, one word.
                </motion.div>
              )}
            </div>

            {/* Input form */}
            <div className="terminal-window p-6">
              <form onSubmit={handleSubmit}>
                <label className="block text-cyber-accent mb-2 text-sm">
                  Enter decoded answer:
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-cyber-background border border-cyber-accent rounded px-4 py-2 text-cyber-text focus:outline-none focus:border-cyber-glow"
                    placeholder="Enter the company name..."
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
                  Incorrect. Attempts: {attempts}
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
              <p className="text-success text-4xl mb-4">✓ ACCESS GRANTED</p>
              <p className="text-cyber-accent text-xl mb-6">Decryption Successful</p>
            </div>
            
            <div className="text-cyber-text space-y-4 max-w-2xl mx-auto">
              <p className="text-success font-bold">
                [ORIGIN LOG UNLOCKED]
              </p>
              <br />
              <p>
                "Duneworks Studios was founded by Harry (MrNiceDoge) and Danny while playing Kerbal Space Program."
              </p>
              <p>
                "Originally called <span className="text-cyber-glow">AuraDynamics</span> in 2021. Partnered with Ecolying F1IS (a Formula Racing team)."
              </p>
              <p>
                "Later became Duneworks to focus on games and engineering design."
              </p>
              <br />
              <p className="text-info text-sm italic">
                A friendship born in space simulators, evolved into something greater.
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

