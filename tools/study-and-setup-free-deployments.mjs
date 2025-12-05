#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Study and Setup Free Deployments
 * - Carefully studies all apps and packages
 * - Determines best free deployment platforms
 * - Sets up correct paths and configurations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const REPORT_FILE = path.join(rootDir, 'FREE_DEPLOYMENT_SETUP.json');

// Free deployment platforms
const FREE_PLATFORMS = {
  vercel: {
    name: 'Vercel',
    free: true,
    supports: ['vite', 'nextjs', 'react', 'static'],
    buildCommand: 'pnpm build',
    outputDir: 'dist',
    configFile: 'vercel.json',
    urlPattern: 'https://{project}.vercel.app'
  },
  netlify: {
    name: 'Netlify',
    free: true,
    supports: ['vite', 'nextjs', 'react', 'static'],
    buildCommand: 'pnpm build',
    outputDir: 'dist',
    configFile: 'netlify.toml',
    urlPattern: 'https://{project}.netlify.app'
  },
  cloudflare: {
    name: 'Cloudflare Pages',
    free: true,
    supports: ['vite', 'react', 'static'],
    buildCommand: 'pnpm build',
    outputDir: 'dist',
    configFile: 'wrangler.toml',
    urlPattern: 'https://{project}.pages.dev'
  },
  githubPages: {
    name: 'GitHub Pages',
    free: true,
    supports: ['static', 'vite'],
    buildCommand: 'pnpm build',
    outputDir: 'dist',
    configFile: '.github/workflows/deploy.yml',
    urlPattern: 'https://{user}.github.io/{repo}'
  },
  npm: {
    name: 'npm',
    free: true,
    supports: ['package'],
    buildCommand: 'pnpm build',
    outputDir: 'dist',
    configFile: 'package.json',
    urlPattern: 'https://www.npmjs.com/package/{package}'
  }
};

// Analyze app/package for deployment
function analyzeForDeployment(itemPath, itemName, isApp = true) {
  const analysis = {
    name: itemName,
    path: itemPath,
    type: isApp ? 'app' : 'package',
    platform: null,
    hasBuild: false,
    isDeployable: false,
    recommendedPlatforms: [],
    currentConfig: {},
    needsConfig: false
  };

  // Check package.json
  const packageJsonPath = path.join(itemPath, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return analysis;
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    analysis.packageJson = packageJson;

    // Determine platform
    if (packageJson.dependencies?.next || packageJson.devDependencies?.next) {
      analysis.platform = 'nextjs';
    } else if (packageJson.dependencies?.vite || packageJson.devDependencies?.vite) {
      analysis.platform = 'vite';
    } else if (packageJson.dependencies?.react || packageJson.devDependencies?.react) {
      analysis.platform = 'react';
    } else if (packageJson.main || packageJson.module || packageJson.exports) {
      analysis.platform = 'package';
    } else {
      analysis.platform = 'static';
    }

    // Check if has build script
    analysis.hasBuild = !!packageJson.scripts?.build;

    // Determine if deployable
    if (isApp) {
      analysis.isDeployable = analysis.hasBuild && (analysis.platform === 'vite' || analysis.platform === 'nextjs' || analysis.platform === 'react' || analysis.platform === 'static');
    } else {
      analysis.isDeployable = !!(packageJson.main || packageJson.module || packageJson.exports);
    }

    // Recommend platforms
    if (isApp) {
      if (analysis.platform === 'nextjs') {
        analysis.recommendedPlatforms = ['vercel', 'netlify'];
      } else if (analysis.platform === 'vite' || analysis.platform === 'react') {
        analysis.recommendedPlatforms = ['vercel', 'netlify', 'cloudflare', 'githubPages'];
      } else if (analysis.platform === 'static') {
        analysis.recommendedPlatforms = ['githubPages', 'cloudflare', 'netlify', 'vercel'];
      }
    } else {
      if (analysis.isDeployable) {
        analysis.recommendedPlatforms = ['npm'];
      }
    }

    // Check current configs
    const vercelPath = path.join(itemPath, 'vercel.json');
    const netlifyPath = path.join(itemPath, 'netlify.toml');
    const cloudflarePath = path.join(itemPath, 'wrangler.toml');

    if (fs.existsSync(vercelPath)) {
      try {
        analysis.currentConfig.vercel = JSON.parse(fs.readFileSync(vercelPath, 'utf-8'));
      } catch (e) {}
    }

    if (fs.existsSync(netlifyPath)) {
      analysis.currentConfig.netlify = fs.readFileSync(netlifyPath, 'utf-8');
    }

    if (fs.existsSync(cloudflarePath)) {
      analysis.currentConfig.cloudflare = fs.readFileSync(cloudflarePath, 'utf-8');
    }

    // Determine if needs config
    if (analysis.isDeployable && analysis.recommendedPlatforms.length > 0) {
      const primaryPlatform = analysis.recommendedPlatforms[0];
      const configFile = FREE_PLATFORMS[primaryPlatform].configFile;
      const configPath = path.join(itemPath, configFile);
      analysis.needsConfig = !fs.existsSync(configPath);
    }

  } catch (e) {
    analysis.error = e.message;
  }

  return analysis;
}

// Setup deployment config
function setupDeploymentConfig(analysis, platform) {
  const platformInfo = FREE_PLATFORMS[platform];
  if (!platformInfo) return null;

  const configPath = path.join(analysis.path, platformInfo.configFile);
  const config = {
    created: false,
    path: configPath,
    content: null,
    error: null
  };

  try {
    switch (platform) {
      case 'vercel':
        const vercelConfig = {
          buildCommand: platformInfo.buildCommand,
          outputDirectory: analysis.platform === 'nextjs' ? '.next' : platformInfo.outputDir,
          installCommand: 'pnpm install',
          framework: analysis.platform === 'nextjs' ? 'nextjs' : null,
          rewrites: analysis.platform !== 'nextjs' ? [
            {
              source: '/(.*)',
              destination: '/index.html'
            }
          ] : undefined
        };
        config.content = JSON.stringify(vercelConfig, null, 2);
        fs.writeFileSync(configPath, config.content + '\n', 'utf-8');
        config.created = true;
        break;

      case 'netlify':
        const netlifyConfig = `[build]
  command = "${platformInfo.buildCommand}"
  publish = "${platformInfo.outputDir}"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`;
        config.content = netlifyConfig;
        fs.writeFileSync(configPath, config.content, 'utf-8');
        config.created = true;
        break;

      case 'cloudflare':
        const cloudflareConfig = `name = "${analysis.name}"
compatibility_date = "2024-01-01"

[build]
command = "${platformInfo.buildCommand}"
output_dir = "${platformInfo.outputDir}"
`;
        config.content = cloudflareConfig;
        fs.writeFileSync(configPath, config.content, 'utf-8');
        config.created = true;
        break;

      case 'githubPages':
        // GitHub Pages uses workflow file, handled separately
        config.created = true;
        break;

      case 'npm':
        // npm uses package.json, already exists
        config.created = true;
        break;
    }
  } catch (e) {
    config.error = e.message;
  }

  return config;
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
  } catch (e) {}

  return apps;
}

// Find all packages
function findAllPackages() {
  const packages = [];
  const packagesDir = path.join(rootDir, 'packages');

  if (!fs.existsSync(packagesDir)) {
    return packages;
  }

  try {
    const entries = fs.readdirSync(packagesDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        packages.push({
          name: entry.name,
          path: path.join(packagesDir, entry.name)
        });
      }
    }
  } catch (e) {}

  return packages;
}

// Main function
async function main() {
  console.log('🔍 Studying apps and packages for free deployment...');
  console.log('');

  const apps = findAllApps();
  const packages = findAllPackages();

  console.log(`Found ${apps.length} apps and ${packages.length} packages`);
  console.log('');

  const analyses = {
    apps: {},
    packages: {}
  };

  const deployments = {
    apps: {},
    packages: {}
  };

  const summary = {
    totalApps: apps.length,
    deployableApps: 0,
    totalPackages: packages.length,
    deployablePackages: 0,
    configsCreated: 0,
    configsFailed: 0
  };

  // Analyze apps
  console.log('📱 Analyzing apps...');
  for (const app of apps) {
    console.log(`   Analyzing ${app.name}...`);
    const analysis = analyzeForDeployment(app.path, app.name, true);
    analyses.apps[app.name] = analysis;

    if (analysis.isDeployable) {
      summary.deployableApps++;
      console.log(`   ✅ Deployable (${analysis.platform})`);
      console.log(`   📍 Recommended: ${analysis.recommendedPlatforms.join(', ')}`);

      // Setup primary platform
      if (analysis.recommendedPlatforms.length > 0) {
        const primaryPlatform = analysis.recommendedPlatforms[0];
        console.log(`   🔧 Setting up ${primaryPlatform}...`);
        const config = setupDeploymentConfig(analysis, primaryPlatform);
        
        if (config && config.created) {
          deployments.apps[app.name] = {
            platform: primaryPlatform,
            config: config.path,
            url: FREE_PLATFORMS[primaryPlatform].urlPattern.replace('{project}', app.name)
          };
          summary.configsCreated++;
          console.log(`   ✅ Config created: ${config.path}`);
        } else if (config && config.error) {
          summary.configsFailed++;
          console.log(`   ⚠️  Failed: ${config.error}`);
        }
      }
    } else {
      console.log(`   ⚠️  Not deployable`);
    }
    console.log('');
  }

  // Analyze packages
  console.log('📦 Analyzing packages...');
  for (const pkg of packages) {
    console.log(`   Analyzing ${pkg.name}...`);
    const analysis = analyzeForDeployment(pkg.path, pkg.name, false);
    analyses.packages[pkg.name] = analysis;

    if (analysis.isDeployable) {
      summary.deployablePackages++;
      console.log(`   ✅ Deployable to npm`);
      
      // npm doesn't need separate config, uses package.json
      deployments.packages[pkg.name] = {
        platform: 'npm',
        config: path.join(pkg.path, 'package.json'),
        url: `https://www.npmjs.com/package/${analysis.packageJson?.name || pkg.name}`
      };
    } else {
      console.log(`   ⚠️  Not deployable`);
    }
    console.log('');
  }

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    summary,
    analyses,
    deployments,
    platforms: FREE_PLATFORMS
  };

  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));

  console.log('📊 Summary:');
  console.log(`   - Total Apps: ${summary.totalApps}`);
  console.log(`   - Deployable Apps: ${summary.deployableApps}`);
  console.log(`   - Total Packages: ${summary.totalPackages}`);
  console.log(`   - Deployable Packages: ${summary.deployablePackages}`);
  console.log(`   - Configs Created: ${summary.configsCreated}`);
  console.log(`   - Configs Failed: ${summary.configsFailed}`);
  console.log('');

  console.log('🌐 Deployment Recommendations:');
  console.log('');
  
  console.log('📱 Apps:');
  for (const [appName, deployment] of Object.entries(deployments.apps)) {
    console.log(`   - ${appName}: ${deployment.platform} → ${deployment.url}`);
  }
  console.log('');

  console.log('📦 Packages:');
  for (const [pkgName, deployment] of Object.entries(deployments.packages)) {
    console.log(`   - ${pkgName}: ${deployment.platform} → ${deployment.url}`);
  }
  console.log('');

  console.log(`✅ Report saved to: ${REPORT_FILE}`);
  console.log('');
  console.log('💡 Next Steps:');
  console.log('   1. Review deployment configs created');
  console.log('   2. Connect repos to deployment platforms');
  console.log('   3. Set up GitHub Actions for GitHub Pages');
  console.log('   4. Deploy to Vercel/Netlify/Cloudflare');
  console.log('   5. Publish packages to npm');

  return report;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default main;

