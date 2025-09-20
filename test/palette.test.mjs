import { test, describe, beforeAll } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

// Helper to resolve project root-relative paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Attempt to locate the palette data file in common locations.
// Update these candidates if your repo stores the palette elsewhere.
const candidatePaths = [
  'palette.json',
  'src/palette.json',
  'config/palette.json',
  'assets/palette.json',
  'data/palette.json',
  'palette.mjs',
  'src/palette.mjs',
  'palette.js',
  'src/palette.js'
];

async function tryLoadPalette() {
  let lastErr;
  for (const rel of candidatePaths) {
    try {
      const abs = resolve(__dirname, '..', rel);
      if (rel.endsWith('.json')) {
        const raw = readFileSync(abs, 'utf8');
        return { data: JSON.parse(raw), sourcePath: rel };
      } else if (rel.endsWith('.mjs') || rel.endsWith('.js')) {
        // Dynamically import ESM/JS modules that export the palette object (default or named)
        const mod = await import(resolve('file://', abs));
        const data = mod.default ?? mod.palette ?? mod.PALETTE ?? mod.colors ?? mod;
        if (data && typeof data === 'object') return { data, sourcePath: rel };
      }
    } catch (e) {
      lastErr = e;
      continue;
    }
  }
  const hint = lastErr ? ` Last error: ${lastErr.message}` : '';
  throw new Error(`Unable to locate palette data in any known path. Checked: ${candidatePaths.join(', ')}.${hint}`);
}

// Color utilities (no external deps)
function hexToRgb(hex) {
  assert.match(hex, /^#([0-9a-fA-F]{6})$/, `Invalid hex color format: ${hex}`);
  const int = parseInt(hex.slice(1), 16);
  return {
    r: (int >> 16) & 0xff,
    g: (int >> 8) & 0xff,
    b: int & 0xff
  };
}

function sRGBtoLinear(c) {
  const cs = c / 255;
  return cs <= 0.04045 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const R = sRGBtoLinear(r);
  const G = sRGBtoLinear(g);
  const B = sRGBtoLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(hex1, hex2) {
  const L1 = relativeLuminance(hex1);
  const L2 = relativeLuminance(hex2);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Expected values from the PR diff snippet
const EXPECTED = {
  bg: '#0b0b12',
  ink: '#e8e8f0',
  layers: [
    '#b1c7ff',
    '#89f7fe',
    '#a0ffa1',
    '#ffd27f',
    '#f5a3ff',
    '#d0d0e6'
  ]
};

let palette;
let sourcePath;

describe('palette configuration', () => {
  beforeAll(async () => {
    const loaded = await tryLoadPalette();
    palette = loaded.data;
    sourcePath = loaded.sourcePath;
  });

  test('should load palette object from repository', () => {
    assert.ok(palette, 'Palette data should be loaded');
    assert.equal(typeof palette, 'object', 'Palette should be an object');
  });

  test('should include required keys: bg, ink, layers', () => {
    for (const key of ['bg', 'ink', 'layers']) {
      assert.ok(Object.prototype.hasOwnProperty.call(palette, key), `Missing key: ${key}`);
    }
  });

  test('bg and ink should be valid 6-digit hex colors', () => {
    assert.match(palette.bg, /^#[0-9a-fA-F]{6}$/, 'bg must be a #RRGGBB hex');
    assert.match(palette.ink, /^#[0-9a-fA-F]{6}$/, 'ink must be a #RRGGBB hex');
  });

  test('layers should be a non-empty array of valid hex colors', () => {
    assert.ok(Array.isArray(palette.layers), 'layers must be an array');
    assert.ok(palette.layers.length > 0, 'layers must not be empty');
    for (const [i, hex] of palette.layers.entries()) {
      assert.match(hex, /^#[0-9a-fA-F]{6}$/, `layers[${i}] must be a #RRGGBB hex`);
    }
  });

  test('layers should not contain duplicates (case-insensitive)', () => {
    const lc = palette.layers.map(s => s.toLowerCase());
    const unique = new Set(lc);
    assert.equal(unique.size, lc.length, 'layers should be unique');
  });

  test('bg and ink should have sufficient contrast (WCAG AA normal text ≥ 4.5)', () => {
    const ratio = contrastRatio(palette.bg, palette.ink);
    assert.ok(ratio >= 4.5, `Contrast ratio too low: ${ratio.toFixed(2)}`);
  });

  test('should match expected values from PR diff (exact check)', () => {
    // This intentionally asserts exact equality to the new palette in the PR diff.
    // If palette evolves later, update EXPECTED above or adjust to looser checks.
    assert.equal(palette.bg, EXPECTED.bg, 'bg mismatch with diff');
    assert.equal(palette.ink, EXPECTED.ink, 'ink mismatch with diff');
    assert.deepEqual(palette.layers, EXPECTED.layers, 'layers mismatch with diff');
  });

  test('every layer should have acceptable contrast against bg and ink (>= 2.0 for UI accents)', () => {
    // Accent colors may not need full 4.5; enforce a softer minimum to avoid illegibility.
    for (const [i, hex] of palette.layers.entries()) {
      const rBg = contrastRatio(hex, palette.bg);
      const rInk = contrastRatio(hex, palette.ink);
      assert.ok(rBg >= 2.0 || rInk >= 2.0, `Layer ${i} (${hex}) has poor contrast vs bg (${rBg.toFixed(2)}) and ink (${rInk.toFixed(2)})`);
    }
  });

  test('no color entries should be shorthand (#RGB) or include alpha (#RRGGBBAA)', () => {
    const reFull = /^#[0-9a-fA-F]{6}$/;
    assert.match(palette.bg, reFull);
    assert.match(palette.ink, reFull);
    for (const [i, hex] of palette.layers.entries()) {
      assert.match(hex, reFull, `layers[${i}] must be #RRGGBB only`);
    }
  });

  test('source file hint', () => {
    // Test provides a breadcrumb for maintainers to know which path was used.
    assert.ok(typeof sourcePath === 'string' && sourcePath.length > 0, 'sourcePath should be noted');
  });
});