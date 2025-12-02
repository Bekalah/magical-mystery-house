# Workflow Organization

## Current Workflows

### 1. `ci.yml` - Continuous Integration
**Purpose**: Run tests, linting, type checking, and build verification
**Triggers**: Push to main/master/develop, PRs, manual
**Status**: ✅ Fixed - pnpm store caching now uses step outputs correctly

### 2. `deploy.yml` - Build and Deploy
**Purpose**: Full build and deploy to GitHub Pages
**Triggers**: Push to main/master, PRs
**Jobs**: 
  - `build`: Builds the project
  - `deploy`: Deploys to GitHub Pages
**Status**: ✅ Fixed - pnpm store caching now uses step outputs correctly

### 3. `deploy-docs.yml` - Deploy Documentation Only
**Purpose**: Deploy documentation when docs change
**Triggers**: Push to main/master (only when docs/ or README.md change), manual
**Status**: ✅ Fixed - pnpm store caching now uses step outputs correctly
**Note**: Different from `deploy.yml` - this only runs when docs change

### 4. `deploy-vercel.yml` - Deploy to Vercel
**Purpose**: Deploy to Vercel
**Triggers**: Push to main/master, manual
**Status**: ✅ Uses built-in pnpm cache (no manual store path needed)

### 5. `publish.yml` - Publish Packages
**Purpose**: Publish packages to npm on release
**Triggers**: Release created, manual
**Status**: ✅ Uses built-in pnpm cache (no manual store path needed)

### 6. `test-workflow.yml` - Test Workflow
**Purpose**: Simple test workflow
**Status**: ⚠️ Redundant - Consider removing or merging into ci.yml

## Fixes Applied

### Bug 1: pnpm Store Directory Caching
**Issue**: Steps were using `${{ env.STORE_PATH }}` or missing `id`, causing cache failures
**Fix**: 
- Added `id: pnpm-store` to all relevant steps
- Changed to use `${{ steps.pnpm-store.outputs.path }}` consistently
- Removed redundant `GITHUB_ENV` writes

**Files Fixed**:
- ✅ `ci.yml` - Now uses step outputs
- ✅ `deploy.yml` - Cleaned up to use only outputs
- ✅ `deploy-docs.yml` - Cleaned up to use only outputs

### Bug 2: Node Version Inconsistency
**Issue**: `liber-arcanae-tarot` had `"node": "25.0.0"` while workflows use `25.2`
**Fix**: Changed to `"node": "*"` to match other packages and allow flexible versions

**File Fixed**:
- ✅ `apps/liber-arcanae-tarot/package.json`

## Recommendations

1. **Remove or merge `test-workflow.yml`** - It's redundant with `ci.yml`
2. **Consider consolidating** `deploy.yml` and `deploy-docs.yml` if they serve similar purposes
3. **All workflows now use consistent pnpm caching pattern**

## Workflow Naming Convention

- `ci.yml` - Continuous Integration
- `deploy-*.yml` - Deployment workflows (specific targets)
- `publish.yml` - Package publishing
- All workflows follow consistent naming and structure

