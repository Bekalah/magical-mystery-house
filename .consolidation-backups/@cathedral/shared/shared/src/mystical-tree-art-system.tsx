/**
 * Mystical Tree Art System
 * 
 * @package @cathedral/shared
 * @license CC0-1.0 - Public Domain
 * 
 * Inspired by cosmic trees of life, ancient wisdom, magical energy
 * But BETTER: Interactive, 3D, animated, alive
 * 
 * Features:
 * - Glowing golden branches with runic patterns
 * - Serpentine roots with energy flows
 * - Cosmic golden rings/halos
 * - Dramatic sky transitions (starry to warm)
 * - Lightning and energy streams
 * - Interactive, responsive, alive
 */

import React, { useEffect, useRef, useState } from 'react';
import '@cathedral/shared/src/styles/unified-professional.css';
import { WorldClassDesignSystem } from './world-class-design-system';

export interface MysticalTreeConfig {
  // Tree Properties
  treeSize: number; // 1-10
  branchGlow: number; // 1-10, golden light intensity
  rootComplexity: number; // 1-10, serpentine root detail
  energyLevel: number; // 1-10, magical energy
  
  // Cosmic Elements
  goldenRing: boolean;
  starbursts: number; // Number of golden starbursts
  lightning: boolean;
  energyStreams: boolean;
  
  // Sky
  skyTransition: 'cosmic' | 'sunset' | 'storm' | 'aurora';
  starDensity: number; // 1-10
  
  // Interactivity
  interactive: boolean;
  animated: boolean;
  responsive: boolean;
}

/**
 * Mystical Tree Art Component
 * 
 * Better than static art because it's ALIVE
 */
export function MysticalTreeArt({
  config = {
    treeSize: 8,
    branchGlow: 10,
    rootComplexity: 9,
    energyLevel: 10,
    goldenRing: true,
    starbursts: 3,
    lightning: true,
    energyStreams: true,
    skyTransition: 'cosmic',
    starDensity: 10,
    interactive: true,
    animated: true,
    responsive: true
  }
}: {
  config?: Partial<MysticalTreeConfig>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);
  const [time, setTime] = useState(0);
  
  const fullConfig: MysticalTreeConfig = {
    treeSize: 8,
    branchGlow: 10,
    rootComplexity: 9,
    energyLevel: 10,
    goldenRing: true,
    starbursts: 3,
    lightning: true,
    energyStreams: true,
    skyTransition: 'cosmic',
    starDensity: 10,
    interactive: true,
    animated: true,
    responsive: true,
    ...config
  };
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const draw = () => {
      // Clear
      ctx.fillStyle = getSkyColor(fullConfig.skyTransition, time);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      drawStars(ctx, canvas, fullConfig.starDensity, time);
      
      // Draw lightning
      if (fullConfig.lightning) {
        drawLightning(ctx, canvas, time);
      }
      
      // Draw golden ring
      if (fullConfig.goldenRing) {
        drawGoldenRing(ctx, canvas, fullConfig.starbursts, time);
      }
      
      // Draw tree
      drawTree(ctx, canvas, fullConfig, time, hovered);
      
      // Draw energy streams
      if (fullConfig.energyStreams) {
        drawEnergyStreams(ctx, canvas, fullConfig, time);
      }
      
      if (fullConfig.animated) {
        setTime(t => t + 0.01);
        requestAnimationFrame(draw);
      }
    };
    
    draw();
  }, [fullConfig, time, hovered]);
  
  return (
    <div
      className="mystical-tree-art professional-theme"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        cursor: fullConfig.interactive ? 'pointer' : 'default'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
      
      {fullConfig.interactive && (
        <div className="tree-interactions professional-theme" style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          right: '1rem',
          display: 'flex',
          gap: '0.5rem',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}>
          <button onClick={() => setTime(t => t + 1)}>✨ Energize</button>
          <button onClick={() => setTime(0)}>🔄 Reset</button>
        </div>
      )}
    </div>
  );
}

/**
 * Draw the mystical tree
 */
function drawTree(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: MysticalTreeConfig,
  time: number,
  hovered: boolean
) {
  const centerX = canvas.width / 2;
  const baseY = canvas.height * 0.85;
  const treeHeight = canvas.height * 0.6 * (config.treeSize / 10);
  
  // Draw serpentine roots
  drawSerpentineRoots(ctx, centerX, baseY, config.rootComplexity, time);
  
  // Draw trunk
  ctx.fillStyle = '#4a3728';
  ctx.strokeStyle = '#2a1f18';
  ctx.lineWidth = 3;
  
  const trunkWidth = 40 + (config.treeSize * 5);
  ctx.beginPath();
  ctx.ellipse(centerX, baseY - treeHeight / 2, trunkWidth / 2, treeHeight / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Draw glowing branches
  drawGlowingBranches(ctx, centerX, baseY - treeHeight, treeHeight, config, time, hovered);
  
  // Draw central starburst
  drawStarburst(ctx, centerX, baseY - treeHeight, config.branchGlow * 20, time);
  
  // Draw base starburst
  drawStarburst(ctx, centerX, baseY, config.energyLevel * 15, time);
}

/**
 * Draw serpentine roots
 */
function drawSerpentineRoots(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  complexity: number,
  time: number
) {
  ctx.strokeStyle = '#3a2a1f';
  ctx.fillStyle = '#2a1f18';
  ctx.lineWidth = 8;
  
  const rootCount = 5 + Math.floor(complexity / 2);
  
  for (let i = 0; i < rootCount; i++) {
    const angle = (Math.PI * 2 / rootCount) * i + Math.sin(time + i) * 0.3;
    const length = 80 + Math.random() * 60;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    // Serpentine curve
    for (let j = 0; j < 20; j++) {
      const t = j / 20;
      const offsetX = Math.sin(time + t * Math.PI * 2 + i) * 15;
      const offsetY = Math.cos(time + t * Math.PI * 2 + i) * 10;
      const px = x + Math.cos(angle) * length * t + offsetX;
      const py = y + Math.sin(angle) * length * t + offsetY;
      
      if (j === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    
    ctx.stroke();
  }
}

/**
 * Draw glowing branches with runic patterns
 */
function drawGlowingBranches(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  height: number,
  config: MysticalTreeConfig,
  time: number,
  hovered: boolean
) {
  const glowIntensity = config.branchGlow * (hovered ? 1.5 : 1);
  
  // Main branches
  const branchCount = 8;
  for (let i = 0; i < branchCount; i++) {
    const angle = (Math.PI * 2 / branchCount) * i + Math.sin(time + i) * 0.2;
    const branchLength = height * 0.4 + Math.random() * height * 0.2;
    
    // Glowing golden branch
    ctx.strokeStyle = `rgba(255, 215, 0, ${glowIntensity / 10})`;
    ctx.lineWidth = 4 + glowIntensity / 2;
    ctx.shadowBlur = glowIntensity * 3;
    ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    // Branch curve
    for (let j = 0; j < 15; j++) {
      const t = j / 15;
      const curve = Math.sin(t * Math.PI) * 0.3;
      const px = x + Math.cos(angle + curve) * branchLength * t;
      const py = y - Math.sin(angle + curve) * branchLength * t;
      
      if (j === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    
    ctx.stroke();
    
    // Runic patterns on branches
    drawRunicPatterns(ctx, x, y, angle, branchLength, time);
  }
  
  ctx.shadowBlur = 0;
}

/**
 * Draw runic patterns
 */
function drawRunicPatterns(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  length: number,
  time: number
) {
  ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)';
  ctx.lineWidth = 2;
  
  const patternCount = 5;
  for (let i = 0; i < patternCount; i++) {
    const t = (i + 1) / (patternCount + 1);
    const px = x + Math.cos(angle) * length * t;
    const py = y - Math.sin(angle) * length * t;
    
    // Simple runic symbol
    ctx.beginPath();
    ctx.moveTo(px - 5, py);
    ctx.lineTo(px + 5, py);
    ctx.moveTo(px, py - 5);
    ctx.lineTo(px, py + 5);
    ctx.moveTo(px - 3, py - 3);
    ctx.lineTo(px + 3, py + 3);
    ctx.stroke();
  }
}

/**
 * Draw golden ring/halo
 */
function drawGoldenRing(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  starburstCount: number,
  time: number
) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height * 0.4;
  const radius = canvas.height * 0.3;
  
  // Main ring
  ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)';
  ctx.lineWidth = 4;
  ctx.shadowBlur = 20;
  ctx.shadowColor = 'rgba(255, 215, 0, 0.6)';
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();
  
  // Starbursts
  for (let i = 0; i < starburstCount; i++) {
    const angle = (Math.PI * 2 / starburstCount) * i;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    
    drawStarburst(ctx, x, y, 30 + Math.sin(time + i) * 10, time);
  }
  
  ctx.shadowBlur = 0;
}

/**
 * Draw starburst
 */
function drawStarburst(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  time: number
) {
  ctx.fillStyle = `rgba(255, 215, 0, ${0.8 + Math.sin(time) * 0.2})`;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.lineWidth = 2;
  ctx.shadowBlur = size;
  ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
  
  const points = 8;
  ctx.beginPath();
  
  for (let i = 0; i < points * 2; i++) {
    const angle = (Math.PI * 2 / (points * 2)) * i;
    const r = i % 2 === 0 ? size : size * 0.5;
    const px = x + Math.cos(angle + time) * r;
    const py = y + Math.sin(angle + time) * r;
    
    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }
  
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;
}

/**
 * Draw energy streams
 */
function drawEnergyStreams(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: MysticalTreeConfig,
  time: number
) {
  const centerX = canvas.width / 2;
  const topY = canvas.height * 0.25;
  
  ctx.strokeStyle = 'rgba(135, 206, 250, 0.6)';
  ctx.lineWidth = 3;
  ctx.shadowBlur = 15;
  ctx.shadowColor = 'rgba(135, 206, 250, 0.4)';
  
  const streamCount = 5;
  for (let i = 0; i < streamCount; i++) {
    const offsetX = (i - streamCount / 2) * 30;
    const startY = topY;
    const endY = canvas.height * 0.6;
    
    ctx.beginPath();
    ctx.moveTo(centerX + offsetX, startY);
    
    // Wavy stream
    for (let j = 0; j < 20; j++) {
      const t = j / 20;
      const wave = Math.sin(time * 2 + t * Math.PI * 4) * 10;
      const px = centerX + offsetX + wave;
      const py = startY + (endY - startY) * t;
      
      ctx.lineTo(px, py);
    }
    
    ctx.stroke();
  }
  
  ctx.shadowBlur = 0;
}

/**
 * Draw stars
 */
function drawStars(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  density: number,
  time: number
) {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  
  const starCount = Math.floor(density * 50);
  for (let i = 0; i < starCount; i++) {
    const x = (i * 137.508) % canvas.width;
    const y = (i * 197.123) % (canvas.height * 0.7);
    const size = 1 + Math.sin(time + i) * 0.5;
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * Draw lightning
 */
function drawLightning(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  time: number
) {
  if (Math.random() > 0.98) {
    ctx.strokeStyle = 'rgba(135, 206, 250, 0.9)';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'rgba(135, 206, 250, 0.6)';
    
    const x = canvas.width * 0.7 + Math.random() * canvas.width * 0.2;
    const startY = 0;
    const endY = canvas.height * 0.5;
    
    ctx.beginPath();
    ctx.moveTo(x, startY);
    
    let currentY = startY;
    let currentX = x;
    
    while (currentY < endY) {
      currentY += 20 + Math.random() * 30;
      currentX += (Math.random() - 0.5) * 40;
      ctx.lineTo(currentX, currentY);
    }
    
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
}

/**
 * Get sky color based on transition type
 */
function getSkyColor(transition: string, time: number): string {
  switch (transition) {
    case 'cosmic':
      return `linear-gradient(to bottom, #0a0e27 0%, #1a1f3a 50%, #2d1b3d 100%)`;
    case 'sunset':
      return `linear-gradient(to bottom, #1a1f3a 0%, #3d2a1f 50%, #ff6b35 100%)`;
    case 'storm':
      return `linear-gradient(to bottom, #0d1117 0%, #1a1f2e 50%, #2d1b3d 100%)`;
    case 'aurora':
      return `linear-gradient(to bottom, #0a0e27 0%, #1a3a2a 50%, #2d3a1b 100%)`;
    default:
      return '#0a0e27';
  }
}

