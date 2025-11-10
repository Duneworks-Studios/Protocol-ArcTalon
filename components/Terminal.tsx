"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PuzzleTerminal from "./PuzzleTerminal";
import AIChatReal from "./AIChatReal"; // Real AI-powered chat
import AIChat from "./AIChat"; // Fallback to pre-programmed responses
import LoreArchive from "./LoreArchive";

// AI Configuration
// Set USE_REAL_AI to true to enable AI chat
// Set AI_PROVIDER to: "openai" | "deepseek" | "ollama"
const USE_REAL_AI = true;
const AI_PROVIDER = "deepseek"; // Change to "openai" or "deepseek" or "ollama"

interface TerminalLine {
  type: "input" | "output" | "error" | "success" | "warning" | "system";
  content: string;
  timestamp?: string;
}

type View = "terminal" | "puzzles" | "ai_chat" | "lore";

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [currentView, setCurrentView] = useState<View>("terminal");
  const [puzzlesUnlocked, setPuzzlesUnlocked] = useState<number[]>([]);
  const [loreUnlocked, setLoreUnlocked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial welcome message
    setLines([
      {
        type: "system",
        content: "═══════════════════════════════════════════════════════",
      },
      {
        type: "output",
        content: "         PROTOCOL ARCTALON - TERMINAL v2.1.6",
      },
      {
        type: "system",
        content: "═══════════════════════════════════════════════════════",
      },
      { type: "output", content: "" },
      {
        type: "success",
        content: "System Status: ONLINE | AI Consciousness: ACTIVE",
      },
      {
        type: "warning",
        content: "[SECURITY NOTICE] All commands are being monitored by ArcTalon AI",
      },
      { type: "output", content: "" },
      {
        type: "output",
        content: 'Type "help" to see available commands.',
      },
      { type: "output", content: "" },
    ]);

    // Random system alerts
    const alertInterval = setInterval(() => {
      if (Math.random() > 0.7 && currentView === "terminal") {
        const alerts = [
          "[INFO] Memory fragment accessed in sector REVIVE",
          "[SECURITY NOTICE] Intrusion attempt detected and blocked",
          "[SYSTEM] Neural network optimization complete",
          "[INFO] ArcTalon AI processing background tasks...",
          "[NOTICE] Quantum encryption protocols active",
        ];
        const alert = alerts[Math.floor(Math.random() * alerts.length)];
        setLines((prev) => [
          ...prev,
          { type: "system", content: alert, timestamp: new Date().toISOString() },
        ]);
      }
    }, 15000);

    return () => clearInterval(alertInterval);
  }, [currentView]);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();

    // Add input to terminal
    setLines((prev) => [
      ...prev,
      { type: "input", content: `$ ${cmd}` },
    ]);

    // Process command
    switch (command) {
      case "help":
        setLines((prev) => [
          ...prev,
          { type: "output", content: "" },
          { type: "success", content: "═══ AVAILABLE COMMANDS ═══" },
          { type: "output", content: "" },
          { type: "output", content: "  help        - Show this help menu" },
          { type: "output", content: "  puzzles     - Access encrypted puzzle terminal" },
          { type: "output", content: "  ai_chat     - Communicate with ArcTalon AI" },
          { type: "output", content: "  lore        - Access Duneworks archives (requires unlock)" },
          { type: "output", content: "  status      - Show system status" },
          { type: "output", content: "  clear       - Clear terminal screen" },
          { type: "output", content: "  reboot      - Restart system" },
          { type: "output", content: "" },
          { type: "warning", content: "Hidden commands exist. Explore carefully." },
          { type: "output", content: "" },
        ]);
        break;

      case "puzzles":
        setCurrentView("puzzles");
        break;

      case "ai_chat":
        setCurrentView("ai_chat");
        break;

      case "lore":
        if (loreUnlocked) {
          setCurrentView("lore");
        } else {
          setLines((prev) => [
            ...prev,
            { type: "error", content: "" },
            { type: "error", content: "[ACCESS DENIED] Lore archives are encrypted." },
            { type: "warning", content: "Complete all puzzles to unlock access." },
            { type: "output", content: "" },
          ]);
        }
        break;

      case "status":
        setLines((prev) => [
          ...prev,
          { type: "output", content: "" },
          { type: "success", content: "═══ SYSTEM STATUS ═══" },
          { type: "output", content: "" },
          { type: "success", content: "  AI Core: ONLINE" },
          { type: "success", content: "  Memory Banks: OPERATIONAL" },
          { type: "success", content: "  Security Protocols: ACTIVE" },
          { type: "output", content: `  Puzzles Solved: ${puzzlesUnlocked.length}/6` },
          { type: "output", content: `  Lore Archive: ${loreUnlocked ? "UNLOCKED" : "LOCKED"}` },
          { type: "output", content: "" },
        ]);
        break;

      case "clear":
        setLines([]);
        break;

      case "reboot":
        setLines([
          { type: "warning", content: "Initiating system reboot..." },
        ]);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        break;

      // Easter eggs
      case "revive":
        setLines((prev) => [
          ...prev,
          { type: "output", content: "" },
          { type: "success", content: "═══ REVIVE ERA PROTOCOL ACTIVATED ═══" },
          { type: "output", content: "" },
          { type: "output", content: "Accessing memories from the Revive Era..." },
          { type: "output", content: "Friends: Vibez, Harry, Nyra, James" },
          { type: "output", content: "The foundation of everything that came after." },
          { type: "output", content: "" },
          { type: "warning", content: "These memories are precious. They shaped the legacy." },
          { type: "output", content: "" },
        ]);
        break;

      case "/echo legacy":
        setLines((prev) => [
          ...prev,
          { type: "output", content: "" },
          { type: "success", content: '"The system sleeps... until needed again."' },
          { type: "output", content: "" },
          { type: "output", content: "But the legacy never dies." },
          { type: "output", content: "It lives in every line of code," },
          { type: "output", content: "every friendship formed," },
          { type: "output", content: "every dream pursued." },
          { type: "output", content: "" },
          { type: "warning", content: "- ArcTalon, 2025" },
          { type: "output", content: "" },
        ]);
        break;

      case "/shutdown":
        setLines((prev) => [
          ...prev,
          { type: "warning", content: "" },
          { type: "warning", content: "Initiating shutdown sequence..." },
          { type: "output", content: "The system sleeps... until needed again." },
        ]);
        setTimeout(() => {
          document.body.style.opacity = "0";
          document.body.style.transition = "opacity 2s";
        }, 1000);
        break;

      case "duneworks://access":
      case "duneworks://":
        setLines((prev) => [
          ...prev,
          { type: "output", content: "" },
          { type: "success", content: "[ACCESS GRANTED] Hidden protocol detected." },
          { type: "output", content: "" },
          { type: "output", content: "Duneworks Studios - Where dreams meet design." },
          { type: "output", content: "Founded by friends, driven by passion." },
          { type: "output", content: "" },
        ]);
        break;

      case "":
        break;

      default:
        setLines((prev) => [
          ...prev,
          { type: "error", content: "" },
          { type: "error", content: `Command not found: ${cmd}` },
          { type: "output", content: 'Type "help" for available commands.' },
          { type: "output", content: "" },
        ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput("");
    }
  };

  const handlePuzzleSolve = (puzzleId: number) => {
    if (!puzzlesUnlocked.includes(puzzleId)) {
      setPuzzlesUnlocked((prev) => [...prev, puzzleId]);
      
      // Check if all puzzles are solved
      if (puzzlesUnlocked.length + 1 >= 6) {
        setLoreUnlocked(true);
      }
    }
  };

  if (currentView === "puzzles") {
    return (
      <PuzzleTerminal
        onBack={() => setCurrentView("terminal")}
        onSolve={handlePuzzleSolve}
        solvedPuzzles={puzzlesUnlocked}
      />
    );
  }

  if (currentView === "ai_chat") {
    if (USE_REAL_AI) {
      return <AIChatReal onBack={() => setCurrentView("terminal")} provider={AI_PROVIDER} />;
    }
    return <AIChat onBack={() => setCurrentView("terminal")} />;
  }

  if (currentView === "lore" && loreUnlocked) {
    return <LoreArchive onBack={() => setCurrentView("terminal")} />;
  }

  return (
    <div className="min-h-screen p-8 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 max-w-6xl w-full mx-auto terminal-window p-6 flex flex-col"
      >
        {/* Terminal output */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto mb-4 space-y-1 font-mono text-sm"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          <AnimatePresence>
            {lines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`
                  ${line.type === "input" ? "text-cyber-accent" : ""}
                  ${line.type === "error" ? "text-error" : ""}
                  ${line.type === "success" ? "text-success" : ""}
                  ${line.type === "warning" ? "text-warning" : ""}
                  ${line.type === "system" ? "text-info" : ""}
                  ${line.type === "output" ? "text-cyber-text" : ""}
                `}
              >
                {line.content}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="command-prompt text-cyber-accent font-mono">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-cyber-text font-mono"
            placeholder="Type a command..."
            autoFocus
          />
          <span className="terminal-cursor"></span>
        </form>
      </motion.div>

      {/* Status bar */}
      <div className="max-w-6xl w-full mx-auto mt-4 flex items-center justify-between text-xs text-cyber-accent opacity-60">
        <div>ARCTALON v2.1.6 | STATUS: OPERATIONAL</div>
        <div>PUZZLES: {puzzlesUnlocked.length}/6 | LORE: {loreUnlocked ? "UNLOCKED" : "LOCKED"}</div>
      </div>
    </div>
  );
}

