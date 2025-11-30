#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Utility Functions
 * Common utilities for all tools
 */

/**
 * Retry with exponential backoff
 */
export async function retry(fn, options = {}) {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffFactor = 2,
    onRetry = null
  } = options;

  let lastError;
  let delay = initialDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt < maxRetries) {
        if (onRetry) {
          onRetry(error, attempt + 1, delay);
        }
        await new Promise(resolve => setTimeout(resolve, delay));
        delay = Math.min(delay * backoffFactor, maxDelay);
      }
    }
  }

  throw lastError;
}

/**
 * Validate and sanitize input
 */
export function validateInput(input, type, options = {}) {
  const { min, max, pattern, required = true } = options;

  if (required && (input === null || input === undefined || input === '')) {
    throw new Error(`Input is required`);
  }

  if (input === null || input === undefined) {
    return input;
  }

  switch (type) {
    case 'string':
      if (typeof input !== 'string') {
        throw new Error(`Expected string, got ${typeof input}`);
      }
      if (min !== undefined && input.length < min) {
        throw new Error(`String must be at least ${min} characters`);
      }
      if (max !== undefined && input.length > max) {
        throw new Error(`String must be at most ${max} characters`);
      }
      if (pattern && !pattern.test(input)) {
        throw new Error(`String does not match required pattern`);
      }
      return input.trim();

    case 'number':
      const num = typeof input === 'string' ? parseFloat(input) : input;
      if (isNaN(num)) {
        throw new Error(`Invalid number: ${input}`);
      }
      if (min !== undefined && num < min) {
        throw new Error(`Number must be at least ${min}`);
      }
      if (max !== undefined && num > max) {
        throw new Error(`Number must be at most ${max}`);
      }
      return num;

    case 'path':
      if (typeof input !== 'string') {
        throw new Error(`Expected path string, got ${typeof input}`);
      }
      // Basic path validation
      if (input.includes('..') && !options.allowParent) {
        throw new Error(`Path cannot contain '..'`);
      }
      return input;

    default:
      return input;
  }
}

/**
 * Safe file operations with retry
 */
export async function safeReadFile(filePath, encoding = 'utf8') {
  return retry(
    async () => {
      const fs = await import('fs');
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

export async function safeWriteFile(filePath, content, encoding = 'utf8') {
  return retry(
    async () => {
      const fs = await import('fs');
      const path = await import('path');
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
 * Format bytes to human readable
 */
export function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Format duration in milliseconds to human readable
 */
export function formatDuration(ms) {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
  if (ms < 3600000) return `${(ms / 60000).toFixed(2)}m`;
  return `${(ms / 3600000).toFixed(2)}h`;
}

/**
 * Progress bar
 */
export function createProgressBar(total, current = 0) {
  const width = 40;
  const percentage = total > 0 ? (current / total) * 100 : 0;
  const filled = Math.round((percentage / 100) * width);
  const empty = width - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  return `[${bar}] ${percentage.toFixed(1)}% (${current}/${total})`;
}

export default {
  retry,
  validateInput,
  safeReadFile,
  safeWriteFile,
  formatBytes,
  formatDuration,
  createProgressBar
};

