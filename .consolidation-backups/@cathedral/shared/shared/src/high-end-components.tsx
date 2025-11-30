/**
 * High-End Components - Sophisticated Perfection
 * 
 * @package @cathedral/shared
 * 
 * Museum-quality React components with:
 * - McQueen design tokens
 * - Master art principles
 * - Sacred geometry
 * - Sophisticated styling
 * - Perfect polish
 */

import React from 'react';
import '@cathedral/shared/src/styles/unified-professional.css';
import { mcqueenTokens } from '@cathedral/japanese-design-system/mcqueen-tokens';
import './styles/sophisticated.css';

// ============================================================================
// HIGH-END COMPONENTS
// ============================================================================

export interface SophisticatedComponentProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Glass Panel - Cathedral window aesthetic
 */
export const GlassPanel: React.FC<SophisticatedComponentProps & {
  variant?: 'light' | 'dark' | 'amber' | 'violet';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}> = ({ 
  children, 
  className = '', 
  style = {},
  variant = 'light',
  padding = 'lg'
}) => {
  const variantClass = `glass-panel-${variant}`;
  const paddingClass = `padding-${padding}`;
  
  return (
    <div 
      className={`glass-panel ${variantClass} ${paddingClass} ${className}`}
      style={{
        padding: mcqueenTokens.spacing[padding],
        ...style
      }}
    >
      {children}
    </div>
  );
};

/**
 * Sophisticated Button - Never pill-shaped
 */
export const SophisticatedButton: React.FC<SophisticatedComponentProps & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
}> = ({
  children,
  className = '',
  style = {},
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false
}) => {
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  
  return (
    <button
      className={`btn ${variantClass} ${sizeClass} ${className}`}
      style={{
        ...style
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

/**
 * Sophisticated Card - Asymmetric, breathing
 */
export const SophisticatedCard: React.FC<SophisticatedComponentProps & {
  variant?: 'default' | 'elevated' | 'inset';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}> = ({
  children,
  className = '',
  style = {},
  variant = 'default',
  padding = 'lg'
}) => {
  const variantClass = `card-${variant}`;
  const paddingClass = `padding-${padding}`;
  
  return (
    <div
      className={`card ${variantClass} ${paddingClass} ${className}`}
      style={{
        padding: mcqueenTokens.spacing[padding],
        ...style
      }}
    >
      {children}
    </div>
  );
};

/**
 * Golden Ratio Container
 */
export const GoldenRatioContainer: React.FC<SophisticatedComponentProps & {
  direction?: 'horizontal' | 'vertical';
}> = ({
  children,
  className = '',
  style = {},
  direction = 'horizontal'
}) => {
  const directionClass = `golden-ratio-${direction}`;
  
  return (
    <div
      className={`golden-ratio-container ${directionClass} ${className}`}
      style={{
        ...style
      }}
    >
      {children}
    </div>
  );
};

/**
 * Sophisticated Typography
 */
export const SophisticatedTypography: React.FC<SophisticatedComponentProps & {
  variant?: 'display' | 'body' | 'ui' | 'mono';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  weight?: 'normal' | 'medium' | 'bold';
  color?: 'gold' | 'champagne' | 'violet' | 'amber';
}> = ({
  children,
  className = '',
  style = {},
  variant = 'body',
  size = 'base',
  weight = 'normal',
  color = 'champagne'
}) => {
  const variantClass = `typography-${variant}`;
  const sizeClass = `text-${size}`;
  const weightClass = `font-${weight}`;
  const colorClass = `text-${color}`;
  
  const fontFamily = variant === 'display' ? mcqueenTokens.typography.fontDisplay :
                     variant === 'body' ? mcqueenTokens.typography.fontBody :
                     variant === 'ui' ? mcqueenTokens.typography.fontUi :
                     mcqueenTokens.typography.fontMono;
  
  const fontSize = mcqueenTokens.typography.scale[size];
  
  return (
    <span
      className={`${variantClass} ${sizeClass} ${weightClass} ${colorClass} ${className}`}
      style={{
        fontFamily,
        fontSize,
        ...style
      }}
    >
      {children}
    </span>
  );
};

/**
 * Sacred Geometry Pattern
 */
export const SacredGeometryPattern: React.FC<SophisticatedComponentProps & {
  pattern: 'vesica-piscis' | 'pentagram' | 'octagon' | 'flower-of-life' | 'metatron' | 'fibonacci';
  size?: number;
  color?: string;
}> = ({
  className = '',
  style = {},
  pattern,
  size = 200,
  color = mcqueenTokens.colors.burnishedGold
}) => {
  return (
    <div
      className={`sacred-geometry-${pattern} ${className}`}
      style={{
        width: size,
        height: size,
        color,
        ...style
      }}
    >
      {/* Pattern will be rendered via CSS or SVG */}
    </div>
  );
};

/**
 * Sophisticated Layout
 */
export const SophisticatedLayout: React.FC<SophisticatedComponentProps & {
  layout?: 'golden-ratio' | 'asymmetric' | 'breathing';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}> = ({
  children,
  className = '',
  style = {},
  layout = 'golden-ratio',
  gap = 'lg'
}) => {
  const layoutClass = `layout-${layout}`;
  const gapClass = `gap-${gap}`;
  
  return (
    <div
      className={`sophisticated-layout ${layoutClass} ${gapClass} ${className}`}
      style={{
        gap: mcqueenTokens.spacing[gap],
        ...style
      }}
    >
      {children}
    </div>
  );
};

/**
 * Sophisticated Animation
 */
export const SophisticatedAnimation: React.FC<SophisticatedComponentProps & {
  animation?: 'fadeIn' | 'reveal' | 'breathe' | 'shimmer';
  duration?: 'instant' | 'fast' | 'normal' | 'slow' | 'glacial' | 'reveal';
}> = ({
  children,
  className = '',
  style = {},
  animation = 'fadeIn',
  duration = 'reveal'
}) => {
  const animationClass = animation;
  const durationClass = `duration-${duration}`;
  
  return (
    <div
      className={`${animationClass} ${durationClass} ${className}`}
      style={{
        ...style
      }}
    >
      {children}
    </div>
  );
};

/**
 * Theme-Connected Component
 */
export const ThemeConnectedComponent: React.FC<SophisticatedComponentProps & {
  theme: 'alchemy' | 'esotericism' | 'art' | 'science' | 'mysticism' | 'psychology' | 'math' | 'sociology';
  connection?: string[];
}> = ({
  children,
  className = '',
  style = {},
  theme,
  connection = []
}) => {
  const themeClass = `theme-${theme}`;
  const connectionClass = connection.map(c => `connected-${c}`).join(' ');
  
  return (
    <div
      className={`theme-connected ${themeClass} ${connectionClass} ${className}`}
      style={{
        ...style
      }}
    >
      {children}
    </div>
  );
};

// Export all components
export {
  GlassPanel,
  SophisticatedButton,
  SophisticatedCard,
  GoldenRatioContainer,
  SophisticatedTypography,
  SacredGeometryPattern,
  SophisticatedLayout,
  SophisticatedAnimation,
  ThemeConnectedComponent
};

