"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Puzzle1 from "./puzzles/Puzzle1";
import Puzzle2 from "./puzzles/Puzzle2";
import Puzzle3 from "./puzzles/Puzzle3";
import Puzzle4 from "./puzzles/Puzzle4";
import Puzzle5 from "./puzzles/Puzzle5";
import Puzzle6 from "./puzzles/Puzzle6";

interface PuzzleTerminalProps {
  onBack: () => void;
  onSolve: (puzzleId: number) => void;
  solvedPuzzles: number[];
}

export default function PuzzleTerminal({
  onBack,
  onSolve,
  solvedPuzzles,
}: PuzzleTerminalProps) {
  const [selectedPuzzle, setSelectedPuzzle] = useState<number | null>(null);

  const puzzles = [
    {
      id: 1,
      title: "ORIGIN LOG: AURAGENESIS",
      difficulty: "EASY",
      description: "Decrypt the foundation logs",
      locked: false,
    },
    {
      id: 2,
      title: "TRANSMISSION: REVIVE ERA",
      difficulty: "EASY",
      description: "Decode the heartfelt message",
      locked: false,
    },
    {
      id: 3,
      title: "MEMORY NODE: D.LEE.BUCKLEY",
      difficulty: "MEDIUM",
      description: "Reconstruct fragmented memories",
      locked: solvedPuzzles.length < 2,
    },
    {
      id: 4,
      title: "INCIDENT LOG: OWNERSHIP TRANSFER",
      difficulty: "MEDIUM",
      description: "Restore corrupted data blocks",
      locked: solvedPuzzles.length < 3,
    },
    {
      id: 5,
      title: "CIPHER LOCK: ARCTALON CORE",
      difficulty: "HARD",
      description: "Break the layered encryption",
      locked: solvedPuzzles.length < 4,
    },
    {
      id: 6,
      title: "THE PROTOCOL KEY",
      difficulty: "EXPERT",
      description: "Combine all previous clues",
      locked: solvedPuzzles.length < 5,
    },
  ];

  const renderPuzzle = () => {
    switch (selectedPuzzle) {
      case 1:
        return <Puzzle1 onSolve={() => onSolve(1)} onBack={() => setSelectedPuzzle(null)} />;
      case 2:
        return <Puzzle2 onSolve={() => onSolve(2)} onBack={() => setSelectedPuzzle(null)} />;
      case 3:
        return <Puzzle3 onSolve={() => onSolve(3)} onBack={() => setSelectedPuzzle(null)} />;
      case 4:
        return <Puzzle4 onSolve={() => onSolve(4)} onBack={() => setSelectedPuzzle(null)} />;
      case 5:
        return <Puzzle5 onSolve={() => onSolve(5)} onBack={() => setSelectedPuzzle(null)} />;
      case 6:
        return <Puzzle6 onSolve={() => onSolve(6)} onBack={() => setSelectedPuzzle(null)} />;
      default:
        return null;
    }
  };

  if (selectedPuzzle) {
    return renderPuzzle();
  }

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="terminal-window p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold glow-text mb-2">
                ENCRYPTION TERMINAL
              </h1>
              <p className="text-cyber-text text-sm opacity-80">
                Solve puzzles to unlock fragments of the Duneworks legacy
              </p>
            </div>
            <button
              onClick={onBack}
              className="px-4 py-2 neon-border rounded hover:bg-cyber-accent hover:bg-opacity-20 transition-colors"
            >
              BACK
            </button>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="text-success">
              SOLVED: {solvedPuzzles.length}/6
            </div>
            <div className="text-cyber-accent">|</div>
            <div className="text-warning">
              LOCKED: {puzzles.filter((p) => p.locked).length}
            </div>
          </div>
        </div>

        {/* Puzzle grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {puzzles.map((puzzle) => {
            const isSolved = solvedPuzzles.includes(puzzle.id);
            const isLocked = puzzle.locked;

            return (
              <motion.div
                key={puzzle.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: puzzle.id * 0.1 }}
                className={`
                  terminal-window p-6 cursor-pointer transition-all
                  ${isLocked ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg hover:shadow-cyber-accent/30"}
                  ${isSolved ? "border-success" : ""}
                `}
                onClick={() => !isLocked && setSelectedPuzzle(puzzle.id)}
              >
                {/* Status badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`
                      text-xs px-3 py-1 rounded
                      ${puzzle.difficulty === "EASY" ? "bg-green-500/20 text-green-400" : ""}
                      ${puzzle.difficulty === "MEDIUM" ? "bg-yellow-500/20 text-yellow-400" : ""}
                      ${puzzle.difficulty === "HARD" ? "bg-orange-500/20 text-orange-400" : ""}
                      ${puzzle.difficulty === "EXPERT" ? "bg-red-500/20 text-red-400" : ""}
                    `}
                  >
                    {puzzle.difficulty}
                  </div>
                  <div>
                    {isSolved && (
                      <span className="text-success text-xl">✓</span>
                    )}
                    {isLocked && (
                      <span className="text-warning text-xl">🔒</span>
                    )}
                  </div>
                </div>

                {/* Puzzle info */}
                <h3 className="text-xl font-bold text-cyber-accent mb-2">
                  #{puzzle.id} {puzzle.title}
                </h3>
                <p className="text-cyber-text text-sm opacity-80">
                  {puzzle.description}
                </p>

                {isLocked && (
                  <p className="text-warning text-xs mt-4">
                    Solve previous puzzles to unlock
                  </p>
                )}

                {!isLocked && !isSolved && (
                  <p className="text-cyber-accent text-xs mt-4">
                    Click to attempt →
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Progress message */}
        {solvedPuzzles.length === 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 terminal-window p-6 border-success"
          >
            <div className="text-center">
              <p className="text-success text-2xl font-bold mb-2">
                ✓ ALL PUZZLES SOLVED
              </p>
              <p className="text-cyber-text">
                The Lore Archive has been unlocked. Return to the main terminal
                and type "lore" to access the complete Duneworks legacy.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

