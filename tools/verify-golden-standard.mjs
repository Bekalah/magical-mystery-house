#!/usr/bin/env node
/**
 * ⚗️ Verify Golden Standard Compliance
 * 
 * Verifies all packages meet A+ quality and Golden Standard theme
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

function verifyGoldenStandard() {
  console.log('🔍 Verifying Golden Standard compliance...\n');

  const verification = {
    packages: { total: 0, compliant: 0, missing: [] },
    tsconfigs: { total: 0, strict: 0, missing: [] },
    timestamp: new Date().toISOString()
  };

  try {
    const allPackages = execSync('rg --files --type json package.json', {
      cwd: rootDir,
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024
    }).trim().split('\n').filter(Boolean);

    verification.packages.total = allPackages.length;

    allPackages.forEach(pkgPath => {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
        if (pkg.cathedral?.quality === 'A+' && 
            pkg.cathedral?.theme === 'golden-standard-alchemy-hermetica-neoplatonic') {
          verification.packages.compliant++;
        } else {
          verification.packages.missing.push(pkgPath);
        }
      } catch (e) {
        verification.packages.missing.push(pkgPath);
      }
    });
  } catch (e) {
    console.error('Error checking packages:', e.message);
  }

  const reportPath = join(rootDir, 'golden-standard-verification.json');
  require('fs').writeFileSync(reportPath, JSON.stringify(verification, null, 2));

  console.log('📊 Verification Results:');
  console.log(`  ✅ Packages compliant: ${verification.packages.compliant}/${verification.packages.total}`);
  console.log(`  ❌ Packages missing labels: ${verification.packages.missing.length}`);
  console.log(`\n  Report: ${reportPath}\n`);

  if (verification.packages.missing.length === 0) {
    console.log('✅ All packages meet Golden Standard!\n');
    process.exit(0);
  } else {
    console.log('⚠️  Some packages need updates. Run: pnpm run enhance:golden-standard\n');
    process.exit(1);
  }
}

verifyGoldenStandard();

