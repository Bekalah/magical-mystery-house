# 🤖 Google Gemini 3 (Antigravity) Deployment Assistant Setup

**Cathedral of Circuits - Magnum Opus Version 1.0**  
**Author: Rebecca Respawn**

## Overview

This integration connects Google Gemini 3 (Antigravity) to your GitHub repository to provide intelligent, AI-assisted deployment recommendations for free self-hosting platforms.

## ✨ Features

- **AI-Powered Recommendations**: Gemini analyzes your codebase and provides deployment strategies
- **Free Platform Support**: Render, Vercel, Surge.sh, Coolify, and Self-Hosted
- **GitHub Actions Integration**: Automated deployment assistance on push/PR
- **Context-Aware**: Analyzes changed files to provide relevant recommendations
- **Fallback Mode**: Works even without API key using intelligent defaults

## 🚀 Quick Start

### 1. Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Add GitHub Secrets

In your GitHub repository:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:

```
GEMINI_API_KEY=your_gemini_api_key_here
RENDER_API_TOKEN=your_render_token (optional, for Render deployments)
VERCEL_TOKEN=your_vercel_token (optional, for Vercel deployments)
SURGE_TOKEN=your_surge_token (optional, for Surge deployments)
COOLIFY_HOST=your_coolify_host (optional, for Coolify deployments)
COOLIFY_TOKEN=your_coolify_token (optional, for Coolify deployments)
```

### 3. Use Locally

```bash
# Get deployment recommendations for Render
pnpm deploy:gemini:render

# Get deployment recommendations for Vercel
pnpm deploy:gemini:vercel

# Get deployment recommendations for Surge
pnpm deploy:gemini:surge

# Get deployment recommendations for Coolify
pnpm deploy:gemini:coolify

# Get deployment recommendations for Self-Hosted
pnpm deploy:gemini:self-host

# Generic (defaults to Render)
pnpm deploy:gemini
```

### 4. Use in GitHub Actions

The workflow automatically runs on:
- **Push to main/master**: Analyzes changes and suggests deployment
- **Pull Requests**: Provides deployment preview recommendations
- **Manual Trigger**: Go to Actions → "Gemini Deployment Assistant" → "Run workflow"

## 📋 How It Works

### Local Usage

1. **Run the script**: `pnpm deploy:gemini:render`
2. **Gemini analyzes**:
   - Your project structure
   - Package.json configuration
   - Deployment scripts
   - Changed files (if in git context)
3. **Generates strategy**:
   - Recommendations for the target platform
   - Step-by-step deployment instructions
   - Warnings and prerequisites
   - Estimated deployment time
4. **Saves to file**: `gemini-strategy.json`

### GitHub Actions Usage

1. **On push/PR**: Workflow automatically triggers
2. **Analyzes changes**: Detects what files changed
3. **Queries Gemini**: Gets AI-powered recommendations
4. **Displays summary**: Shows recommendations in GitHub Actions summary
5. **Optional deployment**: Can execute deployment if configured

## 🎯 Supported Platforms

### Render (Recommended for Free Tier)
- **Free**: 750 hours/month
- **Features**: Auto-deploy, HTTPS, Custom domains
- **Best for**: Web services, APIs, static sites

### Vercel
- **Free**: 100GB bandwidth/month
- **Features**: Instant deploy, Edge network, Analytics
- **Best for**: Frontend apps, Next.js, React

### Surge.sh
- **Free**: Unlimited static hosting
- **Features**: Static hosting, Custom domains, CDN
- **Best for**: Static sites, JAMstack apps

### Coolify
- **Free**: Self-hosted (requires VPS)
- **Features**: Full PaaS, Docker, CI/CD
- **Best for**: Full control, multiple services

### Self-Hosted
- **Free**: Your own server
- **Features**: Docker, Caddy/Nginx, Full control
- **Best for**: Complete control, custom setup

## 📝 Example Output

```json
{
  "platform": "Render",
  "recommendations": [
    "✅ Render is configured for free deployment",
    "📦 Build command: pnpm build",
    "🚀 Deploy script: ./scripts/deploy-render.sh",
    "💰 Cost: FREE",
    "🔧 Required env vars: RENDER_API_TOKEN",
    "📚 Documentation: https://render.com"
  ],
  "steps": [
    "1. Install dependencies: pnpm install",
    "2. Build project: pnpm build",
    "3. Run deployment: ./scripts/deploy-render.sh",
    "4. Verify deployment in platform dashboard",
    "5. Check health endpoints"
  ],
  "warnings": [
    "⚠️  Make sure these environment variables are set: RENDER_API_TOKEN"
  ],
  "estimated_time": 5
}
```

## 🔧 Configuration

### Environment Variables

Set locally:
```bash
export GEMINI_API_KEY=your_key_here
```

Or create `.env` file:
```
GEMINI_API_KEY=your_key_here
```

### Customize Deployment Targets

Edit `scripts/gemini-deployment-assistant.mjs` to add more platforms or customize existing ones.

## 🛠️ Troubleshooting

### "GEMINI_API_KEY not set"
- **Solution**: Set the API key as environment variable or GitHub secret
- **Note**: Script will use fallback recommendations if key is missing

### "Gemini API error"
- **Check**: API key is valid and has quota remaining
- **Check**: Internet connection
- **Fallback**: Script automatically uses intelligent defaults

### "Deployment failed"
- **Check**: Required environment variables are set
- **Check**: Platform-specific tokens are valid
- **Check**: Build succeeds locally first

## 📚 Additional Resources

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Surge.sh Documentation](https://surge.sh/help)
- [Coolify Documentation](https://coolify.io/docs)

## 🎉 Benefits

1. **Intelligent Recommendations**: AI analyzes your specific project
2. **Free Deployment**: All platforms support free tiers
3. **Automated**: GitHub Actions integration for CI/CD
4. **Context-Aware**: Understands your codebase structure
5. **Fallback Safe**: Works even without API key

## 📄 License

CC0-1.0 - Public Domain

---

**Part of Cathedral of Circuits - Magnum Opus Version 1.0**  
**Liber Arcanae Codex Abyssiae**

