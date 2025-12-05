#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Fix Vercel, Vite, React, and Version Issues
 * - Fixes Vercel configuration
 * - Standardizes Vite versions
 * - Standardizes React versions
 * - Fixes package.json versions
 * - Ensures compatibility
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Standard versions
const STANDARD_VERSIONS = {
  vite: '^5.0.0',
  react: '^18.2.0',
  'react-dom': '^18.2.0',
  '@vitejs/plugin-react': '^4.2.0',
  typescript: '^5.3.0',
  '@types/react': '^18.2.0',
  '@types/react-dom': '^18.2.0'
};

// Fix package.json
function fixPackageJson(packageJsonPath) {
  try {
    const content = fs.readFileSync(packageJsonPath, 'utf-8');
    const pkg = JSON.parse(content);
    let updated = false;

    // Fix dependencies
    if (pkg.dependencies) {
      for (const [dep, version] of Object.entries(STANDARD_VERSIONS)) {
        if (pkg.dependencies[dep] && pkg.dependencies[dep] !== version) {
          pkg.dependencies[dep] = version;
          updated = true;
        }
      }
    }

    // Fix devDependencies
    if (pkg.devDependencies) {
      for (const [dep, version] of Object.entries(STANDARD_VERSIONS)) {
        if (pkg.devDependencies[dep] && pkg.devDependencies[dep] !== version) {
          pkg.devDependencies[dep] = version;
          updated = true;
        }
      }
    }

    // Ensure engines
    if (!pkg.engines) {
      pkg.engines = {};
    }
    if (!pkg.engines.node) {
      pkg.engines.node = '*';
    }
    if (!pkg.engines.pnpm) {
      pkg.engines.pnpm = '*';
    }

    // Ensure packageManager
    if (!pkg.packageManager) {
      pkg.packageManager = 'pnpm@10.23.0';
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

// Fix vite.config.ts
function fixViteConfig(viteConfigPath) {
  try {
    let content = fs.readFileSync(viteConfigPath, 'utf-8');
    let updated = false;

    // Ensure React plugin is imported and used
    if (content.includes('vite') && !content.includes('@vitejs/plugin-react')) {
      // Try to add React plugin
      if (content.includes('import') && content.includes('defineConfig')) {
        const importMatch = content.match(/import\s+.*\s+from\s+['"]vite['"]/);
        if (importMatch) {
          content = content.replace(
            /import\s+.*\s+from\s+['"]vite['"]/,
            `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'`
          );
          updated = true;
        }
      }

      // Add react plugin to plugins array
      if (content.includes('plugins:') && !content.includes('react()')) {
        content = content.replace(
          /plugins:\s*\[/,
          'plugins: [\n    react(),'
        );
        updated = true;
      }
    }

    // Ensure base path for Vercel
    if (!content.includes('base:') && content.includes('export default')) {
      content = content.replace(
        /export default defineConfig\(/,
        `export default defineConfig({\n  base: '/',\n`
      );
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(viteConfigPath, content, 'utf-8');
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

// Fix Vercel config
function fixVercelConfig() {
  const vercelPath = path.join(rootDir, 'vercel.json');
  const vercelConfig = {
    version: 2,
    buildCommand: 'pnpm build',
    installCommand: 'pnpm install',
    outputDirectory: 'dist',
    framework: null,
    rewrites: [
      {
        source: '/(.*)',
        destination: '/index.html'
      }
    ]
  };

  try {
    if (fs.existsSync(vercelPath)) {
      const existing = JSON.parse(fs.readFileSync(vercelPath, 'utf-8'));
      // Merge with existing config
      Object.assign(vercelConfig, existing);
    }
    fs.writeFileSync(vercelPath, JSON.stringify(vercelConfig, null, 2) + '\n', 'utf-8');
    return true;
  } catch (e) {
    return false;
  }
}

// Find all apps with Vite
function findViteApps() {
  const apps = [];
  const appsDir = path.join(rootDir, 'apps');

  if (!fs.existsSync(appsDir)) {
    return apps;
  }

  try {
    const entries = fs.readdirSync(appsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const appPath = path.join(appsDir, entry.name);
        const packageJsonPath = path.join(appPath, 'package.json');
        const viteConfigPath = path.join(appPath, 'vite.config.ts');

        if (fs.existsSync(packageJsonPath)) {
          try {
            const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
            if (pkg.dependencies?.vite || pkg.devDependencies?.vite) {
              apps.push({
                name: entry.name,
                path: appPath,
                packageJson: packageJsonPath,
                viteConfig: fs.existsSync(viteConfigPath) ? viteConfigPath : null
              });
            }
          } catch (e) {
            // Invalid package.json
          }
        }
      }
    }
  } catch (e) {
    // Error reading apps
  }

  return apps;
}

// Main function
async function main() {
  console.log('🔧 Fixing Vercel, Vite, React, and Version Issues...');
  console.log('');

  const fixes = {
    packagesFixed: [],
    viteConfigsFixed: [],
    vercelFixed: false,
    errors: []
  };

  // Fix Vercel config
  console.log('📝 Fixing Vercel configuration...');
  if (fixVercelConfig()) {
    fixes.vercelFixed = true;
    console.log('   ✅ Vercel config fixed');
  } else {
    fixes.errors.push('Failed to fix Vercel config');
    console.log('   ⚠️  Vercel config issue');
  }
  console.log('');

  // Find and fix Vite apps
  console.log('🔍 Finding Vite apps...');
  const viteApps = findViteApps();
  console.log(`   Found ${viteApps.length} Vite apps`);
  console.log('');

  for (const app of viteApps) {
    console.log(`📦 Fixing ${app.name}...`);

    // Fix package.json
    if (fixPackageJson(app.packageJson)) {
      fixes.packagesFixed.push(app.name);
      console.log(`   ✅ package.json fixed`);
    }

    // Fix vite.config.ts
    if (app.viteConfig) {
      if (fixViteConfig(app.viteConfig)) {
        fixes.viteConfigsFixed.push(app.name);
        console.log(`   ✅ vite.config.ts fixed`);
      }
    } else {
      // Create vite.config.ts if missing
      const viteConfigPath = path.join(app.path, 'vite.config.ts');
      const viteConfigContent = `import { defineConfig } from 'vite'
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
      try {
        fs.writeFileSync(viteConfigPath, viteConfigContent, 'utf-8');
        fixes.viteConfigsFixed.push(app.name);
        console.log(`   ✅ Created vite.config.ts`);
      } catch (e) {
        fixes.errors.push(`Failed to create vite.config.ts for ${app.name}`);
      }
    }

    console.log('');
  }

  // Summary
  console.log('📊 Summary:');
  console.log(`   - Vercel config: ${fixes.vercelFixed ? '✅ Fixed' : '❌ Failed'}`);
  console.log(`   - Packages fixed: ${fixes.packagesFixed.length}`);
  console.log(`   - Vite configs fixed: ${fixes.viteConfigsFixed.length}`);
  console.log(`   - Errors: ${fixes.errors.length}`);
  console.log('');

  if (fixes.errors.length > 0) {
    console.log('⚠️  Errors:');
    for (const error of fixes.errors) {
      console.log(`   - ${error}`);
    }
    console.log('');
  }

  // Write report
  const report = {
    timestamp: new Date().toISOString(),
    fixes
  };

  fs.writeFileSync(
    path.join(rootDir, 'VERCEL_VITE_REACT_FIXES.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('✅ Fix report saved to VERCEL_VITE_REACT_FIXES.json');
  console.log('');
  console.log('💡 Next steps:');
  console.log('   1. Run: pnpm install');
  console.log('   2. Run: pnpm build');
  console.log('   3. Test: pnpm dev');
  console.log('   4. Deploy: vercel --prod');

  return report;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default main;

