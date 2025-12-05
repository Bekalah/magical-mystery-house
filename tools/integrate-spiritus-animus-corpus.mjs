#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - Spiritus/Animus/Corpus Trinity Integration
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * Integrates the Trinity system:
 * - Spiritus (Spirit): Codex, Abyssiae, Liber Arcanae, Sacred Mathematics
 * - Animus (Soul): Music, Art, Sound Synthesis, Fractal Sound
 * - Corpus (Body): Game Engine, 3D Rendering, Physics, Interaction
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const PROJECT_INFO = {
  name: 'Cathedral of Circuits',
  version: '1.0.0',
  fullName: 'Cathedral of Circuits - Magnum Opus Version 1.0',
  author: 'Rebecca Respawn',
  subtitle: 'Liber Arcanae Codex Abyssiae'
};

// Trinity System Definition
const TRINITY_SYSTEM = {
  spiritus: {
    domain: 'Spirit',
    latin: 'Spiritus',
    description: 'Divine intellect, sacred mathematics, codex systems',
    elements: ['Codex 144:99', 'Abyssiae Gates', 'Liber Arcanae', 'Sacred Mathematics'],
    tech: [
      'codex-144-99-core',
      'liber-arcanae',
      'liber-arcanae-core',
      'sacred-mathematics-core',
      'sacred-geometry-core',
      'design-mathematics-core'
    ],
    design: ['Golden Standard', 'Hermetic Principles', 'Neo-Platonic Hierarchy', 'Alchemical Processes'],
    game: ['RPG Mechanics', 'Pathworking', 'Consciousness Levels', 'Arcana System'],
    color: '#7A33FF', // Violet - Nous/Intellect
    symbol: '☉'
  },
  animus: {
    domain: 'Soul',
    latin: 'Animus',
    description: 'Creative expression, music, art, synthesis',
    elements: ['Music', 'Art', 'Sound Synthesis', 'Fractal Sound', 'Witch Mode'],
    tech: [
      'music-engine-core',
      'art-engine-core',
      'unified-synthesis-codex',
      'unified-synthesizer-fractal-witch-mode',
      'cathedral-audio-synthesis',
      'synth',
      'synth-labs'
    ],
    design: ['Visual Art', 'Sacred Geometry', 'Color Harmony', 'Fractal Patterns'],
    game: ['Audio Synthesis', 'Fractal Patterns', 'Witch Mode', 'Spell Casting'],
    color: '#C0C0C0', // Silver - Anima Mundi
    symbol: '☽'
  },
  corpus: {
    domain: 'Body',
    latin: 'Corpus',
    description: 'Material manifestation, game engine, interaction',
    elements: ['Game Engine', '3D Rendering', 'Physics', 'Interaction', 'UI'],
    tech: [
      'game-engine',
      'three-engine',
      'physics-cannon-core',
      'trauma-safe-ui',
      'universal-accessibility',
      'professional-quality-control'
    ],
    design: ['Trauma-Safe UI', 'Accessibility', 'Museum-Grade Quality', 'Professional Standards'],
    game: ['RPG Systems', 'Character Mechanics', 'World Building', 'Gameplay'],
    color: '#2F4F4F', // Lead Grey - Matter
    symbol: '♄'
  }
};

function findPackageJsonFiles() {
  try {
    const result = execSync('rg --files --type json package.json', {
      cwd: rootDir,
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024
    });
    return result.trim().split('\n').filter(Boolean);
  } catch (e) {
    return findFilesRecursive(rootDir, 'package.json');
  }
}

function findFilesRecursive(dir, filename) {
  const results = [];
  if (!existsSync(dir)) return results;
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
        results.push(...findFilesRecursive(fullPath, filename));
      } else if (entry === filename) {
        results.push(fullPath);
      }
    }
  } catch (e) {}
  return results;
}

function categorizePackage(pkgPath, pkg) {
  const pkgName = pkg.name || '';
  const description = (pkg.description || '').toLowerCase();
  
  const categorizations = {
    spiritus: [],
    animus: [],
    corpus: []
  };

  // Check against Trinity tech lists
  Object.entries(TRINITY_SYSTEM).forEach(([domain, config]) => {
    config.tech.forEach(techName => {
      if (pkgName.includes(techName.replace('@cathedral/', '')) || 
          pkgName === techName ||
          description.includes(techName)) {
        categorizations[domain].push(techName);
      }
    });
  });

  // Determine primary domain (most matches)
  const domainMatches = Object.entries(categorizations).map(([domain, matches]) => ({
    domain,
    count: matches.length
  })).sort((a, b) => b.count - a.count);

  return domainMatches[0].count > 0 ? domainMatches[0].domain : null;
}

function updatePackageWithTrinity(pkgPath, primaryDomain) {
  try {
    const content = readFileSync(pkgPath, 'utf-8');
    const pkg = JSON.parse(content);
    let updated = false;

    if (!pkg.cathedral) {
      pkg.cathedral = {};
      updated = true;
    }

    if (!pkg.cathedral.trinity) {
      pkg.cathedral.trinity = {
        domain: primaryDomain,
        ...TRINITY_SYSTEM[primaryDomain]
      };
      updated = true;
    }

    if (updated) {
      writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
      return { updated: true, domain: primaryDomain };
    }

    return { updated: false, domain: primaryDomain || 'unknown' };
  } catch (e) {
    return { updated: false, error: e.message };
  }
}

async function main() {
  console.log(`⚗️  ${PROJECT_INFO.fullName}`);
  console.log(`Author: ${PROJECT_INFO.author} (pen name)`);
  console.log(`Spiritus/Animus/Corpus Trinity Integration\n`);

  const results = {
    project: PROJECT_INFO,
    trinity: TRINITY_SYSTEM,
    packages: {
      spiritus: [],
      animus: [],
      corpus: [],
      unassigned: []
    },
    integration: {
      spiritusAnimus: [],
      animusCorpus: [],
      corpusSpiritus: [],
      unified: []
    },
    timestamp: new Date().toISOString()
  };

  console.log('📦 Scanning packages...');
  const packageFiles = findPackageJsonFiles();
  console.log(`Found ${packageFiles.length} packages\n`);

  console.log('🔄 Categorizing packages into Trinity domains...');
  packageFiles.forEach(pkgPath => {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
      const domain = categorizePackage(pkgPath, pkg);
      
      if (domain) {
        const updateResult = updatePackageWithTrinity(pkgPath, domain);
        results.packages[domain].push({
          name: pkg.name,
          path: pkgPath.replace(rootDir + '/', ''),
          updated: updateResult.updated
        });
      } else {
        results.packages.unassigned.push({
          name: pkg.name,
          path: pkgPath.replace(rootDir + '/', '')
        });
      }
    } catch (e) {
      results.packages.unassigned.push({
        path: pkgPath.replace(rootDir + '/', ''),
        error: e.message
      });
    }
  });

  // Generate integration mappings
  console.log('\n🔗 Generating integration mappings...');
  
  // Spiritus ↔ Animus (Codex + Music/Art)
  results.integration.spiritusAnimus = results.packages.spiritus
    .filter(p => p.name?.includes('codex') || p.name?.includes('liber'))
    .map(p => ({
      spiritus: p.name,
      animus: results.packages.animus.find(a => 
        a.name?.includes('music') || a.name?.includes('art') || a.name?.includes('synthesis')
      )?.name
    }))
    .filter(i => i.animus);

  // Animus ↔ Corpus (Audio/Visual + Game)
  results.integration.animusCorpus = results.packages.animus
    .filter(p => p.name?.includes('synthesis') || p.name?.includes('audio'))
    .map(p => ({
      animus: p.name,
      corpus: results.packages.corpus.find(c => 
        c.name?.includes('game') || c.name?.includes('engine')
      )?.name
    }))
    .filter(i => i.corpus);

  // Corpus ↔ Spiritus (Game + Codex)
  results.integration.corpusSpiritus = results.packages.corpus
    .filter(p => p.name?.includes('game'))
    .map(p => ({
      corpus: p.name,
      spiritus: results.packages.spiritus.find(s => 
        s.name?.includes('codex') || s.name?.includes('144')
      )?.name
    }))
    .filter(i => i.spiritus);

  // Generate report
  const reportPath = join(rootDir, 'spiritus-animus-corpus-report.json');
  writeFileSync(reportPath, JSON.stringify(results, null, 2));

  console.log('\n📊 Summary:');
  console.log(`  Spiritus packages: ${results.packages.spiritus.length}`);
  console.log(`  Animus packages: ${results.packages.animus.length}`);
  console.log(`  Corpus packages: ${results.packages.corpus.length}`);
  console.log(`  Unassigned: ${results.packages.unassigned.length}`);
  console.log(`\n  Report: ${reportPath}\n`);

  console.log('✅ Trinity integration complete!\n');
}

main().catch(console.error);

