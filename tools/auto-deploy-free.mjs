#!/usr/bin/env node
/**
 * Auto-Deploy to Free Platforms
 * 
 * Automatically deploys apps/packages to free platforms:
 * - Vercel (free tier)
 * - Netlify (free tier)
 * - GitHub Pages (100% free)
 * - Cloudflare Pages (free)
 * - npm (free for public packages)
 * 
 * Usage:
 *   node tools/auto-deploy-free.mjs --auto
 *   node tools/auto-deploy-free.mjs --platform vercel
 *   node tools/auto-deploy-free.mjs --platform github
 *   node tools/auto-deploy-free.mjs --analyze
 * 
 * @license CC0-1.0 - Public Domain
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const PLATFORMS = {
  vercel: {
    name: 'Vercel',
    free: true,
    setup: async (appPath) => {
      const vercelJson = {
        version: 2,
        builds: [{ src: 'package.json', use: '@vercel/static-build' }],
        routes: [{ src: '/(.*)', dest: '/$1' }]
      };
      fs.writeFileSync(
        path.join(appPath, 'vercel.json'),
        JSON.stringify(vercelJson, null, 2)
      );
      return 'vercel.json created';
    },
    deploy: 'vercel --prod',
    url: 'https://{project}.vercel.app'
  },
  netlify: {
    name: 'Netlify',
    free: true,
    setup: async (appPath) => {
      const netlifyToml = `[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`;
      fs.writeFileSync(
        path.join(appPath, 'netlify.toml'),
        netlifyToml
      );
      return 'netlify.toml created';
    },
    deploy: 'netlify deploy --prod',
    url: 'https://{project}.netlify.app'
  },
  github: {
    name: 'GitHub Pages',
    free: true,
    setup: async (appPath) => {
      const workflowDir = path.join(ROOT, '.github', 'workflows');
      if (!fs.existsSync(workflowDir)) {
        fs.mkdirSync(workflowDir, { recursive: true });
      }
      
      const workflow = `name: Deploy to GitHub Pages

on:
  push:
    branches: [ main, master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 10.23.0
      - uses: actions/setup-node@v4
        with:
          node-version: '25.2'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
`;
      fs.writeFileSync(
        path.join(workflowDir, 'deploy-pages.yml'),
        workflow
      );
      return 'GitHub Actions workflow created';
    },
    deploy: 'git push origin main',
    url: 'https://{user}.github.io/{repo}'
  },
  cloudflare: {
    name: 'Cloudflare Pages',
    free: true,
    setup: async (appPath) => {
      const wranglerToml = `name = "{project}"
compatibility_date = "2024-01-01"

[site]
bucket = "./dist"
`;
      fs.writeFileSync(
        path.join(appPath, 'wrangler.toml'),
        wranglerToml
      );
      return 'wrangler.toml created';
    },
    deploy: 'wrangler pages deploy dist',
    url: 'https://{project}.pages.dev'
  }
};

function log(message) {
  console.log(message);
}

function error(message) {
  console.error(`❌ ${message}`);
}

function success(message) {
  console.log(`✅ ${message}`);
}

function info(message) {
  console.log(`ℹ️  ${message}`);
}

function analyzeApp(appPath) {
  const packageJsonPath = path.join(appPath, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return null;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const hasBuild = !!packageJson.scripts?.build;
    const isPackage = !!(packageJson.main || packageJson.module || packageJson.exports);
    
    let platform = 'static';
    if (packageJson.dependencies?.next || packageJson.devDependencies?.next) {
      platform = 'nextjs';
    } else if (packageJson.dependencies?.vite || packageJson.devDependencies?.vite) {
      platform = 'vite';
    } else if (packageJson.dependencies?.react || packageJson.devDependencies?.react) {
      platform = 'react';
    }
    
    return {
      name: packageJson.name || path.basename(appPath),
      path: appPath,
      platform,
      hasBuild,
      isPackage,
      packageJson
    };
  } catch (e) {
    return null;
  }
}

function recommendPlatform(analysis) {
  if (analysis.isPackage) {
    return 'npm';
  }
  
  if (analysis.platform === 'nextjs') {
    return 'vercel';
  }
  
  if (analysis.platform === 'vite' || analysis.platform === 'react') {
    return ['vercel', 'netlify', 'github', 'cloudflare'];
  }
  
  return ['github', 'cloudflare', 'netlify', 'vercel'];
}

async function setupPlatform(platformName, appPath) {
  const platform = PLATFORMS[platformName];
  if (!platform) {
    error(`Unknown platform: ${platformName}`);
    return false;
  }
  
  if (!platform.free) {
    error(`${platform.name} is not free`);
    return false;
  }
  
  try {
    info(`Setting up ${platform.name}...`);
    const result = await platform.setup(appPath);
    success(result);
    return true;
  } catch (e) {
    error(`Failed to setup ${platform.name}: ${e.message}`);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const platformArg = args.find(arg => arg.startsWith('--platform'))?.split('=')[1];
  const auto = args.includes('--auto');
  const analyze = args.includes('--analyze');
  
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log('🚀 Auto-Deploy to Free Platforms');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Analyze current directory or apps
  const appsDir = path.join(ROOT, 'apps');
  const apps = [];
  
  if (fs.existsSync(appsDir)) {
    const dirs = fs.readdirSync(appsDir, { withFileTypes: true });
    for (const dir of dirs) {
      if (dir.isDirectory()) {
        const appPath = path.join(appsDir, dir.name);
        const analysis = analyzeApp(appPath);
        if (analysis) {
          apps.push(analysis);
        }
      }
    }
  }
  
  // Also check root
  const rootAnalysis = analyzeApp(ROOT);
  if (rootAnalysis && rootAnalysis.hasBuild) {
    apps.push(rootAnalysis);
  }
  
  if (apps.length === 0) {
    error('No deployable apps found');
    info('Make sure you have apps/ directory or package.json with build script');
    process.exit(1);
  }
  
  log(`Found ${apps.length} deployable app(s):\n`);
  apps.forEach((app, i) => {
    log(`  ${i + 1}. ${app.name}`);
    log(`     Platform: ${app.platform}`);
    log(`     Has Build: ${app.hasBuild ? '✅' : '❌'}`);
    log(`     Type: ${app.isPackage ? 'Package' : 'App'}`);
    log('');
  });
  
  if (analyze) {
    log('\n📊 Platform Recommendations:\n');
    apps.forEach((app) => {
      const recommended = recommendPlatform(app);
      log(`  ${app.name}:`);
      if (Array.isArray(recommended)) {
        recommended.forEach((p, i) => {
          log(`    ${i + 1}. ${p}`);
        });
      } else {
        log(`    → ${recommended}`);
      }
      log('');
    });
    return;
  }
  
  // Deploy
  const targetPlatform = platformArg || (auto ? null : 'github');
  
  for (const app of apps) {
    log(`\n🚀 Deploying ${app.name}...\n`);
    
    const platforms = targetPlatform 
      ? [targetPlatform]
      : (Array.isArray(recommendPlatform(app)) ? recommendPlatform(app) : [recommendPlatform(app)]);
    
    for (const platformName of platforms) {
      if (platformName === 'npm' && !app.isPackage) {
        continue;
      }
      
      const success = await setupPlatform(platformName, app.path);
      if (success) {
        info(`Next steps for ${PLATFORMS[platformName].name}:`);
        info(`  1. Review the generated config file`);
        info(`  2. Run: ${PLATFORMS[platformName].deploy}`);
        info(`  3. Your app will be available at: ${PLATFORMS[platformName].url}`);
        log('');
        break; // Only setup first recommended platform
      }
    }
  }
  
  log('\n✅ Setup complete!\n');
  log('Next steps:');
  log('  1. Review the generated configuration files');
  log('  2. Commit and push to your repository');
  log('  3. Follow platform-specific deployment instructions\n');
}

main().catch(e => {
  error(`Fatal error: ${e.message}`);
  console.error(e);
  process.exit(1);
});

