import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Helper to load JSON fixture
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const palettePath = path.join(__dirname, 'fixtures', 'palette.json');

function isHexColor(s) {
  return typeof s === 'string' && /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(s);
}

// Relative luminance calculation per WCAG
function hexToRgb(hex) {
  const h = hex.slice(1);
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 0xff,
    g: (num >> 8) & 0xff,
    b: num & 0xff
  };
}

function srgbToLin(v) {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function luminance({ r, g, b }) {
  const R = srgbToLin(r);
  const G = srgbToLin(g);
  const B = srgbToLin(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(hex1, hex2) {
  const L1 = luminance(hexToRgb(hex1));
  const L2 = luminance(hexToRgb(hex2));
  const [bright, dark] = L1 >= L2 ? [L1, L2] : [L2, L1];
  return (bright + 0.05) / (dark + 0.05);
}

test('palette fixture exists and is valid JSON', () => {
  assert.ok(fs.existsSync(palettePath), 'palette.json should exist at tests/fixtures/palette.json');
  const raw = fs.readFileSync(palettePath, 'utf8');
  assert.doesNotThrow(() => JSON.parse(raw), 'palette.json should parse as valid JSON');
});

test('schema: has bg, ink, and layers with expected types', () => {
  const palette = JSON.parse(fs.readFileSync(palettePath, 'utf8'));
  assert.ok(Object.prototype.hasOwnProperty.call(palette, 'bg'), 'bg key must exist');
  assert.ok(Object.prototype.hasOwnProperty.call(palette, 'ink'), 'ink key must exist');
  assert.ok(Object.prototype.hasOwnProperty.call(palette, 'layers'), 'layers key must exist');
  assert.equal(typeof palette.bg, 'string', 'bg must be a string');
  assert.equal(typeof palette.ink, 'string', 'ink must be a string');
  assert.ok(Array.isArray(palette.layers), 'layers must be an array');
});

test('format: bg, ink, and all layers are valid hex colors', () => {
  const { bg, ink, layers } = JSON.parse(fs.readFileSync(palettePath, 'utf8'));
  assert.ok(isHexColor(bg), `bg should be valid hex color, got: ${bg}`);
  assert.ok(isHexColor(ink), `ink should be valid hex color, got: ${ink}`);
  for (const [idx, c] of layers.entries()) {
    assert.ok(isHexColor(c), `layers[${idx}] should be valid hex color, got: ${c}`);
  }
});

test('content: layers length and uniqueness', () => {
  const { layers } = JSON.parse(fs.readFileSync(palettePath, 'utf8'));
  // Expect at least 6 based on diff; allow >=6 to be forward compatible.
  assert.ok(layers.length >= 6, `layers should contain at least 6 colors, got: ${layers.length}`);
  const set = new Set(layers.map(c => c.toLowerCase()));
  assert.equal(set.size, layers.length, 'layers should not contain duplicate colors (case-insensitive)');
});

test('contrast: ink has sufficient contrast against bg (AA normal text >= 4.5:1)', () => {
  const { bg, ink } = JSON.parse(fs.readFileSync(palettePath, 'utf8'));
  const ratio = contrastRatio(bg, ink);
  assert.ok(ratio >= 4.5, `ink should have at least 4.5:1 contrast vs bg, got: ${ratio.toFixed(2)}`);
});

test('contrast: each layer has acceptable contrast vs bg or ink (>= 3:1 for large UI elements)', () => {
  const { bg, ink, layers } = JSON.parse(fs.readFileSync(palettePath, 'utf8'));
  for (const [idx, c] of layers.entries()) {
    const r1 = contrastRatio(c, bg);
    const r2 = contrastRatio(c, ink);
    const ok = r1 >= 3 || r2 >= 3;
    assert.ok(ok, `layers[${idx}] ${c} should contrast >= 3:1 with bg or ink (got bg:${r1.toFixed(2)} ink:${r2.toFixed(2)})`);
  }
});

test('robustness: handle unexpected inputs in helpers', () => {
  assert.equal(isHexColor(null), false);
  assert.equal(isHexColor(undefined), false);
  assert.equal(isHexColor('#12'), false);
  assert.equal(isHexColor('#1234'), false);
  assert.equal(isHexColor('#xyzxyz'), false);
  assert.equal(isHexColor('123456'), false);
});

test('guard: bg and ink are not identical colors', () => {
  const { bg, ink } = JSON.parse(fs.readFileSync(palettePath, 'utf8'));
  assert.notEqual(bg.toLowerCase(), ink.toLowerCase(), 'bg and ink should differ');
});