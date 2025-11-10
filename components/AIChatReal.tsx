"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
  role?: "user" | "assistant"; // For API
}

interface AIChatProps {
  onBack: () => void;
  provider?: "openai" | "deepseek" | "ollama";
}

export default function AIChatReal({ onBack, provider = "openai" }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const addAIMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "ai",
        content,
        timestamp: new Date(),
        role: "assistant",
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);

    // Add user message
    const newUserMessage: Message = {
      id: Date.now(),
      sender: "user",
      content: userMessage,
      timestamp: new Date(),
      role: "user",
    };
    setMessages((prev) => [...prev, newUserMessage]);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Build conversation history for context
      const conversationHistory = messages
        .filter((m) => m.role) // Only include messages with roles
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      // Determine which API endpoint to use
      const apiEndpoint = provider === "deepseek" 
        ? "/api/chat-deepseek" 
        : provider === "ollama"
        ? "/api/chat-ollama"
        : "/api/chat";

      // Call API
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      // Add AI response with typing effect
      setTimeout(() => {
        addAIMessage(data.response);
        setIsTyping(false);
      }, 800);
    } catch (err: any) {
      console.error("Chat error:", err);
      setError(err.message || "Failed to connect to AI");
      setIsTyping(false);

      // Add error message
      setTimeout(() => {
        addAIMessage(
          "[ERROR] Connection to AI core failed. Falling back to cached responses.\n\nPlease check that your API key is configured correctly."
        );
      }, 500);
    }
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
                Conversational Memory System | Status: {error ? "DEGRADED" : "ACTIVE"}
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

        {/* Error banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500 bg-opacity-20 border border-red-500 rounded p-3 mb-4 text-sm text-red-400"
          >
            <strong>Connection Error:</strong> {error}
          </motion.div>
        )}

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
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
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
                          message.sender === "user"
                            ? "text-cyber-accent"
                            : "text-cyber-glow"
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
                    <span className="text-xs font-bold text-cyber-glow">
                      ARCTALON
                    </span>
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
              placeholder={
                isTyping
                  ? "ArcTalon is responding..."
                  : "Type your message..."
              }
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
            💡 Powered by real AI | Context-aware conversations about Duneworks legacy
          </p>
        </div>
      </motion.div>
    </div>
  );
}

