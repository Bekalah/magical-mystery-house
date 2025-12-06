#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Fix Split Directories
 * Merges unique content from duplicate directories into root structure
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SPLIT_DIRS = [
  { duplicate: 'cathedral-master', root: '.' },
  { duplicate: '.safe-merge-backup', root: '.' }
];

const REPORT = {
  timestamp: new Date().toISOString(),
  merged: [],
  skipped: [],
  errors: []
};

function findUniqueFiles(dupDir, rootDir) {
  const unique = [];
  
  if (!fs.existsSync(dupDir)) {
    return unique;
  }
  
  function walkDir(dir, basePath) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.relative(basePath, fullPath);
      const rootPath = path.join(rootDir, relPath);
      
      if (entry.isDirectory()) {
        // Skip node_modules, .git, etc.
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
          walkDir(fullPath, basePath);
        }
      } else if (entry.isFile()) {
        // Check if file exists in root
        if (!fs.existsSync(rootPath)) {
          // Check if it's a unique file worth merging
          if (entry.name.endsWith('.md') || 
              entry.name.endsWith('.json') ||
              entry.name.endsWith('.ts') ||
              entry.name.endsWith('.js')) {
            unique.push({
              source: fullPath,
              target: rootPath,
              relative: relPath
            });
          }
        }
      }
    }
  }
  
  walkDir(dupDir, dupDir);
  return unique;
}

async function main() {
  console.log('🔧 Fixing Split Directories...\n');
  
  for (const { duplicate, root } of SPLIT_DIRS) {
    const dupPath = path.join(rootDir, duplicate);
    
    if (!fs.existsSync(dupPath)) {
      console.log(`⏭️  ${duplicate} doesn't exist, skipping\n`);
      continue;
    }
    
    console.log(`📁 Checking ${duplicate}...\n`);
    
    // Find unique files
    const uniqueFiles = findUniqueFiles(dupPath, rootDir);
    
    if (uniqueFiles.length > 0) {
      console.log(`   Found ${uniqueFiles.length} potentially unique files\n`);
      
      // Only merge documentation files to docs/archive/
      const docsToMerge = uniqueFiles.filter(f => 
        f.relative.includes('docs/') || 
        f.relative.endsWith('.md')
      );
      
      for (const file of docsToMerge.slice(0, 10)) { // Limit to 10 for safety
        const archivePath = path.join(rootDir, 'docs', 'archive', path.basename(file.source));
        const archiveDir = path.dirname(archivePath);
        
        try {
          if (!fs.existsSync(archiveDir)) {
            fs.mkdirSync(archiveDir, { recursive: true });
          }
          
          if (!fs.existsSync(archivePath)) {
            fs.copyFileSync(file.source, archivePath);
            REPORT.merged.push({
              source: file.relative,
              target: path.relative(rootDir, archivePath),
              from: duplicate
            });
            console.log(`   ✅ Merged: ${path.basename(file.source)}`);
          }
        } catch (error) {
          REPORT.errors.push({
            file: file.relative,
            error: error.message
          });
        }
      }
    } else {
      console.log(`   ✅ No unique files found\n`);
    }
  }
  
  // Save report
  const reportPath = path.join(rootDir, 'SPLIT_DIRECTORIES_FIX_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(REPORT, null, 2), 'utf-8');
  
  console.log('\n✅ Split directories fix complete!');
  console.log(`   Files merged: ${REPORT.merged.length}`);
  console.log(`   Errors: ${REPORT.errors.length}`);
  console.log(`   Report: ${reportPath}\n`);
  
  console.log('💡 Note: Duplicate directories are excluded via .gitignore');
  console.log('   They will not be included in GitLab transfer.\n');
}

main().catch(console.error);

