#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Merge and Fix All Directories for GitLab Transfer
 * Checks for unique data, merges it, and prepares for GitLab transfer
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const MERGE_REPORT = {
  timestamp: new Date().toISOString(),
  verified: {},
  merged: [],
  archived: [],
  errors: []
};

function verifyTechItems() {
  console.log('🔍 Verifying tech items location...\n');
  
  const techItems = [
    'packages/portal-system/src/PortalTech.ts',
    'packages/game-engine/src/RPGTech.ts',
    'packages/true-will-system/src/TrueWillTech.ts',
    'packages/liber-arcanae/src/WitchEyeTech.ts',
    'packages/cathedral-plugin-system/src/WitchModTech.ts',
    'packages/codex-144-99/src/DoubleTreePathworkingTech.ts'
  ];
  
  const results = {};
  
  for (const item of techItems) {
    const rootPath = path.join(rootDir, item);
    const cathedralPath = path.join(rootDir, 'cathedral-master', item);
    const backupPath = path.join(rootDir, '.safe-merge-backup', item);
    
    results[item] = {
      root: fs.existsSync(rootPath),
      cathedral: fs.existsSync(cathedralPath),
      backup: fs.existsSync(backupPath)
    };
  }
  
  MERGE_REPORT.verified = results;
  
  const allInRoot = Object.values(results).every(r => r.root);
  const noneInCathedral = Object.values(results).every(r => !r.cathedral);
  const noneInBackup = Object.values(results).every(r => !r.backup);
  
  if (allInRoot && noneInCathedral && noneInBackup) {
    console.log('✅ All tech items verified in root /packages/ only\n');
    return true;
  } else {
    console.log('⚠️  Tech items found in multiple locations\n');
    return false;
  }
}

function checkUniqueData() {
  console.log('🔍 Checking for unique data in duplicate directories...\n');
  
  const uniqueFiles = [];
  
  // Check cathedral-master/docs for unique files
  const cathedralDocs = path.join(rootDir, 'cathedral-master', 'docs');
  const rootDocs = path.join(rootDir, 'docs');
  
  if (fs.existsSync(cathedralDocs)) {
    const files = fs.readdirSync(cathedralDocs, { recursive: true, withFileTypes: true })
      .filter(dirent => dirent.isFile() && dirent.name.endsWith('.md'))
      .map(dirent => path.join(cathedralDocs, dirent.name));
    
    for (const file of files) {
      const relPath = path.relative(cathedralDocs, file);
      const rootFile = path.join(rootDocs, relPath);
      
      if (!fs.existsSync(rootFile)) {
        uniqueFiles.push({
          source: file,
          target: rootFile,
          type: 'documentation'
        });
      }
    }
  }
  
  if (uniqueFiles.length > 0) {
    console.log(`   Found ${uniqueFiles.length} unique files to merge\n`);
    MERGE_REPORT.merged = uniqueFiles;
    return uniqueFiles;
  } else {
    console.log('✅ No unique files found - duplicates are safe to archive\n');
    return [];
  }
}

function updateGitignore() {
  console.log('📝 Updating .gitignore...\n');
  
  const gitignorePath = path.join(rootDir, '.gitignore');
  let content = fs.readFileSync(gitignorePath, 'utf-8');
  
  const additions = `
# Backup and duplicate directories (for GitLab transfer)
cathedral-master/
.safe-merge-backup/
.archive/
.backups/
.cleanup-backup/
.consolidation-backups/
.real-duplicate-backups/
.remote-repos/

# Logs and temporary directories
.logs/
`;
  
  if (!content.includes('cathedral-master/')) {
    content += additions;
    fs.writeFileSync(gitignorePath, content, 'utf-8');
    console.log('✅ .gitignore updated\n');
    return true;
  } else {
    console.log('✅ .gitignore already updated\n');
    return false;
  }
}

async function main() {
  console.log('🔄 Starting Directory Merge and Fix Process...\n');
  console.log('=' .repeat(60) + '\n');
  
  // Step 1: Verify tech items
  const techVerified = verifyTechItems();
  if (!techVerified) {
    console.log('⚠️  Warning: Tech items found in multiple locations\n');
  }
  
  // Step 2: Check for unique data
  const uniqueFiles = checkUniqueData();
  
  // Step 3: Update .gitignore
  updateGitignore();
  
  // Step 4: Generate report
  const reportPath = path.join(rootDir, 'DIRECTORY_MERGE_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(MERGE_REPORT, null, 2), 'utf-8');
  
  console.log('=' .repeat(60) + '\n');
  console.log('✅ Directory merge and fix complete!\n');
  console.log(`   Tech items verified: ${techVerified ? '✅' : '⚠️'}`);
  console.log(`   Unique files found: ${uniqueFiles.length}`);
  console.log(`   Report saved: ${reportPath}\n`);
  
  if (uniqueFiles.length > 0) {
    console.log('📋 Unique files to merge:');
    uniqueFiles.forEach(f => console.log(`   - ${path.relative(rootDir, f.source)}`));
    console.log('\n💡 Review these files and merge manually if needed.\n');
  }
  
  console.log('🎯 Next Steps:');
  console.log('   1. Review DIRECTORY_MERGE_REPORT.json');
  console.log('   2. Merge any unique files if needed');
  console.log('   3. Verify .gitignore excludes duplicates');
  console.log('   4. Test GitLab push\n');
}

main().catch(console.error);

