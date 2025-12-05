# Tech Systems Map


# ⚗️ TECH_SYSTEMS_MAP

**In the alchemical tradition, this grimoire contains the sacred knowledge**
**and principles that guide the transformation of base materials into gold.**

---

**Created**: December 3, 2025  
**Purpose**: Map tech items to their packages and integration points

---

## Overview

This map shows where each tech item lives, which packages use it, and how they integrate.

---

## Tech Item → Package → Integration Points

### Portal Tech
- **Package**: `packages/portal-system/src/PortalTech.ts`
- **Integration Points**:
  - `packages/codex-144-99` - Codex node portals
  - `packages/circuitum99-core` - Circuitum gate portals
  - `packages/godot-liber-arcanae` - Game portal system

### RPG Tech
- **Package**: `packages/game-engine/src/RPGTech.ts`
- **Integration Points**:
  - `packages/godot-liber-arcanae` - Game character system
  - `packages/cathedral-rpg-inventory-system` - Inventory management
  - `packages/liber-arcanae` - Arcana character system

### True Will Tech
- **Package**: `packages/true-will-system/src/TrueWillTech.ts`
- **Integration Points**:
  - `packages/game-engine` - RPG chaos meter
  - `packages/liber-arcanae` - Arcana True Will
  - `packages/godot-liber-arcanae` - Game True Will system
  - `packages/codex-144-99` - Codex alignment
  - `packages/stone-grimoire` - Grimoire True Will

### Witch Eye Tech
- **Package**: `packages/liber-arcanae/src/WitchEyeTech.ts` (to be created)
- **Integration Points**:
  - `packages/liber-arcanae` - Arcanae vision system
  - `packages/godot-liber-arcanae` - Game vision system
  - `packages/stone-grimoire` - Grimoire vision

### Witch Mod Tech
- **Package**: `packages/cathedral-plugin-system/src/WitchModTech.ts` (to be created)
- **Integration Points**:
  - `packages/cathedral-plugin-system` - Plugin management
  - `packages/liber-arcanae` - Arcana mods

### Double Tree Pathworking Tech
- **Package**: `packages/codex-144-99/src/DoubleTreePathworkingTech.ts` (to be created)
- **Integration Points**:
  - `packages/codex-144-99` - Kabbalah pathworking
  - `packages/liber-arcanae` - Tree of Life integration

---

## Package Dependencies

### Shared Dependencies
- `@cathedral/true-will-system` - Used by multiple packages
- `@cathedral/portal-system` - Used by codex and circuitum

### Integration Flow
```
true-will-system → game-engine → godot-liber-arcanae
portal-system → codex-144-99 → circuitum99-core
rpg-tech → game-engine → liber-arcanae
```

---

## Migration Status

- ✅ Portal Tech - Integrated into `packages/portal-system`
- ✅ RPG Tech - Integrated into `packages/game-engine`
- ✅ True Will Tech - Integrated into `packages/true-will-system`
- 🔄 Witch Eye Tech - To be integrated
- 🔄 Witch Mod Tech - To be integrated
- 🔄 Double Tree Pathworking Tech - To be integrated

---

**Last Updated**: December 3, 2025

