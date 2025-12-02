# Independent Operation Guide


# ⚗️ INDEPENDENT_OPERATION

**In the alchemical tradition, this grimoire contains the sacred knowledge**
**and principles that guide the transformation of base materials into gold.**

---

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
pnpm run maintain:quick
```

This runs:
- System validation
- Health checks
- Build verification

### Full Maintenance

```bash
# Run all maintenance tasks
pnpm run maintain:full
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
pnpm run maintain:validate
```

---

## 📦 Applying Patches

### Automatic Patch Application

```bash
# Apply all patches in patches/ directory
pnpm run apply:patches
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
    "pnpm run build",
    "pnpm run validate:setup"
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
pnpm run auto:update
```

This will:
1. Update dependencies (`pnpm install`)
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
   pnpm run apply:patches
   ```

2. **Auto-update**:
   ```bash
   pnpm run auto:update
   ```

3. **Self-maintenance**:
   ```bash
   pnpm run maintain:full
   ```

4. **Verify**:
   ```bash
   pnpm run health:check
   ```

### Daily Maintenance

```bash
# Quick check
pnpm run maintain:quick
```

### Weekly Maintenance

```bash
# Full maintenance
pnpm run maintain:full
```

---

## 📋 Maintenance Checklist

After Cursor updates, verify:

- [ ] Dependencies updated (`pnpm install`)
- [ ] File references updated (`pnpm run update:references`)
- [ ] Documentation consolidated (`pnpm run consolidate:docs`)
- [ ] System validated (`pnpm run validate:setup`)
- [ ] Build successful (`pnpm run build`)
- [ ] Health check passed (`pnpm run health:check`)
- [ ] Consistency checked (`pnpm run check:consistency`)

---

## 🔧 Troubleshooting

### If Maintenance Fails

1. Check error messages
2. Review `.update-log.json` for recent failures
3. Check backups in `.backups/` directory
4. Run individual steps manually:
   ```bash
   pnpm run validate:setup
   pnpm run health:check
   pnpm run build
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

- `pnpm run maintain:quick` - Quick maintenance
- `pnpm run maintain:full` - Full maintenance
- `pnpm run maintain:validate` - Validation only
- `pnpm run apply:patches` - Apply patches
- `pnpm run auto:update` - Auto-update after Cursor
- `pnpm run health:check` - Health check
- `pnpm run validate:setup` - Validate setup

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

