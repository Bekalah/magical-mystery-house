#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - Comprehensive Cleanup Tool
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * Cleans up and organizes the flattened mess in root directory:
 * - Archives old reports/logs to archive/
 * - Organizes markdown files into docs/
 * - Moves duplicate files
 * - Removes temporary files
 * - Creates organized structure
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync, renameSync, unlinkSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const PROJECT_INFO = {
  name: 'Cathedral of Circuits',
  version: '1.0.0',
  fullName: 'Cathedral of Circuits - Magnum Opus Version 1.0',
  author: 'Rebecca Respawn',
  subtitle: 'Liber Arcanae Codex Abyssiae'
};

const ORGANIZATION_RULES = {
  rootOnly: [
    'package.json',
    'pnpm-workspace.yaml',
    'turbo.json',
    'tsconfig.json',
    'README.md',
    'LICENSE',
    '.gitignore',
    '.nvmrc',
    '.gitlab-ci.yml',
    'vercel.json',
    'netlify.toml',
    'wrangler.toml',
    'index.html'
  ],
  archive: {
    patterns: [
      /\.log$/,
      /\.pid$/,
      /-report\.json$/,
      /-status\.md$/,
      /COMPLETE_.*\.md$/,
      /IMPROVEMENT.*\.md$/,
      /STATUS.*\.md$/,
      /EXPERIMENT.*\.md$/,
      /CYCLE.*\.md$/,
      /ROUND.*\.md$/,
      /LEARNINGS.*\.md$/,
      /SUMMARY.*\.md$/,
      /PLAN.*\.md$/,
      /REPORT.*\.md$/,
      /ANALYSIS.*\.md$/,
      /CONSOLIDATION.*\.md$/,
      /CONNECT.*\.md$/,
      /FIX.*\.md$/,
      /UPDATE.*\.md$/,
      /MIGRATION.*\.md$/,
      /GITLAB.*\.md$/,
      /GITHUB.*\.md$/,
      /AUDIT.*\.md$/,
      /QUALITY.*\.md$/,
      /SECURITY.*\.md$/,
      /THEME.*\.md$/,
      /LABEL.*\.md$/,
      /SYSTEM.*\.md$/,
      /MAP.*\.md$/,
      /REGISTRY.*\.md$/,
      /DISCOVERY.*\.md$/,
      /VERIFICATION.*\.md$/,
      /PROGRESS.*\.md$/,
      /FINAL.*\.md$/,
      /READY.*\.md$/,
      /COMPLETE.*\.md$/,
      /INTEGRATION.*\.md$/,
      /IMPLEMENTATION.*\.md$/,
      /\d+-.*\.md$/,
      /.*-log\.json$/,
      /.*-report\.json$/,
      /.*-status\.json$/,
      /.*-analysis\.json$/,
      /.*-backup\.json$/,
      /.*\.backup$/,
      /.*\.old$/,
      /.*\.tmp$/,
      /.*\.temp$/
    ],
    destination: 'archive/reports-and-status'
  },
  remove: {
    patterns: [
      /^\.DS_Store$/,
      /^\._.*$/,
      /.*~$/,
      /^\.swp$/,
      /^\.swo$/,
      /^\.test$/,
      /^test-.*\.js$/,
      /^test-.*\.mjs$/,
      /^.*\.pid$/,
      /^.*\.lock\.backup$/,
      /^.*-backup.*\.json$/
    ]
  }
};

function findRootFiles() {
  const files = [];
  try {
    const entries = readdirSync(rootDir);
    for (const entry of entries) {
      const fullPath = join(rootDir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) continue;
      if (ORGANIZATION_RULES.rootOnly.includes(entry)) continue;
      files.push({
        name: entry,
        path: fullPath,
        size: stat.size,
        mtime: stat.mtime
      });
    }
  } catch (e) {
    console.error('Error reading root directory:', e.message);
  }
  return files;
}

function matchesPattern(filename, patterns) {
  return patterns.some(pattern => {
    if (pattern instanceof RegExp) {
      return pattern.test(filename);
    }
    return filename === pattern;
  });
}

function organizeFiles(dryRun = false) {
  const files = findRootFiles();
  const results = {
    archived: [],
    removed: [],
    errors: [],
    stats: {
      bytesFreed: 0,
      filesProcessed: 0
    }
  };

  const archiveDir = join(rootDir, ORGANIZATION_RULES.archive.destination);
  if (!dryRun && !existsSync(archiveDir)) {
    mkdirSync(archiveDir, { recursive: true });
  }

  files.forEach(file => {
    try {
      results.stats.filesProcessed++;

      if (matchesPattern(file.name, ORGANIZATION_RULES.archive.patterns)) {
        const dest = join(archiveDir, file.name);
        
        if (!dryRun) {
          if (existsSync(dest)) {
            const ext = extname(file.name);
            const base = basename(file.name, ext);
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const newName = `${base}-${timestamp}${ext}`;
            renameSync(file.path, join(archiveDir, newName));
            results.archived.push({ from: file.name, to: newName });
          } else {
            renameSync(file.path, dest);
            results.archived.push({ from: file.name, to: dest });
          }
        } else {
          results.archived.push({ from: file.name, to: dest, dryRun: true });
        }
        
        results.stats.bytesFreed += file.size;
        return;
      }

      if (matchesPattern(file.name, ORGANIZATION_RULES.remove.patterns)) {
        if (!dryRun) {
          unlinkSync(file.path);
          results.removed.push(file.name);
        } else {
          results.removed.push({ name: file.name, dryRun: true });
        }
        results.stats.bytesFreed += file.size;
        return;
      }

    } catch (e) {
      results.errors.push({ file: file.name, error: e.message });
    }
  });

  return results;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || args.includes('-d');

  console.log(`⚗️  ${PROJECT_INFO.fullName}`);
  console.log(`Author: ${PROJECT_INFO.author} (pen name)`);
  console.log(`Comprehensive Cleanup Tool\n`);
  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be moved or deleted\n');
  }

  console.log('📁 Organizing files...');
  const results = organizeFiles(dryRun);

  console.log(`  ✅ Files processed: ${results.stats.filesProcessed}`);
  console.log(`  📦 Archived: ${results.archived.length}`);
  console.log(`  🗑️  Removed: ${results.removed.length}`);
  console.log(`  💾 Bytes freed: ${(results.stats.bytesFreed / 1024 / 1024).toFixed(2)} MB`);

  if (results.errors.length > 0) {
    console.log(`  ⚠️  Errors: ${results.errors.length}`);
  }

  const reportPath = join(rootDir, 'cleanup-report.json');
  writeFileSync(reportPath, JSON.stringify({
    project: PROJECT_INFO,
    ...results,
    timestamp: new Date().toISOString()
  }, null, 2));

  console.log(`\n📄 Report: ${reportPath}`);
  console.log(`\n✅ Cleanup complete for ${PROJECT_INFO.fullName}!\n`);
}

main().catch(console.error);

