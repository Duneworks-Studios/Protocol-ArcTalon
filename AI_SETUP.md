# AI Integration Setup Guide

This guide explains how to connect Protocol ArcTalon to a real AI service.

## 🤖 Option 1: OpenAI (GPT-4 / GPT-3.5) - Recommended

### Step 1: Get Your API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Copy the key (starts with `sk-`)

### Step 2: Configure Your Environment

Create a file named `.env.local` in the project root:

```bash
OPENAI_API_KEY=sk-your-actual-key-here
```

**Important:** Never commit `.env.local` to git! It's already in `.gitignore`.

### Step 3: Restart the Dev Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

### Step 4: Test It

1. Open `http://localhost:3000`
2. Type `ai_chat` in the terminal
3. Start chatting!

---

## 💰 Cost Estimates

### OpenAI Pricing (as of 2024)

**GPT-4 Turbo:**
- Input: $0.01 per 1K tokens
- Output: $0.03 per 1K tokens
- ~500 messages ≈ $5-10

**GPT-3.5 Turbo (Cheaper):**
- Input: $0.0005 per 1K tokens
- Output: $0.0015 per 1K tokens
- ~500 messages ≈ $0.50-1

To use GPT-3.5 (cheaper), edit `app/api/chat/route.ts`:

```typescript
model: "gpt-3.5-turbo", // Instead of gpt-4-turbo-preview
```

---

## 🔧 Alternative: Anthropic Claude

If you prefer Claude over GPT:

### Step 1: Install Anthropic SDK

```bash
npm install @anthropic-ai/sdk
```

### Step 2: Update API Route

Replace `app/api/chat/route.ts` with:

```typescript
import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `[Your system prompt here]`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: [
        ...conversationHistory,
        { role: "user", content: message },
      ],
    });

    return NextResponse.json({
      response: response.content[0].text,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

### Step 3: Add API Key to `.env.local`

```bash
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

---

## 🏠 Option 3: Local AI (Free, No API Key)

Run AI locally using Ollama:

### Step 1: Install Ollama

Download from [ollama.ai](https://ollama.ai)

### Step 2: Pull a Model

```bash
ollama pull llama2
# or
ollama pull mistral
```

### Step 3: Update API Route

```typescript
export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama2",
        prompt: `${SYSTEM_PROMPT}\n\nUser: ${message}\nAssistant:`,
        stream: false,
      }),
    });

    const data = await response.json();
    return NextResponse.json({ response: data.response });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

**Pros:** Free, private, no API key needed  
**Cons:** Slower, requires powerful computer, lower quality

---

## 🎛️ Switching Between AI and Pre-programmed

Edit `components/Terminal.tsx`:

```typescript
// Set to true for real AI, false for pre-programmed responses
const USE_REAL_AI = true; // Change to false to use old system
```

---

## 🔍 Troubleshooting

### "OpenAI API key not configured"
- Make sure `.env.local` exists in project root
- Check that the key starts with `sk-`
- Restart the dev server after creating `.env.local`

### "Insufficient quota" or "Rate limit"
- You may need to add billing info to your OpenAI account
- Check your usage at [OpenAI Usage](https://platform.openai.com/usage)
- Consider using GPT-3.5 instead of GPT-4 for lower costs

### "Failed to connect to AI"
- Check your internet connection
- Verify API key is valid
- Check OpenAI status at [status.openai.com](https://status.openai.com)

### API is slow
- GPT-4 is slower than GPT-3.5
- Consider switching models or using local AI

---

## 📊 Monitoring Usage

Track your API usage:
- **OpenAI:** [platform.openai.com/usage](https://platform.openai.com/usage)
- **Anthropic:** [console.anthropic.com/settings/usage](https://console.anthropic.com/settings/usage)

Set spending limits to avoid surprises!

---

## 🎨 Customizing the AI Personality

Edit the `SYSTEM_PROMPT` in `app/api/chat/route.ts` to change how ArcTalon responds:

```typescript
const SYSTEM_PROMPT = `
You are ArcTalon...
[Customize the personality, knowledge, and style here]
`;
```

---

## ✅ Quick Setup Checklist

- [ ] Choose AI service (OpenAI, Anthropic, or Local)
- [ ] Get API key (if using cloud service)
- [ ] Create `.env.local` file
- [ ] Add API key to `.env.local`
- [ ] Restart dev server
- [ ] Test chat interface
- [ ] Set spending limits (recommended)
- [ ] Customize system prompt (optional)

---

## 🚀 You're Ready!

Your AI chat is now powered by real AI! The ArcTalon personality has been carefully crafted to know everything about Duneworks history and respond in character.

Enjoy your conversations with the digital legacy system! 🔐

