"use client";

import { useState, useEffect } from "react";
import BootSequence from "@/components/BootSequence";
import Terminal from "@/components/Terminal";

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <main className="min-h-screen relative z-10">
      {!bootComplete ? (
        <BootSequence onComplete={() => setBootComplete(true)} />
      ) : (
        <Terminal />
      )}
    </main>
  );
}

