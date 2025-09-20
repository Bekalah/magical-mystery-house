// Test suite: palette JSON validation
// Note on framework: This test is framework-agnostic and works with Vitest (import { describe,it,expect } from 'vitest'),
// Jest (globals: describe/it/expect), or Node's test runner (node:test + assert). We prefer the project's existing runner.
// If using Vitest, optionally uncomment the import below.
// import { describe, it, expect } from 'vitest';

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

// Resolve palette file by probing common locations; fallback to tests/fixture if project structure differs.
// You can adjust PALETTE_CANDIDATES if repository places the palette elsewhere.
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const PALETTE_CANDIDATES = [
  'palette.json',
  'src/palette.json',
  'data/palette.json',
  'assets/palette.json',
  'config/palette.json',
  // fallback: a copy may live next to tests if repo is atypical
  path.join(__dirname, 'palette.json'),
].map(p => path.resolve(process.cwd(), p));

function findFirstExisting(paths) {
  for (const p of paths) {
    try {
      fs.accessSync(p, fs.constants.R_OK);
      return p;
    } catch {}
  }
  return null;
}

const palettePath = findFirstExisting(PALETTE_CANDIDATES);
if (!palettePath) {
  // Provide a clear error to help contributors locate/adjust the path.
  throw new Error(
    'Palette JSON not found. Looked for: \n' + PALETTE_CANDIDATES.map(p => ` - ${p}`).join('\n') +
    '\nUpdate PALETTE_CANDIDATES in tests/test_palette_json.test.mjs to the correct location.'
  );
}

function readJSON(file) {
  const raw = fs.readFileSync(file, 'utf8');
  return JSON.parse(raw);
}

function isHexColor(str) {
  return typeof str === 'string' && /^#([0-9a-fA-F]{6})$/.test(str);
}

// WCAG relative luminance helpers for basic contrast sanity checks
function srgbToLinear(c) {
  const cs = c / 255;
  return cs <= 0.04045 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}
function hexToRgb(hex) {
  const m = /^#?([0-9a-fA-F]{6})$/.exec(hex);
  if (!m) return null;
  const int = parseInt(m[1], 16);
  return {
    r: (int >> 16) & 0xff,
    g: (int >> 8) & 0xff,
    b: int & 0xff,
  };
}
function relLuminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const R = srgbToLinear(rgb.r);
  const G = srgbToLinear(rgb.g);
  const B = srgbToLinear(rgb.b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
function contrastRatio(hex1, hex2) {
  const L1 = relLuminance(hex1);
  const L2 = relLuminance(hex2);
  if (L1 == null || L2 == null) return null;
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Lightweight assertion wrappers to support multiple runners.
// If expect is available (Jest/Vitest), use it; else fall back to Node assert.
let useExpect = typeof globalThis.expect === 'function';

function assertTruthy(val, msg) {
  if (useExpect) { expect(val).toBeTruthy(); }
  else { if (!val) throw new Error(msg || 'Assertion failed: expected truthy'); }
}
function assertEqual(a, b, msg) {
  if (useExpect) { expect(a).toEqual(b); }
  else if (a !== b) { throw new Error(msg || `Assertion failed: ${a} !== ${b}`); }
}
function assertArray(val, msg) {
  if (useExpect) { expect(Array.isArray(val)).toBe(true); }
  else if (!Array.isArray(val)) { throw new Error(msg || 'Assertion failed: expected array'); }
}
function assert(condition, msg) { assertTruthy(condition, msg); }

const palette = readJSON(palettePath);

describe('palette.json schema', () => {
  it('has required top-level keys: bg, ink, layers', () => {
    assert('bg' in palette, 'Missing "bg" key');
    assert('ink' in palette, 'Missing "ink" key');
    assert('layers' in palette, 'Missing "layers" key');
  });

  it('uses valid 6-digit hex colors for bg and ink', () => {
    assert(isHexColor(palette.bg), `bg must be #RRGGBB, got: ${palette.bg}`);
    assert(isHexColor(palette.ink), `ink must be #RRGGBB, got: ${palette.ink}`);
  });

  it('layers is a non-empty array of valid hex colors', () => {
    assertArray(palette.layers, 'layers must be an array');
    assert(palette.layers.length > 0, 'layers must not be empty');
    for (const [i, c] of palette.layers.entries()) {
      assert(isHexColor(c), `layers[${i}] must be #RRGGBB, got: ${c}`);
    }
  });
});

describe('palette.json value integrity', () => {
  it('contains no duplicate colors across bg, ink, and layers', () => {
    const all = [palette.bg, palette.ink, ...palette.layers];
    const set = new Set(all.map(s => s.toLowerCase()));
    assertEqual(set.size, all.length, 'Colors must be unique across the palette');
  });

  it('bg and ink have a reasonable contrast ratio (>= 4.5:1 for normal text)', () => {
    const ratio = contrastRatio(palette.bg, palette.ink);
    assertTruthy(ratio != null, 'Contrast ratio could not be computed');
    assert(ratio >= 4.5, `Contrast ratio too low: ${ratio?.toFixed(2)} (expected >= 4.5)`);
  });

  it('each layer color has at least minimal contrast (>= 2.0) against bg for layering visibility', () => {
    for (const [i, c] of palette.layers.entries()) {
      const ratio = contrastRatio(palette.bg, c);
      assertTruthy(ratio != null, `Contrast ratio for layer[${i}] could not be computed`);
      assert(ratio >= 2.0, `Layer[${i}] ${c} has low contrast vs bg ${palette.bg}: ${ratio?.toFixed(2)} (expected >= 2.0)`);
    }
  });
});

describe('palette.json stability checks (edge cases)', () => {
  it('bg and ink are strings (defensive check)', () => {
    assertEqual(typeof palette.bg, 'string', 'bg must be a string');
    assertEqual(typeof palette.ink, 'string', 'ink must be a string');
  });

  it('layers entries are strings (defensive check)', () => {
    for (const [i, c] of palette.layers.entries()) {
      assertEqual(typeof c, 'string', `layers[${i}] must be a string`);
    }
  });
});