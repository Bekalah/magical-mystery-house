#!/usr/bin/env node
/**
 * Build Visual System CSS
 * 
 * Generates complete CSS file with all visual effects
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { generateCompleteVisualSystem } from './VisualComponents.js';
import { generateAllAnimations } from './Animations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Generate complete CSS
const css = `
/* ⚗️ Cathedral Visual Engine - Complete Visual System */
/* Generated: ${new Date().toISOString()} */
/* License: CC0-1.0 - Public Domain */

${generateCompleteVisualSystem()}
${generateAllAnimations()}
`;

// Write to dist
const distDir = path.join(rootDir, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(path.join(distDir, 'visual-system.css'), css);
console.log('✅ Generated visual-system.css');

// Also generate demo HTML
import { generateVisualDemoHTML } from './VisualComponents.js';
const html = generateVisualDemoHTML();
fs.writeFileSync(path.join(rootDir, 'demo.html'), html);
console.log('✅ Generated demo.html');

