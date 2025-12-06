# ⚗️ Cathedral of Circuits - Updated Instructions

**Magnum Opus Version 1.0**  
**Author: Rebecca Respawn**

## ✅ Recent Cleanup

The root directory has been organized:

- ✅ Reports moved to `archive/reports-and-status/`
- ✅ Old scripts moved to `archive/old-scripts/`
- ✅ Old docs moved to `archive/old-docs/`
- ✅ Archived configs moved to `archive/old-configs/`
- ✅ Temporary/experiment files removed
- ✅ Root directory cleaned up

## 📁 Current Root Structure

Only essential files remain in root:

**Configuration Files:**
- `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`
- `tsconfig.json`, `turbo.json`
- `Dockerfile`, `docker-compose.yml`
- `Caddyfile`, `nginx.conf`

**Documentation:**
- `README.md` (updated)
- `CONTRIBUTING.md`
- `LICENSE`
- `SELF_HOSTING_QUICK_START.md`

**Directories:**
- `apps/`, `packages/`, `tools/`, `scripts/`
- `docs/`, `archive/`, `data/`
- `dist/`, `node_modules/`, `openspec/`

## 🚀 Quick Commands

```bash
# Development
pnpm install
pnpm dev
pnpm build

# Self-Hosting
pnpm deploy:self-host  # Docker (recommended)
pnpm deploy:caddy      # Caddy
pnpm deploy:nginx      # Nginx

# Maintenance
pnpm cleanup
pnpm security:audit
pnpm maintain
```

## 📚 Documentation Locations

- **Self-hosting**: `SELF_HOSTING_QUICK_START.md`
- **Migration guide**: `docs/CLOUDFLARE_TO_SELF_HOST_MIGRATION.md`
- **Quality standards**: `CATHEDRAL_QUALITY_STANDARDS.md`
- **GitLab setup**: `docs/GITLAB_TOKEN_SETUP.md`
- **Archived reports**: `archive/reports-and-status/`

## 🔄 Migration Status

- ✅ Cloudflare removed (migrated to self-hosting)
- ✅ GitLab migration tools ready
- ✅ Self-hosting configs created
- ✅ Root directory organized

## 📋 Next Steps

1. **Deploy**: Choose hosting option and deploy
   ```bash
   pnpm deploy:self-host
   ```

2. **GitLab**: Clone from GitHub to GitLab
   ```bash
   node tools/clone-github-to-gitlab-no-login.mjs
   ```

3. **Monitor**: Check deployment status
   ```bash
   pnpm deploy:logs
   ```

---

**Part of Cathedral of Circuits - Magnum Opus Version 1.0**

