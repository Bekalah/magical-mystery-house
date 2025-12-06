
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT_DIR = process.cwd();
const PACKAGES_DIR = path.join(ROOT_DIR, 'packages');
const APPS_DIR = path.join(ROOT_DIR, 'apps');

const TECH_MODES = {
  VISIONARY: ['cathedral-of-circuits', 'visionary', 'holographic', 'portal', 'tesseract'],
  ART: ['art', 'sound', 'music', 'synth', 'design', 'creative', 'aesthetic'],
  SCIENCE: ['math', 'physics', 'geometry', 'algorithm', 'engine'],
  SYNTHESIZING: ['bridge', 'connector', 'integration', 'fusion', 'synthesis'],
  CODEX: ['codex', 'book', 'scanner', 'library', 'grimoire', 'tarot'],
};

function getTechMode(name, description) {
  const text = (name + ' ' + description).toLowerCase();
  for (const [mode, keywords] of Object.entries(TECH_MODES)) {
    if (keywords.some(k => text.includes(k))) return mode;
  }
  return 'CORE'; // Default
}

function getPackageInfo(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  return entries
    .filter(e => e.isDirectory())
    .map(e => {
      const pkgPath = path.join(dir, e.name, 'package.json');
      if (!fs.existsSync(pkgPath)) return null;
      
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        const distPath = path.join(dir, e.name, 'dist');
        const isBuilt = fs.existsSync(distPath);
        const mode = getTechMode(pkg.name, pkg.description || '');
        
        return {
          name: pkg.name,
          version: pkg.version,
          private: !!pkg.private,
          mode,
          isBuilt,
          path: path.relative(ROOT_DIR, path.join(dir, e.name))
        };
      } catch (err) {
        return { name: e.name, error: 'Invalid package.json' };
      }
    })
    .filter(Boolean);
}

const allPackages = [
  ...getPackageInfo(PACKAGES_DIR),
  ...getPackageInfo(APPS_DIR)
];

console.log('\n🌟 CATHEDRAL MODEL CONTROL DASHBOARD 🌟\n');
console.log('Total Modules:', allPackages.length);

const grouped = allPackages.reduce((acc, pkg) => {
  const mode = pkg.mode || 'UNKNOWN';
  if (!acc[mode]) acc[mode] = [];
  acc[mode].push(pkg);
  return acc;
}, {});

Object.entries(grouped).forEach(([mode, pkgs]) => {
  console.log(`\n=== ${mode} MODULES (${pkgs.length}) ===`);
  console.table(pkgs.map(p => ({
    Name: p.name,
    Version: p.version,
    Private: p.private ? '🔒' : '🌍',
    Built: p.isBuilt ? '✅' : '❌',
    Path: p.path
  })));
});

console.log('\n--- END OF REPORT ---\n');
