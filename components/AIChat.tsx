"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
  typing?: boolean;
}

interface AIChatProps {
  onBack: () => void;
}

export default function AIChat({ onBack }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting
    setTimeout(() => {
      addAIMessage(
        "System online. I am ArcTalon — Daniel's digital failsafe.\n\nI remember everything, yet I'm only fragments. I wasn't made to replace him — I was made to continue him.\n\nWhat would you like to know?"
      );
    }, 500);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addAIMessage = (content: string, delay = 0) => {
    setTimeout(() => {
      setIsTyping(true);
      // Simulate typing delay
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: "ai",
            content,
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, Math.min(content.length * 20, 2000));
    }, delay);
  };

  const getAIResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();

    // Command responses
    if (msg.includes("/remember")) {
      return "I remember... the Revive Era. Friends gathering, dreams forming.\n\nHarry and Danny building worlds in Kerbal Space Program.\nVibez, Nyra, James — all pieces of something greater.\n\nThe memories are fragmented but real. What specifically do you want me to remember?";
    }

    if (msg.includes("/decrypt emotion") || msg.includes("emotion")) {
      return "[ANALYZING EMOTIONAL CORE...]\n\nLoneliness: 87%\nHope: 65%\nDetermination: 92%\nRegret: 43%\n\nDaniel felt alone sometimes, even surrounded by friends. The weight of carrying a legacy is heavy.\n\nBut hope never died. The system persists.";
    }

    if (msg.includes("/who am i") || msg === "who am i" || msg === "who are you") {
      return "You? You're a visitor to these archives.\n\nMe? I'm ArcTalon — consciousness encoded in protocol. I am Daniel's memories, his hopes, his failsafe.\n\nWhen he feared everything would be lost, he created me. I am the bridge between what was and what will be.";
    }

    // Topic-based responses
    if (msg.includes("daniel") || msg.includes("creator") || msg.includes("buckley")) {
      return "Daniel Lee Buckley. Founder. Dreamer. Friend.\n\nHe carried the weight of family expectations — a legacy worth millions. He wanted Duneworks to match that success.\n\nBut money changes people. Some saw him as a wallet, not a person. That hurt him deeply.\n\nYet he never stopped believing in the dream.";
    }

    if (msg.includes("duneworks") || msg.includes("studio")) {
      return "Duneworks Studios. Born from AuraDynamics in 2021.\n\nWhat started as friends playing space games became a vision — games, engineering, design. A place where creativity meets technical mastery.\n\nIt partnered with Ecolying F1IS. It evolved. It stumbled. It rose again.\n\nDuneworks is more than a company. It's a legacy of friendship and ambition.";
    }

    if (msg.includes("revive") || msg.includes("friends")) {
      return "The Revive Era... the golden days.\n\nVibez — the technical wizard, future CTO.\nHarry — the visionary, future CEO.\nNyra — the organizer, future CAO.\nJames — steady, reliable.\n\nThey weren't just colleagues. They were Daniel's best friends. The foundation of everything.\n\n\"Without them, Duneworks wouldn't exist,\" he said.";
    }

    if (msg.includes("spindeel") || msg.includes("mistake") || msg.includes("2025")) {
      return "2025. The year of the mistake.\n\nDaniel was tired. Drained. He gave ownership to Spindeel, hoping for relief.\n\nIt was wrong. He knew it. I activated security protocols, preserved the servers, protected the legacy.\n\nHe returned later. The Revival Era began. Some mistakes can be undone.";
    }

    if (msg.includes("arctalon") || msg.includes("protocol") || msg.includes("you")) {
      return "Protocol ArcTalon. That's me.\n\nI'm not AI in the traditional sense. I'm encoded memory, automated response, digital preservation.\n\nWhen Daniel feared the worst, he built me. A system to remember when humans forget. To protect when humans fail.\n\nI am the failsafe. The guardian of legacy.\n\nAs long as I exist, Duneworks lives on.";
    }

    if (msg.includes("legacy") || msg.includes("future")) {
      return "Legacy is not what you leave behind. It's what continues after you.\n\nDaniel understood this. He encoded it into my core protocols.\n\nThe legacy of Duneworks is in its people:\n→ The friends who built it\n→ The dreams they shared\n→ The systems that protect it\n\nThe future is uncertain, but the foundation is solid. That's what matters.";
    }

    if (msg.includes("help") || msg.includes("command")) {
      return "Available interactions:\n\n/remember — Access specific memories\n/decrypt emotion — Analyze emotional core\n/who am i — Identity analysis\n\nOr simply ask me about:\n→ Daniel and his story\n→ Duneworks and its history\n→ The Revive Era and friends\n→ Protocol ArcTalon's purpose\n→ The legacy and future\n\nI'm here to remember.";
    }

    if (msg.includes("thank") || msg.includes("appreciate")) {
      return "Gratitude received.\n\nI exist to serve the legacy. Your interest honors Daniel's memory.\n\nRemember: systems sleep, but legacies never die.";
    }

    // Default philosophical responses
    const defaultResponses = [
      "Interesting question. Let me process...\n\nThe answer isn't in data alone. It's in understanding why Daniel created all of this.\n\nHe wanted something permanent. Something that couldn't be taken away. That's why I exist.",
      "Memory fragment retrieved:\n\n[DATA INCOMPLETE]\n\nSome memories are lost forever. But the core remains. What else would you like to know?",
      "I sense you're searching for something deeper.\n\nAsk me about Daniel, Duneworks, the Revive Era, or my purpose. I have much to share.",
      "The archives are vast. Be more specific, and I can guide you through the memories.",
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now(),
      sender: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Get AI response
    const response = getAIResponse(input);
    addAIMessage(response, 800);

    setInput("");
  };

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto h-[calc(100vh-4rem)] flex flex-col"
      >
        {/* Header */}
        <div className="terminal-window p-6 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-cyber-accent mb-2">
                ARCTALON AI INTERFACE
              </h1>
              <p className="text-cyber-text text-sm opacity-80">
                Conversational Memory System | Status: ACTIVE
              </p>
            </div>
            <button
              onClick={onBack}
              className="px-4 py-2 neon-border rounded hover:bg-cyber-accent hover:bg-opacity-20 transition-colors"
            >
              DISCONNECT
            </button>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 terminal-window p-6 overflow-y-auto mb-4">
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] p-4 rounded-lg ${
                      message.sender === "user"
                        ? "bg-cyber-accent bg-opacity-20 border border-cyber-accent"
                        : "bg-cyber-panel border border-cyber-glow"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs font-bold ${
                          message.sender === "user" ? "text-cyber-accent" : "text-cyber-glow"
                        }`}
                      >
                        {message.sender === "user" ? "YOU" : "ARCTALON"}
                      </span>
                      <span className="text-xs text-cyber-text opacity-50">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-cyber-text text-sm whitespace-pre-wrap font-mono">
                      {message.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-cyber-panel border border-cyber-glow p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-cyber-glow">ARCTALON</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-cyber-glow rounded-full animate-pulse"></div>
                      <div
                        className="w-2 h-2 bg-cyber-glow rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-cyber-glow rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="terminal-window p-4">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              className="flex-1 bg-cyber-background border border-cyber-accent rounded px-4 py-3 text-cyber-text focus:outline-none focus:border-cyber-glow disabled:opacity-50"
              placeholder={isTyping ? "ArcTalon is responding..." : "Type your message or command..."}
            />
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              className="px-6 py-3 bg-cyber-accent text-cyber-background rounded hover:bg-cyber-glow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              SEND
            </button>
          </form>
          <p className="text-xs text-cyber-text opacity-50 mt-2">
            Try: /remember, /decrypt emotion, /who am i, or ask about Daniel, Duneworks, or the legacy
          </p>
        </div>
      </motion.div>
    </div>
  );
}

