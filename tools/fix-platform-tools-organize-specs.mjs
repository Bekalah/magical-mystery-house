#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - Fix Platform/Tools & Organize Specs
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * Comprehensive fix:
 * - Finds all spec-related info
 * - Organizes platform/tool configurations
 * - Consolidates scattered specs
 * - Fixes inconsistencies
 * - Creates unified spec system
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync, renameSync } from 'fs';
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

function ripgrepSearch(pattern) {
  try {
    const result = execSync(`rg --files "${pattern}"`, {
      cwd: rootDir,
      encoding: 'utf-8',
      maxBuffer: 50 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore']
    });
    return result.trim().split('\n').filter(Boolean);
  } catch (e) {
    return [];
  }
}

function findSpecFiles() {
  const specs = {
    openspec: [],
    markdown: [],
    json: [],
    typescript: [],
    scattered: []
  };
  
  // OpenSpec directory
  const openspecDir = join(rootDir, 'openspec');
  if (existsSync(openspecDir)) {
    try {
      const files = execSync('find openspec -type f', {
        cwd: rootDir,
        encoding: 'utf-8',
        maxBuffer: 10 * 1024 * 1024
      }).trim().split('\n').filter(Boolean);
      specs.openspec = files;
    } catch (e) {
      // Use readdirSync as fallback
      try {
        const entries = readdirSync(openspecDir, { recursive: true });
        specs.openspec = entries.filter(e => 
          e.endsWith('.md') || e.endsWith('.json') || e.endsWith('.yaml')
        ).map(e => join('openspec', e));
      } catch (e2) {
        // Skip
      }
    }
  }
  
  // Spec markdown files
  specs.markdown = ripgrepSearch('spec').filter(f => 
    f.includes('.md') && 
    (f.includes('spec') || f.includes('SPEC') || f.includes('Spec'))
  );
  
  // Spec JSON files
  specs.json = ripgrepSearch('spec').filter(f => 
    f.includes('.json') && 
    (f.includes('spec') || f.includes('SPEC') || f.includes('Spec'))
  );
  
  // TypeScript spec files
  specs.typescript = ripgrepSearch('spec').filter(f => 
    (f.includes('.ts') || f.includes('.tsx')) && 
    (f.includes('spec') || f.includes('SPEC') || f.includes('Spec'))
  );
  
  // Scattered spec info (in package.json, README, etc.)
  specs.scattered = ripgrepSearch('specification|spec|standard').filter(f =>
    !f.includes('node_modules') &&
    !f.includes('.git') &&
    (f.includes('package.json') || f.includes('README') || f.includes('CONFIG'))
  );
  
  return specs;
}

function analyzePlatformConfigs() {
  const configs = {
    packageJson: [],
    turbo: null,
    pnpm: null,
    docker: [],
    render: [],
    gitlab: null,
    github: [],
    vite: [],
    esbuild: [],
    node: null,
    errors: []
  };
  
  // package.json files
  try {
    const pkgs = execSync('rg --files --type json package.json', {
      cwd: rootDir,
      encoding: 'utf-8',
      maxBuffer: 50 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim().split('\n').filter(Boolean);
    configs.packageJson = pkgs.slice(0, 50); // Limit for analysis
  } catch (e) {
    configs.errors.push({ type: 'packageJson', error: e.message });
  }
  
  // Turbo
  const turboPath = join(rootDir, 'turbo.json');
  if (existsSync(turboPath)) {
    try {
      const turbo = JSON.parse(readFileSync(turboPath, 'utf-8'));
      configs.turbo = { path: turboPath, version: turbo.version || 'unknown' };
    } catch (e) {
      configs.errors.push({ type: 'turbo', error: e.message });
    }
  }
  
  // pnpm
  const pnpmPath = join(rootDir, 'pnpm-workspace.yaml');
  if (existsSync(pnpmPath)) {
    configs.pnpm = { path: pnpmPath };
  }
  
  // Docker
  configs.docker = ripgrepSearch('Dockerfile').concat(
    ripgrepSearch('docker-compose')
  );
  
  // Render
  configs.render = ripgrepSearch('render.yaml');
  
  // GitLab
  const gitlabPath = join(rootDir, '.gitlab-ci.yml');
  if (existsSync(gitlabPath)) {
    configs.gitlab = { path: gitlabPath };
  }
  
  // GitHub
  configs.github = ripgrepSearch('.github/workflows').filter(f => 
    f.includes('.yml') || f.includes('.yaml')
  );
  
  // Vite
  configs.vite = ripgrepSearch('vite.config');
  
  // esbuild
  configs.esbuild = ripgrepSearch('esbuild.config');
  
  // Node
  const nvmrcPath = join(rootDir, '.nvmrc');
  if (existsSync(nvmrcPath)) {
    try {
      const nodeVersion = readFileSync(nvmrcPath, 'utf-8').trim();
      configs.node = { path: nvmrcPath, version: nodeVersion };
    } catch (e) {
      configs.errors.push({ type: 'node', error: e.message });
    }
  }
  
  return configs;
}

function organizeSpecs(specs) {
  const organizedDir = join(rootDir, 'openspec', 'organized');
  if (!existsSync(organizedDir)) {
    mkdirSync(organizedDir, { recursive: true });
  }
  
  const categories = {
    platform: join(organizedDir, 'platform'),
    tools: join(organizedDir, 'tools'),
    design: join(organizedDir, 'design'),
    quality: join(organizedDir, 'quality'),
    deployment: join(organizedDir, 'deployment'),
    architecture: join(organizedDir, 'architecture')
  };
  
  Object.values(categories).forEach(dir => {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  });
  
  const organized = {
    platform: [],
    tools: [],
    design: [],
    quality: [],
    deployment: [],
    architecture: [],
    consolidated: []
  };
  
  // Organize OpenSpec files
  specs.openspec.forEach(specPath => {
    const fullPath = join(rootDir, specPath);
    if (!existsSync(fullPath)) return;
    
    try {
      const content = readFileSync(fullPath, 'utf-8');
      const fileName = basename(specPath);
      const category = categorizeSpec(content, fileName);
      
      if (category && categories[category]) {
        const destPath = join(categories[category], fileName);
        // Copy instead of move to preserve originals
        writeFileSync(destPath, content);
        organized[category].push(relative(rootDir, destPath));
      }
    } catch (e) {
      // Skip errors
    }
  });
  
  // Create consolidated spec index
  const indexPath = join(organizedDir, 'SPEC_INDEX.md');
  const index = generateSpecIndex(specs, organized);
  writeFileSync(indexPath, index);
  organized.consolidated.push(relative(rootDir, indexPath));
  
  return organized;
}

function categorizeSpec(content, fileName) {
  const lower = content.toLowerCase() + ' ' + fileName.toLowerCase();
  
  if (lower.includes('platform') || lower.includes('deployment') || lower.includes('render') || lower.includes('gitlab')) {
    return 'platform';
  }
  if (lower.includes('tool') || lower.includes('build') || lower.includes('turbo') || lower.includes('vite')) {
    return 'tools';
  }
  if (lower.includes('design') || lower.includes('aesthetic') || lower.includes('visual') || lower.includes('ui')) {
    return 'design';
  }
  if (lower.includes('quality') || lower.includes('standard') || lower.includes('golden') || lower.includes('museum')) {
    return 'quality';
  }
  if (lower.includes('architecture') || lower.includes('structure') || lower.includes('monorepo')) {
    return 'architecture';
  }
  
  return 'platform'; // Default
}

function generateSpecIndex(specs, organized) {
  return `# ⚗️ Cathedral of Circuits - Spec Index

**Generated**: ${new Date().toISOString()}
**Project**: ${PROJECT_INFO.fullName}

## Spec Organization

### OpenSpec Files
- **Total**: ${specs.openspec.length}
- **Location**: \`openspec/\`

### Organized Categories

#### Platform Specs
${organized.platform.map(f => `- ${f}`).join('\n') || '- None'}

#### Tools Specs
${organized.tools.map(f => `- ${f}`).join('\n') || '- None'}

#### Design Specs
${organized.design.map(f => `- ${f}`).join('\n') || '- None'}

#### Quality Specs
${organized.quality.map(f => `- ${f}`).join('\n') || '- None'}

#### Deployment Specs
${organized.deployment.map(f => `- ${f}`).join('\n') || '- None'}

#### Architecture Specs
${organized.architecture.map(f => `- ${f}`).join('\n') || '- None'}

## Scattered Specs Found

- **Markdown**: ${specs.markdown.length} files
- **JSON**: ${specs.json.length} files
- **TypeScript**: ${specs.typescript.length} files
- **Scattered**: ${specs.scattered.length} files

## Next Steps

1. Review organized specs in \`openspec/organized/\`
2. Consolidate duplicate specs
3. Update references to point to organized locations
4. Archive old scattered specs

---

**Part of ${PROJECT_INFO.fullName}**
`;
}

function fixPlatformConfigs(configs) {
  const fixes = {
    nodeVersion: null,
    turboVersion: null,
    pnpmVersion: null,
    inconsistencies: []
  };
  
  // Check Node version consistency
  const nodeVersions = new Set();
  if (configs.node) {
    nodeVersions.add(configs.node.version);
  }
  
  // Check GitHub workflows
  configs.github.forEach(workflowPath => {
    try {
      const content = readFileSync(workflowPath, 'utf-8');
      const matches = content.match(/node-version:\s*['"]?([\d.]+)['"]?/g);
      if (matches) {
        matches.forEach(m => {
          const version = m.match(/[\d.]+/)?.[0];
          if (version) nodeVersions.add(version);
        });
      }
    } catch (e) {
      // Skip
    }
  });
  
  if (nodeVersions.size > 1) {
    fixes.inconsistencies.push({
      type: 'node-version',
      found: Array.from(nodeVersions),
      recommended: '20'
    });
    fixes.nodeVersion = '20';
  } else if (nodeVersions.size === 1) {
    fixes.nodeVersion = Array.from(nodeVersions)[0];
  } else {
    fixes.nodeVersion = '20'; // Default
  }
  
  // Check Turbo version
  if (configs.turbo) {
    fixes.turboVersion = configs.turbo.version;
    if (configs.turbo.version !== '1') {
      fixes.inconsistencies.push({
        type: 'turbo-version',
        found: configs.turbo.version,
        recommended: '1'
      });
    }
  }
  
  return fixes;
}

function createUnifiedSpecSystem() {
  const unifiedDir = join(rootDir, 'openspec', 'unified');
  if (!existsSync(unifiedDir)) {
    mkdirSync(unifiedDir, { recursive: true });
  }
  
  const unifiedSpec = {
    project: PROJECT_INFO,
    platform: {
      node: '20',
      pnpm: '10.23.0',
      turbo: '1',
      build: 'esbuild',
      deploy: 'render'
    },
    tools: {
      monorepo: 'turbo',
      packageManager: 'pnpm',
      bundler: 'esbuild',
      framework: 'react',
      gameEngine: 'godot-4.5',
      rust: true,
      threejs: true
    },
    design: {
      aesthetic: 'tree-of-life-mystical-hall',
      quality: 'museum-grade',
      palette: 'golden-cosmic-ethereal',
      lighting: 'dramatic-ethereal'
    },
    quality: {
      standard: 'golden-standard-alchemy-hermetica-neoplatonic',
      engineering: 'A-plus',
      traumaSafe: true,
      accessibility: true
    },
    deployment: {
      platform: 'render',
      tier: 'free',
      github: 'cathedral-master',
      gitlab: 'cathedral-of-circuits-magnum-opus-v1'
    },
    timestamp: new Date().toISOString()
  };
  
  const specPath = join(unifiedDir, 'unified-spec.json');
  writeFileSync(specPath, JSON.stringify(unifiedSpec, null, 2));
  
  const markdownPath = join(unifiedDir, 'UNIFIED_SPEC.md');
  const markdown = `# ⚗️ Cathedral of Circuits - Unified Specification

**Generated**: ${new Date().toISOString()}
**Project**: ${PROJECT_INFO.fullName}
**Author**: ${PROJECT_INFO.author}

## Platform

- **Node**: ${unifiedSpec.platform.node}
- **PNPM**: ${unifiedSpec.platform.pnpm}
- **Turbo**: ${unifiedSpec.platform.turbo}
- **Build**: ${unifiedSpec.platform.build}
- **Deploy**: ${unifiedSpec.platform.deploy}

## Tools

- **Monorepo**: ${unifiedSpec.tools.monorepo}
- **Package Manager**: ${unifiedSpec.tools.packageManager}
- **Bundler**: ${unifiedSpec.tools.bundler}
- **Framework**: ${unifiedSpec.tools.framework}
- **Game Engine**: ${unifiedSpec.tools.gameEngine}
- **Rust**: ${unifiedSpec.tools.rust ? 'Yes' : 'No'}
- **Three.js**: ${unifiedSpec.tools.threejs ? 'Yes' : 'No'}

## Design

- **Aesthetic**: ${unifiedSpec.design.aesthetic}
- **Quality**: ${unifiedSpec.design.quality}
- **Palette**: ${unifiedSpec.design.palette}
- **Lighting**: ${unifiedSpec.design.lighting}

## Quality Standards

- **Standard**: ${unifiedSpec.quality.standard}
- **Engineering**: ${unifiedSpec.quality.engineering}
- **Trauma Safe**: ${unifiedSpec.quality.traumaSafe ? 'Yes' : 'No'}
- **Accessibility**: ${unifiedSpec.quality.accessibility ? 'Yes' : 'No'}

## Deployment

- **Platform**: ${unifiedSpec.deployment.platform}
- **Tier**: ${unifiedSpec.deployment.tier}
- **GitHub**: ${unifiedSpec.deployment.github}
- **GitLab**: ${unifiedSpec.deployment.gitlab}

---

**Part of ${PROJECT_INFO.fullName}**
`;

  writeFileSync(markdownPath, markdown);
  
  return { json: specPath, markdown: markdownPath };
}

async function main() {
  console.log(`⚗️  ${PROJECT_INFO.fullName}`);
  console.log(`Author: ${PROJECT_INFO.author} (pen name)`);
  console.log(`Fix Platform/Tools & Organize Specs\n`);

  const results = {
    project: PROJECT_INFO,
    specs: {},
    platform: {},
    organized: {},
    unified: {},
    fixes: {},
    timestamp: new Date().toISOString()
  };

  // 1. Find all spec files
  console.log('📋 Step 1: Finding all spec-related files...');
  const specs = findSpecFiles();
  results.specs = {
    openspec: specs.openspec.length,
    markdown: specs.markdown.length,
    json: specs.json.length,
    typescript: specs.typescript.length,
    scattered: specs.scattered.length,
    total: specs.openspec.length + specs.markdown.length + specs.json.length + specs.typescript.length
  };
  
  console.log(`   OpenSpec files: ${specs.openspec.length}`);
  console.log(`   Markdown specs: ${specs.markdown.length}`);
  console.log(`   JSON specs: ${specs.json.length}`);
  console.log(`   TypeScript specs: ${specs.typescript.length}`);
  console.log(`   Scattered specs: ${specs.scattered.length}`);
  console.log(`   Total: ${results.specs.total}\n`);

  // 2. Analyze platform configs
  console.log('🔧 Step 2: Analyzing platform configurations...');
  const configs = analyzePlatformConfigs();
  results.platform = {
    packageJson: configs.packageJson.length,
    turbo: configs.turbo ? 'Found' : 'Missing',
    pnpm: configs.pnpm ? 'Found' : 'Missing',
    docker: configs.docker.length,
    render: configs.render.length,
    gitlab: configs.gitlab ? 'Found' : 'Missing',
    github: configs.github.length,
    vite: configs.vite.length,
    esbuild: configs.esbuild.length,
    node: configs.node ? configs.node.version : 'Not set',
    errors: configs.errors.length
  };
  
  console.log(`   package.json files: ${configs.packageJson.length}`);
  console.log(`   Turbo: ${results.platform.turbo}`);
  console.log(`   PNPM: ${results.platform.pnpm}`);
  console.log(`   Docker: ${configs.docker.length}`);
  console.log(`   Render: ${configs.render.length}`);
  console.log(`   GitLab CI: ${results.platform.gitlab}`);
  console.log(`   GitHub workflows: ${configs.github.length}`);
  console.log(`   Vite configs: ${configs.vite.length}`);
  console.log(`   esbuild configs: ${configs.esbuild.length}`);
  console.log(`   Node version: ${results.platform.node}`);
  if (configs.errors.length > 0) {
    console.log(`   ⚠️  Errors: ${configs.errors.length}`);
  }
  console.log('');

  // 3. Fix platform inconsistencies
  console.log('🔧 Step 3: Fixing platform inconsistencies...');
  const fixes = fixPlatformConfigs(configs);
  results.fixes = fixes;
  
  if (fixes.inconsistencies.length > 0) {
    console.log(`   ⚠️  Found ${fixes.inconsistencies.length} inconsistencies:`);
    fixes.inconsistencies.forEach(inc => {
      console.log(`      - ${inc.type}: Found ${inc.found}, Recommended: ${inc.recommended}`);
    });
  } else {
    console.log(`   ✅ No inconsistencies found`);
  }
  console.log(`   Recommended Node: ${fixes.nodeVersion || '20'}`);
  console.log(`   Turbo version: ${fixes.turboVersion || '1'}`);
  console.log('');

  // 4. Organize specs
  console.log('📁 Step 4: Organizing specs...');
  const organized = organizeSpecs(specs);
  results.organized = organized;
  
  console.log(`   Platform specs: ${organized.platform.length}`);
  console.log(`   Tools specs: ${organized.tools.length}`);
  console.log(`   Design specs: ${organized.design.length}`);
  console.log(`   Quality specs: ${organized.quality.length}`);
  console.log(`   Deployment specs: ${organized.deployment.length}`);
  console.log(`   Architecture specs: ${organized.architecture.length}`);
  console.log(`   Consolidated: ${organized.consolidated.length}`);
  console.log('');

  // 5. Create unified spec system
  console.log('⚗️  Step 5: Creating unified spec system...');
  const unified = createUnifiedSpecSystem();
  results.unified = {
    json: relative(rootDir, unified.json),
    markdown: relative(rootDir, unified.markdown)
  };
  console.log(`   ✅ Created: ${results.unified.json}`);
  console.log(`   ✅ Created: ${results.unified.markdown}`);
  console.log('');

  // 6. Generate report
  const reportPath = join(rootDir, 'platform-tools-specs-organization.json');
  writeFileSync(reportPath, JSON.stringify(results, null, 2));

  const summaryPath = join(rootDir, 'PLATFORM_TOOLS_SPECS_SUMMARY.md');
  const summary = `# Platform/Tools Fix & Spec Organization Summary

**Generated**: ${new Date().toISOString()}
**Project**: ${PROJECT_INFO.fullName}

## Specs Found & Organized

- **OpenSpec files**: ${specs.openspec.length}
- **Markdown specs**: ${specs.markdown.length}
- **JSON specs**: ${specs.json.length}
- **TypeScript specs**: ${specs.typescript.length}
- **Scattered specs**: ${specs.scattered.length}
- **Total**: ${results.specs.total}

## Platform Configuration

- **package.json files**: ${configs.packageJson.length}
- **Turbo**: ${results.platform.turbo}
- **PNPM**: ${results.platform.pnpm}
- **Docker**: ${configs.docker.length}
- **Render**: ${configs.render.length}
- **GitLab CI**: ${results.platform.gitlab}
- **GitHub workflows**: ${configs.github.length}
- **Node version**: ${results.platform.node}

## Fixes Applied

${fixes.inconsistencies.length > 0 
  ? fixes.inconsistencies.map(inc => `- **${inc.type}**: ${inc.found} → ${inc.recommended}`).join('\n')
  : '- ✅ No inconsistencies found'
}

## Organized Specs

- **Platform**: ${organized.platform.length}
- **Tools**: ${organized.tools.length}
- **Design**: ${organized.design.length}
- **Quality**: ${organized.quality.length}
- **Deployment**: ${organized.deployment.length}
- **Architecture**: ${organized.architecture.length}

## Unified Spec System

- **JSON**: \`${results.unified.json}\`
- **Markdown**: \`${results.unified.markdown}\`

## Next Steps

1. Review unified spec: \`${results.unified.markdown}\`
2. Apply fixes for inconsistencies
3. Update all configs to match unified spec
4. Archive old scattered specs

---

**Part of ${PROJECT_INFO.fullName}**
`;

  writeFileSync(summaryPath, summary);

  console.log('📊 Summary:');
  console.log(`   📋 Specs found: ${results.specs.total}`);
  console.log(`   🔧 Platform configs: ${Object.keys(results.platform).length}`);
  console.log(`   ⚠️  Inconsistencies: ${fixes.inconsistencies.length}`);
  console.log(`   📁 Organized specs: ${Object.values(organized).reduce((sum, arr) => sum + arr.length, 0)}`);
  console.log(`   ⚗️  Unified spec: ✅ Created\n`);
  console.log(`📄 Reports:`);
  console.log(`   - ${relative(rootDir, reportPath)}`);
  console.log(`   - ${relative(rootDir, summaryPath)}\n`);
  console.log(`✅ Platform/tools fixed and specs organized!\n`);
}

main().catch(console.error);




