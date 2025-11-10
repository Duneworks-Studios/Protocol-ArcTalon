"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface PuzzleProps {
  onSolve: () => void;
  onBack: () => void;
}

export default function Puzzle3({ onSolve, onBack }: PuzzleProps) {
  const [fragments, setFragments] = useState([
    { id: 1, text: "Daniel Lee Buckley", position: null, correct: 0 },
    { id: 2, text: "60-100M USD annually", position: null, correct: 1 },
    { id: 3, text: "mirror that success", position: null, correct: 2 },
    { id: 4, text: "only saw me as a wallet", position: null, correct: 3 },
  ]);
  const [slots, setSlots] = useState<(number | null)[]>([null, null, null, null]);
  const [solved, setSolved] = useState(false);
  const [hint, setHint] = useState(0);

  const handleDrop = (fragmentId: number, slotIndex: number) => {
    // Remove fragment from previous slot if exists
    const newSlots = slots.map((slot) => (slot === fragmentId ? null : slot));
    
    // Place fragment in new slot
    newSlots[slotIndex] = fragmentId;
    setSlots(newSlots);

    // Check if all slots are filled correctly
    const allCorrect = newSlots.every((slot, index) => {
      if (slot === null) return false;
      const fragment = fragments.find((f) => f.id === slot);
      return fragment && fragment.correct === index;
    });

    if (allCorrect) {
      setSolved(true);
      onSolve();
    }
  };

  const showHint = () => {
    setHint(hint + 1);
  };

  const slotLabels = [
    "My name is ___________.",
    "My father and uncle's company — worth ___________.",
    "I wanted Duneworks to ___________.",
    "But people ___________, like they only saw me as that.",
  ];

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
                PUZZLE #3: MEMORY NODE - D.LEE.BUCKLEY
              </h1>
              <p className="text-cyber-text text-sm">
                Difficulty: MEDIUM | Type: Fragment Reconstruction
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
                  [MEMORY FRAGMENTATION DETECTED]
                </p>
                <p className="text-cyber-text">
                  Personal memory logs have been corrupted. Reconstruct the fragments to restore the memory.
                </p>
                <br />
                <p className="text-info">
                  Drag and drop the fragments into the correct slots to complete the memory:
                </p>
              </div>
            </div>

            {/* Drop slots */}
            <div className="terminal-window p-6 mb-6">
              <div className="space-y-4">
                {slotLabels.map((label, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-1 text-cyber-text text-sm">
                      {label}
                    </div>
                    <div
                      className={`w-64 h-14 border-2 border-dashed rounded flex items-center justify-center cursor-pointer transition-all ${
                        slots[index] !== null
                          ? "border-cyber-accent bg-cyber-accent bg-opacity-10"
                          : "border-cyber-panel hover:border-cyber-accent"
                      }`}
                    >
                      {slots[index] !== null ? (
                        <div className="text-cyber-glow text-sm px-2">
                          {fragments.find((f) => f.id === slots[index])?.text}
                        </div>
                      ) : (
                        <div className="text-cyber-panel text-xs">Drop here</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fragments */}
            <div className="terminal-window p-6 mb-6">
              <p className="text-cyber-accent text-sm mb-4">Available Fragments:</p>
              <div className="grid grid-cols-2 gap-4">
                {fragments
                  .filter((f) => !slots.includes(f.id))
                  .map((fragment) => (
                    <div key={fragment.id} className="space-y-2">
                      {slotLabels.map((_, slotIndex) => (
                        <button
                          key={`${fragment.id}-${slotIndex}`}
                          onClick={() => handleDrop(fragment.id, slotIndex)}
                          className="w-full p-3 neon-border rounded hover:bg-cyber-accent hover:bg-opacity-20 transition-colors text-left text-cyber-text text-sm"
                        >
                          {fragment.text} → Slot {slotIndex + 1}
                        </button>
                      ))}
                    </div>
                  ))}
              </div>
            </div>

            {/* Hints */}
            <div className="terminal-window p-6">
              <button
                onClick={showHint}
                className="text-warning hover:text-cyber-glow transition-colors mb-4"
              >
                [HINT SYSTEM] Click for hint ({hint}/1)
              </button>
              
              {hint >= 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-cyber-text text-sm"
                >
                  → Hint: Read the memory chronologically - name, background, motivation, and finally the pain point.
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
              <p className="text-success text-4xl mb-4">✓ MEMORY RESTORED</p>
              <p className="text-cyber-accent text-xl mb-6">Fragment Reconstruction Complete</p>
            </div>
            
            <div className="text-cyber-text space-y-4 max-w-2xl mx-auto">
              <p className="text-success font-bold">
                [PERSONAL LOG - D.LEE.BUCKLEY]
              </p>
              <br />
              <p>
                "My name is <span className="text-cyber-glow">Daniel Lee Buckley</span>."
              </p>
              <p>
                "My motivation to keep Duneworks alive came from my father and uncle's company — worth <span className="text-cyber-glow">60–100M USD annually</span>."
              </p>
              <p>
                "I wanted Duneworks to <span className="text-cyber-glow">mirror that success</span>."
              </p>
              <p>
                "But when people asked me for money constantly, I felt used, like they <span className="text-cyber-glow">only saw me as a wallet</span>."
              </p>
              <br />
              <p className="text-info text-sm italic">
                The weight of expectations, the burden of legacy — all recorded in fragmented memories.
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

