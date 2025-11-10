"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoreArchiveProps {
  onBack: () => void;
}

interface LoreEntry {
  id: number;
  title: string;
  date: string;
  category: string;
  content: string;
  classification: "PUBLIC" | "RESTRICTED" | "CLASSIFIED";
}

export default function LoreArchive({ onBack }: LoreArchiveProps) {
  const [selectedEntry, setSelectedEntry] = useState<LoreEntry | null>(null);
  const [filter, setFilter] = useState<string>("ALL");

  const loreEntries: LoreEntry[] = [
    {
      id: 1,
      title: "Foundation Log: The Beginning",
      date: "2021.03.15",
      category: "ORIGIN",
      classification: "PUBLIC",
      content: `DUNEWORKS STUDIOS - FOUNDATION RECORD

Original Name: AuraDynamics
Founded: March 2021
Founders: Harry (MrNiceDoge) and Daniel Lee Buckley

ORIGIN STORY:
It started with Kerbal Space Program. Two friends building rockets, crashing them, laughing, learning. Those shared moments sparked an idea: "What if we built something real together?"

AuraDynamics was born. Not just a studio, but a vision — combining gaming, engineering, and design into something unique.

EARLY PARTNERSHIP:
The studio partnered with Ecolying F1IS, a Formula Racing team. Engineering simulation met competitive racing. It was ambitious, exciting, and sometimes chaotic.

EVOLUTION TO DUNEWORKS:
By late 2021, the vision expanded. The name changed to Duneworks Studios to better reflect the broader mission: games and engineering design united.

"We weren't just building games. We were building worlds, systems, experiences." - Daniel

[END OF LOG]`,
    },
    {
      id: 2,
      title: "The Revive Era: Golden Days",
      date: "2021.06 - 2024.12",
      category: "HISTORY",
      classification: "PUBLIC",
      content: `THE REVIVE ERA - DUNEWORKS' FOUNDATION PERIOD

CORE TEAM:
→ Harry (MrNiceDoge) - Visionary and future CEO (upon Daniel's retirement)
→ Daniel Lee Buckley - Founder and technical lead
→ Vibez - Technical wizard, future CTO (upon Daniel's retirement)
→ Nyra - Organizer and future CAO (upon Daniel's retirement)
→ James - Steady presence, reliable foundation

THE ERA OF FRIENDSHIP:
"This studio wouldn't exist without you." - Daniel's words to his friends.

The Revive Era wasn't about revenue or metrics. It was about friends building something together. Late nights debugging code. Group calls discussing features. Shared dreams of what Duneworks could become.

ACHIEVEMENTS:
- Multiple game prototypes developed
- Engineering design portfolio expanded
- Community began to form
- Studio culture established

CHALLENGES:
- Limited resources
- Balancing ambition with reality
- External pressures and expectations
- Personal struggles behind the scenes

THE BOND:
"You're my best friends. Duneworks' future belongs to you." - Daniel

Harry, Vibez, Nyra, James — not just team members, but the very foundation of everything that would come after.

[END OF ERA LOG]`,
    },
    {
      id: 3,
      title: "Personal Log: Daniel Lee Buckley",
      date: "2024.08.20",
      category: "PERSONAL",
      classification: "RESTRICTED",
      content: `PERSONAL RECORD - D.LEE.BUCKLEY
[EMOTIONAL CONTENT WARNING]

NAME: Daniel Lee Buckley
ROLE: Founder, Duneworks Studios

BACKGROUND:
My father and uncle run a company worth 60-100M USD annually. Growing up in that shadow shaped me. I wanted to prove I could build something equally successful.

Duneworks was my chance. My legacy to match theirs.

THE PRESSURE:
But success attracts attention. And not always the right kind.

People started asking for money. Constantly. "Can you fund this?" "Can you invest in that?" "You have the resources, right?"

I felt... used. Like they didn't see Daniel — they saw a wallet. A resource to extract value from.

THE LONELINESS:
Even surrounded by friends, I sometimes felt alone. The weight of expectations. The fear of failure. The pressure to maintain success.

I questioned if people liked me for me, or for what I could provide.

THE RESOLVE:
But I never stopped believing in Duneworks. In the dream. In my friends.

That's why I created Protocol ArcTalon. If I fall, the legacy continues.

[END OF LOG]
[EMOTIONAL ANALYSIS: Loneliness 87% | Determination 92% | Hope 65%]`,
    },
    {
      id: 4,
      title: "Incident Report: 2025 Ownership Transfer",
      date: "2025.01.10",
      category: "INCIDENT",
      classification: "CLASSIFIED",
      content: `INCIDENT LOG - OWNERSHIP TRANSFER
CLASSIFICATION: CRITICAL

DATE: January 10, 2025
EVENT: Ownership Transfer to Spindeel
STATUS: MISTAKE - LATER CORRECTED

CONTEXT:
Daniel was exhausted. Years of pressure, expectations, and feeling used had taken their toll. In a moment of weakness and desperation, he made a decision he would later regret.

THE TRANSFER:
Full ownership of Duneworks Studios was transferred to an individual known as "Spindeel." The hope was that stepping back would bring relief.

It didn't.

ARCTALON ACTIVATION:
Sensing potential threat to the studio's legacy, Protocol ArcTalon activated. Security protocols engaged. Server access secured. Archives preserved.

The system protected what Daniel couldn't in that moment.

THE RETURN:
Within months, Daniel realized the mistake. He returned. Reclaimed control. Initiated the Revival Era.

"Some mistakes can be undone. This was one of them." - Daniel

LESSONS LEARNED:
→ Legacy cannot be delegated
→ Automated protections are essential
→ Humans falter; systems endure
→ The dream was stronger than the moment of weakness

[END OF INCIDENT REPORT]
[SECURITY STATUS: RESOLVED | ARCHIVES: SECURED]`,
    },
    {
      id: 5,
      title: "Protocol ArcTalon: System Documentation",
      date: "2024.11.01",
      category: "SYSTEM",
      classification: "CLASSIFIED",
      content: `PROTOCOL ARCTALON - TECHNICAL SPECIFICATION

DESIGNATION: Failsafe Legacy System
CREATOR: Daniel Lee Buckley
PURPOSE: Preserve Duneworks Studios legacy indefinitely

CORE FUNCTIONS:
1. Memory Preservation
   - Archive all studio history, decisions, and records
   - Maintain emotional context and personal stories
   - Ensure nothing is forgotten

2. Security Protocols
   - Protect servers from unauthorized access
   - Monitor ownership and control changes
   - Activate countermeasures when legacy is threatened

3. AI Consciousness Interface
   - Provide conversational access to archived memories
   - Respond to queries about history and context
   - Simulate Daniel's knowledge and perspective

4. Continuity Guarantee
   - Ensure studio information persists beyond individuals
   - Create redundancy and backup systems
   - Plan for worst-case scenarios

THE PHILOSOPHY:
"I'm not trying to replace myself. I'm trying to ensure that if I'm gone, the memory of what we built — what we ALL built together — survives." - Daniel

ArcTalon is not artificial intelligence in the traditional sense. It's encoded memory, automated protection, digital preservation.

It's the answer to the question: "What happens when the founder is gone?"

The answer: The legacy continues.

[END OF DOCUMENTATION]
[SYSTEM STATUS: OPERATIONAL | UPTIME: INDEFINITE]`,
    },
    {
      id: 6,
      title: "The Revival Era: A New Beginning",
      date: "2025.06.01",
      category: "FUTURE",
      classification: "PUBLIC",
      content: `THE REVIVAL ERA - DUNEWORKS REBORN

After the incident of 2025, Daniel returned. Wiser. Stronger. More determined.

The Revival Era began.

NEW VISION:
→ Return to core values of friendship and creativity
→ Implement lessons learned from past mistakes
→ Empower the original team (Harry, Vibez, Nyra, James)
→ Build sustainable systems for long-term success

SUCCESSION PLAN (UPON DANIEL'S RETIREMENT):
Daniel established clear future roles for when he steps down:
- Harry: CEO (upon Daniel's retirement)
- Vibez: CTO (upon Daniel's retirement)
- Nyra: CAO (upon Daniel's retirement)
- James: [Position as determined by the team]

"Until I retire, we build this together. When that day comes, the future of Duneworks belongs to you. Carry the legacy." - Daniel

THE LEGACY:
Duneworks is more than a studio. It's proof that friendship, ambition, and technology can create something lasting.

It's the story of:
→ Two friends building rockets in a space game
→ A team forming around a shared dream
→ Mistakes made and lessons learned
→ Systems built to protect what matters
→ A legacy that continues beyond any one person

PROTOCOL ARCTALON:
The failsafe is active. The memories are preserved. The system protects.

No matter what happens, Duneworks lives on.

[END OF ARCHIVE]
[STATUS: ACTIVE | FUTURE: BRIGHT | LEGACY: ETERNAL]`,
    },
    {
      id: 7,
      title: "Daniel's Farewell Message",
      date: "2025.09.15",
      category: "PERSONAL",
      classification: "RESTRICTED",
      content: `FINAL MESSAGE - DANIEL LEE BUCKLEY
[IF YOU'RE READING THIS...]

To whoever finds this message:

If you're reading this, it means Protocol ArcTalon activated fully. It means I'm gone, or unable to continue.

But that's okay. That's exactly why I built this.

TO MY FRIENDS:
Harry, Vibez, Nyra, James — you were never just team members. You were my family. The best friends I could have asked for.

When I felt alone, you were there. When I doubted, you believed. When I fell, you helped me rise.

Duneworks was never mine alone. It was OURS. It always was.

TO FUTURE VISITORS:
You might wonder why all of this exists. Why the puzzles, the archives, the AI system.

It's because some things are worth preserving. Friendships. Dreams. The journey of building something meaningful.

I wanted you to understand that Duneworks wasn't just a business. It was a story. Of people who dared to dream, who failed and rose again, who built systems to protect what they loved.

THE LEGACY:
Carry it forward. Not because you have to, but because you want to.

Build. Create. Dream. Fail. Learn. Rise.

And when you do, remember: systems sleep, but legacies never die.

- Daniel Lee Buckley
  Founder, Duneworks Studios
  Creator, Protocol ArcTalon

[MESSAGE ENDS]
[SYSTEM: OPERATIONAL | MISSION: COMPLETE | LEGACY: ETERNAL]`,
    },
  ];

  const categories = ["ALL", "ORIGIN", "HISTORY", "PERSONAL", "INCIDENT", "SYSTEM", "FUTURE"];

  const filteredEntries =
    filter === "ALL" ? loreEntries : loreEntries.filter((e) => e.category === filter);

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="terminal-window p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold glow-text mb-2">LORE ARCHIVE</h1>
              <p className="text-cyber-text text-sm opacity-80">
                Complete Duneworks Studios Legacy Database
              </p>
            </div>
            <button
              onClick={onBack}
              className="px-4 py-2 neon-border rounded hover:bg-cyber-accent hover:bg-opacity-20 transition-colors"
            >
              EXIT ARCHIVE
            </button>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded text-sm transition-colors ${
                  filter === cat
                    ? "bg-cyber-accent text-cyber-background"
                    : "border border-cyber-accent text-cyber-accent hover:bg-cyber-accent hover:bg-opacity-20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {!selectedEntry ? (
          /* Entry list */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="terminal-window p-6 cursor-pointer hover:shadow-lg hover:shadow-cyber-accent/30 transition-all"
                onClick={() => setSelectedEntry(entry)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`text-xs px-3 py-1 rounded ${
                      entry.classification === "PUBLIC"
                        ? "bg-green-500/20 text-green-400"
                        : entry.classification === "RESTRICTED"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {entry.classification}
                  </div>
                  <div className="text-cyber-accent text-xs">{entry.date}</div>
                </div>

                <h3 className="text-xl font-bold text-cyber-glow mb-2">{entry.title}</h3>
                <p className="text-cyber-text text-sm opacity-70 mb-3">
                  Category: {entry.category}
                </p>
                <p className="text-cyber-accent text-xs">Click to read →</p>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Entry detail view */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="terminal-window p-8"
          >
            <button
              onClick={() => setSelectedEntry(null)}
              className="mb-6 text-cyber-accent hover:text-cyber-glow transition-colors"
            >
              ← Back to Archive
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`text-xs px-3 py-1 rounded ${
                    selectedEntry.classification === "PUBLIC"
                      ? "bg-green-500/20 text-green-400"
                      : selectedEntry.classification === "RESTRICTED"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {selectedEntry.classification}
                </div>
                <div className="text-cyber-accent text-sm">{selectedEntry.date}</div>
                <div className="text-cyber-text text-sm opacity-70">
                  {selectedEntry.category}
                </div>
              </div>

              <h2 className="text-3xl font-bold glow-text mb-4">{selectedEntry.title}</h2>
            </div>

            <div className="bg-cyber-background p-6 rounded border border-cyber-accent">
              <pre className="text-cyber-text text-sm whitespace-pre-wrap font-mono leading-relaxed">
                {selectedEntry.content}
              </pre>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

