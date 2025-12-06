#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - Repo Fix, Merge Duplicates & Deploy
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * Carefully fixes repos:
 * - Analyzes duplicates across workspaces
 * - Identifies best versions
 * - Merges or archives duplicates
 * - Corrects deployment configs
 * - Sets up GitLab with Vercel info
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync, renameSync } from 'fs';
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
  author: 'Rebecca Respawn',
  subtitle: 'Liber Arcanae Codex Abyssiae',
  vercel: {
    projectPath: 'cathedralofcircuits',
    username: 'e0VSeDYkDakIJJ70FADnY3CY'
  },
  gitlab: {
    namespace: 'bekalah',
    repoName: 'cathedral-of-circuits-magnum-opus-v1'
  }
};

const WORKSPACE_DIRS = [
  join(homeDir, 'cathedral-master-deployment'),
  join(homeDir, 'cathedral-v1-consolidated'),
  join(homeDir, 'cathedral-fixed-clean'),
  join(homeDir, 'cathedral-real')
].filter(dir => existsSync(dir));

function findPackageJsonFiles(dir) {
  const results = [];
  try {
    const result = execSync('rg --files --type json package.json', {
      cwd: dir,
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore']
    });
    return result.trim().split('\n').filter(Boolean);
  } catch (e) {
    return findFilesRecursive(dir, 'package.json');
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

function analyzePackage(pkgPath) {
  try {
    const content = readFileSync(pkgPath, 'utf-8');
    const pkg = JSON.parse(content);
    const stat = statSync(pkgPath);
    
    return {
      path: pkgPath,
      name: pkg.name,
      version: pkg.version || '1.0.0',
      description: pkg.description || '',
      dependencies: Object.keys(pkg.dependencies || {}).length,
      scripts: Object.keys(pkg.scripts || {}).length,
      hasReadme: existsSync(pkgPath.replace('package.json', 'README.md')),
      hasTsConfig: existsSync(pkgPath.replace('package.json', 'tsconfig.json')),
      mtime: stat.mtime.getTime(),
      size: stat.size,
      quality: calculatePackageQuality(pkg, pkgPath)
    };
  } catch (e) {
    return {
      path: pkgPath,
      error: e.message,
      quality: 0
    };
  }
}

function calculatePackageQuality(pkg, pkgPath) {
  let score = 0;
  
  // Has name
  if (pkg.name) score += 10;
  
  // Has version
  if (pkg.version) score += 5;
  
  // Has description
  if (pkg.description) score += 10;
  
  // Has scripts
  if (pkg.scripts && Object.keys(pkg.scripts).length > 0) score += 15;
  
  // Has dependencies
  if (pkg.dependencies && Object.keys(pkg.dependencies).length > 0) score += 10;
  
  // Has README
  if (existsSync(pkgPath.replace('package.json', 'README.md'))) score += 20;
  
  // Has tsconfig
  if (existsSync(pkgPath.replace('package.json', 'tsconfig.json'))) score += 15;
  
  // Has Cathedral metadata
  if (pkg.cathedral) score += 15;
  
  // Has correct license
  if (pkg.license === 'CC0-1.0') score += 10;
  
  return score;
}

function findDuplicates() {
  console.log('🔍 Analyzing packages across workspaces...\n');
  
  const packageMap = new Map();
  
  WORKSPACE_DIRS.forEach(wsDir => {
    const wsName = basename(wsDir);
    const pkgs = findPackageJsonFiles(wsDir);
    
    pkgs.forEach(pkgPath => {
      const analysis = analyzePackage(pkgPath);
      if (analysis.error || !analysis.name) return;
      
      if (!packageMap.has(analysis.name)) {
        packageMap.set(analysis.name, []);
      }
      
      packageMap.get(analysis.name).push({
        ...analysis,
        workspace: wsName,
        workspacePath: wsDir
      });
    });
  });
  
  const duplicates = [];
  packageMap.forEach((instances, pkgName) => {
    if (instances.length > 1) {
      // Sort by quality (best first)
      instances.sort((a, b) => b.quality - a.quality);
      
      duplicates.push({
        package: pkgName,
        instances: instances.length,
        best: instances[0],
        others: instances.slice(1),
        recommendation: determineBestVersion(instances)
      });
    }
  });
  
  return duplicates;
}

function determineBestVersion(instances) {
  // Best version is the one with highest quality score
  const best = instances[0];
  
  const othersToArchive = instances.slice(1).filter(inst => {
    // Only archive if quality is significantly lower
    return inst.quality < best.quality * 0.7;
  });
  
  const othersToMerge = instances.slice(1).filter(inst => {
    // Merge if quality is close (within 20%)
    return inst.quality >= best.quality * 0.8;
  });
  
  return {
    keep: best.path,
    archive: othersToArchive.map(i => i.path),
    merge: othersToMerge.map(i => i.path),
    reason: `Best version: ${best.workspace} (quality: ${best.quality})`
  };
}

function fixVercelConfig(filePath, projectPath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const config = JSON.parse(content);
    
    // Add project info if missing
    if (!config.projectId) {
      config.projectSettings = {
        framework: config.framework || null,
        buildCommand: config.buildCommand || 'pnpm run build',
        devCommand: config.devCommand || 'pnpm run dev',
        installCommand: config.installCommand || 'pnpm install',
        outputDirectory: config.outputDirectory || 'dist',
        rootDirectory: config.rootDirectory || '.'
      };
    }
    
    // Ensure correct structure
    const fixed = {
      version: 2,
      ...config,
      name: projectPath,
      projectId: config.projectId || PROJECT_INFO.vercel.username
    };
    
    writeFileSync(filePath, JSON.stringify(fixed, null, 2) + '\n');
    return { fixed: true, file: filePath };
  } catch (e) {
    return { fixed: false, file: filePath, error: e.message };
  }
}

function setupGitLabCI() {
  const ciPath = join(rootDir, '.gitlab-ci.yml');
  
  const ciConfig = `# ⚗️ Cathedral of Circuits - Magnum Opus Version 1.0
# GitLab CI/CD Pipeline
# Author: Rebecca Respawn (pen name)
# Vercel Project: ${PROJECT_INFO.vercel.projectPath}

stages:
  - setup
  - quality
  - build
  - test
  - deploy

variables:
  PROJECT_NAME: "${PROJECT_INFO.fullName}"
  VERCEL_PROJECT: "${PROJECT_INFO.vercel.projectPath}"
  VERCEL_USERNAME: "${PROJECT_INFO.vercel.username}"
  NODE_VERSION: "20"
  PNPM_VERSION: "10.23.0"

setup:
  stage: setup
  image: node:\${NODE_VERSION}
  before_script:
    - echo "⚗️ ${PROJECT_INFO.fullName}"
    - echo "Vercel Project: ${PROJECT_INFO.vercel.projectPath}"
    - corepack enable
    - corepack prepare pnpm@\${PNPM_VERSION} --activate
    - pnpm install --frozen-lockfile
  cache:
    key: cathedral-circuits-pnpm-\${CI_COMMIT_REF_SLUG}
    paths:
      - .pnpm-store
      - node_modules
    policy: pull-push
  only:
    - main
    - magnum-opus
    - develop

build:
  stage: build
  image: node:\${NODE_VERSION}
  needs: ["setup"]
  before_script:
    - corepack enable
    - corepack prepare pnpm@\${PNPM_VERSION} --activate
  script:
    - echo "Building ${PROJECT_INFO.fullName}..."
    - pnpm run build
  cache:
    key: cathedral-circuits-pnpm-\${CI_COMMIT_REF_SLUG}
    paths:
      - .pnpm-store
      - node_modules
      - dist
      - build
    policy: pull-push
  artifacts:
    paths:
      - dist
      - build
    expire_in: 1 week
  only:
    - main
    - magnum-opus

deploy:vercel:
  stage: deploy
  image: node:\${NODE_VERSION}
  needs: ["build"]
  before_script:
    - corepack enable
    - corepack prepare pnpm@\${PNPM_VERSION} --activate
    - npm i -g vercel@latest
  script:
    - vercel --prod --token $VERCEL_TOKEN --yes
    - echo "Deployed to Vercel: ${PROJECT_INFO.vercel.projectPath}"
  only:
    - main
    - magnum-opus
  when: manual
`;

  writeFileSync(ciPath, ciConfig);
  return ciPath;
}

async function main() {
  console.log(`⚗️  ${PROJECT_INFO.fullName}`);
  console.log(`Author: ${PROJECT_INFO.author} (pen name)`);
  console.log(`Repo Fix, Merge Duplicates & Deploy Tool\n`);
  console.log(`Vercel Project: ${PROJECT_INFO.vercel.projectPath}`);
  console.log(`GitLab Repo: ${PROJECT_INFO.gitlab.repoName}\n`);

  const results = {
    project: PROJECT_INFO,
    duplicates: [],
    actions: {
      keep: [],
      archive: [],
      merge: [],
      fixed: []
    },
    vercel: { fixed: [], errors: [] },
    gitlab: { ciCreated: false },
    timestamp: new Date().toISOString()
  };

  // 1. Find and analyze duplicates
  console.log('📦 Step 1: Finding duplicates...');
  const duplicates = findDuplicates();
  results.duplicates = duplicates;
  console.log(`Found ${duplicates.length} duplicate packages\n`);

  // 2. Determine actions for each duplicate
  console.log('🎯 Step 2: Determining best versions...\n');
  duplicates.forEach(dup => {
    const rec = dup.recommendation;
    
    results.actions.keep.push({
      package: dup.package,
      path: rec.keep,
      reason: rec.reason
    });
    
    if (rec.archive.length > 0) {
      results.actions.archive.push({
        package: dup.package,
        paths: rec.archive,
        reason: 'Lower quality version'
      });
    }
    
    if (rec.merge.length > 0) {
      results.actions.merge.push({
        package: dup.package,
        paths: rec.merge,
        reason: 'Similar quality, needs manual review'
      });
    }
  });

  // Display recommendations
  duplicates.slice(0, 10).forEach(dup => {
    console.log(`📦 ${dup.package}`);
    console.log(`   ✅ Keep: ${relative(rootDir, dup.recommendation.keep)}`);
    if (dup.recommendation.archive.length > 0) {
      console.log(`   📁 Archive: ${dup.recommendation.archive.length} versions`);
    }
    if (dup.recommendation.merge.length > 0) {
      console.log(`   🔀 Merge: ${dup.recommendation.merge.length} versions`);
    }
    console.log('');
  });

  if (duplicates.length > 10) {
    console.log(`   ... and ${duplicates.length - 10} more\n`);
  }

  // 3. Fix Vercel configs
  console.log('🔧 Step 3: Fixing Vercel configurations...');
  const vercelConfigs = findFilesRecursive(rootDir, 'vercel.json');
  vercelConfigs.forEach(configPath => {
    const result = fixVercelConfig(configPath, PROJECT_INFO.vercel.projectPath);
    if (result.fixed) {
      results.vercel.fixed.push(relative(rootDir, configPath));
      console.log(`   ✅ Fixed: ${relative(rootDir, configPath)}`);
    } else {
      results.vercel.errors.push({ file: relative(rootDir, configPath), error: result.error });
      console.log(`   ⚠️  Error: ${relative(rootDir, configPath)}`);
    }
  });
  console.log('');

  // 4. Setup GitLab CI
  console.log('🌿 Step 4: Setting up GitLab CI/CD...');
  const ciPath = setupGitLabCI();
  results.gitlab.ciCreated = true;
  console.log(`   ✅ Created: ${relative(rootDir, ciPath)}\n`);

  // 5. Create archive directory structure
  console.log('📁 Step 5: Preparing archive structure...');
  const archiveDir = join(rootDir, 'archive', 'duplicate-packages');
  if (!existsSync(archiveDir)) {
    mkdirSync(archiveDir, { recursive: true });
  }
  console.log(`   ✅ Archive ready: ${relative(rootDir, archiveDir)}\n`);

  // 6. Generate detailed report
  const reportPath = join(rootDir, 'repo-fix-merge-deploy-report.json');
  writeFileSync(reportPath, JSON.stringify(results, null, 2));

  // 7. Generate action summary
  const summaryPath = join(rootDir, 'REPO_FIX_SUMMARY.md');
  const summary = `# Repo Fix, Merge Duplicates & Deploy Summary

**Generated**: ${new Date().toISOString()}
**Project**: ${PROJECT_INFO.fullName}
**Author**: ${PROJECT_INFO.author}

## Summary

- **Duplicates Found**: ${duplicates.length}
- **Packages to Keep**: ${results.actions.keep.length}
- **Versions to Archive**: ${results.actions.archive.reduce((sum, a) => sum + a.paths.length, 0)}
- **Versions to Merge**: ${results.actions.merge.reduce((sum, m) => sum + m.paths.length, 0)}
- **Vercel Configs Fixed**: ${results.vercel.fixed.length}

## Vercel Deployment Info

- **Project Path**: ${PROJECT_INFO.vercel.projectPath}
- **Username**: ${PROJECT_INFO.vercel.username}

## GitLab Setup

- **Repository**: ${PROJECT_INFO.gitlab.repoName}
- **CI/CD**: ✅ Configured

## Next Steps

### To Archive Duplicates:
\`\`\`bash
# Review the recommendations in repo-fix-merge-deploy-report.json
# Then archive lower-quality versions
\`\`\`

### To Deploy:
\`\`\`bash
# Push to GitLab
git remote add gitlab https://gitlab.com/${PROJECT_INFO.gitlab.namespace}/${PROJECT_INFO.gitlab.repoName}.git
git push gitlab magnum-opus

# Connect to Vercel (from GitLab CI/CD)
# Set VERCEL_TOKEN in GitLab CI/CD variables
\`\`\`

## Detailed Report

See \`repo-fix-merge-deploy-report.json\` for complete analysis.

---

**Part of ${PROJECT_INFO.fullName}**
`;

  writeFileSync(summaryPath, summary);

  console.log('📊 Summary:');
  console.log(`   ✅ Duplicates analyzed: ${duplicates.length}`);
  console.log(`   ✅ Packages to keep: ${results.actions.keep.length}`);
  console.log(`   📁 Versions to archive: ${results.actions.archive.reduce((sum, a) => sum + a.paths.length, 0)}`);
  console.log(`   🔀 Versions to merge: ${results.actions.merge.reduce((sum, m) => sum + m.paths.length, 0)}`);
  console.log(`   ✅ Vercel configs fixed: ${results.vercel.fixed.length}`);
  console.log(`   ✅ GitLab CI/CD configured\n`);
  console.log(`📄 Reports:`);
  console.log(`   - ${relative(rootDir, reportPath)}`);
  console.log(`   - ${relative(rootDir, summaryPath)}\n`);
  console.log(`✅ Complete! Review reports before archiving/merging.\n`);
}

main().catch(console.error);




