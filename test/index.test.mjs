/**
 * Test runner: Vitest (preferred) or Jest (ESM) with jsdom environment.
 * Detected/Assumed: jsdom-style DOM available. No new deps introduced.
 *
 * What we test from index.html (inline module script):
 * - Attempts to fetch ./data/palette.json with { cache: "no-store" }.
 * - On success: sets status to "Palette loaded." and uses returned palette.
 * - On failure: sets status to "Palette missing; using safe fallback." and uses defaults.
 * - Calls renderHelix(ctx, { width, height, palette, NUM }) with expected NUM constants and canvas dimensions.
 *
 * Strategy:
 * - Load index.html file content from repo.
 * - Extract the inline module script content.
 * - Rewrite its `import { renderHelix } from "./js/helix-renderer.mjs";` to import our local mock instead.
 * - Provide a controlled DOM (document with header/status + canvas) using jsdom.
 * - Stub global fetch to simulate success/failure.
 * - Execute the transformed script in the current ESM context via `new Function` (since it's module code without top-level exports).
 *
 * This approach avoids introducing a bundler and keeps tests hermetic.
 */

const fs = await import('fs/promises');
const path = await import('path');
const { fileURLToPath, pathToFileURL } = await import('url');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Minimal DOM using jsdom if not already provided by the runner
// Vitest with environment: 'jsdom' provides a DOM. If running in Node without jsdom,
// we do a lightweight fallback injection via globalThis JSDOM.

async function ensureDom() {
  const hasWindow = typeof window !== 'undefined' && typeof document !== 'undefined';
  if (hasWindow) return;

  // Lazy require jsdom if available (most setups will have it when using jsdom env)
  let JSDOM;
  try {
    ({ JSDOM } = await import('jsdom'));
  } catch {
    throw new Error(
      "This test requires a DOM. Please run with a jsdom environment (e.g., Vitest: `environment: 'jsdom'`) or add 'jsdom' as a dev dependency."
    );
  }
  const dom = new JSDOM(`<!doctype html><html><head></head><body></body></html>`, {
    url: 'http://localhost/',
  });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  // Propagate a few commonly used globals
  globalThis.HTMLElement = dom.window.HTMLElement;
  globalThis.HTMLCanvasElement = dom.window.HTMLCanvasElement;
  globalThis.navigator = dom.window.navigator;
  globalThis.getComputedStyle = dom.window.getComputedStyle;
  // Canvas 2D context stub
  if (!globalThis.HTMLCanvasElement.prototype.getContext) {
    globalThis.HTMLCanvasElement.prototype.getContext = () => ({
      // no-op 2D context stub
      beginPath() {},
      closePath() {},
      moveTo() {},
      lineTo() {},
      arc() {},
      stroke() {},
      fill() {},
      save() {},
      restore() {},
      translate() {},
      rotate() {},
      scale() {},
      clearRect() {},
      rect() {},
      bezierCurveTo() {},
      quadraticCurveTo() {},
      setLineDash() {},
      measureText() { return { width: 0 }; },
      // properties possibly read
      canvas: { width: 0, height: 0 },
    });
  }
}

function buildDomSkeleton() {
  // Build the DOM expected by index.html
  document.body.innerHTML = `
    <header>
      <div><strong>Cosmic Helix Renderer</strong></div>
      <div class="status" id="status">Loading palette...</div>
    </header>
    <canvas id="stage" width="1440" height="900" aria-label="Layered sacred geometry canvas"></canvas>
  `;
}

function extractInlineModule(html) {
  // Extract the <script type="module"> ... </script> content.
  const match = html.match(/<script\s+type="module">([\s\S]*?)<\/script>/i);
  if (!match) throw new Error("Could not find inline module script in index.html");
  return match[1].trim();
}

function transformScriptForTest(source, mockModulePath) {
  // Replace the import for renderHelix with our mock path (as a URL string).
  const importRe = /import\s*\{\s*renderHelix\s*\}\s*from\s*["']\.\/js\/helix-renderer\.mjs["'];?/;
  const replaced = source.replace(importRe, `import { renderHelix } from ${JSON.stringify(mockModulePath)};`);
  return replaced;
}

async function runModuleCode(sourceCode) {
  // Execute ESM-like code: wrap in an async function and run in current scope.
  // Provide access to top-level await by using an async IIFE.
  const wrapped = `
    (async () => {
      ${sourceCode}
    })().catch(e => { throw e; });
  `;
  // Use Function constructor to execute in current context (where fetch, document, etc. are available)
  // eslint-disable-next-line no-new-func
  const fn = new Function(wrapped);
  fn();
}

/**
 * Create a temporary mock module file that exports a spyable renderHelix.
 * We'll observe calls by writing into a global array.
 */
async function createRenderMock(tmpDir) {
  const mockFile = path.join(tmpDir, 'renderHelix.mock.mjs');
  const code = `
    export function renderHelix(ctx, opts) {
      globalThis.__renderCalls = globalThis.__renderCalls || [];
      globalThis.__renderCalls.push({ ctx: !!ctx, opts });
    }
  `;
  await fs.mkdir(tmpDir, { recursive: true });
  await fs.writeFile(mockFile, code, 'utf8');
  return pathToFileURL(mockFile).href;
}

function setFetchMockSuccess(paletteObj) {
  globalThis.fetch = async (url, init) => {
    // Basic validation for request
    globalThis.__fetchCalls = globalThis.__fetchCalls || [];
    globalThis.__fetchCalls.push({ url: String(url), init });

    return {
      ok: true,
      status: 200,
      async json() { return paletteObj; },
    };
  };
}

function setFetchMockFailure(status = 404) {
  globalThis.fetch = async (url, init) => {
    globalThis.__fetchCalls = globalThis.__fetchCalls || [];
    globalThis.__fetchCalls.push({ url: String(url), init });

    return {
      ok: false,
      status,
      async json() { throw new Error("no json on failure"); },
    };
  };
}

function getStatusText() {
  const el = document.getElementById('status');
  return el ? el.textContent : null;
}

function getCanvas() {
  return document.getElementById('stage');
}

// Shared constants expected in code under test
const DEFAULTS = {
  palette: {
    bg: "#0b0b12",
    ink: "#e8e8f0",
    layers: ["#b1c7ff", "#89f7fe", "#a0ffa1", "#ffd27f", "#f5a3ff", "#d0d0e6"],
  }
};

const EXPECTED_NUM = {
  THREE: 3,
  SEVEN: 7,
  NINE: 9,
  ELEVEN: 11,
  TWENTYTWO: 22,
  THIRTYTHREE: 33,
  NINETYNINE: 99,
  ONEFORTYFOUR: 144,
};

// Lightweight test functions to support both Vitest and Jest without imports
function expect(cond, message) {
  if (!cond) throw new Error(message);
}
function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
async function withIsolatedDom(testFn) {
  // Reset globals possibly mutated between tests
  document.body.innerHTML = '';
  delete globalThis.__renderCalls;
  delete globalThis.__fetchCalls;
  await testFn();
}

// Begin tests
describe("index.html inline module behavior", () => {
  beforeAll(async () => {
    await ensureDom();
  });

  beforeEach(() => {
    buildDomSkeleton();
  });

  test("happy path: loads palette.json, updates status, calls renderHelix with loaded palette and expected NUM", async () => {
    await withIsolatedDom(async () => {
      const indexPath = path.resolve(__dirname, '..', 'index.html');
      const html = await fs.readFile(indexPath, 'utf8');
      const rawModule = extractInlineModule(html);

      const tmpDir = path.join(__dirname, '.tmp-test');
      const mockUrl = await createRenderMock(tmpDir);

      const paletteObj = {
        bg: "#101010",
        ink: "#fafafa",
        layers: ["#111111", "#222222"],
      };
      setFetchMockSuccess(paletteObj);

      const transformed = transformScriptForTest(rawModule, mockUrl);
      await runModuleCode(transformed);

      // Validate fetch call
      expect(Array.isArray(globalThis.__fetchCalls) && globalThis.__fetchCalls.length === 1, "fetch should be called once");
      const { url, init } = globalThis.__fetchCalls[0];

      expect(url.endsWith('/data/palette.json') || url.endsWith('./data/palette.json') || url.includes('data/palette.json'), "fetch should request ./data/palette.json");
      expect(init && init.cache === 'no-store', "fetch should disable caching with { cache: 'no-store' }");

      // Status text
      expect(getStatusText() === "Palette loaded.", `expected status "Palette loaded.", got "${getStatusText()}"`);

      // renderHelix invocation
      expect(Array.isArray(globalThis.__renderCalls) && globalThis.__renderCalls.length === 1, "renderHelix should be called once");
      const call = globalThis.__renderCalls[0];

      expect(call.ctx === true, "renderHelix should receive a truthy 2D context");

      // Options validation
      expect(call.opts && typeof call.opts === 'object', "renderHelix should receive options object");
      expect(call.opts.width === 1440 && call.opts.height === 900, "canvas dimensions should be passed");
      expect(deepEqual(call.opts.palette, paletteObj), "active palette should be loaded palette");
      expect(deepEqual(call.opts.NUM, EXPECTED_NUM), "NUM constants should match expected values");
    });
  });

  test("failure path: missing palette.json, uses safe fallback palette and updates status", async () => {
    await withIsolatedDom(async () => {
      const indexPath = path.resolve(__dirname, '..', 'index.html');
      const html = await fs.readFile(indexPath, 'utf8');
      const rawModule = extractInlineModule(html);

      const tmpDir = path.join(__dirname, '.tmp-test');
      const mockUrl = await createRenderMock(tmpDir);

      setFetchMockFailure(404);

      const transformed = transformScriptForTest(rawModule, mockUrl);
      await runModuleCode(transformed);

      // Validate fetch attempted
      expect(Array.isArray(globalThis.__fetchCalls) && globalThis.__fetchCalls.length === 1, "fetch should be called once even on failure");

      // Status text indicates fallback
      expect(getStatusText() === "Palette missing; using safe fallback.", `expected fallback status, got "${getStatusText()}"`);

      // renderHelix received defaults
      expect(Array.isArray(globalThis.__renderCalls) && globalThis.__renderCalls.length === 1, "renderHelix should still be called once");
      const { opts } = globalThis.__renderCalls[0];

      expect(deepEqual(opts.palette, DEFAULTS.palette), "should use default safe palette on failure");
      expect(deepEqual(opts.NUM, EXPECTED_NUM), "NUM constants should still match on failure");
    });
  });

  test("fetch non-OK but with non-404 status still falls back cleanly", async () => {
    await withIsolatedDom(async () => {
      const indexPath = path.resolve(__dirname, '..', 'index.html');
      const html = await fs.readFile(indexPath, 'utf8');
      const rawModule = extractInlineModule(html);

      const tmpDir = path.join(__dirname, '.tmp-test');
      const mockUrl = await createRenderMock(tmpDir);

      setFetchMockFailure(500);

      const transformed = transformScriptForTest(rawModule, mockUrl);
      await runModuleCode(transformed);

      expect(getStatusText() === "Palette missing; using safe fallback.", "fallback status on 500");
      const { opts } = globalThis.__renderCalls[0];

      expect(deepEqual(opts.palette, DEFAULTS.palette), "uses default palette on 500");
    });
  });

  test("verifies canvas dimension propagation into renderHelix options", async () => {
    await withIsolatedDom(async () => {
      const indexPath = path.resolve(__dirname, '..', 'index.html');
      const html = await fs.readFile(indexPath, 'utf8');
      const rawModule = extractInlineModule(html);

      const tmpDir = path.join(__dirname, '.tmp-test');
      const mockUrl = await createRenderMock(tmpDir);

      // Change the canvas size to confirm propagation
      buildDomSkeleton();
      const canvas = getCanvas();
      canvas.setAttribute('width', '800');
      canvas.setAttribute('height', '600');

      setFetchMockSuccess({ bg: "#000", ink: "#fff", layers: ["#123"] });

      const transformed = transformScriptForTest(rawModule, mockUrl);
      await runModuleCode(transformed);

      const { opts } = globalThis.__renderCalls[0];
      expect(opts.width === 800 && opts.height === 600, "renderHelix should receive updated canvas dimensions");
    });
  });
});

// Minimal describe/test shim if runner doesn't define them (ensures Node execution for quick checks)
function describe(name, fn) { fn(); }
function test(name, fn) { return Promise.resolve(fn()); }
function beforeAll(fn) { return Promise.resolve(fn()); }
function beforeEach(fn) { return Promise.resolve(fn()); }