#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - Replace Vercel with Render, Vite with esbuild
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * Replaces:
 * - Vercel → Render (free deployment)
 * - Vite → esbuild (faster, simpler, free, fits React/Node work)
 * 
 * esbuild is perfect because:
 * - Free and open source
 * - Extremely fast (10-100x faster than Vite/Webpack)
 * - Perfect for React apps
 * - Simple configuration
 * - No dev server overhead
 * - Works great with Node.js
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync, renameSync } from 'fs';
import { join, dirname, relative, basename } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const PROJECT_INFO = {
  name: 'Cathedral of Circuits',
  version: '1.0.0',
  fullName: 'Cathedral of Circuits - Magnum Opus Version 1.0',
  author: 'Rebecca Respawn'
};

function findFiles(pattern) {
  try {
    const result = execSync(`rg --files --glob "${pattern}"`, {
      cwd: rootDir,
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore']
    });
    return result.trim().split('\n').filter(Boolean);
  } catch (e) {
    return [];
  }
}

function findApps() {
  const appsDir = join(rootDir, 'apps');
  if (!existsSync(appsDir)) return [];
  
  return readdirSync(appsDir)
    .filter(item => {
      const itemPath = join(appsDir, item);
      return statSync(itemPath).isDirectory() && 
             existsSync(join(itemPath, 'package.json'));
    })
    .map(item => join(appsDir, item));
}

function archiveVercelConfigs() {
  const vercelConfigs = findFiles('**/vercel.json');
  const archiveDir = join(rootDir, 'archive', 'vercel-removed');
  if (!existsSync(archiveDir)) {
    mkdirSync(archiveDir, { recursive: true });
  }
  
  const archived = [];
  vercelConfigs.forEach(configPath => {
    try {
      const fileName = basename(configPath);
      const relPath = relative(rootDir, dirname(configPath));
      const archivePath = join(archiveDir, relPath ? `${relPath.replace(/\//g, '_')}_${fileName}` : fileName);
      renameSync(configPath, archivePath);
      archived.push(relative(rootDir, configPath));
    } catch (e) {
      // Skip if already moved
    }
  });
  
  return archived;
}

function archiveViteConfigs() {
  const viteConfigs = findFiles('**/vite.config.{js,ts}');
  const archiveDir = join(rootDir, 'archive', 'vite-replaced');
  if (!existsSync(archiveDir)) {
    mkdirSync(archiveDir, { recursive: true });
  }
  
  const archived = [];
  viteConfigs.forEach(configPath => {
    try {
      const fileName = basename(configPath);
      const relPath = relative(rootDir, dirname(configPath));
      const archivePath = join(archiveDir, relPath ? `${relPath.replace(/\//g, '_')}_${fileName}` : fileName);
      renameSync(configPath, archivePath);
      archived.push(relative(rootDir, configPath));
    } catch (e) {
      // Skip if already moved
    }
  });
  
  return archived;
}

function createEsbuildConfig(appPath) {
  const appName = basename(appPath);
  const pkgPath = join(appPath, 'package.json');
  
  if (!existsSync(pkgPath)) return null;
  
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    const hasReact = !!(pkg.dependencies?.react || pkg.devDependencies?.react);
    
    const esbuildPath = join(appPath, 'esbuild.config.js');
    
    const config = `// ⚗️ Cathedral of Circuits - esbuild Configuration
// Magnum Opus Version 1.0
// Author: Rebecca Respawn (pen name)
// App: ${appName}

import * as esbuild from 'esbuild';
${hasReact ? "import { readFileSync } from 'fs';" : ''}

/**
 * esbuild config - Fast, free, perfect for React/Node
 */
const config = {
  entryPoints: ['src/index.js', 'src/index.ts', 'src/index.tsx'].filter(
    file => {
      try {
        require('fs').existsSync(require('path').join(__dirname, file));
      } catch {
        return false;
      }
    }
  ) || ['src/index.js'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  minify: true,
  sourcemap: true,
  ${hasReact ? `
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  loader: {
    '.js': 'jsx',
    '.jsx': 'jsx',
    '.ts': 'ts',
    '.tsx': 'tsx',
  },` : ''}
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  external: hasReact ? [] : ['react', 'react-dom'],
};

// Build function
export async function build() {
  await esbuild.build(config);
  console.log('✅ Build complete with esbuild');
}

// Watch function
export async function watch() {
  const ctx = await esbuild.context(config);
  await ctx.watch();
  console.log('👀 Watching with esbuild...');
}

// Serve function (for development)
export async function serve() {
  const ctx = await esbuild.context(config);
  const { host, port } = await ctx.serve({
    servedir: 'dist',
    port: 3000
  });
  console.log(\`🚀 Server running at http://\${host}:\${port}\`);
}

if (import.meta.url === \`file://\${process.argv[1]}\`) {
  const command = process.argv[2] || 'build';
  if (command === 'watch') watch();
  else if (command === 'serve') serve();
  else build();
}
`;

    writeFileSync(esbuildPath, config);
    return esbuildPath;
  } catch (e) {
    return null;
  }
}

function updatePackageJson(appPath) {
  const pkgPath = join(appPath, 'package.json');
  if (!existsSync(pkgPath)) return { updated: false };
  
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    let updated = false;
    
    // Remove Vite
    if (pkg.dependencies?.vite) {
      delete pkg.dependencies.vite;
      updated = true;
    }
    if (pkg.devDependencies?.vite) {
      delete pkg.devDependencies.vite;
      updated = true;
    }
    
    // Add esbuild
    if (!pkg.devDependencies) pkg.devDependencies = {};
    if (!pkg.devDependencies.esbuild) {
      pkg.devDependencies.esbuild = '^0.20.0';
      updated = true;
    }
    
    // Update scripts
    if (pkg.scripts) {
      if (pkg.scripts.dev?.includes('vite')) {
        pkg.scripts.dev = 'node esbuild.config.js serve';
        updated = true;
      }
      if (pkg.scripts.build?.includes('vite')) {
        pkg.scripts.build = 'node esbuild.config.js build';
        updated = true;
      }
      if (pkg.scripts.preview?.includes('vite')) {
        pkg.scripts.preview = 'node esbuild.config.js serve';
        updated = true;
      }
    }
    
    if (updated) {
      writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    }
    
    return { updated, path: pkgPath };
  } catch (e) {
    return { updated: false, error: e.message };
  }
}

function updateGitHubWorkflow() {
  const workflowPath = join(rootDir, '.github', 'workflows', 'deploy.yml');
  if (!existsSync(workflowPath)) return { updated: false, error: 'Workflow not found' };
  
  try {
    let content = readFileSync(workflowPath, 'utf-8');
    let changed = false;
    
    // Replace Vercel references with Render
    if (content.includes('vercel') || content.includes('Vercel')) {
      content = content.replace(/vercel/gi, 'render');
      content = content.replace(/VERCEL/gi, 'RENDER');
      changed = true;
    }
    
    // Update build commands to use esbuild
    if (content.includes('vite build')) {
      content = content.replace(/vite build/g, 'pnpm run build');
      changed = true;
    }
    
    // Add Render deployment step if missing
    if (!content.includes('deploy:render') && !content.includes('Render')) {
      const deployStep = `
  deploy-render:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/magnum-opus'
    steps:
      - name: Deploy to Render
        run: |
          echo "🚀 Deploying to Render..."
          echo "Connect your GitLab repo to Render at https://render.com"
          echo "Render will auto-deploy on push to main/magnum-opus branches"
`;
      
      // Add before the last closing brace
      content = content.replace(/(\n)$/, deployStep + '$1');
      changed = true;
    }
    
    if (changed) {
      writeFileSync(workflowPath, content);
    }
    
    return { updated: changed, path: workflowPath };
  } catch (e) {
    return { updated: false, error: e.message };
  }
}

function createRenderConfigs() {
  const apps = findApps();
  const created = [];
  
  apps.forEach(appPath => {
    const appName = basename(appPath);
    const renderPath = join(appPath, 'render.yaml');
    
    if (!existsSync(renderPath)) {
      const config = `# ⚗️ Cathedral of Circuits - Render Configuration
# Magnum Opus Version 1.0
# Author: Rebecca Respawn (pen name)
# App: ${appName}

services:
  - type: web
    name: ${appName}
    env: node
    buildCommand: pnpm install && pnpm run build
    startCommand: node dist/index.js || pnpm run start
    staticPublish: dist
    envVars:
      - key: NODE_ENV
        value: production
    autoDeploy: true
    healthCheckPath: /
`;

      writeFileSync(renderPath, config);
      created.push(relative(rootDir, renderPath));
    }
  });
  
  // Create root Render config
  const rootRenderPath = join(rootDir, 'render.yaml');
  if (!existsSync(rootRenderPath)) {
    const rootConfig = `# ⚗️ Cathedral of Circuits - Render Configuration
# Magnum Opus Version 1.0
# Author: Rebecca Respawn (pen name)
# Main deployment configuration

services:
  - type: web
    name: cathedral-of-circuits-main
    env: node
    buildCommand: pnpm install && pnpm run build
    startCommand: node dist/index.js || pnpm run start
    staticPublish: dist
    envVars:
      - key: NODE_ENV
        value: production
    autoDeploy: true
`;

    writeFileSync(rootRenderPath, rootConfig);
    created.push(relative(rootDir, rootRenderPath));
  }
  
  return created;
}

async function main() {
  console.log(`⚗️  ${PROJECT_INFO.fullName}`);
  console.log(`Author: ${PROJECT_INFO.author} (pen name)`);
  console.log(`Replace Vercel→Render, Vite→esbuild\n`);

  const results = {
    project: PROJECT_INFO,
    replacements: {
      vercel: { archived: [] },
      vite: { archived: [], esbuildCreated: [] },
      render: { created: [] },
      packages: { updated: [] }
    },
    github: { workflowUpdated: false },
    timestamp: new Date().toISOString()
  };

  // 1. Archive Vercel configs
  console.log('🗑️  Step 1: Archiving Vercel configs...');
  const vercelArchived = archiveVercelConfigs();
  results.replacements.vercel.archived = vercelArchived;
  console.log(`   ✅ Archived ${vercelArchived.length} Vercel configs\n`);

  // 2. Archive Vite configs
  console.log('🗑️  Step 2: Archiving Vite configs...');
  const viteArchived = archiveViteConfigs();
  results.replacements.vite.archived = viteArchived;
  console.log(`   ✅ Archived ${viteArchived.length} Vite configs\n`);

  // 3. Create esbuild configs for apps
  console.log('⚡ Step 3: Creating esbuild configs...');
  const apps = findApps();
  apps.forEach(appPath => {
    const esbuildPath = createEsbuildConfig(appPath);
    if (esbuildPath) {
      results.replacements.vite.esbuildCreated.push(relative(rootDir, esbuildPath));
      console.log(`   ✅ Created: ${relative(rootDir, esbuildPath)}`);
    }
    
    const pkgResult = updatePackageJson(appPath);
    if (pkgResult.updated) {
      results.replacements.packages.updated.push(relative(rootDir, pkgResult.path));
      console.log(`   ✅ Updated: ${relative(rootDir, pkgResult.path)}`);
    }
  });
  console.log('');

  // 4. Create Render configs
  console.log('🚀 Step 4: Creating Render configs...');
  const renderCreated = createRenderConfigs();
  results.replacements.render.created = renderCreated;
  renderCreated.forEach(path => {
    console.log(`   ✅ Created: ${path}`);
  });
  console.log('');

  // 5. Update GitHub workflow
  console.log('🌿 Step 5: Updating GitHub workflow...');
  const workflowResult = updateGitHubWorkflow();
  results.github.workflowUpdated = workflowResult.updated;
  if (workflowResult.updated) {
    console.log(`   ✅ Updated: ${relative(rootDir, workflowResult.path)}`);
  } else if (workflowResult.error) {
    console.log(`   ⚠️  ${workflowResult.error}`);
  } else {
    console.log(`   ℹ️  Already up to date`);
  }
  console.log('');

  // 6. Generate report
  const reportPath = join(rootDir, 'vercel-render-vite-esbuild-replacement.json');
  writeFileSync(reportPath, JSON.stringify(results, null, 2));

  const summaryPath = join(rootDir, 'REPLACEMENT_SUMMARY.md');
  const summary = `# Vercel→Render, Vite→esbuild Replacement Summary

**Generated**: ${new Date().toISOString()}
**Project**: ${PROJECT_INFO.fullName}

## Executive Decisions

1. **Vercel → Render**: Vercel deployments never worked, switching to Render (free tier)
2. **Vite → esbuild**: Vite replaced with esbuild (faster, simpler, perfect for React/Node)

## Why esbuild?

esbuild is the perfect replacement for Vite because:
- ⚡ **10-100x faster** than Vite/Webpack
- 🆓 **Free and open source**
- 🎯 **Perfect for React/Node apps**
- 🔧 **Simple configuration**
- 📦 **No dev server overhead**
- 🚀 **Works great with Node.js**

## Actions Taken

### Vercel Removal
- ✅ Archived ${vercelArchived.length} Vercel configs
- 📁 Location: \`archive/vercel-removed/\`

### Vite Replacement
- ✅ Archived ${viteArchived.length} Vite configs
- ✅ Created ${results.replacements.vite.esbuildCreated.length} esbuild configs
- ✅ Updated ${results.replacements.packages.updated.length} package.json files
- 📁 Vite archives: \`archive/vite-replaced/\`

### Render Setup
- ✅ Created ${renderCreated.length} Render configs

### GitHub Workflow
- ✅ Updated: ${workflowResult.updated ? 'Yes' : 'No'}

## Next Steps

### Install esbuild
\`\`\`bash
pnpm add -D esbuild
\`\`\`

### Build with esbuild
\`\`\`bash
pnpm run build  # Now uses esbuild
\`\`\`

### Deploy to Render
1. Go to https://render.com
2. Connect your GitLab repository
3. Select branch: \`magnum-opus\` or \`main\`
4. Render will auto-deploy on push

---

**Part of ${PROJECT_INFO.fullName}**
`;

  writeFileSync(summaryPath, summary);

  console.log('📊 Summary:');
  console.log(`   🗑️  Vercel configs archived: ${vercelArchived.length}`);
  console.log(`   🗑️  Vite configs archived: ${viteArchived.length}`);
  console.log(`   ⚡ esbuild configs created: ${results.replacements.vite.esbuildCreated.length}`);
  console.log(`   📦 Packages updated: ${results.replacements.packages.updated.length}`);
  console.log(`   🚀 Render configs created: ${renderCreated.length}`);
  console.log(`   🌿 GitHub workflow updated: ${workflowResult.updated ? '✅' : '❌'}\n`);
  console.log(`📄 Reports:`);
  console.log(`   - ${relative(rootDir, reportPath)}`);
  console.log(`   - ${relative(rootDir, summaryPath)}\n`);
  console.log(`✅ Replacement complete!\n`);
  console.log(`💡 Next: Run 'pnpm install' to install esbuild\n`);
}

main().catch(console.error);






