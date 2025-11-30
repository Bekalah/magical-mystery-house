#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Centralized Logging Utility
 * Provides consistent logging with levels and formatting
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  SILENT: 4
};

let currentLevel = process.env.LOG_LEVEL 
  ? LOG_LEVELS[process.env.LOG_LEVEL.toUpperCase()] || LOG_LEVELS.INFO
  : LOG_LEVELS.INFO;

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function formatTimestamp() {
  return new Date().toISOString();
}

function formatMessage(level, message, ...args) {
  const timestamp = formatTimestamp();
  const levelColor = {
    DEBUG: colors.dim,
    INFO: colors.cyan,
    WARN: colors.yellow,
    ERROR: colors.red
  }[level] || colors.reset;
  
  const prefix = `${colors.dim}[${timestamp}]${colors.reset} ${levelColor}[${level}]${colors.reset}`;
  return `${prefix} ${message}${args.length > 0 ? ' ' + args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ') : ''}`;
}

export const logger = {
  setLevel(level) {
    if (typeof level === 'string') {
      currentLevel = LOG_LEVELS[level.toUpperCase()] || LOG_LEVELS.INFO;
    } else {
      currentLevel = level;
    }
  },

  debug(message, ...args) {
    if (currentLevel <= LOG_LEVELS.DEBUG) {
      console.log(formatMessage('DEBUG', message, ...args));
    }
  },

  info(message, ...args) {
    if (currentLevel <= LOG_LEVELS.INFO) {
      console.log(formatMessage('INFO', message, ...args));
    }
  },

  warn(message, ...args) {
    if (currentLevel <= LOG_LEVELS.WARN) {
      console.warn(formatMessage('WARN', message, ...args));
    }
  },

  error(message, ...args) {
    if (currentLevel <= LOG_LEVELS.ERROR) {
      console.error(formatMessage('ERROR', message, ...args));
    }
  },

  success(message, ...args) {
    if (currentLevel <= LOG_LEVELS.INFO) {
      console.log(`${colors.green}✅${colors.reset} ${message}${args.length > 0 ? ' ' + args.join(' ') : ''}`);
    }
  }
};

export default logger;

