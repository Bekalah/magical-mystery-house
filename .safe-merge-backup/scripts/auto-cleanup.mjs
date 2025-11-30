#!/usr/bin/env node
/**
 * Automatic Project Cleanup Script
 * 
 * Automatically cleans up:
 * - Log files (with retention policy)
 * - Temporary files
 * - Build artifacts (optional)
 * - Cache files
 * - Security audit
 * 
 * Runs automatically as part of improvement experiment
 * 
 * @license CC0-1.0 - Public Domain
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Log retention: Keep last 7 days
const LOG_RETENTION_DAYS = 7;
const MAX_LOG_SIZE_MB = 100; // 100MB max per log file

const logFiles = [
  'experiment-all-day.log',
  'build-output.log',
  'experiment-run.log',
  'experiment-night.log',
  'experiment-output.log',
  '.experiment.log',
  'experiment.log',
  '.continuous-improvement.log'
];

const tempPatterns = [
  '**/*.tmp',
  '**/*.temp',
  '**/.DS_Store',
  '**/Thumbs.db'
];

const cacheDirs = [
  'node_modules/.cache',
  '.turbo',
  '.next',
  '.cache'
];

function cleanupLogs() {
  const now = Date.now();
  const retentionMs = LOG_RETENTION_DAYS * 24 * 60 * 60 * 1000;
  let cleaned = 0;
  let totalSizeFreed = 0;

  for (const logFile of logFiles) {
    const logPath = path.join(rootDir, logFile);
    if (fs.existsSync(logPath)) {
      const stats = fs.statSync(logPath);
      const age = now - stats.mtimeMs;
      const sizeMB = stats.size / (1024 * 1024);

      // Remove old logs or oversized logs
      if (age > retentionMs || sizeMB > MAX_LOG_SIZE_MB) {
        try {
          totalSizeFreed += stats.size;
          fs.unlinkSync(logPath);
          cleaned++;
          console.log(`✅ Cleaned: ${logFile} (${sizeMB.toFixed(2)}MB, ${Math.floor(age / (24 * 60 * 60 * 1000))} days old)`);
        } catch (error) {
          console.warn(`⚠️  Could not delete ${logFile}:`, error.message);
        }
      } else {
        // Rotate large but not old logs
        if (sizeMB > MAX_LOG_SIZE_MB / 2) {
          try {
            const content = fs.readFileSync(logPath, 'utf8');
            const lines = content.split('\n');
            // Keep last 1000 lines
            const keepLines = lines.slice(-1000).join('\n');
            fs.writeFileSync(logPath, keepLines, 'utf8');
            console.log(`📝 Rotated: ${logFile} (kept last 1000 lines)`);
          } catch (error) {
            console.warn(`⚠️  Could not rotate ${logFile}:`, error.message);
          }
        }
      }
    }
  }

  return { cleaned, sizeFreed: totalSizeFreed };
}

function cleanupTempFiles() {
  let cleaned = 0;
  
  function walkDir(dir, patterns) {
    if (!fs.existsSync(dir)) return;
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules and .git
        if (entry.name === 'node_modules' || entry.name === '.git' || entry.name.startsWith('.')) {
          continue;
        }
        walkDir(fullPath, patterns);
      } else {
        // Check if file matches temp patterns
        if (entry.name === '.DS_Store' || entry.name === 'Thumbs.db' || 
            entry.name.endsWith('.tmp') || entry.name.endsWith('.temp')) {
          try {
            fs.unlinkSync(fullPath);
            cleaned++;
          } catch (error) {
            // Ignore errors
          }
        }
      }
    }
  }
  
  walkDir(rootDir, tempPatterns);
  return cleaned;
}

function cleanupCache() {
  let cleaned = 0;
  let sizeFreed = 0;
  
  for (const cacheDir of cacheDirs) {
    const cachePath = path.join(rootDir, cacheDir);
    if (fs.existsSync(cachePath)) {
      try {
        const stats = fs.statSync(cachePath);
        if (stats.isDirectory()) {
          // Only clean .turbo cache, keep others
          if (cacheDir === '.turbo') {
            const size = getDirSize(cachePath);
            fs.rmSync(cachePath, { recursive: true, force: true });
            sizeFreed += size;
            cleaned++;
            console.log(`✅ Cleaned cache: ${cacheDir} (${(size / (1024 * 1024)).toFixed(2)}MB)`);
          }
        }
      } catch (error) {
        // Ignore errors
      }
    }
  }
  
  return { cleaned, sizeFreed };
}

function getDirSize(dirPath) {
  let size = 0;
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        size += getDirSize(fullPath);
      } else {
        size += fs.statSync(fullPath).size;
      }
    }
  } catch (error) {
    // Ignore errors
  }
  return size;
}

function main() {
  console.log('🧹 Starting automatic cleanup...\n');
  
  const logResult = cleanupLogs();
  const tempResult = cleanupTempFiles();
  const cacheResult = cleanupCache();
  
  const totalSizeMB = (logResult.sizeFreed + cacheResult.sizeFreed) / (1024 * 1024);
  
  console.log('\n📊 Cleanup Summary:');
  console.log(`  ✅ Logs cleaned: ${logResult.cleaned} files (${(logResult.sizeFreed / (1024 * 1024)).toFixed(2)}MB)`);
  console.log(`  ✅ Temp files cleaned: ${tempResult} files`);
  console.log(`  ✅ Cache cleaned: ${cacheResult.cleaned} directories (${(cacheResult.sizeFreed / (1024 * 1024)).toFixed(2)}MB)`);
  console.log(`  💾 Total space freed: ${totalSizeMB.toFixed(2)}MB\n`);
  
  return {
    success: true,
    logsCleaned: logResult.cleaned,
    tempFilesCleaned: tempResult,
    cacheCleaned: cacheResult.cleaned,
    totalSizeFreedMB: totalSizeMB
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as autoCleanup };

