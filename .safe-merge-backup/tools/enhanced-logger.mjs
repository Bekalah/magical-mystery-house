#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 */

/**
 * @license CC0-1.0 - Public Domain
 */

/**
 * Enhanced Logger with rotation and structured logging
 * Self-contained - no self-imports needed
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const LOG_DIR = path.join(BASE_DIR, '.logs');
const MAX_LOG_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_LOG_FILES = 10;

// ND joy: Central to all tools - honors neurodivergent creative expression
class EnhancedLogger {
  constructor() {
    this.logDir = LOG_DIR;
    this.ensureLogDir();
  }

  ensureLogDir() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  getLogFile(type = 'general') {
    return path.join(this.logDir, `${type}-${new Date().toISOString().split('T')[0]}.log`);
  }

  rotateLogs(type) {
    const files = fs.readdirSync(this.logDir)
      .filter(f => f.startsWith(type) && f.endsWith('.log'))
      .sort()
      .reverse();

    // Remove old logs beyond max
    if (files.length > MAX_LOG_FILES) {
      files.slice(MAX_LOG_FILES).forEach(file => {
        fs.unlinkSync(path.join(this.logDir, file));
      });
    }

    // Rotate if current log is too large
    const currentLog = this.getLogFile(type);
    if (fs.existsSync(currentLog)) {
      const stats = fs.statSync(currentLog);
      if (stats.size > MAX_LOG_SIZE) {
        const rotated = currentLog.replace('.log', `-${Date.now()}.log`);
        fs.renameSync(currentLog, rotated);
      }
    }
  }

  formatMessage(level, message, metadata = {}) {
    const timestamp = new Date().toISOString();
    const metaStr = Object.keys(metadata).length > 0 
      ? ` ${JSON.stringify(metadata)}` 
      : '';
    return `[${timestamp}] [${level}] ${message}${metaStr}\n`;
  }

  log(level, message, metadata = {}, type = 'general') {
    this.rotateLogs(type);
    const logFile = this.getLogFile(type);
    const formatted = this.formatMessage(level, message, metadata);
    
    fs.appendFileSync(logFile, formatted, 'utf-8');
    
    // Also output to console with colors
    const colors = {
      ERROR: '\x1b[31m',
      WARN: '\x1b[33m',
      INFO: '\x1b[36m',
      DEBUG: '\x1b[90m',
      RESET: '\x1b[0m'
    };
    
    const color = colors[level] || colors.INFO;
    console.log(`${color}${formatted.trim()}${colors.RESET}`);
  }

  error(message, metadata = {}) {
    this.log('ERROR', message, metadata, 'error');
  }

  warn(message, metadata = {}) {
    this.log('WARN', message, metadata, 'warning');
  }

  info(message, metadata = {}) {
    this.log('INFO', message, metadata, 'general');
  }

  debug(message, metadata = {}) {
    this.log('DEBUG', message, metadata, 'debug');
  }

  success(message, metadata = {}) {
    this.log('INFO', `✅ ${message}`, metadata, 'general');
  }

  getRecentLogs(type = 'general', lines = 50) {
    const logFile = this.getLogFile(type);
    if (!fs.existsSync(logFile)) {
      return [];
    }

    const content = fs.readFileSync(logFile, 'utf-8');
    return content.split('\n').filter(l => l.trim()).slice(-lines);
  }

  getLogStats() {
    const stats = {};
    const files = fs.readdirSync(this.logDir).filter(f => f.endsWith('.log'));

    for (const file of files) {
      const filePath = path.join(this.logDir, file);
      const stat = fs.statSync(filePath);
      const type = file.split('-')[0];
      
      if (!stats[type]) {
        stats[type] = { files: 0, totalSize: 0, lines: 0 };
      }
      
      stats[type].files++;
      stats[type].totalSize += stat.size;
      
      const content = fs.readFileSync(filePath, 'utf-8');
      stats[type].lines += content.split('\n').length;
    }

    return stats;
  }
}

export default EnhancedLogger;

