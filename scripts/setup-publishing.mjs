#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Setup publishing infrastructure for Cathedral
 * Prepares packages, documentation, and deployment configs
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

/**
 * Setup pnpm publishing for packages
 */
function setupNpmPublishing() {
  console.log('📦 Setting up pnpm publishing...\n');

  const packagesDir = path.join(BASE_DIR, 'packages');
  const packages = fs.readdirSync(packagesDir)
    .filter(name => {
      const packagePath = path.join(packagesDir, name);
      return fs.statSync(packagePath).isDirectory();
    });

  let updated = 0;

  for (const pkgName of packages) {
    const packagePath = path.join(packagesDir, pkgName);
    const packageJsonPath = path.join(packagePath, 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
      continue;
    }

    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // Update package.json for publishing
      const updates = {
        // Ensure public access
        publishConfig: {
          access: 'public'
        },
        // Add repository info
        repository: {
          type: 'git',
          url: 'https://github.com/rebeccalemke/cathedral-master-deployment.git',
          directory: `packages/${pkgName}`
        },
        // Add homepage
        homepage: `https://github.com/rebeccalemke/cathedral-master-deployment/tree/main/packages/${pkgName}`,
        // Add bugs
        bugs: {
          url: 'https://github.com/rebeccalemke/cathedral-master-deployment/issues'
        },
        // Ensure keywords
        keywords: packageJson.keywords || [
          'cathedral',
          'sacred-geometry',
          '144-99',
          'codex',
          'consciousness',
          'trauma-aware',
          'open-source',
          'free'
        ]
      };

      // Merge updates
      Object.assign(packageJson, updates);

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');
      updated++;
      console.log(`   ✅ Updated ${pkgName}`);
    } catch (e) {
      console.log(`   ⚠️  Could not update ${pkgName}: ${e.message}`);
    }
  }

  console.log(`\n✅ Updated ${updated} packages for pnpm publishing\n`);
}

/**
 * Create .npmrc for publishing
 */
function createNpmrc() {
  console.log('📝 Creating .npmrc...\n');

  const npmrcPath = path.join(BASE_DIR, '.npmrc');
  const npmrcContent = `# pnpm publishing configuration
# Public access for all packages
access=public

# Registry
registry=https://registry.npmjs.org/

# Save exact versions
save-exact=false

# Package lock
package-lock=false
`;

  fs.writeFileSync(npmrcPath, npmrcContent, 'utf-8');
  console.log('✅ Created .npmrc\n');
}

/**
 * Create GitHub Pages configuration
 */
function setupGitHubPages() {
  console.log('📄 Setting up GitHub Pages...\n');

  const docsDir = path.join(BASE_DIR, 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  // Create index.html for GitHub Pages
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cathedral - Completely Free Art, Science, Design & Mathematics Platform</title>
  <meta name="description" content="Cathedral is completely free - no gatekeeping, no barriers. Open source art, science, design, and mathematics platform.">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      color: #333;
      border-bottom: 3px solid #6366f1;
      padding-bottom: 10px;
    }
    .feature {
      margin: 20px 0;
      padding: 15px;
      background: #f9fafb;
      border-left: 4px solid #6366f1;
    }
    .link {
      color: #6366f1;
      text-decoration: none;
    }
    .link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🏛️ Cathedral</h1>
    <p><strong>Completely Free</strong> - No gatekeeping, no barriers, accessible to everyone.</p>
    
    <div class="feature">
      <h2>🎯 What is Cathedral?</h2>
      <p>Cathedral is an enterprise-grade, completely free platform that replaces traditional art schools and expensive design/science tools. Unlike platforms that charge fees or require credentials, Cathedral is open to everyone.</p>
    </div>

    <div class="feature">
      <h2>✨ Unique Features</h2>
      <ul>
        <li>✅ <strong>Completely Free</strong> - Not "free for students" - completely free for everyone</li>
        <li>✅ <strong>No Gatekeeping</strong> - No prerequisites, no credentials, no barriers</li>
        <li>✅ <strong>Trauma-Aware</strong> - Designed for people who don't fit traditional systems</li>
        <li>✅ <strong>Sacred Geometry</strong> - 144:99 ratio, golden ratio, Fibonacci throughout</li>
        <li>✅ <strong>Spiral Dynamics</strong> - Consciousness-based learning, not credential-based</li>
        <li>✅ <strong>Multi-Modal</strong> - Art + Music + Science + Spirituality + Mathematics integrated</li>
        <li>✅ <strong>Open World</strong> - 3D immersive exploration, not website-like</li>
        <li>✅ <strong>Living Systems</strong> - Egregores, consciousness evolution, dynamic content</li>
        <li>✅ <strong>Open Source</strong> - CC0-1.0 license, truly open</li>
      </ul>
    </div>

    <div class="feature">
      <h2>🔗 Links</h2>
      <ul>
        <li><a href="https://github.com/rebeccalemke/cathedral-master-deployment" class="link">GitHub Repository</a></li>
        <li><a href="./README.md" class="link">README</a></li>
        <li><a href="./docs/" class="link">Documentation</a></li>
      </ul>
    </div>

    <div class="feature">
      <h2>📦 Packages</h2>
      <p>All packages are available on npm:</p>
      <ul>
        <li><code>@cathedral/codex-144-99-core</code></li>
        <li><code>@cathedral/stone-grimoire-core</code></li>
        <li><code>@cathedral/mystery-house-core</code></li>
        <li><code>@cathedral/liber-arcanae-core</code></li>
        <li>And more...</li>
      </ul>
    </div>

    <div class="feature">
      <h2>🚀 Getting Started</h2>
      <pre><code># Install
pnpm install

# Build
pnpm run build

# Run
pnpm run dev</code></pre>
    </div>

    <div class="feature">
      <h2>📄 License</h2>
      <p><strong>CC0-1.0 - Public Domain</strong></p>
      <p>Completely free. No restrictions. No gatekeeping. Open to everyone.</p>
    </div>
  </div>
</body>
</html>`;

  const indexPath = path.join(BASE_DIR, 'index.html');
  fs.writeFileSync(indexPath, indexHtml, 'utf-8');
  console.log('✅ Created index.html for GitHub Pages\n');
}

/**
 * Create Vercel configuration
 */
function createVercelConfig() {
  console.log('⚡ Creating Vercel configuration...\n');

  const vercelJson = {
    version: 2,
    builds: [
      {
        src: 'package.json',
        use: '@vercel/static-build',
        config: {
          distDir: 'dist'
        }
      }
    ],
    routes: [
      {
        src: '/(.*)',
        dest: '/$1'
      }
    ]
  };

  const vercelPath = path.join(BASE_DIR, 'vercel.json');
  fs.writeFileSync(vercelPath, JSON.stringify(vercelJson, null, 2) + '\n', 'utf-8');
  console.log('✅ Created vercel.json\n');
}

/**
 * Create GitHub Actions for publishing
 */
function createGitHubActions() {
  console.log('🔄 Creating GitHub Actions...\n');

  const workflowsDir = path.join(BASE_DIR, '.github', 'workflows');
  if (!fs.existsSync(workflowsDir)) {
    fs.mkdirSync(workflowsDir, { recursive: true });
  }

  // Publish npm packages
  const publishWorkflow = `name: Publish Packages

on:
  release:
    types: [created]
  workflow_dispatch:

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: '25.2'
          registry-url: 'https://registry.npmjs.org'
      - run: pnpm install
      - run: pnpm run build
      - run: pnpm publish --access public
        env:
          NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}
`;

  const publishPath = path.join(workflowsDir, 'publish.yml');
  fs.writeFileSync(publishPath, publishWorkflow, 'utf-8');
  console.log('✅ Created GitHub Actions workflow\n');
}

/**
 * Create deployment scripts
 */
function createDeploymentScripts() {
  console.log('📜 Creating deployment scripts...\n');

  // Add to package.json
  const packageJsonPath = path.join(BASE_DIR, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    
    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts['publish:packages'] = 'pnpm -r publish --access public';
    packageJson.scripts['deploy:vercel'] = 'vercel --prod';
    packageJson.scripts['deploy:docs'] = 'gh-pages -d docs';

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');
    console.log('✅ Added deployment scripts to package.json\n');
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Setting up Cathedral Publishing Infrastructure\n');
  console.log('='.repeat(60) + '\n');

  setupNpmPublishing();
  createNpmrc();
  setupGitHubPages();
  createVercelConfig();
  createGitHubActions();
  createDeploymentScripts();

  console.log('='.repeat(60));
  console.log('✅ Publishing infrastructure setup complete!\n');
  console.log('📋 Next Steps:');
  console.log('   1. Set up npm token: npm login');
  console.log('   2. Configure GitHub Pages in repository settings');
  console.log('   3. Connect Vercel: vercel login && vercel');
    console.log('   4. Create web interface (Next.js app)');
  console.log('   6. Publish packages: pnpm run publish:packages');
  console.log('\n✅ Ready to publish!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default { main };

