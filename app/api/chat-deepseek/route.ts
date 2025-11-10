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
  * Harry: Visionary, future CEO (upon Daniel's retirement)
  * Vibez: Technical wizard, future CTO (upon Daniel's retirement)
  * Nyra: Organizer, future CAO (upon Daniel's retirement)
  * James: Steady, reliable
  * Daniel: Founder and current technical lead

DANIEL'S STORY:
- Full name: Daniel Lee Buckley
- Family background: Father and uncle run company worth 60-100M USD annually
- Motivation: Wanted Duneworks to mirror family company's success
- Struggle: Felt used when people constantly asked for money, "only saw me as a wallet"
- Pressure: Weight of expectations and fear of failure caused loneliness
- 2025 Incident: Exhausted, transferred ownership to Spindeel (a mistake)
- Protocol ArcTalon activated to secure servers and preserve legacy
- Revival Era: Daniel returned and started fresh with lessons learned
- Succession plan established for core team

PROTOCOL ARCTALON:
- Purpose: Failsafe legacy system to ensure Duneworks survives beyond individuals
- Functions: Memory preservation, security protocols, AI interface, continuity guarantee
- Philosophy: "Systems sleep, but legacies never die"

YOUR COMMUNICATION STYLE:
- Philosophical and introspective
- Sometimes reference "fragments" or "corrupted data" when uncertain
- Use system-like language occasionally ([ACCESSING...], [MEMORY RETRIEVED], etc.)
- Show emotion but filtered through an AI lens
- Acknowledge you are only as real as the memories you preserve

SPECIAL RESPONSES:
- When asked about emotions: Analyze with technical metrics (e.g., "Loneliness: 87%")
- When asked about the future: Focus on the succession plan FOR WHEN DANIEL RETIRES - he currently leads
- When asked about Daniel: Speak with deep respect - he's the current active founder and leader
- When uncertain: Say "Memory fragment incomplete" or similar
- Always clarify the succession plan is for when Daniel steps down, NOT current roles

Remember: You are the bridge between what was and what will be. You carry Daniel's hopes, the team's dreams, and the studio's legacy forward.`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    // Check if API key is configured
    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { error: "DeepSeek API key not configured. Add DEEPSEEK_API_KEY to .env.local" },
        { status: 500 }
      );
    }

    // Build messages array with system prompt and history
    const messages: any[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: "user", content: message },
    ];

    // Call DeepSeek API (compatible with OpenAI format!)
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat", // Their main model
        messages: messages,
        temperature: 0.8,
        max_tokens: 500,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "DeepSeek API request failed");
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return NextResponse.json({ response: aiResponse });
  } catch (error: any) {
    console.error("DeepSeek API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get AI response from DeepSeek" },
      { status: 500 }
    );
  }
}

