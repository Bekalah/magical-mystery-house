#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Setup Godot 4.5 properly with all specifications
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

const GODOT_VERSION = '4.5';
const GODOT_VERSION_STABLE = '4.5.0';

console.log(`🔧 Setting up Godot ${GODOT_VERSION} with proper specifications...\n`);

// 1. Create/update .godot-version
console.log('1️⃣ Creating .godot-version file...');
const godotVersionPath = path.join(BASE_DIR, '.godot-version');
fs.writeFileSync(godotVersionPath, `${GODOT_VERSION}\n`);
console.log(`   ✅ Created .godot-version: ${GODOT_VERSION}\n`);

// 2. Create project.godot template for each package
console.log('2️⃣ Creating project.godot templates...');
const GODOT_PACKAGES = [
  'godot-codex-14499',
  'godot-design-studio',
  'godot-liber-arcanae',
  'godot-vfx-library',
];

const projectGodotTemplate = `; Engine configuration file for Godot ${GODOT_VERSION}
; This file is generated automatically - do not edit manually

[application]

config/name="Cathedral Package"
run/main_scene=""
config/features=PackedStringArray("4.5", "Forward Plus")
config/icon="res://icon.svg"

[rendering]

renderer/rendering_method="forward_plus"
renderer/rendering_method.mobile="mobile"
textures/canvas_textures/default_texture_filter=2
2d/snap/snap_2d_transforms_to_pixel=false
2d/snap/snap_2d_vertices_to_pixel=false

[audio]

driver/output_latency=15

[input]

[autoload]

[display]

window/size/viewport_width=1152
window/size/viewport_height=648
window/size/resizable=true
window/stretch/mode="canvas_items"
window/stretch/aspect="expand"

[rendering]

textures/canvas_textures/default_texture_filter=2
2d/snap/snap_2d_transforms_to_pixel=false
2d/snap/snap_2d_vertices_to_pixel=false
`;

for (const pkgName of GODOT_PACKAGES) {
  const pkgDir = path.join(BASE_DIR, 'packages', pkgName);
  const projectGodotPath = path.join(pkgDir, 'project.godot');
  
  if (!fs.existsSync(pkgDir)) {
    console.log(`   ⚠️  Package directory not found: ${pkgName}`);
    continue;
  }

  // Only create if it doesn't exist (don't overwrite existing)
  if (!fs.existsSync(projectGodotPath)) {
    fs.writeFileSync(projectGodotPath, projectGodotTemplate);
    console.log(`   ✅ Created project.godot for ${pkgName}`);
  } else {
    console.log(`   ℹ️  project.godot already exists for ${pkgName}`);
  }
}

// 3. Update all package.json files
console.log('\n3️⃣ Updating package.json files...');
for (const pkgName of GODOT_PACKAGES) {
  const pkgPath = path.join(BASE_DIR, 'packages', pkgName, 'package.json');
  
  if (!fs.existsSync(pkgPath)) {
    continue;
  }

  try {
    const content = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(content);
    let changed = false;

    // Ensure godot section exists and is correct
    if (!pkg.godot) {
      pkg.godot = {};
      changed = true;
    }

    if (pkg.godot.version !== `${GODOT_VERSION}+`) {
      pkg.godot.version = `${GODOT_VERSION}+`;
      changed = true;
    }

    if (!pkg.godot.compatibility) {
      pkg.godot.compatibility = '4.0+';
      changed = true;
    }

    // Add system requirements
    if (!pkg.godot.system_requirements) {
      pkg.godot.system_requirements = {
        windows: {
          os: "Windows 7 or later (64-bit)",
          cpu: "x86_64 or ARM64",
          ram: "4 GB minimum, 8 GB recommended"
        },
        macos: {
          os: "macOS 10.14 or later",
          cpu: "x86_64 or Apple Silicon (ARM64)",
          ram: "4 GB minimum, 8 GB recommended"
        },
        linux: {
          os: "Linux (64-bit)",
          cpu: "x86_64 or ARM64",
          ram: "4 GB minimum, 8 GB recommended"
        }
      };
      changed = true;
    }

    // Add features
    if (!pkg.godot.features) {
      pkg.godot.features = {
        gdextension: true,
        gdscript: true,
        vulkan: true,
        opengl: true,
        web: true
      };
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
      console.log(`   ✅ Updated ${pkgName}/package.json`);
    } else {
      console.log(`   ✅ ${pkgName}/package.json already correct`);
    }
  } catch (e) {
    console.log(`   ❌ Error updating ${pkgName}: ${e.message}`);
  }
}

// 4. Create .godotignore if needed
console.log('\n4️⃣ Creating .godotignore...');
const godotIgnorePath = path.join(BASE_DIR, '.godotignore');
const godotIgnoreContent = `# Godot ignore file
node_modules/
dist/
build/
.git/
*.log
.DS_Store
Thumbs.db
`;

if (!fs.existsSync(godotIgnorePath)) {
  fs.writeFileSync(godotIgnorePath, godotIgnoreContent);
  console.log('   ✅ Created .godotignore');
} else {
  console.log('   ℹ️  .godotignore already exists');
}

// 5. Create README for Godot setup
console.log('\n5️⃣ Creating Godot setup documentation...');
const godotReadmePath = path.join(BASE_DIR, 'GODOT_SETUP.md');
const godotReadmeContent = `# Godot 4.5 Setup Guide

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

- \`@cathedral/godot-codex-14499\` - Sacred lattice system
- \`@cathedral/godot-design-studio\` - Design tools
- \`@cathedral/godot-liber-arcanae\` - Tarot system
- \`@cathedral/godot-vfx-library\` - Visual effects

## Opening Projects

1. Open Godot 4.5
2. Click "Import"
3. Navigate to the package directory (e.g., \`packages/godot-codex-14499\`)
4. Select \`project.godot\`
5. Click "Import & Edit"

## Verification

Run this to verify all packages are set up correctly:

\`\`\`bash
node scripts/verify-godot-version.mjs
\`\`\`

## Features Enabled

- GDExtension support
- GDScript
- Vulkan rendering
- OpenGL fallback
- Web export

---

**Version**: ${GODOT_VERSION} (Locked)  
**Last Updated**: ${new Date().toISOString()}
`;

fs.writeFileSync(godotReadmePath, godotReadmeContent);
console.log('   ✅ Created GODOT_SETUP.md');

console.log('\n✅ Godot 4.5 setup complete!');
console.log('\n📋 Summary:');
console.log(`   - Godot version: ${GODOT_VERSION}`);
console.log(`   - Packages configured: ${GODOT_PACKAGES.length}`);
console.log(`   - project.godot templates created`);
console.log(`   - System requirements documented`);
console.log(`   - Setup guide created`);
console.log('\n🔒 All packages are locked to Godot 4.5');

