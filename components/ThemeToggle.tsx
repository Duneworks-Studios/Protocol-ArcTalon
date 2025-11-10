"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dune" | "cyber">("dune");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("protocol-theme") as "dune" | "cyber";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dune" ? "cyber" : "dune";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("protocol-theme", newTheme);
  };

  if (!mounted) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1}}
      transition={{ delay: 2 }}
      onClick={toggleTheme}
      className="theme-toggle group"
      title={`Switch to ${theme === "dune" ? "Cyber" : "Dune"} mode`}
    >
      <div className="flex items-center gap-2 text-xs font-mono">
        <span className={`transition-opacity ${theme === "dune" ? "opacity-100" : "opacity-40"}`}>
          🏜️
        </span>
        <div className="hidden sm:block text-[10px] opacity-70">
          {theme === "dune" ? "DUNE" : "CYBER"}
        </div>
        <span className={`transition-opacity ${theme === "cyber" ? "opacity-100" : "opacity-40"}`}>
          💜
        </span>
      </div>
    </motion.button>
  );
}

