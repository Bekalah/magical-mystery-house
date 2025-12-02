# Independent Operation Guide

**Author**: Rebecca Respawn  
**License**: CC0-1.0 - Public Domain


**License**: CC0-1.0 - Public Domain (Open Source)


**How to make your codex work independently after Cursor updates**

---

## 🎯 Goal

After using Cursor for updates and patches, your codex should be able to:
- Run maintenance tasks automatically
- Apply patches independently
- Validate itself
- Update references and documentation
- Work without AI assistance

---

## 🔄 Self-Maintenance

### Quick Maintenance

```bash
# Run critical maintenance tasks only
pppnpm run maintain:quick
```

This runs:
- System validation
- Health checks
- Build verification

### Full Maintenance

```bash
# Run all maintenance tasks
pppnpm run maintain:full
```

This runs:
- All validation checks
- Health checks
- Dependency checks
- Code quality checks
- Build verification
- Consistency checks

### Validation Only

```bash
# Just validate the system
pppnpm run maintain:validate
```

---

## 📦 Applying Patches

### Automatic Patch Application

```bash
# Apply all patches in patches/ directory
pppnpm run apply:patches
```

This will:
1. Find all `.json` patch files in `patches/`
2. Create backups of files to be modified
3. Apply patches (replace, append, prepend, delete)
4. Run post-patch commands if specified
5. Move applied patches to `patches/applied/`

### Patch File Format

Create patch files in `patches/` directory:

```json
{
  "version": "1.0.0",
  "description": "Patch description",
  "files": [
    {
      "path": "path/to/file.ts",
      "operation": "replace",
      "content": "file content here"
    },
    {
      "path": "path/to/another.md",
      "operation": "append",
      "content": "additional content"
    }
  ],
  "postPatch": [
    "pppnpm run build",
    "pppnpm run validate:setup"
  ]
}
```

**Operations:**
- `replace` - Replace entire file
- `append` - Add content to end of file
- `prepend` - Add content to beginning of file
- `delete` - Delete file

---

## 🔄 Auto-Update After Cursor

### Run Auto-Update

```bash
# Automatically update after Cursor patches
pppnpm run auto:update
```

This will:
1. Update dependencies (`pppnpm install`)
2. Update file references
3. Consolidate documentation
4. Validate setup
5. Build all packages
6. Check consistency

### Update Log

All updates are logged to `.update-log.json`:
- Timestamp
- Update type
- Description
- Success/failure status

View recent updates:
```bash
cat .update-log.json | jq '.updates[-5:]'
```

---

## 🛠️ Complete Workflow

### After Cursor Updates

1. **Apply patches** (if any):
   ```bash
   pppnpm run apply:patches
   ```

2. **Auto-update**:
   ```bash
   pppnpm run auto:update
   ```

3. **Self-maintenance**:
   ```bash
   pppnpm run maintain:full
   ```

4. **Verify**:
   ```bash
   pppnpm run health:check
   ```

### Daily Maintenance

```bash
# Quick check
pppnpm run maintain:quick
```

### Weekly Maintenance

```bash
# Full maintenance
pppnpm run maintain:full
```

---

## 📋 Maintenance Checklist

After Cursor updates, verify:

- [ ] Dependencies updated (`pppnpm install`)
- [ ] File references updated (`pppnpm run update:references`)
- [ ] Documentation consolidated (`pppnpm run consolidate:docs`)
- [ ] System validated (`pppnpm run validate:setup`)
- [ ] Build successful (`pppnpm run build`)
- [ ] Health check passed (`pppnpm run health:check`)
- [ ] Consistency checked (`pppnpm run check:consistency`)

---

## 🔧 Troubleshooting

### If Maintenance Fails

1. Check error messages
2. Review `.update-log.json` for recent failures
3. Check backups in `.backups/` directory
4. Run individual steps manually:
   ```bash
   pppnpm run validate:setup
   pppnpm run health:check
   pppnpm run build
   ```

### If Patches Fail

1. Check patch file format (must be valid JSON)
2. Verify file paths in patch are correct
3. Check backups in `.backups/` directory
4. Review patch file for errors

### If Auto-Update Fails

1. Check which step failed
2. Review `.update-log.json`
3. Run failed step manually
4. Continue with remaining steps

---

## 📚 Related Commands

- `pppnpm run maintain:quick` - Quick maintenance
- `pppnpm run maintain:full` - Full maintenance
- `pppnpm run maintain:validate` - Validation only
- `pppnpm run apply:patches` - Apply patches
- `pppnpm run auto:update` - Auto-update after Cursor
- `pppnpm run health:check` - Health check
- `pppnpm run validate:setup` - Validate setup

---

## ✅ Success Indicators

Your codex is working independently when:

- ✅ All maintenance tasks pass
- ✅ Build succeeds without errors
- ✅ Health check shows all systems operational
- ✅ No critical failures in update log
- ✅ All patches applied successfully
- ✅ File references are up to date
- ✅ Documentation is consolidated

---

**Your codex is now ready to work independently after Cursor updates!**

