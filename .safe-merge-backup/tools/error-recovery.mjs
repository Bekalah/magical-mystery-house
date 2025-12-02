/**
 * @author Rebecca Respawn
 */
/**
 * @license CC0-1.0 - Public Domain
 */

#!/usr/bin/env node

/**
 * Error Recovery System
 * Automatically recovers from common errors
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

const RECOVERY_STRATEGIES = {
  'ENOENT': {
    description: 'File or directory not found',
    actions: [
      { type: 'create_directory', check: (error) => error.path && error.path.includes('/') },
      { type: 'restore_from_backup', check: () => true }
    ]
  },
  'EACCES': {
    description: 'Permission denied',
    actions: [
      { type: 'fix_permissions', check: () => true }
    ]
  },
  'MODULE_NOT_FOUND': {
    description: 'Module not found',
    actions: [
      { type: 'install_dependencies', check: () => true },
      { type: 'clear_cache', check: () => true }
    ]
  },
  'BUILD_ERROR': {
    description: 'Build error',
    actions: [
      { type: 'clean_build', check: () => true },
      { type: 'rebuild', check: () => true }
    ]
  }
};

function createDirectory(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      logger.success(`Created directory: ${dirPath}`);
      return true;
    }
  } catch (error) {
    logger.error(`Failed to create directory: ${dirPath}`, { error: error.message });
    return false;
  }
  return false;
}

function restoreFromBackup(filePath) {
  const backupDir = path.join(BASE_DIR, '.backups');
  const relativePath = path.relative(BASE_DIR, filePath);
  const backupPath = path.join(backupDir, relativePath);

  if (fs.existsSync(backupPath)) {
    try {
      const backupDirPath = path.dirname(filePath);
      createDirectory(backupDirPath);
      fs.copyFileSync(backupPath, filePath);
      logger.success(`Restored from backup: ${filePath}`);
      return true;
    } catch (error) {
      logger.error(`Failed to restore from backup: ${filePath}`, { error: error.message });
      return false;
    }
  }
  return false;
}

function fixPermissions(filePath) {
  try {
    execSync(`chmod +x "${filePath}"`, { cwd: BASE_DIR });
    logger.success(`Fixed permissions: ${filePath}`);
    return true;
  } catch (error) {
    logger.error(`Failed to fix permissions: ${filePath}`, { error: error.message });
    return false;
  }
}

function installDependencies() {
  try {
    logger.info('Installing dependencies...');
    execSync('pppnpm install', { cwd: BASE_DIR, stdio: 'inherit' });
    logger.success('Dependencies installed');
    return true;
  } catch (error) {
    logger.error('Failed to install dependencies', { error: error.message });
    return false;
  }
}

function clearCache() {
  try {
    logger.info('Clearing cache...');
    const cacheDirs = ['node_modules/.cache', '.turbo', 'dist'];
    for (const dir of cacheDirs) {
      const cachePath = path.join(BASE_DIR, dir);
      if (fs.existsSync(cachePath)) {
        fs.rmSync(cachePath, { recursive: true, force: true });
        logger.info(`Cleared: ${dir}`);
      }
    }
    logger.success('Cache cleared');
    return true;
  } catch (error) {
    logger.error('Failed to clear cache', { error: error.message });
    return false;
  }
}

function cleanBuild() {
  try {
    logger.info('Cleaning build...');
    execSync('pppnpm run clean', { cwd: BASE_DIR, stdio: 'pipe' });
    logger.success('Build cleaned');
    return true;
  } catch (error) {
    logger.warn('Clean command not available or failed', { error: error.message });
    // Try manual cleanup
    const distPath = path.join(BASE_DIR, 'dist');
    if (fs.existsSync(distPath)) {
      fs.rmSync(distPath, { recursive: true, force: true });
      logger.success('Manually cleaned dist directory');
    }
    return true;
  }
}

function rebuild() {
  try {
    logger.info('Rebuilding...');
    execSync('pppnpm run build', { cwd: BASE_DIR, stdio: 'inherit' });
    logger.success('Rebuild complete');
    return true;
  } catch (error) {
    logger.error('Rebuild failed', { error: error.message });
    return false;
  }
}

function recoverFromError(error, context = {}) {
  logger.warn('Attempting error recovery', { error: error.message, context });

  const errorType = detectErrorType(error);
  const strategy = RECOVERY_STRATEGIES[errorType];

  if (!strategy) {
    logger.error('No recovery strategy found', { errorType, error: error.message });
    return false;
  }

  logger.info(`Recovery strategy: ${strategy.description}`);

  for (const action of strategy.actions) {
    if (!action.check(error)) continue;

    let success = false;

    switch (action.type) {
      case 'create_directory':
        if (context.path) {
          success = createDirectory(path.dirname(context.path));
        }
        break;
      case 'restore_from_backup':
        if (context.path) {
          success = restoreFromBackup(context.path);
        }
        break;
      case 'fix_permissions':
        if (context.path) {
          success = fixPermissions(context.path);
        }
        break;
      case 'install_dependencies':
        success = installDependencies();
        break;
      case 'clear_cache':
        success = clearCache();
        break;
      case 'clean_build':
        success = cleanBuild();
        break;
      case 'rebuild':
        success = rebuild();
        break;
    }

    if (success) {
      logger.success(`Recovery action succeeded: ${action.type}`);
      return true;
    }
  }

  logger.error('All recovery actions failed');
  return false;
}

function detectErrorType(error) {
  const message = error.message || '';
  const code = error.code || '';

  if (code === 'ENOENT' || message.includes('not found') || message.includes('ENOENT')) {
    return 'ENOENT';
  }
  if (code === 'EACCES' || message.includes('permission denied') || message.includes('EACCES')) {
    return 'EACCES';
  }
  if (message.includes('Cannot find module') || message.includes('MODULE_NOT_FOUND')) {
    return 'MODULE_NOT_FOUND';
  }
  if (message.includes('error TS') || message.includes('build error') || message.includes('Build failed')) {
    return 'BUILD_ERROR';
  }

  return 'UNKNOWN';
}

function autoRecover() {
  logger.info('Running automatic error recovery...');

  // Check for common issues
  const checks = [
    {
      name: 'Missing node_modules',
      check: () => !fs.existsSync(path.join(BASE_DIR, 'node_modules')),
      recover: installDependencies
    },
    {
      name: 'Build artifacts missing',
      check: () => {
        const distPath = path.join(BASE_DIR, 'dist');
        return !fs.existsSync(distPath) || fs.readdirSync(distPath).length === 0;
      },
      recover: rebuild
    },
    {
      name: 'Corrupted cache',
      check: () => {
        const turboCache = path.join(BASE_DIR, '.turbo');
        return fs.existsSync(turboCache) && fs.statSync(turboCache).size === 0;
      },
      recover: clearCache
    }
  ];

  let recovered = 0;
  for (const check of checks) {
    if (check.check()) {
      logger.warn(`Issue detected: ${check.name}`);
      if (check.recover()) {
        recovered++;
        logger.success(`Recovered from: ${check.name}`);
      }
    }
  }

  logger.info(`Auto-recovery complete: ${recovered} issues resolved`);
  return recovered;
}

// Export for use in other tools
export { recoverFromError, autoRecover, detectErrorType };

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  autoRecover();
}

