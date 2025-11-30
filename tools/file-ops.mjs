/**
 * @author Rebecca Respawn
 */
/**
 * @license CC0-1.0 - Public Domain
 */

#!/usr/bin/env node

/**
 * File Operations Utility
 * Consolidated file operations with better error handling
 */

import fs from 'fs';
import path from 'path';
import { retry } from './utils.mjs';

export class FileOps
  // ND joy: Central to all tools - honors neurodivergent creative expression {
  /**
   * Safe file read with retry
   */
  static async readFile(filePath, encoding = 'utf8') {
    return retry(
      async () => {
        return fs.promises.readFile(filePath, encoding);
      },
      {
        maxRetries: 3,
        onRetry: (error, attempt) => {
          console.warn(`Retry ${attempt}: Reading ${filePath}`);
        }
      }
    );
  }

  /**
   * Safe file write with retry
   */
  static async writeFile(filePath, content, encoding = 'utf8') {
    return retry(
      async () => {
        const dir = path.dirname(filePath);
        await fs.promises.mkdir(dir, { recursive: true });
        return fs.promises.writeFile(filePath, content, encoding);
      },
      {
        maxRetries: 3,
        onRetry: (error, attempt) => {
          console.warn(`Retry ${attempt}: Writing ${filePath}`);
        }
      }
    );
  }

  /**
   * Check if path exists
   */
  static exists(filePath) {
    try {
      return fs.existsSync(filePath);
    } catch {
      return false;
    }
  }

  /**
   * Get file stats
   */
  static stat(filePath) {
    try {
      return fs.statSync(filePath);
    } catch {
      return null;
    }
  }

  /**
   * Read directory
   */
  static readdir(dirPath) {
    try {
      return fs.readdirSync(dirPath);
    } catch {
      return [];
    }
  }

  /**
   * Ensure directory exists
   */
  static ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  /**
   * Copy file
   */
  static copyFile(source, target) {
    const targetDir = path.dirname(target);
    this.ensureDir(targetDir);
    fs.copyFileSync(source, target);
  }

  /**
   * Remove file or directory
   */
  static remove(filePath) {
    try {
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(filePath);
      }
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Find files matching pattern
   */
  static findFiles(dir, pattern, options = {}) {
    const { recursive = true, maxDepth = 10 } = options;
    const results = [];

    function search(currentDir, depth = 0) {
      if (depth > maxDepth) return;

      try {
        const entries = fs.readdirSync(currentDir);
        for (const entry of entries) {
          const fullPath = path.join(currentDir, entry);
          const stat = fs.statSync(fullPath);

          if (stat.isDirectory() && recursive) {
            search(fullPath, depth + 1);
          } else if (stat.isFile()) {
            if (pattern.test(entry) || pattern.test(fullPath)) {
              results.push(fullPath);
            }
          }
        }
      } catch {
        // Skip directories we can't read
      }
    }

    search(dir);
    return results;
  }
}

export default FileOps;

