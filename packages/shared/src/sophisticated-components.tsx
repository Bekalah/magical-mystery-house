/**
 * Sophisticated Components - High-End Perfection
 * 
 * @package @cathedral/shared
 * 
 * Museum-quality React components for entire monorepo
 * Based on McQueen Design Tokens + Master Art Principles
 */

import React from 'react';
import '@cathedral/shared/src/styles/unified-professional.css';

// ============================================================================
// SOPHISTICATED COMPONENTS
// ============================================================================

/**
 * ⚗️ SophisticatedProps - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface SophisticatedProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Glass Panel - Cathedral window aesthetic
 */
export const GlassPanel: React.FC<SophisticatedProps & {
  variant?: 'light' | 'dark' | 'amber' | 'violet';
}> = ({ children, className = '', style = {}, variant = 'light' }) => {
  return (
    <div 
      className={`glass-panel glass-panel-${variant} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

/**
 * Sophisticated Button - Never pill-shaped
 */
export const SophisticatedButton: React.FC<SophisticatedProps & {
  onClick?: () => void;
  disabled?: boolean;
}> = ({ children, className = '', style = {}, onClick, disabled = false }) => {
  return (
    <button
      className={`btn ${className}`}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

/**
 * Golden Ratio Container
 */
export const GoldenRatioContainer: React.FC<SophisticatedProps> = ({
  children,
  className = '',
  style = {}
}) => {
  return (
    <div
      className={`golden-ratio-container ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

// Export
export { GlassPanel, SophisticatedButton, GoldenRatioContainer };

