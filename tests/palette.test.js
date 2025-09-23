/**
 * Testing library/framework: Jest
 *
 * These tests validate the palette configuration focused on the provided diff:
 * {
 *   "bg": "#040617",
 *   "ink": "#f3f4ff",
 *   "layers": [
 *     "#4b6dff","#62c8ff","#7effd4","#ffe2b8","#f5a6ff","#d4dcff"
 *   ]
 * }
 *
 * The tests check:
 * - Schema integrity and required keys
 * - Value formats (#RRGGBB)
 * - Exact value snapshot for the current diff
 * - No duplicates and no collisions with bg/ink
 * - WCAG AA contrast ratio between bg and ink >= 4.5:1
 *
 * If the palette file moves, update the TARGET_PALETTE_PATH env or adjust resolvePalettePath().
 */

const fs = require('fs');
const path = require('path');

function resolvePalettePath() {
  // Allow overriding via environment variable in CI
  const override = process.env.TARGET_PALETTE_PATH;
  if (override) return path.resolve(process.cwd(), override);

  // Synchronized with changeScript detection order
  const candidates = [
    'palette.json',
    path.join('src', 'palette.json'),
    path.join('config', 'palette.json'),
    path.join('assets', 'palette.json'),
  ];
  for (const p of candidates) {
    const abs = path.resolve(process.cwd(), p);
    if (fs.existsSync(abs)) return abs;
  }
  // Last resort: try the repository root palette.json; tests will guide fixes if missing.
  return path.resolve(process.cwd(), 'palette.json');
}

function parsePalette(p) {
  const raw = fs.readFileSync(p, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`Failed to parse JSON in ${p}: ${e.message}`);
  }
}

const HEX6_RE = /^#[0-9a-fA-F]{6}$/;

// WCAG helper functions

function srgbToLin(c) {
  const cs = c / 255;
  return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}
function hexToRgb(hex) {
  const match = /^#?([0-9a-fA-F]{6})$/.exec(hex);
  if (!match) {
    return null;
  }
  const int = parseInt(match[1], 16);
  return {
    r: (int >> 16) & 0xff,
    g: (int >> 8) & 0xff,
    b: int & 0xff,
  };
}
function relLuminance(hex) {
  const rgbObj = hexToRgb(hex);
  if (!rgbObj) {
    return null;
  }
  const R = srgbToLin(rgbObj.r);
  const G = srgbToLin(rgbObj.g);
  const B = srgbToLin(rgbObj.b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
function contrastRatio(hex1, hex2) {
  const L1 = relLuminance(hex1);
  const L2 = relLuminance(hex2);
  if (L1 == null || L2 == null) return null;
  const [bright, dark] = L1 >= L2 ? [L1, L2] : [L2, L1];
  return (bright + 0.05) / (dark + 0.05);
}

describe('palette.json integrity', () => {
  const palettePath = resolvePalettePath();

  let palette;

  beforeAll(() => {
    expect(fs.existsSync(palettePath)).toBe(true);
    palette = parsePalette(palettePath);
  });

  test('has required top-level keys and types', () => {
    expect(palette && typeof palette).toBe('object');
    expect(Object.prototype.hasOwnProperty.call(palette, 'bg')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(palette, 'ink')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(palette, 'layers')).toBe(true);

    expect(typeof palette.bg).toBe('string');
    expect(typeof palette.ink).toBe('string');
    expect(Array.isArray(palette.layers)).toBe(true);
  });

  test('colors are valid #RRGGBB hex strings', () => {
    expect(palette.bg).toMatch(HEX6_RE);
    expect(palette.ink).toMatch(HEX6_RE);
    for (const c of palette.layers) {
      expect(typeof c).toBe('string');
      expect(c).toMatch(HEX6_RE);
    }
  });

  test('no duplicate colors and no collisions with bg/ink', () => {
    const all = [palette.bg, palette.ink, ...palette.layers];
    const set = new Set(all.map((c) => c.toLowerCase()));
    expect(set.size).toBe(all.length);

    for (const c of palette.layers) {
      expect(c.toLowerCase()).not.toBe(palette.bg.toLowerCase());
      expect(c.toLowerCase()).not.toBe(palette.ink.toLowerCase());
    }
  });

  test('bg and ink meet WCAG AA contrast ratio >= 4.5', () => {
    const ratio = contrastRatio(palette.bg, palette.ink);
    expect(ratio).not.toBeNull();
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  test('matches expected palette snapshot from current diff', () => {
    // If these values intentionally change in future diffs, update the expected object below.
    const expected = {
      bg: '#040617',
      ink: '#f3f4ff',
      layers: [
        '#4b6dff',
        '#62c8ff',
        '#7effd4',
        '#ffe2b8',
        '#f5a6ff',
        '#d4dcff',
      ],
    };
    // Case-insensitive compare by normalizing to lowercase
    const normalize = (obj) => ({
      bg: obj.bg.toLowerCase(),
      ink: obj.ink.toLowerCase(),
      layers: obj.layers.map((c) => c.toLowerCase()),
    });
    expect(normalize(palette)).toEqual(normalize(expected));
  });

  describe('edge cases and failure handling', () => {
    test('rejects invalid JSON with a helpful error', () => {
      const tmp = path.join(__dirname, 'palette.invalid.json');
      fs.writeFileSync(tmp, '{ "bg": "#000000", "ink": "#ffffff", "layers": [ "#123456", ] }', 'utf8');
      expect(() => parsePalette(tmp)).toThrow(/Failed to parse JSON/);
      fs.unlinkSync(tmp);
    });

    test('contrast function returns null for malformed colors', () => {
      expect(contrastRatio('#zzz', '#000000')).toBeNull();
      expect(contrastRatio('#ffffff', 'not-a-color')).toBeNull();
    });
  });
});