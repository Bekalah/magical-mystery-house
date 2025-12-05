# Boundary Rules Fix - pnpm-lock.yaml

**Date**: 2025-12-01  
**Issue**: Contradiction in boundary rules regarding pnpm-lock.yaml

---

## Issue Verified ✅

**Problem**: 
- Line 15 of `.boundary-rules.md` stated: `**MUST NOT**: pnpm-lock.yaml files`
- This contradicts the requirement for pnpm-only package management
- `pnpm-lock.yaml` is **essential** for pnpm to function correctly
- Without it, pnpm cannot ensure reproducible dependency locking
- This would break all pnpm workflows

---

## Fix Applied ✅

### Changed:
```diff
- **MUST NOT**: pnpm-lock.yaml files
+ **MUST**: Include pnpm-lock.yaml file (required for reproducible builds)
+ **MUST NOT**: package-lock.json, yarn.lock, or other lockfiles
```

### Result:
- ✅ **MUST** include `pnpm-lock.yaml` (required)
- ✅ **MUST NOT** include other lockfiles (npm, yarn, etc.)
- ✅ Clear requirement for pnpm lockfile
- ✅ No contradiction with pnpm-only rule

---

## Why pnpm-lock.yaml is Required

1. **Reproducible Builds**: Locks exact dependency versions
2. **CI/CD Reliability**: Ensures consistent installs across environments
3. **Team Collaboration**: Everyone gets same dependency versions
4. **Security**: Prevents unexpected dependency updates
5. **Performance**: Enables faster installs with cached dependencies

---

## Updated Rule

### 2. PNPM ONLY
- **MUST**: Use pnpm for all package management
- **MUST**: Include pnpm-lock.yaml file (required for reproducible builds)
- **MUST NOT**: npm, yarn, or any other package manager
- **MUST NOT**: npm references in scripts, workflows, or configs
- **MUST NOT**: package-lock.json, yarn.lock, or other lockfiles

---

*Fix verified and experiment restarted.*

