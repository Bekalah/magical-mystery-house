#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - Update GitHub & Cleanup Garbage
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * Updates all GitHub repos and directories:
 * - Cleans up clearly marked garbage files
 * - Updates GitHub workflows
 * - Archives instead of deleting
 * - Provides clear reporting
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync, renameSync, unlinkSync } from 'fs';
import { join, dirname, relative, basename, extname } from 'path';
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
  author: 'Rebecca Respawn'
};

// Clearly markable garbage files
const GARBAGE_PATTERNS = {
  // System files
  system: [
    /^\.DS_Store$/,
    /^\._/,
    /^Thumbs\.db$/,
    /^desktop\.ini$/,
    /^\.Spotlight-V100$/,
    /^\.Trashes$/
  ],
  
  // Build artifacts
  build: [
    /^dist$/,
    /^build$/,
    /^\.next$/,
    /^\.turbo$/,
    /^\.cache$/,
    /^\.parcel-cache$/,
    /^out$/,
    /^\.output$/
  ],
  
  // Dependencies
  dependencies: [
    /^node_modules$/,
    /^\.pnpm-store$/,
    /^\.yarn$/,
    /^\.pnp\./,
    /^vendor\/bundle$/
  ],
  
  // Logs and temp files
  logs: [
    /\.log$/,
    /\.pid$/,
    /\.lock$/,
    /^\.swp$/,
    /^\.swo$/,
    /^\.tmp$/,
    /^\.temp$/,
    /~$/
  ],
  
  // IDE files
  ide: [
    /^\.idea$/,
    /^\.vscode$/,
    /^\.settings$/,
    /^\.classpath$/,
    /^\.project$/
  ],
  
  // Coverage and test artifacts
  coverage: [
    /^coverage$/,
    /^\.nyc_output$/,
    /^\.coverage$/
  ]
};

const GARBAGE_FILE_EXTENSIONS = [
  '.log',
  '.pid',
  '.swp',
  '.swo',
  '.tmp',
  '.temp',
  '.bak',
  '.backup',
  '.old'
];

function findGarbageFiles(dir = rootDir) {
  const garbage = {
    system: [],
    build: [],
    dependencies: [],
    logs: [],
    ide: [],
    coverage: [],
    extensions: []
  };
  
  function scanDirectory(currentDir, depth = 0) {
    if (depth > 10) return; // Prevent infinite recursion
    
    try {
      const entries = readdirSync(currentDir);
      
      for (const entry of entries) {
        // Skip .git directories
        if (entry === '.git') continue;
        
        const fullPath = join(currentDir, entry);
        const relPath = relative(rootDir, fullPath);
        
        try {
          const stat = statSync(fullPath);
          
          // Check system files
          for (const pattern of GARBAGE_PATTERNS.system) {
            if (pattern.test(entry)) {
              garbage.system.push({ path: relPath, fullPath, type: 'system', name: entry });
              continue;
            }
          }
          
          // Check build artifacts (directories)
          if (stat.isDirectory()) {
            for (const pattern of GARBAGE_PATTERNS.build) {
              if (pattern.test(entry)) {
                garbage.build.push({ path: relPath, fullPath, type: 'build', name: entry });
                continue;
              }
            }
            
            for (const pattern of GARBAGE_PATTERNS.dependencies) {
              if (pattern.test(entry)) {
                garbage.dependencies.push({ path: relPath, fullPath, type: 'dependencies', name: entry });
                continue;
              }
            }
            
            for (const pattern of GARBAGE_PATTERNS.ide) {
              if (pattern.test(entry)) {
                garbage.ide.push({ path: relPath, fullPath, type: 'ide', name: entry });
                continue;
              }
            }
            
            for (const pattern of GARBAGE_PATTERNS.coverage) {
              if (pattern.test(entry)) {
                garbage.coverage.push({ path: relPath, fullPath, type: 'coverage', name: entry });
                continue;
              }
            }
            
            // Recursive scan
            scanDirectory(fullPath, depth + 1);
          } else {
            // Check file extensions
            const ext = extname(entry).toLowerCase();
            if (GARBAGE_FILE_EXTENSIONS.includes(ext)) {
              garbage.extensions.push({ path: relPath, fullPath, type: 'extension', name: entry, ext });
              continue;
            }
            
            // Check log files
            for (const pattern of GARBAGE_PATTERNS.logs) {
              if (pattern.test(entry)) {
                garbage.logs.push({ path: relPath, fullPath, type: 'log', name: entry });
                continue;
              }
            }
          }
        } catch (e) {
          // Skip files we can't access
          continue;
        }
      }
    } catch (e) {
      // Skip directories we can't access
    }
  }
  
  scanDirectory(dir);
  return garbage;
}

function archiveGarbage(garbage, dryRun = false) {
  const archiveDir = join(rootDir, 'archive', 'garbage-cleaned');
  if (!existsSync(archiveDir)) {
    mkdirSync(archiveDir, { recursive: true });
  }
  
  const archived = [];
  const errors = [];
  
  // Archive by type
  Object.keys(garbage).forEach(type => {
    garbage[type].forEach(item => {
      if (dryRun) {
        archived.push({ ...item, action: 'would_archive' });
        return;
      }
      
      try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = item.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const archivePath = join(archiveDir, type, `${timestamp}_${fileName}`);
        
        // Create type directory
        const typeDir = dirname(archivePath);
        if (!existsSync(typeDir)) {
          mkdirSync(typeDir, { recursive: true });
        }
        
        // For directories, we'll create a marker file
        // For files, move them
        if (statSync(item.fullPath).isDirectory()) {
          // Create marker file
          writeFileSync(
            join(archivePath + '.marker'),
            JSON.stringify({
              originalPath: item.path,
              archivedAt: new Date().toISOString(),
              type: item.type
            }, null, 2)
          );
          // Note: We're not deleting directories, just marking them
          archived.push({ ...item, action: 'marked', archivePath });
        } else {
          renameSync(item.fullPath, archivePath);
          archived.push({ ...item, action: 'archived', archivePath });
        }
      } catch (e) {
        errors.push({ ...item, error: e.message });
      }
    });
  });
  
  return { archived, errors };
}

function updateGitHubWorkflows() {
  const workflowsDir = join(rootDir, '.github', 'workflows');
  if (!existsSync(workflowsDir)) return { updated: [], errors: [] };
  
  const workflows = readdirSync(workflowsDir)
    .filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
  
  const updated = [];
  const errors = [];
  
  workflows.forEach(workflow => {
    const workflowPath = join(workflowsDir, workflow);
    try {
      let content = readFileSync(workflowPath, 'utf-8');
      let changed = false;
      
      // Update Node version to 20
      if (content.includes('node-version')) {
        const newContent = content.replace(/node-version:\s*['"]?[\d.]+['"]?/g, "node-version: '20'");
        if (newContent !== content) {
          content = newContent;
          changed = true;
        }
      }
      
      // Update PNPM version
      if (content.includes('pnpm')) {
        const newContent = content.replace(/pnpm@[\d.]+/g, 'pnpm@10.23.0');
        if (newContent !== content) {
          content = newContent;
          changed = true;
        }
      }
      
      // Add Cathedral branding if missing
      if (!content.includes('Cathedral of Circuits')) {
        content = `# ⚗️ Cathedral of Circuits - Magnum Opus Version 1.0
# Author: Rebecca Respawn (pen name)
# ${new Date().toISOString()}

${content}`;
        changed = true;
      }
      
      if (changed) {
        writeFileSync(workflowPath, content);
        updated.push(workflow);
      }
    } catch (e) {
      errors.push({ workflow, error: e.message });
    }
  });
  
  return { updated, errors };
}

function checkGitStatus() {
  try {
    const status = execSync('git status --porcelain', {
      cwd: rootDir,
      encoding: 'utf-8'
    }).trim();
    
    return {
      hasChanges: status.length > 0,
      files: status.split('\n').filter(Boolean)
    };
  } catch (e) {
    return { hasChanges: false, error: e.message };
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || args.includes('-d');
  
  console.log(`⚗️  ${PROJECT_INFO.fullName}`);
  console.log(`Author: ${PROJECT_INFO.author} (pen name)`);
  console.log(`Update GitHub & Cleanup Garbage Tool\n`);
  
  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be archived\n');
  }

  const results = {
    project: PROJECT_INFO,
    garbage: { found: {}, cleaned: {} },
    github: { workflows: {} },
    git: {},
    timestamp: new Date().toISOString()
  };

  // 1. Find garbage files
  console.log('🗑️  Step 1: Finding garbage files...');
  const garbage = findGarbageFiles();
  
  results.garbage.found = {
    system: garbage.system.length,
    build: garbage.build.length,
    dependencies: garbage.dependencies.length,
    logs: garbage.logs.length,
    ide: garbage.ide.length,
    coverage: garbage.coverage.length,
    extensions: garbage.extensions.length,
    total: Object.values(garbage).reduce((sum, arr) => sum + arr.length, 0)
  };
  
  console.log(`   System files: ${garbage.system.length}`);
  console.log(`   Build artifacts: ${garbage.build.length}`);
  console.log(`   Dependencies: ${garbage.dependencies.length}`);
  console.log(`   Log files: ${garbage.logs.length}`);
  console.log(`   IDE files: ${garbage.ide.length}`);
  console.log(`   Coverage: ${garbage.coverage.length}`);
  console.log(`   Temp files: ${garbage.extensions.length}`);
  console.log(`   Total: ${results.garbage.found.total}\n`);

  // 2. Clean up garbage
  if (results.garbage.found.total > 0) {
    console.log('🧹 Step 2: Cleaning up garbage...');
    const cleanup = archiveGarbage(garbage, dryRun);
    
    results.garbage.cleaned = {
      archived: cleanup.archived.length,
      errors: cleanup.errors.length
    };
    
    if (!dryRun) {
      console.log(`   ✅ Archived: ${cleanup.archived.length} items`);
      if (cleanup.errors.length > 0) {
        console.log(`   ⚠️  Errors: ${cleanup.errors.length}`);
      }
    } else {
      console.log(`   📋 Would archive: ${cleanup.archived.length} items`);
    }
    console.log('');
  }

  // 3. Update GitHub workflows
  console.log('🔧 Step 3: Updating GitHub workflows...');
  const workflows = updateGitHubWorkflows();
  results.github.workflows = workflows;
  console.log(`   ✅ Updated: ${workflows.updated.length} workflows`);
  if (workflows.errors.length > 0) {
    console.log(`   ⚠️  Errors: ${workflows.errors.length}`);
  }
  workflows.updated.forEach(w => {
    console.log(`      - ${w}`);
  });
  console.log('');

  // 4. Check git status
  console.log('📊 Step 4: Checking git status...');
  const gitStatus = checkGitStatus();
  results.git = gitStatus;
  if (gitStatus.hasChanges) {
    console.log(`   ⚠️  Uncommitted changes: ${gitStatus.files.length} files`);
    console.log(`   💡 Run 'git status' to review changes`);
  } else {
    console.log(`   ✅ Working directory clean`);
  }
  console.log('');

  // 5. Generate report
  const reportPath = join(rootDir, 'github-cleanup-report.json');
  writeFileSync(reportPath, JSON.stringify(results, null, 2));

  const summaryPath = join(rootDir, 'GITHUB_CLEANUP_SUMMARY.md');
  const summary = `# GitHub Update & Garbage Cleanup Summary

**Generated**: ${new Date().toISOString()}
**Project**: ${PROJECT_INFO.fullName}
**Mode**: ${dryRun ? 'DRY RUN' : 'LIVE'}

## Garbage Found

- **System files**: ${results.garbage.found.system}
- **Build artifacts**: ${results.garbage.found.build}
- **Dependencies**: ${results.garbage.found.dependencies}
- **Log files**: ${results.garbage.found.logs}
- **IDE files**: ${results.garbage.found.ide}
- **Coverage**: ${results.garbage.found.coverage}
- **Temp files**: ${results.garbage.found.extensions}
- **Total**: ${results.garbage.found.total}

## Cleanup Actions

${dryRun ? '**DRY RUN** - No files were actually archived' : ''}

- **Items archived**: ${results.garbage.cleaned.archived}
- **Errors**: ${results.garbage.cleaned.errors}
- **Archive location**: \`archive/garbage-cleaned/\`

## GitHub Workflows Updated

- **Updated**: ${workflows.updated.length}
- **Errors**: ${workflows.errors.length}

${workflows.updated.length > 0 ? '**Workflows updated:**\n' + workflows.updated.map(w => `- ${w}`).join('\n') : ''}

## Git Status

- **Has changes**: ${gitStatus.hasChanges ? 'Yes' : 'No'}
${gitStatus.hasChanges ? `- **Files**: ${gitStatus.files.length}` : ''}

## Next Steps

1. Review the cleanup report: \`github-cleanup-report.json\`
2. Commit changes: \`git add -A && git commit -m "Cleanup garbage files"\`
3. Push to GitHub: \`git push\`

---

**Part of ${PROJECT_INFO.fullName}**
`;

  writeFileSync(summaryPath, summary);

  console.log('📊 Summary:');
  console.log(`   🗑️  Garbage found: ${results.garbage.found.total}`);
  console.log(`   🧹 ${dryRun ? 'Would archive' : 'Archived'}: ${results.garbage.cleaned.archived}`);
  console.log(`   🔧 Workflows updated: ${workflows.updated.length}`);
  console.log(`   📊 Git status: ${gitStatus.hasChanges ? 'Has changes' : 'Clean'}\n`);
  console.log(`📄 Reports:`);
  console.log(`   - ${relative(rootDir, reportPath)}`);
  console.log(`   - ${relative(rootDir, summaryPath)}\n`);
  
  if (dryRun) {
    console.log(`💡 Run without --dry-run to actually clean up files\n`);
  } else {
    console.log(`✅ Complete! Review reports before committing.\n`);
  }
}

main().catch(console.error);






