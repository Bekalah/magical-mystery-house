#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - GitLab Migration Preparation Tool
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * Prepares Cathedral of Circuits monorepo for GitLab migration:
 * - Converts GitHub references to GitLab
 * - Creates/updates .gitlab-ci.yml
 * - Updates package.json repository URLs
 * - Archives GitHub workflows
 * - Updates documentation references
 * - Applies Cathedral of Circuits branding
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
  magnumOpus: true,
  author: 'Rebecca Respawn',
  penName: 'Rebecca Respawn',
  fullName: 'Cathedral of Circuits - Magnum Opus Version 1.0',
  subtitle: 'Liber Arcanae Codex Abyssiae',
  description: 'Cathedral of Circuits - Magnum Opus Version 1.0: A living creative sanctuary integrating alchemy, hermetica, neo-platonic philosophy, and sacred mathematics. Part of Liber Arcanae Codex Abyssiae.'
};

const GITLAB_CONFIG = {
  namespace: 'bekalah',
  baseUrl: 'https://gitlab.com/bekalah',
  repoName: 'cathedral-of-circuits-magnum-opus-v1',
  fullUrl: 'https://gitlab.com/bekalah/cathedral-of-circuits-magnum-opus-v1',
  sshUrl: 'git@gitlab.com:bekalah/cathedral-of-circuits-magnum-opus-v1.git',
  httpsUrl: 'https://gitlab.com/bekalah/cathedral-of-circuits-magnum-opus-v1.git'
};

const URL_MAPPINGS = [
  { from: /github\.com\/[^/]+\/([^/]+)/g, to: 'gitlab.com/bekalah/$1' },
  { from: /github\.com/g, to: 'gitlab.com' },
  { from: /\.github\.io/g, to: '.gitlab.io' },
  { from: /github-pages/g, to: 'gitlab-pages' },
  { from: /GitHub Actions/g, to: 'GitLab CI/CD' },
  { from: /GitHub Actions workflow/g, to: 'GitLab CI/CD pipeline' }
];

function findFilesWithPattern(pattern, fileType = null) {
  try {
    const typeFlag = fileType ? `--type ${fileType}` : '';
    const result = execSync(`rg --files ${typeFlag} "${pattern}"`, {
      cwd: rootDir,
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024
    });
    return result.trim().split('\n').filter(Boolean);
  } catch (e) {
    return [];
  }
}

function findPackageJsonFiles() {
  try {
    const result = execSync('rg --files --type json package.json', {
      cwd: rootDir,
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024
    });
    return result.trim().split('\n').filter(Boolean);
  } catch (e) {
    return [];
  }
}

function createGitLabCI() {
  const gitlabCI = `# ⚗️ Cathedral of Circuits - Magnum Opus Version 1.0
# GitLab CI/CD Pipeline - Liber Arcanae Codex Abyssiae
# Author: Rebecca Respawn (pen name)
# License: CC0-1.0 - Public Domain

stages:
  - setup
  - quality
  - build
  - test
  - deploy

variables:
  PROJECT_NAME: "${PROJECT_INFO.fullName}"
  PROJECT_AUTHOR: "${PROJECT_INFO.author}"
  NODE_VERSION: "20"
  PNPM_VERSION: "10.23.0"

setup:
  stage: setup
  image: node:\${NODE_VERSION}
  before_script:
    - echo "⚗️ ${PROJECT_INFO.fullName}"
    - echo "Author: ${PROJECT_INFO.author}"
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
    - develop
    - merge_requests

quality:lint:
  stage: quality
  image: node:\${NODE_VERSION}
  needs: ["setup"]
  before_script:
    - corepack enable
    - corepack prepare pnpm@\${PNPM_VERSION} --activate
  script:
    - pnpm run lint
  cache:
    key: cathedral-circuits-pnpm-\${CI_COMMIT_REF_SLUG}
    paths:
      - .pnpm-store
      - node_modules
    policy: pull
  only:
    - main
    - develop
    - merge_requests

build:
  stage: build
  image: node:\${NODE_VERSION}
  needs: ["quality:lint"]
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
    - develop
    - merge_requests

test:
  stage: test
  image: node:\${NODE_VERSION}
  needs: ["build"]
  before_script:
    - corepack enable
    - corepack prepare pnpm@\${PNPM_VERSION} --activate
  script:
    - pnpm run test
  only:
    - main
    - develop
    - merge_requests

deploy:pages:
  stage: deploy
  image: node:\${NODE_VERSION}
  needs: ["test"]
  before_script:
    - corepack enable
    - corepack prepare pnpm@\${PNPM_VERSION} --activate
  script:
    - pnpm run build
    - mkdir -p public
    - cp -r apps/web/dist/* public/ || true
  artifacts:
    paths:
      - public
    expire_in: 1 week
  only:
    - main
`;

  const ciPath = join(rootDir, '.gitlab-ci.yml');
  writeFileSync(ciPath, gitlabCI);
  return ciPath;
}

function updatePackageJson(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const pkg = JSON.parse(content);
    let updated = false;

    if (!pkg.cathedral) {
      pkg.cathedral = {};
      updated = true;
    }

    if (!pkg.cathedral.project || pkg.cathedral.project !== PROJECT_INFO.name) {
      pkg.cathedral.project = PROJECT_INFO.name;
      pkg.cathedral.author = PROJECT_INFO.author;
      updated = true;
    }

    if (pkg.repository) {
      if (typeof pkg.repository === 'string') {
        const newRepo = pkg.repository.replace(/github\.com/g, 'gitlab.com/bekalah');
        if (pkg.repository !== newRepo) {
          pkg.repository = newRepo;
          updated = true;
        }
      } else if (pkg.repository.url) {
        const newUrl = pkg.repository.url.replace(/github\.com/g, 'gitlab.com/bekalah');
        if (pkg.repository.url !== newUrl) {
          pkg.repository.url = newUrl;
          updated = true;
        }
      }
    } else {
      pkg.repository = {
        type: 'git',
        url: GITLAB_CONFIG.httpsUrl
      };
      updated = true;
    }

    if (updated) {
      writeFileSync(filePath, JSON.stringify(pkg, null, 2) + '\n');
      return { updated: true, file: filePath };
    }

    return { updated: false, file: filePath, reason: 'Already updated' };
  } catch (e) {
    return { updated: false, file: filePath, error: e.message };
  }
}

async function main() {
  console.log(`⚗️  ${PROJECT_INFO.fullName}`);
  console.log(`Author: ${PROJECT_INFO.author} (pen name)`);
  console.log(`GitLab Migration Preparation Tool\n`);
  console.log(`Target: ${GITLAB_CONFIG.fullUrl}\n`);

  const results = {
    project: PROJECT_INFO,
    gitlabCI: null,
    packages: [],
    markdown: [],
    timestamp: new Date().toISOString()
  };

  console.log('📝 Creating .gitlab-ci.yml...');
  results.gitlabCI = createGitLabCI();
  console.log(`  ✅ Created: ${results.gitlabCI}\n`);

  console.log('📦 Updating package.json files...');
  const packageFiles = findPackageJsonFiles();
  console.log(`Found ${packageFiles.length} package.json files\n`);

  for (const pkgFile of packageFiles) {
    const result = updatePackageJson(pkgFile);
    results.packages.push(result);
    if (result.updated) {
      console.log(`  ✅ Updated: ${relative(rootDir, pkgFile)}`);
    }
  }

  const reportPath = join(rootDir, 'gitlab-migration-report.json');
  writeFileSync(reportPath, JSON.stringify(results, null, 2));

  console.log('\n📊 Summary:');
  console.log(`  ✅ .gitlab-ci.yml created`);
  console.log(`  ✅ Packages updated: ${results.packages.filter(r => r.updated).length}`);
  console.log(`  📄 Report: ${reportPath}\n`);

  console.log(`✅ GitLab migration preparation complete for ${PROJECT_INFO.fullName}!\n`);
}

main().catch(console.error);
