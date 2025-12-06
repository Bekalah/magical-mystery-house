# Repository Guidelines - Cathedral Monorepo

## Structure

```
cathedral-monorepo/
├── packages/           # Core sacred systems
│   ├── circuitum99-core/
│   ├── codex-144-99/
│   ├── stone-grimoire/
│   ├── liber-arcanae/
│   ├── mystery-house-core/
│   └── cosmogenesis/
├── apps/               # Applications
│   ├── liber-arcanae-tarot/
│   ├── web/
│   └── ...
├── tools/              # Development tools
├── scripts/            # Build/CI scripts
└── ci/                 # CI/CD configs
```

## Naming Conventions

- **Packages**: `kebab-case` (e.g., `stone-grimoire`)
- **Apps**: `kebab-case` (e.g., `liber-arcanae-tarot`)
- **Branches**: `kebab-case` (e.g., `feature/add-vessel-system`)
- **Commits**: Conventional commits (e.g., `feat: add vessel system`)

## Git Workflow

1. **Main branch**: `main` (protected)
2. **Feature branches**: `feature/description`
3. **Hotfix branches**: `hotfix/description`
4. **Release branches**: `release/v1.0.0`

## Subtree Management

### Pull updates from source repo
```zsh
git fetch stone-grimoire main
git subtree pull --prefix=packages/stone-grimoire stone-grimoire main
```

### Push changes back to source repo
```zsh
git subtree push --prefix=packages/stone-grimoire stone-grimoire main
```

## Package.json Standards

- **License**: `CC0-1.0`
- **Engines**: `node: "*"`, `pnpm: "*"`
- **Package Manager**: `pnpm@10.23.0`
- **Type**: `module` (for ESM packages)

## CI/CD Standards

- **Node Version**: 25.2
- **Build Tool**: pnpm
- **Heavy Builds**: Self-hosted runner with tag `heavy-build`
- **Deployments**: Vercel, Cloudflare Pages, GitLab Pages

## Code Standards

- **TypeScript**: Strict mode
- **Linting**: ESLint + Prettier
- **Testing**: Vitest
- **License Headers**: CC0-1.0 in all source files

## Theme Alignment

All packages must align with:
- **Mystical**: Esoteric, occult, sacred themes
- **Dark Academia**: Gothic, scholarly, ancient
- **Alchemical**: Alchemy, transmutation, philosopher's stone
- **MonaS Hieroglyphica**: Creative artifact aesthetic

