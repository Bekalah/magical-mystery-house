/**
 * Human, Fun, Interesting Interactions
 * 
 * @package @cathedral/shared
 * @license CC0-1.0 - Public Domain
 * 
 * Enterprise quality + Expensive school depth
 * But FUN, HUMAN, and INTERESTING
 * 
 * Better than corporate because it's ALIVE
 */

import React, { useState, useEffect } from 'react';
import '@cathedral/shared/src/styles/unified-professional.css';
import { WorldClassDesignSystem } from './world-class-design-system';

export interface HumanFunInteractionProps {
  children: React.ReactNode;
  personality?: 'playful' | 'warm' | 'surprising' | 'encouraging';
  enterpriseQuality?: boolean;
  schoolDepth?: boolean;
}

/**
 * Human, Fun, Interesting Component Wrapper
 * 
 * Adds delightful interactions to any component
 * Enterprise polish + human warmth
 */
export function HumanFunInteraction({
  children,
  personality = 'warm',
  enterpriseQuality = true,
  schoolDepth = true
}: HumanFunInteractionProps) {
  const [interactionState, setInteractionState] = useState({
    hovered: false,
    clicked: false,
    delighted: false
  });
  
  const designSystem = new WorldClassDesignSystem();
  const component = designSystem.createWorldClassComponent({
    type: 'interaction',
    enterpriseFeatures: [
      'Smooth 60fps animations',
      'Accessible keyboard navigation',
      'Screen reader support',
      'High contrast mode',
      'Performance optimized'
    ],
    funFeatures: [
      'Playful hover effects',
      'Delightful click feedback',
      'Surprising micro-interactions',
      'Celebratory success states',
      'Encouraging error messages'
    ],
    humanFeatures: [
      'Warm, friendly tone',
      'Supportive, not judgmental',
      'Emotional connection',
      'Storytelling elements',
      'Personal touch'
    ]
  });
  
  return (
    <div
      className="human-fun-interaction professional-theme"
      data-personality={personality}
      data-enterprise={enterpriseQuality}
      data-school={schoolDepth}
      onMouseEnter={() => setInteractionState(s => ({ ...s, hovered: true }))}
      onMouseLeave={() => setInteractionState(s => ({ ...s, hovered: false }))}
      onClick={() => {
        setInteractionState(s => ({ ...s, clicked: true, delighted: true }));
        setTimeout(() => setInteractionState(s => ({ ...s, clicked: false })), 300);
      }}
      style={{
        '--hover-scale': interactionState.hovered ? '1.02' : '1',
        '--click-scale': interactionState.clicked ? '0.98' : '1',
        '--delight-opacity': interactionState.delighted ? '1' : '0',
        transition: 'all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)'
      } as React.CSSProperties}
    >
      {children}
      
      {interactionState.delighted && (
        <div className="delight-indicator professional-theme">
          ✨
        </div>
      )}
    </div>
  );
}

/**
 * Playful Button
 * Enterprise quality + fun personality
 */
export function PlayfulButton({
  children,
  onClick,
  variant = 'primary',
  size = 'medium'
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'small' | 'medium' | 'large';
}) {
  const [clicked, setClicked] = useState(false);
  
  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      hover: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
      text: '#ffffff'
    },
    secondary: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      hover: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
      text: '#ffffff'
    },
    success: {
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      hover: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
      text: '#ffffff'
    },
    danger: {
      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      hover: 'linear-gradient(135deg, #fee140 0%, #fa709a 100%)',
      text: '#ffffff'
    }
  };
  
  const sizes = {
    small: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    medium: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
    large: { padding: '1rem 2rem', fontSize: '1.125rem' }
  };
  
  return (
    <HumanFunInteraction personality="playful">
      <button
        className="playful-button professional-theme"
        data-variant={variant}
        data-size={size}
        onClick={() => {
          setClicked(true);
          onClick();
          setTimeout(() => setClicked(false), 300);
        }}
        style={{
          background: variants[variant].background,
          color: variants[variant].text,
          ...sizes[size],
          border: 'none',
          borderRadius: '0.75rem',
          fontWeight: 600,
          cursor: 'pointer',
          transform: clicked ? 'scale(0.95)' : 'scale(1)',
          transition: 'all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = variants[variant].hover;
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = variants[variant].background;
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {children}
      </button>
    </HumanFunInteraction>
  );
}

/**
 * Encouraging Input
 * Enterprise accessibility + human warmth
 */
export function EncouragingInput({
  label,
  value,
  onChange,
  error,
  success,
  helperText
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  success?: boolean;
  helperText?: string;
}) {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className="encouraging-input professional-theme">
      <label style={{ 
        display: 'block', 
        marginBottom: '0.5rem',
        fontWeight: 500,
        color: error ? '#ef4444' : success ? '#10b981' : '#374151'
      }}>
        {label}
      </label>
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          border: `2px solid ${error ? '#ef4444' : success ? '#10b981' : focused ? '#667eea' : '#e5e7eb'}`,
          borderRadius: '0.5rem',
          fontSize: '1rem',
          transition: 'all 0.2s ease',
          outline: 'none',
          boxShadow: focused ? `0 0 0 3px ${error ? '#fee2e2' : success ? '#d1fae5' : '#eef2ff'}` : 'none'
        }}
      />
      
      {(error || success || helperText) && (
        <div style={{
          marginTop: '0.5rem',
          fontSize: '0.875rem',
          color: error ? '#ef4444' : success ? '#10b981' : '#6b7280'
        }}>
          {error && `💡 ${error}`}
          {success && !error && `✨ ${helperText || 'Looking good!'}`}
          {!error && !success && helperText && `💭 ${helperText}`}
        </div>
      )}
    </div>
  );
}

/**
 * Celebratory Success
 * Enterprise feedback + joyful celebration
 */
export function CelebratorySuccess({
  message,
  onDismiss
}: {
  message: string;
  onDismiss: () => void;
}) {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onDismiss]);
  
  return (
    <div
      className="celebratory-success professional-theme"
      style={{
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        padding: '1rem 1.5rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff',
        borderRadius: '0.75rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-1rem)',
        transition: 'all 0.3s ease',
        zIndex: 1000
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.5rem' }}>✨</span>
        <span style={{ fontWeight: 500 }}>{message}</span>
      </div>
    </div>
  );
}

