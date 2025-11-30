/**
 * Sacred mathematics: 144:99 ratio, golden ratio, Fibonacci - foundational
 */
/**
 * ND joy: Central to all tools - honors neurodivergent creative expression
 */
/**
 * @author Rebecca Respawn
 */
/**
 * @license CC0-1.0 - Public Domain
 */

#!/usr/bin/env node

/**
 * Enhanced Backup System
 * Automated backups with rotation and restoration
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();

const BACKUP_DIR = path.join(BASE_DIR, '.backups');
const MAX_BACKUPS = 10;
const BACKUP_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours

function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
}

function createBackup(name = null) {
  ensureBackupDir();
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupName = name || `backup-${timestamp}`;
  const backupPath = path.join(BACKUP_DIR, backupName);

  logger.info(`Creating backup: ${backupName}`);

  const itemsToBackup = [
    { source: 'package.json', critical: true },
    { source: 'pnpm-lock.yaml', critical: true },
    { source: 'turbo.json', critical: true },
    { source: 'tsconfig.json', critical: true },
    { source: 'tools', critical: true },
    { source: 'scripts', critical: true },
    { source: 'packages', critical: true },
    { source: 'docs', critical: false },
    { source: 'openspec', critical: false }
  ];

  const backupManifest = {
    timestamp: new Date().toISOString(),
    name: backupName,
    items: [],
    totalSize: 0
  };

  fs.mkdirSync(backupPath, { recursive: true });

  for (const item of itemsToBackup) {
    const sourcePath = path.join(BASE_DIR, item.source);
    
    if (!fs.existsSync(sourcePath)) {
      logger.warn(`Skipping missing item: ${item.source}`);
      continue;
    }

    const targetPath = path.join(backupPath, item.source);
    const targetDir = path.dirname(targetPath);
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    try {
      const stat = fs.statSync(sourcePath);
      
      if (stat.isDirectory()) {
        execSync(`cp -r "${sourcePath}" "${targetPath}"`, { cwd: BASE_DIR });
      } else {
        fs.copyFileSync(sourcePath, targetPath);
      }

      const size = stat.isDirectory() ? getDirSize(sourcePath) : stat.size;
      backupManifest.items.push({
        path: item.source,
        critical: item.critical,
        size
      });
      backupManifest.totalSize += size;

      logger.info(`Backed up: ${item.source} (${formatSize(size)})`);
    } catch (error) {
      logger.error(`Failed to backup: ${item.source}`, { error: error.message });
    }
  }

  // Save manifest
  const manifestPath = path.join(backupPath, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(backupManifest, null, 2), 'utf-8');

  logger.success(`Backup created: ${backupName} (${formatSize(backupManifest.totalSize)})`);

  // Rotate old backups
  rotateBackups();

  return backupManifest;
}

function getDirSize(dirPath) {
  let size = 0;
  try {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        size += getDirSize(filePath);
      } else {
        size += stat.size;
      }
    }
  } catch {
    // Ignore
  }
  return size;
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
}

function rotateBackups() {
  ensureBackupDir();

  const backups = fs.readdirSync(BACKUP_DIR)
    .filter(item => {
      const itemPath = path.join(BACKUP_DIR, item);
      return fs.statSync(itemPath).isDirectory();
    })
    .map(item => {
      const itemPath = path.join(BACKUP_DIR, item);
      const manifestPath = path.join(itemPath, 'manifest.json');
      if (fs.existsSync(manifestPath)) {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        return {
          name: item,
          path: itemPath,
          timestamp: manifest.timestamp
        };
      }
      return {
        name: item,
        path: itemPath,
        timestamp: fs.statSync(itemPath).mtime.toISOString()
      };
    })
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  if (backups.length > MAX_BACKUPS) {
    const toRemove = backups.slice(MAX_BACKUPS);
    for (const backup of toRemove) {
      logger.info(`Removing old backup: ${backup.name}`);
      fs.rmSync(backup.path, { recursive: true, force: true });
    }
  }
}

function listBackups() {
  ensureBackupDir();

  const backups = fs.readdirSync(BACKUP_DIR)
    .filter(item => {
      const itemPath = path.join(BACKUP_DIR, item);
      return fs.statSync(itemPath).isDirectory();
    })
    .map(item => {
      const itemPath = path.join(BACKUP_DIR, item);
      const manifestPath = path.join(itemPath, 'manifest.json');
      if (fs.existsSync(manifestPath)) {
        return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
      }
      return {
        name: item,
        timestamp: fs.statSync(itemPath).mtime.toISOString(),
        items: [],
        totalSize: getDirSize(itemPath)
      };
    })
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return backups;
}

function restoreBackup(backupName) {
  ensureBackupDir();

  const backupPath = path.join(BACKUP_DIR, backupName);
  if (!fs.existsSync(backupPath)) {
    logger.error(`Backup not found: ${backupName}`);
    return false;
  }

  logger.info(`Restoring backup: ${backupName}`);

  const manifestPath = path.join(backupPath, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    logger.error('Backup manifest not found');
    return false;
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  for (const item of manifest.items) {
    const sourcePath = path.join(backupPath, item.path);
    const targetPath = path.join(BASE_DIR, item.path);

    if (!fs.existsSync(sourcePath)) {
      logger.warn(`Backup item missing: ${item.path}`);
      continue;
    }

    try {
      const targetDir = path.dirname(targetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const stat = fs.statSync(sourcePath);
      if (stat.isDirectory()) {
        if (fs.existsSync(targetPath)) {
          fs.rmSync(targetPath, { recursive: true, force: true });
        }
        execSync(`cp -r "${sourcePath}" "${targetPath}"`, { cwd: BASE_DIR });
      } else {
        fs.copyFileSync(sourcePath, targetPath);
      }

      logger.info(`Restored: ${item.path}`);
    } catch (error) {
      logger.error(`Failed to restore: ${item.path}`, { error: error.message });
      return false;
    }
  }

  logger.success(`Backup restored: ${backupName}`);
  return true;
}

function displayBackups() {
  const backups = listBackups();

  logger.info('\n📦 Available Backups');
  logger.info('=============================================');
  
  if (backups.length === 0) {
    logger.info('No backups found');
    return;
  }

  backups.forEach((backup, index) => {
    logger.info(`\n${index + 1}. ${backup.name}`);
    logger.info(`   Date: ${new Date(backup.timestamp).toLocaleString()}`);
    logger.info(`   Size: ${formatSize(backup.totalSize)}`);
    logger.info(`   Items: ${backup.items.length}`);
  });
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2] || 'list';
  
  switch (command) {
    case 'create':
      const name = process.argv[3];
      createBackup(name);
      break;
    case 'list':
      displayBackups();
      break;
    case 'restore':
      const backupName = process.argv[3];
      if (!backupName) {
        logger.error('Usage: node backup-system.mjs restore <backup-name>');
        process.exit(1);
      }
      restoreBackup(backupName);
      break;
    default:
      logger.info('Usage: node backup-system.mjs [create|list|restore] [name]');
  }
}

export { createBackup, listBackups, restoreBackup, rotateBackups };

