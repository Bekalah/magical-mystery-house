// Framework note:
// Using Node's built-in test runner (node:test) and assert for portability.
// If your project uses Vitest or Jest, you can replace imports accordingly:
//   - Vitest: import { describe, it, expect, beforeEach, vi } from 'vitest'
//   - Jest:   use jest globals (describe, test, expect, beforeEach, jest)
// This file is ESM (.mjs) to match repository style.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// We prefer jsdom when available in the repo.

let JSDOM;
try {
  ({ JSDOM } = await import('jsdom'));
} catch (e) {
  throw new Error("jsdom is required for tests of index.html. Please add 'jsdom' as a devDependency or run in an environment providing it.");
}

// Utilities to execute the inline <script type="module"> from index.html in a controlled sandbox.
// We will: 
// 1) Load index.html contents from disk (preferred). If not found, fall back to embedded snapshot.
// 2) Spin up JSDOM for the HTML.
// 3) Extract the inline module script, rewrite its first import to use a stub module for renderHelix.
// 4) Provide a stubbed global fetch to simulate palette.json presence/absence.
// 5) Dynamically import the rewritten module via a data: URL so top-level await executes.

import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Attempt to locate index.html relative to project root

async function loadIndexHtml() {
  const candidates = [
    'index.html',
    'public/index.html',
    'app/index.html',
    'static/index.html',
    'web/index.html'
  ];
  for (const p of candidates) {
    try {
      const s = await fs.readFile(p, 'utf8');
      if (s.includes('Cosmic Helix Renderer')) return { html: s, filepath: p };
    } catch {}
  }
  // Fallback to embedded snapshot (kept in sync with the PR diff)
  const html = `<\!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Cosmic Helix Renderer (ND-safe, Offline)</title>
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="color-scheme" content="light dark">
  <style>
    /* ND-safe: calm contrast, no motion, generous spacing */
    :root {
      --bg: #0b0b12;
      --ink: #e8e8f0;
      --muted: #a6a6c1;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: var(--bg);
      color: var(--ink);
      font: 14px/1.4 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    }
    header {
      padding: 12px 16px;
      border-bottom: 1px solid #1d1d2a;
    }
    .status {
      color: var(--muted);
      font-size: 12px;
    }
    #stage {
      display: block;
      margin: 16px auto;
      box-shadow: 0 0 0 1px #1d1d2a;
    }
    .note {
      max-width: 900px;
      margin: 0 auto 16px;
      color: var(--muted);
    }
    code {
      background: #11111a;
      padding: 2px 4px;
      border-radius: 3px;
    }
  </style>
</head>
<body>
  <header>
    <div><strong>Cosmic Helix Renderer</strong> &mdash; layered sacred geometry (offline, ND-safe)</div>
    <div class="status" id="status">Loading palette...</div>
  </header>

  <canvas id="stage" width="1440" height="900" aria-label="Layered sacred geometry canvas"></canvas>
  <p class="note">This static renderer encodes Vesica, Tree-of-Life, Fibonacci, and a static double-helix lattice. No animation, no autoplay, no external libraries. Open this file directly.</p>

  <script type="module">
    import { renderHelix } from "./js/helix-renderer.mjs";

    const elStatus = document.getElementById("status");
    const canvas = document.getElementById("stage");
    const ctx = canvas.getContext("2d");

    async function loadJSON(path) {
      try {
        const res = await fetch(path, { cache: "no-store" });
        if (\!res.ok) throw new Error(String(res.status));
        return await res.json();
      } catch (error) {
        return null;
      }
    }

    const defaults = {
      palette: {
        bg: "#0b0b12",
        ink: "#e8e8f0",
        layers: ["#b1c7ff", "#89f7fe", "#a0ffa1", "#ffd27f", "#f5a3ff", "#d0d0e6"]
      }
    };

    const palette = await loadJSON("./data/palette.json");
    const active = palette || defaults.palette;
    elStatus.textContent = palette ? "Palette loaded." : "Palette missing; using safe fallback.";

    // Numerology constants used by the geometry routines
    const NUM = {
      THREE: 3,
      SEVEN: 7,
      NINE: 9,
      ELEVEN: 11,
      TWENTYTWO: 22,
      THIRTYTHREE: 33,
      NINETYNINE: 99,
      ONEFORTYFOUR: 144
    };

    // ND-safe rationale: no motion, high readability, soft colors, layered order
    renderHelix(ctx, { width: canvas.width, height: canvas.height, palette: active, NUM });
  </script>
</body>
</html>`;
  return { html, filepath: '<embedded>' };
}

function extractInlineModule(html) {
  // Very small, robust extraction for <script type="module">...</script>
  const startTag = '<script type="module">';
  const start = html.indexOf(startTag);
  if (start === -1) throw new Error('Inline module script not found');
  const end = html.indexOf('</script>', start);
  if (end === -1) throw new Error('Inline module script end not found');
  const code = html.slice(start + startTag.length, end).trim();
  return code;
}

function rewriteForStubs(code, opts) {
  // Replace the first import line `import { renderHelix } from "./js/helix-renderer.mjs";`
  // with an import from a generated data: URL module that exports our stubbed renderHelix
  const importRe = /^import\s+\{\s*renderHelix\s*\}\s+from\s+["'][^"']+["'];?/m;
  if (!importRe.test(code)) throw new Error('Expected import of renderHelix not found');
  const stubModule = `
    export function renderHelix(ctx, options) {
      return globalThis.__TEST_RENDER_HELIX__(ctx, options);
    }
  `.trim();
  const stubUrl = 'data:text/javascript;charset=utf-8,' + encodeURIComponent(stubModule);
  const replaced = code.replace(importRe, `import { renderHelix } from "${stubUrl}";`);
  return replaced;
}

async function runInlineModuleInDom(html, { fetchImpl, renderHelixSpy }) {
  const dom = new JSDOM(html, {
    url: 'http://localhost/', // base for relative URLs
    pretendToBeVisual: true,
    runScripts: 'outside-only',
    resources: 'usable'
  });

  const { window } = dom;
  // Provide minimal canvas API
  // We stub getContext to return a dummy 2D context-like object
  window.HTMLCanvasElement.prototype.getContext = function getContext(kind) {
    if (kind === '2d') {
      return {
        // minimal API used by renderer (likely draw operations). We won't call them here.
      };
    }
    return null;
  };

  // Inject stubs
  window.fetch = fetchImpl;
  window.__TEST_RENDER_HELIX__ = renderHelixSpy;

  // Extract and rewrite the module
  const inline = extractInlineModule(html);
  const rewritten = rewriteForStubs(inline, {});
  const dataUrl = 'data:text/javascript;charset=utf-8,' + encodeURIComponent(rewritten);

  // Create globals akin to browser
  globalThis.window = window;
  globalThis.document = window.document;
  globalThis.fetch = fetchImpl;
  globalThis.__TEST_RENDER_HELIX__ = renderHelixSpy;

  // Dynamic import so top-level await executes
  await import(dataUrl);

  return { dom, window };
}

// Simple spy helper
function createSpy(fnName = 'fn') {
  const calls = [];
  const spy = (...args) => {
    calls.push(args);
    return undefined;
  };
  spy.calls = calls;
  spy.called = () => calls.length > 0;
  spy.callCount = () => calls.length;
  spy.lastCall = () => calls[calls.length - 1];
  return spy;
}

// Mock fetch helpers
function fetchOkJson(jsonObj, status = 200) {
  return async (url, init) => {
    return {
      ok: status >= 200 && status < 300,
      status,
      async json() { return jsonObj; }
    };
  };
}
function fetchError(status = 404) {
  return async (url, init) => {
    return {
      ok: false,
      status,
      async json() { throw new Error('no json'); }
    };
  };
}
function fetchReject(err = new Error('network')) {
  return async (url, init) => { throw err; };
}

// Shared assertions for structure
async function assertStaticStructure(dom) {
  const { document } = dom.window;
  const title = document.querySelector('title');
  assert.equal(title?.textContent, 'Cosmic Helix Renderer (ND-safe, Offline)');
  const status = document.getElementById('status');
  assert.ok(status, '#status exists');
  assert.equal(status.textContent, 'Loading palette...');
  const canvas = document.getElementById('stage');
  assert.ok(canvas, '#stage canvas exists');
  assert.equal(canvas.getAttribute('width'), '1440');
  assert.equal(canvas.getAttribute('height'), '900');
  assert.equal(canvas.getAttribute('aria-label'), 'Layered sacred geometry canvas');
  // CSS variables presence
  const styleEl = document.querySelector('style');
  assert.ok(styleEl && /--bg:\s*#0b0b12/i.test(styleEl.textContent), 'has --bg var');
  assert.ok(styleEl && /--ink:\s*#e8e8f0/i.test(styleEl.textContent), 'has --ink var');
  assert.ok(styleEl && /--muted:\s*#a6a6c1/i.test(styleEl.textContent), 'has --muted var');
}

describe('index.html inline module behavior', () => {
  let htmlSnapshot;

  beforeEach(async () => {
    const { html } = await loadIndexHtml();
    htmlSnapshot = html;
  });

  it('renders with external palette.json (happy path) and updates status text', async () => {
    const palette = { bg: '#101010', ink: '#fafafa', layers: ['#111', '#222'] };
    const fetchSpy = fetchOkJson(palette);
    const renderSpy = createSpy('renderHelix');

    const { dom, window } = await runInlineModuleInDom(htmlSnapshot, {
      fetchImpl: fetchSpy,
      renderHelixSpy: renderSpy
    });

    // After module executes, status should be updated
    const statusEl = window.document.getElementById('status');
    assert.equal(statusEl.textContent, 'Palette loaded.');

    // renderHelix was called once with ctx and options containing width/height/palette/NUM
    assert.equal(renderSpy.callCount(), 1);
    const [ctx, options] = renderSpy.lastCall();
    assert.ok(typeof options === 'object' && options, 'options object passed');
    assert.equal(options.width, 1440);
    assert.equal(options.height, 900);
    assert.deepEqual(options.palette, palette, 'uses fetched palette');

    // NUM constant correctness
    assert.deepEqual(options.NUM, {
      THREE: 3,
      SEVEN: 7,
      NINE: 9,
      ELEVEN: 11,
      TWENTYTWO: 22,
      THIRTYTHREE: 33,
      NINETYNINE: 99,
      ONEFORTYFOUR: 144
    });

    // Initial structure assertions
    await assertStaticStructure(dom);
  });

  it('falls back to defaults when palette fetch returns non-OK (e.g., 404)', async () => {
    const fetchSpy = fetchError(404);
    const renderSpy = createSpy('renderHelix');
    const { dom, window } = await runInlineModuleInDom(htmlSnapshot, {
      fetchImpl: fetchSpy,
      renderHelixSpy: renderSpy
    });

    const statusEl = window.document.getElementById('status');
    assert.equal(statusEl.textContent, 'Palette missing; using safe fallback.');

    assert.equal(renderSpy.callCount(), 1);
    const [ctx, options] = renderSpy.lastCall();
    assert.deepEqual(options.palette, {
      bg: '#0b0b12',
      ink: '#e8e8f0',
      layers: ['#b1c7ff', '#89f7fe', '#a0ffa1', '#ffd27f', '#f5a3ff', '#d0d0e6']
    }, 'uses default fallback palette on error');

    await assertStaticStructure(dom);
  });

  it('falls back to defaults when fetch throws (network failure)', async () => {
    const fetchSpy = fetchReject(new Error('network down'));
    const renderSpy = createSpy('renderHelix');
    const { window } = await runInlineModuleInDom(htmlSnapshot, {
      fetchImpl: fetchSpy,
      renderHelixSpy: renderSpy
    });

    const statusEl = window.document.getElementById('status');
    assert.equal(statusEl.textContent, 'Palette missing; using safe fallback.');
    assert.equal(renderSpy.callCount(), 1);
    const [, options] = renderSpy.lastCall();
    assert.equal(options.width, 1440);
    assert.equal(options.height, 900);
    // sanity on default colors
    assert.equal(options.palette.bg, '#0b0b12');
  });

  it('requests the correct palette URL with cache control', async () => {
    const calls = [];
    const fetchSpy = async (url, init) => {
      calls.push([url, init]);
      return {
        ok: true,
        status: 200,
        async json() { return { bg: '#000', ink: '#fff', layers: [] }; }
      };
    };
    const renderSpy = createSpy('renderHelix');
    await runInlineModuleInDom(htmlSnapshot, { fetchImpl: fetchSpy, renderHelixSpy: renderSpy });

    assert.equal(calls.length, 1);
    const [url, init] = calls[0];
    assert.equal(url, './data/palette.json');
    assert.deepEqual(init, { cache: 'no-store' });
  });

  it('provides a 2D canvas context and passes it to renderHelix', async () => {
    const fetchSpy = fetchError(404);
    const renderSpy = createSpy('renderHelix');
    const { window } = await runInlineModuleInDom(htmlSnapshot, { fetchImpl: fetchSpy, renderHelixSpy: renderSpy });

    assert.equal(renderSpy.callCount(), 1);
    const [ctx] = renderSpy.lastCall();
    assert.ok(ctx !== null, 'ctx is provided (stubbed 2D context)');
    const canvas = window.document.getElementById('stage');
    assert.ok(canvas instanceof window.HTMLCanvasElement, 'canvas element exists');
  });

  it('keeps ND-safe static content: no animation hooks or timers introduced', async () => {
    // Ensure the module does not setInterval/setTimeout/requestAnimationFrame
    const timers = { setInterval: 0, setTimeout: 0, raf: 0 };
    const fetchSpy = fetchError(404);
    const renderSpy = createSpy('renderHelix');

    const originalSetInterval = globalThis.setInterval;
    const originalSetTimeout = globalThis.setTimeout;
    const originalRAF = globalThis.requestAnimationFrame;

    globalThis.setInterval = (...args) => { timers.setInterval++; return 0; };
    globalThis.setTimeout = (...args) => { timers.setTimeout++; return 0; };
    globalThis.requestAnimationFrame = (...args) => { timers.raf++; return 0; };

    try {
      await runInlineModuleInDom(htmlSnapshot, { fetchImpl: fetchSpy, renderHelixSpy: renderSpy });
    } finally {
      globalThis.setInterval = originalSetInterval;
      globalThis.setTimeout = originalSetTimeout;
      globalThis.requestAnimationFrame = originalRAF;
    }

    assert.equal(timers.setInterval, 0);
    assert.equal(timers.setTimeout, 0);
    assert.equal(timers.raf, 0);
  });
});