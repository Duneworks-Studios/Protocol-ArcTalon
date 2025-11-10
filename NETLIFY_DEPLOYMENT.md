# 🚀 Deploying Protocol ArcTalon to Netlify

## Quick Deploy Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

### 2. Connect to Netlify

1. Go to [app.netlify.com](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `22`

### 3. Set Environment Variables

In Netlify Dashboard → Site settings → Environment variables:

**Required (for AI chat to work):**
```
DEEPSEEK_API_KEY=sk-56252bb00f6649c8a570b70a35e907b9
```

**Optional (if you want to use OpenAI instead):**
```
OPENAI_API_KEY=sk-your-openai-key-here
```

### 4. Deploy!

Click "Deploy site" - it should work now! 🎉

---

## Configuration Files

I've created `netlify.toml` which tells Netlify how to build and deploy your Next.js app.

---

## Troubleshooting

### Build fails with "Missing credentials"
✅ **Solution**: This is fixed! The API clients now initialize at request time, not build time.

### AI chat doesn't work on deployed site
✅ **Solution**: Make sure you set `DEEPSEEK_API_KEY` in Netlify environment variables (see step 3 above)

### 404 errors on refresh
✅ **Solution**: This is handled by `netlify.toml` redirects

### Site is slow to load
✅ **Solution**: First load is always slower. Subsequent loads are cached and fast.

---

## Post-Deployment Checklist

- [ ] Site deploys successfully
- [ ] Boot sequence works
- [ ] Terminal commands work
- [ ] Puzzles load and can be solved
- [ ] AI chat works (with API key set)
- [ ] Lore archive unlocks after all puzzles
- [ ] No console errors

---

## Environment Variables You Need

### Minimum (free tier works!):
```
DEEPSEEK_API_KEY=sk-your-key-here
```

### Optional:
```
OPENAI_API_KEY=sk-your-key-here  # If using OpenAI instead of DeepSeek
ANTHROPIC_API_KEY=sk-ant-...     # If using Claude
```

---

## Switching AI Providers on Netlify

Edit `components/Terminal.tsx` line 14 before deploying:

```typescript
const AI_PROVIDER = "deepseek";  // or "openai" or "ollama"
```

Then commit and push to trigger a new deployment.

---

## Cost Considerations

### With DeepSeek (Recommended):
- **Hosting**: FREE on Netlify
- **AI**: $5 free credits = ~10,000 messages
- **After free tier**: ~$0.50 per 1,000 messages

### With OpenAI:
- **Hosting**: FREE on Netlify  
- **AI**: $5 free credits = ~500 messages (GPT-4) or ~2,000 (GPT-3.5)
- **After free tier**: ~$5-20 per 1,000 messages

---

## Custom Domain (Optional)

1. Buy a domain (e.g., on Namecheap, Google Domains)
2. In Netlify: Domain settings → Add custom domain
3. Update your domain's DNS to point to Netlify
4. SSL certificate automatically provisioned!

---

## Monitoring

Check your site status:
- **Netlify Dashboard**: [app.netlify.com](https://app.netlify.com/)
- **Build logs**: Click on any deploy to see logs
- **Analytics**: Netlify provides basic analytics for free

---

## Updating Your Site

Just push to GitHub:
```bash
git add .
git commit -m "Update content"
git push origin main
```

Netlify automatically rebuilds and deploys! ⚡

---

## Support

If deployment fails:
1. Check build logs in Netlify dashboard
2. Make sure environment variables are set correctly
3. Verify `netlify.toml` is in your repo root
4. Check that all dependencies are in `package.json`

---

**Your Protocol ArcTalon site will be live at:**
`https://your-site-name.netlify.app` 🚀

(You can customize the site name in Netlify settings)

