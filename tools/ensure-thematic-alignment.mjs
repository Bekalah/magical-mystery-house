#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Ensure Thematic Alignment
 * Checks all packages/tools/apps for alignment with:
 * - Alchemical theme (golden ratio, 144:99, sacred geometry)
 * - Visionary creativity (Jung's active imagination, Alice in Wonderland style)
 * - Real cannon integration (historical grimoires as foundation)
 * - Creative interpretation (not rigid, but meaningful)
 * - Alchemical tarot mapping (Wands→Sulfur, Cups→Mercury, Swords→Salt, Pentacles→Ash)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const THEMATIC_STANDARDS = {
  alchemical: {
    goldenRatio: 1.618,
    cathedralRatio: 144 / 99, // ~1.455
    fibonacci: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
    keywords: ['alchemical', 'sacred geometry', 'golden ratio', '144:99', 'fibonacci']
  },
  visionary: {
    keywords: ['visionary', 'creative', 'jung', 'active imagination', 'alice in wonderland', 'surreal']
  },
  realCannon: {
    keywords: ['grimoire', 'key of solomon', 'lesser key', 'agrippa', 'dee', 'fortune', 'carrington'],
    sources: ['historical', 'traditional', 'canonical']
  },
  alchemicalTarot: {
    mappings: {
      'wands': 'Sulfur',
      'cups': 'Mercury',
      'swords': 'Salt',
      'pentacles': 'Ash',
      'disks': 'Ash'
    }
  }
};

function checkPackageAlignment(packagePath) {
  const alignment = {
    path: packagePath,
    alchemical: 0,
    visionary: 0,
    realCannon: 0,
    alchemicalTarot: 0,
    issues: [],
    suggestions: []
  };
  
  // Check package.json
  const packageJsonPath = path.join(packagePath, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const content = JSON.stringify(packageJson).toLowerCase();
    
    // Check alchemical alignment
    for (const keyword of THEMATIC_STANDARDS.alchemical.keywords) {
      if (content.includes(keyword.toLowerCase())) {
        alignment.alchemical++;
      }
    }
    
    // Check visionary alignment
    for (const keyword of THEMATIC_STANDARDS.visionary.keywords) {
      if (content.includes(keyword.toLowerCase())) {
        alignment.visionary++;
      }
    }
    
    // Check real cannon alignment
    for (const keyword of THEMATIC_STANDARDS.realCannon.keywords) {
      if (content.includes(keyword.toLowerCase())) {
        alignment.realCannon++;
      }
    }
  }
  
  // Check README
  const readmePath = path.join(packagePath, 'README.md');
  if (fs.existsSync(readmePath)) {
    const readme = fs.readFileSync(readmePath, 'utf-8').toLowerCase();
    
    // Check alchemical tarot mapping
    for (const [suit, element] of Object.entries(THEMATIC_STANDARDS.alchemicalTarot.mappings)) {
      if (readme.includes(suit) && readme.includes(element.toLowerCase())) {
        alignment.alchemicalTarot++;
      }
    }
  }
  
  // Generate suggestions
  if (alignment.alchemical === 0) {
    alignment.suggestions.push('Add alchemical theme references (golden ratio, 144:99, sacred geometry)');
  }
  if (alignment.visionary === 0) {
    alignment.suggestions.push('Add visionary creativity references (Jung, active imagination, Alice in Wonderland)');
  }
  if (alignment.realCannon === 0) {
    alignment.suggestions.push('Add real cannon integration (historical grimoires, traditional sources)');
  }
  if (alignment.alchemicalTarot === 0) {
    alignment.suggestions.push('Add alchemical tarot mapping (Wands→Sulfur, Cups→Mercury, etc.)');
  }
  
  return alignment;
}

async function ensureThematicAlignment() {
  console.log('🎨 Ensuring Thematic Alignment...\n');
  
  const packagesPath = path.join(rootDir, 'packages');
  if (!fs.existsSync(packagesPath)) {
    console.log('⚠️  Packages directory not found');
    return;
  }
  
  const packages = fs.readdirSync(packagesPath);
  const alignments = [];
  const misaligned = [];
  
  for (const pkg of packages) {
    const packagePath = path.join(packagesPath, pkg);
    if (fs.statSync(packagePath).isDirectory()) {
      const alignment = checkPackageAlignment(packagePath);
      alignments.push(alignment);
      
      if (alignment.suggestions.length > 0) {
        misaligned.push(alignment);
        console.log(`⚠️  ${pkg}: ${alignment.suggestions.length} suggestions`);
      } else {
        console.log(`✅ ${pkg}: Aligned`);
      }
    }
  }
  
  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    totalPackages: alignments.length,
    aligned: alignments.length - misaligned.length,
    misaligned: misaligned.length,
    alignments: alignments.map(a => ({
      path: path.relative(rootDir, a.path),
      scores: {
        alchemical: a.alchemical,
        visionary: a.visionary,
        realCannon: a.realCannon,
        alchemicalTarot: a.alchemicalTarot
      },
      suggestions: a.suggestions
    })),
    standards: THEMATIC_STANDARDS
  };
  
  // Save report
  const outputPath = path.join(rootDir, 'THEMATIC_ALIGNMENT_REPORT.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf-8');
  
  console.log(`\n✅ Thematic alignment check complete!`);
  console.log(`   Total packages: ${report.totalPackages}`);
  console.log(`   Aligned: ${report.aligned}`);
  console.log(`   Misaligned: ${report.misaligned}`);
  console.log(`   Report saved to: ${outputPath}`);
  
  return report;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  ensureThematicAlignment().catch(console.error);
}

export default ensureThematicAlignment;

