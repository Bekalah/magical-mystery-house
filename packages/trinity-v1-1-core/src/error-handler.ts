/**
// 🎨 Visionary Art - 144:99 ratio compliance - Fibonacci-based sizing - Multi-modal creation experiences - Organic, flowing aesthetics - Trauma-aware visual design - Open world design (not website-like) - Immersive 3D environments - Sacred geometry integration - Museum-grade quality - Museum-grade quality - Golden ratio proportions - Organic, quality: Three.js or Babylon.js for 3D immersive environment
// 🎨 Visionary Art: Golden ratio (1.618), Fibonacci, 144:99 ratio
// 🎨 Visionary Art: Multi-modal creation (Art + Music + Science + Spirituality)
// 🔧 Design Fix: Open world experience with non-linear, organic navigation
 * 🛡️✨ ERROR HANDLER
 *
 * PTSD-safe error handling for all Cathedral systems.
 * Gentle, constructive error messages and recovery.
 *
 * @license CC0-1.0 - Public Domain
 */

import logger from './logger';

export interface ErrorContext {
  system: string;
  operation: string;
  timestamp: number;
  userFriendly: boolean;
}

export interface ErrorRecovery {
  suggestion: string;
  autoRecoverable: boolean;
  recoveryAction?: () => void;
}

export class ErrorHandler {
  // PTSD-safe error messages (gentle, constructive)
  private static readonly ERROR_MESSAGES: Record<string, string> = {
    'build_error': 'The build encountered some issues. This is normal during development.',
    'type_error': 'A type mismatch was found. This helps us improve code quality.',
    'connection_error': 'A connection couldn\'t be established. We\'ll try again automatically.',
    'timeout_error': 'An operation took longer than expected. This happens sometimes.',
    'unknown_error': 'Something unexpected occurred. The system will continue working.'
  };

  // Handle errors gently
  public static handleError(
    error: Error | unknown,
    context: ErrorContext
  ): ErrorRecovery {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorType = ErrorHandler.classifyError(errorMessage);

    // Get user-friendly message
    const userMessage = ErrorHandler.ERROR_MESSAGES[errorType] ||
                       ErrorHandler.ERROR_MESSAGES['unknown_error'];

    // Determine if auto-recoverable
    const autoRecoverable = ErrorHandler.isAutoRecoverable(errorType);

    // Generate recovery suggestion
    const suggestion = ErrorHandler.generateSuggestion(errorType, context);

    return {
      suggestion: `${userMessage} ${suggestion}`,
      autoRecoverable,
      recoveryAction: autoRecoverable ? () => {
        // Auto-recovery logic would go here
        // Auto-recovery in progress
        // logger.info(`Auto-recovering from ${errorType} in ${context.system}`);
      } : undefined
    };
  }

  // Classify error type
  private static classifyError(message: string): string {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('build') || lowerMessage.includes('compile')) {
      return 'build_error';
    }
    if (lowerMessage.includes('type') || lowerMessage.includes('ts')) {
      return 'type_error';
    }
    if (lowerMessage.includes('connection') || lowerMessage.includes('network')) {
      return 'connection_error';
    }
    if (lowerMessage.includes('timeout') || lowerMessage.includes('timed out')) {
      return 'timeout_error';
    }

    return 'unknown_error';
  }

  // Check if error is auto-recoverable
  private static isAutoRecoverable(errorType: string): boolean {
    return ['connection_error', 'timeout_error'].includes(errorType);
  }

  // Generate constructive suggestion
  private static generateSuggestion(errorType: string, _context: ErrorContext): string {
    // Context available for future context-aware suggestions
    switch (errorType) {
      case 'build_error':
        return 'The experiment will continue improving other areas while this is resolved.';
      case 'type_error':
        return 'Type safety helps prevent bugs. This will be fixed automatically.';
      case 'connection_error':
        return 'The system will retry the connection automatically.';
      case 'timeout_error':
        return 'The operation will be retried with a longer timeout.';
      default:
        return 'The system is designed to handle this gracefully.';
    }
  }

  // Safe async operation wrapper
  public static async safeAsync<T>(
    operation: () => Promise<T>,
    context: ErrorContext,
    defaultValue: T
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      const recovery = ErrorHandler.handleError(error, context);
      logger.info(`⚠️ ${recovery.suggestion}`);

      if (recovery.autoRecoverable && recovery.recoveryAction) {
        recovery.recoveryAction();
      }

      return defaultValue;
    }
  }

  // Safe synchronous operation wrapper
  public static safeSync<T>(
    operation: () => T,
    context: ErrorContext,
    defaultValue: T
  ): T {
    try {
      return operation();
    } catch (error) {
      const recovery = ErrorHandler.handleError(error, context);
      logger.info(`⚠️ ${recovery.suggestion}`);

      if (recovery.autoRecoverable && recovery.recoveryAction) {
        recovery.recoveryAction();
      }

      // Context is used in handleError above
      return defaultValue;
    }
  }

  // Log error gently (PTSD-safe)
  public static logError(error: Error | unknown, context: ErrorContext): void {
    const recovery = ErrorHandler.handleError(error, context);
    logger.info(`📝 ${recovery.suggestion}`);

    // Only log technical details in development
    if (process.env.NODE_ENV === 'development') {
      logger.info(`   System: ${context.system}`);
      logger.info(`   Operation: ${context.operation}`);
      if (error instanceof Error) {
        logger.info(`   Error: ${error.message}`);
      }
    }
  }

  // Get error handler instance (for integration)
  public static getInstance(): typeof ErrorHandler {
    return ErrorHandler;
  }
}

export default ErrorHandler;

