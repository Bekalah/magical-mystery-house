# ⚗️ INTEGRATION_GUIDE

**In the alchemical tradition, this grimoire contains the sacred knowledge**
**and principles that guide the transformation of base materials into gold.**

---

/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */
# Integration Guide - Incorporating Files Better

**This guide helps you incorporate all files into the consolidated structure.**

---

## 🎯 Purpose

This guide shows you how to:
1. Update all references to use new consolidated locations
2. Ensure all tools and scripts work with the new structure
3. Verify data integration across all systems
4. Maintain consistency across the codebase

---

## 📋 Step 1: Update File References

All old root-level documentation files have been moved to organized `docs/` subdirectories.

### Quick Update Command

```bash
# Update all references automatically
pnpm run update:references
```

This will:
- Find all files that reference old paths
- Update them to point to new consolidated locations
- Preserve relative path calculations
- Update markdown links, code references, and file paths

### Manual Reference Map

See [REFERENCE_MAP.md](REFERENCE_MAP.md) for complete mapping of:
- Old file locations → New consolidated locations
- Category organization
- Quick reference guide

---

## 📁 Step 2: Verify New Structure

### Documentation Organization

```
docs/
├── guides/          # How-to guides and tutorials
├── info/            # System information and inventories
├── status/          # Current status reports
├── integration/     # Integration documentation
├── github/          # GitHub setup and troubleshooting
├── cleanup/         # Cleanup and organization docs
├── rebranding/      # Rebranding documentation
└── tools/           # Tool documentation
```

### OpenSpec Organization

```
openspec/
├── AGENTS.md        # AI agent instructions
├── project.md       # Project definition
├── spec-kit/        # Specification management
└── README.md        # OpenSpec guide
```

---

## 🔍 Step 3: Check Your Data Integration

### System Inventory

```bash
# Generate complete system inventory
pnpm run inventory
```

This creates:
- `docs/info/system-inventory.md` - Complete inventory (5,369 lines)
- `docs/info/inventory-summary.md` - Quick reference

### Status Reports

Check current status:
- `docs/status/experiment.md` - Experiment status
- `docs/status/workspace-integration.md` - Integration status

### Integration Documentation

Review integration docs:
- `docs/integration/checklist.md` - Integration checklist
- `docs/integration/fixes.md` - Integration fixes
- `docs/integration/extraction.md` - Extraction summary

---

## 🛠️ Step 4: Update Your Tools

### Tools That Reference Files

These tools have been updated to use new paths:
- `tools/monitor-experiment.mjs` - Uses `docs/status/experiment.md`
- `tools/experiment-status.mjs` - Uses consolidated status files
- `tools/inventory-system.mjs` - Outputs to `docs/info/`

### Verify Tool Updates

```bash
# Check all tools work correctly
pnpm run health:check
pnpm run validate:all
```

---

## 📊 Step 5: Data Integration Checklist

- [ ] All file references updated (`pnpm run update:references`)
- [ ] Reference map created (`pnpm run create:reference-map`)
- [ ] System inventory generated (`pnpm run inventory`)
- [ ] All tools tested (`pnpm run health:check`)
- [ ] Documentation reviewed (`docs/README.md`)
- [ ] OpenSpec structure verified (`openspec/README.md`)

---

## 🔄 Step 6: Continuous Integration

### Keep References Updated

When adding new files:
1. Place them in appropriate `docs/` subdirectory
2. Update `REFERENCE_MAP.md` if needed
3. Run `pnpm run update:references` to update all references

### Maintain Structure

- Follow the organized directory structure
- Use OpenSpec for change management
- Keep documentation in `docs/`
- Keep specifications in `openspec/spec-kit/`

---

## 📚 Quick Reference

### Common Commands

```bash
# Update all references
pnpm run update:references

# Create reference map
pnpm run create:reference-map

# Generate inventory
pnpm run inventory

# Consolidate docs
pnpm run consolidate:docs

# Check everything
pnpm run check:all
```

### Key Files

- **Reference Map**: `docs/REFERENCE_MAP.md`
- **System Inventory**: `docs/info/system-inventory.md`
- **OpenSpec Guide**: `openspec/README.md`
- **Main README**: `README.md`

---

## ✅ Verification

After updating references, verify:

1. **All links work**: Check markdown links in documentation
2. **Tools function**: Run `pnpm run health:check`
3. **Build succeeds**: Run `pnpm run build`
4. **Tests pass**: Run `pnpm run test` (if available)

---

**This guide helps you incorporate all files into the consolidated structure, ensuring everything is properly integrated and accessible.**

