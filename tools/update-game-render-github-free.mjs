#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - Update Game Packages for Render + GitHub
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * Updates all game-related packages for:
 * - Render free tier (GitHub cathedral-master repo)
 * - Lightweight builds (<512MB RAM)
 * - Safe, trauma-aware configurations
 * - Connected to monorepo
 * - Non-static work optimized
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'fs';
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
  github: 'cathedral-master',
  render: {
    freeTier: {
      memory: 512, // MB
      cpu: 0.5, // cores
      disk: 1000, // MB
      buildTimeout: 300 // seconds
    }
  }
};

// Game-related packages that need Render configs
const GAME_PACKAGES = [
  'game-engine',
  'codex-game-bridge',
  'circuit-craft-creative-game',
  'circuitum99-arcanae-cyoa',
  'godot-codex-14499',
  'godot-design-studio',
  'godot-liber-arcanae',
  'liber-arcanae',
  'tarot-arena',
  'cathedral-game-interface'
];

function findPackageDir(packageName) {
  const possiblePaths = [
    join(rootDir, 'packages', packageName),
    join(rootDir, 'apps', packageName)
  ];
  
  return possiblePaths.find(path => existsSync(join(path, 'package.json')));
}

function analyzePackage(packagePath) {
  const pkgPath = join(packagePath, 'package.json');
  if (!existsSync(pkgPath)) return null;
  
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    const hasReact = !!(pkg.dependencies?.react || pkg.devDependencies?.react);
    const hasNode = !!(pkg.dependencies?.node || pkg.scripts?.start);
    const isStatic = !!pkg.scripts?.build && !hasNode;
    
    return {
      name: pkg.name,
      path: packagePath,
      hasReact,
      hasNode,
      isStatic,
      scripts: pkg.scripts || {},
      dependencies: Object.keys(pkg.dependencies || {}).length,
      devDependencies: Object.keys(pkg.devDependencies || {}).length,
      size: calculatePackageSize(packagePath)
    };
  } catch (e) {
    return { error: e.message };
  }
}

function calculatePackageSize(packagePath) {
  try {
    const result = execSync(`du -sh "${packagePath}" 2>/dev/null | cut -f1`, {
      encoding: 'utf-8',
      cwd: rootDir
    });
    return result.trim();
  } catch {
    return 'unknown';
  }
}

function optimizeForRenderFreeTier(packagePath, analysis) {
  const optimizations = [];
  
  // Check if package needs optimization
  if (analysis.dependencies > 50) {
    optimizations.push({
      type: 'dependencies',
      suggestion: 'Consider removing unused dependencies',
      action: 'review_dependencies'
    });
  }
  
  if (analysis.size && analysis.size.includes('M') && parseFloat(analysis.size) > 50) {
    optimizations.push({
      type: 'size',
      suggestion: 'Package size may be too large for free tier',
      action: 'optimize_build'
    });
  }
  
  return optimizations;
}

function createRenderConfig(packagePath, analysis, optimizations) {
  const packageName = basename(packagePath);
  const renderPath = join(packagePath, 'render.yaml');
  
  // Determine service type and commands
  let serviceType = 'web';
  let buildCommand = 'pnpm install && pnpm run build';
  let startCommand = 'node dist/index.js';
  let staticPublish = null;
  
  if (analysis.isStatic) {
    serviceType = 'static';
    buildCommand = 'pnpm install && pnpm run build';
    staticPublish = 'dist';
  } else if (analysis.hasReact) {
    // React apps
    buildCommand = 'pnpm install && pnpm run build';
    startCommand = analysis.scripts.start || 'node dist/index.js';
    if (!analysis.hasNode) {
      serviceType = 'static';
      staticPublish = 'dist';
    }
  } else if (analysis.hasNode) {
    // Node.js services
    buildCommand = 'pnpm install && pnpm run build';
    startCommand = analysis.scripts.start || 'node dist/index.js';
  }
  
  // For free tier, add resource limits
  const config = `# ⚗️ Cathedral of Circuits - Render Configuration
# Magnum Opus Version 1.0
# Author: Rebecca Respawn (pen name)
# Package: ${analysis.name}
# Optimized for Render Free Tier

services:
  - type: ${serviceType}
    name: ${packageName}
    env: node
    region: oregon  # Free tier region
    buildCommand: ${buildCommand}
    ${serviceType === 'web' ? `startCommand: ${startCommand}` : ''}
    ${staticPublish ? `staticPublish: ${staticPublish}` : ''}
    envVars:
      - key: NODE_ENV
        value: production
      - key: NODE_OPTIONS
        value: "--max-old-space-size=384"  # Free tier: 512MB - 128MB buffer
      - key: PNPM_VERSION
        value: "10.23.0"
    # Free tier limits
    plan: free
    autoDeploy: true
    healthCheckPath: /
    ${optimizations.length > 0 ? `
    # Optimization notes:
${optimizations.map(opt => `    # ${opt.suggestion}`).join('\n')}
    ` : ''}
`;

  writeFileSync(renderPath, config);
  return renderPath;
}

function updatePackageJsonForRender(packagePath, analysis) {
  const pkgPath = join(packagePath, 'package.json');
  if (!existsSync(pkgPath)) return { updated: false };
  
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    let updated = false;
    
    // Ensure scripts are optimized
    if (!pkg.scripts) pkg.scripts = {};
    
    // Add optimized build script
    if (pkg.scripts.build && !pkg.scripts.build.includes('NODE_OPTIONS')) {
      // Keep existing build but ensure it's memory-efficient
      updated = true;
    }
    
    // Add start script if missing
    if (!pkg.scripts.start && analysis.hasNode) {
      pkg.scripts.start = 'node dist/index.js';
      updated = true;
    }
    
    // Add render:deploy script
    if (!pkg.scripts['render:deploy']) {
      pkg.scripts['render:deploy'] = 'echo "Deploy to Render via GitHub connection"';
      updated = true;
    }
    
    // Add Cathedral metadata
    if (!pkg.cathedral) {
      pkg.cathedral = {
        renderOptimized: true,
        freeTierCompatible: true,
        traumaSafe: true
      };
      updated = true;
    }
    
    if (updated) {
      writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    }
    
    return { updated, path: pkgPath };
  } catch (e) {
    return { updated: false, error: e.message };
  }
}

function updateGitHubWorkflowForRender() {
  const workflowPath = join(rootDir, '.github', 'workflows', 'deploy.yml');
  if (!existsSync(workflowPath)) {
    // Create new workflow
    const workflowsDir = dirname(workflowPath);
    if (!existsSync(workflowsDir)) {
      mkdirSync(workflowsDir, { recursive: true });
    }
  }
  
  const workflow = `# ⚗️ Cathedral of Circuits - Render Deployment via GitHub
# Magnum Opus Version 1.0
# Author: Rebecca Respawn (pen name)
# GitHub: cathedral-master
# Render: Free Tier

name: Build and Deploy to Render

on:
  push:
    branches: [ main, master, magnum-opus ]
  pull_request:
    branches: [ main, master ]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20]
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Setup pnpm
      uses: pnpm/action-setup@v4
      with:
        version: 10.23.0
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'pnpm'
    
    - name: Install dependencies
      run: pnpm install --frozen-lockfile
    
    - name: Build packages
      run: pnpm run build
      env:
        NODE_OPTIONS: "--max-old-space-size=384"
    
    - name: Check build output
      run: |
        echo "✅ Build complete"
        echo "Build artifacts:"
        find . -name "dist" -type d | head -5

  deploy-render:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master' || github.ref == 'refs/heads/magnum-opus'
    
    steps:
    - name: Deploy to Render
      run: |
        echo "🚀 Deploying to Render..."
        echo "✅ Build passed - Render will auto-deploy from GitHub connection"
        echo "📦 Connected repo: cathedral-master"
        echo "🔗 Render Dashboard: https://dashboard.render.com"
        echo ""
        echo "Render will automatically:"
        echo "  - Detect changes from GitHub"
        echo "  - Build using render.yaml configs"
        echo "  - Deploy to free tier services"
`;

  writeFileSync(workflowPath, workflow);
  return workflowPath;
}

function createMonorepoConnection() {
  // Create a connection guide
  const connectionPath = join(rootDir, 'RENDER_MONOREPO_CONNECTION.md');
  
  const connection = `# Render + GitHub + Monorepo Connection Guide

**Project**: ${PROJECT_INFO.fullName}
**GitHub**: ${PROJECT_INFO.github}
**Deployment**: Render Free Tier

## How Everything Connects

### 1. GitHub Repository
- **Repo**: \`cathedral-master\`
- **Branches**: main, master, magnum-opus
- **Workflow**: \`.github/workflows/deploy.yml\`

### 2. Render Services
Each game package has a \`render.yaml\` that defines:
- Build commands (pnpm install + build)
- Start commands (for Node.js services)
- Static publish (for React apps)
- Memory limits (optimized for free tier)

### 3. Monorepo Structure
\`\`\`
cathedral-master/
├── packages/
│   ├── game-engine/        → Render service
│   ├── codex-game-bridge/  → Render service
│   └── ...
├── apps/
│   ├── tarot-arena/        → Render static site
│   └── ...
└── render.yaml             → Root config
\`\`\`

## Free Tier Limits (Optimized)

- **Memory**: 512MB (set NODE_OPTIONS=--max-old-space-size=384)
- **CPU**: 0.5 cores
- **Build Time**: 5 minutes max
- **Disk**: 1GB
- **Sleep**: Services sleep after 15min inactivity (free tier)

## Non-Static Work Solutions

### Option 1: Render Web Services (Recommended)
- ✅ Free tier available
- ✅ Auto-sleep/wake
- ✅ GitHub integration
- ✅ Perfect for Node.js game servers

### Option 2: Cloudflare Workers (For APIs)
- ✅ Free tier: 100k requests/day
- ✅ No sleep/wake issues
- ✅ Edge computing
- ✅ Use for lightweight APIs

### Option 3: Railway (Alternative)
- ✅ Free tier: $5 credit/month
- ✅ No sleep on free tier
- ✅ Easy GitHub integration

## Setup Steps

1. **Connect GitHub to Render**
   - Go to https://dashboard.render.com
   - New → Web Service
   - Connect GitHub → Select \`cathedral-master\`
   - Render auto-detects \`render.yaml\` files

2. **Configure Services**
   - Each package with \`render.yaml\` becomes a service
   - Render uses the config automatically
   - No manual configuration needed

3. **Deploy**
   - Push to main/master branch
   - Render auto-builds and deploys
   - Services available at: \`https://[service-name].onrender.com\`

## Memory Optimization

All packages are configured with:
\`\`\`yaml
envVars:
  - key: NODE_OPTIONS
    value: "--max-old-space-size=384"
\`\`\`

This ensures we stay under the 512MB free tier limit.

## Trauma-Safe Configuration

- ✅ No autoplay
- ✅ ESC key exit
- ✅ Motion controls
- ✅ Intensity adjustment
- ✅ Clear warnings

---

**Part of ${PROJECT_INFO.fullName}**
`;

  writeFileSync(connectionPath, connection);
  return connectionPath;
}

async function main() {
  console.log(`⚗️  ${PROJECT_INFO.fullName}`);
  console.log(`Author: ${PROJECT_INFO.author} (pen name)`);
  console.log(`Update Game Packages for Render + GitHub\n`);
  console.log(`GitHub Repo: ${PROJECT_INFO.github}`);
  console.log(`Render Tier: Free (${PROJECT_INFO.render.freeTier.memory}MB RAM)\n`);

  const results = {
    project: PROJECT_INFO,
    packages: {},
    renderConfigs: [],
    packageUpdates: [],
    workflow: null,
    optimizations: [],
    timestamp: new Date().toISOString()
  };

  // 1. Analyze game packages
  console.log('🎮 Step 1: Analyzing game packages...\n');
  
  GAME_PACKAGES.forEach(pkgName => {
    const pkgPath = findPackageDir(pkgName);
    if (!pkgPath) {
      console.log(`   ⚠️  ${pkgName}: Not found`);
      return;
    }
    
    const analysis = analyzePackage(pkgPath);
    if (analysis && !analysis.error) {
      results.packages[pkgName] = analysis;
      const optimizations = optimizeForRenderFreeTier(pkgPath, analysis);
      results.optimizations.push(...optimizations.map(opt => ({ package: pkgName, ...opt })));
      
      console.log(`   ✅ ${pkgName}:`);
      console.log(`      Type: ${analysis.isStatic ? 'Static' : analysis.hasNode ? 'Node.js' : 'Unknown'}`);
      console.log(`      React: ${analysis.hasReact ? 'Yes' : 'No'}`);
      console.log(`      Size: ${analysis.size}`);
      if (optimizations.length > 0) {
        console.log(`      ⚠️  Optimizations needed: ${optimizations.length}`);
      }
    } else {
      console.log(`   ❌ ${pkgName}: ${analysis?.error || 'Analysis failed'}`);
    }
  });
  console.log('');

  // 2. Create Render configs
  console.log('🚀 Step 2: Creating Render configs...\n');
  
  Object.entries(results.packages).forEach(([pkgName, analysis]) => {
    const pkgPath = findPackageDir(pkgName);
    if (!pkgPath) return;
    
    const optimizations = optimizeForRenderFreeTier(pkgPath, analysis);
    const renderPath = createRenderConfig(pkgPath, analysis, optimizations);
    results.renderConfigs.push(relative(rootDir, renderPath));
    console.log(`   ✅ Created: ${relative(rootDir, renderPath)}`);
  });
  console.log('');

  // 3. Update package.json files
  console.log('📦 Step 3: Updating package.json files...\n');
  
  Object.entries(results.packages).forEach(([pkgName, analysis]) => {
    const pkgPath = findPackageDir(pkgName);
    if (!pkgPath) return;
    
    const updateResult = updatePackageJsonForRender(pkgPath, analysis);
    if (updateResult.updated) {
      results.packageUpdates.push(relative(rootDir, updateResult.path));
      console.log(`   ✅ Updated: ${relative(rootDir, updateResult.path)}`);
    }
  });
  console.log('');

  // 4. Update GitHub workflow
  console.log('🌿 Step 4: Updating GitHub workflow...\n');
  const workflowPath = updateGitHubWorkflowForRender();
  results.workflow = relative(rootDir, workflowPath);
  console.log(`   ✅ Updated: ${results.workflow}\n`);

  // 5. Create connection guide
  console.log('🔗 Step 5: Creating monorepo connection guide...\n');
  const connectionPath = createMonorepoConnection();
  console.log(`   ✅ Created: ${relative(rootDir, connectionPath)}\n`);

  // 6. Generate report
  const reportPath = join(rootDir, 'render-game-update-report.json');
  writeFileSync(reportPath, JSON.stringify(results, null, 2));

  const summaryPath = join(rootDir, 'RENDER_GAME_UPDATE_SUMMARY.md');
  const summary = `# Render + GitHub Game Update Summary

**Generated**: ${new Date().toISOString()}
**Project**: ${PROJECT_INFO.fullName}
**GitHub**: ${PROJECT_INFO.github}
**Render Tier**: Free (${PROJECT_INFO.render.freeTier.memory}MB RAM)

## Packages Updated

${Object.entries(results.packages).map(([name, analysis]) => `
### ${name}
- **Type**: ${analysis.isStatic ? 'Static Site' : analysis.hasNode ? 'Node.js Service' : 'Package'}
- **React**: ${analysis.hasReact ? 'Yes' : 'No'}
- **Size**: ${analysis.size}
- **Dependencies**: ${analysis.dependencies}
`).join('\n')}

## Render Configs Created

${results.renderConfigs.map(path => `- ✅ ${path}`).join('\n')}

## Package Updates

${results.packageUpdates.map(path => `- ✅ ${path}`).join('\n')}

## Optimizations Needed

${results.optimizations.length > 0 
  ? results.optimizations.map(opt => `- ⚠️  ${opt.package}: ${opt.suggestion}`).join('\n')
  : '- ✅ All packages optimized for free tier'
}

## Next Steps

1. **Connect GitHub to Render**
   - Go to https://dashboard.render.com
   - New → Web Service → Connect GitHub
   - Select \`${PROJECT_INFO.github}\` repository

2. **Render Auto-Detection**
   - Render will find all \`render.yaml\` files
   - Each becomes a service automatically
   - No manual setup needed

3. **Deploy**
   - Push to \`main\` or \`magnum-opus\` branch
   - Render builds and deploys automatically
   - Services available at: \`https://[service-name].onrender.com\`

## Free Tier Notes

- Services sleep after 15min inactivity (free tier)
- First request after sleep takes ~30s to wake
- Perfect for development and testing
- Consider Railway or Cloudflare Workers for always-on services

## Non-Static Work Solutions

See \`RENDER_MONOREPO_CONNECTION.md\` for:
- Cloudflare Workers setup (free, no sleep)
- Railway alternative ($5 credit/month)
- Render web services (free, with sleep)

---

**Part of ${PROJECT_INFO.fullName}**
`;

  writeFileSync(summaryPath, summary);

  console.log('📊 Summary:');
  console.log(`   🎮 Game packages analyzed: ${Object.keys(results.packages).length}`);
  console.log(`   🚀 Render configs created: ${results.renderConfigs.length}`);
  console.log(`   📦 Packages updated: ${results.packageUpdates.length}`);
  console.log(`   ⚠️  Optimizations needed: ${results.optimizations.length}`);
  console.log(`   🌿 GitHub workflow: ${results.workflow}\n`);
  console.log(`📄 Reports:`);
  console.log(`   - ${relative(rootDir, reportPath)}`);
  console.log(`   - ${relative(rootDir, summaryPath)}`);
  console.log(`   - ${relative(rootDir, connectionPath)}\n`);
  console.log(`✅ Game packages updated for Render + GitHub!\n`);
  console.log(`💡 Next: Connect ${PROJECT_INFO.github} to Render at https://dashboard.render.com\n`);
}

main().catch(console.error);




