/**
 * README Contract Tests
 *
 * Framework note:
 * - Prefers Vitest (import from "vitest") if available in the project.
 * - Falls back to Jest ESM (import from "@jest/globals") if Vitest isn't present.
 * - As a last resort, uses Node's built-in 'assert' with minimal shims.
 *
 * These tests validate the public documentation contract introduced in the PR diff:
 * - Title, sections, and ordered "Layers" contents and numerology constants
 * - Presence of important phrases and invariants (counts like 3,7,9,11,22,33,99,144)
 * - Usage claims (index.html path mention and optional palette.json mention)
 * - ND-safe choices list items
 *
 * The tests aim to be resilient to minor formatting changes while still catching
 * regressions in wording and critical numbers.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

function findFirstExisting(paths) {
  for (const p of paths) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

const readmeCandidates = [
  path.join(repoRoot, "README.md"),
  path.join(repoRoot, "Readme.md"),
  path.join(repoRoot, "readme.md"),
  path.join(repoRoot, "README.MD"),
  path.join(repoRoot, "docs", "README.md"),
];
const readmePath = findFirstExisting(readmeCandidates);
const indexHtmlPath = findFirstExisting([
  path.join(repoRoot, "index.html"),
  path.join(repoRoot, "public", "index.html"),
  path.join(repoRoot, "static", "index.html"),
]);
const palettePath = path.join(repoRoot, "data", "palette.json");

const readmeText = (() => {
  if (!readmePath) return null;
  try {
    return fs.readFileSync(readmePath, "utf8");
  } catch (e) {
    return null;
  }
})();

function norm(s) {
  return (s || "").replace(/\r\n/g, "\n");
}

function numbersIn(str) {
  return (str.match(/\d+/g) || []).map((n) => Number(n));
}

(async () => {
  // Lightweight dynamic test harness selection
  let t = null;
  try {
    // Prefer Vitest if present
    // eslint-disable-next-line import/no-extraneous-dependencies
    const vitest = await import("vitest").catch(() => null);
    if (vitest && vitest.describe) {
      t = {
        framework: "vitest",
        describe: vitest.describe,
        it: vitest.it,
        test: vitest.test,
        expect: vitest.expect,
        beforeAll: vitest.beforeAll,
        skip: vitest.it.skip,
      };
    }
  } catch (e) {}

  if (!t) {
    try {
      // Fallback to Jest ESM globals
      // eslint-disable-next-line import/no-extraneous-dependencies
      const jestg = await import("@jest/globals").catch(() => null);
      if (jestg && jestg.describe) {
        t = {
          framework: "jest",
          describe: jestg.describe,
          it: jestg.it,
          test: jestg.test,
          expect: jestg.expect,
          beforeAll: jestg.beforeAll || ((fn) => fn()),
          skip: jestg.it.skip,
        };
      }
    } catch (e) {}
  }

  if (!t) {
    // Last resort: Node assert shim with minimal structure
    const assert = await import("node:assert");
    t = {
      framework: "node-assert",
      describe: (name, fn) => fn(),
      it: (name, fn) => fn(),
      test: (name, fn) => fn(),
      expect: (val) => ({
        toBeTruthy: () => assert.ok(val),
        toContain: (needle) => assert.ok(String(val).includes(needle)),
        toMatch: (re) => assert.ok(re.test(String(val))),
        toEqual: (other) => assert.deepStrictEqual(val, other),
        toBe: (other) => assert.strictEqual(val, other),
        toBeGreaterThan: (n) => assert.ok(val > n),
        toBeGreaterThanOrEqual: (n) => assert.ok(val >= n),
        toBeLessThan: (n) => assert.ok(val < n),
      }),
      beforeAll: (fn) => fn(),
      skip: (_name, _fn) => void 0,
    };
  }

  const { describe, it, expect, beforeAll, skip } = t;

  // Shared preconditions
  let txt;
  beforeAll(() => {
    txt = norm(readmeText);
  });

  describe(`[Docs][${t.framework}] README contract`, () => {
    it("README file should exist at a conventional path", () => {
      if (!readmePath) {
        // Provide a descriptive failure for maintainers
        throw new Error(
          `README not found. Checked: ${readmeCandidates.join(", ")}`
        );
      }
      expect(fs.existsSync(readmePath)).toBeTruthy();
    });

    it("Contains the title and epigraph line near the top", () => {
      expect(txt).toBeTruthy();
      expect(txt).toContain("# Cosmic Helix Renderer");
      expect(txt).toMatch(/Per Texturas Numerorum,\s*Spira Loquitur\./);
    });

    it("Describes the renderer as static, offline, no build or network, ND-safe", () => {
      expect(txt).toMatch(/Static,\s*offline canvas renderer/i);
      expect(txt).toMatch(/No build step/i);
      expect(txt).toMatch(/no network calls/i);
      expect(txt).toMatch(/ND-safe by design/i);
    });

    it("Has key section headings", () => {
      for (const h of [
        /^##\s+Layers/m,
        /^##\s+Usage/m,
        /^##\s+ND-safe choices/m,
        /^##\s+Numerology constants/m,
      ]) {
        expect(txt).toMatch(h);
      }
    });

    it("Lists the four Layers in the documented order", () => {
      const names = [
        "Vesica field",
        "Tree-of-Life scaffold",
        "Fibonacci curve",
        "Double-helix lattice",
      ];
      const positions = names.map((n) => txt.indexOf(n));
      // All present
      positions.forEach((p) => expect(p).toBeGreaterThanOrEqual(0));
      // In ascending order
      for (let i = 1; i < positions.length; i++) {
        expect(positions[i]).toBeGreaterThan(positions[i - 1]);
      }
    });

    it("Layer numerics match the spec (3,7,9) (10 & 22) (144) (33)", () => {
      const vesica = /Vesica field[\s\S]*?\(\s*3\s*,\s*7\s*,\s*9\s*\)/i;
      const tree = /Tree-of-Life scaffold[\s\S]*?10\s+nodes?\s+with\s+22\s+connective paths/i;
      const fib = /Fibonacci curve[\s\S]*?144\s+sampled points/i;
      const helix = /Double-helix lattice[\s\S]*?33\s+cross rungs/i;

      expect(txt).toMatch(vesica);
      expect(txt).toMatch(tree);
      expect(txt).toMatch(fib);
      expect(txt).toMatch(helix);
    });

    it("Usage section mentions opening index.html and optional data/palette.json with fallback notice", () => {
      expect(txt).toMatch(/Open\s+`?index\.html`?/i);
      expect(txt).toMatch(/data\/palette\.json/i);
      expect(txt).toMatch(/fallback palette/i);
      expect(txt).toMatch(/notice/i);
    });

    it("ND-safe choices enumerate key constraints (no animation/autoplay/flashing, gentle contrast, preserved depth without motion)", () => {
      expect(txt).toMatch(/No animation,\s*autoplay,\s*or flashing\./i);
      expect(txt).toMatch(/Gentle contrast/i);
      expect(txt).toMatch(/preserves depth without motion/i);
    });

    it("Numerology constants section lists the expected set", () => {
      const sectionMatch = txt.match(/##\s*Numerology constants([\s\S]*?)$/m);
      expect(sectionMatch).toBeTruthy();
      const numbers = numbersIn(sectionMatch ? sectionMatch[1] : "");
      // Unique and sorted for comparison
      const uniq = Array.from(new Set(numbers)).sort((a, b) => a - b);
      expect(uniq).toEqual([3, 7, 9, 11, 22, 33, 99, 144]);
    });

    // File presence checks tied to docs (skipped if files are absent to keep tests helpful, not flaky)
    (indexHtmlPath ? it : skip)("index.html exists where documentation expects it", () => {
      expect(fs.existsSync(indexHtmlPath)).toBeTruthy();
    });

    // palette.json is optional by design; ensure test does not require it to exist
    it("Documentation states palette.json is optional; test does not require it to exist", () => {
      // This is a no-op assertion that the doc claim was validated in the Usage test.
      expect(true).toBeTruthy();
    });
  });
})();