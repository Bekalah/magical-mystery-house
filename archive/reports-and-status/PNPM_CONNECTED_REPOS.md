# 📦 PNPM Workspace Connected Repositories

## PNPM Workspace Configuration

The monorepo uses **pnpm workspaces** to connect packages locally within this repository.

### Workspace Structure
```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

**Note**: External repositories are NOT connected via pnpm workspace to avoid duplicate package conflicts. They are integrated via:
- Git remotes (20 remotes configured)
- Integration tools (workspace integrator)
- Package dependencies (workspace:* protocol)

## Local PNPM Workspace Packages

All packages in `packages/*` and `apps/*` are connected via pnpm workspace:

### Core Sacred Systems (Local Packages)
- `@cathedral/circuitum99-core` → `packages/circuitum99-core/`
- `@cathedral/codex-144-99` → `packages/codex-144-99/`
- `@cathedral/codex-144-99-core` → `packages/codex-144-99-core/`
- `@cathedral/stone-grimoire` → `packages/stone-grimoire/`
- `@cathedral/stone-grimoire-core` → `packages/stone-grimoire-core/`
- `@cathedral/liber-arcanae` → `packages/liber-arcanae/`
- `@cathedral/liber-arcanae-core` → `packages/liber-arcanae-core/`
- `@cathedral/mystery-house-core` → `packages/mystery-house-core/`
- `@cathedral/cosmogenesis` → `packages/cosmogenesis/`

### Integration Bridges (Local Packages)
- `@cathedral/cathedral-liber-arcanae-bridge` → `packages/cathedral-liber-arcanae-bridge/`
- `@cathedral/cathedral-integration-bridge` → `packages/cathedral-integration-bridge/`
- `@cathedral/tesseract-bridge` → `packages/tesseract-bridge/`

## PNPM Dependency Protocol

Packages use `workspace:*` to reference other local packages:

```json
{
  "dependencies": {
    "@cathedral/codex-144-99": "workspace:*",
    "@cathedral/circuitum99-core": "workspace:*"
  }
}
```

## External Repositories (NOT in PNPM Workspace)

These are connected via **Git remotes only**, not pnpm workspace:

1. **circuitum99** → https://github.com/Bekalah/circuitum99.git
2. **codex_14499** → https://github.com/Bekalah/codex-14499.git
3. **stone_grimoire** → https://github.com/Bekalah/stone-grimoire.git
4. **liber_arcanae** → https://github.com/Bekalah/liber-arcanae.git
5. **magical_mystery_house** → https://github.com/Bekalah/magical-mystery-house.git
6. **cosmogenesis_learning_engine** → https://github.com/Bekalah/cosmogenesis-learning-engine.git
7. **cathedral** → https://github.com/Bekalah/cathedral.git
8. **cathedral_vercel** → https://github.com/Bekalah/cathedral-vercel.git
9. **tesseract_bridge** → https://github.com/Bekalah/tesseract-bridge.git
10. + 11 more remotes

## PNPM Workspace Commands

```bash
# Install all workspace dependencies
pnpm install

# Build all workspace packages
pnpm run build

# Run command in all workspaces
pnpm -r <command>

# Run command in specific workspace
pnpm --filter <package-name> <command>
```

## Connection Status

✅ **All local packages connected via pnpm workspace**
✅ **All packages use workspace:* protocol for internal deps**
✅ **External repos connected via Git remotes (not pnpm workspace)**
✅ **No duplicate package conflicts**

