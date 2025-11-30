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
 * Build Optimizer
 * Optimizes build process and reduces build times
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';
import UserFeedback from './user-feedback.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();

logger.info('🔧 IMPROVEMENT: Creating Build Optimizer');
logger.info('   → Optimizes Turbo cache');
logger.info('   → Cleans build artifacts');
logger.info('   → Optimizes build configuration');
logger.info('   → Reduces build times\n');

function optimizeTurboCache() {
  UserFeedback.info('Optimizing Turbo cache...');
  
  const turboCache = path.join(BASE_DIR, '.turbo');
  if (!fs.existsSync(turboCache)) {
    UserFeedback.warning('Turbo cache not found');
    return false;
  }

  try {
    // Get cache size
    const cacheSize = getDirSize(turboCache);
    const sizeMB = (cacheSize / (1024 * 1024)).toFixed(2);
    
    UserFeedback.info(`Current cache size: ${sizeMB}MB`);
    
    // Clean old cache entries (older than 7 days)
    const now = Date.now();
    const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
    let cleaned = 0;
    
    function cleanOldEntries(dir) {
      try {
        const entries = fs.readdirSync(dir);
        for (const entry of entries) {
          const fullPath = path.join(dir, entry);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            cleanOldEntries(fullPath);
            // Remove empty directories
            try {
              if (fs.readdirSync(fullPath).length === 0) {
                fs.rmdirSync(fullPath);
                cleaned++;
              }
            } catch {
              // Ignore
            }
          } else if (stat.mtimeMs < sevenDaysAgo) {
            fs.unlinkSync(fullPath);
            cleaned++;
          }
        }
      } catch {
        // Skip
      }
    }
    
    cleanOldEntries(turboCache);
    
    const newSize = getDirSize(turboCache);
    const newSizeMB = (newSize / (1024 * 1024)).toFixed(2);
    
    UserFeedback.success(`Cleaned ${cleaned} old cache entries (${sizeMB}MB → ${newSizeMB}MB)`);
    return true;
  } catch (error) {
    UserFeedback.error('Failed to optimize Turbo cache', error.message);
    return false;
  }
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

function optimizeBuildConfig() {
  UserFeedback.info('Optimizing build configuration...');
  
  const turboJson = path.join(BASE_DIR, 'turbo.json');
  if (!fs.existsSync(turboJson)) {
    UserFeedback.warning('turbo.json not found');
    return false;
  }

  try {
    const config = JSON.parse(fs.readFileSync(turboJson, 'utf-8'));
    let modified = false;

    // Ensure proper caching
    if (!config.pipeline) {
      config.pipeline = {};
    }

    // Optimize build task
    if (config.pipeline.build) {
      if (!config.pipeline.build.outputs) {
        config.pipeline.build.outputs = ['dist/**', '.next/**', '!.next/cache/**', 'build/**'];
        modified = true;
      }
      if (!config.pipeline.build.dependsOn) {
        config.pipeline.build.dependsOn = ['^build'];
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(turboJson, JSON.stringify(config, null, 2), 'utf-8');
      UserFeedback.success('Build configuration optimized');
      return true;
    }

    UserFeedback.info('Build configuration already optimized');
    return false;
  } catch (error) {
    UserFeedback.error('Failed to optimize build config', error.message);
    return false;
  }
}

function cleanBuildArtifacts() {
  UserFeedback.info('Cleaning build artifacts...');
  
  const artifacts = ['dist', 'build', '.next', 'node_modules/.cache'];
  let cleaned = 0;

  for (const artifact of artifacts) {
    const artifactPath = path.join(BASE_DIR, artifact);
    if (fs.existsSync(artifactPath)) {
      try {
        fs.rmSync(artifactPath, { recursive: true, force: true });
        cleaned++;
        UserFeedback.info(`Cleaned: ${artifact}`);
      } catch (error) {
        UserFeedback.warning(`Failed to clean: ${artifact}`);
      }
    }
  }

  if (cleaned > 0) {
    UserFeedback.success(`Cleaned ${cleaned} build artifact directories`);
    return true;
  }

  UserFeedback.info('No build artifacts to clean');
  return false;
}

function optimizeBuild() {
  logger.info('🏛️✨ Build Optimization');
  logger.info('=============================================\n');

  const results = {
    turboCache: optimizeTurboCache(),
    buildConfig: optimizeBuildConfig(),
    artifacts: cleanBuildArtifacts()
  };

  logger.info('\n📊 Build Optimization Summary');
  logger.info('=============================================');
  logger.info(`Turbo cache: ${results.turboCache ? '✅ Optimized' : '⚠️  Skipped'}`);
  logger.info(`Build config: ${results.buildConfig ? '✅ Optimized' : 'ℹ️  Already optimal'}`);
  logger.info(`Artifacts: ${results.artifacts ? '✅ Cleaned' : 'ℹ️  Already clean'}`);

  logger.info('Build optimization completed', results);
  return results;
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  optimizeBuild();
}

export { optimizeBuild, optimizeTurboCache, optimizeBuildConfig };

