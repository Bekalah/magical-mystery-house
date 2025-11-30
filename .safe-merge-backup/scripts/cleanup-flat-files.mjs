#!/usr/bin/env node
/**
 * Cleanup Flat/Incorrect/Out-of-Place Files
 * 
 * Removes files that are:
 * - Flat (in wrong location, should be in proper directories)
 * - Incorrect (wrong type, corrupted, invalid)
 * - Out of place (shouldn't be in root or wrong directory)
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BACKUP_DIR = path.join(rootDir, '.cleanup-backup');
const CLEANUP_LOG = path.join(rootDir, 'cleanup-log.json');

class FileCleanup {
  constructor() {
    this.removed = [];
    this.moved = [];
    this.errors = [];
    this.stats = {
      filesRemoved: 0,
      filesMoved: 0,
      bytesFreed: 0
    };
  }

  shouldRemove(filePath, fileName) {
    const ext = path.extname(fileName).toLowerCase();
    const baseName = path.basename(fileName, ext);
    
    // Files that should NOT be in root
    const rootOnlyFiles = [
      'package.json',
      'pnpm-workspace.yaml',
      'turbo.json',
      'tsconfig.json',
      'README.md',
      '.gitignore',
      '.nvmrc',
      'LICENSE'
    ];
    
    // If it's a root-only file, keep it
    if (rootOnlyFiles.includes(fileName)) {
      return false;
    }
    
    // Remove backup/temp files
    if (fileName.endsWith('.backup') || 
        fileName.endsWith('.old') || 
        fileName.endsWith('.tmp') ||
        fileName.endsWith('.temp') ||
        fileName.endsWith('~') ||
        fileName.startsWith('.DS_Store')) {
      return true;
    }
    
    // Remove duplicate/vision backup files
    if (fileName.includes('.vision-backup') || 
        fileName.includes('.backup.') ||
        fileName.match(/\.\d+$/)) {
      return true;
    }
    
    // Remove files that should be in packages/ but are in root
    // BUT: Don't remove scripts/ or tools/ files that are meant to be in root
    if (ext === '.ts' || ext === '.js' || ext === '.mjs') {
      // Check if it's in scripts/ or tools/ - those are OK in root
      const dirName = path.dirname(filePath);
      if (dirName.includes('scripts') || dirName.includes('tools')) {
        return false; // Scripts and tools are OK
      }
      
      // Check if it's a package file that should be in packages/
      if (baseName.includes('core') || 
          baseName.includes('engine') ||
          baseName.includes('bridge') ||
          baseName.includes('connector')) {
        return true; // Should be in packages/
      }
    }
    
    // Don't remove Rust files (.rs) - they might be in root for workspace
    if (ext === '.rs') {
      return false;
    }
    
    // Don't remove Godot files
    if (ext === '.gd' || ext === '.godot') {
      return false;
    }
    
    // Remove empty or corrupted files
    try {
      const stats = fs.statSync(filePath);
      if (stats.size === 0 && ext !== '.gitkeep') {
        return true;
      }
    } catch (e) {
      return true; // Can't read = corrupted
    }
    
    return false;
  }

  shouldMove(filePath, fileName) {
    const ext = path.extname(fileName).toLowerCase();
    const dirName = path.dirname(filePath);
    
    // Don't move files that are already in proper directories
    if (dirName.includes('scripts') || dirName.includes('tools') || dirName.includes('packages')) {
      return null;
    }
    
    // TypeScript/JavaScript files in root that should be in packages/
    // BUT: Keep scripts and tools in their directories
    if ((ext === '.ts' || ext === '.js' || ext === '.mjs') && 
        !fileName.startsWith('.') &&
        fileName !== 'package.json' &&
        !fileName.includes('config') &&
        !fileName.includes('setup') &&
        !dirName.includes('scripts') &&
        !dirName.includes('tools')) {
      // Check if it looks like a package file
      if (fileName.includes('core') || 
          fileName.includes('engine') ||
          fileName.includes('bridge') ||
          fileName.includes('connector')) {
        return { target: 'packages', reason: 'Package source file in root' };
      }
    }
    
    // Don't move Rust or Godot files
    if (ext === '.rs' || ext === '.gd' || ext === '.godot') {
      return null;
    }
    
    // Config files that should be in proper locations
    if (ext === '.json' && 
        !['package.json', 'tsconfig.json', 'turbo.json', 'pnpm-workspace.yaml'].includes(fileName)) {
      // Check if it's a package config
      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (content.name && content.name.startsWith('@cathedral/')) {
          return { target: 'packages', reason: 'Package config in root' };
        }
      } catch (e) {
        // Not valid JSON, might be removable
      }
    }
    
    return null;
  }

  createBackup(filePath) {
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
    
    const fileName = path.basename(filePath);
    const backupPath = path.join(BACKUP_DIR, `${Date.now()}-${fileName}`);
    
    try {
      fs.copyFileSync(filePath, backupPath);
      return backupPath;
    } catch (e) {
      return null;
    }
  }

  cleanupDirectory(dirPath, relativePath = '') {
    if (!fs.existsSync(dirPath)) return;
    
    const entries = fs.readdirSync(dirPath);
    
    for (const entry of entries) {
      // Skip special directories
      if (entry.startsWith('.') && entry !== '.git') continue;
      if (['node_modules', 'dist', 'build', '.turbo', '.git'].includes(entry)) continue;
      
      const fullPath = path.join(dirPath, entry);
      const stat = fs.statSync(fullPath);
      const fileRelativePath = path.join(relativePath, entry);
      
      if (stat.isDirectory()) {
        // Recursively check subdirectories
        this.cleanupDirectory(fullPath, fileRelativePath);
      } else {
        // Check if file should be removed
        if (this.shouldRemove(fullPath, entry)) {
          try {
            const backupPath = this.createBackup(fullPath);
            const fileSize = stat.size;
            
            fs.unlinkSync(fullPath);
            
            this.removed.push({
              path: fileRelativePath,
              size: fileSize,
              backup: backupPath,
              reason: 'Flat/incorrect/out-of-place'
            });
            
            this.stats.filesRemoved++;
            this.stats.bytesFreed += fileSize;
          } catch (e) {
            this.errors.push({
              path: fileRelativePath,
              error: e.message
            });
          }
        } else {
          // Check if file should be moved
          const moveTarget = this.shouldMove(fullPath, entry);
          if (moveTarget && relativePath === '') { // Only move from root
            try {
              const targetDir = path.join(rootDir, moveTarget.target);
              if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
              }
              
              const targetPath = path.join(targetDir, entry);
              
              // Don't overwrite existing files
              if (!fs.existsSync(targetPath)) {
                fs.renameSync(fullPath, targetPath);
                
                this.moved.push({
                  from: fileRelativePath,
                  to: path.join(moveTarget.target, entry),
                  reason: moveTarget.reason
                });
                
                this.stats.filesMoved++;
              }
            } catch (e) {
              this.errors.push({
                path: fileRelativePath,
                error: `Move failed: ${e.message}`
              });
            }
          }
        }
      }
    }
  }

  cleanup() {
    console.log('🧹 Starting cleanup of flat/incorrect/out-of-place files...\n');
    
    // Cleanup root directory
    this.cleanupDirectory(rootDir, '');
    
    // Cleanup packages directory (remove flat files)
    const packagesDir = path.join(rootDir, 'packages');
    if (fs.existsSync(packagesDir)) {
      const packages = fs.readdirSync(packagesDir).filter(name => {
        const pkgPath = path.join(packagesDir, name);
        return fs.statSync(pkgPath).isDirectory();
      });
      
      for (const pkg of packages) {
        const pkgPath = path.join(packagesDir, pkg);
        
        // Remove files that should be in src/ but are in package root
        const entries = fs.readdirSync(pkgPath);
        for (const entry of entries) {
          if (entry === 'src' || entry === 'package.json' || entry === 'tsconfig.json' || entry === 'README.md') {
            continue;
          }
          
          const entryPath = path.join(pkgPath, entry);
          const stat = fs.statSync(entryPath);
          
          if (stat.isFile()) {
            const ext = path.extname(entry).toLowerCase();
            if (ext === '.ts' || ext === '.js' || ext === '.mjs') {
              // This should be in src/
              const srcPath = path.join(pkgPath, 'src');
              if (fs.existsSync(srcPath)) {
                try {
                  const targetPath = path.join(srcPath, entry);
                  if (!fs.existsSync(targetPath)) {
                    fs.renameSync(entryPath, targetPath);
                    this.moved.push({
                      from: `packages/${pkg}/${entry}`,
                      to: `packages/${pkg}/src/${entry}`,
                      reason: 'Source file should be in src/'
                    });
                    this.stats.filesMoved++;
                  } else {
                    // File exists in src/, remove the flat one
                    const backupPath = this.createBackup(entryPath);
                    const fileSize = stat.size;
                    fs.unlinkSync(entryPath);
                    this.removed.push({
                      path: `packages/${pkg}/${entry}`,
                      size: fileSize,
                      backup: backupPath,
                      reason: 'Duplicate - exists in src/'
                    });
                    this.stats.filesRemoved++;
                    this.stats.bytesFreed += fileSize;
                  }
                } catch (e) {
                  this.errors.push({
                    path: `packages/${pkg}/${entry}`,
                    error: e.message
                  });
                }
              }
            }
          }
        }
      }
    }
    
    // Save cleanup log
    const log = {
      timestamp: Date.now(),
      stats: this.stats,
      removed: this.removed,
      moved: this.moved,
      errors: this.errors
    };
    
    fs.writeFileSync(CLEANUP_LOG, JSON.stringify(log, null, 2));
    
    return log;
  }

  displayResults(log) {
    console.log('\n╔══════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                         🧹 CLEANUP RESULTS                                  ║');
    console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');
    
    console.log(`📊 STATISTICS:`);
    console.log(`   Files removed: ${log.stats.filesRemoved}`);
    console.log(`   Files moved: ${log.stats.filesMoved}`);
    console.log(`   Space freed: ${(log.stats.bytesFreed / 1024 / 1024).toFixed(2)} MB\n`);
    
    if (log.removed.length > 0) {
      console.log(`🗑️  REMOVED FILES (${log.removed.length}):`);
      log.removed.slice(0, 20).forEach(file => {
        console.log(`   ❌ ${file.path} (${(file.size / 1024).toFixed(2)} KB) - ${file.reason}`);
      });
      if (log.removed.length > 20) {
        console.log(`   ... and ${log.removed.length - 20} more`);
      }
      console.log('');
    }
    
    if (log.moved.length > 0) {
      console.log(`📦 MOVED FILES (${log.moved.length}):`);
      log.moved.slice(0, 20).forEach(file => {
        console.log(`   ➡️  ${file.from} → ${file.to} (${file.reason})`);
      });
      if (log.moved.length > 20) {
        console.log(`   ... and ${log.moved.length - 20} more`);
      }
      console.log('');
    }
    
    if (log.errors.length > 0) {
      console.log(`⚠️  ERRORS (${log.errors.length}):`);
      log.errors.forEach(error => {
        console.log(`   ⚠️  ${error.path}: ${error.error}`);
      });
      console.log('');
    }
    
    if (log.removed.length > 0 || log.moved.length > 0) {
      console.log(`💾 Backup saved to: ${BACKUP_DIR}\n`);
    }
  }
}

async function main() {
  const cleanup = new FileCleanup();
  const log = cleanup.cleanup();
  cleanup.displayResults(log);
  
  console.log(`📄 Cleanup log saved to: ${CLEANUP_LOG}\n`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { FileCleanup };

