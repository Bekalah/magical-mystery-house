# Cloudflare to Free Self-Hosting Migration Guide

**Project**: Cathedral of Circuits - Magnum Opus Version 1.0  
**Author**: Rebecca Respawn

## Overview

This guide helps you migrate from Cloudflare services to free self-hosting alternatives.

## What's Being Replaced

| Cloudflare Service | Self-Hosted Alternative |
|-------------------|------------------------|
| Cloudflare Workers | Node.js server (Docker) |
| Cloudflare Pages | Static file server (Caddy/Nginx) |
| Cloudflare CDN | Local caching (Nginx/Caddy) |
| Cloudflare SSL | Let's Encrypt (Caddy auto) |

## Free Hosting Options

### Option 1: Caddy (Recommended - Easiest)

**Pros:**
- Automatic HTTPS with Let's Encrypt
- Zero-config SSL
- HTTP/2 and HTTP/3 support
- Simple configuration

**Setup:**
```bash
# Install Caddy
# macOS: brew install caddy
# Linux: See https://caddyserver.com/docs/install

# Start with Caddyfile
caddy run

# Or in background
caddy start
```

**Configuration:** `Caddyfile` (already created)

### Option 2: Nginx

**Pros:**
- High performance
- Flexible configuration
- Widely used

**Setup:**
```bash
# Install Nginx
# macOS: brew install nginx
# Linux: apt install nginx

# Start
sudo nginx

# Or use provided config
sudo nginx -c $(pwd)/nginx.conf
```

**Configuration:** `nginx.conf` (already created)

### Option 3: Docker Compose (Recommended for Production)

**Pros:**
- Isolated services
- Easy scaling
- Reproducible
- All-in-one setup

**Setup:**
```bash
# Build and start
docker compose up -d

# View logs
docker compose logs -f

# Stop
docker compose down
```

**Configuration:** `docker-compose.yml` (already created)

### Option 4: Coolify (Full PaaS)

**Pros:**
- Complete PaaS solution
- Git integration
- Auto-deploy
- Dashboard UI

**Setup:**
See: https://coolify.io/docs

## Migration Steps

### 1. Remove Cloudflare Dependencies

```bash
# Run migration tool
node tools/migrate-cloudflare-to-self-host.mjs

# Or manually remove
pnpm remove wrangler @cloudflare/workers-types
```

### 2. Choose Your Hosting Option

Select one of the options above based on your needs.

### 3. Update Environment Variables

Remove Cloudflare-specific variables:
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`
- `WRANGLER_SEND_METRICS`

### 4. Update Build Scripts

Replace wrangler commands:
```json
{
  "scripts": {
    "deploy": "docker compose up -d",  // Instead of "wrangler deploy"
    "dev": "caddy run",                // Instead of "wrangler dev"
    "build": "pnpm build"              // Keep as is
  }
}
```

### 5. Update Domain Configuration

Update DNS to point to your self-hosted server:
- Remove Cloudflare DNS records
- Add A/AAAA records pointing to your server IP
- Caddy will automatically get SSL certificates

### 6. Test Deployment

```bash
# Build
pnpm build

# Start (choose one)
caddy run                    # Option 1: Caddy
sudo nginx -c nginx.conf     # Option 2: Nginx
docker compose up            # Option 3: Docker
```

## Cost Comparison

| Service | Cloudflare | Self-Hosted |
|---------|-----------|-------------|
| Static Hosting | $20/month | $0/month |
| Workers | $5/month | $0/month |
| CDN | $20/month | $0/month |
| SSL | $8/month | $0/month (Let's Encrypt) |
| Server | N/A | $5-50/month (VPS) |
| **Total** | **$53/month** | **$5-50/month** |

**Savings: $3-48/month** (depending on server choice)

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 80
lsof -i :80

# Kill process
kill -9 <PID>
```

### SSL Certificate Issues
- Caddy: Automatically handles Let's Encrypt
- Nginx: Use certbot: `certbot --nginx`

### Worker Not Starting
- Check logs: `docker compose logs worker`
- Verify port 8080 is available
- Check environment variables

## Next Steps

1. ✅ Cloudflare dependencies removed
2. ✅ Configuration files created
3. ⬜ Choose hosting option
4. ⬜ Set up server/VPS
5. ⬜ Update DNS records
6. ⬜ Deploy and test
7. ⬜ Monitor and maintain

## Support

For issues:
- Check logs: `./logs/`
- Review configuration files
- See hosting option documentation

---

**Part of Cathedral of Circuits - Magnum Opus Version 1.0**
