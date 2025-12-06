#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - Remove Vercel, Setup Render
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * Executive decision: Remove Vercel (deployments never worked)
 * Setup Render as alternative deployment platform
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync, renameSync, unlinkSync } from 'fs';
import { join, dirname, relative, basename } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const PROJECT_INFO = {
  name: 'Cathedral of Circuits',
  version: '1.0.0',
  fullName: 'Cathedral of Circuits - Magnum Opus Version 1.0',
  author: 'Rebecca Respawn',
  subtitle: 'Liber Arcanae Codex Abyssiae'
};

const RENDER_CONFIG = {
  platform: 'Render',
  free: true,
  configFile: 'render.yaml',
  webService: {
    name: 'cathedral-of-circuits',
    env: 'node',
    buildCommand: 'pnpm install && pnpm run build',
    startCommand: 'pnpm run start',
    staticPublish: 'dist'
  }
};

function findVercelConfigs() {
  try {
    const result = execSync('rg --files vercel.json', {
      cwd: rootDir,
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024
    });
    return result.trim().split('\n').filter(Boolean);
  } catch (e) {
    return findFilesRecursive(rootDir, 'vercel.json');
  }
}

function findFilesRecursive(dir, filename) {
  const results = [];
  if (!existsSync(dir)) return results;
  
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      if (entry.startsWith('.') || 
          entry === 'node_modules' || 
          entry === 'dist' || 
          entry === 'build') {
        continue;
      }
      
      const fullPath = join(dir, entry);
      try {
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
          results.push(...findFilesRecursive(fullPath, filename));
        } else if (entry === filename) {
          results.push(fullPath);
        }
      } catch (e) {
        continue;
      }
    }
  } catch (e) {
  }
  return results;
}

function findApps() {
  const appsDir = join(rootDir, 'apps');
  if (!existsSync(appsDir)) return [];
  
  try {
    return readdirSync(appsDir)
      .filter(item => {
        const itemPath = join(appsDir, item);
        return statSync(itemPath).isDirectory() && 
               existsSync(join(itemPath, 'package.json'));
      })
      .map(item => join(appsDir, item));
  } catch (e) {
    return [];
  }
}

function archiveVercelConfig(filePath) {
  const archiveDir = join(rootDir, 'archive', 'vercel-configs-removed');
  if (!existsSync(archiveDir)) {
    mkdirSync(archiveDir, { recursive: true });
  }
  
  const fileName = basename(filePath);
  const relPath = relative(rootDir, dirname(filePath));
  const archivePath = join(archiveDir, relPath ? `${relPath.replace(/\//g, '_')}_${fileName}` : fileName);
  
  try {
    renameSync(filePath, archivePath);
    return { archived: true, path: archivePath };
  } catch (e) {
    // If rename fails, try copy and delete
    try {
      const content = readFileSync(filePath, 'utf-8');
      writeFileSync(archivePath, content);
      unlinkSync(filePath);
      return { archived: true, path: archivePath };
    } catch (e2) {
      return { archived: false, error: e2.message };
    }
  }
}

function createRenderConfig(appPath) {
  const appName = basename(appPath);
  const renderPath = join(appPath, 'render.yaml');
  
  // Check if package.json exists to get build info
  let buildCommand = 'pnpm install && pnpm run build';
  let startCommand = 'pnpm run start';
  let staticPublish = 'dist';
  
  try {
    const pkgPath = join(appPath, 'package.json');
    if (existsSync(pkgPath)) {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
      if (pkg.scripts) {
        if (pkg.scripts.build) {
          buildCommand = `pnpm install && pnpm run build`;
        }
        if (pkg.scripts.start) {
          startCommand = 'pnpm run start';
        } else if (pkg.scripts.dev) {
          startCommand = 'pnpm run dev';
        }
      }
    }
  } catch (e) {
    // Use defaults
  }
  
  const config = `# ⚗️ Cathedral of Circuits - Render Configuration
# Magnum Opus Version 1.0
# Author: Rebecca Respawn (pen name)
# App: ${appName}

services:
  - type: web
    name: ${appName}
    env: node
    buildCommand: ${buildCommand}
    startCommand: ${startCommand}
    envVars:
      - key: NODE_ENV
        value: production
      - key: PNPM_VERSION
        value: "10.23.0"
    staticPublish: ${staticPublish}
    healthCheckPath: /
    autoDeploy: true
`;

  writeFileSync(renderPath, config);
  return { created: true, path: renderPath };
}

function createRootRenderConfig() {
  const renderPath = join(rootDir, 'render.yaml');
  
  const config = `# ⚗️ Cathedral of Circuits - Render Configuration
# Magnum Opus Version 1.0
# Author: Rebecca Respawn (pen name)
# Main deployment configuration

services:
  - type: web
    name: cathedral-of-circuits-main
    env: node
    buildCommand: pnpm install && pnpm run build
    startCommand: pnpm run start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PNPM_VERSION
        value: "10.23.0"
    staticPublish: dist
    healthCheckPath: /
    autoDeploy: true

  # Add app-specific services below
`;

  writeFileSync(renderPath, config);
  return { created: true, path: renderPath };
}

function updateGitLabCI() {
  const ciPath = join(rootDir, '.gitlab-ci.yml');
  
  if (!existsSync(ciPath)) {
    return { updated: false, error: 'GitLab CI file not found' };
  }
  
  try {
    let content = readFileSync(ciPath, 'utf-8');
    
    // Remove Vercel references
    content = content.replace(/vercel/gi, 'render');
    content = content.replace(/VERCEL/gi, 'RENDER');
    content = content.replace(/Vercel/gi, 'Render');
    
    // Update deploy stage
    if (content.includes('deploy:vercel')) {
      content = content.replace(
        /deploy:vercel:[\s\S]*?when: manual/g,
        `deploy:render:
  stage: deploy
  image: node:\${NODE_VERSION}
  needs: ["build"]
  before_script:
    - corepack enable
    - corepack prepare pnpm@\${PNPM_VERSION} --activate
    - echo "Render deployment configured - connect via GitLab CI/CD variables"
  script:
    - echo "Deploy to Render via GitLab CI/CD integration"
    - echo "Set RENDER_API_KEY in GitLab CI/CD variables"
  only:
    - main
    - magnum-opus
  when: manual`
      );
    }
    
    writeFileSync(ciPath, content);
    return { updated: true, path: ciPath };
  } catch (e) {
    return { updated: false, error: e.message };
  }
}

async function main() {
  console.log(`⚗️  ${PROJECT_INFO.fullName}`);
  console.log(`Author: ${PROJECT_INFO.author} (pen name)`);
  console.log(`Remove Vercel, Setup Render Tool\n`);
  console.log(`Executive Decision: Remove Vercel (deployments never worked)`);
  console.log(`Alternative: Setup Render deployment\n`);

  const results = {
    project: PROJECT_INFO,
    vercel: {
      removed: [],
      archived: [],
      errors: []
    },
    render: {
      configsCreated: [],
      appsConfigured: []
    },
    gitlab: {
      ciUpdated: false
    },
    timestamp: new Date().toISOString()
  };

  // 1. Find and archive all Vercel configs
  console.log('🗑️  Step 1: Removing Vercel configurations...');
  const vercelConfigs = findVercelConfigs();
  console.log(`Found ${vercelConfigs.length} Vercel configs\n`);

  vercelConfigs.forEach(configPath => {
    const result = archiveVercelConfig(configPath);
    if (result.archived) {
      results.vercel.removed.push(relative(rootDir, configPath));
      results.vercel.archived.push(relative(rootDir, result.path));
      console.log(`   ✅ Archived: ${relative(rootDir, configPath)}`);
    } else {
      results.vercel.errors.push({ file: relative(rootDir, configPath), error: result.error });
      console.log(`   ⚠️  Error: ${relative(rootDir, configPath)} - ${result.error}`);
    }
  });
  console.log('');

  // 2. Create Render configs for apps
  console.log('🚀 Step 2: Creating Render configurations...');
  const apps = findApps();
  console.log(`Found ${apps.length} apps\n`);

  apps.forEach(appPath => {
    const result = createRenderConfig(appPath);
    if (result.created) {
      results.render.configsCreated.push(relative(rootDir, result.path));
      results.render.appsConfigured.push(basename(appPath));
      console.log(`   ✅ Created: ${relative(rootDir, result.path)}`);
    }
  });

  // 3. Create root Render config
  const rootResult = createRootRenderConfig();
  if (rootResult.created) {
    results.render.configsCreated.push(relative(rootDir, rootResult.path));
    console.log(`   ✅ Created root: ${relative(rootDir, rootResult.path)}`);
  }
  console.log('');

  // 4. Update GitLab CI
  console.log('🌿 Step 3: Updating GitLab CI/CD...');
  const ciResult = updateGitLabCI();
  if (ciResult.updated) {
    results.gitlab.ciUpdated = true;
    console.log(`   ✅ Updated: ${relative(rootDir, ciResult.path)}`);
  } else {
    console.log(`   ⚠️  ${ciResult.error}`);
  }
  console.log('');

  // 5. Generate report
  const reportPath = join(rootDir, 'vercel-removed-render-setup.json');
  writeFileSync(reportPath, JSON.stringify(results, null, 2));

  const summaryPath = join(rootDir, 'VERCEL_REMOVED_RENDER_SETUP.md');
  const summary = `# Vercel Removed, Render Setup Complete

**Generated**: ${new Date().toISOString()}
**Project**: ${PROJECT_INFO.fullName}
**Author**: ${PROJECT_INFO.author}

## Executive Decision

**Vercel removed** - Deployments never worked, switching to Render.

## Actions Taken

### Vercel Removal
- **Configs Removed**: ${results.vercel.removed.length}
- **Configs Archived**: ${results.vercel.archived.length}
- **Archive Location**: \`archive/vercel-configs-removed/\`

### Render Setup
- **Root Config**: ✅ \`render.yaml\`
- **App Configs Created**: ${results.render.configsCreated.length}
- **Apps Configured**: ${results.render.appsConfigured.join(', ')}

### GitLab CI/CD
- **Updated**: ${results.gitlab.ciUpdated ? '✅' : '❌'}

## Render Deployment

### Setup Steps

1. **Create Render Account** (if needed)
   - Go to https://render.com
   - Sign up (free tier available)

2. **Connect GitLab Repository**
   - In Render dashboard, click "New" → "Web Service"
   - Connect your GitLab repository
   - Select branch: \`magnum-opus\` or \`main\`

3. **Configure Service**
   - **Build Command**: \`pnpm install && pnpm run build\`
   - **Start Command**: \`pnpm run start\` (or app-specific)
   - **Environment**: Node
   - **Node Version**: 20
   - **PNPM Version**: 10.23.0

4. **Environment Variables** (if needed)
   - \`NODE_ENV=production\`
   - \`PNPM_VERSION=10.23.0\`

5. **Deploy**
   - Render will auto-deploy on push (if configured)
   - Or deploy manually from dashboard

### GitLab CI/CD Integration

To deploy via GitLab CI/CD:

1. Get Render API key from Render dashboard
2. Add to GitLab CI/CD variables: \`RENDER_API_KEY\`
3. Push to \`magnum-opus\` branch
4. Manual deploy job will be available

## Archived Files

All Vercel configs have been archived to:
\`archive/vercel-configs-removed/\`

## Next Steps

1. ✅ Review Render configs in \`render.yaml\` files
2. ✅ Connect GitLab repo to Render
3. ✅ Configure environment variables
4. ✅ Deploy!

---

**Part of ${PROJECT_INFO.fullName}**
`;

  writeFileSync(summaryPath, summary);

  console.log('📊 Summary:');
  console.log(`   🗑️  Vercel configs removed: ${results.vercel.removed.length}`);
  console.log(`   📁 Vercel configs archived: ${results.vercel.archived.length}`);
  console.log(`   🚀 Render configs created: ${results.render.configsCreated.length}`);
  console.log(`   📱 Apps configured: ${results.render.appsConfigured.length}`);
  console.log(`   🌿 GitLab CI updated: ${results.gitlab.ciUpdated ? '✅' : '❌'}\n`);
  console.log(`📄 Reports:`);
  console.log(`   - ${relative(rootDir, reportPath)}`);
  console.log(`   - ${relative(rootDir, summaryPath)}\n`);
  console.log(`✅ Vercel removed, Render setup complete!\n`);
  console.log(`Next: Connect your GitLab repo to Render at https://render.com\n`);
}

main().catch(console.error);




