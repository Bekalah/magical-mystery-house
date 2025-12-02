# Godot 4.5 Setup Guide

## Version Locked: Godot 4.5

All Cathedral Godot packages are configured for **Godot 4.5**.

## Installation

1. Download Godot 4.5 from: https://godotengine.org/download
2. Extract to your preferred location
3. Add to PATH (optional but recommended)

## System Requirements

### Windows
- OS: Windows 7 or later (64-bit)
- CPU: x86_64 or ARM64
- RAM: 4 GB minimum, 8 GB recommended
- GPU: DirectX 11/12 compatible

### macOS
- OS: macOS 10.14 or later
- CPU: x86_64 or Apple Silicon (ARM64)
- RAM: 4 GB minimum, 8 GB recommended
- GPU: Metal compatible

### Linux
- OS: Linux (64-bit)
- CPU: x86_64 or ARM64
- RAM: 4 GB minimum, 8 GB recommended
- GPU: OpenGL 3.3 or Vulkan compatible

## Packages

All packages are configured for Godot 4.5:

- `@cathedral/godot-codex-14499` - Sacred lattice system
- `@cathedral/godot-design-studio` - Design tools
- `@cathedral/godot-liber-arcanae` - Tarot system
- `@cathedral/godot-vfx-library` - Visual effects

## Opening Projects

1. Open Godot 4.5
2. Click "Import"
3. Navigate to the package directory (e.g., `packages/godot-codex-14499`)
4. Select `project.godot`
5. Click "Import & Edit"

## Verification

Run this to verify all packages are set up correctly:

```bash
node scripts/verify-godot-version.mjs
```

## Features Enabled

- GDExtension support
- GDScript
- Vulkan rendering
- OpenGL fallback
- Web export

---

**Version**: 4.5 (Locked)  
**Last Updated**: 2025-12-01T04:12:19.300Z
