# ⚗️ Cathedral of Circuits - Magnum Opus Version 1.0

**Liber Arcanae Codex Abyssiae**

> A comprehensive monorepo for the Cathedral of Circuits project, featuring game development, design tools, codex systems, and more.

**Author**: Rebecca Respawn (pen name)  
**License**: CC0-1.0 - Public Domain  
**Repository**: [GitLab](https://gitlab.com/bekalah/cathedral-of-circuits-magnum-opus-v1)

---

## 🚀 Quick Start

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev          # Start all dev servers
pnpm build        # Build all packages
pnpm lint         # Lint all packages
pnpm test         # Run all tests
```

### Deployment Options

**🤖 AI-Powered Deployment (NEW!):**
```bash
# Get Gemini AI assistance for deployment
pnpm deploy:gemini:render    # Render (750 free hours/month)
pnpm deploy:gemini:surge     # Surge.sh (Unlimited static)
pnpm deploy:gemini:coolify   # Coolify (Self-hosted)
pnpm deploy:gemini:self-host  # Self-hosted
```

**Free Hosting (Recommended):**
```bash
# Surge.sh (Static hosting - Free)
pnpm deploy:surge

# Coolify (Self-hosted PaaS - Free if you have VPS)
pnpm deploy:coolify

# Local Docker
pnpm deploy:self-host
```

**Local Self-Hosting:**
```bash
# Caddy (Auto HTTPS)
pnpm deploy:caddy

# Nginx (High Performance)
pnpm deploy:nginx

# View logs
pnpm deploy:logs

# Stop services
pnpm deploy:stop
```

**GitLab CI/CD:**
- Push to GitLab → Automatic build → Deploy to Surge/Coolify
- See: [docs/GITLAB_DEPLOYMENT_GUIDE.md](./docs/GITLAB_DEPLOYMENT_GUIDE.md)

See: [SELF_HOSTING_QUICK_START.md](./SELF_HOSTING_QUICK_START.md)

---

## 📦 Project Structure

```
.
├── apps/              # Applications
│   ├── web/          # Main web app
│   └── worker/       # API/Worker service
├── packages/          # Shared packages
│   ├── game-engine/  # Game engine core
│   ├── design-tools/ # Design system
│   └── ...
├── tools/            # Development tools
├── scripts/          # Build/utility scripts
├── docs/             # Documentation
└── archive/          # Archived reports/configs
```

---

## 🏗️ Architecture

### Trinity System: Spiritus/Animus/Corpus

- **Spiritus**: Divine intellect, codex systems, sacred mathematics
- **Animus**: Creative expression, art, music, synthesis
- **Corpus**: Material manifestation, game engine, UI, interaction

### Tech Stack

- **Monorepo**: Turbo v1, pnpm
- **Frontend**: React 18, TypeScript
- **Game**: Godot 4.5, Rust, Three.js
- **Deployment**: Docker, Caddy/Nginx
- **Version Control**: GitLab

---

## 📚 Documentation

- [GEMINI_SETUP_QUICKSTART.md](./GEMINI_SETUP_QUICKSTART.md) - 🤖 **NEW!** Gemini AI Deployment Assistant setup
- [docs/GEMINI_DEPLOYMENT_SETUP.md](./docs/GEMINI_DEPLOYMENT_SETUP.md) - Complete Gemini integration guide
- [SELF_HOSTING_QUICK_START.md](./SELF_HOSTING_QUICK_START.md) - Self-hosting guide
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
- [CATHEDRAL_QUALITY_STANDARDS.md](./CATHEDRAL_QUALITY_STANDARDS.md) - Quality standards

---

## 🛠️ Common Commands

### Development

```bash
pnpm dev              # Start dev servers
pnpm build            # Build all
pnpm lint             # Lint all
pnpm type-check       # Type check
pnpm test             # Run tests
pnpm clean            # Clean builds
```

### Project Management

```bash
pnpm cathedral        # Cathedral CLI
pnpm alchemy          # Alchemy tools
pnpm codex            # Codex tools
pnpm pipeline         # CI/CD pipeline
```

### Quality & Maintenance

```bash
pnpm security:audit   # Security audit
pnpm security:fix     # Fix security issues
pnpm maintain         # Full maintenance
pnpm cleanup          # Clean up files
```

### Migration & Setup

```bash
pnpm gitlab:prepare          # Prepare GitLab migration
pnpm enhance:golden-standard # Apply Golden Standard
pnpm trinity:integrate       # Integrate Trinity system
```

---

## 🎮 Game Development

The project includes a complete game engine with:

- **Marbles and Medallions** boon system
- **Codex 144:99** game engine
- **Arcanae Character System**
- **Trauma-safe design**

See `packages/game-engine/` for details.

---

## 🎨 Design System

**Cathedral Quality Standards**: A+ engineering, Golden Standard Alchemy/Hermetica/Neo-Platonic theme.

See [CATHEDRAL_QUALITY_STANDARDS.md](./CATHEDRAL_QUALITY_STANDARDS.md)

---

## 🔄 GitLab Migration

To clone from GitHub to GitLab without login:

```bash
node tools/clone-github-to-gitlab-no-login.mjs
```

See [docs/GITLAB_TOKEN_SETUP.md](./docs/GITLAB_TOKEN_SETUP.md) for details.

---

## 📝 License

CC0-1.0 - Public Domain

---

**Part of Cathedral of Circuits - Magnum Opus Version 1.0**  
**Liber Arcanae Codex Abyssiae**

