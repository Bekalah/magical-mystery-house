/* BEGIN AUTO-GENERATED DIFF COVERAGE (2025-09-20T08:57:01Z)
   Testing library/framework detected: jest
   Note: This suite focuses on files changed relative to origin/main (merge-base HEAD~1
f7d553444cd8ab977ebeaec15d6bd0665500d5d1).
   It validates module loadability and public API surface for changed modules.
*/
const path = require("path");
const fs = require("fs");
const { pathToFileURL } = require("url");

const __FRAMEWORK = "jest";
const __CHANGED = [];

/**
 * Resolve only those changed files that actually exist in the working tree.
 * Paths are kept relative to repo root but resolved to absolute for loading.
 */
const resolved = (__CHANGED || [])
  .map((p) => path.resolve(__dirname, "..", p))
  .filter((p) => fs.existsSync(p));

const suite = (typeof describe === "function") ? describe : function(name, fn) { fn(); };
const testCase = (typeof test === "function") ? test : (typeof it === "function" ? it : function(name, fn){ fn(); });
const beforeAllHook = (typeof beforeAll === "function") ? beforeAll : (typeof before === "function" ? before : (fn) => fn());
const afterEachHook = (typeof afterEach === "function") ? afterEach : (typeof after === "function" ? after : (fn) => fn());

afterEachHook(() => {
  try {
    if (typeof globalThis !== "undefined" && typeof globalThis.jest !== "undefined" && typeof globalThis.jest.restoreAllMocks === "function") {
      globalThis.jest.restoreAllMocks();
    }
  } catch (e) {}
  try {
    if (typeof globalThis !== "undefined" && typeof globalThis.vi !== "undefined" && typeof globalThis.vi.restoreAllMocks === "function") {
      globalThis.vi.restoreAllMocks();
    }
  } catch (e) {}
});

if (resolved.length === 0) {
  const skipSuite = (suite && suite.skip) ? suite.skip : suite;
  skipSuite("Diff-focused coverage", () => {
    testCase("no changed source files detected; skipping", function () {
      if (this && typeof this.skip === "function") this.skip();
    });
  });
} else {
  resolved.forEach((absPath) => {
    suite("Module under test: " + path.relative(path.resolve(__dirname, ".."), absPath), () => {
      let mod;
      let loadErr;

      beforeAllHook(async () => {
        try {
          try {
            // Attempt CommonJS require first
            mod = require(absPath);
          } catch (e1) {
            // Fallback to ESM dynamic import
            const url = pathToFileURL(absPath).href;
            mod = await import(url);
          }
        } catch (e) {
          loadErr = e;
        }
      });

      testCase("loads without throwing", () => {
        if (loadErr) throw loadErr;
        const isValid = (typeof mod === "object" && mod !== null) || typeof mod === "function";

        if (__FRAMEWORK === "mocha") {
          const assert = require("assert");
          assert.strictEqual(isValid, true);
        } else {
          expect(isValid).toBe(true);
        }
      });

      testCase("exposes stable public API (keys and types)", () => {
        if (loadErr) return;
        const api = (mod && mod.__esModule) ? Object.assign({ default: mod.default }, mod) : mod;
        const entries = Object.entries(api || {});
        const shape = entries.map(([k, v]) => [k, typeof v]).sort((a, b) => a[0].localeCompare(b[0]));

        if (__FRAMEWORK === "mocha") {
          const assert = require("assert");
          // Assert that all exports are defined and have non-'undefined' types
          shape.forEach(([k, t]) => {
            assert.notStrictEqual(typeof api[k], "undefined", `export ${k} should be defined`);
            assert.notStrictEqual(t, "undefined", `export ${k} should have a type`);
          });
        } else {
          // Jest/Vitest: snapshot export names and their typeof
          expect(shape).toMatchSnapshot();
        }
      });

      testCase("zero-arity functions execute without throwing", () => {
        if (loadErr) return;
        const api = (mod && mod.__esModule) ? Object.assign({ default: mod.default }, mod) : mod;
        const zeroArityFns = Object.entries(api || {})
          .filter(([_, v]) => typeof v === "function" && v.length === 0);

        if (__FRAMEWORK === "mocha") {
          const assert = require("assert");
          zeroArityFns.forEach(([name, fn]) => {
            assert.doesNotThrow(() => fn(), Error, `${name} should not throw with zero args`);
          });
        } else {
          zeroArityFns.forEach(([name, fn]) => {
            expect(() => fn()).not.toThrow();
          });
        }
      });

      testCase("default export (if present) is usable", () => {
        if (loadErr) return;
        if (__FRAMEWORK === "mocha") {
          const assert = require("assert");
          if (!(mod && mod.default !== undefined)) {
            assert.strictEqual(false, true, "default export should be present when checked");
            return;
          }
          const t = typeof mod.default;
          assert.ok(["function", "object", "string", "number", "boolean"].includes(t), "default export should be a common JS type");
        } else {
          if (!(mod && mod.default !== undefined)) {
            expect(false).toBe(true);
            return;
          }
          expect(["function", "object", "string", "number", "boolean"]).toContain(typeof mod.default);
        }
      });
    });
  });
}

/* END AUTO-GENERATED DIFF COVERAGE */