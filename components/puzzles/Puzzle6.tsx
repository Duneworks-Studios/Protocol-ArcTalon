"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PuzzleProps {
  onSolve: () => void;
  onBack: () => void;
}

export default function Puzzle6({ onSolve, onBack }: PuzzleProps) {
  const [clues, setClues] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [solved, setSolved] = useState(false);
  const [hint, setHint] = useState(0);

  // The answer combines clues from previous puzzles
  // AURA + LEGACY + DANIEL + 2025 + FAILSAFE + REVIVAL = "DUNEWORKS"
  const correctAnswer = "DUNEWORKS";

  useEffect(() => {
    // Simulate loading clues from previous puzzles
    setTimeout(() => {
      setClues([
        "AURA... the beginning",
        "LEGACY... what remains",
        "DANIEL... the creator",
        "2025... the turning point",
        "FAILSAFE... the protocol",
        "REVIVAL... the return",
      ]);
    }, 1000);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempts(attempts + 1);

    if (input.toUpperCase() === correctAnswer) {
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
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="terminal-window p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-cyber-accent mb-2">
                PUZZLE #6: THE PROTOCOL KEY
              </h1>
              <p className="text-cyber-text text-sm">
                Difficulty: EXPERT | Type: Meta-Puzzle
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
                  [FINAL PROTOCOL SEQUENCE]
                </p>
                <p className="text-cyber-text">
                  You've unlocked fragments of memory, decoded transmissions, restored corrupted data,
                  and broken through encryption layers.
                </p>
                <br />
                <p className="text-info">
                  All clues point to one answer — the core of everything. What ties it all together?
                </p>
              </div>
            </div>

            {/* Clues display */}
            <div className="terminal-window p-6 mb-6">
              <p className="text-cyber-accent font-bold mb-4 text-center">
                COLLECTED FRAGMENTS:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {clues.map((clue, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="p-4 neon-border rounded text-center"
                  >
                    <div className="text-cyber-glow text-sm holographic">
                      {clue}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cipher grid */}
            <div className="terminal-window p-6 mb-6">
              <p className="text-cyber-accent text-sm mb-4 text-center">
                PROTOCOL SEQUENCE ANALYSIS:
              </p>
              <div className="bg-cyber-background p-6 rounded border border-cyber-accent">
                <div className="text-center space-y-2 font-mono text-sm">
                  <p className="text-cyber-text">
                    Origin → <span className="text-cyber-glow">AURA</span>
                  </p>
                  <p className="text-cyber-text">
                    Foundation → <span className="text-cyber-glow">Friends</span>
                  </p>
                  <p className="text-cyber-text">
                    Purpose → <span className="text-cyber-glow">LEGACY</span>
                  </p>
                  <p className="text-cyber-text">
                    Creator → <span className="text-cyber-glow">DANIEL</span>
                  </p>
                  <p className="text-cyber-text">
                    Transformation → <span className="text-cyber-glow">2025</span>
                  </p>
                  <p className="text-cyber-text">
                    Protection → <span className="text-cyber-glow">FAILSAFE</span>
                  </p>
                  <p className="text-cyber-text">
                    Future → <span className="text-cyber-glow">REVIVAL</span>
                  </p>
                  <br />
                  <p className="text-warning text-lg">
                    All paths lead to → <span className="animate-pulse-glow">?????????</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Input form */}
            <div className="terminal-window p-6 mb-6">
              <form onSubmit={handleSubmit}>
                <label className="block text-cyber-accent mb-2 text-sm text-center text-lg">
                  What is the core that binds all these fragments?
                </label>
                <div className="flex gap-4 max-w-md mx-auto">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-cyber-background border border-cyber-accent rounded px-4 py-2 text-cyber-text focus:outline-none focus:border-cyber-glow text-center text-lg"
                    placeholder="Enter the final answer..."
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-cyber-accent text-cyber-background rounded hover:bg-cyber-glow transition-colors"
                  >
                    UNLOCK
                  </button>
                </div>
              </form>
              
              {attempts > 0 && !solved && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-error text-sm mt-4 text-center"
                >
                  Incorrect protocol key. Attempts: {attempts}
                </motion.p>
              )}
            </div>

            {/* Hints */}
            <div className="terminal-window p-6">
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
                  → Hint 1: The answer is not hidden in the clues themselves, but in what all these stories are about.
                </motion.div>
              )}
              
              {hint >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-warning text-sm"
                >
                  → Hint 2: Think of the studio name. The place where all these memories live. One word, 9 letters.
                </motion.div>
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
              <p className="text-success text-5xl mb-4">✓ PROTOCOL COMPLETE</p>
              <p className="text-cyber-accent text-2xl mb-6">The Key Has Been Found</p>
            </div>
            
            <div className="text-cyber-text space-y-6 max-w-3xl mx-auto">
              <p className="text-success font-bold text-center text-4xl glow-text">
                {correctAnswer}
              </p>
              <br />
              <div className="space-y-4 text-center">
                <p className="text-cyber-glow text-xl italic">
                  "It was never about one person, one idea, or one moment."
                </p>
                <p className="text-lg">
                  "It was about <span className="text-cyber-glow">Duneworks</span> — the studio, the dream, the legacy."
                </p>
                <p>
                  "Born from friendship in AuraDynamics, tested through trials in 2025,
                  protected by Protocol ArcTalon, and reborn in the Revival Era."
                </p>
                <p className="text-cyber-glow italic">
                  "Duneworks is the sum of all its memories, all its people, all its dreams."
                </p>
              </div>
              <br />
              <div className="bg-cyber-background p-6 rounded border border-cyber-glow">
                <p className="text-info text-sm text-center mb-2">
                  [LORE ARCHIVE UNLOCKED]
                </p>
                <p className="text-cyber-text text-sm text-center">
                  Return to the main terminal and type "lore" to access the complete Duneworks legacy archives.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={onBack}
                className="px-8 py-3 neon-border rounded hover:bg-cyber-accent hover:bg-opacity-20 transition-colors text-lg"
              >
                RETURN TO TERMINAL
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

