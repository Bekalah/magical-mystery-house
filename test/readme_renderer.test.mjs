// Test framework: Node's built-in test runner (node:test)
// Command: npm test -> "node --test"
//
//
// 
 //  - Validate documentation structure, headings, and specific phrases/numerics introduced in the diff.
//
 //
 //  - Validate section order and bullet counts for Layers and ND-safe choices.
//
 //  - Validate Numerology constants list and statement about exposure as NUM in index.html.
//
 //  - Perform light HTML validations aligned with README claims (offline-first, canvas/SVG presence, NUM exposure shapes).
 //
 //  - Optionally validate data/palette.json JSON integrity if present.
 //
 //
 // Note: These tests assert the intended contract. If current branch doesn't yet contain the updated README,
 //
 // they will fail, guiding the integration of the PR changes.
 

import { describe, it, beforeAll } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function readReadme() {
  const candidates = [
    path.resolve(__dirname, '..', 'README.md'),
    path.resolve(__dirname, '..', 'README'),
    path.resolve(__dirname, '..', 'docs', 'README.md'),
    path.resolve(__dirname, '..', 'readme.md'),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      return { path: p, content: fs.readFileSync(p, 'utf8') };
    }
  }
  assert.fail('README not found. Looked for:\n' + candidates.map((p) => ' - ' + p).join('\n'));
}

function getSection(content, headerText) {
  const headerRe = new RegExp(`^##\\s*${escapeRegExp(headerText)}\\s*$`, 'mi');
  const m = content.match(headerRe);
  assert.ok(m, `Missing section "## ${headerText}"`);
  const start = m.index + m[0].length;
  const after = content.slice(start);
  const nextIdx = after.search(/^\s*##\s+/m);
  const end = nextIdx === -1 ? content.length : start + nextIdx;
  return content.slice(start, end);
}

function numberListFromParentheses(line) {
  const m = line.match(/\(([^)]*)\)/);
  if (!m) return [];
  return m[1]
    .split(',')
    .map((s) => s.trim())
    .map((s) => parseInt(s, 10))
    .filter((n) => Number.isFinite(n));
}

function setEq(a, b) {
  if (a.size !== b.size) return false;
  for (const v of a) if (!b.has(v)) return false;
  return true;
}

function readIfExists(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;
}

function findExisting(paths) {
  return paths.filter((p) => fs.existsSync(p));
}

describe('Documentation: Cosmic Helix Renderer README', () => {
  let README;

  beforeAll(() => {
    README = readReadme();
    assert.ok(README.content.length > 0, 'README content should not be empty');
  });

  it('has main title and epigraph', () => {
    assert.match(README.content, /^#\s*Cosmic Helix Renderer\b/m, 'Missing or incorrect H1 title');
    assert.match(
      README.content,
      /Per Texturas Numerorum,\s*Spira Loquitur\./m,
      'Missing epigraph "Per Texturas Numerorum, Spira Loquitur."'
    );
  });

  it('describes static/offline/ND-safe characteristics', () => {
    assert.match(
      README.content,
      /Static,\s*offline canvas demo.*No build step, no network calls, ND-safe by design\./i,
      'Missing offline/ND-safe/no build/no network statement'
    );
  });

  it('sections appear in expected order', () => {
    const order = ['## Layers', '## Usage', '## ND-safe choices', '## Numerology constants'];
    const positions = order.map((h) => {
      const re = new RegExp(`^${escapeRegExp(h)}\\b`, 'mi');
      const m = README.content.match(re);
      assert.ok(m, `Missing section "${h}"`);
      return m.index;
    });
    for (let i = 1; i < positions.length; i++) {
      assert.ok(positions[i] > positions[i - 1], `Section "${order[i]}" should appear after "${order[i - 1]}"`);
    }
  });

  it('documents Layers with four numbered items and specific claims', () => {
    const section = getSection(README.content, 'Layers');
    const lines = section.split(/\r?\n/);
    const numbered = lines.filter((l) => /^\s*\d+\.\s+/.test(l));
    assert.equal(numbered.length, 4, 'Layers should provide exactly four numbered items (1..4)');

    // Content checks (robust regexes to allow punctuation variations)
    assert.ok(numbered.some((l) => /Vesica field.*\(\s*3\s*,\s*7\s*,\s*9\s*\)/i.test(l)), 'Missing Vesica field with (3, 7, 9)');
    assert.ok(numbered.some((l) => /Tree-of-Life scaffold.*\b10\b.*\b22\b/i.test(l)), 'Missing Tree-of-Life with 10 nodes and 22 paths');
    assert.ok(numbered.some((l) => /Fibonacci curve.*\b144\b.*(sampled points|points)/i.test(l)), 'Missing Fibonacci curve with 144 points');
    assert.ok(numbered.some((l) => /Double-helix lattice.*\b33\b.*cross rungs/i.test(l)), 'Missing Double-helix lattice with 33 cross rungs');
  });

  it('documents Usage including offline index.html and palette fallback', () => {
    const section = getSection(README.content, 'Usage');
    assert.match(section, /Open\s+`?index\.html`?\s+directly.*offline-first/i, 'Missing instruction to open index.html offline-first');
    assert.match(
      section,
      /edit\s+`?data\/palette\.json`?.*missing the header.*fallback notice.*default palette/i,
      'Missing palette.json fallback behavior description'
    );
  });

  it('documents ND-safe choices with three bullet points', () => {
    const section = getSection(README.content, 'ND-safe choices');
    const bullets = section.split(/\r?\n/).filter((l) => /^\s*-\s+/.test(l));
    assert.equal(bullets.length, 3, 'ND-safe choices should contain exactly three bullet items');

    assert.ok(bullets.some((l) => /No animation, autoplay, or flashing; every layer renders once\./i.test(l)), 'Missing ND-safe: no animation/autoplay/flashing');
    assert.ok(bullets.some((l) => /Gentle contrast.*readable inks on dark background.*ND-safe via sane defaults/i.test(l)), 'Missing ND-safe: gentle contrast/readable inks');
    assert.ok(bullets.some((l) => /Layer order preserves depth without motion.*steady/i.test(l)), 'Missing ND-safe: layer order without motion');
  });

  it('documents Numerology constants and exposure as NUM in index.html', () => {
    const section = getSection(README.content, 'Numerology constants');
    assert.match(section, /exposes constants.*index\.html.*as\s+`?NUM`?/i, 'Missing statement about exposing constants as NUM in index.html');

    // Extract and compare the exact list in parentheses.
    const lineWithList =
      section.split(/\r?\n/).find((l) => /exposes constants\s*\(/i.test(l)) || section;
    const nums = numberListFromParentheses(lineWithList);
    const expected = new Set([3, 7, 9, 11, 22, 33, 99, 144]);
    assert.ok(nums.length > 0, 'Could not parse numerology constants list from parentheses');
    assert.ok(setEq(new Set(nums), expected), `Numerology constants should be exactly ${[...expected].join(', ')}, got: ${nums.join(', ')}`);
  });
});

describe('HTML artifacts (optional but recommended)', () => {
  const candidates = [
    path.resolve(__dirname, '..', 'index.html'),
    path.resolve(__dirname, '..', 'public', 'index.html'),
    path.resolve(__dirname, '..', 'docs', 'index.html'),
  ];
  const existing = findExisting(candidates);

  it('at least one index.html is present (soft requirement)', () => {
    // We do not fail the suite if none exists; README may live here while HTML ships elsewhere.
    assert.ok(true, existing.length ? 'index.html present' : 'index.html not found; skipping HTML checks');
  });

  it('index.html (if present) contains a canvas or SVG element', () => {
    for (const p of existing) {
      const html = readIfExists(p);
      assert.ok(html && (/<canvas\b/i.test(html) || /<svg\b/i.test(html)), `${path.basename(p)} should contain a <canvas> or <svg> element`);
    }
  });

  it('index.html (if present) does not reference remote URLs in script/link tags (offline-first)', () => {
    for (const p of existing) {
      const html = readIfExists(p);
      const remoteAttrRe = /<(script|link)\b[^>]*\b(?:src|href)\s*=\s*['"](https?:)?\/\/[^'"]+/gi;
      const matches = html ? html.match(remoteAttrRe) : null;
      assert.ok(!matches || matches.length === 0, `${path.basename(p)} should not include remote http(s) src/href in <script> or <link>`);
    }
  });

  it('index.html (if present) appears to expose NUM in some common form', () => {
    for (const p of existing) {
      const html = readIfExists(p) ?? '';
      const exposurePatterns = [
        /\b(?:const|let|var)\s+NUM\s*=\s*\{/,
        /\bexport\s+const\s+NUM\s*=\s*\{/,
        /\b(?:window|globalThis)\.NUM\s*=/,
      ];
      const matched = exposurePatterns.some((re) => re.test(html));
      assert.ok(matched, `${path.basename(p)} does not appear to expose NUM via const/let/var, export const, or window/globalThis assignment`);
    }
  });
});

describe('Data assets (optional)', () => {
  it('data/palette.json (if present) is valid JSON', () => {
    const p = path.resolve(__dirname, '..', 'data', 'palette.json');
    if (!fs.existsSync(p)) {
      assert.ok(true, 'palette.json not present; skipping');
      return;
    }
    const raw = fs.readFileSync(p, 'utf8');
    let parsed;
    assert.doesNotThrow(() => { parsed = JSON.parse(raw); }, 'palette.json must be valid JSON');
    assert.equal(typeof parsed, 'object', 'palette.json should parse to an object');
  });
});