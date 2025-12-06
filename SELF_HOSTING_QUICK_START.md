# ⚗️ Free Self-Hosting Quick Start

**Cathedral of Circuits - Magnum Opus Version 1.0**  
**Author: Rebecca Respawn**

## ✅ Migration Complete!

Cloudflare dependencies have been removed and self-hosting configurations created.

## 🚀 Quick Deploy (Choose One)

### Option 1: Docker Compose (Recommended)

```bash
# Build and deploy
pnpm deploy:self-host

# Or step by step
pnpm build
pnpm deploy:docker

# View logs
pnpm deploy:logs

# Stop
pnpm deploy:stop
```

### Option 2: Caddy (Easiest - Auto HTTPS)

```bash
# Install Caddy
brew install caddy  # macOS
# or see: https://caddyserver.com/docs/install

# Start
pnpm deploy:caddy

# Or manually
caddy run
```

### Option 3: Nginx

```bash
# Install Nginx
brew install nginx  # macOS
# or: apt install nginx  # Linux

# Start
pnpm deploy:nginx

# Or manually
sudo nginx -c $(pwd)/nginx.conf
```

## 📋 What Was Changed

- ✅ **6 wrangler.toml files** → Archived (`.archived` suffix)
- ✅ **16 package.json files** → Cloudflare deps removed
- ✅ **New configs created:**
  - `Caddyfile` - Caddy reverse proxy config
  - `nginx.conf` - Nginx reverse proxy config
  - `docker-compose.yml` - Full Docker stack
  - `Dockerfile` - Main app container
  - `apps/worker/Dockerfile` - Worker container

## 🔧 Configuration Files

All configs are ready to use. Just choose your hosting option:

- **Caddy**: Automatic HTTPS, zero config
- **Nginx**: High performance, flexible
- **Docker**: Isolated, scalable, production-ready

## 📚 Full Guide

See: `docs/CLOUDFLARE_TO_SELF_HOST_MIGRATION.md`

## 💰 Cost Savings

| Before (Cloudflare) | After (Self-Hosted) |
|---------------------|---------------------|
| $53/month | $5-50/month (VPS) |
| **Savings: $3-48/month** |

## 🎯 Next Steps

1. ✅ Cloudflare removed
2. ⬜ Choose hosting option (Docker/Caddy/Nginx)
3. ⬜ Set up VPS/server (if needed)
4. ⬜ Update DNS to point to your server
5. ⬜ Deploy: `pnpm deploy:self-host`
6. ⬜ Test your deployment

## 🆘 Troubleshooting

**Port in use?**
```bash
lsof -i :80
kill -9 <PID>
```

**Docker not starting?**
```bash
docker compose logs
docker compose down
docker compose up -d
```

**Need help?**
- Check logs: `pnpm deploy:logs`
- Review config files
- See full guide: `docs/CLOUDFLARE_TO_SELF_HOST_MIGRATION.md`

---

**Part of Cathedral of Circuits - Magnum Opus Version 1.0**



