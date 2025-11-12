"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface PuzzleProps {
  onSolve: () => void;
  onBack: () => void;
}

export default function Puzzle4({ onSolve, onBack }: PuzzleProps) {
  const [corruptedBlocks, setCorruptedBlocks] = useState([
    { id: 1, text: "2@25", repaired: false, correct: "2025" },
    { id: 2, text: "Sp!nd##l", repaired: false, correct: "SPINDEEL" },
    { id: 3, text: "m!st@k#", repaired: false, correct: "MISTAKE" },
    { id: 4, text: "R#v!v@l", repaired: false, correct: "REVIVAL" },
  ]);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [solved, setSolved] = useState(false);
  const [hint, setHint] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempts(attempts + 1);

    const currentBlockData = corruptedBlocks[currentBlock];
    if (input.toUpperCase() === currentBlockData.correct) {
      const newBlocks = [...corruptedBlocks];
      newBlocks[currentBlock].repaired = true;
      setCorruptedBlocks(newBlocks);
      setInput("");

      // Move to next block or finish
      if (currentBlock < corruptedBlocks.length - 1) {
        setCurrentBlock(currentBlock + 1);
      } else {
        setSolved(true);
        onSolve();
      }
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
                PUZZLE #4: INCIDENT LOG - OWNERSHIP TRANSFER
              </h1>
              <p className="text-cyber-text text-sm">
                Difficulty: MEDIUM | Type: Data Restoration
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
                  [DATA CORRUPTION DETECTED]
                </p>
                <p className="text-cyber-text">
                  Critical incident log has been corrupted. Repair each data block to restore the file.
                </p>
                <br />
                <p className="text-info">
                  Progress: {corruptedBlocks.filter((b) => b.repaired).length}/
                  {corruptedBlocks.length} blocks repaired
                </p>
              </div>
            </div>

            {/* Corrupted blocks display */}
            <div className="terminal-window p-6 mb-6">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {corruptedBlocks.map((block, index) => (
                  <div
                    key={block.id}
                    className={`p-4 rounded border-2 text-center ${
                      block.repaired
                        ? "border-success bg-green-500 bg-opacity-10"
                        : index === currentBlock
                        ? "border-cyber-accent bg-cyber-accent bg-opacity-10 animate-pulse"
                        : "border-cyber-panel opacity-50"
                    }`}
                  >
                    <div className="text-xs text-cyber-text mb-2">Block {index + 1}</div>
                    <div
                      className={`font-bold ${
                        block.repaired ? "text-success" : "text-error glitch"
                      }`}
                    >
                      {block.repaired ? block.correct : block.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <p className="text-cyber-accent mb-2">Currently repairing:</p>
                <p className="text-error text-2xl glitch mb-4">
                  {corruptedBlocks[currentBlock].text}
                </p>
                <p className="text-cyber-text text-sm opacity-70">
                  Remove corruption characters and restore the original text
                </p>
              </div>
            </div>

            {/* Input form */}
            <div className="terminal-window p-6 mb-6">
              <form onSubmit={handleSubmit}>
                <label className="block text-cyber-accent mb-2 text-sm">
                  Enter repaired text for Block {currentBlock + 1}:
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-cyber-background border border-cyber-accent rounded px-4 py-2 text-cyber-text focus:outline-none focus:border-cyber-glow"
                    placeholder="Enter the corrected text..."
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-cyber-accent text-cyber-background rounded hover:bg-cyber-glow transition-colors"
                  >
                    REPAIR
                  </button>
                </div>
              </form>
              
              {attempts > 0 && input && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-warning text-sm mt-4"
                >
                  Tip: Remove special characters like @, !, #, and restore the original letters
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
                  → Hint 1: Replace corruption symbols (@, !, #) with the letters they represent or remove them.
                </motion.div>
              )}
              
              {hint >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-warning text-sm"
                >
                  → Hint 2: Block {currentBlock + 1} should be: {corruptedBlocks[currentBlock].correct}
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
              <p className="text-success text-4xl mb-4">✓ FILE RESTORED</p>
              <p className="text-cyber-accent text-xl mb-6">Data Integrity Verified</p>
            </div>
            
            <div className="text-cyber-text space-y-4 max-w-2xl mx-auto">
              <p className="text-success font-bold">
                [INCIDENT LOG - OWNERSHIP TRANSFER]
              </p>
              <br />
              <p>
                "In <span className="text-cyber-glow">2025</span>, I retired from Duneworks and gave ownership to <span className="text-cyber-glow">Spindeel</span> — a <span className="text-cyber-glow">mistake</span>."
              </p>
              <p>
                "ArcTalon's AI protocols secured the servers, preserving the legacy."
              </p>
              <p>
                "I later returned to start the <span className="text-cyber-glow">Revival</span> Era."
              </p>
              <br />
              <p className="text-info text-sm italic">
                Sometimes we must fall to learn how to rise again. The system remembered, even when humans forgot.
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

