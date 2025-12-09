// Enterprise Error Tracking
// Integrates with error tracking services (Sentry, LogRocket, etc.)

export class ErrorTracker {
  private static instance: ErrorTracker;
  private initialized = false;

  static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }

  init(config: { dsn?: string; environment?: string }) {
    if (this.initialized) return;

    // Initialize error tracking
    if (typeof window !== 'undefined') {
      window.addEventListener('error', (event) => {
        this.captureError(event.error || event.message);
      });

      window.addEventListener('unhandledrejection', (event) => {
        this.captureError(event.reason);
      });
    }

    this.initialized = true;
  }

  captureError(error: Error | string, context?: Record<string, any>) {
    const errorData = {
      message: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      context,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error captured:', errorData);
    }

    // Send to error tracking service
    // Example: Sentry.captureException(error, { extra: context });
  }

  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
    const messageData = {
      message,
      level,
      timestamp: new Date().toISOString()
    };

    if (process.env.NODE_ENV === 'development') {
      console[level](messageData);
    }

    // Send to error tracking service
  }

  setUser(user: { id: string; email?: string; username?: string }) {
    // Set user context for error tracking
    // Example: Sentry.setUser(user);
  }
}

export const errorTracker = ErrorTracker.getInstance();
