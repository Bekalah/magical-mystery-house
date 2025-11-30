/**
 * Duality Arcana Art System
 * 
 * @package @cathedral/shared
 * @license CC0-1.0 - Public Domain
 * 
 * Inspired by angelic/demonic duality with golden sacred geometry
 * But BETTER: Interactive, animated, 3D, alive, responsive
 * 
 * Features:
 * - Angelic figure (light, purity, golden crown/halo)
 * - Demonic figure (dark, power, armored, bat wings)
 * - Glowing golden vesica piscis pattern
 * - Dramatic lighting and shadows
 * - Painterly textures
 * - Interactive, animated, alive
 */

import React, { useEffect, useRef, useState } from 'react';
import '@cathedral/shared/src/styles/unified-professional.css';

export interface DualityArcanaConfig {
  // Figures
  angelicPresence: number; // 1-10
  demonicPresence: number; // 1-10
  contrast: number; // 1-10, light vs dark
  
  // Sacred Geometry
  vesicaPiscis: boolean;
  goldenPattern: boolean;
  geometricComplexity: number; // 1-10
  
  // Visual Quality
  painterlyTexture: boolean;
  dramaticLighting: boolean;
  depth: number; // 1-10, 3D depth
  
  // Interactivity
  interactive: boolean;
  animated: boolean;
  responsive: boolean;
}

/**
 * Duality Arcana Art Component
 * 
 * Better than static art because it's ALIVE and INTERACTIVE
 */
export function DualityArcanaArt({
  config = {
    angelicPresence: 10,
    demonicPresence: 10,
    contrast: 10,
    vesicaPiscis: true,
    goldenPattern: true,
    geometricComplexity: 10,
    painterlyTexture: true,
    dramaticLighting: true,
    depth: 10,
    interactive: true,
    animated: true,
    responsive: true
  }
}: {
  config?: Partial<DualityArcanaConfig>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);
  const [time, setTime] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const fullConfig: DualityArcanaConfig = {
    angelicPresence: 10,
    demonicPresence: 10,
    contrast: 10,
    vesicaPiscis: true,
    goldenPattern: true,
    geometricComplexity: 10,
    painterlyTexture: true,
    dramaticLighting: true,
    depth: 10,
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
      // Dark textured background
      drawTexturedBackground(ctx, canvas, fullConfig);
      
      // Draw vesica piscis pattern first (behind figures)
      if (fullConfig.vesicaPiscis) {
        drawVesicaPiscis(ctx, canvas, fullConfig, time, hovered);
      }
      
      // Draw golden geometric pattern
      if (fullConfig.goldenPattern) {
        drawGoldenPattern(ctx, canvas, fullConfig, time);
      }
      
      // Draw demonic figure (right side, darker)
      drawDemonicFigure(ctx, canvas, fullConfig, time, mousePos);
      
      // Draw angelic figure (left side, lighter)
      drawAngelicFigure(ctx, canvas, fullConfig, time, mousePos);
      
      // Add dramatic lighting effects
      if (fullConfig.dramaticLighting) {
        drawDramaticLighting(ctx, canvas, fullConfig, time);
      }
      
      if (fullConfig.animated) {
        setTime(t => t + 0.005);
        requestAnimationFrame(draw);
      }
    };
    
    draw();
  }, [fullConfig, time, hovered, mousePos]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  return (
    <div
      className="duality-arcana-art professional-theme"
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
        onMouseMove={handleMouseMove}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
      
      {fullConfig.interactive && (
        <div className="duality-controls professional-theme" style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '1rem',
          opacity: hovered ? 1 : 0.7,
          transition: 'opacity 0.3s ease'
        }}>
          <button onClick={() => setTime(t => t + 1)}>✨ Energize</button>
          <button onClick={() => setTime(0)}>🔄 Reset</button>
          <button onClick={() => setTime(t => t - 1)}>🌙 Shift</button>
        </div>
      )}
    </div>
  );
}

/**
 * Draw textured dark background
 */
function drawTexturedBackground(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: DualityArcanaConfig
) {
  // Base dark brown/black
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#1a0f0a');
  gradient.addColorStop(1, '#0a0503');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Painterly texture
  if (config.painterlyTexture) {
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 3;
      const opacity = Math.random() * 0.1;
      
      ctx.fillStyle = `rgba(139, 69, 19, ${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

/**
 * Draw vesica piscis pattern
 */
function drawVesicaPiscis(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: DualityArcanaConfig,
  time: number,
  hovered: boolean
) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.height * 0.4;
  
  const glowIntensity = hovered ? 1.5 : 1;
  
  // Glowing golden vesica piscis
  ctx.strokeStyle = `rgba(255, 215, 0, ${0.9 * glowIntensity})`;
  ctx.lineWidth = 3;
  ctx.shadowBlur = 30 * glowIntensity;
  ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
  
  // Left circle (angelic side)
  ctx.beginPath();
  ctx.arc(centerX - radius * 0.5, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();
  
  // Right circle (demonic side)
  ctx.beginPath();
  ctx.arc(centerX + radius * 0.5, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();
  
  // Central vertical line
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - radius * 1.2);
  ctx.lineTo(centerX, centerY + radius * 1.2);
  ctx.stroke();
  
  // Top convergence point
  drawStarburst(ctx, centerX, centerY - radius * 1.2, 25 + Math.sin(time) * 5, time);
  
  // Bottom convergence point
  drawStarburst(ctx, centerX, centerY + radius * 1.2, 20 + Math.cos(time) * 5, time);
  
  ctx.shadowBlur = 0;
}

/**
 * Draw golden geometric pattern
 */
function drawGoldenPattern(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: DualityArcanaConfig,
  time: number
) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  ctx.strokeStyle = 'rgba(255, 215, 0, 0.7)';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 15;
  ctx.shadowColor = 'rgba(255, 215, 0, 0.5)';
  
  // Complex geometric patterns
  const patternLayers = Math.floor(config.geometricComplexity / 2);
  
  for (let layer = 0; layer < patternLayers; layer++) {
    const scale = 0.3 + (layer * 0.1);
    const rotation = time * 0.1 + layer;
    
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);
    
    // Hexagonal pattern
    const sides = 6;
    const radius = canvas.height * 0.2;
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI * 2 / sides) * i;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.stroke();
    
    ctx.restore();
  }
  
  ctx.shadowBlur = 0;
}

/**
 * Draw angelic figure (left side)
 */
function drawAngelicFigure(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: DualityArcanaConfig,
  time: number,
  mousePos: { x: number; y: number }
) {
  const x = canvas.width * 0.25;
  const y = canvas.height * 0.5;
  const size = canvas.height * 0.4;
  
  // Soft warm lighting
  const lightX = mousePos.x < canvas.width / 2 ? mousePos.x : x;
  const lightY = mousePos.y;
  
  // Face (serene, contemplative)
  ctx.fillStyle = '#f5e6d3';
  ctx.beginPath();
  ctx.ellipse(x, y - size * 0.3, size * 0.15, size * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Golden crown/halo
  ctx.fillStyle = 'rgba(255, 215, 0, 0.9)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 20;
  ctx.shadowColor = 'rgba(255, 215, 0, 0.6)';
  
  // Crown base
  ctx.beginPath();
  ctx.arc(x, y - size * 0.45, size * 0.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Crown spikes
  for (let i = 0; i < 5; i++) {
    const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
    const spikeX = x + Math.cos(angle) * size * 0.12;
    const spikeY = y - size * 0.45 + Math.sin(angle) * size * 0.12;
    ctx.beginPath();
    ctx.moveTo(x, y - size * 0.45);
    ctx.lineTo(spikeX, spikeY);
    ctx.stroke();
  }
  
  // Long wavy blonde hair
  ctx.fillStyle = '#f4d03f';
  ctx.strokeStyle = '#d4a017';
  ctx.lineWidth = 1;
  
  // Hair updo
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI * 2 / 8) * i;
    const hairX = x + Math.cos(angle) * size * 0.2;
    const hairY = y - size * 0.3 + Math.sin(angle) * size * 0.15;
    ctx.beginPath();
    ctx.arc(hairX, hairY, size * 0.08, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Elegant cream gown
  ctx.fillStyle = '#f5f5dc';
  ctx.strokeStyle = '#e6e6d1';
  ctx.lineWidth = 2;
  
  // Dress body
  ctx.beginPath();
  ctx.ellipse(x, y, size * 0.2, size * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Off-shoulder neckline with gold trim
  ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, y - size * 0.15, size * 0.18, Math.PI, 0, false);
  ctx.stroke();
  
  // Voluminous sleeves
  ctx.fillStyle = '#f5f5dc';
  for (let side of [-1, 1]) {
    ctx.beginPath();
    ctx.ellipse(x + side * size * 0.25, y, size * 0.12, size * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  
  // Large feathered wings (white/cream)
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#e6e6d1';
  ctx.lineWidth = 2;
  
  for (let wing of [-1, 1]) {
    // Upper wing
    ctx.beginPath();
    ctx.ellipse(x + wing * size * 0.3, y - size * 0.2, size * 0.15, size * 0.4, 
                wing * 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Lower wing
    ctx.beginPath();
    ctx.ellipse(x + wing * size * 0.25, y + size * 0.1, size * 0.12, size * 0.3,
                wing * 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  
  // Clasped hands
  ctx.fillStyle = '#f5e6d3';
  ctx.beginPath();
  ctx.ellipse(x, y + size * 0.2, size * 0.08, size * 0.06, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.shadowBlur = 0;
}

/**
 * Draw demonic figure (right side)
 */
function drawDemonicFigure(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: DualityArcanaConfig,
  time: number,
  mousePos: { x: number; y: number }
) {
  const x = canvas.width * 0.75;
  const y = canvas.height * 0.5;
  const size = canvas.height * 0.4;
  
  // Dark metallic armor
  const armorColor = '#1a1a1a';
  const highlightColor = '#4a4a4a';
  
  // Face (stern, intense, dark)
  ctx.fillStyle = '#2d1b1b';
  ctx.beginPath();
  ctx.ellipse(x, y - size * 0.3, size * 0.15, size * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Horned helmet
  ctx.fillStyle = armorColor;
  ctx.strokeStyle = highlightColor;
  ctx.lineWidth = 2;
  
  // Helmet base
  ctx.beginPath();
  ctx.ellipse(x, y - size * 0.4, size * 0.18, size * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Horns
  for (let side of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(x + side * size * 0.1, y - size * 0.45);
    ctx.lineTo(x + side * size * 0.2, y - size * 0.6);
    ctx.lineTo(x + side * size * 0.15, y - size * 0.65);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  
  // Form-fitting dark armor
  ctx.fillStyle = armorColor;
  ctx.strokeStyle = highlightColor;
  
  // Chest plate with sculpted design
  ctx.beginPath();
  ctx.ellipse(x, y - size * 0.1, size * 0.22, size * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Armor segments
  for (let i = 0; i < 5; i++) {
    const segmentY = y - size * 0.1 + (i - 2) * size * 0.08;
    ctx.beginPath();
    ctx.ellipse(x, segmentY, size * 0.2, size * 0.05, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  // Spiked shoulder pads
  for (let side of [-1, 1]) {
    ctx.beginPath();
    ctx.ellipse(x + side * size * 0.28, y - size * 0.15, size * 0.1, size * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Spikes
    for (let j = 0; j < 3; j++) {
      const spikeAngle = (Math.PI / 3) * j - Math.PI / 2;
      const spikeX = x + side * size * 0.28 + Math.cos(spikeAngle) * size * 0.1;
      const spikeY = y - size * 0.15 + Math.sin(spikeAngle) * size * 0.1;
      ctx.beginPath();
      ctx.moveTo(x + side * size * 0.28, y - size * 0.15);
      ctx.lineTo(spikeX, spikeY);
      ctx.stroke();
    }
  }
  
  // Leathery bat-like wings (dark grey/black)
  ctx.fillStyle = '#2a2a2a';
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = 2;
  
  for (let wing of [-1, 1]) {
    // Upper wing (bat-like)
    ctx.beginPath();
    ctx.moveTo(x + wing * size * 0.2, y - size * 0.2);
    ctx.lineTo(x + wing * size * 0.4, y - size * 0.4);
    ctx.lineTo(x + wing * size * 0.35, y - size * 0.5);
    ctx.lineTo(x + wing * size * 0.25, y - size * 0.3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Wing membrane details
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    for (let j = 0; j < 3; j++) {
      const t = j / 3;
      ctx.beginPath();
      ctx.moveTo(x + wing * size * 0.2, y - size * 0.2);
      ctx.lineTo(
        x + wing * size * 0.4 * (1 - t) + wing * size * 0.35 * t,
        y - size * 0.4 * (1 - t) - size * 0.5 * t
      );
      ctx.stroke();
    }
    
    // Lower wing
    ctx.beginPath();
    ctx.moveTo(x + wing * size * 0.18, y + size * 0.1);
    ctx.lineTo(x + wing * size * 0.35, y + size * 0.3);
    ctx.lineTo(x + wing * size * 0.3, y + size * 0.4);
    ctx.lineTo(x + wing * size * 0.2, y + size * 0.15);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  
  // Clawed/armored hands
  ctx.fillStyle = armorColor;
  ctx.strokeStyle = highlightColor;
  for (let side of [-1, 1]) {
    ctx.beginPath();
    ctx.ellipse(x + side * size * 0.15, y + size * 0.25, size * 0.06, size * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  
  ctx.shadowBlur = 0;
}

/**
 * Draw dramatic lighting
 */
function drawDramaticLighting(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: DualityArcanaConfig,
  time: number
) {
  // Light from angelic side
  const lightGradient = ctx.createRadialGradient(
    canvas.width * 0.25, canvas.height * 0.5, 0,
    canvas.width * 0.25, canvas.height * 0.5, canvas.height * 0.6
  );
  lightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
  lightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  ctx.fillStyle = lightGradient;
  ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
  
  // Shadow from demonic side
  const shadowGradient = ctx.createRadialGradient(
    canvas.width * 0.75, canvas.height * 0.5, 0,
    canvas.width * 0.75, canvas.height * 0.5, canvas.height * 0.6
  );
  shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0.3)');
  shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
  ctx.fillStyle = shadowGradient;
  ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);
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
  ctx.fillStyle = `rgba(255, 215, 0, ${0.9 + Math.sin(time) * 0.1})`;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.lineWidth = 2;
  ctx.shadowBlur = size;
  ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
  
  const points = 8;
  ctx.beginPath();
  
  for (let i = 0; i < points * 2; i++) {
    const angle = (Math.PI * 2 / (points * 2)) * i + time;
    const r = i % 2 === 0 ? size : size * 0.5;
    const px = x + Math.cos(angle) * r;
    const py = y + Math.sin(angle) * r;
    
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

