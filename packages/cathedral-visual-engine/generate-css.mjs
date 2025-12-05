#!/usr/bin/env node
/**
 * Generate Visual System CSS
 * 
 * Standalone CSS generator
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import from compiled JS
const { generateCompleteVisualSystem } = await import('./dist/index.js');
const { generateAllAnimations } = await import('./dist/Animations.js');

const css = `
/* ⚗️ Cathedral Visual Engine - Complete Visual System */
/* Generated: ${new Date().toISOString()} */
/* License: CC0-1.0 - Public Domain */

${generateCompleteVisualSystem()}
${generateAllAnimations()}
`;

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(path.join(distDir, 'visual-system.css'), css);
console.log('✅ Generated visual-system.css');
console.log(`📊 Size: ${(css.length / 1024).toFixed(2)} KB`);

