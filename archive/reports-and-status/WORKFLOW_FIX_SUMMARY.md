# GitHub Actions Workflow Race Condition Fix

**Date**: 2025-12-01  
**Issue**: Race condition between `deploy.yml` and `deploy-docs.yml`

---

## Issue Verified ✅

**Problem**: 
- Both workflows triggered on any push to `main`/`master`
- `deploy.yml` had no path restrictions
- When docs changed, both workflows started simultaneously
- Even with concurrency group, build jobs ran in parallel causing redundant builds

---

## Fix Applied ✅

### Changes to `deploy.yml`:

1. **Added `check-changes` job**
   - Detects if only docs changed vs other files
   - Uses `dorny/paths-filter@v2` to analyze changed paths

2. **Modified `build` job**
   - Now depends on `check-changes`
   - **Skips** if ONLY docs/README.md changed
   - **Runs** if other files changed (even if docs also changed)
   - **Runs** for pull requests

3. **Modified `deploy` job**
   - Now depends on both `build` and `check-changes`
   - Only runs if build succeeded
   - Still uses concurrency group `pages-deployment`

### Changes to `deploy-docs.yml`:

1. **Already had correct logic**
   - Only runs if ONLY docs/README.md changed
   - Uses same concurrency group
   - Now actually deploys (was previously just preparing)

---

## Result

### When ONLY docs change:
- ✅ `deploy.yml` → **skips** (build job skipped)
- ✅ `deploy-docs.yml` → **runs** and deploys

### When other files change:
- ✅ `deploy.yml` → **runs** and deploys
- ✅ `deploy-docs.yml` → **skips** (condition not met)

### When both docs and other files change:
- ✅ `deploy.yml` → **runs** and deploys (handles everything)
- ✅ `deploy-docs.yml` → **skips** (other-files detected)

---

## Benefits

1. **No redundant builds** - Only one workflow builds per push
2. **No race conditions** - Concurrency group ensures only one deployment
3. **Efficient** - Right workflow runs for right changes
4. **Clear separation** - Docs-only changes handled by docs workflow

---

*Fix verified and experiment restarted.*

