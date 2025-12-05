#!/usr/bin/env node
/**
 * Apply Divine Design System to Packages
 * 
 * Analyzes packages and applies alchemical, hermetic, and sacred geometry design
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('⚗️  Applying Divine Design System...\n');

// Read all packages
const packagesDir = path.join(rootDir, 'packages');
const packages = fs.readdirSync(packagesDir).filter(item => {
  const itemPath = path.join(packagesDir, item);
  return fs.statSync(itemPath).isDirectory();
});

console.log(`📦 Found ${packages.length} packages\n`);

// Create design analysis for each package
const designAnalysis = [];

for (const pkg of packages) {
  const packagePath = path.join(packagesDir, pkg);
  const packageJsonPath = path.join(packagePath, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    continue;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const packageName = packageJson.name || pkg;
    
    // Analyze package for divine design
    const analysis = {
      package: packageName,
      name: pkg,
      // Alchemical stage mapping
      alchemicalStage: getAlchemicalStage(pkg),
      // Sephirothic mapping
      sephirah: getSephirah(pkg),
      // Hermetic principle
      hermeticPrinciple: getHermeticPrinciple(pkg),
      // Element
      element: getElement(pkg),
      // Fusion kink
      fusionKink: pkg.includes('fusion') || pkg.includes('kink'),
      // Recommendations
      recommendations: []
    };
    
    // Generate recommendations
    if (!packageJson.description || !packageJson.description.includes('alchemy') && !packageJson.description.includes('hermetic')) {
      analysis.recommendations.push('Add divine design description to package.json');
    }
    
    if (!packageJson.keywords || !packageJson.keywords.some(k => k.includes('alchemy') || k.includes('hermetic'))) {
      analysis.recommendations.push('Add divine design keywords');
    }
    
    designAnalysis.push(analysis);
    
    console.log(`✅ Analyzed: ${pkg}`);
    console.log(`   Stage: ${analysis.alchemicalStage || 'Unknown'}`);
    console.log(`   Sephirah: ${analysis.sephirah || 'Unknown'}`);
    console.log(`   Element: ${analysis.element || 'Unknown'}\n`);
    
  } catch (e) {
    console.error(`❌ Error analyzing ${pkg}:`, e.message);
  }
}

// Save analysis
const analysisPath = path.join(rootDir, 'docs', 'DIVINE_DESIGN_ANALYSIS.json');
fs.writeFileSync(analysisPath, JSON.stringify(designAnalysis, null, 2));
console.log(`\n📊 Analysis saved to: ${analysisPath}`);

// Helper functions
function getAlchemicalStage(pkg) {
  const name = pkg.toLowerCase();
  if (name.includes('debug') || name.includes('analysis')) return 'Calcination';
  if (name.includes('integration') || name.includes('bridge') || name.includes('unified')) return 'Dissolution';
  if (name.includes('data') || name.includes('filter')) return 'Separation';
  if (name.includes('fusion') || name.includes('synthesis')) return 'Conjunction';
  if (name.includes('learning') || name.includes('growth')) return 'Fermentation';
  if (name.includes('export') || name.includes('refine')) return 'Distillation';
  if (name.includes('magnum') || name.includes('opus')) return 'Coagulation';
  return null;
}

function getSephirah(pkg) {
  const name = pkg.toLowerCase();
  if (name.includes('core') && (name.includes('trinity') || name.includes('architecture'))) return 'Kether';
  if (name.includes('art') || name.includes('creative') || name.includes('engine')) return 'Chokmah';
  if (name.includes('design') || name.includes('style') || name.includes('visual')) return 'Binah';
  if (name.includes('art-') || name.includes('painting')) return 'Chesed';
  if (name.includes('edit') || name.includes('refine') || name.includes('quality')) return 'Geburah';
  if (name.includes('ui') || name.includes('interface') || name.includes('portal')) return 'Tiphareth';
  if (name.includes('game') || name.includes('rpg') || name.includes('world')) return 'Netzach';
  if (name.includes('audio') || name.includes('sound') || name.includes('music')) return 'Hod';
  if (name.includes('data') || name.includes('storage')) return 'Yesod';
  if (name.includes('export') || name.includes('render')) return 'Malkuth';
  return 'Tiphareth'; // Default to center
}

function getHermeticPrinciple(pkg) {
  const name = pkg.toLowerCase();
  if (name.includes('consciousness') || name.includes('brain')) return 'Mentalism';
  if (name.includes('geometry') || name.includes('fractal')) return 'Correspondence';
  if (name.includes('audio') || name.includes('music')) return 'Vibration';
  if (name.includes('trinity') || name.includes('polar')) return 'Polarity';
  if (name.includes('spiral') || name.includes('cycle')) return 'Rhythm';
  if (name.includes('game') || name.includes('story')) return 'Cause & Effect';
  if (name.includes('fusion') || name.includes('kink')) return 'Gender';
  return null;
}

function getElement(pkg) {
  const name = pkg.toLowerCase();
  if (name.includes('creative') || name.includes('engine') || name.includes('active')) return 'Fire';
  if (name.includes('design') || name.includes('structure') || name.includes('form')) return 'Water';
  if (name.includes('ui') || name.includes('interface') || name.includes('light')) return 'Air';
  if (name.includes('data') || name.includes('storage') || name.includes('foundation')) return 'Earth';
  if (name.includes('fusion') || name.includes('unified') || name.includes('transcend')) return 'Aether';
  return null;
}

console.log('\n✅ Divine Design System applied!');
console.log(`\n📚 See documentation:`);
console.log(`   - docs/DIVINE_DESIGN_SYSTEM.md`);
console.log(`   - docs/DIVINE_DESIGN_ANALYSIS.json`);

