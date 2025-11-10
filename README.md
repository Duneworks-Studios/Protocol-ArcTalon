# Protocol ArcTalon 🔐

An immersive, cyberpunk-themed terminal interface that tells the story of Duneworks Studios through interactive puzzles, AI conversations, and archived memories.

## 🌟 Features

### 🖥️ Terminal Home Interface
- Authentic terminal UI with command-line interaction
- Commands: `help`, `puzzles`, `ai_chat`, `lore`, `status`, `clear`, `reboot`
- Hidden Easter egg commands: `revive`, `/echo legacy`, `/shutdown`, `duneworks://access`
- Real-time system alerts and notifications
- Matrix-style particle effects

### 🔐 6 Encryption Puzzles
1. **Origin Log: AuraGenesis** - Base64 decryption puzzle
2. **Transmission: Revive Era** - Morse code translation
3. **Memory Node: D.Lee.Buckley** - Fragment reconstruction
4. **Incident Log: Ownership Transfer** - Data corruption repair
5. **Cipher Lock: ArcTalon Core** - Layered encryption (Base64 → Hex → Reverse)
6. **The Protocol Key** - Meta-puzzle combining all clues

### 🤖 AI Chat Interface
- Interactive conversation with ArcTalon AI
- Commands: `/remember`, `/decrypt emotion`, `/who am i`
- Deep knowledge of Duneworks history and Daniel's story
- Character-by-character typing animation
- Contextual responses based on topics

### 📂 Lore Archive
- 7 detailed archive entries covering the complete Duneworks story
- Filterable by category: Origin, History, Personal, Incident, System, Future
- Classification levels: Public, Restricted, Classified
- Full timeline from AuraDynamics to Revival Era

## 🎨 Design Features

### Visual Aesthetic
- Deep cyberpunk indigo color palette
- Custom color scheme with intelligent indigo theme
- Neon glow effects and holographic elements
- Scanline CRT screen effects
- Matrix rain background animation
- Terminal flicker shaders

### Animations
- Framer Motion powered transitions
- Smooth page transitions with command-style wipes
- Pulse glow effects
- Typing cursor animations
- Boot sequence animation

### Sound & Effects (Ready for Integration)
- Terminal typing sounds (can be added)
- Static noise ambience (can be added)
- Holographic UI sounds (can be added)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom cyberpunk theme
- **Animations**: Framer Motion
- **Encryption**: crypto-js for puzzle mechanics
- **Font**: JetBrains Mono (monospace)

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Open in Browser

Navigate to `http://localhost:3000` to experience Protocol ArcTalon.

### 🤖 Enable Real AI Chat (Optional)

By default, the AI chat uses pre-programmed responses. To connect it to real AI (OpenAI GPT-4 or Claude):

1. **Get an API key** from [OpenAI](https://platform.openai.com/api-keys)
2. **Create `.env.local`** in the project root:
   ```bash
   OPENAI_API_KEY=sk-your-api-key-here
   ```
3. **Restart the dev server**
4. **See full setup guide:** [AI_SETUP.md](./AI_SETUP.md)

The AI is pre-trained with all Duneworks history and ArcTalon's personality!

## 📖 How to Use

### 1. Boot Sequence
Watch the AI system initialize with cinematic boot messages.

### 2. Terminal Commands
Type `help` to see all available commands:
- `puzzles` - Access the encryption terminal
- `ai_chat` - Talk with ArcTalon AI
- `lore` - View archives (unlocked after completing all puzzles)
- `status` - Check system status
- `clear` - Clear the terminal
- `reboot` - Restart the system

### 3. Solve Puzzles
Complete all 6 puzzles to unlock the Lore Archive. Each puzzle reveals part of the Duneworks story.

### 4. Explore Easter Eggs
Try hidden commands:
- `revive` - Access Revive Era memories
- `/echo legacy` - Display a hidden message
- `/shutdown` - Initiate shutdown sequence
- `duneworks://access` - Hidden protocol

## 🎯 Puzzle Solutions Guide

**Note**: Puzzles are designed to be solved, but here are hints:

1. **Puzzle 1**: Decode the Base64 string to find the original company name
2. **Puzzle 2**: Use a Morse code decoder for the transmission
3. **Puzzle 3**: Arrange fragments chronologically to reconstruct the memory
4. **Puzzle 4**: Remove corruption characters (@, !, #) from each block
5. **Puzzle 5**: Decrypt through 3 layers: Base64 → Hex → Reverse
6. **Puzzle 6**: The answer is what ties all the stories together

## 🎨 Color Palette

```css
--cyber-bg: #0A0E1A (Deep space background)
--cyber-panel: #131824 (Secondary panels)
--cyber-text: #E6E8F0 (Primary text)
--cyber-accent: #8B7FFF (Neon indigo accent)
--cyber-glow: #A89FFF (Glow effects)
```

## 📝 Story Overview

Protocol ArcTalon tells the story of:
- **Daniel Lee Buckley**: Founder of Duneworks Studios
- **The Revive Era**: Golden age with friends Harry, Vibez, Nyra, and James
- **The 2025 Incident**: Ownership mistake and recovery
- **Protocol ArcTalon**: AI failsafe system to preserve the legacy
- **The Revival Era**: Return and new beginning

## 🔒 Security & Privacy

This is a narrative experience. No real data is collected or stored. All "AI" responses are pre-programmed narratives based on the story.

## 🤝 Contributing

This is a personal narrative project telling the story of Duneworks Studios. While contributions are welcome for bug fixes and improvements, the core narrative content should remain intact.

## 📜 License

This project is a creative work telling the story of Duneworks Studios and should be treated as such.

## 🙏 Credits

**Created by**: Daniel Lee Buckley  
**For**: Duneworks Studios  
**Dedicated to**: Harry, Vibez, Nyra, James, and all who believed in the dream

---

*"The system sleeps... until needed again. But the legacy never dies."*  
**- Protocol ArcTalon**

