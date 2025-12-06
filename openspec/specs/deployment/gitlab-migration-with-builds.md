# OpenSpec: GitLab Migration with Build Verification

**Author**: Rebecca Respawn  
**Date**: 2025-12-06  
**Version**: 1.0  
**Status**: Active  
**License**: CC0-1.0 - Public Domain

## Overview

Safe migration from GitHub to GitLab with full build verification and OpenSpec compliance.

## Objectives

1. ✅ Migrate repository from GitHub to GitLab safely
2. ✅ Verify all builds pass before migration
3. ✅ Archive old Docker configurations
4. ✅ Ensure OpenSpec/spec-kit compliance
5. ✅ Maintain build integrity throughout migration

## Scope

### In Scope
- GitHub → GitLab repository migration
- Build verification (React + Vite + Turbo)
- Docker configuration archival
- OpenSpec documentation
- GitLab CI/CD pipeline setup

### Out of Scope
- Database migrations
- External service migrations (separate spec)
- DNS changes (separate spec)

## Architecture

### Migration Flow

```
1. Pre-Migration Verification
   ├── Full build test
   ├── Test suite run
   └── Build artifact verification

2. Docker Configuration Organization
   ├── Archive old Docker files
   └── Organize active configurations

3. GitLab Setup
   ├── Repository creation
   ├── CI/CD configuration
   └── Branch protection

4. Safe Migration
   ├── Branch-by-branch migration
   ├── Build verification per branch
   └── Artifact preservation

5. Post-Migration Verification
   ├── Full CI/CD pipeline test
   ├── Build verification
   └── Deployment test
```

## Build Verification Requirements

### Pre-Migration Checks
- [x] All Turbo builds pass
- [x] All Vite apps build successfully
- [x] TypeScript compilation passes
- [x] Linting passes (warnings allowed)
- [x] Test suite passes (if applicable)

### Build Commands
```bash
pnpm install --frozen-lockfile
pnpm build                    # Turbo builds all packages/apps
pnpm type-check               # TypeScript verification
pnpm lint                     # Code quality check
```

### Verification Artifacts
- Build outputs in `apps/*/dist`
- Package outputs in `packages/*/dist`
- Build logs saved to `archive/migration-builds/`

## Docker Configuration Management

### Files to Archive
- Old `docker-compose.yml` (if exists)
- Legacy `Dockerfile` files
- Old deployment configurations

### Active Configurations
- `docker-compose.yml` (current)
- `Dockerfile.coolify` (Coolify deployment)
- `Dockerfile` (production)
- `coolify.yml` (Coolify stack)

### Archive Location
```
archive/docker-configs/
├── old-docker-compose.yml
├── old-Dockerfile.*
└── migration-timestamp/
```

## Migration Procedure

### Phase 1: Pre-Migration
1. Run full build verification
2. Archive Docker configurations
3. Create OpenSpec documentation
4. Backup current state

### Phase 2: GitLab Setup
1. Create GitLab repository
2. Set up CI/CD variables
3. Configure branch protection
4. Test GitLab connectivity

### Phase 3: Migration
1. Push main branch with build verification
2. Verify builds in GitLab CI/CD
3. Migrate other branches one-by-one
4. Verify each branch builds

### Phase 4: Post-Migration
1. Verify all builds pass in GitLab
2. Test deployment pipelines
3. Update documentation
4. Archive migration artifacts

## OpenSpec Compliance

### Documentation
- All changes documented in OpenSpec format
- Migration spec created (this document)
- Build verification spec included
- Rollback procedures documented

### Change Management
- Changes tracked in `openspec/spec-kit/changes/`
- Version history maintained
- Impact analysis documented

## Risk Mitigation

### Risks
1. Build failures during migration
2. Lost Git history
3. Broken CI/CD pipelines
4. Missing dependencies

### Mitigation
- Full build verification before migration
- Branch-by-branch migration
- Build artifact preservation
- Rollback procedures documented

## Rollback Procedures

If migration fails:
1. Revert GitLab repository to GitHub
2. Restore Docker configurations from archive
3. Re-run build verification
4. Document issues in OpenSpec

## Success Criteria

- [x] All builds pass locally
- [ ] All builds pass in GitLab CI/CD
- [ ] All branches migrated successfully
- [ ] Docker configurations organized
- [ ] OpenSpec documentation complete
- [ ] Deployment pipelines working

## Related Specs

- `openspec/specs/deployment/gitlab-ci-cd.md`
- `openspec/specs/build/turbo-vite-builds.md`
- `openspec/specs/docker/deployment-configs.md`

---

**Part of Cathedral of Circuits - Magnum Opus Version 1.0**

