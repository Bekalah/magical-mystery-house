/**
 * 🏰 Cathedral SQL Security Utilities
 * 
 * NEVER use string concatenation for SQL queries!
 * Always use parameterized queries or these sanitization utilities.
 */

/**
 * SQL injection protection - sanitize user input for safe database queries
 * 
 * @example
 * // ❌ NEVER do this:
 * const query = `SELECT * FROM users WHERE name = '${userInput}'`;
 * 
 * // ✅ DO this instead:
 * const safeName = sanitizeSQL(userInput);
 * // Or better, use parameterized queries
 */
export function sanitizeSQL(input: string): string {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }
  
  // Escape single quotes by doubling them
  let sanitized = input.replace(/'/g, "''");
  
  // Remove null bytes
  sanitized = sanitized.replace(/\x00/g, '');
  
  // Escape backslashes
  sanitized = sanitized.replace(/\\/g, '\\\\');
  
  return sanitized;
}

/**
 * Validate identifier names (table names, column names)
 * Only allows alphanumeric characters and underscores
 */
export function validateIdentifier(identifier: string): boolean {
  if (typeof identifier !== 'string' || identifier.length === 0) {
    return false;
  }
  
  // Only allow alphanumeric and underscore, must start with letter
  const validPattern = /^[a-zA-Z][a-zA-Z0-9_]*$/;
  
  // Check against SQL reserved words
  const reservedWords = [
    'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'CREATE', 'ALTER',
    'TABLE', 'DATABASE', 'INDEX', 'VIEW', 'GRANT', 'REVOKE', 'TRUNCATE',
    'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'NULL', 'TRUE', 'FALSE',
    'UNION', 'JOIN', 'ON', 'AS', 'IN', 'LIKE', 'BETWEEN', 'EXISTS',
    'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'INTO', 'VALUES'
  ];
  
  return validPattern.test(identifier) && 
         !reservedWords.includes(identifier.toUpperCase());
}

/**
 * Safe identifier escaping for dynamic table/column names
 * Use this when you must use dynamic identifiers
 */
export function escapeIdentifier(identifier: string): string {
  if (!validateIdentifier(identifier)) {
    throw new Error(`Invalid SQL identifier: ${identifier}`);
  }
  
  // Double-quote the identifier for PostgreSQL
  return `"${identifier}"`;
}

/**
 * Create a parameterized query builder
 * Prevents SQL injection by using placeholders
 */
export class SafeQueryBuilder {
  private query: string = '';
  private params: unknown[] = [];
  private paramIndex: number = 1;

  select(columns: string[]): this {
    const safeColumns = columns.map(col => {
      if (col === '*') return '*';
      if (!validateIdentifier(col)) {
        throw new Error(`Invalid column name: ${col}`);
      }
      return escapeIdentifier(col);
    });
    this.query = `SELECT ${safeColumns.join(', ')}`;
    return this;
  }

  from(table: string): this {
    if (!validateIdentifier(table)) {
      throw new Error(`Invalid table name: ${table}`);
    }
    this.query += ` FROM ${escapeIdentifier(table)}`;
    return this;
  }

  where(column: string, operator: '=' | '!=' | '<' | '>' | '<=' | '>=' | 'LIKE' | 'IN', value: unknown): this {
    if (!validateIdentifier(column)) {
      throw new Error(`Invalid column name: ${column}`);
    }
    
    const validOperators = ['=', '!=', '<', '>', '<=', '>=', 'LIKE', 'IN'];
    if (!validOperators.includes(operator)) {
      throw new Error(`Invalid operator: ${operator}`);
    }

    this.query += ` WHERE ${escapeIdentifier(column)} ${operator} $${this.paramIndex}`;
    this.params.push(value);
    this.paramIndex++;
    return this;
  }

  and(column: string, operator: '=' | '!=' | '<' | '>' | '<=' | '>=' | 'LIKE', value: unknown): this {
    if (!validateIdentifier(column)) {
      throw new Error(`Invalid column name: ${column}`);
    }
    
    this.query += ` AND ${escapeIdentifier(column)} ${operator} $${this.paramIndex}`;
    this.params.push(value);
    this.paramIndex++;
    return this;
  }

  orderBy(column: string, direction: 'ASC' | 'DESC' = 'ASC'): this {
    if (!validateIdentifier(column)) {
      throw new Error(`Invalid column name: ${column}`);
    }
    this.query += ` ORDER BY ${escapeIdentifier(column)} ${direction}`;
    return this;
  }

  limit(count: number): this {
    if (!Number.isInteger(count) || count < 0) {
      throw new Error('Limit must be a non-negative integer');
    }
    this.query += ` LIMIT $${this.paramIndex}`;
    this.params.push(count);
    this.paramIndex++;
    return this;
  }

  build(): { query: string; params: unknown[] } {
    return {
      query: this.query,
      params: this.params
    };
  }
}

/**
 * Database connection string builder with validation
 */
export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl?: boolean;
}

export function buildConnectionString(config: DatabaseConfig): string {
  // Validate host (no special characters except . and -)
  if (!/^[a-zA-Z0-9.-]+$/.test(config.host)) {
    throw new Error('Invalid database host');
  }
  
  // Validate port
  if (!Number.isInteger(config.port) || config.port < 1 || config.port > 65535) {
    throw new Error('Invalid database port');
  }
  
  // Validate database name
  if (!validateIdentifier(config.database)) {
    throw new Error('Invalid database name');
  }
  
  // URL encode password to handle special characters
  const encodedPassword = encodeURIComponent(config.password);
  const encodedUser = encodeURIComponent(config.user);
  
  const sslParam = config.ssl ? '?sslmode=require' : '';
  
  return `postgresql://${encodedUser}:${encodedPassword}@${config.host}:${config.port}/${config.database}${sslParam}`;
}

/**
 * Check if a string looks like it might contain SQL injection attempts
 */
export function detectSQLInjection(input: string): boolean {
  const injectionPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE)\b)/i,
    /(\b(UNION|JOIN|OR|AND)\b.*=)/i,
    /('|\"|;|--|\*|\/\*|\*\/)/,
    /(0x[0-9a-fA-F]+)/,
    /(\b(EXEC|EXECUTE|SCRIPT|JAVASCRIPT)\b)/i,
    /(CHAR\s*\(\s*\d+\s*\))/i,
    /(CONCAT\s*\()/i,
  ];
  
  return injectionPatterns.some(pattern => pattern.test(input));
}

/**
 * Log suspicious activity for security monitoring
 */
export function logSecurityEvent(event: {
  type: 'SQL_INJECTION_ATTEMPT' | 'INVALID_INPUT' | 'ACCESS_DENIED' | 'RATE_LIMIT';
  input?: string;
  source?: string;
  timestamp?: Date;
}): void {
  const logEntry = {
    ...event,
    timestamp: event.timestamp || new Date(),
    // Truncate input to prevent log injection
    input: event.input?.substring(0, 200),
  };
  
  // In production, send to security monitoring service
  console.warn('🚨 SECURITY EVENT:', JSON.stringify(logEntry));
}

// Export utilities
export const SQLSecurity = {
  sanitize: sanitizeSQL,
  validateIdentifier,
  escapeIdentifier,
  buildConnectionString,
  detectInjection: detectSQLInjection,
  logEvent: logSecurityEvent,
  QueryBuilder: SafeQueryBuilder,
};

export default SQLSecurity;

