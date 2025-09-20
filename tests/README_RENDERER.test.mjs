// Tests for Cosmic Helix Renderer README structure and content assertions
// Testing library/framework: Prefer existing Jest or Vitest (describe/it/expect).
// If unavailable, fallback path uses Node's built-in test runner `node:test` and `assert/strict`.

const RAW = `Per Texturas Numerorum, Spira Loquitur.

# Cosmic Helix Renderer

Static, offline canvas renderer for layered sacred geometry. No build step, no network calls, ND-safe by design.

## Layers
1. **Vesica field** - intersecting circles seed the grid (3, 7, 9)
2. **Tree-of-Life scaffold** - 10 nodes with 22 connective paths
3. **Fibonacci curve** - logarithmic spiral using 144 sampled points
4. **Double-helix lattice** - two phase-shifted strands with 33 cross rungs

## Usage
- Open \`index.html\` directly in any modern browser;
- Optional: edit \`data/palette.json\` to change colors; if missing, a calm fallback palette is used and the header shows a notice;

## ND-safe choices
- No animation, autoplay, or flashing.
- Gentle contrast with readable inks on dark background.
- Layer order preserves depth without motion.

## Numerology constants
The renderer references 3, 7, 9, 11, 22, 33, 99, and 144 to align with the cathedral numerology and geometry mappings.
`;

// Try to load expect/describe/it from global (Jest/Vitest). If not found, use node:test.
let usingNodeTest = false;
let tDescribe, tIt, tExpected;

try {
  // In Vitest/Jest, these are globals
  // eslint-disable-next-line no-undef
  tDescribe = typeof describe !== 'undefined' ? describe : undefined;
  // eslint-disable-next-line no-undef
  tIt = typeof it !== 'undefined' ? it : undefined;
  // eslint-disable-next-line no-undef
  tExpected = typeof expect !== 'undefined' ? expect : undefined;
} catch {
  // ignore
}

if (!tDescribe || !tIt || !tExpected) {
  usingNodeTest = true;
}

if (usingNodeTest) {
  // Node's built-in test fallback
  const { describe, it } = await import('node:test');
  const assert = (await import('node:assert/strict')).default;

  const expectStringIncludes = (haystack, needle, message) => {
    assert.ok(haystack.includes(needle), message || `Expected to include "${needle}"`);
  };

  const expectRegex = (haystack, regex, message) => {
    assert.match(haystack, regex, message || `Expected to match ${regex}`);
  };

  describe('README: Cosmic Helix Renderer', () => {
    it('has the H1 heading and intro line', () => {
      expectStringIncludes(RAW, '# Cosmic Helix Renderer', 'Missing H1');
      expectStringIncludes(RAW, 'Static, offline canvas renderer', 'Missing intro line');
    });

    it('contains the Layers section with 4 ordered items and expected numerology counts', () => {
      expectStringIncludes(RAW, '## Layers', 'Missing Layers section');

      // Verify each bullet with its numbers
      expectRegex(RAW, /1\.\s+\*\*Vesica field\*\*.*\(3,\s*7,\s*9\)/, 'Vesica field entry invalid/missing');
      expectRegex(RAW, /2\.\s+\*\*Tree-of-Life scaffold\*\*.*10 nodes.*22 connective paths/, 'Tree-of-Life entry invalid/missing');
      expectRegex(RAW, /3\.\s+\*\*Fibonacci curve\*\*.*144 sampled points/, 'Fibonacci curve entry invalid/missing');
      expectRegex(RAW, /4\.\s+\*\*Double-helix lattice\*\*.*33 cross rungs/, 'Double-helix lattice entry invalid/missing');
    });

    it('contains the Usage section with index.html and palette.json guidance', () => {
      expectStringIncludes(RAW, '## Usage', 'Missing Usage section');
      expectRegex(RAW, /Open `index\.html` directly/i, 'Missing index.html instruction');
      expectRegex(RAW, /edit `data\/palette\.json`/i, 'Missing palette.json instruction');
      expectRegex(RAW, /calm fallback palette/i, 'Missing fallback palette notice');
    });

    it('documents ND-safe choices with 3 bullets', () => {
      expectStringIncludes(RAW, '## ND-safe choices', 'Missing ND-safe choices section');
      const ndSection = RAW.split('## ND-safe choices')[1]?.split('## ')[0] || '';
      const bullets = (ndSection.match(/^\-\s.+$/gm) || []);
      assert.equal(bullets.length, 3, 'Expected exactly 3 ND-safe bullets');
      expectStringIncludes(ndSection, 'No animation, autoplay, or flashing.', 'Missing ND-safe bullet 1');
      expectStringIncludes(ndSection, 'Gentle contrast with readable inks on dark background.', 'Missing ND-safe bullet 2');
      expectStringIncludes(ndSection, 'Layer order preserves depth without motion.', 'Missing ND-safe bullet 3');
    });

    it('lists Numerology constants line including 3, 7, 9, 11, 22, 33, 99, 144', () => {
      expectStringIncludes(RAW, '## Numerology constants', 'Missing numerology header');
      for (const n of [3,7,9,11,22,33,99,144]) {
        expectRegex(RAW, new RegExp(`\\b${n}\\b`), `Missing numerology constant ${n}`);
      }
    });

    it('maintains a consistent section order', () => {
      const order = ['# Cosmic Helix Renderer', '## Layers', '## Usage', '## ND-safe choices', '## Numerology constants'];
      let lastIndex = -1;
      for (const marker of order) {
        const idx = RAW.indexOf(marker);
        assert.ok(idx >= 0, `Missing section marker: ${marker}`);
        assert.ok(idx > lastIndex, `Section "${marker}" appears out of order`);
        lastIndex = idx;
      }
    });
  });
} else {
  // Jest/Vitest path: use global describe/it/expect
  // eslint-disable-next-line no-undef
  describe('README: Cosmic Helix Renderer', () => {
    // eslint-disable-next-line no-undef
    it('has the H1 heading and intro line', () => {
      // eslint-disable-next-line no-undef
      expect(RAW).toContain('# Cosmic Helix Renderer');
      // eslint-disable-next-line no-undef
      expect(RAW).toMatch(/Static, offline canvas renderer/i);
    });

    // eslint-disable-next-line no-undef
    it('contains the Layers section with 4 ordered items and expected numerology counts', () => {
      // eslint-disable-next-line no-undef
      expect(RAW).toContain('## Layers');
      // eslint-disable-next-line no-undef
      expect(RAW).toMatch(/1\.\s+\*\*Vesica field\*\*.*\(3,\s*7,\s*9\)/);
      // eslint-disable-next-line no-undef
      expect(RAW).toMatch(/2\.\s+\*\*Tree-of-Life scaffold\*\*.*10 nodes.*22 connective paths/);
      // eslint-disable-next-line no-undef
      expect(RAW).toMatch(/3\.\s+\*\*Fibonacci curve\*\*.*144 sampled points/);
      // eslint-disable-next-line no-undef
      expect(RAW).toMatch(/4\.\s+\*\*Double-helix lattice\*\*.*33 cross rungs/);
    });

    // eslint-disable-next-line no-undef
    it('contains the Usage section with index.html and palette.json guidance', () => {
      // eslint-disable-next-line no-undef
      expect(RAW).toContain('## Usage');
      // eslint-disable-next-line no-undef
      expect(RAW).toMatch(/Open `index\.html` directly/i);
      // eslint-disable-next-line no-undef
      expect(RAW).toMatch(/edit `data\/palette\.json`/i);
      // eslint-disable-next-line no-undef
      expect(RAW).toMatch(/calm fallback palette/i);
    });

    // eslint-disable-next-line no-undef
    it('documents ND-safe choices with 3 bullets', () => {
      // eslint-disable-next-line no-undef
      expect(RAW).toContain('## ND-safe choices');
      const ndSection = RAW.split('## ND-safe choices')[1]?.split('## ')[0] || '';
      const bullets = (ndSection.match(/^\-\s.+$/gm) || []);
      // eslint-disable-next-line no-undef
      expect(bullets.length).toBe(3);
      // eslint-disable-next-line no-undef
      expect(ndSection).toContain('No animation, autoplay, or flashing.');
      // eslint-disable-next-line no-undef
      expect(ndSection).toContain('Gentle contrast with readable inks on dark background.');
      // eslint-disable-next-line no-undef
      expect(ndSection).toContain('Layer order preserves depth without motion.');
    });

    // eslint-disable-next-line no-undef
    it('lists Numerology constants line including 3, 7, 9, 11, 22, 33, 99, 144', () => {
      // eslint-disable-next-line no-undef
      expect(RAW).toContain('## Numerology constants');
      for (const n of [3,7,9,11,22,33,99,144]) {
        // eslint-disable-next-line no-undef
        expect(RAW).toMatch(new RegExp(`\\b${n}\\b`));
      }
    });

    // eslint-disable-next-line no-undef
    it('maintains a consistent section order', () => {
      const markers = ['# Cosmic Helix Renderer', '## Layers', '## Usage', '## ND-safe choices', '## Numerology constants'];
      let last = -1;
      for (const m of markers) {
        const idx = RAW.indexOf(m);
        // eslint-disable-next-line no-undef
        expect(idx).toBeGreaterThanOrEqual(0);
        // eslint-disable-next-line no-undef
        expect(idx).toBeGreaterThan(last);
        last = idx;
      }
    });
  });
}