# ⚗️ GitLab CI/CD + Free Deployment Guide

**Cathedral of Circuits - Magnum Opus Version 1.0**  
**React + Vite + Turbo Monorepo**  
**Author: Rebecca Respawn**

## 🎯 Overview

This guide covers deploying your React + Vite + Turbo monorepo to GitLab with free hosting options:

- **Surge.sh** - Free static hosting (recommended for quick setup)
- **Coolify** - Self-hosted PaaS (free if you have a VPS/server)

## 📋 Prerequisites

1. ✅ GitLab repository set up
2. ✅ React + Vite apps in `apps/` directory
3. ✅ Turbo configured (`turbo.json`)
4. ✅ pnpm workspace configured

## 🚀 GitLab CI/CD Setup

### 1. Push to GitLab

```bash
# If not already on GitLab
node tools/clone-github-to-gitlab-no-login.mjs

# Or manually
git remote add gitlab https://gitlab.com/bekalah/cathedral-of-circuits-magnum-opus-v1.git
git push gitlab main
```

### 2. Configure GitLab CI/CD Variables

Go to: **Settings → CI/CD → Variables**

Add these variables:

**For Surge:**
- `SURGE_TOKEN` - Your Surge token (get from `surge token`)
- `SURGE_DOMAIN` - Your domain (e.g., `cathedral-of-circuits.surge.sh`)

**For Coolify (if using):**
- `COOLIFY_HOST` - Your Coolify server IP/domain
- `COOLIFY_SSH_PRIVATE_KEY` - SSH key for Coolify server
- `COOLIFY_DOMAIN` - Your domain (e.g., `cathedral.yourdomain.com`)

## 🌊 Option 1: Deploy to Surge (Easiest)

Surge is **completely free** for static sites.

### Setup Surge Locally (One-Time)

```bash
npm install -g surge

# Login to Surge
surge

# Get your token
surge token
```

### Add Token to GitLab

1. Go to GitLab: **Settings → CI/CD → Variables**
2. Add variable:
   - Key: `SURGE_TOKEN`
   - Value: (paste your token)
   - Protected: ✅
   - Masked: ✅

### Deploy

The pipeline will automatically:
1. Build your React + Vite app with Turbo
2. Create artifacts in `apps/web/dist`
3. Deploy to Surge (manual trigger)

**In GitLab:**
- Go to **CI/CD → Pipelines**
- Click **Run pipeline**
- Select **main** branch
- Manually trigger `deploy:surge` job

### Manual Deployment

```bash
# Build locally
pnpm build

# Deploy
cd apps/web/dist
surge . cathedral-of-circuits.surge.sh --token YOUR_TOKEN
```

## 🐳 Option 2: Deploy to Coolify (Self-Hosted)

Coolify is **free** if you have a VPS/server.

### Setup Coolify

1. **Install Coolify** on your server:
   ```bash
   curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
   ```

2. **Access Coolify** dashboard at `http://your-server-ip:8000`

3. **Create a new project** in Coolify

4. **Connect GitLab** repository

### Configure GitLab CI/CD for Coolify

Add GitLab variables:
- `COOLIFY_HOST` - Your server IP
- `COOLIFY_SSH_PRIVATE_KEY` - SSH private key
- `COOLIFY_DOMAIN` - Your domain

### Deploy

1. **Via Coolify Dashboard:**
   - Create new resource
   - Select "Docker Compose"
   - Point to `coolify.yml`
   - Deploy

2. **Via GitLab CI/CD:**
   - Pipeline builds Docker image
   - Pushes to Coolify (configure webhook)

### Docker Compose Deployment

```bash
# Build and deploy
docker compose -f coolify.yml up -d

# View logs
docker compose -f coolify.yml logs -f
```

## 📝 Pipeline Configuration

The `.gitlab-ci.yml` includes:

- ✅ **Setup**: Install dependencies with pnpm
- ✅ **Quality**: Lint and type-check
- ✅ **Build**: Build all apps with Turbo
- ✅ **Deploy**: Deploy to Surge or Coolify

### Pipeline Stages

1. **setup** - Install dependencies
2. **quality** - Lint and type-check (can fail)
3. **build** - Build with Turbo
4. **deploy** - Deploy to chosen platform

### Building Specific Apps

The pipeline builds `apps/web` by default. To build other apps:

Edit `.gitlab-ci.yml`:
```yaml
build:web:
  script:
    - pnpm turbo build --filter=apps/your-app-name
```

## 🔧 Troubleshooting

### Build Fails

```bash
# Test locally
pnpm install
pnpm build

# Check Turbo cache
pnpm turbo build --filter=apps/web --force
```

### Surge Deployment Fails

1. Check token is correct in GitLab variables
2. Verify domain is available
3. Check build artifacts exist in `apps/web/dist`

### Coolify Deployment Fails

1. Verify SSH key has access
2. Check Coolify server is running
3. Verify Docker is installed on Coolify server

### Turbo Build Issues

```bash
# Clear Turbo cache
pnpm turbo clean

# Rebuild
pnpm build
```

## 🎯 Quick Start Commands

```bash
# Setup Surge token
surge token  # Copy token to GitLab variables

# Test build locally
pnpm build

# Test Surge deployment locally
cd apps/web/dist
surge . your-domain.surge.sh

# Test Coolify locally
docker compose -f coolify.yml up -d
```

## 📊 Deployment Status

Check deployment status:
- **GitLab**: CI/CD → Pipelines
- **Surge**: https://surge.sh/dashboard
- **Coolify**: Your Coolify dashboard

## 🔗 Useful Links

- **Surge**: https://surge.sh
- **Coolify**: https://coolify.io
- **GitLab CI/CD Docs**: https://docs.gitlab.com/ee/ci/
- **Turbo Docs**: https://turbo.build/repo/docs

## 💰 Cost Comparison

| Service | Cost | Notes |
|---------|------|-------|
| **Surge** | **FREE** | Static sites only, 200MB storage |
| **Coolify** | **FREE** | Requires VPS (~$5-10/month) |
| **GitLab Pages** | **FREE** | 400GB/month bandwidth |

## ✅ Next Steps

1. ✅ Push code to GitLab
2. ✅ Set up GitLab CI/CD variables
3. ✅ Choose deployment option (Surge or Coolify)
4. ✅ Run pipeline and deploy
5. ✅ Verify deployment works

---

**Part of Cathedral of Circuits - Magnum Opus Version 1.0**





