#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - Tech Stack Analysis & Cleanup
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * Analyzes and cleans up:
 * - Next.js usage (online and offline)
 * - Vite configs
 * - React configs
 * - Render configs
 * - Vercel configs (to remove)
 * - Standardizes tech stack
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync, unlinkSync, renameSync } from 'fs';
import { join, dirname, relative, basename } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { homedir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const homeDir = homedir();

const PROJECT_INFO = {
  name: 'Cathedral of Circuits',
  version: '1.0.0',
  fullName: 'Cathedral of Circuits - Magnum Opus Version 1.0',
  author: 'Rebecca Respawn'
};

const WORKSPACE_DIRS = [
  join(homeDir, 'cathedral-master-deployment'),
  join(homeDir, 'cathedral-v1-consolidated'),
  join(homeDir, 'cathedral-fixed-clean'),
  join(homeDir, 'cathedral-real'),
  join(homeDir, 'Roo-Code'),
  join(homeDir, 'cosmogenesis-engine')
].filter(dir => existsSync(dir));

function findFiles(pattern, dir = rootDir) {
  const results = [];
  try {
    const result = execSync(`rg --files --glob "${pattern}"`, {
      cwd: dir,
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore']
    });
    return result.trim().split('\n').filter(Boolean);
  } catch (e) {
    return [];
  }
}

function findPackageJsonFiles(dir = rootDir) {
  return findFiles('**/package.json', dir);
}

function analyzePackageJson(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const pkg = JSON.parse(content);
    
    return {
      path: filePath,
      name: pkg.name,
      hasNext: !!pkg.dependencies?.next || !!pkg.devDependencies?.next,
      hasVite: !!pkg.dependencies?.vite || !!pkg.devDependencies?.vite,
      hasReact: !!pkg.dependencies?.react || !!pkg.devDependencies?.react,
      nextVersion: pkg.dependencies?.next || pkg.devDependencies?.next || null,
      viteVersion: pkg.dependencies?.vite || pkg.devDependencies?.vite || null,
      reactVersion: pkg.dependencies?.react || pkg.devDependencies?.react || null,
      framework: determineFramework(pkg),
      scripts: pkg.scripts || {},
      isApp: filePath.includes('/apps/'),
      isPackage: filePath.includes('/packages/')
    };
  } catch (e) {
    return {
      path: filePath,
      error: e.message
    };
  }
}

function determineFramework(pkg) {
  if (pkg.dependencies?.next || pkg.devDependencies?.next) return 'next';
  if (pkg.dependencies?.vite || pkg.devDependencies?.vite) return 'vite';
  if (pkg.dependencies?.react || pkg.devDependencies?.react) return 'react';
  if (pkg.dependencies?.svelte || pkg.devDependencies?.svelte) return 'svelte';
  return 'unknown';
}

function analyzeConfigFiles() {
  const configs = {
    next: findFiles('**/next.config.{js,ts,json}'),
    vite: findFiles('**/vite.config.{js,ts}'),
    vercel: findFiles('**/vercel.json'),
    render: findFiles('**/render.yaml'),
    netlify: findFiles('**/netlify.toml'),
    cloudflare: findFiles('**/wrangler.toml')
  };
  
  return configs;
}

function analyzeTechStack() {
  console.log('📊 Analyzing tech stack across workspaces...\n');
  
  const analysis = {
    workspaces: {},
    summary: {
      nextjs: { count: 0, packages: [], apps: [] },
      vite: { count: 0, packages: [], apps: [] },
      react: { count: 0, packages: [], apps: [] },
      vercel: { count: 0, files: [] },
      render: { count: 0, files: [] },
      configs: {}
    }
  };
  
  WORKSPACE_DIRS.forEach(wsDir => {
    const wsName = basename(wsDir);
    const pkgs = findPackageJsonFiles(wsDir);
    
    analysis.workspaces[wsName] = {
      packages: [],
      stats: {
        total: pkgs.length,
        nextjs: 0,
        vite: 0,
        react: 0
      }
    };
    
    pkgs.forEach(pkgPath => {
      const analysis = analyzePackageJson(pkgPath);
      if (analysis.error) return;
      
      if (analysis.hasNext) {
        analysis.summary.nextjs.count++;
        if (analysis.isApp) {
          analysis.summary.nextjs.apps.push({
            name: analysis.name,
            path: relative(rootDir, analysis.path),
            version: analysis.nextVersion
          });
        } else {
          analysis.summary.nextjs.packages.push({
            name: analysis.name,
            path: relative(rootDir, analysis.path),
            version: analysis.nextVersion
          });
        }
        analysis.workspaces[wsName].stats.nextjs++;
      }
      
      if (analysis.hasVite) {
        analysis.summary.vite.count++;
        if (analysis.isApp) {
          analysis.summary.vite.apps.push({
            name: analysis.name,
            path: relative(rootDir, analysis.path),
            version: analysis.viteVersion
          });
        } else {
          analysis.summary.vite.packages.push({
            name: analysis.name,
            path: relative(rootDir, analysis.path),
            version: analysis.viteVersion
          });
        }
        analysis.workspaces[wsName].stats.vite++;
      }
      
      if (analysis.hasReact) {
        analysis.summary.react.count++;
        if (analysis.isApp) {
          analysis.summary.react.apps.push({
            name: analysis.name,
            path: relative(rootDir, analysis.path),
            version: analysis.reactVersion
          });
        } else {
          analysis.summary.react.packages.push({
            name: analysis.name,
            path: relative(rootDir, analysis.path),
            version: analysis.reactVersion
          });
        }
        analysis.workspaces[wsName].stats.react++;
      }
      
      analysis.workspaces[wsName].packages.push({
        name: analysis.name,
        framework: analysis.framework,
        path: relative(rootDir, analysis.path)
      });
    });
    
    const configs = analyzeConfigFiles(wsDir);
    analysis.summary.configs[wsName] = configs;
    analysis.summary.vercel.count += configs.vercel.length;
    analysis.summary.render.count += configs.render.length;
  });
  
  return analysis;
}

function cleanupVercelConfigs() {
  console.log('🗑️  Cleaning up Vercel configs...\n');
  
  const vercelConfigs = findFiles('**/vercel.json');
  const archiveDir = join(rootDir, 'archive', 'vercel-removed');
  if (!existsSync(archiveDir)) {
    mkdirSync(archiveDir, { recursive: true });
  }
  
  const cleaned = [];
  
  vercelConfigs.forEach(configPath => {
    try {
      const fileName = basename(configPath);
      const relPath = relative(rootDir, dirname(configPath));
      const archivePath = join(archiveDir, relPath ? `${relPath.replace(/\//g, '_')}_${fileName}` : fileName);
      
      renameSync(configPath, archivePath);
      cleaned.push({
        removed: relative(rootDir, configPath),
        archived: relative(rootDir, archivePath)
      });
      console.log(`   ✅ Archived: ${relative(rootDir, configPath)}`);
    } catch (e) {
      console.log(`   ⚠️  Error: ${relative(rootDir, configPath)} - ${e.message}`);
    }
  });
  
  return cleaned;
}

function standardizeViteConfigs() {
  console.log('⚙️  Standardizing Vite configs...\n');
  
  const viteConfigs = findFiles('**/vite.config.{js,ts}');
  const standardized = [];
  
  viteConfigs.forEach(configPath => {
    try {
      const content = readFileSync(configPath, 'utf-8');
      
      // Check if it needs standardization
      if (!content.includes('Cathedral of Circuits')) {
        const standardizedContent = `// ⚗️ Cathedral of Circuits - Vite Configuration
// Magnum Opus Version 1.0
// Author: Rebecca Respawn (pen name)

${content}`;
        
        writeFileSync(configPath, standardizedContent);
        standardized.push(relative(rootDir, configPath));
        console.log(`   ✅ Standardized: ${relative(rootDir, configPath)}`);
      }
    } catch (e) {
      console.log(`   ⚠️  Error: ${relative(rootDir, configPath)} - ${e.message}`);
    }
  });
  
  return standardized;
}

function createRenderConfigs() {
  console.log('🚀 Creating Render configs where needed...\n');
  
  const apps = findFiles('**/apps/*/package.json');
  const created = [];
  
  apps.forEach(pkgPath => {
    const appDir = dirname(pkgPath);
    const renderPath = join(appDir, 'render.yaml');
    
    if (!existsSync(renderPath)) {
      const appName = basename(appDir);
      const config = `# ⚗️ Cathedral of Circuits - Render Configuration
# Magnum Opus Version 1.0
# Author: Rebecca Respawn (pen name)
# App: ${appName}

services:
  - type: web
    name: ${appName}
    env: node
    buildCommand: pnpm install && pnpm run build
    startCommand: pnpm run start
    staticPublish: dist
    envVars:
      - key: NODE_ENV
        value: production
    autoDeploy: true
`;

      writeFileSync(renderPath, config);
      created.push(relative(rootDir, renderPath));
      console.log(`   ✅ Created: ${relative(rootDir, renderPath)}`);
    }
  });
  
  return created;
}

async function main() {
  console.log(`⚗️  ${PROJECT_INFO.fullName}`);
  console.log(`Author: ${PROJECT_INFO.author} (pen name)`);
  console.log(`Tech Stack Analysis & Cleanup Tool\n`);

  // 1. Analyze tech stack
  const analysis = analyzeTechStack();
  
  // 2. Display findings
  console.log('📊 TECH STACK SUMMARY:\n');
  console.log(`Next.js:`);
  console.log(`   Total: ${analysis.summary.nextjs.count}`);
  console.log(`   Apps: ${analysis.summary.nextjs.apps.length}`);
  analysis.summary.nextjs.apps.forEach(app => {
    console.log(`     - ${app.name} (${app.version || 'unknown'})`);
  });
  console.log(`   Packages: ${analysis.summary.nextjs.packages.length}`);
  analysis.summary.nextjs.packages.slice(0, 5).forEach(pkg => {
    console.log(`     - ${pkg.name}`);
  });
  if (analysis.summary.nextjs.packages.length > 5) {
    console.log(`     ... and ${analysis.summary.nextjs.packages.length - 5} more`);
  }
  
  console.log(`\nVite:`);
  console.log(`   Total: ${analysis.summary.vite.count}`);
  console.log(`   Apps: ${analysis.summary.vite.apps.length}`);
  analysis.summary.vite.apps.forEach(app => {
    console.log(`     - ${app.name} (${app.version || 'unknown'})`);
  });
  
  console.log(`\nReact:`);
  console.log(`   Total: ${analysis.summary.react.count}`);
  console.log(`   Apps: ${analysis.summary.react.apps.length}`);
  analysis.summary.react.apps.slice(0, 10).forEach(app => {
    console.log(`     - ${app.name}`);
  });
  if (analysis.summary.react.apps.length > 10) {
    console.log(`     ... and ${analysis.summary.react.apps.length - 10} more`);
  }
  
  console.log(`\nConfig Files:`);
  console.log(`   Vercel: ${analysis.summary.vercel.count}`);
  console.log(`   Render: ${analysis.summary.render.count}`);
  
  // 3. Cleanup
  console.log('\n\n🧹 CLEANUP ACTIONS:\n');
  
  const vercelCleaned = cleanupVercelConfigs();
  const viteStandardized = standardizeViteConfigs();
  const renderCreated = createRenderConfigs();
  
  // 4. Generate report
  const report = {
    project: PROJECT_INFO,
    analysis,
    cleanup: {
      vercelRemoved: vercelCleaned.length,
      viteStandardized: viteStandardized.length,
      renderCreated: renderCreated.length
    },
    timestamp: new Date().toISOString()
  };
  
  const reportPath = join(rootDir, 'tech-stack-analysis.json');
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  const summaryPath = join(rootDir, 'TECH_STACK_SUMMARY.md');
  const summary = `# Tech Stack Analysis Summary

**Generated**: ${new Date().toISOString()}
**Project**: ${PROJECT_INFO.fullName}

## Findings

### Next.js Usage
- **Total Packages**: ${analysis.summary.nextjs.count}
- **Apps**: ${analysis.summary.nextjs.apps.length}
- **Packages**: ${analysis.summary.nextjs.packages.length}

**Apps with Next.js:**
${analysis.summary.nextjs.apps.map(a => `- ${a.name} (${a.version || 'unknown'})`).join('\n')}

### Vite Usage
- **Total Packages**: ${analysis.summary.vite.count}
- **Apps**: ${analysis.summary.vite.apps.length}

**Apps with Vite:**
${analysis.summary.vite.apps.map(a => `- ${a.name} (${a.version || 'unknown'})`).join('\n')}

### React Usage
- **Total Packages**: ${analysis.summary.react.count}
- **Apps**: ${analysis.summary.react.apps.length}

## Cleanup Actions

- ✅ Vercel configs removed: ${vercelCleaned.length}
- ✅ Vite configs standardized: ${viteStandardized.length}
- ✅ Render configs created: ${renderCreated.length}

## Recommendations

1. **Standardize on Vite** for new apps (faster, simpler)
2. **Migrate Next.js apps** to Vite if possible (unless SSR is needed)
3. **Keep React** as core UI library
4. **Use Render** for deployments (Vercel removed)

---

**Part of ${PROJECT_INFO.fullName}**
`;

  writeFileSync(summaryPath, summary);
  
  console.log('\n\n✅ COMPLETE!\n');
  console.log(`📄 Reports:`);
  console.log(`   - ${relative(rootDir, reportPath)}`);
  console.log(`   - ${relative(rootDir, summaryPath)}\n`);
}

main().catch(console.error);






