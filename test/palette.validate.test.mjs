// Note: Detected test framework will be confirmed by the reviewer. This file uses Jest/Vitest-compatible syntax.
// If the project uses Mocha+Chai, replace 'expect(...).toBe/ toEqual' with appropriate assertions.

import fs from 'node:fs';
import path from 'node:path';

const palettePathCandidates = [
  'test/palette.test.mjs', // provided content appears to be JSON
  'palette.json',
  'src/palette.json',
  'assets/palette.json',
];

// Simple hex color validator (#RRGGBB)
const isHex6 = (s) => typeof s === 'string' && /^#[0-9a-fA-F]{6}$/.test(s);

function loadPalette() {
  for (const p of palettePathCandidates) {
    if (fs.existsSync(p)) {
      const raw = fs.readFileSync(p, 'utf8').trim();
      // Some repos might allow trailing commas; be strict here since provided file is strict JSON
      return JSON.parse(raw);
    }
  }
  throw new Error('Palette file not found in expected locations: ' + palettePathCandidates.join(', '));
}

describe('palette schema', () => {
  let palette;
  beforeAll(() => {
    palette = loadPalette();
  });

  test('has required keys: bg, ink, layers', () => {
    expect(palette).toBeTruthy();
    expect(typeof palette).toBe('object');
    expect(Object.prototype.hasOwnProperty.call(palette, 'bg')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(palette, 'ink')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(palette, 'layers')).toBe(true);
  });

  test('bg and ink are valid #RRGGBB colors', () => {
    expect(isHex6(palette.bg)).toBe(true);
    expect(isHex6(palette.ink)).toBe(true);
  });

  test('layers is a non-empty array of valid #RRGGBB colors without duplicates', () => {
    expect(Array.isArray(palette.layers)).toBe(true);
    expect(palette.layers.length).toBeGreaterThan(0);

    for (const c of palette.layers) {
      expect(typeof c).toBe('string');
      expect(isHex6(c)).toBe(true);
    }

    const uniq = new Set(palette.layers.map((s) => s.toLowerCase()));
    expect(uniq.size).toBe(palette.layers.length);
  });

  test('no unexpected keys present (schema tightness)', () => {
    const allowed = new Set(['bg', 'ink', 'layers']);
    for (const k of Object.keys(palette)) {
      expect(allowed.has(k)).toBe(true);
    }
  });
});

describe('palette content (from PR diff)', () => {
  test('matches expected known values from the diff for robustness', () => {
    const expected = {
      bg: '#0b0b12',
      ink: '#e8e8f0',
      layers: [
        '#b1c7ff',
        '#89f7fe',
        '#a0ffa1',
        '#ffd27f',
        '#f5a3ff',
        '#d0d0e6',
      ],
    };

    const palette = loadPalette();
    // We assert exact match to catch accidental edits
    expect(palette).toEqual(expected);
  });
});

// Negative/failure cases (validate helper behavior)
describe('hex validator', () => {
  test('accepts valid 6-hex colors', () => {
    expect(isHex6('#000000')).toBe(true);
    expect(isHex6('#ABCDEF')).toBe(true);
    expect(isHex6('#abcdef')).toBe(true);
  });

  test('rejects invalid formats', () => {
    const invalid = [null, undefined, '', '#FFF', '#FFFFF', '#FFFFFG', '123456', '#1234567', '#12', '#GGGGGG'];
    for (const v of invalid) {
      expect(isHex6(v)).toBe(false);
    }
  });
});