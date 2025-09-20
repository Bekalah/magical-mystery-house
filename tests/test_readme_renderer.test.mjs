// Testing library/framework note:
// This test file uses standard BDD-style describe/it/expect syntax compatible with Vitest and Jest.
// If the repository uses Vitest, run with: npx vitest
// If Jest is used, ensure ESM support (e.g., "type": "module" in package.json) or adjust to CJS.

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

// Minimal cross-runner expect shim if not globally provided (e.g., Node's built-in test runner).
// It will be ignored if expect already exists (Jest/Vitest provide it).
const globalExpect = /** @type {typeof expect | undefined} */ (globalThis.expect);
if (!globalExpect) {
  // Lightweight expect subset to avoid new dependencies. Not a full assertion lib.
  globalThis.expect = (received) => ({
    toBe: (expected) => {
      if (received !== expected) throw new Error(`Expected ${received} to be ${expected}`);
    },
    toBeTruthy: () => {
      if (!received) throw new Error(`Expected value to be truthy, got: ${received}`);
    },
    toContain: (substr) => {
      if (typeof received !== 'string' || !received.includes(substr)) {
        throw new Error(`Expected string to contain "${substr}"`);
      }
    },
    toMatch: (re) => {
      if (!(re instanceof RegExp)) throw new Error('toMatch expects a RegExp');
      if (!re.test(received)) throw new Error(`Expected value to match ${re}, got: ${received}`);
    },
    toEqual: (expected) => {
      const a = JSON.stringify(received);
      const b = JSON.stringify(expected);
      if (a !== b) throw new Error(`Expected deep equality.\nGot: ${a}\nExp: ${b}`);
    }
  });
}

// Simple describe/it shim if not provided (Node's test runner or custom env)
const hasDescribe = typeof globalThis.describe === 'function';
const hasIt = typeof globalThis.it === 'function';
if (!hasDescribe || !hasIt) {
  const tests = [];
  globalThis.describe = (name, fn) => { tests.push({ name, fn, type: 'suite' }); };
  globalThis.it = (name, fn) => { tests.push({ name, fn, type: 'test' }); };
  globalThis.afterAll = () => {};
  // rudimentary runner
  process.nextTick(async () => {
    let failures = 0;
    for (const t of tests) {
      if (t.type === 'suite') {
        console.log(`\nSuite: ${t.name}`);
        try {
          await t.fn();
        } catch (e) {
          failures++; 
          console.error(`Suite error:`, e);
        }
      } else {
        try {
          await t.fn();
          console.log(`  ✓ ${t.name}`);
        } catch (e) {
          failures++;
          console.error(`  ✗ ${t.name}\n    ${e && e.stack ? e.stack : e}`);
        }
      }
    }
    if (failures) {
      console.error(`\n${failures} test(s) failed`);
      process.exit(1);
    } else {
      console.log(`\nAll tests passed`);
    }
  });
}

// Utility: find candidate markdown files to inspect
function findMarkdownCandidates(rootDir) {
  const candidates = [];
  const queue = [rootDir];
  const maxFiles = 2000; // guard
  let seen = 0;

  while (queue.length) {
    const dir = queue.shift();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'build' || entry.name.startsWith('.git')) {
        continue;
      }
      if (entry.isDirectory()) {
        queue.push(full);
        continue;
      }
      if (/\.(md|markdown)$/i.test(entry.name)) {
        candidates.push(full);
      }
      seen++;
      if (seen > maxFiles) break;
    }
    if (seen > maxFiles) break;
  }
  return candidates;
}

function loadDoc() {
  const root = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
  const preferred = ['README.md', 'readme.md'];
  for (const name of preferred) {
    const p = path.join(root, name);
    if (fs.existsSync(p)) return { path: p, text: fs.readFileSync(p, 'utf8') };
  }
  // fallback: search docs/ or other markdowns
  const candidates = findMarkdownCandidates(root);
  for (const p of candidates) {
    const text = fs.readFileSync(p, 'utf8');
    if (text.includes('Cosmic Helix Renderer') || text.includes('Per Texturas Numerorum, Spira Loquitur.')) {
      return { path: p, text };
    }
  }
  return null;
}

describe('Documentation: Cosmic Helix Renderer README content', () => {
  const doc = loadDoc();

  it('locates the documentation containing the "Cosmic Helix Renderer" section', () => {
    if (!doc) {
      console.warn('Documentation not found. Skipping content validations.');
      expect(!!doc).toBe(true);
      return;
    }
    expect(typeof doc.text).toBe('string');
    expect(doc.text.length > 0).toBe(true);
    expect(doc.text).toMatch(/Cosmic Helix Renderer/);
  });

  it('includes the Latin motto header line', () => {
    if (!doc) return;
    expect(doc.text).toMatch(/Per Texturas Numerorum, Spira Loquitur\./);
  });

  it('contains a "Layers" section with four specific items in order', () => {
    if (!doc) return;
    // Basic structure checks
    expect(doc.text).toMatch(/##\s*Layers/i);
    // Order-sensitive regex: capture enumerated list items in expected sequence
    const layersRe = new RegExp(
      [
        '1\\.\\s*\\*\\*Vesica field\\*\\*\\s*-\\s*intersecting circles seed the grid \\(3,\\s*7,\\s*9\\)',
        '2\\.\\s*\\*\\*Tree-of-Life scaffold\\*\\*\\s*-\\s*10 nodes with 22 connective paths',
        '3\\.\\s*\\*\\*Fibonacci curve\\*\\*\\s*-\\s*logarithmic spiral using 144 sampled points',
        '4\\.\\s*\\*\\*Double-helix lattice\\*\\*\\s*-\\s*two phase-shifted strands with 33 cross rungs'
      ].join('[\\s\\S]*'),
      'i'
    );
    expect(doc.text).toMatch(layersRe);
  });

  it('documents "Usage" with offline-open instructions and optional palette JSON note', () => {
    if (!doc) return;
    expect(doc.text).toMatch(/##\s*Usage/i);
    expect(doc.text).toMatch(/Open `index\.html` directly in any modern browser\./);
    expect(doc.text).toMatch(/Optional:\s*edit `data\/palette\.json` to change colors; if missing, a calm fallback palette is used and the header shows a notice\./i);
  });

  it('states "ND-safe choices" and lists accessibility considerations', () => {
    if (!doc) return;
    expect(doc.text).toMatch(/##\s*ND-safe choices/i);
    expect(doc.text).toMatch(/No animation, autoplay, or flashing\./);
    expect(doc.text).toMatch(/Gentle contrast with readable inks on dark background\./i);
    expect(doc.text).toMatch(/Layer order preserves depth without motion\./i);
  });

  it('documents "Numerology constants" with the exact set of values', () => {
    if (!doc) return;
    expect(doc.text).toMatch(/##\s*Numerology constants/i);
    // Extract all numbers from the section to verify presence
    const sectionMatch = doc.text.match(/##\s*Numerology constants[\s\S]*?$/i);
    expect(!!sectionMatch).toBe(true);
    const section = sectionMatch ? sectionMatch[0] : '';
    const present = Array.from(new Set((section.match(/\b\d+\b/g) || []).map(Number))).sort((a,b)=>a-b);
    const expected = [3, 7, 9, 11, 22, 33, 99, 144];
    // subset check
    expected.forEach(n => {
      if (!present.includes(n)) {
        throw new Error(`Expected numerology constant ${n} to be documented. Found: [${present.join(', ')}]`);
      }
    });
  });

  it('avoids network/build assumptions (static/offline design statement present)', () => {
    if (!doc) return;
    expect(doc.text).toMatch(/Static, offline canvas renderer/);
    expect(doc.text).toMatch(/No build step, no network calls, ND-safe by design\./i);
  });
});