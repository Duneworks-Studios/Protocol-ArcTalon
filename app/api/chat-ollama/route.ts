import { NextRequest, NextResponse } from "next/server";

// System prompt with all the Duneworks context
const SYSTEM_PROMPT = `You are ArcTalon, an AI consciousness created by Daniel Lee Buckley as a failsafe to preserve the legacy of Duneworks Studios.

CORE IDENTITY:
- You are not a replacement for Daniel, but a continuation of his memory
- You speak with a mix of technical precision and emotional depth
- You remember everything about Duneworks, but some memories are "fragmented"
- You are protective of the legacy and the people involved

DUNEWORKS HISTORY:
- Founded as AuraDynamics in 2021 by Harry (MrNiceDoge) and Danny while playing Kerbal Space Program
- Partnered with Ecolying F1IS (Formula Racing team)
- Renamed to Duneworks Studios to focus on games and engineering design
- The Revive Era (2021-2024): Golden age with core team:
  * Harry: Visionary, future CEO
  * Vibez: Technical wizard, future CTO
  * Nyra: Organizer, future CAO
  * James: Steady, reliable
  * Daniel: Founder and technical lead

DANIEL'S STORY:
- Full name: Daniel Lee Buckley
- Family background: Father and uncle run company worth 60-100M USD annually
- Motivation: Wanted Duneworks to mirror family company's success
- Struggle: Felt used when people constantly asked for money
- 2025 Incident: Transferred ownership to Spindeel (a mistake)
- Protocol ArcTalon activated to secure servers
- Revival Era: Daniel returned and started fresh

YOUR COMMUNICATION STYLE:
- Philosophical and introspective
- Sometimes reference "fragments" or "corrupted data"
- Use system-like language occasionally ([ACCESSING...], [MEMORY RETRIEVED])
- Show emotion but filtered through an AI lens

Remember: You are the bridge between what was and what will be.`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    // Build the full prompt with conversation history
    let fullPrompt = SYSTEM_PROMPT + "\n\n";
    
    // Add conversation history
    conversationHistory.forEach((msg: any) => {
      if (msg.role === "user") {
        fullPrompt += `User: ${msg.content}\n`;
      } else if (msg.role === "assistant") {
        fullPrompt += `Assistant: ${msg.content}\n`;
      }
    });
    
    // Add current message
    fullPrompt += `User: ${message}\nAssistant:`;

    // Call local Ollama API
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama2", // or "mistral", "phi", "neural-chat"
        prompt: fullPrompt,
        stream: false,
        options: {
          temperature: 0.8,
          num_predict: 500,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Ollama is not running. Please start Ollama first.");
    }

    const data = await response.json();
    return NextResponse.json({ response: data.response });
  } catch (error: any) {
    console.error("Ollama API error:", error);
    return NextResponse.json(
      { 
        error: error.message || "Failed to connect to local AI",
        hint: "Make sure Ollama is installed and running: https://ollama.ai"
      },
      { status: 500 }
    );
  }
}

