#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Review and Update All Platforms and Apps
 * - Carefully reviews all apps
 * - Checks platform configurations
 * - Updates and corrects issues
 * - Integrates with experiment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const REPORT_FILE = path.join(rootDir, 'PLATFORMS_APPS_REVIEW.json');

// Review an app
function reviewApp(appPath, appName) {
  const review = {
    name: appName,
    path: appPath,
    exists: false,
    platform: null,
    packageJson: null,
    configFiles: {},
    issues: [],
    fixes: [],
    status: 'unknown'
  };

  if (!fs.existsSync(appPath)) {
    review.issues.push('App directory does not exist');
    return review;
  }

  review.exists = true;

  // Check package.json
  const packageJsonPath = path.join(appPath, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    try {
      review.packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    } catch (e) {
      review.issues.push('Invalid package.json');
      return review;
    }
  } else {
    review.issues.push('Missing package.json');
    return review;
  }

  // Determine platform
  if (review.packageJson.dependencies?.next || review.packageJson.devDependencies?.next) {
    review.platform = 'nextjs';
  } else if (review.packageJson.dependencies?.vite || review.packageJson.devDependencies?.vite) {
    review.platform = 'vite';
  } else if (review.packageJson.dependencies?.react || review.packageJson.devDependencies?.react) {
    review.platform = 'react';
  } else {
    review.platform = 'unknown';
  }

  // Check config files
  const configFiles = {
    vite: path.join(appPath, 'vite.config.ts'),
    next: path.join(appPath, 'next.config.js'),
    vercel: path.join(appPath, 'vercel.json'),
    tsconfig: path.join(appPath, 'tsconfig.json')
  };

  for (const [type, configPath] of Object.entries(configFiles)) {
    if (fs.existsSync(configPath)) {
      try {
        if (type === 'vercel' || type === 'tsconfig') {
          review.configFiles[type] = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        } else {
          review.configFiles[type] = fs.readFileSync(configPath, 'utf-8');
        }
      } catch (e) {
        review.issues.push(`Invalid ${type} config`);
      }
    }
  }

  // Review issues
  reviewIssues(review);
  
  // Generate fixes
  generateFixes(review);

  // Determine status
  if (review.issues.length === 0 && review.fixes.length === 0) {
    review.status = 'ok';
  } else if (review.issues.length > 0 && review.fixes.length === 0) {
    review.status = 'needs-fix';
  } else if (review.fixes.length > 0) {
    review.status = 'fixable';
  }

  return review;
}

// Review issues
function reviewIssues(review) {
  // Check React version
  const reactVersion = review.packageJson.dependencies?.react || review.packageJson.devDependencies?.react;
  if (reactVersion && !reactVersion.includes('^18')) {
    review.issues.push(`React version should be ^18.2.0, found: ${reactVersion}`);
  }

  // Check for missing build script
  if (!review.packageJson.scripts?.build) {
    review.issues.push('Missing build script');
  }

  // Check for missing dev script
  if (!review.packageJson.scripts?.dev) {
    review.issues.push('Missing dev script');
  }

  // Platform-specific checks
  if (review.platform === 'vite') {
    if (!review.configFiles.vite) {
      review.issues.push('Missing vite.config.ts');
    }
    if (!review.configFiles.vercel) {
      review.issues.push('Missing vercel.json for deployment');
    }
  }

  if (review.platform === 'nextjs') {
    if (!review.configFiles.next) {
      review.issues.push('Missing next.config.js');
    }
  }

  // Check TypeScript config
  if (review.packageJson.dependencies?.typescript || review.packageJson.devDependencies?.typescript) {
    if (!review.configFiles.tsconfig) {
      review.issues.push('Missing tsconfig.json');
    }
  }

  // Check engines
  if (!review.packageJson.engines) {
    review.issues.push('Missing engines specification');
  }

  // Check license
  if (review.packageJson.license !== 'CC0-1.0') {
    review.issues.push('License should be CC0-1.0');
  }
}

// Generate fixes
function generateFixes(review) {
  // Fix React version
  const reactVersion = review.packageJson.dependencies?.react || review.packageJson.devDependencies?.react;
  if (reactVersion && !reactVersion.includes('^18')) {
    review.fixes.push({
      type: 'update-react-version',
      description: `Update React to ^18.2.0`,
      file: path.join(review.path, 'package.json'),
      action: () => {
        const pkg = JSON.parse(fs.readFileSync(path.join(review.path, 'package.json'), 'utf-8'));
        if (pkg.dependencies?.react) pkg.dependencies.react = '^18.2.0';
        if (pkg.devDependencies?.react) pkg.devDependencies.react = '^18.2.0';
        if (pkg.dependencies?.['react-dom']) pkg.dependencies['react-dom'] = '^18.2.0';
        if (pkg.devDependencies?.['react-dom']) pkg.devDependencies['react-dom'] = '^18.2.0';
        fs.writeFileSync(path.join(review.path, 'package.json'), JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
      }
    });
  }

  // Fix missing build script
  if (!review.packageJson.scripts?.build) {
    review.fixes.push({
      type: 'add-build-script',
      description: 'Add build script',
      file: path.join(review.path, 'package.json'),
      action: () => {
        const pkg = JSON.parse(fs.readFileSync(path.join(review.path, 'package.json'), 'utf-8'));
        if (!pkg.scripts) pkg.scripts = {};
        if (review.platform === 'vite') {
          pkg.scripts.build = 'vite build';
        } else if (review.platform === 'nextjs') {
          pkg.scripts.build = 'next build';
        } else {
          pkg.scripts.build = 'tsc && vite build';
        }
        fs.writeFileSync(path.join(review.path, 'package.json'), JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
      }
    });
  }

  // Fix missing dev script
  if (!review.packageJson.scripts?.dev) {
    review.fixes.push({
      type: 'add-dev-script',
      description: 'Add dev script',
      file: path.join(review.path, 'package.json'),
      action: () => {
        const pkg = JSON.parse(fs.readFileSync(path.join(review.path, 'package.json'), 'utf-8'));
        if (!pkg.scripts) pkg.scripts = {};
        if (review.platform === 'vite') {
          pkg.scripts.dev = 'vite dev';
        } else if (review.platform === 'nextjs') {
          pkg.scripts.dev = 'next dev';
        } else {
          pkg.scripts.dev = 'vite dev';
        }
        fs.writeFileSync(path.join(review.path, 'package.json'), JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
      }
    });
  }

  // Fix missing vite.config.ts
  if (review.platform === 'vite' && !review.configFiles.vite) {
    review.fixes.push({
      type: 'create-vite-config',
      description: 'Create vite.config.ts',
      file: path.join(review.path, 'vite.config.ts'),
      action: () => {
        const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    port: 3000,
    open: true
  }
})
`;
        fs.writeFileSync(path.join(review.path, 'vite.config.ts'), viteConfig, 'utf-8');
      }
    });
  }

  // Fix missing vercel.json
  if ((review.platform === 'vite' || review.platform === 'nextjs') && !review.configFiles.vercel) {
    review.fixes.push({
      type: 'create-vercel-config',
      description: 'Create vercel.json',
      file: path.join(review.path, 'vercel.json'),
      action: () => {
        const vercelConfig = {
          buildCommand: 'pnpm build',
          outputDirectory: review.platform === 'nextjs' ? '.next' : 'dist',
          installCommand: 'pnpm install',
          framework: review.platform === 'nextjs' ? 'nextjs' : null
        };
        fs.writeFileSync(path.join(review.path, 'vercel.json'), JSON.stringify(vercelConfig, null, 2) + '\n', 'utf-8');
      }
    });
  }

  // Fix missing engines
  if (!review.packageJson.engines) {
    review.fixes.push({
      type: 'add-engines',
      description: 'Add engines specification',
      file: path.join(review.path, 'package.json'),
      action: () => {
        const pkg = JSON.parse(fs.readFileSync(path.join(review.path, 'package.json'), 'utf-8'));
        pkg.engines = {
          node: '*',
          pnpm: '*'
        };
        fs.writeFileSync(path.join(review.path, 'package.json'), JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
      }
    });
  }

  // Fix license
  if (review.packageJson.license !== 'CC0-1.0') {
    review.fixes.push({
      type: 'fix-license',
      description: 'Set license to CC0-1.0',
      file: path.join(review.path, 'package.json'),
      action: () => {
        const pkg = JSON.parse(fs.readFileSync(path.join(review.path, 'package.json'), 'utf-8'));
        pkg.license = 'CC0-1.0';
        fs.writeFileSync(path.join(review.path, 'package.json'), JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
      }
    });
  }
}

// Apply fixes
function applyFixes(review) {
  const applied = [];
  const failed = [];

  for (const fix of review.fixes) {
    try {
      fix.action();
      applied.push(fix);
    } catch (e) {
      failed.push({ fix, error: e.message });
    }
  }

  return { applied, failed };
}

// Find all apps
function findAllApps() {
  const apps = [];
  const appsDir = path.join(rootDir, 'apps');

  if (!fs.existsSync(appsDir)) {
    return apps;
  }

  try {
    const entries = fs.readdirSync(appsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        apps.push({
          name: entry.name,
          path: path.join(appsDir, entry.name)
        });
      }
    }
  } catch (e) {
    // Error reading apps
  }

  return apps;
}

// Main function
async function main() {
  console.log('🔍 Reviewing all platforms and apps...');
  console.log('');

  const apps = findAllApps();
  console.log(`Found ${apps.length} apps`);
  console.log('');

  const reviews = {};
  const summary = {
    total: apps.length,
    ok: 0,
    needsFix: 0,
    fixable: 0,
    totalIssues: 0,
    totalFixes: 0,
    appliedFixes: 0,
    failedFixes: 0
  };

  for (const app of apps) {
    console.log(`📱 Reviewing ${app.name}...`);
    const review = reviewApp(app.path, app.name);
    reviews[app.name] = review;

    console.log(`   Platform: ${review.platform || 'unknown'}`);
    console.log(`   Status: ${review.status}`);
    console.log(`   Issues: ${review.issues.length}`);
    console.log(`   Fixes: ${review.fixes.length}`);

    if (review.status === 'ok') summary.ok++;
    if (review.status === 'needs-fix') summary.needsFix++;
    if (review.status === 'fixable') summary.fixable++;

    summary.totalIssues += review.issues.length;
    summary.totalFixes += review.fixes.length;

    // Apply fixes
    if (review.fixes.length > 0) {
      console.log(`   Applying ${review.fixes.length} fixes...`);
      const result = applyFixes(review);
      summary.appliedFixes += result.applied.length;
      summary.failedFixes += result.failed.length;
      console.log(`   ✅ Applied: ${result.applied.length}, ❌ Failed: ${result.failed.length}`);
    }

    console.log('');
  }

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    summary,
    reviews
  };

  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));

  console.log('📊 Summary:');
  console.log(`   - Total Apps: ${summary.total}`);
  console.log(`   - OK: ${summary.ok}`);
  console.log(`   - Needs Fix: ${summary.needsFix}`);
  console.log(`   - Fixable: ${summary.fixable}`);
  console.log(`   - Total Issues: ${summary.totalIssues}`);
  console.log(`   - Total Fixes: ${summary.totalFixes}`);
  console.log(`   - Applied Fixes: ${summary.appliedFixes}`);
  console.log(`   - Failed Fixes: ${summary.failedFixes}`);
  console.log('');
  console.log(`✅ Report saved to: ${REPORT_FILE}`);

  return report;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default main;

