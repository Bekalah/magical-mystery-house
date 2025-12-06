#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Comprehensive Directory Audit and Fix Script
 * Audits all directories, labels them, fixes issues, and merges data for GitLab transfer
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const DIRECTORY_MAP = {
  active: {},
  duplicate: {},
  backup: {},
  archive: {}
};

function auditDirectory(dirPath, label) {
  const fullPath = path.join(rootDir, dirPath);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const stats = fs.statSync(fullPath);
  const items = fs.readdirSync(fullPath);
  
  return {
    path: dirPath,
    label: label,
    type: stats.isDirectory() ? 'directory' : 'file',
    size: stats.size,
    items: items.length,
    modified: stats.mtime.toISOString()
  };
}

function findDuplicates() {
  const duplicates = [];
  
  // Check for duplicate package structures
  const rootPackages = path.join(rootDir, 'packages');
  const cathedralPackages = path.join(rootDir, 'cathedral-master', 'packages');
  
  if (fs.existsSync(rootPackages) && fs.existsSync(cathedralPackages)) {
    duplicates.push({
      primary: 'packages',
      duplicate: 'cathedral-master/packages',
      type: 'package-directory'
    });
  }
  
  return duplicates;
}

async function main() {
  console.log('🔍 Starting Comprehensive Directory Audit...\n');
  
  // Audit root directories
  const rootDirs = [
    { path: 'packages', label: 'PRIMARY PACKAGES - Main monorepo packages' },
    { path: 'apps', label: 'APPLICATIONS - Application implementations' },
    { path: 'tools', label: 'TOOLS - Development and automation tools' },
    { path: 'scripts', label: 'SCRIPTS - Build and automation scripts' },
    { path: 'docs', label: 'DOCUMENTATION - Project documentation' },
    { path: 'openspec', label: 'OPEN SPECS - Open specifications' },
    { path: 'data', label: 'DATA - Data files and resources' },
    { path: 'types', label: 'TYPES - TypeScript type definitions' },
    { path: 'ci', label: 'CI/CD - Continuous integration configs' },
    { path: 'cathedral-master', label: 'DUPLICATE STRUCTURE - Old/duplicate structure (1.1GB)' },
    { path: '.safe-merge-backup', label: 'BACKUP - Safe merge backup (35MB)' },
    { path: '.archive', label: 'ARCHIVE - Archived files' },
    { path: '.backups', label: 'BACKUPS - Backup files' },
    { path: '.cleanup-backup', label: 'CLEANUP BACKUP - Cleanup backups' },
    { path: '.consolidation-backups', label: 'CONSOLIDATION BACKUPS - Consolidation backups' },
    { path: '.real-duplicate-backups', label: 'DUPLICATE BACKUPS - Duplicate backups' },
    { path: '.remote-repos', label: 'REMOTE REPOS - Remote repository clones' }
  ];
  
  for (const dir of rootDirs) {
    const audit = auditDirectory(dir.path, dir.label);
    if (audit) {
      if (dir.path.startsWith('.')) {
        DIRECTORY_MAP.backup[dir.path] = audit;
      } else if (dir.path === 'cathedral-master') {
        DIRECTORY_MAP.duplicate[dir.path] = audit;
      } else {
        DIRECTORY_MAP.active[dir.path] = audit;
      }
    }
  }
  
  // Find duplicates
  const duplicates = findDuplicates();
  
  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    active: DIRECTORY_MAP.active,
    duplicate: DIRECTORY_MAP.duplicate,
    backup: DIRECTORY_MAP.backup,
    duplicates: duplicates,
    recommendations: []
  };
  
  // Recommendations
  if (duplicates.length > 0) {
    report.recommendations.push({
      action: 'merge',
      target: 'cathedral-master',
      reason: 'Duplicate package structure found. Merge unique data, then archive.'
    });
  }
  
  if (DIRECTORY_MAP.backup['.safe-merge-backup']) {
    report.recommendations.push({
      action: 'verify',
      target: '.safe-merge-backup',
      reason: 'Backup directory exists. Verify not needed, then archive.'
    });
  }
  
  // Save report
  const reportPath = path.join(rootDir, 'DIRECTORY_AUDIT_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  
  console.log('✅ Directory audit complete!');
  console.log(`   Active directories: ${Object.keys(DIRECTORY_MAP.active).length}`);
  console.log(`   Duplicate directories: ${Object.keys(DIRECTORY_MAP.duplicate).length}`);
  console.log(`   Backup directories: ${Object.keys(DIRECTORY_MAP.backup).length}`);
  console.log(`   Report saved: ${reportPath}`);
  
  return report;
}

main().catch(console.error);

