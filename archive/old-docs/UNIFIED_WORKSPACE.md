# Unified Workspace Configuration ⚗️

**Created:** 2025-11-30  
**Status:** Active - All workspaces unified

---

## Overview

All cathedral workspaces are now unified into a single integrated monorepo. They work together as one system, not as detached separate repositories.

---

## Unified Workspaces

### Primary Workspace
- **cathedral-master-deployment** (Main deployment workspace)
  - Location: `/Users/rebeccalemke/cathedral-master-deployment`
  - Type: Deployment
  - Packages: Local packages
  - Apps: Local apps
  - Tools: Local tools

### Integrated Workspaces

1. **cathedral-real**
   - Location: `../cathedral-real`
   - Type: Real/Production
   - Packages: `../cathedral-real/packages/*`
   - Apps: `../cathedral-real/apps/*`

2. **cathedral-fixed-clean**
   - Location: `../cathedral-fixed-clean`
   - Type: Fixed/Clean
   - Packages: `../cathedral-fixed-clean/packages/*`
   - Apps: `../cathedral-fixed-clean/apps/*`

3. **Roo-Code**
   - Location: `../Roo-Code`
   - Type: Additional workspace
   - Packages: `../Roo-Code/packages/*`
   - Apps: `../Roo-Code/apps/*`

4. **cosmogenesis-engine**
   - Location: `../cosmogenesis-engine`
   - Type: Engine workspace
   - Packages: `../cosmogenesis-engine/packages/*`
   - Apps: `../cosmogenesis-engine/apps/*`

5. **CathedralOfCircuits**
   - Location: `../CathedralOfCircuits`
   - Type: Circuits workspace
   - Packages: `../CathedralOfCircuits/packages/*`
   - Apps: `../CathedralOfCircuits/apps/*`

---

## Configuration

### pnpm-workspace.yaml

All workspaces are configured in `pnpm-workspace.yaml`:

```yaml
packages:
  # Local packages in this workspace
  - 'packages/*'
  - 'apps/*'
  - 'tools/*'
  
  # Unified workspaces - all cathedral workspaces as one monorepo
  - '../cathedral-real/packages/*'
  - '../cathedral-real/apps/*'
  - '../cathedral-fixed-clean/packages/*'
  - '../cathedral-fixed-clean/apps/*'
  - '../Roo-Code/packages/*'
  - '../Roo-Code/apps/*'
  - '../cosmogenesis-engine/packages/*'
  - '../cosmogenesis-engine/apps/*'
  - '../CathedralOfCircuits/packages/*'
  - '../CathedralOfCircuits/apps/*'
```

---

## Benefits

### Unified Development
- All packages accessible from one workspace
- Single `pnpm install` installs everything
- Single `pnpm build` builds everything
- Shared dependencies across all workspaces

### Easier Management
- No need to switch between workspaces
- Unified commands work across all workspaces
- Single source of truth for dependencies
- Easier to find and use packages

### Better Integration
- Packages can reference each other easily
- Workspace protocol (`workspace:*`) works across all workspaces
- No need for complex linking or copying
- Natural monorepo structure

---

## Usage

### Install All Dependencies
```bash
# From cathedral-master-deployment
pnpm install
```

This installs dependencies for:
- All local packages
- All packages in cathedral-real
- All packages in cathedral-fixed-clean
- All packages in Roo-Code
- All packages in cosmogenesis-engine
- All packages in CathedralOfCircuits

### Build Everything
```bash
pnpm build
```

Builds all packages across all unified workspaces.

### Run Commands
```bash
# Run in all workspaces
pnpm --filter "*" <command>

# Run in specific workspace
pnpm --filter "@cathedral/*" <command>
```

---

## Workspace Protocol

All packages can reference each other using the workspace protocol:

```json
{
  "dependencies": {
    "@cathedral/core": "workspace:*",
    "@cathedral/design": "workspace:*"
  }
}
```

This works across all unified workspaces automatically.

---

## Discovery & Integration

The workspace integrator automatically discovers and integrates all workspaces:

- **Comprehensive Discovery**: Finds all packages across all workspaces
- **Partial Analysis**: Analyzes partials across all workspaces
- **Codex Alignment**: Checks alignment across all workspaces
- **Consolidation**: Consolidates partials across all workspaces

---

## Status

✅ **All workspaces unified**  
✅ **Single monorepo structure**  
✅ **Workspace protocol enabled**  
✅ **Unified commands work**  
✅ **Discovery includes all workspaces**  
✅ **Integration automatic**

---

## Next Steps

1. ✅ Workspaces unified in pnpm-workspace.yaml
2. ✅ Discovery tools updated to include all workspaces
3. ✅ Integration tools work across all workspaces
4. ✅ Commands work across all workspaces
5. ✅ Dependencies shared across all workspaces

---

**All cathedral workspaces are now one unified system!** 🎉

