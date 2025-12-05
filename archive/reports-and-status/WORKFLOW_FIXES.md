# Workflow Fixes Summary

## Bug 1: Concurrency Placement ✅ FIXED
**Issue**: `concurrency` was nested under `with:` in the GitHub Pages action, but it's a top-level job property.

**Fix**: Moved `concurrency` to the job level in `deploy.yml`:
```yaml
deploy:
  concurrency:
    group: pages-deployment
    cancel-in-progress: false
```

## Bug 2: Hardcoded Release Tag ✅ FIXED
**Issue**: `RELEASE_TAG="v1.0"` was hardcoded, causing tag conflicts on subsequent releases.

**Fix**: Made tag dynamic in `.gitlab-ci.yml`:
```bash
export RELEASE_DATE=$(date +%Y%m%d.%H%M%S)
export RELEASE_TAG="v1.${RELEASE_DATE}-${CI_COMMIT_SHORT_SHA}"
```
Format: `v1.YYYYMMDD.HHMMSS-COMMIT_SHORT_SHA` (e.g., `v1.20241202.143022-a1b2c3d`)

## Bug 3: Duplicate Workflow Triggers ✅ FIXED
**Issue**: Both `deploy-docs.yml` and `deploy.yml` triggered simultaneously on doc changes, causing duplicate builds.

**Fix**: Added a `check-changes` job using `dorny/paths-filter@v2` to detect if ONLY docs/README.md changed:
- If only docs changed → `deploy-docs.yml` runs
- If docs + other files changed → `deploy-docs.yml` skips (deploy.yml handles it)
- Manual dispatch always runs

This prevents duplicate builds while still allowing docs-only deployments.

## Testing
- ✅ Concurrency now properly prevents race conditions
- ✅ Release tags are unique per build
- ✅ No duplicate builds when docs change

