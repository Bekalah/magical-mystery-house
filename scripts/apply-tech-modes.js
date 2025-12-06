
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const PACKAGES_DIR = path.join(ROOT_DIR, 'packages');
const APPS_DIR = path.join(ROOT_DIR, 'apps');

const TECH_MODES = {
  VISIONARY: ['cathedral-of-circuits', 'visionary', 'holographic', 'portal', 'tesseract', 'godot', 'rust'],
  ART: ['art', 'sound', 'music', 'synth', 'design', 'creative', 'aesthetic', 'living library', 'grimoire', 'chapel'],
  SCIENCE: ['math', 'physics', 'geometry', 'algorithm', 'engine', 'circuit'],
  SYNTHESIZING: ['bridge', 'connector', 'integration', 'fusion', 'synthesis', 'unify'],
  CODEX: ['codex', 'book', 'scanner', 'library', 'grimoire', 'tarot', 'archive'],
};

function determineMode(name, description) {
  const text = (name + ' ' + description).toLowerCase();
  for (const [mode, keywords] of Object.entries(TECH_MODES)) {
    if (keywords.some(k => text.includes(k))) return mode;
  }
  return 'CORE';
}

function processPackages(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach(e => {
    if (!e.isDirectory()) return;
    const pkgPath = path.join(dir, e.name, 'package.json');
    if (!fs.existsSync(pkgPath)) return;

    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      const mode = determineMode(pkg.name, pkg.description || '');
      
      let changed = false;
      
      // Upgrade to Gold Standard Metadata
      if (!pkg.cathedral) pkg.cathedral = {};
      
      if (pkg.cathedral.mode !== mode) {
        pkg.cathedral.mode = mode;
        pkg.cathedral.quality = "Gold Standard A+";
        pkg.cathedral.status = "Active";
        changed = true;
      }

      // Add keywords if missing
      if (!pkg.keywords) pkg.keywords = [];
      if (!pkg.keywords.includes('cathedral-network')) {
        pkg.keywords.push('cathedral-network');
        pkg.keywords.push(mode.toLowerCase());
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
        console.log(`✨ Upgraded ${pkg.name} to [${mode}]`);
      }
    } catch (err) {
      console.error(`Error processing ${e.name}:`, err.message);
    }
  });
}

console.log('🌟 APPLYING GOLD STANDARD TECH MODES 🌟');
processPackages(PACKAGES_DIR);
processPackages(APPS_DIR);
console.log('✅ Categorization Complete');
