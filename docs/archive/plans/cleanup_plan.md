# Cleanup Plan - Repository Consolidation


# ⚗️ Cleanup_plan

**In the alchemical tradition, this grimoire contains the sacred knowledge**
**and principles that guide the transformation of base materials into gold.**

---

## Overview
Plan to clean up duplicate repos, consolidate into monorepo, and organize for GitLab migration.

## Repos to Keep (Core Sacred Systems)
1. **circuitum99** - Core system
2. **codex-14499** - Codex system
3. **stone-grimoire** - Grimoire system
4. **liber-arcanae** - Liber Arcanae system
5. **magical-mystery-house** - Mystery house
6. **cosmogenesis-learning-engine** - Learning engine
7. **tesseract-bridge** - Bridge system
8. **cathedral-master** - Master deployment (this repo)

## Repos to Archive/Remove
- Duplicate cathedral repos (consolidate into master)
- Old/archived repos (no activity in 12+ months)
- Experimental repos (merge into main if valuable)

## Migration Steps
1. Mirror all core repos to GitLab
2. Create monorepo structure
3. Use git subtree to preserve history
4. Clean up duplicate remotes
5. Update all paths and configurations

## Path Corrections
- All core systems → `packages/`
- All apps → `apps/`
- Remove duplicate `.remote-repos/` entries
- Standardize package.json paths

