#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Consolidate Split Directories
 * Ensures all references point to root directories, not duplicates
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SPLIT_DIRS = ['cathedral-master', '.safe-merge-backup'];

function checkConfigFiles() {
  console.log('🔍 Checking configuration files...\n');
  
  const configs = [
    'pnpm-workspace.yaml',
    'turbo.json',
    'package.json'
  ];
  
  let issues = [];
  
  for (const config of configs) {
    const configPath = path.join(rootDir, config);
    if (fs.existsSync(configPath)) {
      const content = fs.readFileSync(configPath, 'utf-8');
      
      for (const splitDir of SPLIT_DIRS) {
        if (content.includes(splitDir)) {
          issues.push({
            file: config,
            issue: `References ${splitDir}`,
            fix: `Remove reference to ${splitDir}`
          });
        }
      }
    }
  }
  
  if (issues.length > 0) {
    console.log('⚠️  Found issues:\n');
    issues.forEach(i => {
      console.log(`   ${i.file}: ${i.issue}`);
      console.log(`   Fix: ${i.fix}\n`);
    });
  } else {
    console.log('✅ No references to split directories in config files\n');
  }
  
  return issues;
}

function verifyGitignore() {
  console.log('🔍 Verifying .gitignore...\n');
  
  const gitignorePath = path.join(rootDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log('❌ .gitignore not found\n');
    return false;
  }
  
  const content = fs.readFileSync(gitignorePath, 'utf-8');
  let allExcluded = true;
  
  for (const splitDir of SPLIT_DIRS) {
    if (content.includes(splitDir)) {
      console.log(`   ✅ ${splitDir} excluded`);
    } else {
      console.log(`   ⚠️  ${splitDir} NOT excluded`);
      allExcluded = false;
    }
  }
  
  console.log('');
  return allExcluded;
}

async function main() {
  console.log('🔧 Consolidating Split Directories...\n');
  console.log('=' .repeat(60) + '\n');
  
  // Check config files
  const issues = checkConfigFiles();
  
  // Verify .gitignore
  const gitignoreOk = verifyGitignore();
  
  console.log('=' .repeat(60) + '\n');
  
  if (issues.length === 0 && gitignoreOk) {
    console.log('✅ All split directories properly excluded\n');
    console.log('💡 Split directories are excluded via .gitignore');
    console.log('   They will not be included in GitLab transfer.\n');
    console.log('📋 Summary:');
    console.log('   - Root directories are the source of truth');
    console.log('   - Split directories are excluded from GitLab');
    console.log('   - All references point to root structure\n');
  } else {
    console.log('⚠️  Some issues found - review above\n');
  }
}

main().catch(console.error);

