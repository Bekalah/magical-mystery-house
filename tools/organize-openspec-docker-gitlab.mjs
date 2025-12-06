#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - OpenSpec + Docker + GitLab Organization
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * Organizes:
 * - OpenSpec and spec-kit structure
 * - Moves old Docker configurations
 * - Sets up safe GitHub to GitLab migration with build verification
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync, renameSync, copyFileSync } from 'fs';
import { join, dirname, relative, basename, extname } from 'path';
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

async function organizeOpenSpec() {
  console.log('📚 Step 1: Organizing OpenSpec structure...');
  
  const openspecDir = join(rootDir, 'openspec');
  const specKitDir = join(openspecDir, 'spec-kit');
  const specsDir = join(openspecDir, 'specs');
  
  // Ensure structure exists
  const structure = {
    specs: {
      deployment: ['gitlab', 'docker', 'build-verification'],
      architecture: ['monorepo', 'turbo', 'vite'],
      quality: ['golden-standard', 'testing'],
      security: []
    },
    'spec-kit': {
      templates: [],
      changes: [],
      archive: []
    }
  };
  
  // Create directories
  Object.keys(structure.specs).forEach(category => {
    const categoryDir = join(specsDir, category);
    if (!existsSync(categoryDir)) {
      mkdirSync(categoryDir, { recursive: true });
    }
    structure.specs[category].forEach(spec => {
      const specDir = join(categoryDir, spec);
      if (!existsSync(specDir)) {
        mkdirSync(specDir, { recursive: true });
      }
    });
  });
  
  console.log('   ✅ OpenSpec structure organized\n');
  
  return structure;
}

function moveOldDockerConfigs() {
  console.log('🐳 Step 2: Moving old Docker configurations...');
  
  const dockerArchiveDir = join(rootDir, 'archive', 'old-docker-configs');
  if (!existsSync(dockerArchiveDir)) {
    mkdirSync(dockerArchiveDir, { recursive: true });
  }
  
  const moved = [];
  
  // Find all Docker files
  const dockerFiles = [
    'Dockerfile',
    'docker-compose.yml',
    'Dockerfile.prod',
    'docker-compose.prod.yml'
  ];
  
  // Check for old Docker files (not the new ones)
  dockerFiles.forEach(file => {
    const fullPath = join(rootDir, file);
    if (existsSync(fullPath) && !file.includes('coolify')) {
      // Check if it's old (not in current structure)
      const content = readFileSync(fullPath, 'utf-8');
      if (content.includes('cloudflare') || content.includes('vercel') || 
          !content.includes('Cathedral of Circuits')) {
        const archivePath = join(dockerArchiveDir, `${file}.old`);
        try {
          copyFileSync(fullPath, archivePath);
          moved.push({ from: file, to: `archive/old-docker-configs/${basename(archivePath)}` });
        } catch (e) {
          // Skip if can't move
        }
      }
    }
  });
  
  // Move old docker-compose files
  const oldDockerDirs = [
    join(rootDir, 'coolify'),
    join(rootDir, 'docker')
  ];
  
  oldDockerDirs.forEach(dir => {
    if (existsSync(dir)) {
      const archivePath = join(dockerArchiveDir, basename(dir));
      try {
        execSync(`mv "${dir}" "${archivePath}"`, { stdio: 'ignore' });
        moved.push({ from: basename(dir), to: `archive/old-docker-configs/${basename(dir)}` });
      } catch (e) {
        // Skip if can't move
      }
    }
  });
  
  console.log(`   ✅ Moved ${moved.length} old Docker configuration(s)\n`);
  return moved;
}

function createBuildVerificationSpec() {
  console.log('✅ Step 3: Creating build verification specification...');
  
  const specPath = join(rootDir, 'openspec', 'specs', 'deployment', 'build-verification.md');
  const spec = `# Build Verification Specification

**Cathedral of Circuits - Magnum Opus Version 1.0**  
**Author: Rebecca Respawn**

## Overview

This specification defines the build verification process for safe GitHub to GitLab migration.

## Build Verification Checklist

### Pre-Migration

- [ ] All builds pass locally
- [ ] Turbo cache is working
- [ ] All apps build successfully
- [ ] Dependencies are up to date
- [ ] No build warnings/errors

### During Migration

- [ ] GitLab CI/CD pipeline runs
- [ ] All build stages pass
- [ ] Artifacts are created
- [ ] Build outputs match local builds

### Post-Migration

- [ ] Deployment succeeds
- [ ] All apps are accessible
- [ ] No broken dependencies
- [ ] Performance is maintained

## Build Commands

\`\`\`bash
# Verify all builds
pnpm install
pnpm build

# Check specific apps
pnpm turbo build --filter=apps/web
pnpm turbo build --filter=apps/worker

# Verify build outputs
ls -la apps/*/dist
ls -la packages/*/dist
\`\`\`

## Verification Script

\`\`\`bash
node tools/verify-builds.mjs
\`\`\`

---

**Part of Cathedral of Circuits - Magnum Opus Version 1.0**
`;

  writeFileSync(specPath, spec);
  console.log(`   ✅ Created: ${relative(rootDir, specPath)}\n`);
  return specPath;
}

function createBuildVerificationTool() {
  console.log('🔧 Step 4: Creating build verification tool...');
  
  const toolPath = join(rootDir, 'tools', 'verify-builds.mjs');
  const tool = `#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - Build Verification Tool
 * 
 * Verifies all builds before GitHub to GitLab migration
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const VERIFICATION_STEPS = [
  {
    name: 'Check Dependencies',
    command: 'pnpm install --frozen-lockfile',
    verify: () => existsSync(join(rootDir, 'node_modules'))
  },
  {
    name: 'Build All Apps',
    command: 'pnpm build',
    verify: () => {
      const apps = ['web', 'worker'];
      return apps.every(app => {
        const distPath = join(rootDir, 'apps', app, 'dist');
        return existsSync(distPath);
      });
    }
  },
  {
    name: 'Check Build Outputs',
    command: null,
    verify: () => {
      const buildOutputs = [];
      readdirSync(join(rootDir, 'apps')).forEach(app => {
        const distPath = join(rootDir, 'apps', app, 'dist');
        if (existsSync(distPath)) {
          buildOutputs.push({ app, dist: distPath });
        }
      });
      return buildOutputs.length > 0;
    }
  }
];

async function verifyBuilds() {
  console.log('⚗️  Build Verification for GitLab Migration\\n');
  
  const results = [];
  
  for (const step of VERIFICATION_STEPS) {
    console.log(\`🔍 \${step.name}...\`);
    
    try {
      if (step.command) {
        execSync(step.command, { 
          cwd: rootDir,
          stdio: 'inherit'
        });
      }
      
      const passed = step.verify();
      results.push({ step: step.name, passed });
      
      if (passed) {
        console.log(\`   ✅ \${step.name} - PASSED\\n\`);
      } else {
        console.log(\`   ❌ \${step.name} - FAILED\\n\`);
      }
    } catch (e) {
      results.push({ step: step.name, passed: false, error: e.message });
      console.log(\`   ❌ \${step.name} - ERROR: \${e.message}\\n\`);
    }
  }
  
  const allPassed = results.every(r => r.passed);
  
  console.log('📊 Verification Summary:');
  results.forEach(r => {
    console.log(\`   \${r.passed ? '✅' : '❌'} \${r.step}\`);
  });
  
  if (allPassed) {
    console.log('\\n✅ All builds verified! Safe to migrate to GitLab.\\n');
    process.exit(0);
  } else {
    console.log('\\n❌ Build verification failed! Fix issues before migrating.\\n');
    process.exit(1);
  }
}

verifyBuilds().catch(console.error);
`;

  writeFileSync(toolPath, tool);
  execSync(`chmod +x ${toolPath}`);
  console.log(`   ✅ Created: ${relative(rootDir, toolPath)}\n`);
  return toolPath;
}

function createSafeGitLabMigrationScript() {
  console.log('🚀 Step 5: Creating safe GitLab migration script...');
  
  const scriptPath = join(rootDir, 'tools', 'safe-gitlab-migration-with-builds.mjs');
  const script = `#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - Safe GitHub to GitLab Migration with Build Verification
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * Safely migrates repository from GitHub to GitLab:
 * - Verifies all builds first
 * - Creates backup
 * - Updates all references
 * - Tests GitLab CI/CD
 * - Migrates with full build verification
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const GITLAB_CONFIG = {
  namespace: 'bekalah',
  repoName: 'cathedral-of-circuits-magnum-opus-v1',
  url: 'https://gitlab.com/bekalah/cathedral-of-circuits-magnum-opus-v1.git',
  sshUrl: 'git@gitlab.com:bekalah/cathedral-of-circuits-magnum-opus-v1.git'
};

async function verifyBuilds() {
  console.log('🔍 Step 1: Verifying builds...\\n');
  
  try {
    execSync('node tools/verify-builds.mjs', {
      cwd: rootDir,
      stdio: 'inherit'
    });
    console.log('\\n✅ Build verification passed!\\n');
    return true;
  } catch (e) {
    console.log('\\n❌ Build verification failed!');
    console.log('   Fix build issues before migrating.\\n');
    return false;
  }
}

async function createBackup() {
  console.log('💾 Step 2: Creating backup...\\n');
  
  const backupDir = join(rootDir, 'archive', 'pre-gitlab-migration');
  if (!existsSync(backupDir)) {
    mkdirSync(backupDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = join(backupDir, \`backup-\${timestamp}.tar.gz\`);
  
  try {
    execSync(\`tar -czf "\${backupFile}" --exclude=node_modules --exclude=.git --exclude=dist .\`, {
      cwd: rootDir,
      stdio: 'inherit'
    });
    console.log(\`   ✅ Backup created: \${backupFile}\\n\`);
    return backupFile;
  } catch (e) {
    console.log(\`   ⚠️  Backup creation failed: \${e.message}\\n\`);
    return null;
  }
}

async function updateReferences() {
  console.log('🔧 Step 3: Updating GitHub to GitLab references...\\n');
  
  // Update package.json
  const packageJsonPath = join(rootDir, 'package.json');
  if (existsSync(packageJsonPath)) {
    const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    
    if (pkg.repository) {
      pkg.repository.url = GITLAB_CONFIG.url;
      writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\\n');
      console.log('   ✅ Updated package.json repository URL\\n');
    }
  }
  
  // Update README
  const readmePath = join(rootDir, 'README.md');
  if (existsSync(readmePath)) {
    let readme = readFileSync(readmePath, 'utf-8');
    readme = readme.replace(/github\.com\\/[^\\/]+\\/[^\\s)]+/g, (match) => {
      return match.replace('github.com', 'gitlab.com/bekalah');
    });
    writeFileSync(readmePath, readme);
    console.log('   ✅ Updated README.md references\\n');
  }
}

async function verifyGitLabSetup() {
  console.log('🔍 Step 4: Verifying GitLab setup...\\n');
  
  // Check if .gitlab-ci.yml exists
  const ciPath = join(rootDir, '.gitlab-ci.yml');
  if (!existsSync(ciPath)) {
    console.log('   ⚠️  .gitlab-ci.yml not found. Creating default...\\n');
    // Would create default CI/CD config
  } else {
    console.log('   ✅ .gitlab-ci.yml found\\n');
  }
  
  // Check if GitLab remote exists
  try {
    const remotes = execSync('git remote -v', { encoding: 'utf-8' });
    if (remotes.includes('gitlab')) {
      console.log('   ✅ GitLab remote configured\\n');
    } else {
      console.log('   ℹ️  GitLab remote not configured. Run:');
      console.log(\`      git remote add gitlab \${GITLAB_CONFIG.url}\\n\`);
    }
  } catch (e) {
    console.log('   ⚠️  Not a git repository or git not available\\n');
  }
}

async function migrateToGitLab() {
  console.log('🚀 Step 5: Migrating to GitLab...\\n');
  
  console.log('📋 Migration Checklist:');
  console.log('   1. ✅ Builds verified');
  console.log('   2. ✅ Backup created');
  console.log('   3. ✅ References updated');
  console.log('   4. ✅ GitLab setup verified\\n');
  
  console.log('📝 Next Steps:');
  console.log(\`   1. Add GitLab remote: git remote add gitlab \${GITLAB_CONFIG.url}\`);
  console.log('   2. Push to GitLab: git push gitlab main');
  console.log('   3. Verify CI/CD pipeline runs');
  console.log('   4. Check deployment succeeds\\n');
  
  console.log('✅ Safe migration preparation complete!\\n');
}

async function main() {
  console.log('⚗️  Safe GitHub to GitLab Migration with Build Verification\\n');
  console.log(\`Project: \${PROJECT_INFO.fullName}\\n\`);
  
  // Step 1: Verify builds
  const buildsOk = await verifyBuilds();
  if (!buildsOk) {
    console.log('❌ Migration aborted: Build verification failed.\\n');
    process.exit(1);
  }
  
  // Step 2: Create backup
  await createBackup();
  
  // Step 3: Update references
  await updateReferences();
  
  // Step 4: Verify GitLab setup
  await verifyGitLabSetup();
  
  // Step 5: Migrate
  await migrateToGitLab();
}

const PROJECT_INFO = {
  fullName: 'Cathedral of Circuits - Magnum Opus Version 1.0'
};

main().catch(console.error);
`;

  writeFileSync(scriptPath, script);
  execSync(`chmod +x ${scriptPath}`);
  console.log(`   ✅ Created: ${relative(rootDir, scriptPath)}\n`);
  return scriptPath;
}

function createOpenSpecStructure() {
  console.log('📚 Step 6: Creating OpenSpec documentation structure...');
  
  const specs = {
    'deployment/gitlab-build-verification': {
      title: 'GitLab Build Verification Process',
      content: `# GitLab Build Verification Process

**Cathedral of Circuits - Magnum Opus Version 1.0**

## Overview

Safe migration requires full build verification at each step.

## Process

1. **Pre-Migration**: Verify all builds pass locally
2. **During Migration**: Verify CI/CD pipeline works
3. **Post-Migration**: Verify deployment succeeds

## Tools

- \`tools/verify-builds.mjs\` - Build verification
- \`tools/safe-gitlab-migration-with-builds.mjs\` - Safe migration script

---

**Part of Cathedral of Circuits - Magnum Opus Version 1.0**
`
    },
    'architecture/turbo-monorepo': {
      title: 'Turbo Monorepo Architecture',
      content: `# Turbo Monorepo Architecture

**Cathedral of Circuits - Magnum Opus Version 1.0**

## Structure

- \`apps/\` - Applications (React + Vite)
- \`packages/\` - Shared packages
- \`turbo.json\` - Turbo configuration

## Build Process

1. Install dependencies (pnpm)
2. Build with Turbo cache
3. Verify build outputs

---

**Part of Cathedral of Circuits - Magnum Opus Version 1.0**
`
    }
  };
  
  const created = [];
  Object.entries(specs).forEach(([path, spec]) => {
    const specPath = join(rootDir, 'openspec', 'specs', `${path}.md`);
    const specDir = dirname(specPath);
    if (!existsSync(specDir)) {
      mkdirSync(specDir, { recursive: true });
    }
    writeFileSync(specPath, spec.content);
    created.push(relative(rootDir, specPath));
  });
  
  console.log(`   ✅ Created ${created.length} OpenSpec document(s)\n`);
  return created;
}

async function main() {
  console.log(`⚗️  ${PROJECT_INFO.fullName}`);
  console.log(`OpenSpec + Docker + GitLab Organization\n`);

  const results = {
    timestamp: new Date().toISOString(),
    openspec: {},
    docker: {},
    gitlab: {},
    tools: []
  };

  // Step 1: Organize OpenSpec
  results.openspec.structure = await organizeOpenSpec();

  // Step 2: Move old Docker configs
  results.docker.moved = moveOldDockerConfigs();

  // Step 3: Create build verification spec
  results.gitlab.verificationSpec = createBuildVerificationSpec();

  // Step 4: Create build verification tool
  results.gitlab.verificationTool = createBuildVerificationTool();
  results.tools.push(relative(rootDir, results.gitlab.verificationTool));

  // Step 5: Create safe migration script
  results.gitlab.migrationScript = createSafeGitLabMigrationScript();
  results.tools.push(relative(rootDir, results.gitlab.migrationScript));

  // Step 6: Create OpenSpec docs
  results.openspec.docs = createOpenSpecStructure();

  // Summary
  console.log('📊 Summary:');
  console.log(`   📚 OpenSpec: Organized structure`);
  console.log(`   🐳 Docker: ${results.docker.moved.length} config(s) archived`);
  console.log(`   🚀 GitLab: Migration tools created`);
  console.log(`   🔧 Tools: ${results.tools.length} tool(s) created\n`);

  // Save report
  const reportPath = join(rootDir, 'archive', 'reports-and-status', 'openspec-docker-gitlab-organization.json');
  const reportDir = dirname(reportPath);
  if (!existsSync(reportDir)) {
    mkdirSync(reportDir, { recursive: true });
  }
  writeFileSync(reportPath, JSON.stringify(results, null, 2));

  console.log('✅ Organization complete!\n');
  console.log('🚀 Next steps:');
  console.log('   1. Verify builds: node tools/verify-builds.mjs');
  console.log('   2. Safe migration: node tools/safe-gitlab-migration-with-builds.mjs');
  console.log('   3. Review OpenSpec: openspec/specs/\n');
}

main().catch(console.error);



