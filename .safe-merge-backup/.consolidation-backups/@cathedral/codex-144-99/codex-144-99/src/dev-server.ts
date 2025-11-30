/**
 * @license CC0-1.0 - Public Domain
 */

// src/dev-server.ts — codex-144-99 pure algorithmic development server
import { SpiralEngine } from './core';

console.log("codex-144-99 — pure algorithmic research and exploration server");
console.log("Using sacred mathematics: 144:99 ratio, golden ratio, Fibonacci sequences");

const engine = new SpiralEngine({ depth: 7, ratio: 144/99 });
console.log("SpiralEngine initialized:", engine.describe());

// Demonstrate algorithmic node generation
for (let i = 0; i < 12; i++) {
  const node = engine.generateNode(i);
  console.log(`Node ${i}:`, node);
}

process.stdin.resume();
