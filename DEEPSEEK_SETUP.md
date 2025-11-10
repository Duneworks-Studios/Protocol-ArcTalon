# 🚀 DeepSeek Setup Guide (FREE & CHEAP)

DeepSeek is the **best budget option** for AI integration - it's 90% cheaper than OpenAI and offers free credits!

## ✨ Why DeepSeek?

- ✅ **$5 free credits** for new accounts (no phone required!)
- ✅ **90% cheaper** than OpenAI ($0.14 vs $1.50 per million tokens)
- ✅ **Fast** - responses in 1-2 seconds
- ✅ **Good quality** - comparable to GPT-3.5 Turbo or better
- ✅ **Easy setup** - compatible with OpenAI's API format
- ✅ **Privacy** - reputable Chinese AI company

---

## 🎁 Step 1: Get Your Free API Key

1. **Go to** [platform.deepseek.com](https://platform.deepseek.com/)
2. **Sign up** with your email (no phone verification needed!)
3. **Verify email** and log in
4. **Navigate to** API Keys section
5. **Create new key** - you'll get **$5 free credits** automatically!
6. **Copy the key** (starts with `sk-`)

---

## 🔧 Step 2: Configure Your Project

Create or edit `.env.local` in your project root:

```bash
# DeepSeek API Key (FREE $5 credits!)
DEEPSEEK_API_KEY=sk-your-deepseek-key-here
```

**Important:** 
- Never commit `.env.local` to git (it's already in `.gitignore`)
- Keep your API key secret!

---

## ⚙️ Step 3: Update Terminal Configuration

Edit `components/Terminal.tsx` (around line 11):

```typescript
const USE_REAL_AI = true;
const AI_PROVIDER = "deepseek"; // ← Change this to "deepseek"
```

---

## 🎮 Step 4: Test It!

1. **Restart the dev server:**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. **Open the app:**
   ```
   http://localhost:3000
   ```

3. **Try the AI chat:**
   - Type `ai_chat` in the terminal
   - Start chatting with ArcTalon!
   - Ask about Duneworks, Daniel, the Revive Era, etc.

---

## 💰 Cost Breakdown

### With Free Credits:
- **$5 free credits** = ~10,000 messages with DeepSeek!
- Lasts months for personal use

### After Free Credits:
- **$0.14 per 1M input tokens** (vs OpenAI's $1.50)
- **$0.28 per 1M output tokens** (vs OpenAI's $2.00)
- **~1,000 messages ≈ $0.50** (vs OpenAI: $3-5)

### Real Example:
```
You: "Tell me about Daniel's story"
ArcTalon: [200 word response]
Cost: ~$0.0005 (less than 1 cent!)
```

---

## 🔍 Troubleshooting

### "DeepSeek API key not configured"
✅ **Solution:**
- Make sure `.env.local` exists in project root
- Check spelling: `DEEPSEEK_API_KEY` (not OPENAI_API_KEY)
- Restart dev server after creating `.env.local`

### "Unauthorized" or "Invalid API key"
✅ **Solution:**
- Verify key is correct (copy-paste from DeepSeek dashboard)
- Make sure key starts with `sk-`
- Check you're logged into the right account

### "Insufficient credits"
✅ **Solution:**
- Check balance at [platform.deepseek.com](https://platform.deepseek.com/)
- Add payment method (very cheap rates!)
- Set spending limits to avoid surprises

### Responses are slow
✅ **Solution:**
- DeepSeek is usually fast (1-2 seconds)
- Check your internet connection
- Try refreshing the page

### Getting Chinese characters in response
✅ **Solution:**
- The model is bilingual but should respond in English
- If it responds in Chinese, add to your message: "Please respond in English"
- System prompt already specifies English

---

## 🎛️ Advanced Configuration

### Change Response Length

Edit `app/api/chat-deepseek/route.ts`:

```typescript
max_tokens: 500, // Increase for longer responses (costs more)
```

### Adjust Creativity

```typescript
temperature: 0.8, // 0.0 = deterministic, 1.0 = creative
```

### Change Model

DeepSeek offers multiple models:
```typescript
model: "deepseek-chat", // Standard model (recommended)
// model: "deepseek-coder", // For coding tasks
```

---

## 🔄 Switching Between Providers

You can easily switch between AI providers:

**Use DeepSeek (cheap):**
```typescript
const AI_PROVIDER = "deepseek";
```

**Use OpenAI (if you have key):**
```typescript
const AI_PROVIDER = "openai";
```

**Use Local AI (free, no internet):**
```typescript
const AI_PROVIDER = "ollama";
```

**Use pre-programmed responses (no AI):**
```typescript
const USE_REAL_AI = false;
```

---

## 📊 Monitor Your Usage

Track your usage and spending:
1. Go to [platform.deepseek.com](https://platform.deepseek.com/)
2. Click on "Usage" or "Billing"
3. See detailed breakdown of costs

**Pro Tip:** Set a spending limit to avoid surprises!

---

## ✅ Quick Setup Checklist

- [ ] Sign up at platform.deepseek.com
- [ ] Get $5 free credits
- [ ] Copy API key
- [ ] Create `.env.local` file
- [ ] Add `DEEPSEEK_API_KEY=sk-...`
- [ ] Edit `Terminal.tsx` to set `AI_PROVIDER = "deepseek"`
- [ ] Restart dev server (`npm run dev`)
- [ ] Test AI chat
- [ ] Set spending limit (recommended)

---

## 🎉 You're Done!

Your AI chat is now powered by DeepSeek - enjoy thousands of messages with your free $5 credits!

### Next Steps:
- Chat with ArcTalon about Duneworks history
- Ask about Daniel, the Revive Era, or Protocol ArcTalon
- Explore the emotional depth of the AI's responses
- Watch your credits last for months!

**Questions?** Check [DeepSeek Documentation](https://platform.deepseek.com/docs)

---

## 💡 Pro Tips

1. **Free credits last long** - $5 = ~10,000 messages!
2. **After free tier** - still 90% cheaper than OpenAI
3. **Quality is good** - comparable to GPT-3.5 Turbo
4. **Fast responses** - usually 1-2 seconds
5. **Set limits** - avoid unexpected charges
6. **Monitor usage** - check dashboard regularly

**Enjoy your AI-powered Protocol ArcTalon experience! 🔐**

