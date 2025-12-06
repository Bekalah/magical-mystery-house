#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - Complete GitLab Migration & Deployment
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * Complete migration to GitLab and deployment to free platforms:
 * - Fixes all Vercel configs
 * - Connects all tools and packages
 * - Sets up correct branches
 * - Prepares repos for GitLab cloning
 * - Configures free platform deployments (Vercel, Netlify, Cloudflare Pages)
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
  subtitle: 'Liber Arcanae Codex Abyssiae'
};

const GITLAB_CONFIG = {
  namespace: 'bekalah',
  baseUrl: 'https://gitlab.com/bekalah',
  repoName: 'cathedral-of-circuits-magnum-opus-v1'
};

const DEPLOYMENT_PLATFORMS = {
  vercel: {
    name: 'Vercel',
    free: true,
    configFile: 'vercel.json'
  },
  netlify: {
    name: 'Netlify',
    free: true,
    configFile: 'netlify.toml'
  },
  cloudflare: {
    name: 'Cloudflare Pages',
    free: true,
    configFile: 'wrangler.toml'
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
    return [];
  }
}

function fixVercelConfig(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const config = JSON.parse(content);
    
    const fixed = {
      version: 2,
      buildCommand: config.buildCommand || 'pnpm run build',
      outputDirectory: config.outputDirectory || 'dist',
      installCommand: config.installCommand || 'pnpm install',
      framework: config.framework || null,
      rewrites: config.rewrites || [
        {
          source: '/(.*)',
          destination: '/index.html'
        }
      ],
      headers: config.headers || [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff'
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY'
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block'
            }
          ]
        }
      ]
    };

    writeFileSync(filePath, JSON.stringify(fixed, null, 2) + '\n');
    return { fixed: true, file: filePath };
  } catch (e) {
    return { fixed: false, file: filePath, error: e.message };
  }
}

function createNetlifyConfig(appPath) {
  const netlifyPath = join(appPath, 'netlify.toml');
  if (existsSync(netlifyPath)) return { exists: true, path: netlifyPath };

  const config = `# ⚗️ Cathedral of Circuits - Netlify Configuration
# Magnum Opus Version 1.0
# Author: Rebecca Respawn (pen name)

[build]
  command = "pnpm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
  PNPM_VERSION = "10.23.0"
`;

  writeFileSync(netlifyPath, config);
  return { created: true, path: netlifyPath };
}

function createCloudflareConfig(appPath) {
  const wranglerPath = join(appPath, 'wrangler.toml');
  if (existsSync(wranglerPath)) return { exists: true, path: wranglerPath };

  const config = `# ⚗️ Cathedral of Circuits - Cloudflare Pages Configuration
# Magnum Opus Version 1.0
# Author: Rebecca Respawn (pen name)

name = "cathedral-of-circuits"
compatibility_date = "2024-12-05"

[env.production]
  name = "cathedral-of-circuits-prod"

[build]
  command = "pnpm run build"
  cwd = "."
`;

  writeFileSync(wranglerPath, config);
  return { created: true, path: wranglerPath };
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

function checkPackageConnections() {
  const rootPkg = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'));
  const workspacePackages = rootPkg.workspaces || [];
  
  const connections = {
    total: workspacePackages.length,
    connected: 0,
    missing: [],
    errors: []
  };

  workspacePackages.forEach(pkgPattern => {
    try {
      const pkgFiles = execSync(`rg --files --glob "${pkgPattern}/package.json"`, {
        cwd: rootDir,
        encoding: 'utf-8',
        maxBuffer: 10 * 1024 * 1024
      }).trim().split('\n').filter(Boolean);

      if (pkgFiles.length > 0) {
        connections.connected++;
      } else {
        connections.missing.push(pkgPattern);
      }
    } catch (e) {
      connections.errors.push({ pattern: pkgPattern, error: e.message });
    }
  });

  return connections;
}

function setupGitLabBranches() {
  const branches = {
    main: 'Production branch',
    develop: 'Development branch',
    'magnum-opus': 'Magnum Opus v1.0 branch',
    'feature/*': 'Feature branches',
    'fix/*': 'Fix branches'
  };

  try {
    // Ensure we're on the right branch
    const currentBranch = execSync('git branch --show-current', {
      cwd: rootDir,
      encoding: 'utf-8'
    }).trim();

    if (currentBranch !== 'magnum-opus' && currentBranch !== 'main') {
      execSync('git checkout -b magnum-opus', { cwd: rootDir });
    }

    return { branches, current: currentBranch };
  } catch (e) {
    return { branches, error: e.message };
  }
}

async function main() {
  console.log(`⚗️  ${PROJECT_INFO.fullName}`);
  console.log(`Author: ${PROJECT_INFO.author} (pen name)`);
  console.log(`Complete GitLab Migration & Deployment Tool\n`);

  const results = {
    project: PROJECT_INFO,
    gitlab: GITLAB_CONFIG,
    vercel: { fixed: [], errors: [] },
    netlify: { created: [], exists: [] },
    cloudflare: { created: [], exists: [] },
    connections: null,
    branches: null,
    timestamp: new Date().toISOString()
  };

  // 1. Fix all Vercel configs
  console.log('🔧 Fixing Vercel configurations...');
  const vercelConfigs = findVercelConfigs();
  console.log(`Found ${vercelConfigs.length} Vercel configs\n`);

  vercelConfigs.forEach(configPath => {
    const result = fixVercelConfig(configPath);
    if (result.fixed) {
      results.vercel.fixed.push(relative(rootDir, configPath));
      console.log(`  ✅ Fixed: ${relative(rootDir, configPath)}`);
    } else {
      results.vercel.errors.push({ file: relative(rootDir, configPath), error: result.error });
      console.log(`  ⚠️  Error: ${relative(rootDir, configPath)} - ${result.error}`);
    }
  });

  // 2. Create Netlify configs for apps
  console.log('\n🌐 Creating Netlify configurations...');
  const apps = findApps();
  apps.forEach(appPath => {
    const result = createNetlifyConfig(appPath);
    if (result.created) {
      results.netlify.created.push(relative(rootDir, result.path));
      console.log(`  ✅ Created: ${relative(rootDir, result.path)}`);
    } else if (result.exists) {
      results.netlify.exists.push(relative(rootDir, result.path));
      console.log(`  ℹ️  Exists: ${relative(rootDir, result.path)}`);
    }
  });

  // 3. Create Cloudflare configs for apps
  console.log('\n☁️  Creating Cloudflare Pages configurations...');
  apps.forEach(appPath => {
    const result = createCloudflareConfig(appPath);
    if (result.created) {
      results.cloudflare.created.push(relative(rootDir, result.path));
      console.log(`  ✅ Created: ${relative(rootDir, result.path)}`);
    } else if (result.exists) {
      results.cloudflare.exists.push(relative(rootDir, result.path));
      console.log(`  ℹ️  Exists: ${relative(rootDir, result.path)}`);
    }
  });

  // 4. Check package connections
  console.log('\n🔗 Checking package connections...');
  results.connections = checkPackageConnections();
  console.log(`  Total packages: ${results.connections.total}`);
  console.log(`  Connected: ${results.connections.connected}`);
  console.log(`  Missing: ${results.connections.missing.length}`);
  if (results.connections.errors.length > 0) {
    console.log(`  Errors: ${results.connections.errors.length}`);
  }

  // 5. Setup GitLab branches
  console.log('\n🌿 Setting up GitLab branches...');
  results.branches = setupGitLabBranches();
  console.log(`  Current branch: ${results.branches.current}`);
  console.log(`  Branch structure: ${Object.keys(results.branches.branches).join(', ')}`);

  // 6. Generate deployment report
  const reportPath = join(rootDir, 'gitlab-deployment-complete.json');
  writeFileSync(reportPath, JSON.stringify(results, null, 2));

  console.log('\n📊 Summary:');
  console.log(`  ✅ Vercel configs fixed: ${results.vercel.fixed.length}`);
  console.log(`  ✅ Netlify configs created: ${results.netlify.created.length}`);
  console.log(`  ✅ Cloudflare configs created: ${results.cloudflare.created.length}`);
  console.log(`  ✅ Packages connected: ${results.connections.connected}/${results.connections.total}`);
  console.log(`  📄 Report: ${reportPath}\n`);

  console.log(`✅ Complete GitLab migration and deployment setup complete!\n`);
  console.log('Next steps:');
  console.log('  1. Review gitlab-deployment-complete.json');
  console.log('  2. Push to GitLab: git push gitlab magnum-opus');
  console.log('  3. Connect to Vercel/Netlify/Cloudflare Pages');
  console.log('  4. Deploy from GitLab CI/CD\n');
}

main().catch(console.error);




