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

