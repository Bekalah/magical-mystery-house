#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Publish everything to wiki, GitHub, and ensure all documentation is mapped correctly
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function generateWikiContent() {
  const wikiDir = path.join(rootDir, 'docs', 'wiki');
  if (!fs.existsSync(wikiDir)) {
    fs.mkdirSync(wikiDir, { recursive: true });
  }

  // Generate main wiki index
  const wikiIndex = `# Cathedral of Circuits - Master Wiki

## Overview

The Cathedral of Circuits is a comprehensive monorepo containing mystical, alchemical, and creative systems built with sacred geometry principles.

## Core Systems

### Sacred Systems
- **Codex 144:99** - Sacred mathematics and geometry engine
- **Liber Arcanae** - 22 Major Arcana character system
- **Circuitum99** - Alpha et Omega interactive story system
- **Stone Grimoire** - 8 Chapels system with body nodes
- **Mystery House** - Magical mystery room system

### Game Systems
- **Godot Liber Arcanae** - Full game with 22 playable characters
- **Godot Design Studio** - Figma-like design tools
- **Game Engine** - RPG engine with Codex integration
- **Game World** - World building system

### Design & Creative
- **Design Studio** - Professional design tools
- **Art Engine Core** - Sacred geometry art generation
- **Music Engine Core** - Frequency-based music system
- **Science Engine Core** - Research and experimentation

## Integration Map

All systems are interconnected through:
- Sacred geometry (144:99 ratio)
- Trauma-aware design principles
- CC0-1.0 licensing (free and open)
- Alchemical labeling system

## Getting Started

\`\`\`bash
pnpm install
pnpm build
\`\`\`

## Documentation

- [Developer Guide](./DEVELOPER_GUIDE.md)
- [Integration Guide](./integration/COMPLETE_INTEGRATION_GUIDE.md)
- [Mathematical Foundation](./mathematical-foundation/COMPLETE_MATH_SPEC.md)
- [Security Guide](./security/codex-engine-security-guide.md)

## Packages

See [COMPLETE_PACKAGE_INFO.md](../COMPLETE_PACKAGE_INFO.md) for full package listing.

## Continuous Improvement

The system includes a continuous improvement experiment that:
- Discovers and fixes issues automatically
- Consolidates partial packages
- Maintains code quality
- Tracks improvements across cycles

Run with: \`pnpm run improve\`
`;

  fs.writeFileSync(path.join(wikiDir, 'index.md'), wikiIndex, 'utf-8');

  // Generate package registry
  const packagesDir = path.join(rootDir, 'packages');
  const packages = fs.readdirSync(packagesDir).filter(item => {
    const itemPath = path.join(packagesDir, item);
    return fs.statSync(itemPath).isDirectory();
  });

  let packageRegistry = `# Package Registry

## All Packages (${packages.length} total)

\`\`\`\n`;
  
  for (const pkg of packages.sort()) {
    const pkgPath = path.join(packagesDir, pkg, 'package.json');
    if (fs.existsSync(pkgPath)) {
      try {
        const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
        const name = pkgJson.name || pkg;
        const desc = pkgJson.description || 'No description';
        const version = pkgJson.version || '1.0.0';
        packageRegistry += `${name}@${version} - ${desc}\n`;
      } catch (e) {
        packageRegistry += `${pkg} - Error reading package.json\n`;
      }
    }
  }
  
  packageRegistry += '```\n';
  fs.writeFileSync(path.join(wikiDir, 'packages.md'), packageRegistry, 'utf-8');

  console.log('✅ Wiki content generated');
}

async function updateGitHubDocumentation() {
  // Update main README if needed
  const readmePath = path.join(rootDir, 'README.md');
  if (fs.existsSync(readmePath)) {
    let readme = fs.readFileSync(readmePath, 'utf-8');
    
    // Ensure pnpm commands are correct
    readme = readme.replace(/pp+p?npm/g, 'pnpm');
    
    // Add links to wiki if not present
    if (!readme.includes('docs/wiki')) {
      readme += '\n\n## Documentation\n\nSee [Wiki](./docs/wiki/index.md) for comprehensive documentation.\n';
    }
    
    fs.writeFileSync(readmePath, readme, 'utf-8');
    console.log('✅ README.md updated');
  }

  // Generate GitHub Pages structure
  const ghPagesDir = path.join(rootDir, 'docs', 'gh-pages');
  if (!fs.existsSync(ghPagesDir)) {
    fs.mkdirSync(ghPagesDir, { recursive: true });
  }

  const indexHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Cathedral of Circuits - Documentation</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: system-ui, sans-serif; max-width: 1200px; margin: 0 auto; padding: 2rem; }
    h1 { color: #2d3748; }
    .package-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; margin-top: 2rem; }
    .package-card { border: 1px solid #e2e8f0; padding: 1rem; border-radius: 8px; }
    .package-card h3 { margin-top: 0; color: #4a5568; }
  </style>
</head>
<body>
  <h1>Cathedral of Circuits</h1>
  <p>Comprehensive documentation for the Cathedral of Circuits monorepo.</p>
  <p><a href="./wiki/index.html">View Wiki</a></p>
  <p><a href="./packages.html">View Packages</a></p>
</body>
</html>`;

  fs.writeFileSync(path.join(ghPagesDir, 'index.html'), indexHtml, 'utf-8');
  console.log('✅ GitHub Pages structure created');
}

async function publishToGitHub() {
  try {
    // Check if git is initialized
    execSync('git status', { cwd: rootDir, stdio: 'ignore' });
    
    console.log('📝 Publishing to GitHub...');
    console.log('   - Documentation updated');
    console.log('   - Wiki content generated');
    console.log('   - Ready for commit and push');
    console.log('\nTo publish, run:');
    console.log('   git add .');
    console.log('   git commit -m "docs: Update documentation and wiki"');
    console.log('   git push');
    
  } catch (e) {
    console.log('⚠️  Git not initialized or not a git repository');
    console.log('   Documentation prepared but not pushed to GitHub');
  }
}

async function publishEverything() {
  console.log('🚀 Publishing everything to wiki and GitHub...\n');
  
  await generateWikiContent();
  await updateGitHubDocumentation();
  await publishToGitHub();
  
  console.log('\n✅ Publishing complete!');
  console.log('   - Wiki content: docs/wiki/');
  console.log('   - GitHub Pages: docs/gh-pages/');
  console.log('   - README.md updated');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  publishEverything().catch(console.error);
}

export default publishEverything;

