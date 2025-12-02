#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Enforce hard rule boundaries - NO EXCEPTIONS
 * Fix everything, leave nothing "just out there"
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

console.log('🛡️ Enforcing Hard Rule Boundaries - NO EXCEPTIONS\n');

const VIOLATIONS = [];
const FIXES = [];

// 1. Commercial dependencies to REJECT
const COMMERCIAL_DEPS = [
  '@azure',
  '@microsoft',
  '@aws-sdk',
  '@google-cloud',
  'azure-',
  'aws-',
  'google-cloud-',
  'microsoft-',
];

// 2. Package managers to REJECT (pnpm only)
const FORBIDDEN_PM = ['npm', 'yarn', 'bun', 'pnpm'];

// 3. Forbidden licenses
const FORBIDDEN_LICENSES = ['UNLICENSED', 'PROPRIETARY', 'COMMERCIAL'];

function findFiles(dir, pattern, exclude = []) {
  const files = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!exclude.includes(entry.name) && entry.name !== 'node_modules' && entry.name !== '.git') {
          files.push(...findFiles(path.join(dir, entry.name), pattern, exclude));
        }
      } else if (entry.isFile() && pattern.test(entry.name)) {
        files.push(path.join(dir, entry.name));
      }
    }
  } catch (e) {
    // Skip
  }
  return files;
}

// Check 1: Commercial dependencies
console.log('1️⃣ Checking for commercial dependencies...');
function checkCommercialDeps(pkgPath) {
  try {
    const content = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(content);
    let violations = [];
    let fixed = false;

    const checkDeps = (deps, type) => {
      if (!deps) return;
      for (const [name, version] of Object.entries(deps)) {
        if (COMMERCIAL_DEPS.some(commercial => name.includes(commercial))) {
          violations.push(`${type}: ${name}`);
          delete deps[name];
          fixed = true;
        }
      }
    };

    checkDeps(pkg.dependencies, 'dependency');
    checkDeps(pkg.devDependencies, 'devDependency');
    checkDeps(pkg.peerDependencies, 'peerDependency');
    checkDeps(pkg.optionalDependencies, 'optionalDependency');

    if (violations.length > 0) {
      VIOLATIONS.push({ file: pkgPath, type: 'commercial', violations });
      if (fixed) {
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
        FIXES.push({ file: pkgPath, action: 'removed commercial dependencies' });
      }
    }
  } catch (e) {
    // Skip
  }
}

const packageJsonFiles = findFiles(BASE_DIR, /package\.json$/);
for (const pkgPath of packageJsonFiles) {
  checkCommercialDeps(pkgPath);
}

// Check 2: License violations
console.log('2️⃣ Checking licenses...');
for (const pkgPath of packageJsonFiles) {
  try {
    const content = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(content);
    let fixed = false;

    if (!pkg.license || pkg.license === 'UNLICENSED' || FORBIDDEN_LICENSES.includes(pkg.license)) {
      pkg.license = 'CC0-1.0';
      fixed = true;
      VIOLATIONS.push({ file: pkgPath, type: 'license', violation: pkg.license || 'missing' });
    }

    if (fixed) {
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
      FIXES.push({ file: pkgPath, action: 'set license to CC0-1.0' });
    }
  } catch (e) {
    // Skip
  }
}

// Check 3: npm references
console.log('3️⃣ Checking for npm references...');
function fixNpmReferences(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    const original = content;

    // Replace all npm references
    const replacements = [
      [/pnpm install/g, 'pnpm install'],
      [/pnpm run/g, 'pnpm run'],
      [/pnpm exec/g, 'pnpm exec'],
      [/pnpm publish/g, 'pnpm publish'],
      [/pnpm install --frozen-lockfile/g, 'pnpm install --frozen-lockfile'],
      [/pnpm test/g, 'pnpm test'],
      [/pnpm start/g, 'pnpm start'],
      [/pnpm build/g, 'pnpm build'],
      [/pnpm --version/g, 'pnpm --version'],
      [/which pnpm/g, 'which pnpm'],
      [/pnpm@/g, 'pnpm@'],
      [/package-lock\.json/g, 'pnpm-lock.yaml'],
    ];

    for (const [pattern, replacement] of replacements) {
      if (pattern.test(content)) {
        content = content.replace(pattern, replacement);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, content);
      FIXES.push({ file: filePath, action: 'replaced npm with pnpm' });
      VIOLATIONS.push({ file: filePath, type: 'npm reference', violation: 'found npm usage' });
    }
  } catch (e) {
    // Skip
  }
}

// Check all relevant files
const filesToCheck = [
  ...packageJsonFiles,
  ...findFiles(BASE_DIR, /\.(mjs|js|ts|sh|yml|yaml|json|md)$/),
];

for (const filePath of filesToCheck) {
  if (!filePath.includes('node_modules') && !filePath.includes('.git')) {
    fixNpmReferences(filePath);
  }
}

// Check 4: packageManager field
console.log('4️⃣ Checking packageManager fields...');
for (const pkgPath of packageJsonFiles) {
  try {
    const content = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(content);
    let fixed = false;

    if (!pkg.packageManager || !pkg.packageManager.startsWith('pnpm@')) {
      pkg.packageManager = 'pnpm@10.23.0';
      fixed = true;
      VIOLATIONS.push({ file: pkgPath, type: 'packageManager', violation: pkg.packageManager || 'missing' });
    }

    if (fixed) {
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
      FIXES.push({ file: pkgPath, action: 'set packageManager to pnpm' });
    }
  } catch (e) {
    // Skip
  }
}

// Check 5: pnpm-lock.yaml files (should not exist)
console.log('5️⃣ Checking for pnpm-lock.yaml files...');
const lockFiles = findFiles(BASE_DIR, /package-lock\.json$/);
for (const lockFile of lockFiles) {
  fs.unlinkSync(lockFile);
  FIXES.push({ file: lockFile, action: 'deleted pnpm-lock.yaml' });
  VIOLATIONS.push({ file: lockFile, type: 'forbidden file', violation: 'pnpm-lock.yaml' });
}

// Check 6: Vercel configs
console.log('6️⃣ Checking Vercel configurations...');
const vercelConfigs = [
  path.join(BASE_DIR, 'vercel.json'),
  path.join(BASE_DIR, 'apps/web/vercel.json'),
  path.join(BASE_DIR, 'apps/web-from-master/vercel.json'),
];

for (const vercelPath of vercelConfigs) {
  if (fs.existsSync(vercelPath)) {
    try {
      const content = fs.readFileSync(vercelPath, 'utf8');
      const config = JSON.parse(content);
      let fixed = false;

      if (config.buildCommand && config.buildCommand.includes('npm')) {
        config.buildCommand = config.buildCommand.replace(/npm /g, 'pnpm ');
        fixed = true;
      }
      if (config.installCommand && config.installCommand.includes('npm')) {
        config.installCommand = config.installCommand.replace(/npm /g, 'pnpm ');
        fixed = true;
      }

      if (fixed) {
        fs.writeFileSync(vercelPath, JSON.stringify(config, null, 2) + '\n');
        FIXES.push({ file: vercelPath, action: 'fixed npm references' });
      }
    } catch (e) {
      // Skip
    }
  }
}

// Check 7: GitHub workflows
console.log('7️⃣ Checking GitHub workflows...');
const workflowsDir = path.join(BASE_DIR, '.github', 'workflows');
if (fs.existsSync(workflowsDir)) {
  const workflows = fs.readdirSync(workflowsDir).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
  
  for (const workflow of workflows) {
    const workflowPath = path.join(workflowsDir, workflow);
    try {
      let content = fs.readFileSync(workflowPath, 'utf8');
      let fixed = false;

      if (content.includes('npm ')) {
        content = content.replace(/pnpm install/g, 'pnpm install');
        content = content.replace(/pnpm run/g, 'pnpm run');
        content = content.replace(/pnpm exec/g, 'pnpm exec');
        content = content.replace(/pnpm install --frozen-lockfile/g, 'pnpm install --frozen-lockfile');
        fixed = true;
      }

      if (fixed) {
        fs.writeFileSync(workflowPath, content);
        FIXES.push({ file: workflowPath, action: 'fixed npm references' });
      }
    } catch (e) {
      // Skip
    }
  }
}

// Report
console.log('\n📊 ENFORCEMENT REPORT\n');
console.log(`Found ${VIOLATIONS.length} violations`);
console.log(`Applied ${FIXES.length} fixes\n`);

if (VIOLATIONS.length > 0) {
  console.log('⚠️  VIOLATIONS FOUND:\n');
  for (const violation of VIOLATIONS) {
    console.log(`   ${violation.type}: ${violation.file}`);
    if (violation.violations) {
      violation.violations.forEach(v => console.log(`      - ${v}`));
    } else if (violation.violation) {
      console.log(`      - ${violation.violation}`);
    }
  }
}

if (FIXES.length > 0) {
  console.log('\n✅ FIXES APPLIED:\n');
  for (const fix of FIXES) {
    console.log(`   ✅ ${fix.action}: ${fix.file}`);
  }
}

if (VIOLATIONS.length === 0 && FIXES.length === 0) {
  console.log('✅ No violations found. All boundaries respected.');
} else {
  console.log('\n🛡️ Boundary enforcement complete. All violations fixed.');
}

