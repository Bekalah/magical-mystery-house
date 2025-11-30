/**
 * Codex 144:99 Security Module
 * 
 * Security validation and safety measures for Codex data structures
 * Based on security research: input validation, data integrity, schema validation
 * 
 * @license CC0-1.0 - Public Domain
 */

import { CodexNode, CodexDepth } from './Codex144Engine';

export interface SecurityValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface SecurityConfig {
  maxNodeIndex: number;        // 143
  maxDepthIndex: number;       // 98
  minConsciousnessLevel: number; // 0
  maxConsciousnessLevel: number; // 21
  minFrequency: number;        // Solfeggio minimum
  maxFrequency: number;        // Solfeggio maximum
  maxStringLength: number;     // 10000
  maxArrayLength: number;      // 1000
  allowExternalData: boolean;  // false
  requireSanitization: boolean;  // true
}

export const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  maxNodeIndex: 143,
  maxDepthIndex: 98,
  minConsciousnessLevel: 0,
  maxConsciousnessLevel: 21,
  minFrequency: 396,  // UT - lowest Solfeggio
  maxFrequency: 963,  // SI - highest Solfeggio
  maxStringLength: 10000,
  maxArrayLength: 1000,
  allowExternalData: false,
  requireSanitization: true
};

export class Codex144Security {
  private config: SecurityConfig;

  constructor(config: Partial<SecurityConfig> = {}) {
    this.config = { ...DEFAULT_SECURITY_CONFIG, ...config };
  }

  /**
   * Validate a CodexNode for security
   */
  validateNode(node: CodexNode): SecurityValidation {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate nodeIndex
    if (typeof node.nodeIndex !== 'number' || node.nodeIndex < 0 || node.nodeIndex > this.config.maxNodeIndex) {
      errors.push(`Invalid nodeIndex: ${node.nodeIndex} (must be 0-${this.config.maxNodeIndex})`);
    }

    // Validate consciousnessLevel
    if (typeof node.consciousnessLevel !== 'number' || 
        node.consciousnessLevel < this.config.minConsciousnessLevel || 
        node.consciousnessLevel > this.config.maxConsciousnessLevel) {
      errors.push(`Invalid consciousnessLevel: ${node.consciousnessLevel} (must be ${this.config.minConsciousnessLevel}-${this.config.maxConsciousnessLevel})`);
    }

    // Validate frequency
    if (typeof node.frequency !== 'number' || 
        node.frequency < this.config.minFrequency || 
        node.frequency > this.config.maxFrequency) {
      warnings.push(`Frequency ${node.frequency} outside Solfeggio range (${this.config.minFrequency}-${this.config.maxFrequency})`);
    }

    // Validate strings
    if (typeof node.name !== 'string' || node.name.length > this.config.maxStringLength) {
      errors.push(`Invalid name: length ${node.name?.length || 0} exceeds max ${this.config.maxStringLength}`);
    }

    if (typeof node.description !== 'string' || node.description.length > this.config.maxStringLength) {
      errors.push(`Invalid description: length ${node.description?.length || 0} exceeds max ${this.config.maxStringLength}`);
    }

    // Sanitize strings if required
    if (this.config.requireSanitization) {
      if (node.name && this.containsUnsafeChars(node.name)) {
        errors.push(`Name contains unsafe characters`);
      }
      if (node.description && this.containsUnsafeChars(node.description)) {
        errors.push(`Description contains unsafe characters`);
      }
    }

    // Validate gate mappings
    if (node.gateMappings) {
      if (node.gateMappings.primaryGate < 1 || node.gateMappings.primaryGate > 99) {
        errors.push(`Invalid primaryGate: ${node.gateMappings.primaryGate}`);
      }
      if (node.gateMappings.harmonicGate < 1 || node.gateMappings.harmonicGate > 99) {
        errors.push(`Invalid harmonicGate: ${node.gateMappings.harmonicGate}`);
      }
      if (node.gateMappings.spiralGate < 1 || node.gateMappings.spiralGate > 99) {
        errors.push(`Invalid spiralGate: ${node.gateMappings.spiralGate}`);
      }
    }

    // Validate chapel mapping
    if (node.chapelMapping) {
      if (node.chapelMapping.chapelNumber < 1 || node.chapelMapping.chapelNumber > 8) {
        errors.push(`Invalid chapelNumber: ${node.chapelMapping.chapelNumber}`);
      }
      if (node.chapelMapping.folioNumber < 0 || node.chapelMapping.folioNumber > 143) {
        errors.push(`Invalid folioNumber: ${node.chapelMapping.folioNumber}`);
      }
    }

    // Validate quality parameters
    if (node.qualityParameters) {
      const params = node.qualityParameters;
      if (typeof params.intensity !== 'number' || params.intensity < 0 || params.intensity > 1) {
        warnings.push(`Intensity ${params.intensity} should be 0-1`);
      }
      if (typeof params.sophistication !== 'number' || params.sophistication < 0 || params.sophistication > 1) {
        warnings.push(`Sophistication ${params.sophistication} should be 0-1`);
      }
    }

    // Validate correspondences (check for unsafe data)
    if (node.correspondences && this.config.requireSanitization) {
      if (this.containsUnsafeData(node.correspondences)) {
        errors.push(`Correspondences contain unsafe data`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Validate a CodexDepth for security
   */
  validateDepth(depth: CodexDepth): SecurityValidation {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate depthIndex
    if (typeof depth.depthIndex !== 'number' || depth.depthIndex < 0 || depth.depthIndex > this.config.maxDepthIndex) {
      errors.push(`Invalid depthIndex: ${depth.depthIndex} (must be 0-${this.config.maxDepthIndex})`);
    }

    // Validate consciousnessEvolution
    if (typeof depth.consciousnessEvolution !== 'number' || 
        depth.consciousnessEvolution < this.config.minConsciousnessLevel || 
        depth.consciousnessEvolution > this.config.maxConsciousnessLevel) {
      errors.push(`Invalid consciousnessEvolution: ${depth.consciousnessEvolution}`);
    }

    // Validate dissolutionLevel
    if (typeof depth.dissolutionLevel !== 'number' || depth.dissolutionLevel < 0 || depth.dissolutionLevel > 10) {
      errors.push(`Invalid dissolutionLevel: ${depth.dissolutionLevel} (must be 0-10)`);
    }

    // Validate arrays
    if (Array.isArray(depth.nodeConnections)) {
      if (depth.nodeConnections.length > this.config.maxArrayLength) {
        errors.push(`nodeConnections array too long: ${depth.nodeConnections.length}`);
      }
      for (const node of depth.nodeConnections) {
        if (typeof node !== 'number' || node < 0 || node > this.config.maxNodeIndex) {
          errors.push(`Invalid node connection: ${node}`);
        }
      }
    }

    if (Array.isArray(depth.gateConnections)) {
      if (depth.gateConnections.length > this.config.maxArrayLength) {
        errors.push(`gateConnections array too long: ${depth.gateConnections.length}`);
      }
      for (const gate of depth.gateConnections) {
        if (typeof gate !== 'number' || gate < 1 || gate > 99) {
          errors.push(`Invalid gate connection: ${gate}`);
        }
      }
    }

    // Validate strings
    if (typeof depth.name !== 'string' || depth.name.length > this.config.maxStringLength) {
      errors.push(`Invalid depth name: length ${depth.name?.length || 0}`);
    }

    if (this.config.requireSanitization && depth.name && this.containsUnsafeChars(depth.name)) {
      errors.push(`Depth name contains unsafe characters`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Sanitize input data
   */
  sanitizeInput(input: unknown): unknown {
    if (typeof input === 'string') {
      return this.sanitizeString(input);
    }
    if (Array.isArray(input)) {
      return input.map(item => this.sanitizeInput(item));
    }
    if (input && typeof input === 'object') {
      const sanitized: Record<string, any> = {};
      for (const [key, value] of Object.entries(input)) {
        const sanitizedKey = this.sanitizeString(key);
        sanitized[sanitizedKey] = this.sanitizeInput(value);
      }
      return sanitized;
    }
    return input;
  }

  /**
   * Sanitize string input
   */
  private sanitizeString(str: string): string {
    // Remove null bytes
    str = str.replace(/\0/g, '');
    
    // Remove control characters except newlines and tabs
    str = str.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
    
    // Limit length
    if (str.length > this.config.maxStringLength) {
      str = str.substring(0, this.config.maxStringLength);
    }
    
    return str;
  }

  /**
   * Check for unsafe characters
   */
  private containsUnsafeChars(str: string): boolean {
    // Check for script injection patterns
    if (/<script|javascript:|on\w+\s*=/i.test(str)) {
      return true;
    }
    
    // Check for SQL injection patterns
    if (/(union|select|insert|update|delete|drop|exec|execute)\s+/i.test(str)) {
      return true;
    }
    
    // Check for null bytes
    if (str.includes('\0')) {
      return true;
    }
    
    return false;
  }

  /**
   * Check for unsafe data in objects
   */
  private containsUnsafeData(obj: unknown): boolean {
    if (typeof obj === 'string') {
      return this.containsUnsafeChars(obj);
    }
    if (Array.isArray(obj)) {
      return obj.some(item => this.containsUnsafeData(item));
    }
    if (obj && typeof obj === 'object') {
      return Object.values(obj).some(value => this.containsUnsafeData(value));
    }
    return false;
  }

  /**
   * Validate external data before importing
   */
  validateExternalData(data: any): SecurityValidation {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!this.config.allowExternalData) {
      errors.push('External data import is disabled for security');
      return { isValid: false, errors, warnings };
    }

    // Check for circular references
    const seen = new WeakSet();
    const checkCircular = (obj: any, path: string[] = []): boolean => {
      if (obj === null || typeof obj !== 'object') {
        return false;
      }
      if (seen.has(obj)) {
        return true;
      }
      seen.add(obj);
      
      for (const [key, value] of Object.entries(obj)) {
        if (checkCircular(value, [...path, key])) {
          return true;
        }
      }
      
      seen.delete(obj);
      return false;
    };

    if (checkCircular(data)) {
      errors.push('Circular reference detected in external data');
    }

    // Check data size
    const dataSize = JSON.stringify(data).length;
    if (dataSize > 10 * 1024 * 1024) { // 10MB limit
      errors.push(`External data too large: ${dataSize} bytes`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
}

export default Codex144Security;

