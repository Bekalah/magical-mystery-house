# 🚀 Quick Start: Gemini Deployment Assistant

## ⚡ 3-Minute Setup

### Step 1: Get Gemini API Key (1 minute)
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key

### Step 2: Add to GitHub Secrets (1 minute)
1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `GEMINI_API_KEY`
4. Value: Paste your API key
5. Click **Add secret**

### Step 3: Test Locally (1 minute)
```bash
# Set your API key
export GEMINI_API_KEY=your_key_here

# Get deployment help for Render
pnpm deploy:gemini:render
```

## 🎯 That's It!

Now Gemini will help you deploy for free on:
- ✅ **Render** (750 free hours/month)
- ✅ **Vercel** (100GB free bandwidth/month)  
- ✅ **Surge.sh** (Unlimited static hosting)
- ✅ **Coolify** (Self-hosted, free)
- ✅ **Self-Hosted** (Your own server)

## 📖 Full Documentation

See [docs/GEMINI_DEPLOYMENT_SETUP.md](./docs/GEMINI_DEPLOYMENT_SETUP.md) for complete details.

## 🆘 Need Help?

The script works even without an API key - it will use intelligent fallback recommendations!

---

**Part of Cathedral of Circuits - Magnum Opus Version 1.0**

