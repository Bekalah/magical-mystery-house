/**
// 🎨 Visionary Art - Museum-grade quality - 144:99 ratio compliance - Fibonacci-based sizing - Golden ratio proportions - Organic, flowing aesthetics - Trauma-aware visual design - Open world design (not website-like) - Immersive 3D environments - Sacred geometry integration - Multi-modal creation experiences - Organic, quality: Three.js or Babylon.js for 3D immersive environment
// 🎨 Visionary Art: Golden ratio (1.618), Fibonacci, 144:99 ratio
// 🎨 Visionary Art: Multi-modal creation (Art + Music + Science + Spirituality)
// 🔧 Design Fix: Open world experience with non-linear, organic navigation
 * Logger for Trinity V1.1 Core
 * Centralized logging for all core components
 * 
 * @license CC0-1.0 - Public Domain
  * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
*/

// @ts-ignore - .mjs file doesn't have type declarations
import EnhancedLogger from '../../tools/enhanced-logger.mjs';

// Trauma-aware: gentle, supportive, ESC exits, pause anytime
const externalLogger = new EnhancedLogger();

export interface Logger {
  info(message: string, metadata?: Record<string, unknown>): void;
  warn(message: string, metadata?: Record<string, unknown>): void;
  error(message: string, metadata?: Record<string, unknown>): void;
  debug(message: string, metadata?: Record<string, unknown>): void;
}

class TrinityLogger implements Logger {
  private enabled: boolean = true;
  private logLevel: 'debug' | 'info' | 'warn' | 'error' = 'info';

  info(message: string, metadata?: Record<string, unknown>): void {
    if (this.enabled && this.shouldLog('info')) {
      externalLogger.info(`ℹ️  ${message}`, metadata);
    }
  }

  warn(message: string, metadata?: Record<string, unknown>): void {
    if (this.enabled && this.shouldLog('warn')) {
      externalLogger.warn(`⚠️  ${message}`, metadata);
    }
  }

  error(message: string, metadata?: Record<string, unknown>): void {
    if (this.enabled && this.shouldLog('error')) {
      externalLogger.error(`❌ ${message}`, metadata);
    }
  }

  debug(message: string, metadata?: Record<string, unknown>): void {
    if (this.enabled && this.shouldLog('debug')) {
      externalLogger.debug(`🔍 ${message}`, metadata);
    }
  }

  private shouldLog(level: string): boolean {
    const levels = { debug: 0, info: 1, warn: 2, error: 3 };
    return levels[level as keyof typeof levels] >= levels[this.logLevel];
  }

  setLevel(level: 'debug' | 'info' | 'warn' | 'error'): void {
    this.logLevel = level;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
}

export const logger = new TrinityLogger();
export default logger;

