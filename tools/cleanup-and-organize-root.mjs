#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - Root Directory Cleanup & Organization
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * Cleans up and organizes root directory:
 * - Moves reports to archive/
 * - Removes duplicate/temporary files
 * - Organizes documentation
 * - Updates instructions
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, renameSync, unlinkSync, mkdirSync } from 'fs';
import { join, dirname, relative, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const KEEP_IN_ROOT = [
  // Essential configs
  'package.json',
  'pnpm-lock.yaml',
  'pnpm-workspace.yaml',
  'tsconfig.json',
  'turbo.json',
  'Dockerfile',
  'docker-compose.yml',
  'Caddyfile',
  'nginx.conf',
  
  // Essential docs
  'README.md',
  'CONTRIBUTING.md',
  'LICENSE',
  'SELF_HOSTING_QUICK_START.md',
  
  // Project files
  'index.html',
  
  // Directories
  'apps',
  'packages',
  'tools',
  'scripts',
  'docs',
  'archive',
  'data',
  'dist',
  'node_modules',
  'openspec',
  'ci',
  'types',
  'cathedral-master',
  
  // Workspace files
  '.code-workspace',
  '.code-workspace'
];

const ARCHIVE_DIRS = {
  reports: join(rootDir, 'archive', 'reports-and-status'),
  scripts: join(rootDir, 'archive', 'old-scripts'),
  docs: join(rootDir, 'archive', 'old-docs'),
  configs: join(rootDir, 'archive', 'old-configs')
};

const FILES_TO_REMOVE = [
  // Temporary/experiment files
  'analyze-cycle-differences.mjs',
  'analyze-experiment-results.mjs',
  'complete-and-push-300-cycles.mjs',
  'consolidate-split-directories.mjs',
  'detailed-comparison-report.mjs',
  'elegant-prestige-design-system.mjs',
  'fix-split-directories.mjs',
  'live-round-analysis.mjs',
  'merge-and-fix-all-directories.mjs',
  'monitor-experiment-300.mjs',
  'run-3-rounds-comparison.mjs',
  'run-3-rounds-different-intervals.mjs',
  'run-cycle-analysis.mjs',
  'run-until-midnight.mjs',
  'theme_organize.js',
  
  // Old migration scripts
  'migrate_to_gitlab.sh',
  'migrate-github-to-gitlab-free.sh',
  'mirror-sync.sh',
  'monitor-300-cycles.sh',
  'setup_runner.sh',
  'setup-and-run.sh',
  'validate-cursor-gitlab.sh',
  'annotate-packages.sh',
  'github_repo_inventory.sh',
  'audit-and-fix-directories.mjs',
  
  // Old configs (now archived)
  'wrangler.toml',
  'netlify.toml',
  'vercel.json',
  
  // Duplicate/old package.json
  'package.json.with-jsdoc'
];

function ensureArchiveDirs() {
  Object.values(ARCHIVE_DIRS).forEach(dir => {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  });
}

function moveReportsToArchive() {
  const moved = [];
  const reportPatterns = [
    /^.*report.*\.json$/i,
    /^.*REPORT.*\.json$/i,
    /^.*-report\.json$/i,
    /^.*_REPORT\.json$/i,
    /^.*\.log$/i
  ];
  
  try {
    const entries = readdirSync(rootDir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) continue;
      
      const fileName = entry.name;
      const fullPath = join(rootDir, fileName);
      
      // Skip files we want to keep
      if (KEEP_IN_ROOT.includes(fileName)) continue;
      
      // Check if it's a report file
      const isReport = reportPatterns.some(pattern => pattern.test(fileName));
      
      if (isReport) {
        const archivePath = join(ARCHIVE_DIRS.reports, fileName);
        try {
          renameSync(fullPath, archivePath);
          moved.push({ from: fileName, to: `archive/reports-and-status/${fileName}` });
        } catch (e) {
          // File might not exist or already moved
        }
      }
    }
  } catch (e) {
    // Directory read error
  }
  
  return moved;
}

function moveScriptsToArchive() {
  const moved = [];
  
  for (const script of FILES_TO_REMOVE) {
    const fullPath = join(rootDir, script);
    if (existsSync(fullPath)) {
      const archivePath = join(ARCHIVE_DIRS.scripts, script);
      try {
        renameSync(fullPath, archivePath);
        moved.push({ from: script, to: `archive/old-scripts/${script}` });
      } catch (e) {
        // Skip if can't move
      }
    }
  }
  
  return moved;
}

function moveOldDocs() {
  const oldDocs = [
    'README_migration_steps.md',
    'FINDINGS_AND_CHOICES.md',
    'FREE_TOOLS_CONFIRMED.md',
    'GODOT_SETUP.md',
    'GODOT_VERSION.md',
    'improvements-summary.md',
    'round-learnings.md',
    'SAFE_FOR_PUBLIC_RELEASE.md',
    'REPOSITORY_GUIDELINES.md',
    'UNIFIED_WORKSPACE.md',
    'WHAT_IS_HAPPENING_NOW.md',
    'QUICK_START.md',
    'BOUNDARY_RULES_ENFORCED.md',
    'CROSS_ENGINEERED_BEAUTY.md'
  ];
  
  const moved = [];
  
  for (const doc of oldDocs) {
    const fullPath = join(rootDir, doc);
    if (existsSync(fullPath)) {
      const archivePath = join(ARCHIVE_DIRS.docs, doc);
      try {
        renameSync(fullPath, archivePath);
        moved.push({ from: doc, to: `archive/old-docs/${doc}` });
      } catch (e) {
        // Skip if can't move
      }
    }
  }
  
  return moved;
}

function moveDataFilesToArchive() {
  const dataPatterns = [
    /^.*\.json$/i,
    /^.*DATA.*\.json$/i,
    /^.*MAP.*\.json$/i,
    /^.*CONNECTIONS.*\.json$/i,
    /^.*COMPILED.*\.json$/i
  ];
  
  const moved = [];
  const keepJson = ['package.json', 'pnpm-lock.yaml', 'tsconfig.json', 'turbo.json'];
  
  try {
    const entries = readdirSync(rootDir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) continue;
      
      const fileName = entry.name;
      if (keepJson.some(k => fileName.includes(k))) continue;
      if (KEEP_IN_ROOT.includes(fileName)) continue;
      
      if (extname(fileName) === '.json') {
        const isDataFile = dataPatterns.some(pattern => pattern.test(fileName)) ||
                          !fileName.includes('package') && !fileName.includes('lock');
        
        if (isDataFile) {
          const fullPath = join(rootDir, fileName);
          const archivePath = join(ARCHIVE_DIRS.reports, fileName);
          try {
            renameSync(fullPath, archivePath);
            moved.push({ from: fileName, to: `archive/reports-and-status/${fileName}` });
          } catch (e) {
            // Skip if can't move
          }
        }
      }
    }
  } catch (e) {
    // Directory read error
  }
  
  return moved;
}

function moveArchivedFiles() {
  const moved = [];
  
  try {
    const entries = readdirSync(rootDir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) continue;
      
      const fileName = entry.name;
      if (fileName.endsWith('.archived')) {
        const fullPath = join(rootDir, fileName);
        const archivePath = join(ARCHIVE_DIRS.configs, fileName);
        try {
          renameSync(fullPath, archivePath);
          moved.push({ from: fileName, to: `archive/old-configs/${fileName}` });
        } catch (e) {
          // Skip if can't move
        }
      }
    }
  } catch (e) {
    // Directory read error
  }
  
  return moved;
}

function createUpdatedREADME() {
  const readmePath = join(rootDir, 'README.md');
  let existingReadme = '';
  
  if (existsSync(readmePath)) {
    existingReadme = readFileSync(readmePath, 'utf-8');
  }
  
  const updatedReadme = `# ⚗️ Cathedral of Circuits - Magnum Opus Version 1.0

**Liber Arcanae Codex Abyssiae**

> A comprehensive monorepo for the Cathedral of Circuits project, featuring game development, design tools, codex systems, and more.

**Author**: Rebecca Respawn (pen name)  
**License**: CC0-1.0 - Public Domain  
**Repository**: [GitLab](https://gitlab.com/bekalah/cathedral-of-circuits-magnum-opus-v1)

---

## 🚀 Quick Start

### Installation

\`\`\`bash
pnpm install
\`\`\`

### Development

\`\`\`bash
pnpm dev          # Start all dev servers
pnpm build        # Build all packages
pnpm lint         # Lint all packages
pnpm test         # Run all tests
\`\`\`

### Self-Hosting Deployment

\`\`\`bash
# Docker (Recommended)
pnpm deploy:self-host

# Caddy (Auto HTTPS)
pnpm deploy:caddy

# Nginx (High Performance)
pnpm deploy:nginx

# View logs
pnpm deploy:logs

# Stop services
pnpm deploy:stop
\`\`\`

See: [SELF_HOSTING_QUICK_START.md](./SELF_HOSTING_QUICK_START.md)

---

## 📦 Project Structure

\`\`\`
.
├── apps/              # Applications
│   ├── web/          # Main web app
│   └── worker/       # API/Worker service
├── packages/          # Shared packages
│   ├── game-engine/  # Game engine core
│   ├── design-tools/ # Design system
│   └── ...
├── tools/            # Development tools
├── scripts/          # Build/utility scripts
├── docs/             # Documentation
└── archive/          # Archived reports/configs
\`\`\`

---

## 🏗️ Architecture

### Trinity System: Spiritus/Animus/Corpus

- **Spiritus**: Divine intellect, codex systems, sacred mathematics
- **Animus**: Creative expression, art, music, synthesis
- **Corpus**: Material manifestation, game engine, UI, interaction

### Tech Stack

- **Monorepo**: Turbo v1, pnpm
- **Frontend**: React 18, TypeScript
- **Game**: Godot 4.5, Rust, Three.js
- **Deployment**: Docker, Caddy/Nginx
- **Version Control**: GitLab

---

## 📚 Documentation

- [SELF_HOSTING_QUICK_START.md](./SELF_HOSTING_QUICK_START.md) - Self-hosting guide
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
- [docs/CLOUDFLARE_TO_SELF_HOST_MIGRATION.md](./docs/CLOUDFLARE_TO_SELF_HOST_MIGRATION.md) - Migration guide
- [CATHEDRAL_QUALITY_STANDARDS.md](./CATHEDRAL_QUALITY_STANDARDS.md) - Quality standards

---

## 🛠️ Common Commands

### Development

\`\`\`bash
pnpm dev              # Start dev servers
pnpm build            # Build all
pnpm lint             # Lint all
pnpm type-check       # Type check
pnpm test             # Run tests
pnpm clean            # Clean builds
\`\`\`

### Project Management

\`\`\`bash
pnpm cathedral        # Cathedral CLI
pnpm alchemy          # Alchemy tools
pnpm codex            # Codex tools
pnpm pipeline         # CI/CD pipeline
\`\`\`

### Quality & Maintenance

\`\`\`bash
pnpm security:audit   # Security audit
pnpm security:fix     # Fix security issues
pnpm maintain         # Full maintenance
pnpm cleanup          # Clean up files
\`\`\`

### Migration & Setup

\`\`\`bash
pnpm migrate:cloudflare      # Migrate from Cloudflare
pnpm gitlab:prepare          # Prepare GitLab migration
pnpm enhance:golden-standard # Apply Golden Standard
pnpm trinity:integrate       # Integrate Trinity system
\`\`\`

---

## 🎮 Game Development

The project includes a complete game engine with:

- **Marbles and Medallions** boon system
- **Codex 144:99** game engine
- **Arcanae Character System**
- **Trauma-safe design**

See \`packages/game-engine/\` for details.

---

## 🎨 Design System

**Cathedral Quality Standards**: A+ engineering, Golden Standard Alchemy/Hermetica/Neo-Platonic theme.

See [CATHEDRAL_QUALITY_STANDARDS.md](./CATHEDRAL_QUALITY_STANDARDS.md)

---

## 🔄 GitLab Migration

To clone from GitHub to GitLab without login:

\`\`\`bash
node tools/clone-github-to-gitlab-no-login.mjs
\`\`\`

See [docs/GITLAB_TOKEN_SETUP.md](./docs/GITLAB_TOKEN_SETUP.md) for details.

---

## 📝 License

CC0-1.0 - Public Domain

---

**Part of Cathedral of Circuits - Magnum Opus Version 1.0**  
**Liber Arcanae Codex Abyssiae**

`;

  writeFileSync(readmePath, updatedReadme);
  return readmePath;
}

function createUpdatedInstructions() {
  const instructions = `# ⚗️ Cathedral of Circuits - Updated Instructions

**Magnum Opus Version 1.0**  
**Author: Rebecca Respawn**

## ✅ Recent Cleanup

The root directory has been organized:

- ✅ Reports moved to \`archive/reports-and-status/\`
- ✅ Old scripts moved to \`archive/old-scripts/\`
- ✅ Old docs moved to \`archive/old-docs/\`
- ✅ Archived configs moved to \`archive/old-configs/\`
- ✅ Temporary/experiment files removed
- ✅ Root directory cleaned up

## 📁 Current Root Structure

Only essential files remain in root:

**Configuration Files:**
- \`package.json\`, \`pnpm-lock.yaml\`, \`pnpm-workspace.yaml\`
- \`tsconfig.json\`, \`turbo.json\`
- \`Dockerfile\`, \`docker-compose.yml\`
- \`Caddyfile\`, \`nginx.conf\`

**Documentation:**
- \`README.md\` (updated)
- \`CONTRIBUTING.md\`
- \`LICENSE\`
- \`SELF_HOSTING_QUICK_START.md\`

**Directories:**
- \`apps/\`, \`packages/\`, \`tools/\`, \`scripts/\`
- \`docs/\`, \`archive/\`, \`data/\`
- \`dist/\`, \`node_modules/\`, \`openspec/\`

## 🚀 Quick Commands

\`\`\`bash
# Development
pnpm install
pnpm dev
pnpm build

# Self-Hosting
pnpm deploy:self-host  # Docker (recommended)
pnpm deploy:caddy      # Caddy
pnpm deploy:nginx      # Nginx

# Maintenance
pnpm cleanup
pnpm security:audit
pnpm maintain
\`\`\`

## 📚 Documentation Locations

- **Self-hosting**: \`SELF_HOSTING_QUICK_START.md\`
- **Migration guide**: \`docs/CLOUDFLARE_TO_SELF_HOST_MIGRATION.md\`
- **Quality standards**: \`CATHEDRAL_QUALITY_STANDARDS.md\`
- **GitLab setup**: \`docs/GITLAB_TOKEN_SETUP.md\`
- **Archived reports**: \`archive/reports-and-status/\`

## 🔄 Migration Status

- ✅ Cloudflare removed (migrated to self-hosting)
- ✅ GitLab migration tools ready
- ✅ Self-hosting configs created
- ✅ Root directory organized

## 📋 Next Steps

1. **Deploy**: Choose hosting option and deploy
   \`\`\`bash
   pnpm deploy:self-host
   \`\`\`

2. **GitLab**: Clone from GitHub to GitLab
   \`\`\`bash
   node tools/clone-github-to-gitlab-no-login.mjs
   \`\`\`

3. **Monitor**: Check deployment status
   \`\`\`bash
   pnpm deploy:logs
   \`\`\`

---

**Part of Cathedral of Circuits - Magnum Opus Version 1.0**

`;

  const instructionsPath = join(rootDir, 'docs', 'UPDATED_INSTRUCTIONS.md');
  const docsDir = join(rootDir, 'docs');
  if (!existsSync(docsDir)) {
    mkdirSync(docsDir, { recursive: true });
  }
  writeFileSync(instructionsPath, instructions);
  return instructionsPath;
}

async function main() {
  console.log(`⚗️  Cathedral of Circuits - Root Directory Cleanup`);
  console.log(`Author: ${PROJECT_INFO.author}\n`);

  const results = {
    timestamp: new Date().toISOString(),
    reports: [],
    scripts: [],
    docs: [],
    data: [],
    archived: []
  };

  // Ensure archive directories exist
  console.log('📁 Step 1: Creating archive directories...');
  ensureArchiveDirs();
  console.log('   ✅ Archive directories ready\n');

  // Move reports
  console.log('📊 Step 2: Moving reports to archive...');
  results.reports = moveReportsToArchive();
  console.log(`   ✅ Moved ${results.reports.length} report file(s)\n`);

  // Move scripts
  console.log('📜 Step 3: Moving old scripts to archive...');
  results.scripts = moveScriptsToArchive();
  console.log(`   ✅ Moved ${results.scripts.length} script file(s)\n`);

  // Move old docs
  console.log('📚 Step 4: Moving old docs to archive...');
  results.docs = moveOldDocs();
  console.log(`   ✅ Moved ${results.docs.length} doc file(s)\n`);

  // Move data files
  console.log('💾 Step 5: Moving data files to archive...');
  results.data = moveDataFilesToArchive();
  console.log(`   ✅ Moved ${results.data.length} data file(s)\n`);

  // Move archived files
  console.log('📦 Step 6: Organizing archived files...');
  results.archived = moveArchivedFiles();
  console.log(`   ✅ Moved ${results.archived.length} archived file(s)\n`);

  // Create updated README
  console.log('📝 Step 7: Updating README...');
  const readmePath = createUpdatedREADME();
  console.log(`   ✅ Updated: ${relative(rootDir, readmePath)}\n`);

  // Create updated instructions
  console.log('📋 Step 8: Creating updated instructions...');
  const instructionsPath = createUpdatedInstructions();
  console.log(`   ✅ Created: ${relative(rootDir, instructionsPath)}\n`);

  // Summary
  const totalMoved = results.reports.length + results.scripts.length + 
                     results.docs.length + results.data.length + results.archived.length;

  console.log('📊 Summary:');
  console.log(`   📊 Reports: ${results.reports.length}`);
  console.log(`   📜 Scripts: ${results.scripts.length}`);
  console.log(`   📚 Docs: ${results.docs.length}`);
  console.log(`   💾 Data: ${results.data.length}`);
  console.log(`   📦 Archived: ${results.archived.length}`);
  console.log(`   ✅ Total files organized: ${totalMoved}\n`);

  // Save report
  const reportPath = join(rootDir, 'archive', 'reports-and-status', 'cleanup-organization-report.json');
  writeFileSync(reportPath, JSON.stringify(results, null, 2));

  console.log('✅ Root directory cleanup complete!\n');
  console.log('📄 Documentation:');
  console.log(`   - README.md (updated)`);
  console.log(`   - docs/UPDATED_INSTRUCTIONS.md\n`);
  console.log('🚀 Next: Review cleaned root directory and updated docs\n');
}

const PROJECT_INFO = {
  author: 'Rebecca Respawn'
};

main().catch(console.error);



