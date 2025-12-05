# 📦 PNPM Workspace Connections Only

## PNPM Workspace Structure

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

## Local Packages Connected via PNPM Workspace

All packages in `packages/*` and `apps/*` are part of the pnpm workspace.

### Total Packages
- **packages/**: ~120+ packages
- **apps/**: All apps in apps/ directory

### PNPM Workspace Protocol

Packages reference each other using `workspace:*`:

```json
{
  "dependencies": {
    "@cathedral/package-name": "workspace:*"
  }
}
```

## Key PNPM Workspace Packages

### Core Systems
- `packages/circuitum99-core/`
- `packages/codex-144-99/`
- `packages/codex-144-99-core/`
- `packages/stone-grimoire/`
- `packages/stone-grimoire-core/`
- `packages/liber-arcanae/`
- `packages/liber-arcanae-core/`
- `packages/mystery-house-core/`
- `packages/cosmogenesis/`

### Integration
- `packages/cathedral-integration-bridge/`
- `packages/cathedral-liber-arcanae-bridge/`
- `packages/tesseract-bridge/`

## PNPM Commands

```bash
# Install all workspace packages
pnpm install

# Build all workspaces
pnpm run build

# Run in all workspaces
pnpm -r <command>

# Run in specific workspace
pnpm --filter <package> <command>
```

## Important Note

**External repositories are NOT in pnpm workspace** - they are connected via:
- Git remotes (20 remotes)
- Integration tools
- NOT via pnpm workspace (to avoid conflicts)

Only **local packages** in `packages/*` and `apps/*` are in the pnpm workspace.

