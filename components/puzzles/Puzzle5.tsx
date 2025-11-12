"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CryptoJS from "crypto-js";

interface PuzzleProps {
  onSolve: () => void;
  onBack: () => void;
}

export default function Puzzle5({ onSolve, onBack }: PuzzleProps) {
  const [currentLayer, setCurrentLayer] = useState(1);
  const [inputs, setInputs] = useState(["", "", ""]);
  const [attempts, setAttempts] = useState(0);
  const [solved, setSolved] = useState(false);
  const [hint, setHint] = useState(0);

  // Layered encryption (decoding order):
  // Layer 3 (Base64): "RUZBU0xJQUY=" → decodes to "EFASLIAF" (ASCII)
  // Layer 2 (Hex): "EFASLIAF" → convert to hex → "454641534C494146"
  // Layer 1 (Reversed): "EFASLIAF" → reverse → "FAILSAFE"
  
  const encrypted = "RUZBU0xJQUY=";
  const layer3Answer = "EFASLIAF"; // Base64 decodes to ASCII text
  const layer2Answer = "454641534C494146"; // hex representation of "EFASLIAF"
  const layer1Answer = "FAILSAFE"; // reversed "EFASLIAF"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempts(attempts + 1);

    const currentInput = inputs[currentLayer - 1].toUpperCase().trim();
    let correct = false;

    if (currentLayer === 1 && currentInput === layer3Answer) {
      correct = true;
    } else if (currentLayer === 2 && currentInput === layer2Answer) {
      correct = true;
    } else if (currentLayer === 3 && currentInput === layer1Answer) {
      correct = true;
    }

    if (correct) {
      if (currentLayer < 3) {
        // Clear input for next layer and reset attempts
        const newInputs = [...inputs];
        newInputs[currentLayer] = "";
        setInputs(newInputs);
        setAttempts(0);
        setCurrentLayer(currentLayer + 1);
      } else {
        setSolved(true);
        onSolve();
      }
    }
  };

  const showHint = () => {
    setHint(hint + 1);
  };

  const updateInput = (value: string) => {
    const newInputs = [...inputs];
    newInputs[currentLayer - 1] = value;
    setInputs(newInputs);
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
                PUZZLE #5: CIPHER LOCK - ARCTALON CORE
              </h1>
              <p className="text-cyber-text text-sm">
                Difficulty: HARD | Type: Layered Encryption
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
                  [MAXIMUM SECURITY ENCRYPTION]
                </p>
                <p className="text-cyber-text">
                  ArcTalon's core is protected by three layers of encryption.
                  Decrypt each layer sequentially to access the failsafe message.
                </p>
                <br />
                <p className="text-info">
                  Layer Progress: {currentLayer - 1}/3 layers decrypted
                </p>
              </div>
            </div>

            {/* Encryption layers visualization */}
            <div className="terminal-window p-6 mb-6">
              <div className="space-y-4">
                {/* Layer 3 (Base64) */}
                <div
                  className={`p-4 rounded border-2 ${
                    currentLayer === 1
                      ? "border-cyber-accent bg-cyber-accent bg-opacity-10"
                      : currentLayer > 1
                      ? "border-success bg-green-500 bg-opacity-10"
                      : "border-cyber-panel opacity-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-cyber-accent font-bold">LAYER 3 - Base64</span>
                    {currentLayer > 1 && <span className="text-success">✓ DECRYPTED</span>}
                  </div>
                  <div className="bg-cyber-background p-3 rounded font-mono text-center">
                    {currentLayer > 1 ? (
                      <span className="text-success">{layer3Answer}</span>
                    ) : (
                      <span className={currentLayer === 1 ? "text-cyber-glow" : "text-cyber-text"}>
                        {encrypted}
                      </span>
                    )}
                  </div>
                </div>

                {/* Layer 2 (Hex) */}
                <div
                  className={`p-4 rounded border-2 ${
                    currentLayer === 2
                      ? "border-cyber-accent bg-cyber-accent bg-opacity-10"
                      : currentLayer > 2
                      ? "border-success bg-green-500 bg-opacity-10"
                      : "border-cyber-panel opacity-30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-cyber-accent font-bold">LAYER 2 - Hexadecimal</span>
                    {currentLayer > 2 && <span className="text-success">✓ DECRYPTED</span>}
                  </div>
                  <div className="bg-cyber-background p-3 rounded font-mono text-center">
                    {currentLayer > 2 ? (
                      <span className="text-success">{layer2Answer}</span>
                    ) : currentLayer >= 2 ? (
                      <span className={currentLayer === 2 ? "text-cyber-glow" : "text-cyber-text"}>
                        {layer2Answer}
                      </span>
                    ) : (
                      <span className="text-cyber-panel">LOCKED</span>
                    )}
                  </div>
                </div>

                {/* Layer 1 (Reversed) */}
                <div
                  className={`p-4 rounded border-2 ${
                    currentLayer === 3
                      ? "border-cyber-accent bg-cyber-accent bg-opacity-10"
                      : currentLayer > 3
                      ? "border-success bg-green-500 bg-opacity-10"
                      : "border-cyber-panel opacity-30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-cyber-accent font-bold">LAYER 1 - Reversed String</span>
                    {solved && <span className="text-success">✓ DECRYPTED</span>}
                  </div>
                  <div className="bg-cyber-background p-3 rounded font-mono text-center">
                    {solved ? (
                      <span className="text-success">{layer1Answer}</span>
                    ) : currentLayer >= 3 ? (
                      <span className={currentLayer === 3 ? "text-cyber-glow" : "text-cyber-text"}>
                        {layer3Answer}
                      </span>
                    ) : (
                      <span className="text-cyber-panel">LOCKED</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Input form */}
            <div className="terminal-window p-6 mb-6">
              <form onSubmit={handleSubmit}>
                <label className="block text-cyber-accent mb-2 text-sm">
                  Decrypt Layer {currentLayer === 1 ? "3 (Base64)" : currentLayer === 2 ? "2 (Hex)" : "1 (Reversed)"}:
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={inputs[currentLayer - 1]}
                    onChange={(e) => updateInput(e.target.value)}
                    className="flex-1 bg-cyber-background border border-cyber-accent rounded px-4 py-2 text-cyber-text focus:outline-none focus:border-cyber-glow font-mono"
                    placeholder={`Enter decrypted value for layer ${currentLayer === 1 ? 3 : currentLayer === 2 ? 2 : 1}...`}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-cyber-accent text-cyber-background rounded hover:bg-cyber-glow transition-colors"
                  >
                    DECRYPT
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

            {/* Hints */}
            <div className="terminal-window p-6">
              <button
                onClick={showHint}
                className="text-warning hover:text-cyber-glow transition-colors mb-4"
              >
                [HINT SYSTEM] Click for hint ({hint}/3)
              </button>
              
              {hint >= 1 && currentLayer === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-cyber-text text-sm mb-2"
                >
                  → Hint 1: Use a Base64 decoder to decrypt the first layer.
                </motion.div>
              )}
              
              {hint >= 2 && currentLayer === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-cyber-text text-sm mb-2"
                >
                  → Hint 2: Convert the ASCII text from the previous layer to hexadecimal representation.
                </motion.div>
              )}
              
              {hint >= 3 && currentLayer === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-warning text-sm"
                >
                  → Hint 3: Reverse the string from layer 1 to get the final message.
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
              <p className="text-success text-4xl mb-4">✓ CORE ACCESSED</p>
              <p className="text-cyber-accent text-xl mb-6">All Encryption Layers Broken</p>
            </div>
            
            <div className="text-cyber-text space-y-4 max-w-2xl mx-auto">
              <p className="text-success font-bold text-center text-2xl">
                [{layer1Answer}]
              </p>
              <br />
              <p className="text-cyber-glow text-lg italic">
                "ArcTalon isn't just a system — it's my failsafe."
              </p>
              <p>
                "If you're reading this, I'm gone."
              </p>
              <p>
                "But the legacy continues. Find the others. Restore Duneworks."
              </p>
              <br />
              <p className="text-info text-sm text-center">
                - Protocol ArcTalon, Core Directive
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

