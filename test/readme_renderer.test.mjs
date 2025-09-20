import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

/**
 * This test suite validates the README content structure embedded in this file.
 * It checks headings, ordered lists, bullets, required phrases, and numerology constants.
 *
 * Framework: Node.js built-in test runner (node:test) with assert/strict (ESM).
 */

const readme = `
Per Texturas Numerorum, Spira Loquitur.

# Cosmic Helix Renderer

Static, offline canvas renderer for layered sacred geometry. No build step, no network calls, ND-safe by design.

## Layers
1. **Vesica field** - intersecting circles seed the grid (3, 7, 9)
2. **Tree-of-Life scaffold** - 10 nodes with 22 connective paths
3. **Fibonacci curve** - logarithmic spiral using 144 sampled points
4. **Double-helix lattice** - two phase-shifted strands with 33 cross rungs

## Usage
- Open \`index.html\` directly in any modern browser.
- Optional: edit \`data/palette.json\` to change colors; if missing, a calm fallback palette is used and the header shows a notice.

## ND-safe choices
- No animation, autoplay, or flashing.
- Gentle contrast with readable inks on dark background.
- Layer order preserves depth without motion.

## Numerology constants
The renderer references 3, 7, 9, 11, 22, 33, 99, and 144 to align with the cathedral numerology and geometry mappings.
`.trim();

const lines = readme.split(/\r?\n/);

describe('README structure: headings and sections', () => {
  test('starts with the Latin epigraph line', () => {
    assert.match(lines[0], /^Per Texturas Numerorum, Spira Loquitur\.$/);
  });

  test('has the correct main H1 title', () => {
    const idx = lines.findIndex(l => l.startsWith('# '));
    assert.ok(idx >= 0, 'H1 heading not found');
    assert.equal(lines[idx], '# Cosmic Helix Renderer');
  });

  test('includes required H2 sections in order', () => {
    const h2 = lines.filter(l => l.startsWith('## '));
    const expected = ['## Layers', '## Usage', '## ND-safe choices', '## Numerology constants'];
    assert.deepEqual(h2, expected);
  });
});

describe('Layers section: ordered list integrity', () => {
  test('contains exactly 4 ordered items numbered 1..4', () => {
    const layerLines = lines.filter(l => /^\d\.\s\*\*/.test(l));
    assert.equal(layerLines.length, 4);
    layerLines.forEach((l, i) => assert.match(l, new RegExp(`^${i+1}\\. \\*\\*`)));
  });

  test('each item describes expected content', () => {
    const expectations = [
      /\*\*Vesica field\*\*.*\(3,\s*7,\s*9\)/,
      /\*\*Tree-of-Life scaffold\*\*.*10 nodes.*22 connective paths/,
      /\*\*Fibonacci curve\*\*.*144 sampled points/,
      /\*\*Double-helix lattice\*\*.*33 cross rungs/
    ];
    const layerLines = lines.filter(l => /^\d\.\s\*\*/.test(l));
    expectations.forEach((re, i) => assert.match(layerLines[i], re));
  });
});

describe('Usage section: actionable bullets', () => {
  test('contains two bullet points', () => {
    const usageStart = lines.findIndex(l => l === '## Usage');
    assert.ok(usageStart >= 0);
    const bullets = lines.slice(usageStart + 1).filter(l => l.startsWith('- ')).slice(0, 2);
    assert.equal(bullets.length, 2);
  });

  test('mentions opening index.html directly', () => {
    assert.ok(readme.includes('Open `index.html` directly in any modern browser.'));
  });

  test('mentions optional palette edit and fallback notice', () => {
    assert.match(readme, /edit `data\/palette\.json`.*calm fallback palette.*header shows a notice/i);
  });
});

describe('ND-safe choices: safety bullets', () => {
  test('lists exactly three ND-safe bullets', () => {
    const ndIdx = lines.findIndex(l => l === '## ND-safe choices');
    assert.ok(ndIdx >= 0);
    const bullets = [];
    for (let i = ndIdx + 1; i < lines.length && lines[i].startsWith('- '); i++) bullets.push(lines[i]);
    assert.equal(bullets.length, 3);
  });

  test('covers no animation/autoplay/flashing', () => {
    assert.ok(readme.includes('- No animation, autoplay, or flashing.'));
  });

  test('covers gentle contrast and readability', () => {
    assert.ok(readme.includes('- Gentle contrast with readable inks on dark background.'));
  });

  test('covers layer order/depth without motion', () => {
    assert.ok(readme.includes('- Layer order preserves depth without motion.'));
  });
});

describe('Numerology constants: presence and formatting', () => {
  test('lists the expected constants: 3, 7, 9, 11, 22, 33, 99, 144', () => {
    const nums = [3,7,9,11,22,33,99,144];
    nums.forEach(n => assert.match(readme, new RegExp(`\\b${n}\\b`)));
  });

  test('mentions alignment to cathedral numerology and geometry mappings', () => {
    assert.match(readme, /align with the cathedral numerology and geometry mappings\./i);
  });
});

describe('Formatting sanity checks', () => {
  test('no bare HTTP links (should be none)', () => {
    const httpLinks = readme.match(/https?:\/\/\S+/g) || [];
    assert.equal(httpLinks.length, 0);
  });

  test('no trailing spaces on any line', () => {
    const offenders = lines.filter(l => /\s$/.test(l));
    assert.deepEqual(offenders, []);
  });

  test('uses backticks for filenames', () => {
    assert.match(readme, /`index\.html`/);
    assert.match(readme, /`data\/palette\.json`/);
  });
});